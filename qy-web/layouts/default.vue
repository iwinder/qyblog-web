<template>
<a-config-provider :locale="zh_CN">
  <a-layout id="components-layout-demo-top-side-2"  style="min-height: 100vh">
    <qy-left-sider     :isCollapsed="collapsed"  :headMenuSelect="headMenuSelect" :afterClose="afterClose" :afterMenuSelect="afterMenuSelect"> </qy-left-sider>
     
       <a-layout>
        <qy-header  :isCollapsed="collapsed"  :headMenuSelect="headMenuSelect" @on-collapsed="onCollapsed"  :afterMenuSelect="afterMenuSelect"></qy-header>
          <a-layout-content>
              <nuxt />
          </a-layout-content>
        <qy-footer></qy-footer>
        <div>
            <a-back-top /> 
            <strong style="color: rgba(64, 64, 64, 0.6)">   </strong> 
          </div>
       </a-layout>
  
  </a-layout>
    </a-config-provider>
</template>



<script>
import QyHeader from '~/components/qy-header.vue'
import QyFooter from '~/components/qy-footer.vue'
import QyLeftSider from '~/components/qy-left-sider.vue'
import Vue from 'vue'
import { ConfigProvider,Menu,Drawer,Card } from 'ant-design-vue';
 import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
  import moment from 'moment';
  import 'moment/locale/zh-cn';
Vue.component(ConfigProvider.name, ConfigProvider,Menu.name,Menu,Drawer.name,Drawer,Card.name,Card);
moment.locale('zh-cn');
import { mapState } from 'vuex'

export default  {
  components: {
    QyHeader,
    QyFooter,
    QyLeftSider,
  },
  data() {
    return {
      isShow: false,
       collapsed: false,
       zh_CN,
       headMenuSelect:[]
    }
  },
  head () {
        return {
            title: this.siteInfo.name,
            meta: [
                { hid: "keywords", name: "keywords", content: this.siteInfo. site_key},
                { hid: "description", name: "description", content: this.siteInfo. site_description},

            ],
            link: [
                {rel:"stylesheet" ,type:"text/css", href:"/css/github-markdown.css"}
            ],
            
        }
},
  computed: {
    ...mapState({
      siteInfo: state => state.siteInfo.siteInfo
    })
  },
  mounted() {
    this.headMenuSelect = [$nuxt.$route.path];
  },
  methods: {
    onCollapsed(val) { 
      this.collapsed = val;
    },
    afterMenuSelect(val) {
      this.headMenuSelect = val;
    },
    afterClose(val) {
      let _this = this;
       _this.collapsed = false;
    }
  }

}
</script>

<style>
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
