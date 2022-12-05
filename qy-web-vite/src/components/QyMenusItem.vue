<template>
  <template v-for="item in items">
    <template  v-if="item.hasOwnProperty('children') && item.children.length>0">
      <a-sub-menu :key="item.id" :title="item.name">
        <QyMenusItem :items="item.children"></QyMenusItem>
      </a-sub-menu>
    </template>
    <template v-else>
      <a-menu-item :key="item.id">
        <a v-if="ValidateUrl(item.url)" :title="item.name" :href="item.url" :target="item.blanked==1? '_blank':'_self'">  {{item.name}}</a>
        <router-link  :to="item.url" :title="item.name"  rel="link noopener" :target="item.blanked==1? '_blank':'_self'" v-else > {{item.name}}</router-link >
      </a-menu-item>
    </template>
  </template>
</template>

<script setup lang="ts">
import {computed, onMounted, reactive} from "vue";
import {ValidateUrl} from "@/utils/util"
const props = defineProps(['items']);

onMounted(() => {
})



</script>

<style scoped>

</style>