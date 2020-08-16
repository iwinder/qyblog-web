<template>
    <a-row class="content">
        <a-col  class="single-left" :xs="{span:24}"  :lg="postData.type==1? { span: 16} :{span:24}" > 
            <qy-post-info :postData="postData"> </qy-post-info> 
        </a-col>

        <a-col :xs="{span:24}"  v-if="postData.type==1" :lg=" {  span: 5, offset: 1 } " > 

        </a-col>
    </a-row>
</template>

<script>
import Vue from 'vue'
import moment from 'moment';
import { FormModel } from 'ant-design-vue';
//  import  QyCommentList from '~/components/qy-comment-list.vue'
 import  QyPostInfo from '~/components/qy-post-info.vue'

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
        QyPostInfo
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
 
</style>