<template>
  <a-tabs v-model:activeKey="tabsInfo.activeKey"  @change="doTabsChange">
    <a-tab-pane :key="type.id" :tab="type.name" v-for="type in tabsInfo.items" >
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

              </a-col>
            </a-row>
          </a-form>
        </template>
        <template #operations>
          <a-row >
            <a-col  :xs="{span:24}"  :lg="{ span: 24 }" style=" margin-top: 5px;">
              <a-button  type="primary"  @click="doAdd(type.id,type.name)">
                上传文件
              </a-button>
              <a-button  v-if="type.id!='1'" :type="tabsInfo.loadMoreType" :disabled="listInfo.pageInfo.lastFlag"  @click="doLoadMore()">
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
                   @change="doTableChange"
          >

            <template #bodyCell="{ text, record, index, column}">
              <template v-if="column.dataIndex === 'fname'">

              </template>
              <template v-if="column.dataIndex === 'fsize'">
                {{getSize(record.fsize)}}
              </template>

              <template v-if="column.dataIndex === 'action'">
                <a  href="javascript:void(0)"  @click="doMoreInfo(record)">详情</a>

<!--                  <a-divider type="vertical" />-->
<!--                  <a-popconfirm title="确定要删除所选项吗？"  @confirm="doDeleted([record.id])">-->
<!--                    <a  href="javascript:void(0)"  >删除</a>-->
<!--                  </a-popconfirm>-->

              </template>

            </template>

          </a-table>
        </template>
      </LayTableInfo>
    </a-tab-pane>
  </a-tabs>

  <a-modal v-model:visible="tabsInfo.uploadObj.visible" :title="tabsInfo.uploadObj.title" :footer="null" @cancel="doCancelUpload">
    <a-upload-dragger 
        name="file"
        :multiple="false"
        :action="'/api/admin/v1/file/upload/byType/'+tabsInfo.typeId"
        list-type="picture"
        @change="doUploadChange"
        @drop="doUploadDrop"
        @preview="doPreview"
    >
      <p class="ant-upload-drag-icon">
        <inbox-outlined></inbox-outlined>
      </p>
      <p class="ant-upload-text"> 将文件拖到此处，或点击上传</p>
<!--      <p class="ant-upload-hint">-->
<!--        Support for a single or bulk upload. Strictly prohibit from uploading company data or other-->
<!--        band files-->
<!--      </p>-->
    </a-upload-dragger>
  </a-modal>

  <a-drawer
      v-model:visible="tabsInfo.infoObj.visible"
      class="custom-class"
      style="color: red"
      :title="tabsInfo.infoObj.item.fname"
      :closable="false"
      placement="right"
      @close="doInfoClose"
  >
      <div>
        <a-row style="margin-bottom: 20px;">
          <a-col class="imageWrapper" :span="24">
            <a-image class="previewImage" v-if="tabsInfo.infoObj.item.mimeType && tabsInfo.infoObj.item.mimeType.indexOf('image')==0" :src="tabsInfo.infoObj.item.defUrl"   :fallback="DEF_IMG" />
            <a-image v-else :src="DEF_IMG" class="previewImage"/>
          </a-col>
        </a-row>
      </div>
    <a-descriptions title="文件详情"   :column="1">
        <a-descriptions-item label="文件名" class="wordBreak">
          {{tabsInfo.infoObj.item.fname}}
        </a-descriptions-item>
        <a-descriptions-item label="原始文件名" class="wordBreak">
          {{tabsInfo.infoObj.item.originFileName}}
        </a-descriptions-item>
        <a-descriptions-item label="文件类型" class="wordBreak">
          {{tabsInfo.infoObj.item.mimeType}}
        </a-descriptions-item>
        <a-descriptions-item label="ETag" class="wordBreak">
          {{tabsInfo.infoObj.item.fhash}}
        </a-descriptions-item>
        <a-descriptions-item label="文件大小" class="wordBreak">
          {{getSize(tabsInfo.infoObj.item.fsize)}}
        </a-descriptions-item>
<!--        <a-descriptions-item v-if="tabsInfo.infoObj.item.id>1" label="存储类型" class="wordBreak">-->
<!--          <template v-if="tabsInfo.infoObj.item.status==0">-->
<!--            标准存储-->
<!--          </template>-->
<!--          <template v-if="tabsInfo.infoObj.item.status==1">-->
<!--            低频存储-->
<!--          </template>-->
<!--        </a-descriptions-item>-->
        <a-descriptions-item label="文件链接" class="wordBreak">

          <span style="margin-right: 10px;" class="wordBreak"><a :href="tabsInfo.infoObj.item.defUrl" target="_blank" rel="noopener"  >{{tabsInfo.infoObj.item.defUrl}}</a></span>
          <a-button class="copy_btn" type="dashed"   @click="doCopy">   <template #icon><CopyOutlined /></template>  </a-button>


        </a-descriptions-item>
        <a-descriptions-item label="最后更新" class="wordBreak">
          {{tabsInfo.infoObj.item.updatedAt}}
        </a-descriptions-item>
    </a-descriptions>
  </a-drawer>
</template>

<script setup lang="ts">
import LayTableInfo from '@/components/LayTableInfo.vue'
import {FileLibColumns} from "@/config/tableConfigs/qy_file_lib"
import {FileLibType, FileList, FileType, FileTypePageInfo, TypeList} from "@/api/file_lib_config";
import {onMounted, reactive, ref} from "vue";
import {DEFAULT_PAGESIZE,DEF_IMG} from "@/utils/constants";
import {FormInstance, message, UploadChangeParam} from "ant-design-vue";
import useClipboard from 'vue-clipboard3'
const { toClipboard } = useClipboard()
onMounted(() => {
  doGetTabs();
})
const formRef = ref<FormInstance>();

