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
import moment from 'moment';
import { FormModel } from 'ant-design-vue';
import QyPostList from '~/components/qy-post-list.vue'

Vue.use(FormModel); 
export default {
      components: { 
        QyPostList
     },
     async  asyncData (context) { 
         let id = context.params.aid;
        let name = context.params.name;
         let url = "articles/tag";
            if  (id) {
                    url = url  +id;
              } else {
                   url = "articles/tag/name/" + name ;
              }
          let[res1] = await Promise.all([ 
           
        context.$axios.get(url).then(res => {
            let resp  = res.data				
            let result = {};
            if(resp.success) { 
                result  = resp.content;
            }
            console.log("result", result);
             result.publishedDateMD =   moment(result.publishedDate).format('YYYY-MM-DD');
              result.publishedDateTime =   moment(result.publishedDate).format('YYYY-MM-DD HH:mm:ss');
            //  result.contentHtmlT =  hljs.highlightAuto(result.contentHtml).value;
            //   console.log("restempTimeult", tempTime);
            // result.publishedDateMD =  context. moment(result.publishedDate, 'YYYY/MM/DD');
            
            return result;

          })
         ])
          return{
              postData : res1,  
        }

     },
    head () {
        return {
            title: this.postData.title,
            meta: [
                { hid: "keywords", name: "keywords", content: this.postData. tagStrings},
                { hid: "description", name: "description", content: this.postData. summary},

            ],
            link: [
                {rel:"stylesheet" ,type:"text/css", href:"/css/github-markdown.css"}
            ],
            
        }
    },
 
     data() {
         return {
             
         }
           
            
     },
     mounted() { 
     },
    methods: {
        moment,
  },
}
</script>

 
<style lang="scss" scoped>

.content {
  padding: 20px 15px;
    width: 85%;
    margin-right: auto;
    margin-left: auto;
    
}

.single-header {
    background: #fff;
}
.ant-card-bordered {
    background-size: cover;
    background-position: center;
    color: #fff;
    overflow: hidden;
    z-index: 1;
    width: 100%;
    height: 400px;
    .header-wrap {
        position: absolute;
        bottom: 40px;
        left: 0;
        padding-right: 60px;
        padding-left: 25px;
        width: 100%;
        z-index: 2;
    }
    h1 {
    padding: 16px 0 0;
    margin: 24px 0 0;
    border-top: 1px dotted rgba(255,255,255,.3);
    color: #fff;
    font-weight: 600;
    }
    .h2   {
    font-size: 2rem;
}

}
 .ant-card-bordered::before {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        content: '';
        background-color: rgba(0,0,0,.55);
    }
 
.single-body {
    padding: 20px;
    background: #fff;
}
 .markdown-body  /deep/ img {
    margin: 5px 0;
}
.article-header {
        margin-bottom: 30px;
        
}
.single-comments {
        background: #fff;
    margin-top: 30px;
    padding: 20px;
}
</style>