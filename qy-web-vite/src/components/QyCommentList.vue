<template>
  <div style="width: 100%">
  <QyRepliesForm v-if="siteCommentFlag=='1'&&commentFlag" :agent-id="commentAgentId" :parent-id="0" @onSaveAfter="doSave"></QyRepliesForm>
  <a-row class="commentClose"  v-else> <a-typography-title :level="2">评论已关闭</a-typography-title>  </a-row>
  <a-list
      class="comment-list"
      :header="`${dataInfo.count} 条评论`"
      item-layout="horizontal"
      :data-source="dataInfo.items"
      :pagination="dataInfo.pagination"
  >
    <template #renderItem="{ item,index }" >
      <a-list-item>
        <a-comment :author="item.memberName" :avatar="item.avatar">
          <template #actions>
            <span >
              <a-row v-if="siteCommentFlag=='1'&&commentFlag">
                    <a href="javascript:void(0)"  @click="doShow(index)">回复</a>
              </a-row>
              <a-row v-if="dataInfo.repliesFormShow[index]">
                <QyRepliesForm  :ref="repliesForm[index]" :agent-id="commentAgentId" :parent-id="item.id" @onSaveAfter="doRepliesSave"></QyRepliesForm>
              </a-row>
            </span>
          </template>
          <template #content>
            <p>
              {{ item.content }}
            </p>
          </template>
          <template #datetime>
            <a-tooltip :title="item.createdAt">
              <span>{{ item.createdAt }}</span>
            </a-tooltip>
          </template>
          <QyCommentChildenList v-if="item.count>0" :root-id="item.id" :all-not-show="dataInfo.initChildFormNotShow" :show-rid="dataInfo.showRid"
                                @onShowAfter="doChildShow"
                                :comment-agent-id="commentAgentId"  :site-comment-flag="siteCommentFlag" :comment-flag="commentFlag"></QyCommentChildenList>
        </a-comment>
      </a-list-item>
    </template>
  </a-list>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref, watch} from "vue";
import QyRepliesForm from "@/components/QyRepliesForm.vue";
import QyCommentChildenList from "@/components/QyCommentChildenList.vue";
import {PageInfo} from "@/api/common";
import {CommentDto, List} from "@/api/comment";
import {DEFAULT_PAGESIZE} from "@/utils/constants";
import {ValidateUrl} from "@/utils/util"
import {DEF_AVATER_PIX} from "@/utils/constants"
import * as moment from "moment/moment";
const repliesChildList = ref([]);
const repliesForm = ref([]);
const props =  defineProps({
  commentAgentId: {
    default:"0"
  },
  siteCommentFlag: {
    default:"0"
  },
  commentFlag: {
    default: false
  }
});

const dataInfo = reactive({
  items:[] as CommentDto[],
  count:0,
  repliesFormShow:[false],
  repliesChildList:[],
  initChildFormNotShow:false,
  showRid:"0",
  pagination:{
    onChange: (page: number) => {
      initFormShow();
      ListData(page);
    },
    pageSize: 3,
    total:0,
    current:1,
  },
})


onMounted(() => {
  initData();
})

function initData() {
  if (props.commentAgentId.length==0|| props.commentAgentId=="0") {
    return;
  }
  ListData(dataInfo.pagination.current)

}
function ListData(num:number) {
  doList({
    current:num,
    pageSize: DEFAULT_PAGESIZE,
  })
}
const doList = (pageInfo:PageInfo) => {
  const param = {
    ...pageInfo,
    agentId:props.commentAgentId,
  }
  List(param).then(res=>{
    if (param.current==1) {
      dataInfo.count = res.count;
    }
    dataInfo.items = res.items;
    dataInfo.items.forEach(e=>{
      if(!ValidateUrl(e.avatar)) {
        e.avatar = DEF_AVATER_PIX +  e.avatar
      }
      e.createdAt = moment( e.createdAt ).format('YYYY-MM-DD hh:mm:ss');
    });
    dataInfo.pagination.current = res.pageInfo.current;
    dataInfo.pagination.pageSize = res.pageInfo.pageSize;
    dataInfo.pagination.total = res.pageInfo.total;
  }).catch(err=>[

  ]).finally(()=>{})
}
const doSave = (data:any) => {
  console.log("初始化调用");
    ListData(1);
}
const doRepliesSave = (idx:number)=> {
  console.log("回复初始化调用");
  dataInfo.repliesFormShow[idx] = true;
}
const doShow = (idx:number) => {
  console.log("doShow",idx);
  initFormShow();
  dataInfo.repliesFormShow[idx] = true;
  dataInfo.initChildFormNotShow = true;
}
const doChildShow = (data:string) => {
  dataInfo.initChildFormNotShow = false;
  dataInfo.showRid = data;
  initFormShow();
}
const initFormShow = () => {
  dataInfo.repliesFormShow.forEach((e,i)=>{
    dataInfo.repliesFormShow[i] =false;
  });
}
</script>

<style scoped lang="less">
.commentClose{
  padding: 10px 0;
}
:deep(.ant-comment) {
  width: 100%;
  .ant-comment-actions {
    width: 100%;
    li {
      width: 100%;
    }
  }
}
</style>