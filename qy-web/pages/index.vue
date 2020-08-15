<template>
  <a-row class="content">
    <a-col :xs="{span:24}"  :lg="{ span: 16}"  class="content-left"> 
       <qy-post-list  :pagination="pagination" :listData="listData"></qy-post-list>
    </a-col>

  <a-col :xs="{span:24}"  :lg="{  span: 5, offset: 1 }" class="content-right" > 

  </a-col>

</a-row>


  
</template>

<script>
import Vue from 'vue'
import QyPostList from '~/components/qy-post-list.vue'
 import { mapState } from 'vuex'
import moment from 'moment';

export default Vue.extend({
  components: { 
    QyPostList
  },
async fetch({ store, params }) {
  await store. dispatch('siteInfo/getSiteInfo');
},
 async  asyncData (context) {
   let _this = context; 
    console.log("async context siteIndo", context); 
    let[res1] = await Promise.all([ 
        _this.$axios.get('articles',{ params: {
              page: 1,
              size:  1
         } }).then(res => {
            let resp  = res.data				
            let result = {};
            let listData = [];
            if(resp.success) {
                let data = resp.content.list;
              
                data.forEach(e  => {
                    listData.push({
                      id: e.id,
                      href:  e.permaLink,
                      title: e.title,
                      thumbnail: e.thumbnail,
                      tagStrings: e.tagStrings,
                      tags: e.tags,
                      category: e.category,
                      avatar: e.author.avatar,
                      author: e.author,
                      publishedDateMD:   moment(e.publishedDate).format('YYYY-MM-DD'),
                      content:
                        e.summary,
                    });
               });
              result = {
                  listData:  listData,
                  total:   resp.content.total,
                  current:  resp.content.page,
                  pageSize:  resp.content.size
                };
            }
            return result;
          }), 
         ]);
        //  console.log("LruCache siteInfo",  _this.$LruCache());
        //  let siteInfo = _this.$LruCache().get("qy_siteInfo");
        //   console.log("LruCache siteInfo", siteInfo);
        //  if (!siteInfo) {
        //    console.log("!siteInfo", siteInfo);
        //      siteInfo  =  await     _this.$axios.get('/siteInfo/all').then(res => {
        //       let resp  = res.data;	
        //         if(resp.success) { 
        //           _this.store. commit('siteInfo/setSiteBase',  resp.content);
        //           return resp.content;
        //         }
        //     })
        //     console.log("!siteInfo2", siteInfo);
        //   _this.$LruCache().set("qy_siteInfo",siteInfo);    
        //  }

      //  await _this.store. dispatch('siteInfo/getSiteInfo');
        console.log("init  !siteInfo2 ", _this.store.state.siteInfo);
          return{
              listData : res1.listData, 
              pagination: {
                total:  res1.total,
                current : res1.current ,
                pageSize : res1.pageSize, 
                onChange: page => { 
                                _this.app.router.push("/page/"+page);
                        
                },
              },
      
        }
    },
    data() {
      return {
        listData:[], 
        pagination: {
          pageSize: 3,
          total: 0,
          showLessItems: true,
           onChange: page => { }
        },
    }
  },
computed: {
  ...mapState({
    siteInfo: state => state.siteInfo.siteInfo
  })
},
  created() {
    let _this  =  this;
    console.log("_this.$siteInfo", _this.siteInfo);
    //     console.log("_this.$LruCache" , this.$LruCache());
    //  _this.$store.dispatch("siteInfo/getSiteInfo");
  },
  head () {
        return {
           title: this.siteInfo.site_name,
            meta: [
                { hid: "keywords", name: "keywords", content: this.siteInfo. site_key},
                { hid: "description", name: "description", content: this.siteInfo. site_description},

            ],
            link: [
                // {rel:"stylesheet" ,type:"text/css", href:"/css/qy-index.css"}
            ],
            
        }
    },
  methods: {
    moment,
  }
})
</script>

<style lang="scss"   scoped>
@import "@/assets/css/qy-index.scss"
</style>
