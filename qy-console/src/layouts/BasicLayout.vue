<template>
  <a-layout id="components-layout-custom-trigger"  >
    <LayLeftSider  :isCollapsed="collapsed"  :openKeys="openKeys" @onOpenTab="doOpenTab" ref='leftSiderRef'></LayLeftSider>
    <a-layout>
      <LayHeader  :isCollapsed="collapsed" @onCollapsed="doCollapsed"></LayHeader>
      <LayTabs ref='tabsRef' @onChange="doChange"></LayTabs>
      <LayContent></LayContent>
      <LayFooter></LayFooter>
    </a-layout>
  </a-layout>
</template>

<script  setup  lang="ts">
import {  ref, onMounted} from 'vue';
import LayLeftSider from "@/components/LayLeftSider.vue"
import LayHeader  from "@/components/LayHeader.vue"
import LayTabs from "../components/LayTabs.vue";
import LayContent from "../components/LayContent.vue";
import LayFooter from "../components/LayFooter.vue";
import {useRouter} from "vue-router";
import {initTabsMap, tabsKeyMap} from "../config/tabs.config";

const collapsed = ref<boolean>(false);
const router = useRouter();
const openKeys = ref<string[]>([]);
let leftSiderRef=ref(null);
let tabsRef=ref(null);


onMounted(() => {
   let allkey:string = "";

   if (router.currentRoute.value.name) {
     allkey  = router.currentRoute.value.name.toString();
   }
   const idx = allkey.indexOf("-list");
   let key  = allkey;
   if (idx>0) {
     key = allkey.substring(0,idx);
   }
  initTabsMap(tabsKeyMap);
  tabsRef.value.doOpenTab(key,  router.currentRoute.value.params)

})

// trigger 切换事件
const doCollapsed=(val:boolean)=> {
      collapsed.value = val;
};

// tab页切换
const doOpenTab = (key:string) => {
  tabsRef.value.doOpenTab(key);
}

// 菜单切换
const doChange = (activeKey:string,pkey:string,keys:string[]) => {
  openKeys.value =keys;
  if (pkey!=null&&pkey.trim().length>0) {
    leftSiderRef.value.doSelect(pkey);
  } else {
    leftSiderRef.value.doSelect(activeKey);
  }

}


</script>

<style  lang="less" scoped>

  html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }

  .button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
  }

  .button--green:hover {
    color: #fff;
    background-color: #3b8070;
  }

  .button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
  }

  .button--grey:hover {
    color: #fff;
    background-color: #35495e;
  }

  #components-layout-custom-trigger  {
      min-height: 100vh;
    :deep( .trigger){
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
      }
    :deep(.trigger:hover) {
        color: #1890ff;
      }
    :deep(.logo){
        height: 32px;
        background: rgba(255, 255, 255, 0.8);
        margin: 16px;
        text-align: center;
      }
    :deep(.ant-tabs){
      margin: 0px;
      padding-top: 6px;
      width: 100%;
      background: #fff;
      .ant-tabs-nav{
        padding-left: 16px;
      }
    }

    :deep(.ant-btn) {
      margin-right: 8px;
    }
  }

</style>