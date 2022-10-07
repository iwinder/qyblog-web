<template>
  <a-tabs v-model:activeKey="tabsInfo.activeKey"  @change="doChange">
    <a-tab-pane key="1" tab="Api列表">
      <QyApisList></QyApisList>
    </a-tab-pane>
    <a-tab-pane key="2" tab="Api分组">
        <QyApisGroupList></QyApisGroupList>
    </a-tab-pane>
  </a-tabs>

</template>

<script setup lang="ts">
import QyApisList from '@/components/QyApisList.vue'
import QyApisGroupList from '@/components/QyApisGroupList.vue'
import {onMounted, reactive, ref} from "vue";
import {useParamsStore} from "@/store/params";
const state = useParamsStore()
const tabsInfo = reactive({
  activeKey: state.apisTabsActiveKey
})

const doChange = (activeKey:string,pkey:string,keys:string[]) => {
  state.apisTabsActiveKey = activeKey;

}
// import {DEFAULT_PAGESIZE} from "@/utils/constants";
// import {ApisCcolumns,ApisMethodOptions} from "@/config/tableConfigs/qy_apis";
// import {onMounted, reactive, ref} from "vue";
// import {useRouter} from "vue-router";
// import {FormInstance, message, notification} from "ant-design-vue";
// import {Delete, List, ApisType} from "@/api/apis";
// import {PageInfo} from "@/api/common";
// const searchForm = reactive({
//   path: "",
//   apiGroup: "",
//   method: "",
//   description: "",
// });
// const router = useRouter();
// const formRef = ref<FormInstance>();
// type Key = string | number;
// const formItemLayout = {
//   labelCol: { span: 4 },
//   wrapperCol: { span: 14 },
// };
// const tabsInfo = reactive({
//   activeKey:"1"
// })
// const listInfo = reactive({
//   pageInfo: {
//     current: 1,
//     pageSize: DEFAULT_PAGESIZE,
//     total: 0,
//     pages: 1,
//     firstFlag: true,
//     LastFlag: false,
//   },
//   items:[],
//   selectedIds:[],
//   loading: false,
//   searchLoading: false,
//   expand:false,
// });
//
// onMounted(() => {
//   doSearchForm();
// })
//
//
// function doAdd() {
//   // modalInfo.visible = true;
// }
// function doUpdate(data:ApisType) {
//   // modalInfo.roleInfo = data;
//   // modalInfo.visible = true;
// }
//
// function doMenuClick(e:any) {
//   if (e.key=="1") {
//     if( listInfo.selectedIds &&  listInfo.selectedIds.length>0) {
//       doDeleted(listInfo.selectedIds);
//     } else {
//       message.warning('请选择要删除项',5);
//     }
//   }
// }
//
// function doDeleted(ids:string[]){
//   Delete(ids).then(res=>{
//     notification.success({
//       message: '成功',
//       description: "删除"
//     });
//     initData();
//   }).catch(err=>{console.error("Delete error",err);});
// }
//
//
// function initData() {
//   doList({
//     current: 1,
//     pageSize: listInfo.pageInfo.pageSize,
//   });
// }
// async function doList(pageInfo:PageInfo) {
//   listInfo.loading = true;
//   var param = {
//     ...searchForm,
//     ...pageInfo
//   }
//   await List(param).then(res => {
//     if(res.pageInfo.current<=0) {
//       res.pageInfo.current = 1;
//     }
//     listInfo.pageInfo = res.pageInfo;
//     listInfo.items =  res.items;
//
//   }).catch(err => { console.error("List error",err);
//   }).finally(() => {
//     listInfo.loading = false;
//     listInfo.searchLoading = false;
//   });
// }
//
// function doTableChange(pagination:any, filters:any, sorter:any) {
//   doList(pagination);
// }
// function doSearchForm() {
//   listInfo.searchLoading = true;
//   initData();
// }
// function doSelectChange(selectedRowKeys: Key[]) {
//   listInfo.selectedIds = selectedRowKeys;
// }
</script>

<style scoped>

</style>