<template>
  <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="编辑文章"
      @back="doBack"
  />
  <QyArticleForm ref="formRef" @onAfterSubmit="doSave" @onAfterCancel="doBack"></QyArticleForm>
</template>

<script setup lang="ts">
import QyArticleForm from "@/components/QyArticleForm.vue";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {Update, ArticleType} from "@/api/article";
import {notification} from "ant-design-vue";

const router = useRouter();


let formRef=ref(null);
onMounted(() => {
  const id = router.currentRoute.value.params.id as string;
  formRef.value.InitData(id);
})
const doSave = (data:ArticleType) => {
  Update(data.id,data).then(res=>{
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