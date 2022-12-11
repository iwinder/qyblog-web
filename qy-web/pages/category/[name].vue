<template>
  <a-row class="content">
    <a-col :xs="{span:24}"    :lg="{ span: 16}"  class="content-left">
      <a-typography-title :level="4">分类 「 <span class="titleKey">{{dataInfo.category.name}}</span> 」  的结果</a-typography-title >
      <QyPostList class="postList"  :page-data="dataInfo.pageInfo"   :list-data="dataInfo.items" :data-loading="dataInfo.loading"   @onAfterPageChange="doChagePage"></QyPostList>
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
import {
  ArticleType,
  CategoryType,
  GetArticleCategoryUrl,
  GetArticleListUrl,
  GetArticleTagUrl,
  GetCategory,
  List
} from "@/api/article";
import {PageInfo} from "@/api/common";
import {DEFAULT_PAGESIZE} from "@/utils/constants";
import {GetCanonical, GetRandomColor, GetRandomDefImg} from "@/utils/util";
import {notification} from "ant-design-vue";
import {queue} from "rxjs";
import {useSiteInfo} from "~/stores/siteInfo";
const postRef =  ref();
const router = useRouter();
const siteStore =  useSiteInfo();
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
  siteInfo: {
    site_url:"",
    site_name:"",
    site_description:"",
    site_key:"",
  },
})




dataInfo.loading = true;
const nowSearchText=  await  ref(router.currentRoute.value.params.name);
dataInfo.category.identifier = (nowSearchText.value as string);



const {data: cData,   error:cerror} = await useFetch(GetArticleCategoryUrl(dataInfo.category.identifier));
if (cerror.value != null) {
  if (cerror.value.status==404) {
    router.push("/404")
  } else {
    if (process.client) {
      notification.error({
        message: '请求异常',
        description: cerror.value.message
      });
    } else {
      console.error("baseErr.value:", cerror.value);
    }
  }
} else {
  dataInfo.category = cData.value.data;
}

initSiteBaseInfo();
useHead({
  title:   dataInfo.category.name + " - " + dataInfo.siteInfo.site_name ,
  meta: [
    { property: 'og:title', content:  dataInfo.category.name + " - " + dataInfo.siteInfo.site_name },
  ],
  link: [ { rel: "canonical", href: GetCanonical(dataInfo.siteInfo.site_url,  router.currentRoute.value.path) } ]
})

const { data: listData, pending,refresh, error } = await useFetch(GetArticleListUrl(), {params:{
    current: dataInfo.current,
    pageSize: dataInfo.pageSize,
    categoryName: dataInfo.category.identifier,
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
  dataInfo.loading = false;
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


async function doGetCategory(name: string) {
  const {data: listData, pending, refresh, error} = await useFetch(GetArticleCategoryUrl(name));
  if (error.value != null) {
    if (error.value.status==404) {
      await  throw404();
    } else {
      await  throw500(error.value.message);
    }
    return "err";
  } else {
    dataInfo.category = listData.value.data;
    return "success";
  }

}
async function throw404() {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}
async function throw500(errMsg:string) {
  throw createError({ statusCode: 500, statusMessage: errMsg })
}
function doChagePage(num:number) {
  let url = "/category/"+dataInfo.category.identifier+"/";
  if (num>1) {
    url = url +"page/"+num;
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
@import "@/assets/less/qy-index.less";
</style>
