<template>
  <a-form   id="formLogin" layout="horizontal" :model="loginForm"   @submit.native.prevent>
    <a-form-item>
      <a-input v-model="loginForm.username" placeholder="用户名">
<!--        <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />-->
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item>
      <a-input v-model="loginForm.password" type="password" placeholder="密码">
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
                :disabled="loginState.loginBtn"
      >确定</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
// export default {
//   name: "Login"
// }

import { reactive } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
const loginForm = reactive({ username: "ddd",
  password:"xxx",
});
const loginState = reactive({ loginBtn: false,
});
const handleSubmit = () => {


};


</script>

<style scoped>

</style>