<template>
{{dataInfo.dataContent}}
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, reactive, watch} from "vue";

const router = useRouter();
const dataInfo = reactive({
  dataContent:"home"
})


watch(() => router.currentRoute.value,(to, form) => {
    dataInfo.dataContent = "home"
    if (to.path=="/"&&to.query.searchText&&to.query.searchText.length>0) {
      dataInfo.dataContent = to.query.searchText;
    }
  console.log("watch newPath",to,form);
},{ immediate: true });
// onMounted(() => {
//   const searchText =  router.currentRoute.value.query.searchText;
//   console.log("home  router.currentRoute.value", router.currentRoute.value)
//   console.log("home searchText",searchText)
//   if (searchText&&searchText.length>0) {
//     dataInfo.dataContent = searchText;
//   }
// })
</script>

<style scoped>

</style>