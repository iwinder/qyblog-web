<template>
  <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="新增文章"
      @back="doBack"
  />
  <QyArticleForm ref="formRef" @onAfterSubmit="doSave" @onAfterCancel="doBack"></QyArticleForm>
</template>

<script setup lang="ts">
import QyArticleForm from "@/components/QyArticleForm.vue";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {Add, ArticleType} from "@/api/article";
import {notification} from "ant-design-vue";
const router = useRouter();
let formRef=ref(null);

onMounted(() => {

})

const doSave = (obj:ArticleType) => {
  console.log("doSave obj",obj)
  Add(obj).then(res=>{
    notification.success({
      message: '成功',
      description: "保存成功"
    });
    doBack();
  }).catch(err=>{

  }).finally(()=>{
    formRef.value.formState.saveBtn= false;
  })
}
const doBack = () => {
  router.push("/blog/article");
}
</script>

<style scoped>

</style>