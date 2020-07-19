<template>
    <a-row class="content">
        <a-col :xs="{span:24}"  :lg="{ span: 16}" > 
            <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">
                <a-list-item slot="renderItem" key="item.title" slot-scope="item">
                    
                    <template   slot="extra" style="width:272px"> 
                        <template v-if="item.category!=null">
                            <a href="https://windcoder.com/category/java"  class="category-tag" rel="category tag"> {{item.category.name}}</a>
                        </template>
                        <template v-else>                
                                <a href="https://windcoder.com/category/java"  class="category-tag" rel="category tag"> 未分类</a>   
                        </template> 
                         <nuxt-link  slot="title"  :to="{name:'name',params:{name:item.href, aid:item.id}}" class="img-a">
                                        <img
                                        width="272px"
                                        alt="logo"
                                        :src="item.thumbnail"
                                    /> </nuxt-link>
                    </template>
                    <template v-for="{ type, text } in actions" slot="actions">
                        <span :key="type">
                        <a-icon :type="type" style="margin-right: 8px" />
                        
                            {{ text }}
                        </span>
                    </template>

                    <a-list-item-meta :description="item.description">
                        <nuxt-link  slot="title"  :to="{name:'name',params:{name:item.href, aid:item.id}}"> {{ item.title }} </nuxt-link>
                    </a-list-item-meta>

                    <a-row style="margin: 5px 0;">
                            <a-tag color="#f50" v-for=" tag in item.tagStrings" :key="tag">
                            {{tag}}
                            </a-tag>
                        
                    </a-row> 
                    <a-row>   {{ item.content }}... </a-row>
                </a-list-item>
            </a-list>
        </a-col>

        <a-col :xs="{span:24}"  :lg="{  span: 5, offset: 7 }" > 

        </a-col>

    </a-row>
</template>

<script  >
import Vue from 'vue'
export default Vue.extend({
    validate ({ params }) {
        // 必须是number类型
        return /^\d+$/.test(params.id)
    },
    async  asyncData (context) {
        let _this = context;
        let[res1] = await Promise.all([ 
            _this.$axios.get('articles',{ params: {
                            page:  _this.params.id,
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
                                if(page===1) {
                                    _this.app.router.push("/");
                                } else {
                                    _this.app.router.push("/page/"+page);
                                }
                           
                        },
                }  
            }
    },
    head () {
        return {
            title: "WindCoder--第" +this.pagination.current+"页" ,
            meta: [
                // { hid: "keywords", name: "keywords", content: this.postData. tagStrings},
                // { hid: "description", name: "description", content: this.postData. summary},

            ],
            link: [
                // {rel:"stylesheet" ,type:"text/css", href:"/css/qy-index.css"}
            ],
            
        }
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
})
</script>


<style scoped>
@import "@/static/css/qy-index.css"

</style>