<template>
  <a-menu
      :class="menusClass"
      :mode="listMode"
      v-model:selectedKeys="selectedKeys"
      @select="doSelectKeys"
  >
    <QyMenusItem :items="menusList" ></QyMenusItem>
  </a-menu>
</template>

<script setup lang="ts">
import QyMenusItem from "@/components/QyMenusItem.vue"
import {computed, onMounted, reactive, ref} from "vue";
const emit = defineEmits(['onAfterSelect'])
const props = defineProps(['menusList',"listMode","menusClass"]);
const selectedKeys= ref<string[]>(['dashboard']);
onMounted(() => {
})
// 菜单选中
const doSelect = (data:string) => {
  selectedKeys.value=[data];
}
const doSelectKeys = (data:any) => {
  emit('onAfterSelect',data);
}
defineExpose({doSelect})
</script>

<style scoped>

</style>