<template>
  <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="新增菜单"
      @back="doBack"
  />
  <QyMenusAdminForm ref="formRef" @onAfterSubmit="doSave" @onAfterCancel="doBack"></QyMenusAdminForm>
</template>

<script setup lang="ts">
import QyMenusAdminForm from "@/components/QyMenusAdminForm.vue";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {Add, MenusAdminType} from "@/api/menus_admin";
import {notification} from "ant-design-vue";
const router = useRouter();
let formRef=ref(null);

onMounted(() => {

})

const doSave = (obj:MenusAdminType) => {

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
  router.push("/system/menusAdmin");
}
</script>

<style scoped>

</style>