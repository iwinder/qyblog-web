<template>
  <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible
    breakpoint="lg"
    @breakpoint="doBreakpoint"
  >
    <div class="logo" />
    <a-menu v-model:selectedKeys="selectedKeys"  :openKeys="openKeys" theme="dark" mode="inline" @click="doRouterClick" >
      <template  v-for="item in myRouterMap">
        <LayRouterMenusItem :item="item" ></LayRouterMenusItem>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import {myRouterMap} from "../config/router.config";
import LayRouterMenusItem from "@/components/LayRouterMenusItem.vue"
const emit = defineEmits(['onOpenTab'])
const props =  defineProps({
  isCollapsed: {
    default:  false
  },
  openKeys:{
    default:[]
  },
  selectedKey: {
    default:  ""
  },
})

const collapsed =  computed(() => props.isCollapsed)
const selectedKeys= ref<string[]>(['dashboard']);


// 菜单选中
const doSelect = (data:string) => {
  selectedKeys.value=[data]
}

// 标签页切换-菜单点击切换时使用
const doRouterClick = (item:any) => {
  emit('onOpenTab', item.key);
};

// 触发响应式布局断点时的回调
const doBreakpoint = (broken:boolean) => {

};


defineExpose({doSelect})

</script>

<style scoped>

</style>