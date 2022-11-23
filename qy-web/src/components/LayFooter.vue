<template>
  <a-layout-footer style="text-align: center">
    <a-row class="footer-nav"  type="flex" justify="center" align="middle" >
      <a-row  class="footer-menus" v-if="dataInfos.footerMenus" justify="center" align="middle">
        <QyAMenus menusClass="footerMenus" listMode="horizontal" :menusList="dataInfos.footerMenus"></QyAMenus>
      </a-row>
        <a-row  class="footer-copy" justify="center" align="middle">
          <a-col  > ©
            <template v-if="dataInfos.siteInfo.site_open_date">
              {{moment(dataInfos.siteInfo.site_open_date).year()}} -
            </template>
            {{moment().year()}}&nbsp;&nbsp;&nbsp;&nbsp;<a :href="dataInfos.siteInfo.site_url" :title="dataInfos.siteInfo.site_name" rel="link noopener" target="_blank" v-if="dataInfos.siteInfo.site_url">{{dataInfos.siteInfo.site_name}}</a>
            <router-link  to="/"  :title="dataInfos.siteInfo.site_name" rel="link noopener" target="_blank"  v-else > {{dataInfos.siteInfo.site_name}}</router-link >&nbsp;&nbsp;
          </a-col>
          <!-- :xs="{span:8}"  :sm="{span:6}"  :md="{ span: 3}" -->
          <a-col  v-if="dataInfos.siteInfo.site_beian"> <a href="http://beian.miit.gov.cn/" rel="link noopener" target="_blank">{{dataInfos.siteInfo.site_beian}}</a>&nbsp;&nbsp;</a-col>
          <a-col   >  <b style="color: #ff4425;">♥</b>   Design by
            <a href="https://windcoder.com" title="WindCoder" rel="link noopener" target="_blank">WindCoder.</a>
          </a-col>
      </a-row>
      <template   v-if="dataInfos.siteInfo.site_foot_code">
        <div class="footer-diy ant-row"   v-html="dataInfos.siteInfo.site_foot_code"></div>
      </template>
    </a-row>
  </a-layout-footer>
</template>

<script setup lang="ts">
import QyAMenus from "@/components/QyAMenus.vue"
import * as moment from 'moment';
import {computed, onMounted, reactive, ref} from "vue";
const dataInfos = reactive({
  footerMenus:[{
    id:"1",
    name: "留言",
    url:"/messages",
    blanked:1,
  },{
    id:"2",
    name: "关于",
    url:"/about",
    blanked:2,
  },{
    id:"3",
    name: "百度",
    url:"https://www.baidu.com",
    blanked:1,
  }],
  siteInfo: {
    site_name:"青青小镇",
    site_url:"http://test.windcoder.com",
    site_open_date:"2013-01-01",
    site_beian:"哒哒哒",
    site_foot_code:"",
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