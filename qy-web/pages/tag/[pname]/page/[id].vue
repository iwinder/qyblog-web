<template>
  <a-row class="content" v-if="dataInfo.showFlag">
    <a-col :xs="{span:24}"    :lg="{ span: 16}"  class="content-left">
      <a-typography-title :level="4">标签 「 <span class="titleKey">{{dataInfo.tag.name}}</span> 」  的结果</a-typography-title>
      <QyPostList class="postList"   :page-data="dataInfo.pageInfo"  :list-data="dataInfo.items" :data-loading="dataInfo.loading"   @onAfterPageChange="doChagePage"></QyPostList>
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
import {reactive, ref} from "vue";
import {
  ArticleDto,
  ArticleListDto,
  CategoryDto,
  GetArticleListUrl,
  GetArticleTagUrl, TagDataDto,
} from "~/api/article";
import {PageDto} from "~/api/common";
import {DEFAULT_PAGESIZE} from "~/utils/constants";
import {GetCanonical, GetRandomColor, GetRandomDefImg} from "~/utils/util";

import {useSiteInfo} from "~/stores/siteInfo";
const router = useRouter();
const siteStore =  useSiteInfo();
const dataInfo = reactive({
  searchText:"",
  isSearchFlag:false,
  loading: true,
  showFlag: false,
  tag:{
    name: "",
    identifier: "",
  } as CategoryDto,
  pageInfo:{ current:1, pageSize: DEFAULT_PAGESIZE,total:0,pages:0} as PageDto,
  items:[] as ArticleDto[],
  siteInfo: {
    site_url:"",
    site_name:"",
    site_description:"",
    site_key:"",
  },
})


definePageMeta({
  validate: async (route) => {
    const  pageId = route.params.id as  string;
    return /^\d+$/.test(pageId)
  },
})


const nowId = await ref(router.currentRoute.value.params.id);
dataInfo.pageInfo.current= parseInt(nowId.value as string);
const nowSearchText=  await  ref(router.currentRoute.value.params.pname);
dataInfo.tag.identifier = (nowSearchText.value as string);

await doGetTagInfo(dataInfo.tag.identifier);

initSiteBaseInfo();
useHead({
  title: "标签「 "+  dataInfo.tag.name + " 」 的结果 - " + dataInfo.siteInfo.site_name + " --第" +dataInfo.pageInfo.current+"页",
  meta: [
    { property: 'og:title', content:   "标签「 "+  dataInfo.tag.name + " 」 的结果 - "+ dataInfo.siteInfo.site_name + " --第" +dataInfo.pageInfo.current+"页" },
  ],
  link: [ { rel: "canonical", href: GetCanonical(dataInfo.siteInfo.site_url,  router.currentRoute.value.path) } ]
})

dataInfo.loading = true;
const { data: listData, pending,refresh, error } = await useFetch(GetArticleListUrl(), {params:{
    current: dataInfo.pageInfo.current,
    pageSize: dataInfo.pageInfo.pageSize,
    tagName: dataInfo.tag.identifier,
    atype:1,
  }});
if (error.value != null) {
  if (process.server) {
    console.error("文章列表请求异常 baseErr.value:", error.value);
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


async function doGetTagInfo(name: string) {
  dataInfo.showFlag = false;
  const {data: listData, pending, refresh, error} = await useFetch(GetArticleTagUrl(name));
  if (error.value != null) {
    if (error.value.status==404) {
      router.push("/404")
    } else {
      if (process.server) {
        console.error("Tag详情请求异常 baseErr.value:", error.value);
      } else {
        router.push("/500");
      }
    }
  } else {
    dataInfo.showFlag = true;
    const tagData = listData.value as TagDataDto
    dataInfo.tag =  tagData.data;
  }
}

function doChagePage(num:number) {
  let url = "/tag/"+dataInfo.tag.identifier+"/";
  if (num>1) {
    url += "page/"+num;
  }
  router.push(url);
}

function initSiteBaseInfo() {

  const name = siteStore.GetSiteInfoByKey("site_name");
  if (name&&name.length>0) {
    dataInfo.siteInfo.site_name = name;
  }

  const url = siteStore.GetSiteInfoByKey("site_url");
  if (url&&url.length>0) {
    dataInfo.siteInfo.site_url = url;
  }
}
</script>

<style scoped lang="less">
@import "assets/less/qy-index.less";
</style>
