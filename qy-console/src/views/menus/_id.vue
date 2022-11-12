<template>
  <div style="padding: 5px 0;">
    <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        :title="listInfo.title"
        :sub-title="listInfo.subTitle"
        @back="doBack"
    />
  </div>


  <LayTableInfo>
    <template #searchForm>
      <a-form :model="searchForm"    ref="formRef" v-bind="formItemLayout">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item  label="链接名称"  name="username">
              <a-input v-model:value="searchForm.name" placeholder="请输入关键字"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8" style="text-align: right">
            <a-button type="primary" html-type="submit"  :loading ="listInfo.searchLoading"  @click="doSearchForm">搜索</a-button>
            <a-button style="margin: 0 8px" @click="()=>formRef.resetFields()">重置</a-button>
          </a-col>
        </a-row>

      </a-form>
    </template>
    <template #operations>
      <a-row >
        <a-col  :xs="{span:24}"  :lg="{ span: 24 }" style=" margin-top: 5px;">
          <a-button  type="primary"  @click="doAdd('0')">
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
      <a-table :columns="MenusColumns"
               :data-source="listInfo.items"
               :rowKey = "record => record.id"
               :pagination="listInfo.pageInfo"
               :scroll = "{ x:  800}"
               :loading="listInfo.loading"
               :row-selection="{ selectedRowKeys:  listInfo.selectedIds, onChange: doSelectChange }"
               @change="doTableChange"
      >

        <template #bodyCell="{ text, record, index, column}">
          <template v-if="column.dataIndex === 'blanked'">
            <template v-if="text==1"> 是</template>
            <template v-else> 否  </template>
          </template>
          <template v-if="column.dataIndex === 'action'">
            <a  href="javascript:void(0)"  @click="doAdd(record.targetId)">增加子菜单</a>
            <a-divider type="vertical" />
            <a  href="javascript:void(0)"  @click="doUpdate(record)">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm title="确定要删除所选项吗？"  @confirm="doDeleted([record.id])">
              <a  href="javascript:void(0)"  >删除</a>
            </a-popconfirm>
          </template>

        </template>

      </a-table>
    </template>
  </LayTableInfo>


  <a-drawer
      placement="right"
      width="40%"
      :title="drawerData.title"
      :closable="false"
      :visible="drawerData.visible"
      :get-container="false"
      :style="{ position: 'absolute' }"
      @close="doCancel"
  >

    <a-form ref="dataForm" :model="drawerData.dataInfo" :footer="null" v-bind="formItemLayout" @cancel="doCancel" >
      <a-form-item has-feedback label="菜单名称" name="name">
        <a-input v-model:value="drawerData.dataInfo.name" placeholder="请输入链接名称"></a-input>
      </a-form-item>
      <a-form-item has-feedback label="菜单地址" name="url">
        <a-input v-model:value="drawerData.dataInfo.url" placeholder="请输入链接地址"></a-input>
      </a-form-item>
      <a-form-item has-feedback label="新窗口打开" name="blanked"  extra="设置非首页时，仅在内页展示">
        <a-switch v-model:checked="drawerData.dataInfo.blanked" checked-children="是" :checked-value="switchObj.checkedValue" un-checked-children="否" :un-checked-value="switchObj.unCheckedValue"/>
      </a-form-item>
      <a-form-item has-feedback label="父级" name="description">
        <a-tree-select
            v-model:value="drawerData.dataInfo.parentId"
            style="width: 100%"
            show-search
            placeholder="选择父级菜单"
            :field-names="{ label: 'name', value: 'id' }"
            :tree-data="listInfo.treeItems"
        >
        </a-tree-select>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" :loading="drawerData.editLoading" @click="doEditData">
          保存
        </a-button>
        <a-button style="margin-left: 10px" @click="doCancel">
          取消
        </a-button>
      </a-form-item>
    </a-form>



  </a-drawer>

</template>

<script setup lang="ts">
import LayTableInfo from '@/components/LayTableInfo.vue'
import {computed, onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {DEFAULT_PAGESIZE} from "@/utils/constants";
import {MenusColumns} from "@/config/tableConfigs/qy_menus";
import {FormInstance, message, notification} from "ant-design-vue";
import {Add, Delete, List, Update,MenusType} from "@/api/menus";
import {PageInfo} from "@/api/common";
import {useParamsStore} from "@/store/params";
const state = useParamsStore();
const searchForm = reactive({ name: "",
});
const drawerData = reactive({ visible: false,
  title: "友链",
  size: "large",
  dataInfo:{
    id:"",
    name:"",
    url:"",
    blanked:1,
    parentId:"0",
    targetId:"0",
  } as MenusType,
  editLoading:false
});
const router = useRouter();
const formRef = ref<FormInstance>();
const dataForm = ref<FormInstance>();
type Key = string | number;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};
const switchObj = {
  checkedValue: 1,
  unCheckedValue: 2,
}
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
  treeItems:[],
  targetId:state.menusAgentType.id,
  title:"配置菜单组信息",
  subTitle:"",
});



onMounted(() => {
  listInfo.title = "配置菜单组【" + state.menusAgentType.name+"】";
  listInfo.subTitle = "「 " + state.menusAgentType.name+" 」 的具体菜单";
  doSearchForm();
  doTree();
})


function doAdd(pid:string) {
  drawerData.visible = true;
  drawerData.title = "新增友链"
  drawerData.dataInfo = {
    id:"",
    name:"",
    url:"",
    blanked:1,
    parentId:pid,
    targetId: listInfo.targetId,
  };
}
function doUpdate(data:MenusType) {
  drawerData.visible = true;
  drawerData.title = "编辑友链【"+data.name+"】";
  drawerData.dataInfo = {
    id:data.id,
    url:data.url,
    name: data.name,
    blanked:data.blanked,
    parentId:data.parentId,
    targetId:data.targetId,
  };

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
  Delete(ids).then(res=>{
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
    ...pageInfo,
    targetId:listInfo.targetId,
  }
  await List(param).then(res => {
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

async function doTree() {
  var param = {
    current: 0,
    targetId:listInfo.targetId,
  }
  await List(param).then(res => {
    if(res.pageInfo.current<=0) {
      res.pageInfo.current = 1;
    }
    res.items.unshift({id:"0",name:""});
    listInfo.treeItems =  res.items ;

  }).catch(err => { console.error("List error",err);
  }).finally(() => {
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
  drawerData.editLoading = true;
  const param = {
    ...drawerData.dataInfo
  };
  console.log("doEditData param",param)
  if (param.id  && param.id.length>0) {
    Update(param).then(res=>{
      notification.success({
        message: '成功',
        description: "保存成功"
      });
      doCancel();
      initData();
    }).catch(err=>{

    }).finally(()=>{
      drawerData.editLoading = false;
    });
  } else {
    Add(param).then(res=>{
      notification.success({
        message: '成功',
        description: "保存成功"
      });
      doCancel();
      initData();
    }).catch(err=>{

    }).finally(()=>{
      drawerData.editLoading = false;
    });
  }

}
function doCancel() {
  dataForm.value.resetFields();
  drawerData.visible = false;
  drawerData.dataInfo.id = "";

}

function doBack() {
  state.menusAgentType = {};
  router.push({name:"menus"});
}


</script>

<style scoped>

</style>