<template>
    <div>
         <a-page-header
                title="修改文章"
                sub-title=""
                @back="backF()"
            />
            <qy-article-form    
                :articleObj="articleObj"  
                ref="articleForm"
                 :afterSubmit="submitForm"> </qy-article-form>
    </div>
</template>

<script  >
import Vue from 'vue' 
import   QyArticleForm  from '../../../components/qy-article-form.vue';


export default Vue.extend({
    components: {
        QyArticleForm,
    },
    data() {
        return {
            articleId: null,
            articleObj: null
        }
    },
    created() {
        let _this = this; 
        _this.articleId = _this.$route.params.id;
    },
    mounted() {
         let _this = this;
        _this.loadInfo();
    },
    methods: {
        loadInfo() {
            let  _this = this;
            console.log("_this.articleId", _this.articleId);
            _this.$axios.get("/admin/articles/" + _this.articleId).then(res => {
                    if(res.data.success) {
                            _this.articleObj = res.data.content;
                    }
            });
        },
        submitForm(article) {
            let  _this = this;
            _this.$axios.post('/admin/articles/save',article).then(res => {
                    console.log("保存文章的结果：", res);
                    _this.$refs.articleForm.loading = false;
                    if(res.data.success) {
                          this.$message.success('保存成功',15);
                    }
            }).catch((response) => {
                    _this.$refs.articleForm.loading = false;
                     _this.$message.error('保存失败: ' + response,5);
            });
           
        },
        backF() {
              let _this = this;
                _this.$router.push("/article");
        }
    }
    
})
</script>