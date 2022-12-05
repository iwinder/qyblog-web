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
import {onMounted, onUpdated, reactive, watch} from "vue";
import {ArticleType, GetOne} from "@/api/article";
import {useRouter} from "vue-router";
import {GetRandomColor, GetRandomDefImg} from "@/utils/util";
import * as moment_ from 'moment';
import {useSiteInfo} from "@/store/siteInfo";
import QyPageInfo from "@/components/QyPageInfo.vue";
import {AllList} from "@/api/links";
const moment = moment_;
const router = useRouter();
const siteStore =  useSiteInfo();

const dataInfo = reactive({
  post:{

  } as ArticleType,
  link:"",
  allLinks:[],
  loading:false,
  siteInfo: {
    site_url:"",
    site_name:"",
    site_comment_flag:"",
  },
})


watch(() => router.currentRoute.value,(to, form) => {
  dataInfo.link ="";
  console.log("home page",to);
  if (to.name=="home-name") {
    const  name = to.params.name as  string;
    dataInfo.loading = true;
    dataInfo.link = name;
    doGetOne(dataInfo.link);
    if (name.indexOf("links")==0) {
      doGetAllList();
    }
  }
},{ immediate: true });


watch(() => siteStore.siteInfoMap,(data) => {
  if (dataInfo.siteInfo.site_name.length==0) {
    initSiteBaseInfo();
  }
})


onMounted(() => {
  initSiteBaseInfo();
})



function doGetOne(name:string) {
  GetOne(name).then(res=>{
    dataInfo.post = res.data;
    dataInfo.post.defImg = GetRandomDefImg();
    if (!dataInfo.post.thumbnail||dataInfo.post.thumbnail.length==0) {
      dataInfo.post.thumbnail = dataInfo.post.defImg;
    }
    dataInfo.post.publishedDateMD = moment(dataInfo.post.publishedAt).format('YYYY-MM-DD');
    const tags = dataInfo.post.tags;
    if (tags) {
      dataInfo.post.tagColors=[]
      for (let i=0;i<tags.length;i++){
        dataInfo.post.tagColors[i]= GetRandomColor();
      }
    }
  }).catch(err=>{}).finally(()=>{
    dataInfo.loading = false;
  })
}
function doGetAllList() {
  AllList().then(res=>{
    dataInfo.allLinks = res.items;
  }).catch(err=>{

  }).finally(()=>{})
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