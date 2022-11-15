<template>
  <LayTableInfo>
    <template #searchForm>
      <a-form :model="searchForm"    ref="formRef" v-bind="formItemLayout">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item  label="角色名称"  name="username">
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
      <a-table :columns="RoleColumns"
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
            <a  href="javascript:void(0)"  @click="doOpenAuth(record)">设置权限</a>
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
  <a-modal v-model:visible="modalInfo.visible"  :footer="null" >
    <template #title>
      <template v-if="modalInfo.roleInfo.id">
        修改角色
      </template>
      <template v-else>
        新增角色
      </template>
    </template>
    <a-form ref="roleForm" :model="modalInfo.roleInfo" :footer="null" @cancel="doCancel" >
      <a-form-item has-feedback label="名称" name="name">
        <a-input v-model:value="modalInfo.roleInfo.name" placeholder="请输入角色名称"></a-input>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" :loading="modalInfo.editLoading" @click="doEditRole">
          保存
        </a-button>
        <a-button style="margin-left: 10px" @click="doCancel">
          取消
        </a-button>
      </a-form-item>
    </a-form>
  </a-modal>

  <a-drawer
      placement="right"
      width="40%"
      :title="drawerData.title"
      :closable="false"
      :visible="drawerData.visible"
      :get-container="false"
      :style="{ position: 'absolute' }"
      @close="doDrawerClose"
  >
    <a-tabs v-model:activeKey="tabsInfo.activeKey" >
      <a-tab-pane key="1" tab="后端菜单列表">
        <QyMenusAdminTree  ref="roleMenusRef" @onAfterSubmit="doSaveRoleMenus"></QyMenusAdminTree>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Api列表" force-render>
        <QyApiTreeTree ref="roleApiRef"  @onAfterSubmit="doSaveRoleApis"></QyApiTreeTree>
      </a-tab-pane>
    </a-tabs>




  </a-drawer>
</template>

<script setup lang="ts">
import LayTableInfo from '@/components/LayTableInfo.vue'
import QyMenusAdminTree from '@/components/QyMenusAdminTree.vue'
import QyApiTreeTree from '@/components/QyApiTreeTree.vue'
import {computed, onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {DEFAULT_PAGESIZE} from "@/utils/constants";
import {RoleColumns} from "@/config/tableConfigs/qy_role";
import {FormInstance, message, notification} from "ant-design-vue";
import {Add, Delete, List, RoleMenusApisType, RoleType, SaveRoleApis, SaveRoleMenus, Update} from "@/api/role";
import {PageInfo} from "@/api/common";
const searchForm = reactive({ name: "",
});
const drawerData = reactive({ visible: false,
  title: "授权",
  size: "large"
});
const router = useRouter();
const formRef = ref<FormInstance>();
const roleForm = ref<FormInstance>();
const roleMenusRef = ref();
const roleApiRef = ref();
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
});
const modalInfo = reactive({
  visible:false,
  editLoading: false,
  roleInfo:{
    id:"",
    name:""
  }
})

const authInfo = reactive<RoleMenusApisType>({
  id:"",
  menusIDs:[] as string[],
  apiIDs: [] as string[],
})

onMounted(() => {
  doSearchForm();
})


function doAdd() {
  modalInfo.visible = true;
}
function doUpdate(data:RoleType) {
  modalInfo.roleInfo = data;
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
    ...pageInfo
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
function doEditRole() {
  modalInfo.editLoading = true;
  const param = {
    ...modalInfo.roleInfo
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
      modalInfo.editLoading = false;
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
      modalInfo.editLoading = false;
    });
  }
  console.log(param);

}
function doCancel() {
  roleForm.value.resetFields();
  modalInfo.visible = false;
  modalInfo.roleInfo.id = "";

}

function doOpenAuth(data:RoleType) {
  drawerData.visible = true;
  drawerData.title = "设置【"+data.name+"】的授权";
  roleMenusRef.value.treeInfo.checkedKeys = data.menusIDs;
  if (authInfo.id==data.id&&authInfo.menusIDs&&authInfo.menusIDs.length>0) {
    roleMenusRef.value.treeInfo.checkedKeys = authInfo.menusIDs;
  }
  if (roleApiRef.value) {
    roleApiRef.value.treeInfo.checkedKeys = data.apiIDs;
    if (authInfo.id==data.id&&authInfo.apiIDs&&authInfo.apiIDs.length>0) {
      roleApiRef.value.treeInfo.checkedKeys = authInfo.apiIDs;
    }
  }

  authInfo.id = data.id;
}
function doDrawerClose() {
  drawerData.visible = false;
  tabsInfo.activeKey = "1";
}
function doSaveRoleMenus(param:RoleMenusApisType) {
  authInfo.menusIDs =   param.menusIDs;
  param.id = authInfo.id;
  SaveRoleMenus(param).then(res=>{
    notification.success({
      message: '成功',
      description: "保存成功"
    });
    doSearchForm();
  }).catch(err=>{

  }).finally(()=>{
    roleMenusRef.value.treeInfo.saveBtn = false;
    drawerData.visible = false;
  });

}
function doSaveRoleApis(param:RoleMenusApisType) {
  authInfo.apiIDs =   param.apiIDs;
  param.id = authInfo.id;
  SaveRoleApis(param).then(res=>{
    notification.success({
      message: '成功',
      description: "保存成功"
    });
    doSearchForm();
  }).catch(err=>{

  }).finally(()=>{
    roleApiRef.value.treeInfo.saveBtn  = false;
    drawerData.visible = false;
  });
}


</script>

<style scoped>

</style>