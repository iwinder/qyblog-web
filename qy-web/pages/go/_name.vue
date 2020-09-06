<template>
    
</template>


<script >
import Vue from 'vue'
 import { mapState } from 'vuex'
export default Vue.extend({
    async fetch({ store, params }) {
  await store. dispatch('siteInfo/getSiteInfo');

},
  async   asyncData (context) {
    let _this = context;
         let old =  context.route.path; 
         let news  = old.replace("/go/", ""); 
                _this.store. dispatch('siteInfo/getSiteGo');
              let url  =    _this.store.getters["siteInfo/getSiteGoUrl"](news);
              console.log("news", news, url);
        // await  context.store. dispatch('siteInfo/getSiteGo');

//         //   context.store.getters("siteInfo/getSiteGoUrl")()
//         let url  = context.store.getters["siteInfo/getSiteGoUrl"](news);
        if(!url) {
 return context.redirect("/");
        }
            return context.redirect(url);
    },
    computed: {
        ...mapState({
            siteInfo: state => state.siteInfo.siteInfo,
            siteGo: state => state.siteInfo.siteGo,
    }), 
},
created() {
         let _this = this;
               console.log("created",_this);
  //  _this.$store. dispatch('siteInfo/getSiteGo');
    
},
  mounted() {
          let _this = this;
          console.log(_this);
          //  window.location.href = url 
           let old =  _this.$route.path;
         let news  = old.replace("/go/", ""); 
      //       let url  =    _this.$store.getters["siteInfo/getSiteGoUrl"](news);
      //         if(!url) {
      //           url = "/";
      //  }
        // this.$router.redirect(url);
              // _this.$store. dispatch('siteInfo/getSiteGo');
              // let url  =    _this.$store.getters["siteInfo/getSiteGoUrl"](news);
              // console.log("news", news, url);
              //     if(!url) { 
              //        url = "/";
              //     }
                    // window.location.href = url ;
        //  let old =  context.route.path;
        //  let news  = old.replace("/go/", ""); 
        // //   context.store.getters("siteInfo/getSiteGoUrl")()
        // let url  = context.store.getters["siteInfo/getSiteGoUrl"](news);
        // if(!url) {
        //        return context.redirect("/");
        // }
        //     return context.redirect(url);
  }
})
</script>