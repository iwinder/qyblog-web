<template>
  <a-form   id="formLogin" layout="horizontal" :model="loginForm"   @submit="handleSubmit">
    <a-form-item>
      <a-input v-model:value="loginForm.username" placeholder="用户名">
<!--        <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />-->
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item>
      <a-input v-model:value="loginForm.password" type="password" placeholder="密码">
<!--        <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />-->'
        <template #prefix>
          <LockOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item>
      <!-- <a-button
        type="primary"
        html-type="submit"
        :disabled="loginForm.user === '' || loginForm.password === ''"
      >
        Log in
      </a-button> -->

      <a-button block
                size="large"
                type="primary"
                htmlType="submit"
                class="login-button"
                :loading="loginState.loginBtn"
                :disabled="loginState.disabled"
      >确定</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
// export default {
//   name: "Login"
// }

import {   ref,computed} from 'vue'
import { useRouter } from "vue-router";
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
const loginForm = ref({ username: "",
  password:"",
});
const loginState = ref({ loginBtn: false,
  disabled: computed(() => {
    return !(loginForm.value.username && loginForm.value.password);
  }),
});
const router = useRouter();
const handleSubmit = () => {
alert("haha")
   router.push("/")
};


</script>

<style scoped>

</style>