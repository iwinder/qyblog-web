<template>
    <a-row class="content">
        <a-col  class="single-left" :xs="{span:24}"  :lg="{ span: 16}" > 
                  <a-row class="single-header"  >
                       <a-card    :style="{backgroundImage:'url(' + postData.thumbnail + ')'}">
                           <a-row class="header-wrap">
                                    <a-row class="header-meta">
                                            <template v-if="postData.category!=null">
                                        <span class="meta-category"><a href="https://windcoder.com/category/java" rel="category tag">{{postData.category.name}}</a></span>
                                        <span class="separator" role="separator">·</span></template>
                                        <span class="meta-date"><time class="entry-date"  :datetime="postData.publishedDateTime" :title="postData.publishedDateTime">{{postData.publishedDateMD }}</time></span>
                                         <span class="separator" role="separator">·</span>
                                         <span class="meta-user">By/蜜汁炒酸奶</span>
                                    </a-row>
                                    <h1 class="h2">{{postData.title}}</h1>
                            </a-row>
                        </a-card>
                  </a-row>
                  <a-row class="single-body">
                       <template v-if="postData.tagStrings!=null">
                      <a-row class="article-header">
                            <a-tag color="#f50" v-for=" tag in postData.tagStrings" :key="tag">
                            {{tag}}
                            </a-tag>
                      </a-row> 
                      </template>
                      <a-row class="" v-highlight> 
                            <!-- <mavon-editor   class="markdown-body" ref=md  :value="postData.contentHtml"  :toolbarsFlag= "false"   :subfield= "false"  defaultOpen= "preview"></mavon-editor> -->
                          <div  class="markdown-body"   v-html="postData.contentHtml"></div>
                      </a-row>

                  </a-row>
        </a-col>

        <a-col :xs="{span:24}"  :lg="{  span: 5, offset: 7 }" > 

        </a-col>
    </a-row>
</template>

<script>
import moment from 'moment';
// import hljs from 'highlight.js';
// import 'highlight.js/styles/github.css';
// import 'highlight.js/styles/default.css';

export default {
     async  asyncData (context) { 
         console.log(context)
        //  console.log(hljs)
            // console.log(Hljs)
         let id = context.params.aid;
        let name = context.params.name;
         let url = "articles/";
            if  (id) {
                    url = url  +id;
              } else {
                   url = "articles/name/" + name ;
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
             postData: {}
         }
     },
     mounted() {
         console.log("mounted 1 ");
        this.$nextTick().then(() => {
                    console.log("mounted nextTick 1 ");
            // hljs.initHighlightingOnLoad();
     })  
     },
    methods: {
        moment,
  },
}
</script>

<style scoped>
/* import from 'github-markdown.css' */
</style>
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
</style>