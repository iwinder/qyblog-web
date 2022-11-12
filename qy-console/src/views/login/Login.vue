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
import {useUserInfo} from "@/store/userInfo";
import {Session} from "@/utils/cache";
import {ACCESS_TOKEN} from "@/utils/constants";
import {Md5} from "ts-md5";
import {GetMyMenus} from "@/api/menus_admin";
import {GeneratorDynamicRouter} from "@/router/generator-routers";

const loginForm = reactive({ username: "",
  password:"",
});
const loginState = reactive({ loginBtn: false,
  disabled: computed(() => {
    return !(loginForm.username && loginForm.password);
  }),
});
const router = useRouter();
const userStore =useUserInfo();
const doLogin = async () => {
  const md5 = new Md5();
  loginState.loginBtn = true;
  if (loginForm.password) {
    const newPas = md5.appendStr(loginForm.password).end();
    if (newPas) {
      loginForm.password = newPas.toString() ;
    }
  }
  await Login(loginForm).then(res=>{
    const token = "Bearer "+res.token;
    // const token = res.token;
    userStore.token = token;
    userStore.myInfo.nickname = res.nickname;
    userStore.myInfo.roleNames = res.roleNames;
    userStore.myInfo.avatar = res.avatar;

    loginForm.password ="";
    GetMyMenus().then(res=> {
      userStore.myMenusList = res.items
      // console.log("GetMyMenus res",res)
      GeneratorDynamicRouter(res.items);
      router.push("/")
    }).catch(err=>{}).finally(()=>{})
    // Session.set(ACCESS_TOKEN,token);
    // router.push("/")
    // // 延迟 1 秒显示欢迎信息
    // setTimeout(() => {
    //   notification.success({
    //     message: '欢迎 '+res.nickname,
    //     description: `${timeFix()}，欢迎回来`
    //   })
    // }, 1000)
  }).catch(err=>{
    console.log("doLogin err",err);
  }).finally(()=>{
    loginState.loginBtn = false
  });
};


</script>

<style scoped>

</style>