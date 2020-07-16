<template>
<a-row class="content">
<a-col :xs="{span:24}"  :lg="{ span: 16}" > 
 <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">
    <!-- <div slot="footer"><b>ant design vue</b> footer part</div> -->
    <a-list-item slot="renderItem" key="item.title" slot-scope="item">
        
        <template   slot="extra" style="width:272px"> 
              <template v-if="item.category!=null">
                 
                <a href="https://windcoder.com/category/java"  class="category-tag" rel="category tag">
                
                {{item.category.name}}</a>
                </template> <template v-else>                <a href="https://windcoder.com/category/java"  class="category-tag" rel="category tag">
                
            未分类</a>   </template>
          <a href="https://windcoder.com/dawenjianfenpianshangchuanjavabanjiandanshixian" class="img-a">
          <img
        width="272px"
        alt="logo"
        :src="item.thumbnail"
      /></a>

      </template>
      <template v-for="{ type, text } in actions" slot="actions">
        <span :key="type">
          <a-icon :type="type" style="margin-right: 8px" />
         
            {{ text }}
        </span>
      </template>

      <a-list-item-meta :description="item.description">
        <nuxt-link  slot="title"  :to="{name:'name',params:{name:item.href, aid:item.id}}"> {{ item.title }} </nuxt-link>
        <!-- <a  :href="item.href"></a> -->
        <!-- <a-avatar slot="avatar" :src="item.avatar" /> -->
      </a-list-item-meta>

         <a-row style="margin: 5px 0;">
                <a-tag color="#f50" v-for=" tag in item.tagStrings" :key="tag">
                  {{tag}}
                </a-tag>
             
            </a-row> 
             <a-row>
      {{ item.content }}    
       </a-row>
    </a-list-item>
  </a-list>
</a-col>

<a-col :xs="{span:24}"  :lg="{  span: 5, offset: 7 }" > 

</a-col>

</a-row>


  
</template>

<script>
import Vue from 'vue'
import Logo from '~/components/Logo.vue'
// import axios from 'axios'
// const listData = [];
// for (let i = 0; i < 23; i++) {
//   listData.push({
//     href: 'https://www.antdv.com/',
//     title: `ant design vue part ${i}`,
//     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//     description:
//       '蜜汁超酸奶/2020-07-08',
//     content:
//        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
//   });
// }


export default Vue.extend({
  components: {
    Logo
  },
 async  asyncData (context) {
    let[res1] = await Promise.all([ 
        context.$axios.get('articles',{ params: {
                         page: 1,
              size:  10
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
              }  
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
    mounted() {
      // let _this = this;
      // _this.initData();
    },
  methods: {
        initData() {
          let _this = this;
          _this.list({
              page: 1,
              size: _this.pagination.pageSize
          });
      },
    list(pageInfo) {
        let _this = this;
        // _this.loading = true;
        let params = {
          // searchText:  _this.searchFrom.searchText,
          ...pageInfo
        }
        // if (QyTool.isEmpty(params.searchText)) {
        //   delete params.searchText;
        // }

       
        _this.$axios.get('articles',{ params: params
            
          }).then(res => {
            let resp  = res.data				

            if(resp.success) {
                _this.data = resp.content.list;

                _this.data.forEach(e  => {
                    _this.listData.push({
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


            }

           
            _this.pagination.total =   resp.content.total;
            _this.pagination.current =   resp.content.page;
            _this.pagination.pageSize =   resp.content.size;
            // _this.loading = false;
            //  _this.selectedIds = [];
          });
      },
  }
})
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
.content {
  padding: 20px 15px;
    width: 85%;
    margin-right: auto;
    margin-left: auto;
    background: #fff;
}

.img-a{
  display: block;
}
.img-a img {
      max-height: 175px;
}
.category-tag {
    display: inline-block;
    min-width: 50px;
    padding: 0 10px;
    position: relative;
    left: 10px;
    top: 30px;
    z-index: 1;
    color: #fff;
    background-color: rgba(0,0,0,.6);
    border-radius: 2px;
    font-size: 12px;
    line-height: 22px;
}
@media screen and (max-width: 576px) {
    .img-a {
      width: 100%;
    }
  .img-a img {
    width: 100%;
  }
}
</style>
