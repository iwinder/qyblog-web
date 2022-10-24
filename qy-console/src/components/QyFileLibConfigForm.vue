<template>
  <div style="  margin: 20px 0;">
    <a-form ref="formRef" :model="dataForm"   v-bind="formItemLayout">
      <a-row>
        <a-col :xs="24"   :lg="{ span: 15, offset: 4 }"  >
          <template v-if="dataForm.typeId!='1'">
            <a-form-item
                label="AccessKey"
                name="accessKey"
                :rules="[{ max: 255, message: '长度最大255' }]"
            >
              <a-input v-model:value="dataForm.accessKey" />
            </a-form-item>
            <a-form-item
                label="SecretKey"
                name="secretKey"
                :rules="[{ max: 255, message: '长度最大255' }]"
            >
              <a-input v-model:value="dataForm.secretKey"   placeholder=""/>
            </a-form-item>
            <a-form-item
                label="Bucket"
                name="bucket"
                :rules="[{ max: 255, message: '长度最大255' }]"
            >
              <a-input v-model:value="dataForm.bucket" placeholder=""/>
            </a-form-item>
            <a-form-item
                label="域名"
                name="domain"
                :rules="[{ max: 255, message: '长度最大255' }]"
            >
              <a-input v-model:value="dataForm.domain" placeholder=""/>
            </a-form-item>
            <template v-if="dataForm.typeId!='2'">
              <a-form-item
                  label="Endpoint"
                  name="endpoint"
                  :rules="[{ max: 255, message: '长度最大255' }]"
              >
                <a-input v-model:value="dataForm.endpoint"   placeholder=""/>
              </a-form-item>
            </template>
          </template>
          <a-form-item
              label="路径前缀"
              name="prefix"
              :rules="[{ max: 255, message: '长度最大255' }]"
          >
            <a-input v-model:value="dataForm.prefix" />
          </a-form-item>

          <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" html-type="submit"
                      :loading="formState.saveBtn"
                      @click="doSave">保存</a-button>
            <a-button  :loading="formState.saveBtn"
                       @click="doCancel">取消</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script setup lang="ts">

import {onMounted, reactive, ref} from "vue";
import {FormInstance} from "ant-design-vue";

import {FileLibConfigType, FileLibType} from "@/api/file_lib_config";
const emit = defineEmits(['onAfterSubmit','onAfterCancel'])
const formRef = ref<FormInstance>();

const dataForm = reactive<FileLibConfigType>({
  id:"",
  accessKey: "",
  secretKey: "",
  bucket: "",
  prefix: "",
  domain: "",
  endpoint: "",
  typeId: "",
});


const formState = reactive({ saveBtn: false,

});
onMounted(() => {

})

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};
const doSave = () => {
  formState.saveBtn = true;
  const param = {
    ...dataForm
  };
  emit('onAfterSubmit', param);
}

const InitData =  (param:FileLibConfigType) => {
    dataForm.id = param.id;
    dataForm.accessKey = param.accessKey;
    dataForm.secretKey = param.secretKey;
    dataForm.bucket = param.bucket;
    dataForm.prefix = param.prefix;
    dataForm.endpoint = param.endpoint;
    dataForm.domain = param.domain;
    dataForm.typeId = param.typeId;


}



const doCancel = () => {
  emit('onAfterCancel');
}
defineExpose({formState, dataForm,InitData});
</script>

<style scoped>

</style>