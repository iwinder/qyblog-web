<template>
  <div style="  margin: 20px 0;">
    <a-form ref="formRef" :model="dataForm"   v-bind="formItemLayout">
      <a-row>
        <a-col :xs="24"   :lg="{ span: 15, offset: 4 }"  >
          <a-form-item
              label="Api路径"
              name="path"
              :rules="[{ required: true, message: 'Please input your path!' }]"
          >
            <a-input v-model:value="dataForm.path" />
          </a-form-item>
          <a-form-item  label="Api请求" name="method">
            <a-select
                v-model:value="dataForm.method"
                style="width: 100%"
                placeholder="请选择Api请求类型"
                :options="ApisMethodOptions"
                :rules="[{ required: true, message: 'Please input your description!' }]"
            ></a-select>
          </a-form-item>
          <a-form-item
              label="Api简介"
              name="description"
              :rules="[{ required: true, message: 'Please input your description!' }]"
          >
            <a-input v-model:value="dataForm.description" />
          </a-form-item>
          <a-form-item
              label="Api分组"
              name="groupId"
              :rules="[{ required: true, message: 'Please input your groupId!' }]"
          >
            <a-select
                v-model:value="dataSelect.selected"
                style="width: 100%"
                placeholder="选择Api分组"
                :field-names="{ label: 'name', value: 'id' }"
                :options="dataSelect.options"
                @change="doGroupChange"
            ></a-select>
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
import {ApisMethodOptions} from "@/config/tableConfigs/qy_apis";
import {computed, onMounted, reactive, ref} from "vue";
import {FormInstance} from "ant-design-vue";
import {GetOne, GroupList, ApisType, ApisGroupType} from "@/api/apis";
// import {List, RoleType} from "@/api/apis";
const emit = defineEmits(['onAfterSubmit','onAfterCancel'])
const formRef = ref<FormInstance>();
const dataForm = reactive<ApisType>({
  id:"",
  path: "",
  apiGroup: "",
  method: "",
  description: "",
  identifier:  "",
  groupId: "",
});
const dataSelect = reactive({ selected: "",
  options:[]

});
const formState = reactive({ saveBtn: false,

});
onMounted(() => {
  initSelectList();
})
const switchObj = {
  checkedValue: 2,
  unCheckedValue: 1,
}
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const doSave = () => {
  formState.saveBtn = true;
  const param = {
    ...dataForm
  };
  emit('onAfterSubmit', param);
}
const initSelectList = async () => {
  GroupList({
    current:0
  }).then(res=>{
    dataSelect.options = res.items;
    // dataSelect.options.unshift({id:"",name:" ",identifier:""})
  }).catch(err=>{})
}
const InitData = async (oid:string) => {
  GetOne(oid).then(res=>{
    const  data = res.data;
    dataForm.id = data.id;
    dataForm.groupId = data.groupId;
    dataForm.path = data.path;
    dataForm.method = data.method;
    dataForm.apiGroup = data.apiGroup;
    dataForm.description = data.description;
    dataForm.identifier = data.identifier;
    dataSelect.selected = dataForm.groupId as string;
  }).catch(err=>{})
}
const doGroupChange = (value:string, option:any) => {
  dataSelect.selected = value;
  if (value.length>0) {
    dataForm.groupId=option.id;
    dataForm.apiGroup=option.name;
    dataForm.identifier=option.identifier;
  } else {
    dataForm.groupId="0";
    dataForm.apiGroup="";
    dataForm.identifier="";
  }
}
const doCancel = () => {
  emit('onAfterCancel');
}
defineExpose({formState,dataForm, InitData});
</script>

<style scoped>

</style>