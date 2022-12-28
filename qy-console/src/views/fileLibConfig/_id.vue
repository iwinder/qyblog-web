<template>
  <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      :title="tabsInfo.title"
      @back="doCancel"
  />
  <a-tabs v-model:activeKey="tabsInfo.activeKey">
    <a-tab-pane key="1" tab="基本信息">
      <QyFileLibTypeForm  ref="typeFormRef" @onAfterSubmit="doSaveData" @onAfterCancel="doCancel"></QyFileLibTypeForm>
    </a-tab-pane>
    <a-tab-pane key="2" tab="详细配置" force-render>
      <QyFileLibConfigForm ref="configFormRef" @onAfterSubmit="doSaveConfigData" @onAfterCancel="doCancel"></QyFileLibConfigForm>
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts">
import QyFileLibTypeForm from '@/components/QyFileLibTypeForm.vue'
import QyFileLibConfigForm from '@/components/QyFileLibConfigForm.vue'
import {ConfigGetOne, ConfigSave, FileLibConfigType, FileLibType, TypeUpdate} from "@/api/file_lib_config";
import {FormInstance, notification} from "ant-design-vue";
import {onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {useParamsStore} from "@/store/params";
const router = useRouter();
const typeFormRef = ref();
const configFormRef = ref();
const state = useParamsStore()
const tabsInfo = reactive({
  title:"配置媒体库信息",
  activeKey:"1"
})
onMounted(() => {
  tabsInfo.title = "配置" + state.fileLibType.name;
  typeFormRef.value.InitData(state.fileLibType);
  doGetConfigData ();
})

function doSaveData(param:FileLibType) {
  TypeUpdate(param).then(res=>{
    notification.success({
      message: '成功',
      description: "保存成功"
    });
    doCancel(); 
  }).catch(err=>{
  }).finally(()=>{
    typeFormRef.value.formState.saveBtn= false;
  });
}
function doSaveConfigData(param:FileLibConfigType) {
  ConfigSave(param).then(res=>{
    notification.success({
      message: '成功',
      description: "保存成功"
    });
    doCancel();
  }).catch(err=>{

  }).finally(()=>{
    typeFormRef.value.formState.saveBtn= false;
  });
}
async function doGetConfigData () {
  ConfigGetOne(state.fileLibType.id).then(res=>{
    configFormRef.value.InitData(res);
  }).catch(err=>{
    if (err.code&&err.code==404) {
      configFormRef.value.InitData({typeId:state.fileLibType.id});
    }
  }).finally(()=>{

  });
}
function doCancel() {
  state.fileLibType = {}
  router.push("/fileLib/config");
}



</script>

<style scoped>

</style>
