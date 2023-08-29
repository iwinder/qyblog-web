<template>
  <div style="background-color: #ececec; padding: 20px">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card title="定时任务手动执行" :bordered="false">
          <p> <a-button type="link" :disabled="dataInfo.siteMapLoading" :loading="dataInfo.siteMapLoading" @click="doUpdateSiteMap">更新网站地图</a-button></p>
          <p> <a-button type="link" :disabled="dataInfo.commentLoading" :loading="dataInfo.commentLoading" @click="doUpdateCommentCount">更新评论统计</a-button></p>
          <p> <a-button type="link" :disabled="dataInfo.articleLoading" :loading="dataInfo.articleLoading"  @click="doUpdateArticleCount">更新文章浏览统计</a-button></p>
          <p> <a-button type="link" :disabled="dataInfo.emaiLoading" :loading="dataInfo.emaiLoading"  @click="doEmailToNotSend">推送回复邮件消息</a-button></p>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card   :bordered="false">
          <template #title>
           当前留言审核统计
          </template>
          <template #extra>
          <router-link :to="{name:'comment-list'}">More</router-link>   <!-- TODO:需要添加权限校验，由于动态路由，存在因无权权限导致登录失败。 -->
          </template>
          <p>待审核：<a-badge :count="totalInfo.pendingTotal" /></p>
          <p>已审核： <a-badge :count="totalInfo.nowTotal" :number-style="{ backgroundColor: '#52c41a' }" show-zero/></p>
          <p>总数量：<a-badge :count="totalInfo.total" :number-style="{  backgroundColor: '#52c41a',
            boxShadow: '0 0 0 1px #d9d9d9 inset', }" show-zero /></p>
        </a-card>
      </a-col>

    </a-row>
  </div>
</template>

<script setup lang="ts">
import {EmailToNotSend, GeneratorMap, UpdateAllArticleCount, UpdateContentCount} from "@/api/home";
import {onMounted, reactive} from "vue";
import {notification} from "ant-design-vue";
import {Total} from "@/api/comment";
const dataInfo = reactive({
  siteMapLoading: false,
  commentLoading: false,
  articleLoading: false,
  emaiLoading: false,
})
const totalInfo = reactive({
  total:"0",
  nowTotal:"0",
  pendingTotal: "0",
})

onMounted(() => {
  doGetTotal();
})

function doUpdateSiteMap() {
  dataInfo.siteMapLoading = true;
  GeneratorMap().then(res=>{
    notification.success({
      message: '成功',
      description: "更新网站地图"
    });
  }).catch(err=>{}).finally(()=>{
    dataInfo.siteMapLoading = false;
  })
}
function doUpdateCommentCount() {
  dataInfo.commentLoading = true;
  UpdateContentCount().then(res=>{
    notification.success({
      message: '成功',
      description: "更新评论统计"
    });
  }).catch(err=>{}).finally(()=>{
    dataInfo.commentLoading = false;
  })
}
function doUpdateArticleCount() {
  dataInfo.articleLoading = true;
  UpdateAllArticleCount().then(res=>{
    notification.success({
      message: '成功',
      description: "更新文章浏览统计"
    });
  }).catch(err=>{}).finally(()=>{
    dataInfo.articleLoading = false;
  })
}
function doEmailToNotSend() {
  dataInfo.emaiLoading = true;
  EmailToNotSend().then(res=>{
    notification.success({
      message: '成功',
      description: "推送回复邮件消息"
    });
  }).catch(err=>{}).finally(()=>{
    dataInfo.emaiLoading = false;
  })
}

function doGetTotal() {
  Total().then((res:any)=>{
    totalInfo.total = res.total;
    totalInfo.nowTotal = res.nowTotal;
    totalInfo.pendingTotal = res.pendingTotal;
  }).catch(err=>{console.error("Delete error",err);});
}
</script>

<style scoped>

</style>
