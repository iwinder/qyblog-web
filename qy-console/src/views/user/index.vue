<template>
用户列表
  <a-button @click="add()">新增</a-button>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter();
function add() {
  router.push("/system/user/add");
}
</script>

<style scoped>

</style>