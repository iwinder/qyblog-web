<template>
    <a-form-model ref="categoryForm" :model="categoryForm" :rules="rules" v-bind="layout">
        <a-form-model-item has-feedback label="名称" prop="name">
            <a-input v-model.number="categoryForm.name" />
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

        <a-form-model-item has-feedback label="选择父级" prop="editParentId">
            <qy-article-category-tree-select   ref="categoryTreeSelect"   :afterSelect="afterSelectTree"></qy-article-category-tree-select>
        </a-form-model-item>

        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" :loading="editLoading" @click="editCategory">
                保存
            </a-button>
            <a-button style="margin-left: 10px" @click="handleCancel">
                取消
            </a-button>
        </a-form-model-item>

    </a-form-model>
</template>

<script>
 import  QyArticleCategoryTreeSelect from '~/components/qy-article-category-tree-select.vue';

export default {
    components: {
        QyArticleCategoryTreeSelect
    },
    props: { 
        categoryObjForm: {},
        parentTreeObj: {},
        afterSubmit: {
            type: Function,
            default: null
        }, 
        loading: false,
        afterCancel: {
            type: Function,
            default: null
        }, 
    },
    data() {
        return {
            categoryForm: {
                name: '',
                parentId: null
            },
            editParentId: null,
            editLoading: false,
             editParentData: {},
                             rules:  {},
                categoryObj: {},
                layout: {
                    labelCol: { span: 4 },
                    wrapperCol: { span: 14 },
                },
        }
    },
     watch: {
         parentTreeObj(val) {
             let _this = this;
             _this.editParentData = val;
             _this.editParentId = val.id;
             console.log("watch parentTreeObj", val,  _this.categoryForm);
         },
         loading(val) {
             let _this = this;
             _this.editLoading = val;
         },
         categoryObjForm(val) {
             let _this = this;
             _this.categoryForm = val;
             console.log(" watch categoryObjFrom", val,  _this.categoryForm);
         }
     },
mounted() {
       let _this = this;
       if(_this.categoryObjForm) {
            _this.categoryForm = _this.categoryObjForm;
               
       }
         if(_this.parentTreeObj) {
         _this.editParentData = _this.parentTreeObj;
           _this.editParentId = _this.parentTreeObj.id;
         }

    //    console.log("mounted parentTreeObj", j)
    //    _this.initTreeData(_this.parentTreeObj);

   },
    methods: {
        editCategory() {
                 let _this = this;
                  _this.editLoading = true;
                _this.$refs.categoryForm.validate(valid => {
                    if (valid) {
                        _this.categoryObj.name = _this.categoryForm.name;
                        if(_this.editParentId) {
                            _this.categoryObj.parentId = _this.editParentId;
                        }
                          _this.afterSubmit(_this.categoryObj);
                        
                    } else {
                          _this.editLoading = false;
                        return false;
                    }
                });
        },
        handleCancel() {
                let _this = this;
                //  _this.categoryForm= {
                //      name: ""
                //  };
                _this.$refs.categoryForm.resetFields();
                _this.afterCancel();
                // _this.visible = false;
                // _this.categoryObj = {}; 
                // _this.$refs.categoryTreeSelect.value = null;
                // _this.selectedParentTreeNode = null;
        },
        afterSelectTree(id, obj) {
            let _this = this;
            console.log("afterSelectTree", obj);
            _this.editParentId = id;
            _this.editParentData = obj.dataRef;
            _this.selectedParentTreeNode = obj;
        },
    }
}
</script>