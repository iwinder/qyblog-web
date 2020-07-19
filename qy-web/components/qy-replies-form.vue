<template>
    <a-comment>
        <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
        />
    <div slot="content">
            <a-form-model ref="commentForm" :model="commentForm" :rules="rules" v-bind="layout"> 
                <a-row>
                    <a-col   :xs="{span:24}"  :lg="{ span: 8}">
                        <a-form-model-item    prop="authorName">
                            <a-input   v-model="commentForm.authorName"   placeholder="昵称" />
                        </a-form-model-item>
                    </a-col>
                    <a-col   :xs="{span:24}"  :lg="{ span: 8}">
                    <a-form-model-item    prop="authorEmail">
                        <a-input   v-model="commentForm.authorEmail"    placeholder="邮箱"/>
                    </a-form-model-item>
                    </a-col>
                    <a-col   :xs="{span:24}"  :lg="{ span: 8}">
                        <a-form-model-item    prop="authorUrl">
                            <a-input   v-model="commentForm.authorUrl" placeholder="网址"/>
                        </a-form-model-item>
                                </a-col>
                    </a-row>
                
            <a-form-model-item has-feedback  prop="content">
                <a-textarea :rows="4" v-model="commentForm.content"   placeholder="评论内容" />
            </a-form-model-item>
            <a-form-model-item>
                <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
                    Add Comment
                </a-button>
            </a-form-model-item>
        </a-form-model>
    </div>
    </a-comment>
</template>
<script  >
import Vue from 'vue'
import { FormModel } from 'ant-design-vue';
Vue.use(FormModel); 
export default Vue.extend({
        props: { 
            commentAgentId: null,
            parentCommentId: null,
            afterSubmit: {
                type: Function,
                default: null
            }, 
            afterPageChange: {
                type: Function,
                default: null
            }
    },
    mounted() {
            let _this = this;
            _this.agentId = _this.commentAgentId;
            if(_this.parentCommentId) {
                 _this.parentId = _this.parentCommentId;
            }
           
    },
     data() {
         return {
             agentId: null,
             parentId: null,
             submitting: false,
             commentForm: {
                content: '',
                authorName: '',
                authorEmail: '',
                authorUrl: ''
            },
            rules: {
                authorName :[
                    {required: true,whitespace: true, message: "昵称不可为空",  trigger:"change"}
                ],
                authorEmail: [
                    {required: true,whitespace: true, message: "邮箱不可为空",  trigger:"change"},
                    {pattern:new RegExp(/^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,6}$/ig), message: "邮箱格式错误"}
                          
                ],
                content: [
                    {required: true,whitespace: true, message: "内容不可为空",  trigger:"change"}
                ]
            },
             layout: {
                labelCol: { span: 1 },
                wrapperCol: { span: 23 },
            },
         }
     },
     methods: {
         handleSubmit() {
             console.log("handleSubmit");
             let _this = this;
             _this.$refs.commentForm.submitting = true;
            _this.$refs.commentForm.validate(valid => {
                  console.log("handleSubmit valid", valid);
                if (valid) { 
                    let val = _this.commentForm;
                     console.log("handleSubmit val", val);
                    let url = 'comment/'+_this.agentId;
                       console.log("handleSubmit _this.parentId !==null", _this.parentId !==null);
                    url = _this.parentId !==null? url + "/" +_this.parentId+"/replies/add" :  url +"/add";
                      console.log("handleSubmit url2", url);
                    _this.$axios.post(url,val).then(res => {
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
        resetForm() {
                this.$refs.commentForm.resetFields();
        },

    }
})
</script>