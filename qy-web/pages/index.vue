<template>
  <a-row class="content">
    <a-col :xs="{span:24}"    :lg="{ span: 16}"  class="content-left">
      <a-typography-title :level="4">近期文章</a-typography-title>
      <QyPostList class="postList"  :page-data="dataInfo.pageInfo"  :list-data="dataInfo.items" :data-loading="pending"   @onAfterPageChange="doChagePage"></QyPostList>
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
import {onMounted, reactive, ref, watch, watchEffect} from "vue";
import {ArticleType, GetArticleListUrl, List} from "@/api/article";
import {PageInfo} from "@/api/common";
import {DEFAULT_PAGESIZE} from "@/utils/constants";
import {GetRandomColor, GetRandomDefImg} from "@/utils/util";
import {notification} from "ant-design-vue";
import {useFetch} from "#app";
const router = useRouter();
const dataInfo = reactive({
  searchText:"",
  pageSize: DEFAULT_PAGESIZE,
  isSearchFlag:false,
  loading: false,
  current:1,
  pageInfo:{},
  items:[] as ArticleType[],

})



const { data: listData, pending,refresh, error } = await useFetch(GetArticleListUrl(), {params:{
    current: dataInfo.current,
    pageSize: dataInfo.pageSize,
    searchText:dataInfo.searchText,
    atype:1,
  }});
if (error.value != null) {
  if (process.client) {
    notification.error({
      message: '请求异常',
      description: error.value.message
    });
  } else {
    console.error("baseErr.value:", error.value);
  }
} else {
  dataInfo.items = listData.value.items;
  dataInfo.items.forEach(e => {
    const tags = e.tags;
    if (tags) {
      e.tagColors = []
      for (let i = 0; i < tags.length; i++) {
        e.tagColors[i] = GetRandomColor();
      }
    }
    if (!e.thumbnail || e.thumbnail.length == 0) {
      e.thumbnail = GetRandomDefImg();
    }
  });
  dataInfo.pageInfo = listData.value.pageInfo;
  if (dataInfo.pageInfo) {
    dataInfo.pageInfo.current = parseInt(dataInfo.pageInfo.current);
    dataInfo.pageInfo.pageSize = parseInt(dataInfo.pageInfo.pageSize);
    dataInfo.pageInfo.total = parseInt(dataInfo.pageInfo.total);
    dataInfo.pageInfo.pages = parseInt(dataInfo.pageInfo.pages);
  }
}

function doChagePage(num:number) {
  let url = "/"
  if (num>1) {
    url =  "/page/"+num;
  }
  dataInfo.current = num;
  router.push(url);
}


</script>

<style scoped lang="less">
@import "@/assets/less/qy-index.less";
</style>
