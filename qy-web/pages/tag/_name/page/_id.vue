<template>
    <a-row class="content">
        <a-col :xs="{span:24}"  :lg="{ span: 16}"  class="content-left"> 
               <h2  >标签 {{targetTag.name}} 的结果</h2> 
           <qy-post-list  :pagination="pagination" :listData="listData" ></qy-post-list>
        </a-col>

       <a-col :xs="{span:24}"      :lg="{  span: 7, offset: 1 }" class="content-right" >  
         <qy-post-right-sider></qy-post-right-sider>
        </a-col>

    </a-row>
</template>

<script  >
import Vue from 'vue'
import QyPostList from '~/components/qy-post-list.vue'
import QyPostRightSider from '~/components/qy-post-right-sider.vue'
  import { mapState } from 'vuex'
import moment from 'moment';
export default Vue.extend({
      components: { 
    QyPostList,
    QyPostRightSider
  },
    validate ({ params }) {
        // 必须是number类型
        return /^\d+$/.test(params.id)
    },
     async fetch({ store, params }) {
        await store. dispatch('siteInfo/getSiteInfo');
    },
    async  asyncData (context) { 
        let _this = context; 
        let name = _this.params.name; 
        let tagUrl = "/tag/name/" + name;
        let res1 = await   _this.$axios.get('articles',{ params: {
            tagName: name,
                            page:  _this.params.id,
                size:  1
            } }).then(res => {
                let resp  = res.data				
                let result = {};
                let listData = [];
                if(resp.success) {
                    let data = resp.content.list; 
                    let defImg = "/img/image-pending.gif";
                    data.forEach((e,i ) => {  
                           
                          if(process.browser) {
                                defImg = '/img/thumb/'+ _this.$QyServeTool().randomNum(1,32)+'.jpg';
                          } 
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
                            defImg: defImg,
                            viewCount: e.viewCount,
                            commentCount: e.commentCount,
                            publishedDateMD:   moment(e.publishedDate).format('YYYY-MM-DD'),
                            content: e.summary,
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

            });
          let tag = await  context.$axios.get(tagUrl).then(res => {
              let resp  = res.data			
               if(resp.success) {
                 return resp.content;
            } else {
                return {
                  name: ""
                }
            }
          });

            return{
                listData : res1.listData, 
                pagination: {
                    total:  res1.total,
                    current : res1.current ,
                    pageSize : res1.pageSize, 
                            onChange: page => { 
                                if(page===1) {
                                    _this.app.router.push("/tag/"+name);
                                } else {
                                     _this.app.router.push("/tag/"+name+"/page/"+page);
                                }
                           
                        },
                } ,
                  targetTag: tag
            }
    },
    head () {
        return {
            title:   this.targetTag.name +"- "+this.siteInfo.site_name  +" --第" +this.pagination.current+"页" ,
            meta: [
               { hid: "keywords", name: "keywords", content: this.siteInfo. site_key},
                { hid: "description", name: "description", content: this.siteInfo. site_description},

            ],
            link: [
                      {rel:"canonical" , href: this.siteInfo.site_url+this.$nuxt.$route.path}
            ],
            
        }
    },
    computed: {
    ...mapState({
      siteInfo: state => state.siteInfo.siteInfo
    })
  },
    data() {
      return {
        listData:[],
        data:[],
        pagination: {
          onChange: page => {
            console.log(page);
          },
          pageSize: 3,
          total: 23,
          showLessItems: true,
        },
        actions: [
      
          { type: 'like-o', text: '156' },
          { type: 'message', text: '2' },
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