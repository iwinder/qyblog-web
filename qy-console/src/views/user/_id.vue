<template>
  <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="编辑用户"
      @back="doBack"
  />
  <div>
    <QyUserForm ref="formRef"   @onAfterSubmit="doSave" @onAfterCancel="doBack"></QyUserForm>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {Update, UserType} from "@/api/user";
import {useRouter} from "vue-router";
import QyUserForm from "@/components/QyUserForm.vue";
import {notification} from "ant-design-vue";
const router = useRouter();

let formRef=ref(null);
onMounted(() => {
  const id = router.currentRoute.value.params.id as string;
  formRef.value.InitData(id);
})
const doSave = (user:UserType) => {
  const nid =  BigInt(user.id as string);
  Update(nid,user).then(res=>{
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