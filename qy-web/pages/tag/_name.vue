<template>
    <a-row class="content">
        <a-col :xs="{span:24}"  :lg="{ span: 16}"  class="content-left"> 
        <qy-post-list  :pagination="pagination" :listData="listData"></qy-post-list>
        </a-col>

       <a-col :xs="{span:24}"      :lg="{  span: 7, offset: 1 }" class="content-right" >  
         <qy-post-right-sider></qy-post-right-sider>
        </a-col>

    </a-row>
</template>

<script>
import Vue from 'vue'
import moment from 'moment';
import { FormModel } from 'ant-design-vue';
import QyPostList from '~/components/qy-post-list.vue'
import QyPostRightSider from '~/components/qy-post-right-sider.vue'
 import { mapState } from 'vuex'
 
Vue.use(FormModel); 
export default {
      components: { 
        QyPostList,
        QyPostRightSider
     },
     async fetch({ store, params }) {
  await store. dispatch('siteInfo/getSiteInfo');
},
     async  asyncData (context) { 
         let id = context.params.aid;
        let name = context.params.name;
        let params = {
              page: 1,
              size:  1
         }
         let url = "articles/tag";
            if  (id) {
                   params.tagId = id;
              } else {
                   params.tagName = name;
              }
          let[res1] = await Promise.all([ 
           
        context.$axios.get("articles", {params: params}).then(res => {
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

          })
         ])
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
    head () {
        return {
            title: this.siteInfo.site_name,
            meta: [
                // { hid: "keywords", name: "keywords", content: this.postData. tagStrings},
                // { hid: "description", name: "description", content: this.postData. summary},

            ],
            link: [
                  {rel:"canonical" , href: this.siteInfo.site_url+this.$nuxt.$route.path}
            ],
            
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
     mounted() { 
     },
    methods: {
        moment,
  },
}
</script>

  <style lang="scss"   scoped>
@import "@/assets/css/qy-index.scss"
</style>