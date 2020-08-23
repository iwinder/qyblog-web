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
        await  context.store. dispatch('siteInfo/getSiteGo');
         let old =  context.route.path;
         let news  = old.replace("/go/", ""); 
        //   context.store.getters("siteInfo/getSiteGoUrl")()
        let url  = context.store.getters["siteInfo/getSiteGoUrl"](news);
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
    
})
</script>