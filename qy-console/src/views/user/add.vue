<template>
  <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="新增用户" 
      @back="doBack"
  />
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter();
const doBack = () => {
  router.push("/system/user")
}
</script>

<style scoped>

</style>