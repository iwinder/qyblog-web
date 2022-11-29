<template>
  <a-row class="content">
    <a-col :xs="{span:24}"    :lg="{ span: 16}"  class="content-left">
      <h2 v-if="!dataInfo.isSearchFlag">近期文章</h2>
      <h2 v-else>搜索 「 <span style="color: #e32913;font-weight: bolder;">{{dataInfo.searchText}}</span> 」  的结果</h2>
      <QyPostList class="postList" ref="postRef"  :list-data="dataInfo.items" :data-loading="dataInfo.loading"   @onAfterPageChange="doChagePage"></QyPostList>
    </a-col>

    <a-col :xs="{span:24}"      :lg="{  span: 7, offset: 1 }" class="content-right" >
      <QyPostRightSider></QyPostRightSider>
<!--      <qy-post-right-sider></qy-post-right-sider>-->

    </a-col>

  </a-row>
</template>

<script setup lang="ts">
import QyPostList from "@/components/QyPostList.vue"
import QyPostRightSider from "@/components/QyPostRightSider.vue"
import {useRouter} from "vue-router";
import {onMounted, reactive, ref, watch} from "vue";
import {ArticleType, List} from "@/api/article";
import {PageInfo} from "@/api/common";
import {DEFAULT_PAGESIZE} from "@/utils/constants";
import {GetRandomColor, GetRandomDefImg} from "@/utils/util";
const postRef =  ref();
const router = useRouter();
const dataInfo = reactive({
  searchText:"",
  pageSize: DEFAULT_PAGESIZE,
  isSearchFlag:false,
  loading: false,
  current:1,
  items:[] as ArticleType[],
})


watch(() => router.currentRoute.value,(to, form) => {
  dataInfo.isSearchFlag = false;
  dataInfo.searchText ="";
  console.log("home page",to.path.indexOf("/page/"));
  console.log("home page",to);
  if (to.path=="/") {
    dataInfo.current = 1;
    if (to.query.searchText&&to.query.searchText.length>0) {
      dataInfo.searchText = to.query.searchText as string;
      dataInfo.isSearchFlag = true;
    }
    initData();
  } else if(to.path.indexOf("/page/")==0) {
    const  numStr = to.params.id;
    if (numStr&&numStr.length>0) {
      dataInfo.current = parseInt(numStr as string)
    }
    if (to.query.searchText&&to.query.searchText.length>0) {
      dataInfo.searchText = to.query.searchText as string;
      dataInfo.isSearchFlag = true;
    }
    initData();
  }
},{ immediate: true });

onMounted(() => {
  // dataInfo.searchText ="";
  // if (router.currentRoute.value.query&&router.currentRoute.value.query.searchText&&router.currentRoute.value.query.searchText.length>0) {
  //   dataInfo.searchText =router.currentRoute.value.query.searchText;
  // }
  // initData();
})

function initData() {
  doList({
    current:dataInfo.current,
    pageSize: dataInfo.pageSize,
  })
}
function doList(pageInfo:PageInfo) {
  dataInfo.loading = true;
  const param = {
    ...pageInfo,
    searchText:dataInfo.searchText,

  }
  List(param).then(res=>{
    dataInfo.items = res.items;
    dataInfo.items.forEach(e=>{
      const tags = e.tags;
      if (tags) {
        e.tagColors=[]
        for (let i=0;i<tags.length;i++){
          e.tagColors[i]= GetRandomColor();
        }
      }
      if (!e.thumbnail || e.thumbnail.length==0) {
        e.thumbnail = GetRandomDefImg();
      }
    });
    console.log("    dataInfo.items =",    dataInfo.items);
    postRef.value.doChangePage(res.pageInfo);

  }).catch(err=>{}).finally(()=>{
    dataInfo.loading = false;
  })
}
function doChagePage(num:number) {
  // doList({
  //   current:num,
  //   pageSize: dataInfo.pageSize,
  // })
  console.log("doChagePage",num)
  let url = "/"
  if (num>1) {
    url =  "/page/"+num;
  }
  if( dataInfo.searchText.length>0 ) {
    url = url +"?searchText="+dataInfo.searchText;
  }
  router.push(url);
}
</script>

<style scoped lang="less">
@import "@/assets/less/qy-index.less";
</style>