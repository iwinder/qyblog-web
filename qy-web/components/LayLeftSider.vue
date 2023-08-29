<template>
  <a-drawer
      v-model:visible="dataInfo.collapsed "
      class="custom-class"
      style="color: red"
      placement="left"
      @close="doClose"
  >
    <template #title>
      <NuxtLink  class="small_logo" :to="{path:'/',query: { }}"  :title="siteInfo.site_name" rel="link noopener"  @click.native="doToIndex"  >
        <img  :src="siteInfo.site_small_logo" :alt="siteInfo.site_name"  >
      </NuxtLink >
    </template>
    <QyAMenus ref="menusRef" :menus-select="dataInfo.menusSelectKey"
              menusClass="headerMenusHoriz" listMode="inline"
              :menusList="headerMenus" @onAfterSelect="doAfterSelect"></QyAMenus>
  </a-drawer>
</template>

<script setup lang="ts">
import QyAMenus from "~/components/QyAMenus.vue";
import {reactive, ref, watch} from "vue";
import {MenusDto} from "~/api/menus";
const emit = defineEmits(['onCollapsed',"onMenusSelect"])
const props =  defineProps({
  isCollapsed: {
    default:  false
  },
  headerMenus: {
    default:[] as MenusDto[]
  },
  selectKey: {
    default:[] as string[]
  },
  siteInfo: {
    default: {
      searchLoading:false,
      site_small_logo:"",
    }
  },

})
watch(() =>props.isCollapsed,(a)=>{
  dataInfo.collapsed = a;
} );
watch(() =>props.selectKey,(a)=>{
  dataInfo.menusSelectKey = a;
} );
let menusRef=ref(null);

const dataInfo = reactive({
  searchLoading:false,
  menusSelectKey:[] as string[],
  visible:false,
  collapsed:false,
  formInfo:{
    searchText:"",
  },
})

function doClose(e:any) {
  dataInfo.collapsed = false;
  emit('onCollapsed',dataInfo.collapsed);
}
const doAfterSelect = (data:any) => {

  emit('onMenusSelect',   data.selectedKeys);
  doClose(null);
}
const doToIndex = () => {
  dataInfo.menusSelectKey = ["/"]
  emit('onMenusSelect',   ["/"]);
  doClose(null);
}
</script>

<style scoped>

</style>
