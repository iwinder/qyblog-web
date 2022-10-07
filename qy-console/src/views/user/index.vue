<template>
  <LayTableInfo>
    <template #searchForm>
      <a-form :model="searchForm"    ref="formRef" >
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item  label="用户名"  name="username">
              <a-input v-model:value="searchForm.username" placeholder="请输入关键字"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8" v-show="listInfo.expand">
            <a-form-item  label="昵称" name="nickname">
              <a-input v-model:value="searchForm.nickname" placeholder="请输入关键字"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8" v-show="listInfo.expand">
            <a-form-item  label="邮箱" name="email">
              <a-input v-model:value="searchForm.email" placeholder="请输入关键字"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8" v-show="listInfo.expand">
            <a-form-item  label="状态" name="statusFlag">
              <a-select
                  v-model:value="searchForm.statusFlag"
                  style="width: 100%"
                  placeholder="请选择状态"
                  :options="UserStates"
              ></a-select>
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
      <a-table :columns="UserCcolumns"
               :data-source="listInfo.items"
               :rowKey = "record => record.id"
               :pagination="listInfo.pageInfo"
               :scroll = "{ x:  800}"
               :loading="listInfo.loading"
               :row-selection="{ selectedRowKeys:  listInfo.selectedIds, onChange: doSelectChange }"
               @change="doTableChange"
      >

        <template #bodyCell="{ text, record, index, column}">

          <template v-if="column.dataIndex === 'roles'">
            <template v-if="text.length>0">
              <template v-for="item in text">
                <a-tag>{{item.name}}</a-tag>
              </template>
            </template>
            <template v-else>暂无</template>
          </template>

          <template v-if="column.dataIndex === 'statusFlag'">
            <template v-if="text==1"> 启用 </template>
            <template v-else-if="text==2"> 禁用 </template>
            <template v-else-if="text==3"> 删除 </template>
            <template v-else> 未知  </template>
          </template>

          <template v-if="column.dataIndex === 'action'">
            <router-link :to="{name:'user-update',params:{ id: record.id }}">编辑 </router-link>
            <a-divider type="vertical" />
            <a-popconfirm title="确定要删除所选项吗？"  @confirm="doDeleted([record.id])">
              <a  href="javascript:void(0)"  >删除</a>
            </a-popconfirm>
            <a-divider type="vertical" />
              <a  href="javascript:void(0)"  @click="doOpenChangePassword(record)">重置密码</a>
          </template>

        </template>

      </a-table>
    </template>
  </LayTableInfo>

  <a-modal v-model:visible="modalInfo.visible" :title="modalInfo.title"  >
    <a-form ref="passForm" :model="modalInfo.userInfo" :footer="null" @cancel="doCancel" >
      <a-form-item has-feedback label="新密码" name="name">
        <a-input v-model:value="modalInfo.userInfo.password" placeholder="请输入新密码"></a-input>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" :loading="modalInfo.editLoading" @click="doChangePassword">
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
import {useRouter} from "vue-router";
import {reactive, ref,computed,onMounted} from "vue";
import {UserCcolumns,UserStates} from "@/config/tableConfigs/qy_user";
import {ChangePassword, Delete, List, UserType} from "@/api/user";
import {PageInfo} from "@/api/common";
import {DEFAULT_PAGESIZE} from "@/utils/constants";
import {FormInstance, message, notification} from "ant-design-vue";
import {Md5} from "ts-md5";
const router = useRouter();
const searchForm = reactive({ username: "",
  nickname: "",
  email: "",
  statusFlag: -1,
});
const formRef = ref<FormInstance>();
const passForm = ref<FormInstance>();
type Key = string | number;
const md5 = new Md5();

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
  expand: false,
});

const modalInfo = reactive({
  visible:false,
  editLoading: false,
  title: "重置密码",
  userInfo:{
    id:"",
    password:""
  }
})

function doAdd() {
  router.push("/system/user/add");
}

onMounted(() => {
  doSearchForm();
})

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
      description: "删除成功"
    });
    initData();
  }).catch(err=>{console.error("Delete error",err);});
}

function doSelectChange(selectedRowKeys: Key[]) {
  listInfo.selectedIds = selectedRowKeys;
}

function doOpenChangePassword(user:UserType) {
  modalInfo.title = "重置用户【"+user.nickname+"】的密码";
  modalInfo.userInfo.id = user.id;
  modalInfo.visible = true;
}

function doChangePassword() {
  modalInfo.editLoading = true;
  passForm.value.validate().then((res:any) => {
    const newPas = md5.appendStr(modalInfo.userInfo.password).end();
    if (!newPas) {
      notification.error({
        message: '失败',
        description: "密码加密异常"
      });
      return
    }
    const param = {
      id :modalInfo.userInfo.id,
      password: newPas.toString()
    }

    ChangePassword(param).then(ares=>{
      notification.success({
        message: '成功',
        description: "保存成功"
      });
      modalInfo.visible = false;
    }).catch(aerr=>{}).finally(()=>{
      modalInfo.editLoading = false;
    })
  }).catch((err:any) => {
    modalInfo.visible = false;
    modalInfo.editLoading = false;
  });

}
</script>

<style scoped lang="less">
.table-operations {
  margin: 10px 0;
}
</style>