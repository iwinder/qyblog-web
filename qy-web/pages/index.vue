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
 


export default Vue.extend({
  components: { 
    QyPostList
  },
 async  asyncData (context) {
   let _this = context;
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
              }  
        }
    },
    data() {
      return {
        listData:[],
        data:[],
        pagination: {
          pageSize: 3,
          total: 0,
          showLessItems: true,
        },
        actions: [
          { type: 'like-o', text: '156' },
          { type: 'message', text: '2' },
        ],
    }
  },

  head () {
        return {
            title: "WindCoder",
            meta: [
                // { hid: "keywords", name: "keywords", content: this.postData. tagStrings},
                // { hid: "description", name: "description", content: this.postData. summary},

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
