<template>
  <a-layout-footer style="text-align: center">
    <a-row class="footer-nav"  type="flex" justify="center" align="middle" >
      <a-row  class="footer-menus" v-if="footerMenus" justify="center" align="middle">
        <QyAMenus  menus-class="footerMenus" list-mode="horizontal" :menus-list="footerMenus"></QyAMenus>
      </a-row>
        <a-row  class="footer-copy" justify="center" align="middle">
          <a-col  > ©
            <template v-if="siteInfo.site_open_date">
              {{dayjs(siteInfo.site_open_date).year()}} -
            </template>
            {{dayjs().year()}}&nbsp;&nbsp;&nbsp;&nbsp;<a :href="siteInfo.site_url" :title="siteInfo.site_name" rel="link noopener" target="_blank" v-if="siteInfo.site_url">{{siteInfo.site_name}}</a>
            <NuxtLink  to="/"  :title="siteInfo.site_name" rel="link noopener" target="_blank"  v-else > {{siteInfo.site_name}}</NuxtLink >&nbsp;&nbsp;
          </a-col>
          <!-- :xs="{span:8}"  :sm="{span:6}"  :md="{ span: 3}" -->
          <a-col  v-if="siteInfo.site_beian"> <a href="http://beian.miit.gov.cn/" rel="link noopener" target="_blank">{{siteInfo.site_beian}}</a>&nbsp;&nbsp;</a-col>
          <a-col   >  <b style="color: #ff4425;">♥</b>   Design by
            <a href="https://windcoder.com" title="WindCoder" rel="link noopener" target="_blank">WindCoder.</a>
          </a-col>
      </a-row>
      <template   v-if="siteInfo.site_foot_code">
        <div class="footer-diy ant-row"   v-html="siteInfo.site_foot_code"></div>
      </template>
    </a-row>
  </a-layout-footer>
</template>

<script setup lang="ts">
import QyAMenus from "@/components/QyAMenus.vue"
// import * as moment_ from 'moment';
import   dayjs from 'dayjs'
import {MenusDto} from "@/api/menus";
const props =  defineProps({
  siteInfo: {
    default: {
      site_name:"",
      site_url:"",
      site_open_date:"",
      site_beian: "",
      site_foot_code: "",
    }
  },
  footerMenus:{
    default:[] as MenusDto[]
  }
})


</script>

<style scoped lang="less">
.ant-layout-footer {
  text-align: center;
  background: #000;
  color: #fff;
  padding: 12px 25px;
    .footer-nav {
      padding: 20px 0;
        :deep(.footer-menus) {
           width: 100%;
           .footerMenus {
              background: rgba(0, 0, 0, 0);
              border: 0;
              margin-bottom: 15px;
             li {
                padding: 0 5px;
                a{ color: #fff;  }
                a:before {
                  position: absolute;
                  top: inherit;
                  left: 0;
                  width: 100%;
                  height: 1px;
                  background-color: #c2c2c2;
                  content: ' ';
                  -webkit-transition: all .2s;
                  transition: all .2s;
                  backface-visibility: hidden;
                  -webkit-transform: scaleX(0);
                  transform: scaleX(0);
                  transform-origin: center;
                }
                a:hover:before {
                  -webkit-transform: scaleX(1);
                  transform: scaleX(1);
                }
              }
             .ant-menu-item-selected {background: rgba(0, 0, 0, 0.15);}
           }
        }
        .footer-copy {
            .ant-col {
              a{ color: #fff;  }
            }
        }
    }
}
</style>
