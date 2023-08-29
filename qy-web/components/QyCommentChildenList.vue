<template>
  <div style="width: 100%">
  <a-list
      class="comment-list"
      item-layout="horizontal"
      :data-source="dataInfo.items"
      :pagination="dataInfo.pagination"
  >
    <template #renderItem="{ item,index }">
      <a-list-item>
        <a-comment  >
          <template #avatar>
            <a-avatar :src="item.avatar" alt="W" style="background-color: #f56a00;color: #fff;"/>
          </template>
          <template #author>
            <template v-if="item.memberId=='1'">

                {{item.memberName}}
                <SketchOutlined :style="{ color: 'hotpink' }"/>

            </template>
            <template v-else>
              {{item.memberName}}
            </template>
          </template>
          <template #actions>
            <span >
              <a-row v-if="siteCommentFlag=='1'&&commentFlag">
                    <a href="javascript:void(0)"  @click="doShow(index)">回复</a>
              </a-row>
               <QyRepliesForm v-if="dataInfo.repliesFormShow[index]" :reply-idx="index" :agent-id="commentAgentId" :parent-id="item.id" @onSaveAfter="doSave"></QyRepliesForm>
            </span>
          </template>
          <template #content>
            <p>
              <span v-if="item.parentUserName.length>0">
                回复
                <a>@{{item.parentUserName}}：</a>
              </span>  {{ item.content }}
            </p>
          </template>
          <template #datetime>
            <a-tooltip :title="item.createdAt">
              <span>{{ item.createdAt }}</span>
            </a-tooltip>
          </template>
        </a-comment>
      </a-list-item>
    </template>
  </a-list>
  </div>
</template>

<script setup lang="ts">
import {SketchOutlined} from '@ant-design/icons-vue';
import {onMounted, reactive, watch} from "vue";
import QyRepliesForm from "~/components/QyRepliesForm.vue";
import {PageDto} from "~/api/common";
import {CommentDto, CommentListDto, GetCommentListUrl} from "~/api/comment";
import {DEFAULT_PAGESIZE} from "~/utils/constants";
import {ValidateUrl} from "~/utils/util"
import {DEF_AVATER_PIX} from "~/utils/constants"
import   dayjs from 'dayjs'
import {useFetch} from "nuxt/app";
const emit = defineEmits(['onShowAfter'])
const props =  defineProps({
  commentAgentId: {
    default:"0"
  },
  siteCommentFlag: {
    default:"0"
  },
  commentFlag: {
    default: false
  },
  rootId: {
    default:"0"
  },
  allNotShow: {
    default:false
  },
  showRid: {
    default: "-1"
  }
});
const dataInfo = reactive({
  items:[] as CommentDto[],
  count:0,
  repliesFormShow:[false],
  repliesFormChildShow: [false],
  pagination:{
    size:"small",
    pageSize: 5,
    total:0,
    current:1,
    onChange: async (page: number) => {
      initFormShow();
      await ListData(page);
    },
  },
})



watch(() =>props.allNotShow,(a)=>{
  if (a==true) {
    initFormShow();
  }
});
watch(() =>props.showRid,(a)=>{
  if (a!=props.rootId) {
    initFormShow();
  }
});
watch(() =>props.showRid,(a)=>{
  if (a!=props.rootId) {
    initFormShow();
  }
});

const {data: alistData, pending, refresh, error} = await useFetch(GetCommentListUrl(), {
  params: {
    current: 1,
    pageSize: dataInfo.pagination.pageSize,
    agentId: props.commentAgentId,
    rootId: props.rootId
  }
});
if (error.value != null) {
  if (process.server) {
    console.error("评论列表请求异常 baseErr.value:", error.value);
  }
} else {
  const alist = alistData.value as CommentListDto;
  if (dataInfo.pagination.current == 1) {
    dataInfo.count = alist.count;
  }
  dataInfo.items = alist.items;
  dataInfo.items.forEach(e => {
    if (!ValidateUrl(e.avatar as string)) {
      e.avatar = DEF_AVATER_PIX + e.avatar
    }
    e.createdAt = dayjs(e.createdAt).format('YYYY-MM-DD hh:mm:ss');
  });
  dataInfo.pagination.current = parseInt(alist.pageInfo.current);
  dataInfo.pagination.pageSize = parseInt(alist.pageInfo.pageSize);
  dataInfo.pagination.total = parseInt(alist.pageInfo.total);
}


async function ListData(num: number) {
  await doList({
    current: num,
    pageSize: DEFAULT_PAGESIZE,
  })
}
const doList = async (pageInfo: PageDto) => {
  const param = {
    ...pageInfo,
    agentId: props.commentAgentId,
    rootId: props.rootId
  }
  const {data: listDatas, pending, refresh, error} = await useFetch(GetCommentListUrl(), {
    params: param
  });
  if (error.value != null) {
    if (process.server) {
      console.error("评论列表请求异常 baseErr.value:", error.value);
    }
  } else {
    const alist = listDatas.value as CommentListDto;
    if (param.current == 1) {
      dataInfo.count = alist.count;
    }
    dataInfo.items = alist.items;
    dataInfo.items.forEach(e => {
      if (!ValidateUrl(e.avatar as string)) {
        e.avatar = DEF_AVATER_PIX + e.avatar
      }
      e.createdAt = dayjs(e.createdAt).format('YYYY-MM-DD hh:mm:ss');
    });
    dataInfo.pagination.current = parseInt(alist.pageInfo.current);
    dataInfo.pagination.pageSize = parseInt(alist.pageInfo.pageSize);
    dataInfo.pagination.total = parseInt(alist.pageInfo.total);
  }

  // List(param).then(res=>{
  //   if (param.current==1) {
  //     dataInfo.count = res.count;
  //   }
  //   dataInfo.items = res.items;
  //   dataInfo.items.forEach(e=>{
  //     if(!ValidateUrl(e.avatar)) {
  //       e.avatar = DEF_AVATER_PIX +  e.avatar
  //     }
  //     e.createdAt = dayjs( e.createdAt ).format('YYYY-MM-DD hh:mm:ss');
  //   });
  //   dataInfo.pagination.current = res.pageInfo.current;
  //   dataInfo.pagination.pageSize = res.pageInfo.pageSize;
  //   dataInfo.pagination.total = res.pageInfo.total;
  // }).catch(err=>[
  //
  // ]).finally(()=>{})
}
const doSave = (data:number) => {
  dataInfo.repliesFormShow[data] = false;
  ListData(1);
}


const doShow = (idx:number) => {

  initFormShow();
  dataInfo.repliesFormShow[idx] = true;
  emit('onShowAfter',props.rootId);

}
const initFormShow = () => {
  dataInfo.repliesFormShow.forEach((e,i)=>{
    dataInfo.repliesFormShow[i] =false;
  });
}
defineExpose({initFormShow})
</script>

<style scoped lang="less">
.commentClose{
  padding: 10px 0;
}
</style>
