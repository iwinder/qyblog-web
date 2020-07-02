<template>
    <div>
            <a-form-model ref="articleForm" :model="articleForm" :rules="rules" v-bind="layout">

                <a-form-model-item has-feedback label="标题" prop="title">
                    <a-input v-model="articleForm.title" type="text" autocomplete="off" />
                </a-form-model-item>

                <a-form-model-item has-feedback label="封面" prop="thumbnail">
                    <a-input v-model="articleForm.thumbnail" type="text" autocomplete="off" />
                </a-form-model-item>
                <a-form-model-item has-feedback label="发布" prop="published">
                   <a-switch v-model="articleForm.published" >
                       <a-icon slot="checkedChildren" type="check" />
                        <a-icon slot="unCheckedChildren" type="close" />
                   </a-switch>
                </a-form-model-item>


            <a-form-model-item has-feedback label="当前父级" prop="parent">
                <a> 
                    <template v-if="editParentData.id==0" >  无</template>
                <template v-else > 
                        <a-tooltip placement="topLeft" :title="editParentData.namePath" arrow-point-at-center>
                    {{editParentData.name}}
                        </a-tooltip>
                    </template>
                </a>
        </a-form-model-item>

        <a-form-model-item has-feedback label="选择父级" 
                    extra="若无修改分类父级到需求，请勿选择"
                    prop="editParentId">
            <qy-article-category-tree-select   ref="categoryTreeSelect"   :afterSelect="afterSelectTree"></qy-article-category-tree-select>
        </a-form-model-item>

                <a-form-model-item has-feedback label="内容" prop="content">
                     <a-input v-model="articleForm.content" type="textarea" />
                </a-form-model-item>

                <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                    <a-button type="primary"  :loading ="loading"  @click="submitForm('articleForm')">
                        保存
                    </a-button>
                    <a-button v-show="!articleForm.id" style="margin-left: 10px" @click="resetForm">
                        重置
                    </a-button>
                </a-form-model-item>
        </a-form-model>
    </div>
</template>

<script>

import Vue from 'vue'
import { FormModel } from 'ant-design-vue';
 import  QyArticleCategoryTreeSelect from '~/components/qy-article-category-tree-select.vue';


Vue.use(FormModel);
export default {
    components: {
        QyArticleCategoryTreeSelect
    },
    props: { 
       articleObj:null,
        afterSubmit: {
            type: Function,
            default: null
        }, 
        
    },
    data() {
        return {
            articleForm:  {
                    title: '',
                    thumbnail: '',
                    content: '',
                    published: true,
                    deleted:  false
                },
                editParentData:{},
                rules: {

                },
                layout:   {
                    labelCol: { span: 4 },
                    wrapperCol: { span: 14 }
                },
                loading: false,
                categoryId:null
        }
    },
    watch: {
        articleObj(val) {
             let _this = this;
             _this.articleForm = val;
        }
    },
    mounted() {
        let _this = this;
        if(_this.articleObj) {
            _this.articleForm = _this.articleObj;
        }
    },
    methods: {
         submitForm(formName) {
            let  _this = this;
            _this.loading = true;
            _this.$refs[formName].validate(valid => {
                if (valid) {
                    if(_this.categoryId ) {
                        _this.articleForm.categoryId = _this.categoryId ;
                    }
                    _this.afterSubmit(_this.articleForm); 
                } else {
                     _this.loading = false;
                    return false;
                }
            });
        },
        resetForm() {
             this.$refs.articleForm.resetFields();
               _this.categoryId = null;
        },
        afterSelectTree(id, obj) {
            let _this = this;
            _this.categoryId = id;
            _this.editParentData = obj.dataRef;
            // _this.selectedParentTreeNode = obj;
        },
    }
}
</script>