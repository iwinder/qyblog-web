<template>
    <a-layout id="components-layout-custom-trigger"  >
      <LayLeftSider :isCollapsed="dataInfo.collapsed"  ref='leftSiderRef' @onCollapsed="doCollapsed"></LayLeftSider>
      <a-layout>
        <LayHeader :isCollapsed="dataInfo.collapsed" @onCollapsed="doCollapsed"></LayHeader>
        <LayContent></LayContent>
        <LayFooter></LayFooter>
      </a-layout>
      <div>
        <a-back-top />
        <strong style="color: rgba(64, 64, 64, 0.6)">   </strong>
      </div>
    </a-layout>
</template>

<script setup lang="ts">
import LayLeftSider from "@/components/LayLeftSider.vue"
import LayHeader  from "@/components/LayHeader.vue"
import LayContent from "@/components/LayContent.vue";
import LayFooter from "@/components/LayFooter.vue";
import {reactive, ref} from "vue";
const dataInfo = reactive({
  collapsed: false
})
function doCollapsed(val:boolean) {
  dataInfo.collapsed = val
}
</script>

<style scoped lang="less">
#components-layout-custom-trigger{
  min-height: 100vh;
}
html {
  font-family:
      'Source Sans Pro',
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      'Helvetica Neue',
      Arial,
      sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
body{
  background:#f5f6f8;
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

.ant-layout-content {
  padding: 80px 0 20px 0;
}
</style>