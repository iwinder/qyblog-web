<template>
    <a-layout id="components-layout-custom-trigger"  >
      <LayLeftSider :isCollapsed="dataInfo.collapsed"  :header-menus="dataInfo.hearMenus"
                    :select-key="dataInfo.selectKeys" :site-info="dataInfo.siteInfo"
                    ref='leftSiderRef' @onCollapsed="doCollapsed" @onMenusSelect="doHeaderSelect"></LayLeftSider>
      <a-layout>
        <LayHeader :isCollapsed="dataInfo.collapsed" :site-info="dataInfo.siteInfo"
                   :header-menus="dataInfo.hearMenus" :select-key="dataInfo.selectKeys"
                   @onCollapsed="doCollapsed" @onMenusSelect="doHeaderSelect"></LayHeader>
        <LayContent></LayContent>
        <LayFooter :site-info="dataInfo.siteInfo" :footer-menus="dataInfo.footerMenus"></LayFooter>
      </a-layout>
      <div>
        <a-back-top />
        <strong style="color: rgba(64, 64, 64, 0.6)">   </strong>
      </div>
    </a-layout>
</template>

<script setup lang="ts">
import LayLeftSider from "@/components/LayLeftSider.vue"
import LayHeader  from "@/components/LayHeader.vue"
import LayContent from "@/components/LayContent.vue";
import LayFooter from "@/components/LayFooter.vue";
import {onBeforeMount, onMounted, reactive, ref} from "vue";
import {BaseInfo, OhterInfo} from "@/api/site_config";
import {useSiteInfo} from "@/store/siteInfo";
import {FooterList, HeadList, MenusDto} from "@/api/menus";
import {useMenusInfo} from "@/store/menusInfo";
import {AllList, IndexList, ShortList} from "@/api/links";
import {useLinksInfo} from "@/store/links";
const siteStore =  useSiteInfo();
const menusStore =  useMenusInfo();
const linksStore =  useLinksInfo();
const dataInfo = reactive({
  collapsed: false,
  siteInfo: {
    site_name: "青青小镇",
    site_key:"",
    site_description: "",
    site_icon:"",
    site_url:  "http://test.windcoder.com",
    site_open_date: "2013-01-01",
    site_beian: "哒哒哒",
    site_comment_flag: "2",
    site_foot_code: "",
    site_logo:"https://windcoder.com/wp-content/uploads/2017/02/logo_vift.png",
    site_small_logo:"https://windcoder.com/wp-content/uploads/2017/02/logo_vif_small.png",
    site_home_undisplay_cats:"",
    site_head_code:"",
    site_sider_code:"",
    site_desc:"",
    site_qq:"",
    site_qq_group:"",
    site_weibo:"",
    site_weixin_qr:"",
    site_mailme_id:"",
    site_pay_flag:"",
    site_weixin_pay_qr:"",
    site_alipay_pay_qr:"",
  },
  hearMenus:[] as MenusDto[],
  footerMenus:[]as MenusDto[],
  selectKeys:[] as string[]
})

onBeforeMount(async () => {


});
onMounted(async () => {

  if (!siteStore.HasSiteInfo()) {
    siteStore.InitSiteInfoMap([]);
      doGetBaseInfo();
      doGetOhterInfo();
  } else {
    initSiteInfo();
  }
  if (!menusStore.headerMenus || menusStore.headerMenus.length == 0) {
    doGetHeaderMenus();
  } else {
    if (menusStore.headerMenus.length == 1 && menusStore.headerMenus[0].id == "-1") {
      dataInfo.hearMenus = [];
    } else {
      dataInfo.hearMenus = menusStore.headerMenus;
    }
  }
  if (!menusStore.footerMenus || menusStore.footerMenus.length == 0) {
       doGetFooterMenus();
  } else {
    if (menusStore.footerMenus.length == 1 && menusStore.footerMenus[0].id == "-1") {
      dataInfo.footerMenus = [];
    } else {
      dataInfo.footerMenus = menusStore.footerMenus;
    }
  }
  if (!linksStore.indexLinks || linksStore.indexLinks.length == 0) {
      doIndexLinks();
  }
  if (!linksStore.allLinks || linksStore.allLinks.length == 0) {
      doAllLinks();
  }
  if (!linksStore.shortLinks || linksStore.shortLinks.length == 0) {
      doShortLinks();
  }
})
function doCollapsed(val:boolean) {
  dataInfo.collapsed = val
}

