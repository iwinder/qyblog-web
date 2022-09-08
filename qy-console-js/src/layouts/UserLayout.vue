
<template>
  <div id="userLayout" :class="['user-layout-wrapper', isMobile && 'mobile']">
    <div class="container">
      <div class="user-layout-lang">
        <select-lang class="select-lang-trigger" />
      </div>
      <div class="user-layout-content">
        <div class="top">
          <div class="header">
            <a href="/public">
              <img :src="loginims" class="logo" alt="logo">
              <span class="title">青雨博客</span>
            </a>
          </div>
          <div class="desc">
            青雨博客的描述
          </div>
        </div>

        <router-view />

        <div class="footer">
          <div class="links">
            <a href="_self">帮助</a>
            <a href="_self">隐私</a>
            <a href="_self">条款</a>
          </div>
          <div class="copyright">
            Copyright &copy; 2018 vueComponent
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserLayout"
}
</script>

<script setup>
import loginims from '@/assets/logo.svg'

const Pub = usePub()
const getAssetsFile = Pub.getAssetsFile

</script>