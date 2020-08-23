<template>
    <a-row> 
        <a-card  style="width: 100%">  
            <img
            slot="cover"
            alt="example"
            src ="/img/user-default-cover-mini.png"
            />
        <a-row class="card_site_header" >
                <a-card-meta  :title="siteInfo.nickname" :description="siteInfo.site_desc">
                <a-avatar
                size="large"
                    slot="avatar"
                    :src ="siteInfo.avatar"
                />
                </a-card-meta>
        </a-row>
            <a-row class="card_site_meta" type="flex" justify="center" align="middle"> 
                <a-col :span="4" v-if=" $QyServeTool().isNotEmpty( siteInfo.site_qq) " >   <a class="fts-qq"    :href="'http://wpa.qq.com/msgrd?v=3&amp;uin='+siteInfo.site_qq+'&amp;site=qq&amp;menu=yes'" target="_blank" rel="noopener"> <a-icon type="qq" /> </a> </a-col>
                <a-col  :span="4" v-if="$QyServeTool().isNotEmpty(siteInfo.site_qq_group)"  >    <a class="fts-qq-group"    :href="'https://shang.qq.com/wpa/qunwpa?idkey='+siteInfo.site_qq_group " target="_blank" rel="noopener">    <a-icon type="team" /> </a></a-col>
                <a-col  :span="4"  v-if="$QyServeTool().isNotEmpty(siteInfo.site_weixin_qr)"  >   
                        <a-popover  >
                            <template slot="content">
                            <img  :src="siteInfo.site_weixin_qr" alt="" style="width: 121px;">
                            </template>
                        <a class="fts-wechat"    href="javascript:void(0);" rel="noopener"> <a-icon type="wechat"   /> </a>
                        </a-popover> 
                    </a-col>
                    <a-col  :span="4"   v-if="$QyServeTool().isNotEmpty(siteInfo.site_weibo)" >  <a class="fts-weibo"    :href="'http://www.weibo.com/'+siteInfo.site_weibo" target="_blank" rel="noopener"> <a-icon type="weibo-circle"   /> </a> </a-col>
                    <a-col  :span="4"  v-if="$QyServeTool().isNotEmpty(siteInfo.site_mailme_id)" > <a class="fts-mailme"    :href="'http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email='+siteInfo.site_mailme_id" target="_blank" rel="noopener"> <a-icon type="mail" /> </a> </a-col>
            </a-row>
        </a-card>
    </a-row>
</template>

<script >
import Vue from 'vue'
 import { mapState } from 'vuex'
export default Vue.extend({
    computed: {
            ...mapState({
                siteInfo: state => state.siteInfo.siteInfo
        })
    },
    data() {
        return {
 
        }
    },
})
</script>

<style lang="scss"   scoped> 
.card_site_header {
  margin: auto;
    padding: 0px 0 10px 0;
    border-bottom: 1px solid #e8e8e8;
}
.card_site_meta {
  padding: 10px 0;
  i {
  font-size: 20px;
  }

}
</style>