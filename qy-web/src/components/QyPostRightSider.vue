<template>
  <a-row>
    <a-card  style="width: 100%">
      <a-image
          slot="cover"
          alt="example"
          src ="/images/user-default-cover-mini.png"
      />
      <a-row class="card_site_header" >
<!--        <a-card-meta  :title="siteInfo.nickname" :description="siteInfo.site_desc">-->
<!--          <a-avatar-->
<!--              icon="user"-->
<!--              size="large"-->
<!--              slot="avatar"-->
<!--              :src ="siteInfo.avatar"-->
<!--              alt="C"-->
<!--          />-->
<!--        </a-card-meta>-->
      </a-row>
      <a-row class="card_site_meta" type="flex" justify="center" align="middle">
        <a-col :span="4" v-if="siteInfo.site_qq.length>0" >   <a class="fts-qq"    :href="'http://wpa.qq.com/msgrd?v=3&amp;uin='+siteInfo.site_qq+'&amp;site=qq&amp;menu=yes'" title="QQ聊天" target="_blank" rel="noopener"> <QqOutlined /></a> </a-col>
        <a-col  :span="4" v-if="siteInfo.site_qq_group.length>0"  >    <a class="fts-qq-group"    :href="'https://shang.qq.com/wpa/qunwpa?idkey='+siteInfo.site_qq_group "  title="点击加入QQ群" target="_blank" rel="noopener"> <TeamOutlined />  </a></a-col>
        <a-col  :span="4"  v-if="siteInfo.site_weixin_qr.length>0"  >
          <a-popover  >
            <template  #content>
              <img      alt=""   v-lazy="siteInfo.site_weixin_qr" style="width: 121px;">
            </template>
            <a class="fts-wechat"    href="javascript:void(0);" rel="noopener"><WechatOutlined /> </a>
          </a-popover>
        </a-col>
        <a-col  :span="4"   v-if="siteInfo.site_weibo.length>0" >  <a class="fts-weibo"    :href="'http://www.weibo.com/'+siteInfo.site_weibo" title="微博" target="_blank" rel="noopener"> <WeiboCircleOutlined />  </a> </a-col>
        <a-col  :span="4"  v-if="siteInfo.site_mailme_id.length>0" > <a class="fts-mailme"    :href="'mailto:'+siteInfo.site_mailme_id"  title="发送Email" target="_blank" rel="noopener"> <MailOutlined />   </a> </a-col>
      </a-row>
    </a-card>
    <!-- 友情链接 -->
    <a-card   title="友情链接"  style="width: 100%" v-show="siteInfo.siteIndexLink && siteInfo.siteIndexLink.length>0">
      <!-- <nuxt-link    slot="extra"  :to="{name:'name',params:{name:'link'}}"   target="_blank"> 更多 </nuxt-link> -->

      <a-row class="card_site_index_url" >
        <ul>
          <li v-for="(link) in siteInfo.siteIndexLink" :key="link.id"  >
            <a :href="'//'+link.url"  :title="link.description"  target="_blank" rel="noopener">
              <!-- <img src="/favicon.ico"     v-real-img="'//'+link.url+'/favicon.ico'"  width="18px" />  -->
              <a-image :src="'//'+link.url+'/favicon.ico'"  fallback="/favicon.ico"      width="18px"/>
              {{link.name}}</a>
          </li>
        </ul>
      </a-row>
    </a-card>
    <!-- 自定义 -->
    <a-card  class="card_site_sider"   style="width: 100%" v-show="siteInfo.site_sider_code.length>0">
      <div class="ant-row" v-html="siteInfo.site_sider_code"></div>
    </a-card>
  </a-row>
</template>

<script setup lang="ts">
import {onMounted, reactive} from "vue";
const linksStore =  useLinksInfo();
import {
  QqOutlined,
  TeamOutlined,
  WechatOutlined,
  WeiboCircleOutlined,
  MailOutlined,
} from '@ant-design/icons-vue';
import {useSiteInfo} from "@/store/siteInfo";
import {useLinksInfo} from "@/store/links";
const siteStore =  useSiteInfo();
const siteInfo = reactive({
  site_sider_code:"",
  site_desc:"",
  site_qq:"",
  site_qq_group:"",
  site_weibo:"",
  site_weixin_qr:"",
  site_mailme_id:"",
  siteIndexLink:[]
})
onMounted(() => {
  initSiteOtherInfo();
  if (linksStore.indexLinks.length>0&&linksStore.indexLinks[0].id!="-1") {
    siteInfo.siteIndexLink = linksStore.indexLinks;
  }
})

function initSiteOtherInfo() {
  const siteDesc = siteStore.GetSiteInfoByKey("site_desc");
  if (siteDesc&&siteDesc.length>0) {
    siteInfo.site_desc = siteDesc;
  }
  const qq = siteStore.GetSiteInfoByKey("site_qq");
  if (qq&&qq.length>0) {
    siteInfo.site_qq = qq;
  }
  const qqGroup = siteStore.GetSiteInfoByKey("site_qq_group");
  if (qqGroup&&qqGroup.length>0) {
    siteInfo.site_qq_group = qqGroup;
  }
  const weibo = siteStore.GetSiteInfoByKey("site_weibo");
  if (weibo&&weibo.length>0) {
    siteInfo.site_weibo = weibo;
  }
  const wxqr = siteStore.GetSiteInfoByKey("site_weixin_qr");
  if (wxqr&&wxqr.length>0) {
    siteInfo.site_weixin_qr = wxqr;
  }
  const mail = siteStore.GetSiteInfoByKey("site_mailme_id");
  if (mail&&mail.length>0) {
    siteInfo.site_mailme_id = mail;
  }
  const siderCode = siteStore.GetSiteInfoByKey("site_sider_code");
  if (siderCode&&siderCode.length>0) {
     siteInfo.site_sider_code = siderCode;
  }

}
</script>

<style scoped lang="less">
.ant-card {
  margin-bottom: 10px;
}
.card_site_header {
  margin: auto;
  padding: 0px 0 10px 0;
  border-bottom: 1px solid #e8e8e8;
}
.card_site_meta {
  padding: 10px 0;
  a {
    font-size: 20px;
  }

}
.card_site_index_url {
  ul {
    list-style: none;
    li {
      width: 50%;
      display: inline-block;
    }
  }
}
</style>