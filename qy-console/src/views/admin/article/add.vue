<template>
    <div>
          <a-page-header
                
                title="新增文章"
                sub-title=""
                @back="backF()"
            />
            <!-- <h3>新增文章</h3> -->
            <qy-article-form    
                :articleObj="null"  
                ref="articleForm"
                 :afterSubmit="submitForm">

               
        </qy-article-form>
    </div>
</template>

<script >
import Vue from 'vue'
import   QyArticleForm  from '../../../components/qy-article-form.vue';


export default Vue.extend({
    components: {
        QyArticleForm,
    },
     data() {
        return {
                articleForm: {
                    title: '',
                    thumbnail: '',
                    content: '',
                    published: true,
                    deleted:  false
                },
                loading: false
        }
    },
    methods: {
        submitForm(article) {
            let  _this = this;
            _this.$axios.post('articles/save',article).then(res => {
                    console.log("保存文章的结果：", res);
                    _this.$refs.articleForm.loading = false;
                    if(res.data.success) {
                          this.$message.success('保存成功',5);
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
    },
})
</script>