function doHeaderSelect(data:string[]) {
  dataInfo.selectKeys = data;
}

function doGetBaseInfo() {
  BaseInfo().then(res=>{
    siteStore.AddSiteInfoMap(res.items);
    initSiteBaseInfo();
  }).catch(err=>{}).finally(()=>{})
}
function doGetHeaderMenus() {
  HeadList().then(res=>{
    if (res.items.length>0) {
      menusStore.headerMenus = res.items;
      dataInfo.hearMenus = res.items;
    } else {
      menusStore.headerMenus =[{
        id:"-1",
        name: "",
        url:"",
        blanked:1,
        children:[],
      }]
      dataInfo.hearMenus = [];
    }

  }).catch(err=>{}).finally(()=>{})
}
function doGetFooterMenus() {
  FooterList().then(res=>{
    if (res.items.length>0) {
      menusStore.footerMenus = res.items;
      dataInfo.footerMenus = res.items;
    } else {
      menusStore.footerMenus =[{
        id:"-1",
        name: "",
        url:"",
        blanked:1,
        children:[],
      }]
      dataInfo.footerMenus = [];
    }

  }).catch(err=>{}).finally(()=>{})
}
function doGetOhterInfo() {
  OhterInfo().then(res=>{
    siteStore.AddSiteInfoMap(res.items);
  }).catch(err=>{}).finally(()=>{})
}

function doIndexLinks() {
  IndexList().then(res=>{
    if (res.items.length>0) {
      linksStore.indexLinks = res.items;
    } else {
      linksStore.indexLinks = [{
        id:"-1",
        name: "",
        url: "",
        description: "",
      }]
    }

  }).catch(err=>{}).finally(()=>{})
}
function doAllLinks() {
  AllList().then(res=>{
    if (res.items.length>0) {
      linksStore.allLinks = res.items;
    } else {
      linksStore.allLinks = [{
        id:"-1",
        name: "",
        url: "",
        description: "",
      }]
    }

  }).catch(err=>{}).finally(()=>{})
}

