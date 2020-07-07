<template>
     <a-form-model ref="userForm" :model="userForm" :rules="rules" v-bind="layout">

           <a-row>
                    <a-col :xs="24"   :lg="{ span: 15, offset: 3 }"  >
            <a-form-model-item has-feedback  label="用户名"  prop="username"> 
                <a-input v-model="userForm.username" type="text" autocomplete="off" placeholder="用户名" />
            </a-form-model-item>

            <a-form-model-item has-feedback  label="昵称"  prop="nickname"> 
                <a-input v-model="userForm.nickname" type="text" autocomplete="off" placeholder="用户名" />
            </a-form-model-item>

            <a-form-model-item has-feedback  label="邮箱"  prop="email"> 
                <a-input v-model="userForm.email" type="text" autocomplete="off" placeholder="用户名" />
            </a-form-model-item>

            <a-form-model-item has-feedback  label="头像"  prop="avatar"> 
                <a-upload
                    name="avatar"
                    list-type="picture-card"
                    class="avatar-uploader"
                    :show-upload-list="false"
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    :before-upload="beforeUpload"
                    @change="handleChange"
                >
                <img v-if="userForm.avatar" :src="userForm.avatar" alt="avatar" />
                <div v-else>
                <a-icon :type="loading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">
                    Upload
                </div>
                </div>
            </a-upload>
            </a-form-model-item>

            <a-form-model-item has-feedback label="禁用" prop="disable">
            <a-switch v-model="userForm.disable" >
                <a-icon slot="checkedChildren" type="check" />
                    <a-icon slot="unCheckedChildren" type="close" />
            </a-switch>
        </a-form-model-item>

                <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button  ref="saveButton"  type="primary"  :loading ="subLoading"  @click="submitForm('userForm')">
                保存
            </a-button>
            <a-button v-show="!userForm.id" style="margin-left: 10px" @click="resetForm">
                重置
            </a-button>
        </a-form-model-item>

        </a-col>
        
        </a-row>
     </a-form-model>
</template>

<script >
import Vue from 'vue'
export default Vue.extend({
    props: { 
        userObj: {},
        afterSubmit: {
            type: Function,
            default: null
        }, 
    },
    data() {
        return {
            userForm: {
                nickname: null,
                nickname: null,
                avatar: '',
                disable: false
            },
             rules: {

            },
             loading: false,
             subLoading: false,
            layout:   {
                labelCol: { span: 5 },
                wrapperCol: { span: 8 }
            },
        }
    },
    methods: {
        resetForm() {
             this.$refs.articleForm.resetFields();
               _this.categoryId = null;
        },
        beforeUpload() {

        },
        handleChange() {

        }
    }
    
})
</script>