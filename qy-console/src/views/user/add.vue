<template>
  <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="新增用户" 
      @back="doBack"
  />

  <QyUserForm ref="formRef" @onAfterSubmit="doSave" @onAfterCancel="doBack"></QyUserForm>



</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import QyUserForm from "@/components/QyUserForm.vue";
import {Add,UserType} from "@/api/user";

import {Md5} from 'ts-md5'
import {notification} from "ant-design-vue";
import {ref} from "vue";
const router = useRouter();
const md5 = new Md5();
let formRef=ref();
const doSave = (user:UserType) => {
  if (user.password) {
    const newPas = md5.appendStr(user.password).end();
    if (newPas) {
      user.password = newPas.toString();
    }
  }
  Add(user).then(res=>{
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
  router.push("/system/user");
}
</script>

<style scoped>

</style>