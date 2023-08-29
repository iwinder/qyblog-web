<template>
  <a-row class="content">
    <a-col :xs="{span:24}"    :lg="{ span: 16}"  class="content-left">
      <a-typography-title :level="4">近期文章</a-typography-title>
      <QyPostList class="postList"  :page-data="dataInfo.pageInfo"  :list-data="dataInfo.items" :data-loading="dataInfo.loading"   @onAfterPageChange="doChagePage"></QyPostList>
    </a-col>

    <a-col :xs="{span:24}"      :lg="{  span: 7, offset: 1 }" class="content-right" >
      <QyPostRightSider></QyPostRightSider>

    </a-col>

  </a-row>
</template>



<script setup lang="ts">
import QyPostList from "~/components/QyPostList.vue"
import QyPostRightSider from "~/components/QyPostRightSider.vue"
import {useRouter} from "vue-router";
import {reactive} from "vue";
import {ArticleDto, GetArticleListUrl,ArticleListDto} from "~/api/article";
import {PageDto} from "~/api/common";
import {DEFAULT_PAGESIZE} from "~/utils/constants";
import {GetRandomColor, GetRandomDefImg} from "~/utils/util";
import {useFetch} from "nuxt/app";

const router = useRouter();
const dataInfo = reactive({
  searchText:"",
  isSearchFlag:false,
  loading: true,
  pageInfo:{ current:1, pageSize: DEFAULT_PAGESIZE,total:0,pages:0} as PageDto,
  items:[] as ArticleDto[],
})


dataInfo.loading = true;
const { data: listData, pending,refresh, error } = await useFetch(GetArticleListUrl(), {
  params:{
    current: dataInfo.pageInfo.current,
    pageSize: dataInfo.pageInfo.pageSize,
    searchText:dataInfo.searchText,
    atype:1,
  }
});

if (error.value != null) {
  if (process.server) {
    console.error("文章列表请求异常-baseErr.value:", error.value);
  } else {
    router.push("/500")
  }
} else {
  dataInfo.loading = false;
  const  articleListDtos = listData.value as ArticleListDto;
  dataInfo.items = articleListDtos.items;
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
  if (articleListDtos.pageInfo) {
    dataInfo.pageInfo.current = parseInt(articleListDtos.pageInfo.current);
    dataInfo.pageInfo.pageSize = parseInt(articleListDtos.pageInfo.pageSize);
    dataInfo.pageInfo.total = parseInt(articleListDtos.pageInfo.total);
    dataInfo.pageInfo.pages = parseInt(articleListDtos.pageInfo.pages);
  }
}

function doChagePage(num:number) {
  let url = "/"
  if (num>1&&num<=dataInfo.pageInfo.pages) {
    url =  "/page/"+num;
  }
  dataInfo.pageInfo.current = num;
  router.push(url);
}


</script>

<style scoped lang="less">
@import "@/assets/less/qy-index.less";
</style>
