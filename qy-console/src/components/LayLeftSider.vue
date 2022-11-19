<template>
  <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible
    breakpoint="lg"
    @breakpoint="doBreakpoint"
  >
    <div class="logo" >
      <template v-if="siteInfo&&siteInfo.site_url!=''&&siteInfo.site_url.length>0">
        <a  :href="siteInfo.site_url" class="viewlinka" target="_blank" >
          <a-image  :src="siteInfo.site_small_logo" :preview="false" fallback="loginims" alt="logo"/>
        </a>
      </template>
      <template v-else></template>

    </div>
    <a-menu v-model:selectedKeys="selectedKeys"  :openKeys="openKeys" theme="dark" mode="inline" @click="doRouterClick" >
      <template  v-for="item in myRouterMap">
        <LayRouterMenusItem :item="item" ></LayRouterMenusItem>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import {computed, onMounted, reactive, ref} from 'vue';
import {myRouterMap} from "../config/router.config";
import LayRouterMenusItem from "@/components/LayRouterMenusItem.vue"
import {useSiteInfo} from "@/store/siteInfo";
import loginims from "@/assets/vue.svg";
const emit = defineEmits(['onOpenTab'])
const siteStore =  useSiteInfo();
const siteInfo = reactive({ site_small_logo: loginims,
  site_url:"",
})
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
onMounted(() => {
  console.log("siteInfo",siteInfo)
  siteInfo.site_small_logo = siteStore.GetSiteInfoByKey("site_small_logo");
  siteInfo.site_url = siteStore.GetSiteInfoByKey("site_url");
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