function doShortLinks() {
  ShortList().then(res=>{
    if (res.items.length>0) {
      linksStore.shortLinks = res.items;
    } else {
      linksStore.shortLinks = [{
        url: "",
        identifier: "-1",
      }]
    }

  }).catch(err=>{}).finally(()=>{})
}
function initSiteBaseInfo() {
  const logo =  siteStore.GetSiteInfoByKey("site_logo");
  if (logo&&logo.length>0) {
    dataInfo.siteInfo.site_logo = logo;
  }
  const name = siteStore.GetSiteInfoByKey("site_name");
  if (name&&name.length>0) {
    dataInfo.siteInfo.site_name = name;
  }
  const description = siteStore.GetSiteInfoByKey("site_description");
  if (description&&description.length>0) {
    dataInfo.siteInfo.site_description = description;
  }
  const url = siteStore.GetSiteInfoByKey("site_url");
  if (url&&url.length>0) {
    dataInfo.siteInfo.site_url = url;
  }
  const openDate = siteStore.GetSiteInfoByKey("site_open_date");
  if (openDate&&openDate.length>0) {
    dataInfo.siteInfo.site_open_date = openDate;
  }
  const beian = siteStore.GetSiteInfoByKey("site_beian");
  if (beian&&beian.length>0) {
    dataInfo.siteInfo.site_beian = beian;
  }
  const footCode = siteStore.GetSiteInfoByKey("site_foot_code");
  if (footCode&&footCode.length>0) {
    dataInfo.siteInfo.site_foot_code = footCode;
  }
  const smailLog = siteStore.GetSiteInfoByKey("site_small_logo");
  if (smailLog&&smailLog.length>0) {
    dataInfo.siteInfo.site_small_logo = smailLog;
  }
  const key = siteStore.GetSiteInfoByKey("site_key");
  if (key&&key.length>0) {
    dataInfo.siteInfo.site_key = key;
  }
  const icon = siteStore.GetSiteInfoByKey("site_icon");
  if (icon&&icon.length>0) {
    dataInfo.siteInfo.site_icon = icon;
  }
  const comment = siteStore.GetSiteInfoByKey("site_comment_flag");
  if (comment&&comment.length>0) {
    dataInfo.siteInfo.site_comment_flag = comment;
  }
  const homeUndisp = siteStore.GetSiteInfoByKey("site_home_undisplay_cats");
  if (homeUndisp&&homeUndisp.length>0) {
    dataInfo.siteInfo.site_home_undisplay_cats = homeUndisp;
  }
  const homeCode = siteStore.GetSiteInfoByKey("site_head_code");
  if (homeCode&&homeCode.length>0) {
    dataInfo.siteInfo.site_head_code = homeCode;
  }
  const siderCode = siteStore.GetSiteInfoByKey("site_sider_code");
  if (siderCode&&siderCode.length>0) {
    dataInfo.siteInfo.site_sider_code = siderCode;
  }

  window.document.title = dataInfo.siteInfo.site_name
}
function initSiteOtherInfo() {
  const siteDesc = siteStore.GetSiteInfoByKey("site_desc");
  if (siteDesc&&siteDesc.length>0) {
    dataInfo.siteInfo.site_desc = siteDesc;
  }
  const qq = siteStore.GetSiteInfoByKey("site_qq");
  if (qq&&qq.length>0) {
    dataInfo.siteInfo.site_qq = qq;
  }
  const qqGroup = siteStore.GetSiteInfoByKey("site_qq_group");
  if (qqGroup&&qqGroup.length>0) {
    dataInfo.siteInfo.site_qq_group = qqGroup;
  }
  const weibo = siteStore.GetSiteInfoByKey("site_weibo");
  if (weibo&&weibo.length>0) {
    dataInfo.siteInfo.site_weibo = weibo;
  }
  const wxqr = siteStore.GetSiteInfoByKey("site_weixin_qr");
  if (wxqr&&wxqr.length>0) {
    dataInfo.siteInfo.site_weixin_qr = wxqr;
  }
  const mail = siteStore.GetSiteInfoByKey("site_mailme_id");
  if (mail&&mail.length>0) {
    dataInfo.siteInfo.site_mailme_id = mail;
  }
  const site_pay_flag = siteStore.GetSiteInfoByKey("site_pay_flag");
  if (site_pay_flag&&site_pay_flag.length>0) {
    dataInfo.siteInfo.site_pay_flag = site_pay_flag;
  }
  const site_weixin_pay_qr = siteStore.GetSiteInfoByKey("site_weixin_pay_qr");
  if (site_weixin_pay_qr&&site_weixin_pay_qr.length>0) {
    dataInfo.siteInfo.site_weixin_pay_qr = site_weixin_pay_qr;
  }
  const site_alipay_pay_qr = siteStore.GetSiteInfoByKey("site_alipay_pay_qr");
  if (site_alipay_pay_qr&&site_alipay_pay_qr.length>0) {
    dataInfo.siteInfo.site_alipay_pay_qr = site_alipay_pay_qr;
  }
}
function initSiteInfo() {
  initSiteBaseInfo();
  initSiteOtherInfo();
}
</script>

<style scoped lang="less">
#components-layout-custom-trigger{
  min-height: 100vh;
}
html {
  font-family:
      'Source Sans Pro',
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      'Helvetica Neue',
      Arial,
      sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
body{
  background:#f5f6f8;
}
.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.ant-layout-content {
  padding: 80px 0 20px 0;
}
</style>