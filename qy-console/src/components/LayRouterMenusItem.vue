<template>
  <template  v-if="item.hasOwnProperty('children') && item.children.length>0">
    <template v-if="item.children[0].meta.type==1">
      <template v-if="item.statusFlag==1">
        <a-sub-menu :key="item.name">
          <template #icon>
            <component :is="qantIcons[item.meta.icon]" />
          </template>
          <template #title>{{item.meta.title}}</template>
          <template v-for="child in item.children" :key="child.name">
            <LayRouterMenusItem :item="child"></LayRouterMenusItem>
          </template>
        </a-sub-menu>
      </template>
      <template v-else>
          <template v-for="child in item.children" :key="child.name">
            <LayRouterMenusItem :item="child"></LayRouterMenusItem>
          </template>
      </template>
    </template>
    <template v-else>
      <template v-if="item.statusFlag==1">
        <a-menu-item :key="item.name"  >
              <component :is="qantIcons[item.meta.icon]" />
            <span>{{item.meta.title}}</span>
        </a-menu-item>
      </template>
    </template>

  </template>
  <template v-else>
    <template v-if="item.statusFlag==1">
    <a-menu-item :key="item.name" >
        <component :is="qantIcons[item.meta.icon]" />
        <span>{{item.meta.title}}</span>
    </a-menu-item>
    </template>
  </template>
</template>

<script setup lang="ts">
const props = defineProps(['item']);
</script>

<style scoped>

</style>