const tabsInfo = reactive({
  items:[] as FileLibType[],
  searchForm:{
    searchText:"",
    typeId: "1",
  },
  formItemLayout: {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  },
  selectedIds:[],
  loadMoreMessage: "加载更多",
  loadMoreType:"danger",
  searchLoading: false,
  typeId:"",
  activeKey:"1",
  uploadObj: {
    visible:false,
    title:"上传"
  },
  infoObj: {
    visible: false,
    item:{} as FileType,
  }
});

const listInfo = reactive({
  pageInfo: {
    current: 1,
    pageSize: DEFAULT_PAGESIZE,
    total: 0,
    pages: 1,
    firstFlag: true,
    lastFlag: false,
    marker: "",
  },
  items:[] as FileType[],
  selectedIds:[],
  loading: false,
  searchLoading: false,
})
function doTabsChange(activeKey:string) {
  tabsInfo.searchForm.typeId = activeKey;
  initData();
}

async function doGetTabs() {
  // tabsInfo.loading = true;
  var param = {
    current: 0,
    statusFlag: 1,
  }
  await TypeList(param).then(res => {
    tabsInfo.items =  res.items;
    initData();
  }).catch(err => { console.error("List error",err);
  }).finally(() => {
    // tabsInfo.loading = false;
  });
}
function doTableChange(pagination:any, filters:any, sorter:any) {
  if ( tabsInfo.searchForm.typeId=="1") {
    doList(pagination);
  } else {
    listInfo.pageInfo.current = pagination.current;
    listInfo.pageInfo.pageSize = pagination.pageSize;
  }
}
function doSearchForm() {
  tabsInfo.searchLoading = true;
  tabsInfo.loadMoreMessage = "加载更多";
  tabsInfo.loadMoreType = "danger";
  initData();
}
function doAdd(id:string,name:string) {
  tabsInfo.typeId = id;
  tabsInfo.uploadObj.visible = true;
  tabsInfo.uploadObj.title = "上传文件到【"+name+"】";
}

function doCancelUpload() {
  tabsInfo.uploadObj.visible = false;
}
function doUploadChange(info: UploadChangeParam) {
  const status = info.file.status;
  if (status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (status === 'done') {
    message.success(`${info.file.name} file uploaded successfully.`);
  } else if (status === 'error') {
    message.error(`${info.file.name} file upload failed.`);
  }
}
function doUploadDrop(e: DragEvent) {
  console.log(e);
}
function doLoadMore() {
  tabsInfo.loadMoreMessage = "加载更多";
  tabsInfo.loadMoreType = "danger";
  if (listInfo.pageInfo.lastFlag) {
    tabsInfo.loadMoreMessage = "暂无更多数据";
    tabsInfo.loadMoreType = "default";
    return false;
  }
  doList({
    marker: listInfo.pageInfo.marker,
    pageSize: listInfo.pageInfo.pageSize,
  })
}

function doMoreInfo(info: FileType) {
  tabsInfo.infoObj.visible = true;
  tabsInfo.infoObj.item = info;
}
function initData() {
  listInfo.items =[];
  listInfo.pageInfo.current = 1;
  if ( tabsInfo.searchForm.typeId=="1") {
    doList({
      current: 1,
      pageSize: listInfo.pageInfo.pageSize,
    })
  } else {
    doList({
      marker: listInfo.pageInfo.marker,
      pageSize: listInfo.pageInfo.pageSize,
    })
  }
}
async function doList(pageInfo:FileTypePageInfo) {
  listInfo.loading = true;
  var param = {
    ...tabsInfo.searchForm,
    ...pageInfo
  }
  await FileList(param).then(res => {
    if(res.pageInfo.current<=0) {
      res.pageInfo.current = 1;
    }

    if ( tabsInfo.searchForm.typeId=="1") {
      listInfo.pageInfo = res.pageInfo;
      listInfo.items =  res.items;
    } else {
      listInfo.items =  listInfo.items.concat(res.items);
      listInfo.pageInfo.total = listInfo.items.length;
      listInfo.pageInfo.pageSize = res.pageInfo.pageSize;
      if (listInfo.pageInfo.marker=="") {
        listInfo.pageInfo.current = 1;
      } else {
        listInfo.pageInfo.current =   listInfo.pageInfo.current +1;
      }
      listInfo.pageInfo.marker =  res.pageInfo.marker;
      listInfo.pageInfo.lastFlag = res.pageInfo.lastFlag;
      if (listInfo.pageInfo.lastFlag) {
        tabsInfo.loadMoreMessage = "暂无更多数据";
        tabsInfo.loadMoreType = "default";
      }
    }


  }).catch(err => { console.error("List error",err);
  }).finally(() => {
    listInfo.loading = false;
    tabsInfo.searchLoading = false;
  });
}
function doInfoClose() {
  tabsInfo.infoObj.visible = false;
}
async function doCopy() {
  try {
    await toClipboard(tabsInfo.infoObj.item.defUrl as string)
    message.success('复制成功',5);
  } catch (e) {
    console.error("复制失败e",e)
    message.success('复制失败',5);
  }
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

<style  lang="less" scoped>
.imageWrapper {
  background-color: transparent;
  overflow: hidden;
  :deep(.ant-image){
    width: 100%;
    max-height: 210px;
    overflow: hidden;
  }
}
</style>