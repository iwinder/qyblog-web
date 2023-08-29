<template>
    <a-layout id="components-layout-custom-trigger"  >
      <LayLeftSider :isCollapsed="dataInfo.collapsed"  :header-menus="dataInfo.hearMenus"
                    :select-key="dataInfo.selectKeys" :site-info="dataInfo.siteInfo"
                    ref='leftSiderRef' @onCollapsed="doCollapsed" @onMenusSelect="doHeaderSelect"></LayLeftSider>
      <a-layout>
        <LayHeader :isCollapsed="dataInfo.collapsed" :site-info="dataInfo.siteInfo"
                   :header-menus="dataInfo.hearMenus" :select-key="dataInfo.selectKeys"
                   @onCollapsed="doCollapsed" @onMenusSelect="doHeaderSelect"></LayHeader>
        <a-layout-content>
          <slot />

        </a-layout-content>


        <LayFooter :site-info="dataInfo.siteInfo" :footer-menus="dataInfo.footerMenus"></LayFooter>
      </a-layout>
      <div>
        <a-back-top />
        <strong style="color: rgba(64, 64, 64, 0.6)">   </strong>
      </div>
    </a-layout>
</template>

<script setup lang="ts">
import LayLeftSider from "~/components/LayLeftSider.vue"
import LayHeader  from "~/components/LayHeader.vue"
import LayFooter from "~/components/LayFooter.vue";
import {reactive} from "vue";
import {GetBaseUrl, GetOhterUrl, SiteConfigDto, SiteConfigListDto} from "~/api/site_config";
import {useSiteInfo} from "~/stores/siteInfo";
import {GetFooterListUrl, GetHeadListUrl, MenusDto, MenusListDto} from "~/api/menus";
import {useMenusInfo} from "~/stores/menusInfo";
import {
  GetAllListUrl,
  GetIndexListUrl,
  GetShortListtUrl, LinkListDto,
  ShortLinkListDto,
} from "~/api/links";
import {useLinksInfo} from "~/stores/links";
import {useFetch, useHead} from "nuxt/app";
import defHeadConfig from "~/assets/config/defHead";
const siteStore =  useSiteInfo();
const menusStore =  useMenusInfo();
const linksStore =  useLinksInfo();
const dataInfo = reactive({
  collapsed: false,
  siteInfo: {
    site_name: defHeadConfig.title,
    site_key:defHeadConfig.keywords,
    site_description: defHeadConfig.description,
    site_icon:"",
    site_url: defHeadConfig.url,
    site_open_date: defHeadConfig.openDate,
    site_beian: "哒哒哒",
    site_comment_flag: "2",
    site_foot_code: "",
    site_logo: defHeadConfig.log,
    site_small_logo: defHeadConfig.smailLog,
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
    site_head_script_code:"",
  },
  baseSite:[],
  otherSite:[],
  hearMenus:[] as MenusDto[],
  footerMenus:[]as MenusDto[],
  selectKeys:[] as string[]
})



await doGetSiteInfoAllMain();
await doGetHeaderMenusMain();
await doGetFooterMenusMain();
await doLinksAllMain();

