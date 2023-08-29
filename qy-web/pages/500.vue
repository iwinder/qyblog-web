<template>
  <a-layout style=""  >
    <a-layout-content class="container">
      <a-row     class="img-404"> </a-row>
      <a-row  class="notfound-p"  type="flex" justify="center" align="middle">哎呀，服务崩溃了...</a-row >
      <a-row class="notfound-btn-container"  type="flex" justify="center" align="middle">
        <a-button  type="primary"  @click="doToIndex()">
          返回首页
        </a-button>
      </a-row>
    </a-layout-content>


  </a-layout  >
</template>

<script setup lang="ts">
  import {useRouter} from "vue-router";
  const router = useRouter();

  function doToIndex() {
    router.push("/");
  }
</script>

<style scoped lang="less">
  .container {
    height: 100%;
    background: #f0f2f5;
    .img-404 {
      height: 155px;
      background: url(/images/icon/ico-500.png) center center no-repeat;
      background-size: 210px auto;
      margin-top: 40px;
      margin-bottom: 20px;
    }
    .notfound-p{
      line-height: 22px;
      font-size: 17px;
      padding-bottom: 15px;
      border-bottom: 1px solid #f6f6f6;
      text-align: center;
      color: #262b31;
    }
    .notfound-reason {
      color: #9ca4ac;
      font-size: 13px;
      line-height: 13px;
      text-align: left;
      width: 210px;
      margin: 0 auto;
    }
    .notfound-btn-container {
      //margin: 40px auto 0;
      text-align: center;
      button {
        margin: 0 20px;
      }
    }
  }
</style>
