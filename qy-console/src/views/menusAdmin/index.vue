<template>
  <LayTableInfo>
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
      <a-table :columns="MenusAdminColumns"
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
            <template v-if="record.type==1">
              <a  href="javascript:void(0)"  @click="doAdd(record.id)">添加子菜单</a>
<!--              <router-link :to="{name:'menusAdmin-add',params:{ pid: record.id }}">添加子菜单 </router-link>-->
              <a-divider type="vertical" />
            </template>
            <router-link :to="{name:'menusAdmin-update',params:{ id: record.id }}">编辑 </router-link>
            <a-divider type="vertical" />
            <a-popconfirm title="确定要删除所选项吗？"  @confirm="doDeleted([record.id])">
              <a  href="javascript:void(0)"  >删除</a>
            </a-popconfirm>
          </template>

        </template>

      </a-table>
    </template>
  </LayTableInfo>
</template>

<script setup lang="ts">
import LayTableInfo from '@/components/LayTableInfo.vue'
import {onMounted, reactive} from "vue";
import {useRouter} from "vue-router";
import {PageInfo} from "@/api/common";
import {Delete, List} from "@/api/menus_admin";
import {MenusAdminColumns} from "@/config/tableConfigs/qy_menus_admin";
import {message, notification} from "ant-design-vue";
import pinia from '@/store/store'
import {useParamsStore} from "@/store/params";
import {DEFAULT_PAGESIZE} from "@/utils/constants";
type Key = string | number;
const router = useRouter();
const state = useParamsStore(pinia)
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

onMounted(() => {
  initData();
})
function doAdd(pid:string) {
  state.menusParentId = pid
  router.push("/system/menusAdmin/add");
}
function initData() {
  doList({
    current: 1,
    pageSize: 2,
  });
}
async function doList(pageInfo:PageInfo) {
  listInfo.loading = true;
  var param = {
    ...pageInfo,
    parentId:"0",
    hasChildren: true
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

function doSelectChange(selectedRowKeys: Key[]) {
  listInfo.selectedIds = selectedRowKeys;
}


</script>

<style scoped>

</style>