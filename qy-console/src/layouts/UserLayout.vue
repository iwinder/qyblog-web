<template>
  <a-layout class="layout">
    <a-layout-content class="container">
      <div class="top">
        <div class="header">
          <a href="/">
            <img  :src="siteInfo.site_logo" class="logo" alt="logo">
            <span class="title">{{siteInfo.site_name}}</span>
          </a>
        </div>
        <div class="desc">
          {{siteInfo.site_description}}
        </div>
      </div>
      <div class="main">
        <router-view />
      </div>

      <a-layout-footer class="footer">
        <div  class="links">
          <a href="_self">帮助</a>
          <a href="_self">隐私</a>
          <a href="_self">条款</a>
        </div >
        <div  class="copyright">
          Copyright &copy; 2018 vueComponent
        </div >
      </a-layout-footer>

    </a-layout-content>
  </a-layout>


</template>

<script setup  lang="ts">
import {onMounted, reactive} from 'vue'
import loginims from '@/assets/vue.svg'
import {ListBase} from "@/api/site_config";
import {useSiteInfo} from "@/store/siteInfo";
const siteStore =  useSiteInfo();
const siteInfo = reactive({ site_logo: loginims,
  site_name:"青语博客",
  site_description: "测试一下"
})
onMounted(() => {
  if (!siteStore.HasSiteInfo()) {
    initListBase();
  }else {
    initSiteInfo();
  }
})

// export default {
//   name: "UserLayout"
// }

function initListBase() {
  ListBase().then((res:any)=>{
    siteStore.InitSiteInfoMap(res.items);
    initSiteInfo();
  }).catch(err=>{
    console.log("initListBase err",err)
  }).finally(()=>{})
}
function initSiteInfo() {
  const logo =  siteStore.GetSiteInfoByKey("site_logo");
  if (logo.length>0) {
    siteInfo.site_logo = logo;
  }
  const name = siteStore.GetSiteInfoByKey("site_name");
  if (name.length>0) {
    siteInfo.site_name = name;
  }
  const description = siteStore.GetSiteInfoByKey("site_description");
  if (description.length>0) {
    siteInfo.site_description = description;
  }
  window.document.title =siteInfo.site_name
}
</script>

<style  lang="less" scoped>
  .layout{
    min-height: 100vh;
    .container  {
      width: 100%;
      min-height: 100%;
      background: #f0f2f5;
      // background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
      background-size: 100%;
      padding: 110px 0 144px;
      position: relative;
      a {
        text-decoration: none;
      }
      .top {
        text-align: center;
        .header {
          height: 44px;
          line-height: 44px;
          .badge {
            position: absolute;
            display: inline-block;
            line-height: 1;
            vertical-align: middle;
            margin-left: -12px;
            margin-top: -10px;
            opacity: 0.8;
          }
          .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
            border-style: none;
          }
          .title {
            font-size: 33px;
            color: rgba(0, 0, 0, .85);
            font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }
        .desc {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }
      .main {
        min-width: 260px;
        width: 368px;
        margin: 0 auto;
      }
      :deep(.footer) {
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 16px;
        margin: 48px 0 24px;
        text-align: center;
        .links {
          margin-bottom: 8px;
          font-size: 14px;
          a {
            color: rgba(0, 0, 0, 0.45);
            transition: all 0.3s;
            &:not(:last-child) {
              margin-right: 40px;
            }
          }
        }
        .copyright {
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
        }
      }
    }
  }
</style>
