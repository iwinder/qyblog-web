<template>
  <a-layout-header style="background: #fff; padding: 0">
    <menu-unfold-outlined
        v-if="collapsed"
        class="trigger"
        @click="doCallChange"
    />
    <menu-fold-outlined v-else class="trigger" @click="doCallChange" />
  </a-layout-header>
</template>

<script setup lang="ts">
import {ref} from "vue";
const emit = defineEmits(['onCollapsed'])
const props =  defineProps({
  isCollapsed: {
    default:  false
  },
})
const collapsed = ref(props.isCollapsed);

// trigger 切换事件
const doCallChange = ()=> {
   collapsed.value = !collapsed.value;
   emit('onCollapsed', collapsed.value);
}
</script>

<style scoped>

</style>