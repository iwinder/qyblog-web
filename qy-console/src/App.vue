<template>
  <div id="app">
      <router-view />
  </div>
</template>

<script>
 
export default {
  name: 'App',
  components: {
     
  },
created() {
  let _this = this; 
  _this.initSiteInfo();
   document.title = _this.site.site_name;
  },
  data() {
    return {
      site:{}
    }
  },
  methods:  {
    initSiteInfo() {
      let _this = this;
     _this.site  = QyTool.getSiteInfoBase();
      if(QyTool.isEmpty(  _this.site)) {
        _this.$axios.get('/web/siteInfo/base' ).then(res => {
            let resp  = res.data				
            if(resp.success) {
              _this.site =   resp.content;
              QyTool.setSiteInfoBase(resp.content);
              _this.initIco( _this.site .site_icon);
            }
          });
      } else {
         _this.initIco( _this.site .site_icon);
      }
    },
    initIco(url) {
          var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
          link.type = 'image/x-icon';
          link.rel = 'shortcut icon';
          link.href = url;
          document.getElementsByTagName('head')[0].appendChild(link);
    } 
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
