<template>
  <LayTableInfo>
    <template #searchForm>
      <a-form :model="searchForm"    ref="formRef" v-bind="formItemLayout">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item  label="分组名称"  name="path">
              <a-input v-model:value="searchForm.name" placeholder="请输入关键字"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8"  v-show="listInfo.expand">
            <a-form-item  label="分组标识" name="apiGroup">
              <a-input v-model:value="searchForm.identifier" placeholder="请输入关键字"></a-input>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="24" style="text-align: right">
            <a-button type="primary" html-type="submit"  :loading ="listInfo.searchLoading"  @click="doSearchForm">搜索</a-button>
            <a-button style="margin: 0 8px" @click="()=>formRef.resetFields()">重置</a-button>
            <a style="font-size: 12px" @click="listInfo.expand = !listInfo.expand">
              <template v-if="listInfo.expand">
                <UpOutlined />
              </template>
              <template v-else>
                <DownOutlined />
              </template>
              更多
            </a>
          </a-col>
        </a-row>
      </a-form>
    </template>
    <template #operations>
      <a-row >
        <a-col  :xs="{span:24}"  :lg="{ span: 24 }" style=" margin-top: 5px;">
          <a-button  type="primary"  @click="doAdd()">
            新增
          </a-button>
          <a-dropdown>
            <template #overlay>
              <a-menu @click="doMenuClick">
                <a-menu-item key="1">
                  删除
                </a-menu-item>
              </a-menu>
            </template>
            <a-button>
              批量操作
              <DownOutlined />
            </a-button>
          </a-dropdown>
        </a-col>
      </a-row>
    </template>
    <template #content>
      <a-table :columns="ApisGroupCcolumns"
               :data-source="listInfo.items"
               :rowKey = "record => record.id"
               :pagination="listInfo.pageInfo"
               :scroll = "{ x:  800}"
               :loading="listInfo.loading"
               :row-selection="{ selectedRowKeys:  listInfo.selectedIds, onChange: doSelectChange }"
               @change="doTableChange"
      >

        <template #bodyCell="{ text, record, index, column}">

          <template v-if="column.dataIndex === 'action'">
           <a  href="javascript:void(0)"  @click="doUpdate(record)">编辑</a>
<!--            <router-link :to="{name:'apis-update',params:{ id: record.id }}">编辑 </router-link>-->
            <a-divider type="vertical" />
            <a-popconfirm title="确定要删除所选项吗？"  @confirm="doDeleted([record.id])">
              <a  href="javascript:void(0)"  >删除</a>
            </a-popconfirm>
          </template>

        </template>

      </a-table>
    </template>
  </LayTableInfo>

  <a-modal v-model:visible="modalInfo.visible"   :footer="null">
    <template #title>
      <template v-if="modalInfo.dataInfo.id">
        修改分组
      </template>
      <template v-else>
        新增分组
      </template>
    </template>
    <a-form ref="modalForm" :model="modalInfo.dataInfo" :footer="null" @cancel="doCancel" >
      <a-form-item has-feedback label="分组名称" name="name">
        <a-input v-model:value="modalInfo.dataInfo.name" placeholder="请输入分组名称"></a-input>
      </a-form-item>
      <a-form-item has-feedback label="分组标识" name="identifier">
        <a-input v-model:value="modalInfo.dataInfo.identifier" placeholder="请输入分组标识"></a-input>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" :loading="modalInfo.editLoading" @click="doEditData">
          保存
        </a-button>
        <a-button style="margin-left: 10px" @click="doCancel">
          取消
        </a-button>
      </a-form-item>
    </a-form>
  </a-modal>

</template>

<script setup lang="ts">
import LayTableInfo from '@/components/LayTableInfo.vue'
import {DEFAULT_PAGESIZE} from "@/utils/constants";
import {ApisGroupCcolumns} from "@/config/tableConfigs/qy_apis";
import {onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {FormInstance, message, notification} from "ant-design-vue";
import {GroupDelete, GroupList,GroupAdd,GroupUpdate, ApisGroupType} from "@/api/apis";
import {PageInfo} from "@/api/common";
const searchForm = reactive({
  name: "",
  identifier: "",
});
const router = useRouter();
const formRef = ref<FormInstance>();
const modalForm = ref<FormInstance>();
type Key = string | number;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};
const tabsInfo = reactive({
  activeKey:"1"
})
const listInfo = reactive({
  pageInfo: {
    current: 1,
    pageSize: DEFAULT_PAGESIZE,
    total: 0,
    pages: 1,
    firstFlag: true,
    LastFlag: false,
  },
  items:[],
  selectedIds:[],
  loading: false,
  searchLoading: false,
  expand:false,
});
const modalInfo = reactive({
  visible:false,
  editLoading: false,
  dataInfo:{
    id:"",
    name: "",
    identifier: "",
  }
})
onMounted(() => {
  doSearchForm();
})


function doAdd() {
  modalInfo.visible = true;
}
function doUpdate(data:ApisGroupType) {
  modalInfo.dataInfo = data;
  modalInfo.visible = true;
}

function doMenuClick(e:any) {
  if (e.key=="1") {
    if( listInfo.selectedIds &&  listInfo.selectedIds.length>0) {
      doDeleted(listInfo.selectedIds);
    } else {
      message.warning('请选择要删除项',5);
    }
  }
}

function doDeleted(ids:string[]){
  GroupDelete(ids).then(res=>{
    notification.success({
      message: '成功',
      description: "删除"
    });
    initData();
  }).catch(err=>{console.error("Delete error",err);});
}


function initData() {
  doList({
    current: 1,
    pageSize: listInfo.pageInfo.pageSize,
  });
}
async function doList(pageInfo:PageInfo) {
  listInfo.loading = true;
  var param = {
    ...searchForm,
    ...pageInfo
  }
  await GroupList(param).then((res:any)=>{
    if(res.pageInfo.current<=0) {
      res.pageInfo.current = 1;
    }
    listInfo.pageInfo = res.pageInfo;
    listInfo.items =  res.items;

  }).catch(err => { console.error("List error",err);
  }).finally(() => {
    listInfo.loading = false;
    listInfo.searchLoading = false;
  });
}

function doTableChange(pagination:any, filters:any, sorter:any) {
  doList(pagination);
}
function doSearchForm() {
  listInfo.searchLoading = true;
  initData();
}
function doSelectChange(selectedRowKeys: Key[]) {
  listInfo.selectedIds = selectedRowKeys;
}


function doEditData() {
  modalInfo.editLoading = true;
  const param = {
    ...modalInfo.dataInfo
  };
  if (param.id.length>0) {
    GroupUpdate(param.id,param).then(res=>{
      notification.success({
        message: '成功',
        description: "保存成功"
      });
      doCancel();
      initData();
    }).catch(err=>{

    }).finally(()=>{
      modalInfo.editLoading = false;
    });
  } else {
    GroupAdd(param).then(res=>{
      notification.success({
        message: '成功',
        description: "保存成功"
      });
      doCancel();
      initData();
    }).catch(err=>{

    }).finally(()=>{
      modalInfo.editLoading = false;
    });
  }
  console.log(param);

}
function doCancel() {
  modalForm.value.resetFields();
  modalInfo.visible = false;
  modalInfo.dataInfo.id = "";
}
</script>

<style scoped>

</style>
