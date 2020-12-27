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
  _this.site  = QyTool.getSiteInfoBase();
  if(QyTool.isNotEmpty( _this.site)) {
    QyTool.refreshSiteInfoBase( _this.site);
  } else {
     document.title = "WindCoder";
  } 
  _this.initEndWithF();

  },
  data() {
    return {
      site:{}
    }
  },
  methods:  {
      initEndWithF() { 
        if (typeof String.prototype.endsWith != 'function') {
            String.prototype.endsWith = function (str){
                return this.slice(-str.length) == str;
            };
        }
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
