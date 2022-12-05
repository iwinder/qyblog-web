<template>
  <a-menu v-model:selectedKeys="listInfo.currentMenu"  mode="horizontal">
    <a-menu-item key="0">
      <a href="javascript:void(0)"   rel="noopener noreferrer" @click="doChangeMenus(0)">
        全部 <a-badge :count="totalInfo.total" :number-style="{  backgroundColor: '#fff',  color: '#999',
            boxShadow: '0 0 0 1px #d9d9d9 inset', }" show-zero />
      </a>
    </a-menu-item>
    <a-menu-item key="1">
      <a href="javascript:void(0)"   rel="noopener noreferrer" @click="doChangeMenus(2)">
        待审批  <a-badge :count="totalInfo.pendingTotal" />
      </a>
    </a-menu-item>
    <a-menu-item key="2">
      <a href="javascript:void(0)"   rel="noopener noreferrer" @click="doChangeMenus(1)">
        已审核  <a-badge :count="totalInfo.nowTotal" :number-style="{ backgroundColor: '#52c41a' }" show-zero/>
      </a>
    </a-menu-item>
  </a-menu>
  <LayTableInfo>
    <template #searchForm>
      <a-form :model="searchForm"    ref="formRef" v-bind="formItemLayout">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item  label="关键字"  name="username">
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
          <a-dropdown>
            <template #overlay>
              <a-menu @click="doMenuClick">
                <a-menu-item key="1">
                  批准
                </a-menu-item>
                <a-menu-item key="2">
                  驳回
                </a-menu-item>
                <a-menu-item key="3">
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
      <a-table :columns="CommentColumns"
               :data-source="listInfo.items"
               :rowKey = "record => record.id"
               :pagination="listInfo.pageInfo"
               :scroll = "{ x:  800}"
               :loading="listInfo.loading"
               :row-selection="{ selectedRowKeys:  listInfo.selectedIds, onChange: doSelectChange }"
               @change="doTableChange"
               :customRow="doCustomRow"
      >

        <template #bodyCell="{ text, record, index, column}">

          <template v-if="column.dataIndex === 'author'">
              <strong>
                <a-avatar class="comment-avatar"
                          :src="record.avatar"  v-if="record.memberId !='0'"
                ></a-avatar>
                <a-avatar class="comment-avatar"  v-else
                          :src="'//sdn.geekzu.org/avatar/'+ChangeStrByMd5(record.email)"
                ></a-avatar>
                {{  record.memberName }}
              </strong>
              <br>
              <template v-if="record.url">
                <a  :href="record.url" target="_blank">{{record.url}}</a>
                <a href="#" class="akismet_remove_url" commentid="284" title="移除此URL">x</a>
                <br>
              </template>
              <a :href="'mailto:'+record.email">{{record.email}}</a><br>
              <a>{{record.ip}}</a>
          </template>
          <template v-if="column.dataIndex === 'content'">
                <a-row v-if="record.rootId  !='0'">
                  回复给
                  <a>{{record.parentUserName}}</a>
                </a-row>
                <a-row> {{record.content}}</a-row>
                <a-row v-show="listInfo.showRow[index]==true">
                  <span>
                    <a href="javascript:void(0)" @click="doUpdateStatus([record.id],2)" class="text-warning"  v-if="record.statusFlag == 1">
                      <a-typography-text type="danger">驳回</a-typography-text>
                    </a>
                    <a href="javascript:void(0)" @click="doUpdateStatus([record.id],1)" class="text-primary"  v-else>批准</a>

                    <a-divider type="vertical" />
                  </span>
                  <a  href="javascript:void(0)"   @click="doOpenRepliesComment(record)" class="text-primary" >回复</a>
                  <a-divider type="vertical" />
                  <a  href="javascript:void(0)"    @click="doOpenEditComment(record)" class="text-primary" >编辑</a>
                  <a-divider type="vertical" />
                  <a href="javascript:void(0)" @click="doDeleted([record.id])"  class="text-danger" >删除</a>
                </a-row>
          </template>
          <template  v-if="column.dataIndex === 'statusFlag'">
            <a-typography-text v-if="text==1"  >已通过</a-typography-text>
            <a-typography-text v-else type="danger">待审核</a-typography-text>
          </template>
          <template v-if="column.dataIndex === 'target'">
            <a  :href="siteInfo.site_url+record.objLink" target="_blank">{{record.objTitle}}</a>
          </template>
          <template v-if="column.dataIndex === 'createdAt'">
            <a  :href="siteInfo.site_url+record.objLink" target="_blank">{{record.objTitle}}</a>
          </template>

        </template>

      </a-table>
    </template>
  </LayTableInfo>

  <a-modal v-model:visible="modalInfo.visible"  :footer="null" @cancel="doCancel">
    <template #title>
      <template v-if="modalInfo.editFlag ">
        编辑
      </template>
      <template v-else>
        回复 {{modalInfo.oldInfo.memberName}}
      </template>
    </template>
    <a-form ref="commentForm" :model="modalInfo.commentInfo" :footer="null" @cancel="doCancel" >
      <a-form-item has-feedback label="内容" name="content">
        <a-textarea v-model:value="modalInfo.commentInfo.content"  :auto-size="{ minRows: 2, maxRows: 5 }" placeholder="请输入评论内容" autocomplete="off" />

      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" :loading="modalInfo.editLoading" @click="doEditComment">
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
import {computed, onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {DEFAULT_PAGESIZE} from "@/utils/constants";
import {CommentColumns} from "@/config/tableConfigs/qy_comment";
import {FormInstance, message, notification} from "ant-design-vue";
import {Add, Delete, List, CommentType, Update, Total, UpdateState} from "@/api/comment";
import {PageInfo} from "@/api/common";
import {ChangeStrByMd5} from "@/utils/util"
import {useSiteInfo} from "@/store/siteInfo";
const siteStore =  useSiteInfo();
const siteInfo = reactive({
  site_url:"",
})
const searchForm = reactive({ name: "",
});

const router = useRouter();
const formRef = ref<FormInstance>();
const commentForm = ref<FormInstance>();

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
  currentMenu: ["0"],
  currentState:0,
  showRow: [false],
});
const modalInfo = reactive({
  visible:false,
  editLoading: false,
  editFlag:false,
  oldInfo:{
  } as CommentType,
  commentInfo:{
    content:"",
  } as CommentType,
})

