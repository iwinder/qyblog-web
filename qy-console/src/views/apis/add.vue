<template>
  <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="新增Api"
      @back="doBack"
  />
  <QyApisForm ref="formRef" @onAfterSubmit="doSave" @onAfterCancel="doBack"></QyApisForm>
</template>

<script setup lang="ts">
import QyApisForm from '@/components/QyApisForm.vue'
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {Add, ApisType} from "@/api/apis";
import {notification} from "ant-design-vue";
const router = useRouter();
let formRef=ref(null);

onMounted(() => {

})

const doSave = (obj:ApisType) => {

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
  router.push("/system/apis");
}
</script>

<style scoped>

</style>