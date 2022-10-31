<template>
<div>
  <a-form  ref="formRef"    layout="vertical"   v-bind="tabsInfo.layout" >
    <a-tabs v-model:activeKey="tabsInfo.activeKey"  >
      <a-tab-pane key="1" tab="基本信息" >
        <a-form-item v-for="option in tabsInfo.options1" :label="option.configName" :extra="option.configTip">
          <a-select v-if="option.configKey == 'site_default_file_lib'"
              ref="select"
              v-model:value="option.configValue"
              :options="tabsInfo.typeList"
              :extra="option.configTip"
              :field-names="{ label: 'name', value: 'id',  }"
             >
          </a-select>
          <a-input v-else v-model:value="option.configValue" placeholder="" />
        </a-form-item>
      </a-tab-pane>
      <a-tab-pane key="2" tab="内容" force-render>
        <a-form-item  v-for="option in tabsInfo.options2" :label="option.configName"  :extra="option.configTip">
          <a-switch v-if="option.configKey == 'site_comment_flag'" v-model:checked="option.configValue"  :checked-value="switchObj.checkedValue" :un-checked-value="switchObj.unCheckedValue">
            <template #checkedChildren><check-outlined /></template>
            <template #unCheckedChildren><close-outlined /></template>
          </a-switch>
          <a-textarea  v-else-if="option.configKey.indexOf('site_head_')>=0  || option.configKey == 'site_foot_code'  || option.configKey == 'site_sider_code'"
                       v-model:value="option.configValue" placeholder="" :rows="4" />
          <a-input v-else v-model:value="option.configValue" placeholder="" />
        </a-form-item>
      </a-tab-pane>
      <a-tab-pane key="3" tab="社会化" force-render>
        <a-form-item v-for="option in tabsInfo.options3" :label="option.configName"  :extra="option.configTip">
          <a-input v-model:value="option.configValue" placeholder="" />
        </a-form-item>
      </a-tab-pane>
      <a-tab-pane key="4" tab="其它" force-render>
        <a-form-item  v-for="option in tabsInfo.options4" :label="option.configName"  :extra="option.configTip">
          <a-switch v-if="option.configKey == 'site_pay_flag'" v-model:checked="option.configValue" :checked-value="switchObj.checkedValue"  :un-checked-value="switchObj.unCheckedValue">
            <template #checkedChildren><check-outlined /></template>
            <template #unCheckedChildren><close-outlined /></template>
          </a-switch>
          <a-input v-else v-model:value="option.configValue" placeholder="" />
        </a-form-item>
      </a-tab-pane>
    </a-tabs>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" :loading ="tabsInfo.loading"  @click="doSubmitForm()">保存</a-button>
    </a-form-item>
  </a-form>
</div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {SiteConfigType, List, Update} from "@/api/site_config";
import {  FileLibType, TypeList} from "@/api/file_lib_config";
import {FormInstance, notification} from "ant-design-vue";
const formRef = ref<FormInstance>();
const tabsInfo = reactive({
  formItemLayout: {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  },
  loading: false,
  activeKey:"1",
  layout: {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  },
  options1:[] as SiteConfigType[],
  options2:[] as SiteConfigType[],
  options3:[] as SiteConfigType[],
  options4:[] as SiteConfigType[],
  dataForm:[] as SiteConfigType[],
  typeList:[] as FileLibType[],
});

onMounted(() => {
  doGetFileTypes();
})
const switchObj = {
  checkedValue: "1",
  unCheckedValue: "2",
}
function initOptions() {
  tabsInfo.options1 = [];
  tabsInfo.options2 = [];
  tabsInfo.options3 = [];
  tabsInfo.options4 = [];
}

async function doList() {
  initOptions();
  tabsInfo.loading = true;
  await List().then(res => {
     res.items.forEach((e:SiteConfigType)=>{
       if(e.ftype == 1) {
         tabsInfo.options1.push(e);
       } else if(e.ftype == 2) {
         tabsInfo.options2.push(e);
       } else if(e.ftype == 3) {
         tabsInfo.options3.push(e);
       } else {
         tabsInfo.options4.push(e);
       }
     })

  }).catch(err => { console.error("List error",err);
  }).finally(() => {
    tabsInfo.loading = false;
  });
}

async function doGetFileTypes() {
  var param = {
    current: 0,
    statusFlag: 1,
  }
  await TypeList(param).then(res => {
    tabsInfo.typeList = res.items;
  }).catch(err => {
    console.error("List error", err);
  }).finally(() => {
    // tabsInfo.loading = false;
    doList();
  });
}

async function doSubmitForm() {
  tabsInfo.loading = true;
  const opts = [
    ...tabsInfo.options1,
    ...tabsInfo.options2,
    ...tabsInfo.options3,
    ...tabsInfo.options4,
  ]
  const param = {
    paramms: opts
  }
  await Update(param).then(res => {
    notification.success({
      message: '成功',
      description: "保存成功"
    });
  }).catch(err => {
    console.error("List error", err);
  }).finally(() => {
    tabsInfo.loading = false;
  });
}
</script>

<style scoped>

</style>