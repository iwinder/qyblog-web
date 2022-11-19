<template>
  <LayTableInfo>
    <template #searchForm>

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
      <a-table :columns="CategoryColumns"
               :data-source="listInfo.items"
               :default-expand-all-rows="listInfo.allExpand"
               :rowKey = "record => record.id"
               :pagination="listInfo.pageInfo"
               :scroll = "{ x:  800}"
               :loading="listInfo.loading"
               :row-selection="{ selectedRowKeys:  listInfo.selectedIds, onChange: doSelectChange }"
               @change="doTableChange"
      >

        <template #bodyCell="{ text, record, index, column}">

          <template v-if="column.dataIndex === 'action'">
            <a  href="javascript:void(0)"  @click="doAdd(record.id)">添加子分类</a>
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
      <a-form-item has-feedback label="名称" name="name">
        <a-input v-model:value="drawerData.dataInfo.name" placeholder="请输入分类名称"></a-input>
      </a-form-item>
      <a-form-item has-feedback label="标识" name="identifier">
        <a-input v-model:value="drawerData.dataInfo.identifier" placeholder="请输入分类标识"></a-input>
      </a-form-item>
      <a-form-item has-feedback label="描述" name="description">
        <a-textarea v-model:value="drawerData.dataInfo.description" placeholder="请输入分类描述"></a-textarea>
      </a-form-item>
      <a-form-item
          label="父级分类"
          name="parentId"
      >
        <a-tree-select
            v-model:value="drawerData.dataInfo.parentId"
            style="width: 100%"
            show-search
            placeholder="选择父级菜单"
            :field-names="{ label: 'name', value: 'id' }"
            :tree-data="parentSelect.options"
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
import {CategoryColumns} from "@/config/tableConfigs/qy_category";
import {FormInstance, message, notification} from "ant-design-vue";
import {Add, Delete, List, CategoryType,  Update} from "@/api/category";
import {PageInfo} from "@/api/common";
const searchForm = reactive({ name: "",
});
const drawerData = reactive({ visible: false,
  title: "分类",
  size: "large",
  editLoading: false,
  dataInfo:{
    id:"",
    name:"",
    identifier:"",
    description:"",
    parentId:"0",
  }
});
const router = useRouter();
const formRef = ref<FormInstance>();
const dataForm = ref<FormInstance>();
type Key = string | number;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

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
  allExpand: true,
});


let newDatas:CategoryType[] = [ {
  id:"0",
  name:"",
  children:[]
}];

onMounted(() => {
  doSearchForm();
  initCategoryList();
})


function doAdd(pid:string) {
  drawerData.visible = true;
  drawerData.title = "新增分类";
  doResetFields(pid);
}
function doUpdate(data:CategoryType) {
  drawerData.dataInfo.id = data.id;
  drawerData.dataInfo.name = data.name;
  drawerData.dataInfo.identifier = data.identifier;
  drawerData.dataInfo.parentId = data.parentId;
  drawerData.dataInfo.description = data.description;
  drawerData.visible = true;
  drawerData.title = "编辑分类【"+data.name+"】";
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
    parentId:0,
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
  if (param.id.length>0) {
    Update(param.id,param).then(res=>{
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
  doResetFields();
}


function doResetFields(pid:string) {
  drawerData.dataInfo.id = "";
  drawerData.dataInfo.name="";
  drawerData.dataInfo.identifier="";
  drawerData.dataInfo.parentId=pid;
}

const parentSelect = reactive({
  options:[]

});
const initCategoryList = async () => {
  List({
    current:0,
    parentId:"0",
  }).then(res=>{
    newDatas = newDatas.concat(res.items)
    parentSelect.options = newDatas;
  }).catch(err=>{})
}

</script>

<style scoped>

</style>