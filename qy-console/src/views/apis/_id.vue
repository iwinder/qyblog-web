<template>
  <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="编辑Api"
      @back="doBack"
  />
  <QyApisForm ref="formRef" @onAfterSubmit="doSave" @onAfterCancel="doBack"></QyApisForm>
</template>

<script setup lang="ts">
import QyApisForm from '@/components/QyApisForm.vue'
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {Update, ApisType} from "@/api/apis";
import {notification} from "ant-design-vue";

const router = useRouter();


let formRef=ref(null);
onMounted(() => {
  const id = router.currentRoute.value.params.id as string;
  formRef.value.InitData(id);
})
const doSave = (data:ApisType) => {
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
  router.push("/system/apis");
}
</script>

<style scoped>

</style>