<template>
  <div style="  margin: 20px 0;">
    <a-form ref="formRef" :model="userForm"   v-bind="formItemLayout">
      <a-row>
        <a-col :xs="24"   :lg="{ span: 15, offset: 4 }"  >
          <a-form-item
              label="用户名"
              name="username"
              :rules="[{ required: true, message: 'Please input your username!' }]"
          >
            <a-input v-model:value="userForm.username" />
          </a-form-item>
          <a-form-item
              label="密码"
              name="password"
              v-if="!userForm || !userForm.id"
              :rules="[{ required: true, message: 'Please input your password!' }]"
          >
            <a-input-password v-model:value="userForm.password" />
          </a-form-item>
          <a-form-item
              label="昵称"
              name="nickname"
              :rules="[{ required: true, message: 'Please input your nickname!' }]"
          >
            <a-input v-model:value="userForm.nickname" />
          </a-form-item>
          <a-form-item
              label="邮箱"
              name="email"
              :rules="[{ required: true, message: 'Please input your email!' }]"
          >
            <a-input v-model:value="userForm.email" />
          </a-form-item>
          <a-form-item
              label="禁用"
              name="statusFlag"
              :rules="[{ required: true, message: 'Please input your email!' }]"
          >
            <a-switch v-model:checked="userForm.statusFlag" checked-children="是" :checked-value="switchObj.checkedValue" un-checked-children="否" :un-checked-value="switchObj.unCheckedValue"/>
          </a-form-item>
          <a-form-item
              label="用户角色"
              name="roleIds"
          >
            <a-select
                v-model:value="roleSelect.selected"
                style="width: 100%"
                placeholder="选择用户角色"
                :field-names="{ label: 'name', value: 'id' }"
                :options="roleSelect.roleOptions"
                @change="doRoleChange"
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

import {computed, onMounted, reactive, ref} from "vue";
import {FormInstance} from "ant-design-vue";
import {GetOne, UserType} from "@/api/user";
import {List, RoleType} from "@/api/role";
const emit = defineEmits(['onAfterSubmit','onAfterCancel'])
const formRef = ref<FormInstance>();
const userForm = reactive<UserType>({
  id:"",
  username: "",
  nickname: "",
  password: "",
  avatar:"",
  email: "",
  statusFlag: 1,
  roles:[]
});
const roleSelect = reactive({ selected: "",
  roleOptions:[]

});
const formState = reactive({ saveBtn: false,

});
onMounted(() => {
  initRoleList();
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
    ...userForm
  };
  emit('onAfterSubmit', param);
}
const initRoleList = async () => {
  List({
    current:0
  }).then(res=>{
    roleSelect.roleOptions = res.items;
    roleSelect.roleOptions.unshift({"id":"","name":" "})
  }).catch(err=>{})
}
const initUser = async (oid:string) => {
    const id = BigInt(oid);
    GetOne(id).then(res=>{
      const  data = res.data;
      userForm.id = data.id;
      userForm.username = data.username;
      userForm.nickname = data.nickname;
      userForm.email = data.email;
      userForm.avatar = data.avatar;
      userForm.statusFlag = data.statusFlag;
      userForm.roles = data.roles;
      if (userForm.roles!=null&&userForm.roles.length>0) {
        const roleId = userForm.roles[0].id;
        if (roleId) {
          roleSelect.selected =roleId
        }
      }
    }).catch(err=>{})
}
const doRoleChange = (value:string, option:any) => {
  if (value.length>0) {
    userForm.roles=[option];
  } else {
    userForm.roles=[];
  }
}
const doCancel = () => {
  emit('onAfterCancel');
}
defineExpose({formState,userForm,initUser});
</script>

<style scoped>

</style>