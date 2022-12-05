<template>
  <a-row class="content">
    <a-col :xs="{span:24}"    :lg="{ span: 16}"  class="content-left">
      <h2 >分类 「 <span style="color: #e32913;font-weight: bolder;">{{dataInfo.category.name}}</span> 」  的结果</h2>
      <QyPostList class="postList" ref="postRef"  :list-data="dataInfo.items" :data-loading="dataInfo.loading"   @onAfterPageChange="doChagePage"></QyPostList>
    </a-col>

    <a-col :xs="{span:24}"      :lg="{  span: 7, offset: 1 }" class="content-right" >
      <QyPostRightSider></QyPostRightSider>
    </a-col>

  </a-row>
</template>

<script setup lang="ts">
import QyPostList from "@/components/QyPostList.vue"
import QyPostRightSider from "@/components/QyPostRightSider.vue"
import {useRouter} from "vue-router";
import {onMounted, reactive, ref, watch} from "vue";
import {ArticleType, CategoryType, GetCategory, List} from "@/api/article";
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
  category:{
    name: "",
    identifier: "",
  } as CategoryType,
  items:[] as ArticleType[],
})


watch(() => router.currentRoute.value,(to, form) => {
  dataInfo.isSearchFlag = false;
  dataInfo.searchText ="";
  console.log("home page",to.path.indexOf("/page/"));
  console.log("home page",to);
  if (to.path.indexOf("/category/")==0) {
    dataInfo.current = 1;
    const  name = to.params.name as  string;
    const  numStr = to.params.id;
    dataInfo.category.identifier = name;
    console.log("home numStr",numStr);
    if (name&&name.length>0) {
      doGetCategory(name);
    }
    if (numStr&&numStr.length>0) {
      dataInfo.current = parseInt(numStr as string)
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
function doGetCategory(name:string) {
  GetCategory(name).then(res=>{
    dataInfo.category = res.data;
  }).catch(err=>{})
}
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
    categoryName: dataInfo.category.identifier,
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
  let url = "/category/"+dataInfo.category.identifier+"/";
  if (num>1) {
    url = url +"page/"+num;
  }
  router.push(url);
}
</script>

<style scoped lang="less">
@import "@/assets/less/qy-index.less";
</style>