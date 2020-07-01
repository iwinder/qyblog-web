<template>
    <div>
          <a-page-header
                
                title="新增分类"
                sub-title=""
                @back="backF()"
            />
            <!-- <h3>新增文章</h3> -->
            <qy-article-category-form    
                :categoryForm="null"  
                ref="articleForm"
                :loading = "editLoading"
                :parentTreeObj = "parentTreeObj"
                 :afterSubmit="afterSubmitForm"
                 :afterCancel= "backF">

               
        </qy-article-category-form>
    </div>
</template>

<script>
     import  QyArticleCategoryForm  from '~/components/qy-article-category-from.vue';

    export default {
 
        components: {
            QyArticleCategoryForm
        },
        data() {
            return {
                parentTreeObj: {},
                editLoading: false
            }
        },
        mounted() {
            let _this = this;
            console.log("   this.$route.query  ",   );
            if(this.$route.query.parent ) {
               _this.parentTreeObj =   JSON.parse(this.$route.query.parent )
             
            }
       
        },
        methods: {
            afterSubmitForm(param) {
                let _this = this;
                _this.$axios.post('blogCategorys/save', param).then(res => {
                                _this.editLoading = false;
                                if(res.data.success) {
                                    this.$message.success('保存成功',5);
                                    //  _this.categoryObj = {}; 
                                    //  _this.$refs.categoryForm.resetFields();
                                     _this.backF() ;
                                    // // _this.visible = false;
                                    // _this.editParentId = null;
                                    // _this.$refs.categoryTreeSelect.value = null;
                                    // console.log("  _this.$refs.categoryTree",   _this.$refs.categoryTree,_this.selectedTreeNode);
                                    // if(_this.selectedParentTreeNode) {
                                    //         _this.$refs.categoryTree.loadData (_this.selectedParentTreeNode);
                                    //         _this.selectedParentTreeNode = null;
                                    //           _this.$refs.categoryTree.loadData (_this.firstTreeNode);
                                    // } else {
                                    //     _this.$refs.categoryTree.loadData (_this.selectedTreeNode);
                                    // }
                                   
                                }
                }).catch((response) => {
                    _this.editLoading = false;
                    console.log("error：", response);
                });
            },
            backF() {
              let _this = this;
                _this.$router.push("/category");
            }
        }
    }
</script>