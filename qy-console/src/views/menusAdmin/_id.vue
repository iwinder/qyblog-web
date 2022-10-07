<template>
  <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="编辑菜单"
      @back="doBack"
  />
  <QyMenusAdminForm ref="formRef" @onAfterSubmit="doSave" @onAfterCancel="doBack"></QyMenusAdminForm>
</template>

<script setup lang="ts">
import QyMenusAdminForm from "@/components/QyMenusAdminForm.vue";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {Update, MenusAdminType} from "@/api/menus_admin";
import {notification} from "ant-design-vue";

const router = useRouter();


let formRef=ref(null);
onMounted(() => {
  const id = router.currentRoute.value.params.id as string;
  formRef.value.InitData(id);
})
const doSave = (data:MenusAdminType) => {
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
  router.push("/system/menusAdmin");
}
</script>

<style scoped>

</style>