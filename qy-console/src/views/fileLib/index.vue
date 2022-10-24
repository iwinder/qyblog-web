<template>
  <a-tabs v-model:activeKey="tabsInfo.activeKey">
    <a-tab-pane :key="type.id" :tab="type.name" v-for="type in tabsInfo.items">
      <LayTableInfo >
        <template #searchForm>
          <a-form :model="tabsInfo.searchForm"    ref="formRef" v-bind="tabsInfo.formItemLayout">
            <a-row :gutter="24">
              <a-col :span="8">
                <a-form-item  label="文件名"  name="username">
                  <a-input v-model:value="tabsInfo.searchForm.searchText" placeholder="请输入关键字"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8" style="text-align: right">
                <a-button type="primary" html-type="submit"  :loading ="tabsInfo.searchLoading"  @click="doSearchForm">搜索</a-button>
                <a-button style="margin: 0 8px" @click="()=>formRef.resetFields()">重置</a-button>
              </a-col>
            </a-row>
          </a-form>
        </template>
        <template #operations>
          <a-row >
            <a-col  :xs="{span:24}"  :lg="{ span: 24 }" style=" margin-top: 5px;">
              <a-button  type="primary"  @click="doAdd()">
                上传文件
              </a-button>
              <a-button  v-if="type.id!='1'" :type="tabsInfo.loadMoreType"  @click="doLoadMore()">
                {{tabsInfo.loadMoreMessage}}
              </a-button>
            </a-col>
          </a-row>
        </template>
        <template #content>
          <a-table :columns="FileLibColumns"
                   :data-source="listInfo.items"
                   :rowKey = "record => record.id"
                   :pagination="listInfo.pageInfo"
                   :scroll = "{ x:  800}"
                   :loading="listInfo.loading"

          >

            <template #bodyCell="{ text, record, index, column}">
              <template v-if="column.dataIndex === 'fname'">

              </template>
              <template v-if="column.dataIndex === 'fsize'">
                {{getSize(record.fsize)}}
              </template>

              <template v-if="column.dataIndex === 'action'">
                <a  href="javascript:void(0)"  @click="doUpdate(record)">配置</a>
                <template v-if="record.type!='SYSTEM'">
                  <a-divider type="vertical" />
                  <a-popconfirm title="确定要删除所选项吗？"  @confirm="doDeleted([record.id])">
                    <a  href="javascript:void(0)"  >删除</a>
                  </a-popconfirm>
                </template>
              </template>

            </template>

          </a-table>
        </template>
      </LayTableInfo>
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts">
import LayTableInfo from '@/components/LayTableInfo.vue'
import {FileLibColumns} from "@/config/tableConfigs/qy_file_lib"
import {PageInfo} from "@/api/common";
import {FileLibType, FileType, TypeList} from "@/api/file_lib_config";
import {onMounted, reactive} from "vue";
import {DEFAULT_PAGESIZE} from "@/utils/constants";
onMounted(() => {
  doGetTabs();
})


const tabsInfo = reactive({
  items:[] as FileLibType[],
  searchForm:{
    searchText:""
  },
  formItemLayout: {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  },
  selectedIds:[],
  loadMoreMessage: "加载更多",
  loadMoreType:"danger",

  searchLoading: false,
});

const listInfo = reactive({
  pageInfo: {
    current: 1,
    pageSize: DEFAULT_PAGESIZE,
    total: 0,
    pages: 1,
    firstFlag: true,
    LastFlag: false,
  },
  items:[] as FileType[],
  selectedIds:[],
  loading: false,
  searchLoading: false,
})

async function doGetTabs() {
  // tabsInfo.loading = true;
  var param = {
    current: 0,
    statusFlag: 1,
  }
  await TypeList(param).then(res => {
    tabsInfo.items =  res.items;

  }).catch(err => { console.error("List error",err);
  }).finally(() => {
    // tabsInfo.loading = false;
  });
}

function doSearchForm() {

}
function doAdd() {

}
function doLoadMore() {

}
function getSize(sizeStr:string) {
  if (!sizeStr){
    return "";
  }
  let size = parseInt(sizeStr);
  var num = 1024.00; //byte
  if (size < num) {
    return size + "B";
  } else if (size < Math.pow(num, 2)) {
    return (size / num).toFixed(2) + "KB"; //kb
  } else if (size < Math.pow(num, 3)) {
    return (size / Math.pow(num, 2)).toFixed(2) + "MB"; //M
  } else if (size < Math.pow(num, 4)) {
    return (size / Math.pow(num, 3)).toFixed(2) + "G"; //G
  } else {
    return (size / Math.pow(num, 4)).toFixed(2) + "T"; //T
  }
}
</script>

<style scoped>

</style>