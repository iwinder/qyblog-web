<template>
    <div>
          <a-page-header
                
                title="修改分类"
                sub-title=""
                @back="backF()"
            />
            <!-- <h3>新增文章</h3> -->
            <qy-article-category-form    
                ref="articleForm"
                :loading = "editLoading"
                :categoryObjForm= "categoryObj"
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
        validate ({ params }) {
            // 必须是number类型
            return /^\d+$/.test(params.id)
        },
        asyncData ({ params }) {
            console.log("edit params", params);
            return  {categoryId:params.id,categoryObj: params.obj,parentTreeObj: params.parent };
        },
        data() {
            return {
                categoryId: null,
                categoryObj:{},
                parentTreeObj: {},
                editLoading: false
            }
        },
        mounted() {
            let _this = this;
            console.log("   this.$edit .mounted  ",   );

       
        },
        methods: {
            init(a) {
                let _this = this;
                _this.categoryObj = _this.$route.params.obj;
                _this.parentTreeObj = _this.$route.params.parent;
                console.log("edit categoryObj", _this.categoryObj,  _this.parentTreeObj);
            },
            afterSubmitForm(param) {
                let _this = this;
                _this.$axios.post('blogCategorys/save', param).then(res => {
                                _this.editLoading = false;
                                if(res.data.success) {
                                    this.$message.success('保存成功',5);

                                     _this.backF() ;

                                   
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