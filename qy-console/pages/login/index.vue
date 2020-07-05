<template>
    <a-form-model layout="horizontal" :model="loginForm" @submit="handleSubmit" @submit.native.prevent>
    <a-form-model-item>
      <a-input v-model="loginForm.user" placeholder="Username">
        <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-model-item>
    <a-form-model-item>
      <a-input v-model="loginForm.password" type="password" placeholder="Password">
        <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-model-item>
    <a-form-model-item>
      <a-button
        type="primary"
        html-type="submit"
        :disabled="loginForm.user === '' || loginForm.password === ''"
      >
        Log in
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script >
import Vue from 'vue'
export default Vue.extend({
    layout:'page',
    data() {
        return {
            loginForm: {
                username: "",
                password: ""
            }
        }
    },
    methods: {
        handleSubmit(e) {
            console.log("handleSubmit", e);
        }
    }
})
</script>