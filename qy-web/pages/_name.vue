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
                          <div  class="markdown-body"   v-html="postData.contentHtml"></div>
                      </a-row>
                  </a-row>
                    <a-row class="single-comments"> 

                        
                        <qy-comment-list :commentAgentId= "postData.commentAgentId"></qy-comment-list>

                    </a-row>
        </a-col>

        <a-col :xs="{span:24}"  :lg="{  span: 5, offset: 7 }" > 

        </a-col>
    </a-row>
</template>

<script>
import Vue from 'vue'
import moment from 'moment';
import { FormModel } from 'ant-design-vue';
 import  QyCommentList from '~/components/qy-comment-list.vue'
Vue.use(FormModel); 
 import { mapState } from 'vuex'
export default {
    async fetch({ store, params }) {
  await store. dispatch('siteInfo/getSiteInfo');
},
     async  asyncData (context) { 
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
             result.publishedDateMD =   moment(result.publishedDate).format('YYYY-MM-DD');
              result.publishedDateTime =   moment(result.publishedDate).format('YYYY-MM-DD HH:mm:ss');
            //  result.contentHtmlT =  hljs.highlightAuto(result.contentHtml).value;
            //   console.log("restempTimeult", tempTime);
            // result.publishedDateMD =  context. moment(result.publishedDate, 'YYYY/MM/DD');
            
            return result;

          })
         ]);
        //   await  context.store. dispatch('siteInfo/getSiteInfo');
          return{
              postData : res1,  
        }

     },
    head () {
        return {
            title: this.postData.title + "-" + this.siteInfo.site_name,
            meta: [
                { hid: "keywords", name: "keywords", content: this.postData. tagStrings},
                { hid: "description", name: "description", content: this.postData. summary},

            ],
            link: [
                {rel:"stylesheet" ,type:"text/css", href:"/css/github-markdown.css"}
            ],
            
        }
    },
    components: {
        QyCommentList
    },
      computed: {
    ...mapState({
      siteInfo: state => state.siteInfo.siteInfo
    })
  },
     data() {
         return {
             postData: {},
             submitting: false,
             value: '',
             commentForm: {
                content: '',
                authorName: '',
                authorEmail: '',
                authorUrl: ''
            },
            rules: {
                authorName :[
                    {required: true,whitespace: true, message: "昵称不可为空"}
                ],
                authorEmail: [
                    {required: true,whitespace: true, message: "邮箱不可为空"},
                    {pattern:new RegExp(/^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,6}$/ig), message: "邮箱格式错误"}
                          
                ],
                content: [
                    {required: true,whitespace: true, message: "内容不可为空"}
                ]
            },
             layout: {
                labelCol: { span: 1 },
                wrapperCol: { span: 23 },
            },
         }
     },
     mounted() { 
     },
    methods: {
        moment,
         handleSubmit() {
             let _this = this;
             _this.$refs.commentForm.submitting = true;
            _this.$refs.commentForm.validate(valid => {
                if (valid) { 
                    let val = _this.commentForm;
                    _this.$axios.post('comment/'+_this.postData.commentAgentId +"/add",val).then(res => {
                            _this.$refs.commentForm.submitting = false;
                            console.log("res", res);
                            if(res.data.success) {
                                 _this.$refs.commentForm.content = null;
                                this.$message.success('保存成功',15);
                                // _this.backF() ;
                            } else {
                                  _this.$message.error('保存失败: ' + res.data.message,5);
                            }
                    }).catch((response) => {
                            _this.$refs.commentForm.submitting = false;
                            _this.$message.error('保存失败: ' + response,5);
                    });
                       
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
         },
         handleChange(e) {
            this.value = e.target.value;
        },
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