useHead({
  title: dataInfo.siteInfo.site_name,
  meta: [
    { name: 'description', content: dataInfo.siteInfo.site_description },
    { name: 'keywords', content: dataInfo.siteInfo.site_key },
    { property: 'og:title', content: dataInfo.siteInfo.site_name },
    { property: 'og:keywords', content: dataInfo.siteInfo.site_key },
    { property: 'og:description', content:  dataInfo.siteInfo.site_description },
  ],
  script: [ { children: dataInfo.siteInfo.site_head_script_code },
    { async: true, src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3599707051787259', crossorigin: "anonymous" },//@
  ],
  style: [ { children: dataInfo.siteInfo.site_head_code } ],
  link: [ { rel: "canonical", href: dataInfo.siteInfo.site_url } ]
})



function doCollapsed(val:boolean) {
  dataInfo.collapsed = val
}

function doHeaderSelect(data:string[]) {
  dataInfo.selectKeys = data;
}


async function doGetSiteInfoAllMain() {
  siteStore.InitSiteInfoMap([]);
  if (!siteStore.HasSiteInfo()) {
    siteStore.InitSiteInfoMap([]);
    const [{data:  baseSite,error:baseErr}, { data:  otherSite,error:otherErr }] = await Promise.all([
      useFetch(GetBaseUrl()),
      useFetch(GetOhterUrl()),
    ]);
    // base
    if (baseErr.value!=null) {
      throwErr(baseErr);
    } else {
      const baseConfigList = baseSite.value as SiteConfigListDto;
      siteStore.AddSiteInfoMap(baseConfigList.items);
      initSiteBaseInfo();
    }
    // other
    if (otherErr.value!=null) {
      throwErr(otherErr);
    } else {
      const otherConfigList = otherSite.value as SiteConfigListDto;
      siteStore.AddSiteInfoMap(otherConfigList.items);
      initSiteOtherInfo();
    }
  } else {
    initSiteInfo();
  }
}
function doGetHeaderMenusMain() {
  if (!menusStore.headerMenus || menusStore.headerMenus.length == 0) {
    doGetHeaderMenus();
  } else {
    if (menusStore.headerMenus.length == 1 && menusStore.headerMenus[0].id == "-1") {
      dataInfo.hearMenus = [];
    } else {
      dataInfo.hearMenus = menusStore.headerMenus;
    }
  }
}
function doGetFooterMenusMain() {
  if (!menusStore.footerMenus || menusStore.footerMenus.length == 0) {
    doGetFooterMenus();
  } else {
    if (menusStore.footerMenus.length == 1 && menusStore.footerMenus[0].id == "-1") {
      dataInfo.footerMenus = [];
    } else {
      dataInfo.footerMenus = menusStore.footerMenus;
    }
  }
}

function doLinksAllMain() {
  if (!linksStore.indexLinks || linksStore.indexLinks.length == 0) {
      doIndexLinks();
  }
  if (!linksStore.allLinks || linksStore.allLinks.length == 0) {
      doAllLinks();
  }

  if (!linksStore.shortLinks || !linksStore.shortLinks["-1"]) {
    doShortLinks();
  }
}



async function doGetHeaderMenus() {
  const { data:  headerMenus,error:headerMenusErr}= await useFetch(GetHeadListUrl());
  if (headerMenusErr.value!=null) {
    throwErr(headerMenusErr);
  } else {
    const headerList = headerMenus.value as MenusListDto;
    if (headerList.items.length>0) {
      menusStore.headerMenus = headerList.items;
      dataInfo.hearMenus = headerList.items;
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
  }
}
async function doGetFooterMenus() {
  const {data: footerMenus, error: footerMenusErr} = await useFetch(GetFooterListUrl());
  if (footerMenusErr.value!=null) {
    throwErr(footerMenusErr);
  } else {
    const footerList = footerMenus.value as MenusListDto;
    if (footerList.items.length>0) {
      menusStore.footerMenus = footerList.items;
      dataInfo.footerMenus = footerList.items;
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
  }
}


async function doIndexLinks() {
  const {data: indexLinks,error:indexLinksErr} = await useFetch(GetIndexListUrl());
  if (indexLinksErr.value!=null) {
    throwErr(indexLinksErr);
  } else {
    const indexList = indexLinks.value as LinkListDto;
    if (indexList.items.length>0) {
      linksStore.indexLinks = indexList.items;
    } else {
      linksStore.indexLinks = [{
        id: "-1",
        name: "",
        url: "",
        description: "",
      }];
    }
  }
}
async function doAllLinks() {
  const {data: allLinks, error:allLinksErr} = await useFetch(GetAllListUrl());
  if (allLinksErr.value != null) {
    throwErr(allLinksErr);
  } else {
    const allList = allLinks.value as LinkListDto;
    if (allList.items.length > 0) {
      linksStore.allLinks = allList.items;
    } else {
      linksStore.allLinks = [{
        id: "-1",
        name: "",
        url: "",
        description: "",
      }];
    }
  }
}

async function doShortLinks() {
  const {data: shortLinks, error: shortLinksErr} = await useFetch(GetShortListtUrl());
  if (shortLinksErr.value != null) {
    throwErr(shortLinksErr);
  } else {
    const linkList = shortLinks.value as ShortLinkListDto;
    if (linkList.items.length > 0) {
      for (let i in linkList.items) {
        linksStore.shortLinks[linkList.items[i].identifier]=linkList.items[i].url;
      }
    } else {
      linksStore.shortLinks["-1"]="/";
    }
  }

}

// 统一的异常信息
function throwErr(data:any) {
  if (process.server) {
    console.error("baseErr.value:",data.value);
  }
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
  const homeUndisp = siteStore.GetSiteInfoByKey("site_head_script_code");
  if (homeUndisp&&homeUndisp.length>0) {
    dataInfo.siteInfo.site_head_script_code = homeUndisp;

  }
  const homeCode = siteStore.GetSiteInfoByKey("site_head_code");
  if (homeCode&&homeCode.length>0) {
    dataInfo.siteInfo.site_head_code = homeCode;
  }
  const siderCode = siteStore.GetSiteInfoByKey("site_sider_code");
  if (siderCode&&siderCode.length>0) {
    dataInfo.siteInfo.site_sider_code = siderCode;
  }

  // window.document.title = dataInfo.siteInfo.site_name
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

function someErrorLogger(err) {
  console.log('got an error', err);
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
