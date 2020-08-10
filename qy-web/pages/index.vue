<template>
  <a-row class="content">
    <a-col :xs="{span:24}"  :lg="{ span: 16}" > 
       <qy-post-list  :pagination="pagination" :listData="listData"></qy-post-list>
    </a-col>

  <a-col :xs="{span:24}"  :lg="{  span: 5, offset: 7 }" > 

  </a-col>

</a-row>


  
</template>

<script>
import Vue from 'vue'
import QyPostList from '~/components/qy-post-list.vue'
 import { mapState } from 'vuex'


export default Vue.extend({
  components: { 
    QyPostList
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
                      category: e.category,
                      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                      description:
                        '蜜汁超酸奶/2020-07-08',
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
            console.log("result", result);
            return result;
          }), 
         ]);
         console.log("LruCache siteInfo",  _this.$LruCache());
         let siteInfo = _this.$LruCache().get("qy_siteInfo");
          console.log("LruCache siteInfo", siteInfo);
         if (!siteInfo) {
           console.log("!siteInfo", siteInfo);
             siteInfo  =  await     _this.$axios.get('/siteInfo/all').then(res => {
              let resp  = res.data;	
                if(resp.success) { 
                  _this.store. commit('siteInfo/setSiteBase',  resp.content);
                  return resp.content;
                }
            })
            console.log("!siteInfo2", siteInfo);
          _this.$LruCache().set("qy_siteInfo",siteInfo);    
         }



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
              siteInfo: siteInfo
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

  created() {
    let _this  =  this;
    console.log("_this.$store", _this.$store);
        console.log("_this.$LruCache" , this.$LruCache());
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

  }
})
</script>

<style lang="scss"   scoped>
@import "@/assets/css/qy-index.scss"
</style>
