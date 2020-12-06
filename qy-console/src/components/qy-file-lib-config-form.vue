<template>
    <a-form-model ref="targetForm" :model="targetForm" :rules="targetRules" layout="vertical">
        <a-form-model-item has-feedback label="AccessKey" prop="accessKey">
            <a-input v-model="targetForm.accessKey" /> 
        </a-form-model-item>
        <a-form-model-item has-feedback label="SecretKey" prop="secretKey">
            <a-input v-model="targetForm.secretKey" /> 
        </a-form-model-item>
        <a-form-model-item has-feedback label="Bucket" prop="bucket">
            <a-input v-model="targetForm.bucket" /> 
        </a-form-model-item>
        <a-form-model-item has-feedback label="Endpoint" prop="endpoint">
            <a-input v-model="targetForm.endpoint" /> 
        </a-form-model-item>
        <a-form-model-item has-feedback label="前缀" prop="prefix">
            <a-input v-model="targetForm.prefix" /> 
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" :loading="editLoading" @click="editTarget">
            保存
        </a-button>
        <a-button style="margin-left: 10px" @click="handleCancel">
            取消
        </a-button>
        </a-form-model-item>
    </a-form-model>
</template>
<script >
import Vue from 'vue'
export default Vue.extend({
    props: { 
        configForm: {},
        configType: {
            type: Number,
            default: 1
        },
        loading: {
            type: Boolean,
            default: false
        },
        afterSubmit: {
            type: Function,
            default: null
        },  
        afterCancel: {
            type: Function,
            default: null
        }, 
    },
    data() {
        return {
            editLoading: false,
            targetForm: {
                accessKey:'',
                secretKey:'',
                bucket:'',
                endpoint:'',
                prefix:'' 

            },
            targetRules:  {
            },
            targetObj: {},
            layout: {
                labelCol: { span: 4 },
                wrapperCol: { span: 14 },
            },
            targetType:1,
        }
    },
    watch: {
        configForm(val) {
            let _this = this;
            _this.targetForm = val;
            if(val) {
                _this.targetObj.id = val.id;
            } 
        },
        loading(val) {
            let _this = this;
            if(val) {
                _this.editLoading = val;
            }
        },
        configType(val) {
            let _this = this;
            _this.targetType = val;
        }
    },
    mounted() {
        let _this = this;
        if(_this.configForm) {
            _this.targetForm = _this.configForm;
            _this.targetObj.id =  _this.configForm.id;
        }
        if(_this.configType) {
            _this.targetType = _this.configType;
        }
    },
    methods: {
        editTarget(){
            let _this = this;
            _this.editLoading = true;
            _this.$refs.targetForm.validate(valid => {
                if (valid) {
                    _this.targetObj.accessKey = _this.targetForm.accessKey;
                    _this.targetObj.secretKey =  _this.targetForm.secretKey;
                    _this.targetObj.bucket =  _this.targetForm.bucket;
                    _this.targetObj.endpoint =  _this.targetForm.endpoint;
                    _this.targetObj.prefix =  _this.targetForm.prefix;
                    _this.targetObj.typeId = _this.targetType;
                    _this.afterSubmit(_this.targetObj);
                } else {
                    _this.editLoading = false;
                    return false;
                }
            });
        },
        handleCancel() {
            let _this = this; 
            _this.editLoading = false;
            _this.$refs.categoryForm.resetFields();
            _this.afterCancel();
        }
    }
})
</script>

<style lang="scss" scoped>

</style>