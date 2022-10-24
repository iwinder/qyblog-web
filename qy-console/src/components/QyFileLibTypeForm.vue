<template>
  <div style="  margin: 20px 0;">
    <a-form ref="formRef"  :model="dataForm" v-bind="formItemLayout"  >
      <a-form-item has-feedback label="名称" name="name"
                   :rules="[{ required: true, message: 'Please input your 媒体库名称!' }]"
      >
        <a-input v-model:value="dataForm.name" placeholder="请输入媒体库名称" :disabled="dataForm.type=='SYSTEM'"></a-input>
      </a-form-item>
      <a-form-item has-feedback label="标识" name="identifier"
                   :rules="[{ required: true, message: 'Please input your 媒体库名称!' }]"
      >
        <a-input v-model:value="dataForm.identifier" placeholder="类型标识" :disabled="dataForm.type=='SYSTEM'"></a-input>
      </a-form-item>
      <a-form-item
          label="启用"
          name="statusFlag"
          :rules="[{ required: true, message: 'Please input your email!' }]"
      >
        <a-switch v-model:checked="dataForm.statusFlag" checked-children="是" :checked-value="switchObj.checkedValue" un-checked-children="否" :un-checked-value="switchObj.unCheckedValue"/>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" :loading="formState.saveBtn" @click="doSave">
          保存
        </a-button>
        <a-button style="margin-left: 10px" @click="doCancel">
          取消
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {FileLibType} from "@/api/file_lib_config";
import {FormInstance} from "ant-design-vue";
const formRef = ref<FormInstance>();
const emit = defineEmits(['onAfterSubmit','onAfterCancel'])
const dataForm = reactive<FileLibType>({
  id:"",
  name:"",
  type: "",
  identifier: 0,
  statusFlag:2
});

const switchObj = {
  checkedValue: 1,
  unCheckedValue: 2,
}
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const formState = reactive({ saveBtn: false,

});
const doSave = () => {
  formState.saveBtn = true;
  formRef.value.validate().then((res:any) => {
    if (dataForm.statusFlag==0) {
      dataForm.statusFlag = 1;
    }
    const param = {
      ...dataForm
    };
    emit('onAfterSubmit', param);
  }).catch((err:any) => {
    formState.saveBtn = false;
  });
}
const doCancel = () => {
  formRef.value.resetFields();
  emit('onAfterCancel');
}
const doResetFields = () => {
  formRef.value.resetFields();
}
const InitData = async (param:FileLibType) => {
  dataForm.id = param.id;
  dataForm.name = param.name;
  dataForm.type = param.type;
  dataForm.identifier = param.identifier;
  dataForm.statusFlag = param.statusFlag;
}
defineExpose({formState,dataForm,doResetFields,InitData});
</script>

<style scoped>

</style>