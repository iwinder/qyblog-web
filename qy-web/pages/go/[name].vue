<template>

</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import {useLinksInfo} from "~/stores/links";
const linksStore =  useLinksInfo();
const router = useRouter();
const nowSearchText=  await  ref(router.currentRoute.value.params.name);
const key = nowSearchText.value as string
// let url = linksStore.shortLinks.get(key);
let url = linksStore.shortLinks[key];
if(!url||url.length==0) {
  url = "/"
  navigateTo(url);
}
navigateTo(url,{ external: true });
</script>

<style scoped>

</style>
