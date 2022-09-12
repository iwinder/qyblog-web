<template>
  <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <template  v-for="item in testRouterMap">
         <RouterMenusItem :item="item"></RouterMenusItem>
        </template>
<!--        <template  v-for="item in testRouterMap">-->
<!--          <template  v-if="item.children && item.children.length>0">-->

<!--          </template>-->
<!--          <template v-else>-->

<!--          </template>-->
<!--        </template>-->
<!--        <a-menu-item key="dashboard">-->
<!--          <router-link to="/dashboard">-->
<!--            <user-outlined />-->
<!--            <span>仪表盘</span>-->
<!--          </router-link>-->
<!--        </a-menu-item>-->
<!--        <a-menu-item key="2">-->
<!--          <video-camera-outlined />-->
<!--          <span>nav 2</span>-->
<!--        </a-menu-item>-->
<!--        <a-menu-item key="3">-->
<!--          <upload-outlined />-->
<!--          <span>nav 3</span>-->
<!--        </a-menu-item>-->
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content
          :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script  setup  lang="ts">
// import {
//   UserOutlined,
//   VideoCameraOutlined,
//   UploadOutlined,
//   MenuUnfoldOutlined,
//   MenuFoldOutlined,
// } from '@ant-design/icons-vue';
import {  ref } from 'vue';
import {testRouterMap} from "../config/router.config";
import RouterMenusItem from "@/components/RouterMenusItem.vue"

const selectedKeys= ref<string[]>(['dashboard']);
const   collapsed = ref<boolean>(false);
</script>

<style scoped>

  .trigger{
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
  .trigger:hover {
    color: #1890ff;
  }
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
  }





</style>