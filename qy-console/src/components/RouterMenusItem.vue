<template>
  <template  v-if="item.hasOwnProperty('children') && item.children.length>0">

<!--      <component :is="proxy.qantIcons[item.meta.icon]" />-->

    <template v-if="item.children[0].meta.type==1">
      <template v-if="!item.hidden">
        <a-sub-menu :key="item.name">
          <template #icon>
            <component :is="qantIcons[item.meta.icon]" />
          </template>
          <template #title>{{item.meta.title}}</template>
          <template v-for="child in item.children" :key="child.name">
            <RouterMenusItem :item="child"></RouterMenusItem>
          </template>
        </a-sub-menu>
      </template>
      <template v-else>
        <template v-for="child in item.children" :key="child.name">
          <RouterMenusItem :item="child"></RouterMenusItem>
        </template>
      </template>
    </template>
    <template v-else>
      <a-menu-item :key="item.name">
        <router-link :to="item.path">
            <component :is="qantIcons[item.meta.icon]" />
          <span>{{item.meta.title}}</span>
        </router-link>
      </a-menu-item>
    </template>

  </template>
  <template v-else>
    <a-menu-item :key="item.name">
      <router-link :to="item.path">
          <component :is="qantIcons[item.meta.icon]" />
<!--        <template #title>{{item.meta.title}}</template>-->
        <span>{{item.meta.title}}</span>
      </router-link>
    </a-menu-item>
  </template>
</template>

<script setup lang="ts">
const props = defineProps(['item'])



</script>

<style scoped>

</style>