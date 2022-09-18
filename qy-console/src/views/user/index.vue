<template>
  <div class="main">
    <a-row class="table-operations">
      <a-col :xs="{span:24}"  :lg="{ span: 12}">
        <a-form layout="inline" :model="searchFrom"    >
          <a-form-item>
            <a-input v-model="searchFrom.searchText" placeholder="请输入关键字">
              <template #prefix>
                <search-outlined  style="color:rgba(0,0,0,.25)"/>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary"  :loading ="searchLoading"  @click="searchForm">
              搜索
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col  :xs="{span:24}"  :lg="{ span: 5, offset: 7 }" style=" margin-top: 5px;">
        <a-button  type="primary"  @click="add()">
          新增
        </a-button>
        <a-dropdown>
          <template #overlay>
            <a-menu @click="handleMenuClick">
              <a-menu-item key="1">
                删除
              </a-menu-item>
            </a-menu>
          </template>
          <a-button> 批量操作   <DownOutlined /> </a-button>
        </a-dropdown>
      </a-col>
    </a-row>

    <a-table :columns="columns"
             :data-source="dataSource"
             :rowKey = "record => record.id"
             :pagination="pagination"
             :scroll = "{ x:  800}"
             :loading="loading"
             :row-selection="{ selectedRowKeys: selectedIds, onChange: onSelectChange }"
             @change="handleTableChange"
    >

            <span slot="disable" slot-scope="disable">
                <template v-if="disable"> 已禁用 </template>
                <template v-else> 正常 </template>
            </span>

      <span slot="action" slot-scope="text, record">
                <router-link :to="{name:'user-id',params:{ id: record.id }}">编辑 </router-link>
                <a-divider type="vertical" />

                     <a  href="javascript:void(0)"  @click="deleted([record.id])" >删除</a>

            </span>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {reactive, ref,computed} from "vue";
const router = useRouter();
const searchFrom = reactive({ searchText: "",
});
const searchLoading = ref<boolean>(false);
const loading = ref<boolean>(false);

const  selectedIds = [];
const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    key: 'nickname',
  },

  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },

  {
    title: '账户状态',
    dataIndex: 'disable',
    key: 'disable',
    scopedSlots: { customRender: 'disable' },
  },

  {
    title: '创建时间',
    dataIndex: 'createdDate',
    key: 'createdDate',
  },
  {
    title: '更新时间',
    dataIndex: 'lastModifiedDate',
    key: 'lastModifiedDate',
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },

];
const dataSource = [];
const current = ref();
const pageSize = ref();
const pagination = computed(() => ({
  total: 200,
  current: current.value,
  pageSize: pageSize.value,
}));
function add() {
  router.push("/system/user/add");
}


function searchForm() {
  // let _this = this;
  // _this.initData();

}
function handleMenuClick() {
  
}
function handleTableChange() {

}
function deleted(ids:bigint[]){

}
function onSelectChange() {

}
</script>

<style scoped>

</style>