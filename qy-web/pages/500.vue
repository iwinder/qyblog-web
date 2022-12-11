<template>
  <a-layout style=""  >
    <a-layout-content class="container">
      <a-row     class="img-404"> </a-row>
      <p class="notfound-p">哎呀崩溃了...</p>
      <a-row class="notfound-reason">
        <p>可能的原因：</p>
        <ul>
          <li>{{errorData}}</li>
        </ul>
      </a-row>
      <a-row class="notfound-btn-container"  type="flex" justify="center" align="middle">
        <a-button  type="primary"  @click="doToIndex()">
          返回首页
        </a-button>
      </a-row>
    </a-layout-content>


  </a-layout  >
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
const router = useRouter();
const errorData = ref(router.currentRoute.value.params.errMsg);
useHead({
  title:   "500" ,
  meta: [
  ],
})

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
  background: url(/images/404.png) center center no-repeat;
  background-size: 150px auto;
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
  margin: 40px auto 0;
  text-align: center;
button {
  margin: 0 20px;
}
}
}

</style>