const totalInfo = reactive({
  total:"0",
  nowTotal:"0",
  pendingTotal: "0",
})

onMounted(() => {
  doSearchForm();
  siteInfo.site_url = siteStore.GetSiteInfoByKey("site_url");
  if (!siteInfo.site_url.endsWith("/")) {
    siteInfo.site_url =  siteInfo.site_url + "/";
  }
})




function doChangeMenus(type:number) {
  listInfo.currentState = type;
  initData();
}
function doMenuClick(e:any) {
  if (e.key=="1") {
    if( listInfo.selectedIds &&  listInfo.selectedIds.length>0) {
      doUpdateStatus(listInfo.selectedIds,1);
    } else {
      message.warning('请选择要批准的审核项',5);
    }
  } else if  (e.key=="2") {
    if( listInfo.selectedIds &&  listInfo.selectedIds.length>0) {
      doUpdateStatus(listInfo.selectedIds,2);
    } else {
      message.warning('请选择要驳回的审核项',5);
    }
  } else if  (e.key=="3") {
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

function doGetTotal() {
  Total().then(res=>{
    totalInfo.total = res.total;
    totalInfo.nowTotal = res.nowTotal;
    totalInfo.pendingTotal = res.pendingTotal;
  }).catch(err=>{console.error("Delete error",err);});
}

function initData() {
  doList({
    current: 1,
    pageSize: listInfo.pageInfo.pageSize,
  });
  doGetTotal();
  listInfo.selectedIds =[];
}
async function doList(pageInfo:PageInfo) {
  listInfo.loading = true;
  var param = {
    ...searchForm,
    ...pageInfo,
    statusFlag:  listInfo.currentState,
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
function doOpenRepliesComment(data:CommentType) {
  modalInfo.editFlag = false;
  modalInfo.visible = true;
  modalInfo.oldInfo = data;
  modalInfo.commentInfo.parentId = data.id;
  modalInfo.commentInfo.agentId = data.agentId;
}
function doOpenEditComment(data:CommentType) {
  modalInfo.editFlag = true;
  modalInfo.visible = true;
  modalInfo.oldInfo = data;
  modalInfo.commentInfo.content = data.content;
  modalInfo.commentInfo.id = data.id;
}
function doEditComment() {
  modalInfo.editLoading = true;
  const param = {
    ...modalInfo.commentInfo
  };
  if (modalInfo.editFlag) { // 编辑
    param.id = modalInfo.oldInfo.id;
    param.rootId = modalInfo.oldInfo.rootId;
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
  } else { // 回复
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
  commentForm.value.resetFields();
  modalInfo.visible = false;
  modalInfo.commentInfo  = {};

}

function doUpdateStatus(ids:string[],state:number) {
  let param = {
    ids:ids,
    statusFlag:state,
  }
  UpdateState(param).then(res=>{
    notification.success({
      message: '成功',
      description: "更新成功"
    });
    initData();
  }).catch(err=>{})
}

function doDrawerClose() {
  // drawerData.visible = false;
  tabsInfo.activeKey = "1";
}

function doCustomRow(record :any, index:number) {
  return {
    onMouseenter: (event:any) => {
      listInfo.showRow[index] = true;
    },  // 鼠标移入行
    onMouseleave: (event:any) => {
      listInfo.showRow[index] = false;
    }
  }
}



</script>

<style scoped lang="less">
.comment-avatar{
  float: left;
  margin-right: 10px;
  margin-top: 1px;
}
:deep( .ant-table-tbody td) {
  font-size: 12px;
  line-height: 1.5em;
}
</style>