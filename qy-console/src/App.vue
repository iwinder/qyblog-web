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
  },
  data() {
    return {
      site:{}
    }
  },
  methods:  {
    initSiteInfo() {
      let _this = this;
              _this.$axios.get('/web/siteInfo/base' ).then(res => {
            let resp  = res.data				
            if(resp.success) {
              _this.site =   resp.content;
              console.log(" _this.site ",  _this.site );
            }
          });
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
