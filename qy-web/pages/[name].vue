<template>
  <a-row class="content">
    <template  v-if=" dataInfo.post.atype==1">
      <a-col  class="single-left" :xs="{span:24}"  :lg=" { span: 24}" >
        <QyPostInfo :post-data="dataInfo.post" :post-loading="dataInfo.loading" :site-info="dataInfo.siteInfo"> </QyPostInfo>
      </a-col>
    </template>
    <template v-else>
      <a-col  class="single-left" :xs="{span:24}"  :lg=" { span: 24}" >
        <QyPageInfo :post-data="dataInfo.post"   :post-loading="dataInfo.loading" :site-info="dataInfo.siteInfo" :link-list="dataInfo.allLinks"></QyPageInfo>
      </a-col>
    </template>

  </a-row>
</template>

<script setup lang="ts">

import QyPostInfo from "@/components/QyPostInfo.vue";
import {onMounted, onUpdated, reactive, ref, watch} from "vue";
import {ArticleType, GetArticleListUrl, GetArticleOneUrl, GetArticleTagUrl, GetOne} from "@/api/article";
import {useRouter} from "vue-router";
import {GetCanonical, GetRandomColor, GetRandomDefImg} from "@/utils/util";
import {useSiteInfo} from "@/stores/siteInfo";
import QyPageInfo from "@/components/QyPageInfo.vue";
import {AllList, GetAllListUrl} from "@/api/links";
import dayjs from "dayjs";
import {useFetch} from "#app";
import {notification} from "ant-design-vue";
const router = useRouter();
const siteStore =  useSiteInfo();

const dataInfo = reactive({
  post:{

  } as ArticleType,
  link:"",
  allLinks:[],
  loading:false,
  name:"",
  siteInfo: {
    site_url:"",
    site_name:"",
    site_comment_flag:"",
  },
})


watch(() => router.currentRoute.value,(to, form) => {
  dataInfo.link ="";
  if (to.name=="home-name") {
    const  name = to.params.name as  string;
    dataInfo.loading = true;
    dataInfo.link = name;
    // doGetOne(dataInfo.link);
    if (name.indexOf("links")==0) {
      doGetAllList();
    }
  }
},{ immediate: true });





const nowSearchText=  await  ref(router.currentRoute.value.params.name);
dataInfo.name = (nowSearchText.value as string);

const { data: listData, pending,refresh, error } = await useFetch(GetArticleOneUrl(dataInfo.name));
if (error.value != null) {
  if (error.value.status==404) {
    router.push("/404")
  } else {
    if (process.client) {
      notification.error({
        message: '请求异常',
        description: error.value.message
      });
    } else {
      console.error("baseErr.value:", error.value);
    }
  }
} else {
  dataInfo.post = listData.value.data;
  dataInfo.post.defImg = GetRandomDefImg();
  if (!dataInfo.post.thumbnail||dataInfo.post.thumbnail.length==0) {
    dataInfo.post.thumbnail = dataInfo.post.defImg;
  }
  dataInfo.post.publishedDateMD = dayjs(dataInfo.post.publishedAt).format('YYYY-MM-DD');
  const tags = dataInfo.post.tags;
  if (tags) {
    dataInfo.post.tagColors=[]
    dataInfo.post.tagsString="";
    for (let i=0;i<tags.length;i++){
      dataInfo.post.tagColors[i]= GetRandomColor();
      dataInfo.post.tagsString +=tags[i].name +",";
    }
    dataInfo.post.tagsString =  dataInfo.post.tagsString.substring(0, dataInfo.post.tagsString.length-1);
  }

}

initSiteBaseInfo();
useHead({
  title:   dataInfo.post.title + " - " + dataInfo.siteInfo.site_name ,
  meta: [
    { name: 'description', content: dataInfo.post.summary },
    { name: 'keywords', content: dataInfo.post.tagsString },
    { property: 'og:title', content: dataInfo.post.title + " - " + dataInfo.siteInfo.site_name },
    { property: 'og:keywords', content: dataInfo.post.tagsString },
    { property: 'og:description', content:  dataInfo.post.summary },
  ],
  link: [ { rel: "canonical", href: dataInfo.post.canonicalLink? dataInfo.post.canonicalLink: GetCanonical(dataInfo.siteInfo.site_url, router.currentRoute.value.path)  } ],
})

if (dataInfo.name.indexOf("links")==0) {
  await doGetAllList();
}
async function doGetAllList() {
  const {data: listData, pending, refresh, error} = await useFetch(GetAllListUrl());
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
    dataInfo.allLinks = listData.value.items;
  }

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

  const comment = siteStore.GetSiteInfoByKey("site_comment_flag");
  if (comment&&comment.length>0) {
    dataInfo.siteInfo.site_comment_flag = comment;
  }


}
</script>

<style scoped>

.content {
  padding: 20px 15px;
  width: 85%;
  margin-right: auto;
  margin-left: auto;


}
@media (max-width: 992px) {
  .content {
    width: 100%;
    margin: 0;
  }
}
@media (min-width: 992px){
  .content {
    width: 85%;
    margin-right: auto;
    margin-left: auto;
  }
}
@media screen and (max-width: 992px) {
  .single-right {
    padding: 20px 0;
  }
}

</style>
