<template>
  <a-drawer
      v-model:visible="dataInfo.collapsed "
      class="custom-class"
      style="color: red"
      title="Basic Drawer"
      placement="left"
      @close="doClose"
  >
    <template slot="title">
      <router-link  class="small_logo" :to="{path:'/',query: { }}"  :title="siteInfo.site_name" rel="link noopener"  @click.native="doToIndex"  >
        <img  :src="siteInfo.site_small_logo" :alt="siteInfo.site_name"  >
      </router-link >
    </template>
    <QyAMenus ref="menusRef" :menusSelectKey="dataInfo.menusSelectKey" menusClass="headerMenusHoriz" listMode="inline" 
              :menusList="dataInfo.headerMenus" @onAfterSelect="doAfterSelect"></QyAMenus>
  </a-drawer>
</template>

<script setup lang="ts">
import QyAMenus from "@/components/QyAMenus.vue";
import {computed, reactive, ref, watch} from "vue";
const emit = defineEmits(['onCollapsed'])
const props =  defineProps({
  isCollapsed: {
    default:  false
  },

})
watch(() =>props.isCollapsed,(a)=>{
  dataInfo.collapsed = a;
} );
let menusRef=ref(null);
const siteInfo = reactive({
  searchLoading:false,
  site_small_logo:"https://windcoder.com/wp-content/uploads/2017/02/logo_vif_small.png"
})
const dataInfo = reactive({
  searchLoading:false,
  menusSelectKey:[] as string[],
  visible:false,
  collapsed:false,
  formInfo:{
    searchText:"",
  },
  headerMenus:[{
    id:"1",
    name: "语言",
    url:"/messages",
    blanked:2,
    children:[{
      id:"4",
      name: "Java笔记",
      url:"/category/java",
      blanked:2,
    },{
      id:"5",
      name: "golang笔记",
      url:"/category/go",
      blanked:2,
    }]
  },{
    id:"2",
    name: "Web笔记",
    url:"/category/webnote",
    blanked:2,
  },{
    id:"3",
    name: "数据库笔记",
    url:"/category/shujuku",
    blanked:1,
  },{
    id:"6",
    name: "数据库笔记2",
    url:"/category/shujuku2",
    blanked:2,
  },{
    id:"7",
    name: "友情链接",
    url:"/links-page",
    blanked:2,
  }],
})

function doClose(e:any) {
  dataInfo.collapsed = false;
  emit('onCollapsed',dataInfo.collapsed);
}
function doAfterSelect() {
  doClose(null);
}
const doToIndex = () => {
  menusRef.value.doSelect("/");
}
</script>

<style scoped>

</style>