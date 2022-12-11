<template>
  <a-row class="err-body">
    此区域出现的异常数据： {{error}}}
<!--    <NuxtErrorBoundary @error="logSomeError">-->
<!--    </NuxtErrorBoundary>-->
<!--    <template #error="{ error }">-->
<!--      <div>此区域出现的异常数据：{{errorData}}</div>-->


<!--    </template>-->
    <button @click="handleError">Clear errors</button>
  </a-row>
</template>

<script setup lang="ts">
import {ref} from "vue";

const errorData = ref();
const props = defineProps({
  error: Object
})
const logSomeError = (error:any)=>{
  errorData.value = error.message;
  console.log("logSomeError",errorData.value)
}
const handleError = () => clearError({ redirect: '/' })
</script>

<style scoped>

</style>
