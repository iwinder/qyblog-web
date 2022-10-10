<template>
  <a-tabs v-model:activeKey="activeKey"  type="editable-card" :hideAdd="true" @edit="doEdit"  @change="doChange" >
    <a-tab-pane v-for="pane in panes" :key="pane.key" :tab="pane.title"  :closable="pane.closable">
      <a-layout>
        <a-page-header
            style=""
            :title="pageInfo.title"
            :sub-title="pageInfo.subTitle"
            :style="{ background: '#fff'  }"
        >
          <template #breadcrumb>
            <a-breadcrumb :routes="pageInfo.routes">
              <template #itemRender="{ route, params, routes, paths }">
                <span v-if="routes.indexOf(route) === routes.length - 1">{{route.breadcrumbName}}</span>
                <span v-else @click="doRouteChange(paths)">{{route.breadcrumbName}}</span>
              </template>
            </a-breadcrumb>
          </template>


        </a-page-header>
      </a-layout>
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts">
import {  ref,reactive } from 'vue';
import {useRouter} from "vue-router";
import {getValue, initTabsMap, tabsKeyMap,  TabsObj} from "../config/tabs.config";
import {BreadcrumbRoute, myRouterMap} from "../config/router.config";
const emit = defineEmits(['onChange'])
const router = useRouter();
const  routerNowList: any[] = [];
const pageInfo = reactive({ title: "",
  subTitle:"",
  routes: routerNowList,
  routeParm:null
});

const panes = ref<{ title: string;   key: string; closable?: boolean }[]>([

]);
const activeKey = ref("");

// 切换 tab 标签页
const doOpenTab = (key:string,param:any) => {
  const tab = getValue(key);
  pageInfo.routeParm = param;
  if (!tab||tab==null) {
    return;
  }
  let flag = false;
  let akey = key;
  if (tab.pkey&&tab.pkey.length>0) {
    akey = tab.pkey
  }

  for (let a in panes.value) {
    if (panes.value[a].key==akey) {
      activeKey.value = akey;
      doChange(key);
      flag = true;
      return;
    }
  }
  if (panes.value.length==0||key=="dashboard") {
    panes.value.push({title:tab.title,key:akey,closable: false})
    if (key=="dashboard"&&panes.value[0].key!="dashboard") {
      panes.value[0].closable = true;
    }
  } else {
    panes.value.push({title:tab.title,key:akey});
  }

  activeKey.value = key;
  doChange(key);
};
// 菜单栏切换事件
const doChange = (activeKey:string) => {
  const tab = getValue(activeKey);
  emit('onChange',activeKey,tab.pkey,tab.parent);
  getRouterList(tab);
  if ( pageInfo.routeParm!=null ) {
    router.push({name:tab.key,params:pageInfo.routeParm});
  } else {
    router.push(tab.path);
  }

}

// 面包屑菜单点击事件
const doRouteChange = (path:string) => {
  if (path=="") {
    path = "dashboard";
  }
  doOpenTab(path);
}
// 标签页编辑事件-如删除事件
const doEdit = (targetKey: string | MouseEvent, action: string) => {
  if (action === 'add') {
  } else {
    remove(targetKey as string);
  }
};

// 获取当前面包屑
const getRouterList = (tab:TabsObj) => {
  let parent = myRouterMap[0];
  routerNowList.length=0;
  routerNowList.push({path:parent.name,breadcrumbName:parent.breadcrumbName});
  getRouterChild(parent,tab);
  console.log("routerNowList",routerNowList)
}
// 获取面包屑子集
const getRouterChild = (obj: any,tab:TabsObj):boolean => {
  if (!obj.children||obj.children.length==0) {
    return false;
  }
  let flag = false;
  for (let i in obj.children) {
    let chid = obj.children[i];
    if (chid.meta.type==1) { // 添加
      if (!flag) {
        for (let j in tab.parent) {
          if (chid.name == tab.parent[j]) {
            routerNowList.push({path:chid.path,breadcrumbName:chid.breadcrumbName});
          }
        }
      }
      if (chid.name==tab.key) {
        routerNowList.push({path:chid.path,breadcrumbName:chid.breadcrumbName});
        flag = true;
        break;
      }
      flag = getRouterChild(chid,tab);
    }
  }
  return flag;
}

// 标签页删除逻辑
const remove = (targetKey: string) => {
  let lastIndex = 0;
  panes.value.forEach((pane, i) => {
    if (pane.key === targetKey) {
      lastIndex = i - 1;
    }
  });
  panes.value = panes.value.filter(pane => pane.key !== targetKey);
  if (panes.value.length && activeKey.value === targetKey) {
    if (lastIndex >= 0) {
      activeKey.value = panes.value[lastIndex].key;
    } else {
      activeKey.value = panes.value[0].key;
    }
    doChange(activeKey.value);
  }
};

defineExpose({doOpenTab});
</script>

<style scoped>

</style>