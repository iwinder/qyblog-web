<template>
  <a-card  style="width: 100%" >
    <template #title>
      <h3 class="resource-card-title">相关资源</h3>
    </template>
    <template #extra>
      <a-typography-paragraph type="secondary"  class="resource-card-extra"
                         :ellipsis=" { rows: 1,tooltip: '文中提到的源代码等相关资源' }"
              content="文中提到的源代码等相关资源"/>
    </template>
    <a-card-grid v-for="resource in resourcesData" style=" text-align: center" class="resource-card">

      <a-typography-link :href="resource.url"  :title="resource.name" target="_blank" rel="noopener" ellipsis
                         class="resource-name" :style="{maxWidth:(resource.password.length>0?'45%':'100%')}"
           :content="resource.name"/>

      <template v-if="resource.password.length>0">
        <a-typography-text type="secondary" class="resource-pwd" >(密码:
          <a-typography-text type="danger"  copyable class="resource-pwd-in">
          <a-typography-text type="danger" ellipsis class="resource-pwd-in-text" :content="resource.password" />
          </a-typography-text >)
        </a-typography-text >
      </template>

    </a-card-grid>
  </a-card>
</template>

<script setup lang="ts">
import {ArticleResourceDto} from  "~/api/article";

const props =  defineProps({
  resourcesData: {
    default: [] as ArticleResourceDto[] ,
  },

})

</script>

<style scoped>
.resource-name,.resource-pwd-in-text{
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: bottom;
}
.resource-card-title, .resource-card-extra{
  margin: 0;
}
.resource-pwd-in-text{
  display: inline-block;
  max-width: 20%;
}
@media (max-width: 768px) {
  .resource-card{
    width: 100%;
  }
}
@media (min-width: 768px) {
  .resource-card{
    width: 50%;
  }
}

</style>
