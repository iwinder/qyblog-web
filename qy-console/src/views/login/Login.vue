<template>
  <a-form   id="formLogin" layout="horizontal" :model="loginForm"   @submit="doLogin">
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

import { reactive,   computed} from 'vue'
import { useRouter } from "vue-router";
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import {Login} from "@/api/login";
import {timeFix} from "@/utils/util";
import {notification} from "ant-design-vue";
import {Session} from "@/utils/cache";
import {ACCESS_TOKEN} from "@/utils/constants";
import {Md5} from "ts-md5";
const md5 = new Md5();
const loginForm = reactive({ username: "",
  password:"",
});
const loginState = reactive({ loginBtn: false,
  disabled: computed(() => {
    return !(loginForm.username && loginForm.password);
  }),
});
const router = useRouter();
const doLogin = async () => {
  loginState.loginBtn = true;
  if (loginForm.password) {
    const newPas = md5.appendStr(loginForm.password).end();
    if (newPas) {
      loginForm.password = newPas.toString() ;
    }
  }
  await Login(loginForm).then(res=>{
    const token = "Bearer "+res.token;
    Session.set(ACCESS_TOKEN,token);
    router.push("/")
    // 延迟 1 秒显示欢迎信息
    setTimeout(() => {
      notification.success({
        message: '欢迎',
        description: `${timeFix()}，欢迎回来`
      })
    }, 1000)
  }).catch(err=>{
  }).finally(()=>{
    loginState.loginBtn = false
  });
};


</script>

<style scoped>

</style>