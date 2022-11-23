<template>
  <a-layout-header   :style="{background: '#fff', padding: 0,  width: '100%' ,position: 'fixed',zIndex: 2}">
    <a-row style="margin: 0 20px;">
      <a-col   :xs="{span:2}" :sm="{span:2}"  :md="{ span: 0}">
        <menu-unfold-outlined
            v-if="dataInfo.collapsed"
            class="trigger"
            @click="doCallChange"
        />
        <menu-fold-outlined v-else class="trigger" @click="doCallChange" />
      </a-col>
      <a-col  class="logo-col" :xs="{span:6,offset: 8}"  :sm="{span:6,offset: 7}"  :md="{ span: 3, offset:1}">
        <router-link  class="logo nav-col" :to="{path:'/',query: { }}"  :title="siteInfo.site_name" rel="link noopener"  @click.native="doToIndex"  >
          <img  :src="siteInfo.site_logo" :alt="siteInfo.site_name"  >
        </router-link >
      </a-col>
      <a-col  :xs="{span:0}"  :sm="{span:0}"  :md="{ span: 13}" justify="center" align="middle">
        <QyAMenus ref="menusRef" :menusSelectKey="dataInfo.menusSelectKey" menusClass="headerMenusHoriz" listMode="horizontal" :menusList="dataInfo.headerMenus"></QyAMenus>
      </a-col>
      <a-col  :xs="{span:0,offset:0}"  :sm="{span:0,offset: 0}"  :md="{ span: 2}"  class="search-button">
        <a-button shape="dashed"  :loading="dataInfo.searchLoading"   @click="doOpenSearch">
          <template #icon><SearchOutlined /></template>
          搜索
        </a-button>
      </a-col>
      <a-col  :xs="{span:3,offset:4}"  :sm="{span:3,offset: 4}"  :md="{ span: 0, offset:0}"  class="search-button">
        <a-button shape="circle"  :loading="dataInfo.searchLoading"    @click="doOpenSearch">
          <template #icon><SearchOutlined /></template>
        </a-button>
      </a-col>
    </a-row>
    <a-modal v-model:visible="dataInfo.visible" centered  :footer="null" :closable="false"  @cancel="doCancel">
      <a-form
          layout="horizontal"
          :model="dataInfo.formInfo"
          autocomplete="off"
          ref="selectForm"
      >
        <a-form-item
            label=""
            name="searchText"
            style="margin: 12px 0;"
        >
            <a-input-search
                v-model:value="dataInfo.formInfo.searchText"
                placeholder="请输入关键字"
                enter-button
                @search="doSearch"
            />
        </a-form-item>
      </a-form>
    </a-modal>
  </a-layout-header>
</template>

<script setup lang="ts">
import {computed, reactive, ref, watch} from "vue";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SearchOutlined,
} from '@ant-design/icons-vue';
import QyAMenus from "@/components/QyAMenus.vue";
import {FormInstance} from "ant-design-vue";
import {useRouter} from "vue-router";
const emit = defineEmits(['onCollapsed'])
let menusRef=ref(null);
const router = useRouter();
const selectForm = ref<FormInstance>();
const props =  defineProps({
  isCollapsed: {
    default:  false
  },
})

const siteInfo = reactive({
  searchLoading:false,
  site_logo:"https://windcoder.com/wp-content/uploads/2017/02/logo_vift.png"
})
watch(() =>props.isCollapsed,(a)=>{
  console.log("isCollapsed a",a);
  dataInfo.collapsed = a;
} );
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
// trigger 切换事件
const doCallChange = ()=> {
  dataInfo.collapsed = ! dataInfo.collapsed;
  emit('onCollapsed',   dataInfo.collapsed);
}
const doOpenSearch = () => {
  dataInfo.visible = true;
}
const doToIndex = () => {
  menusRef.value.doSelect("/");
}
const doCancel = () => {
  dataInfo.visible = false;
}
const doSearch = () => {
  if (!dataInfo.formInfo.searchText||dataInfo.formInfo.searchText.length==0) {
    doCancel();
    return
  }
  const searchText = dataInfo.formInfo.searchText;
  selectForm.value.resetFields();
  doCancel();
  router.push("/?searchText="+searchText);
  router.push({path:"/",query: {searchText:searchText }})

}
</script>

<style scoped lang="less">
:deep(.ant-layout-header) {
  font-weight:bold;
}
.trigger {
  float: left;
  width: 48px;
  line-height: 64px;
  height: 64px;
  font-size: 18px;
  padding: 0 24px 0 0;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.logo {
  height: 80%;
  background: rgba(255, 255, 255, 0.2);

  display: inline-block;
}
.logo img {
  max-width:  100%;
  height: 100%;
  display: inline-block;
}
.logo-col {
  text-align: center;
  vertical-align: middle;
  line-height: 64px;
  height: 64px;
}

.search-button {
  line-height: 64px;
  float: left;
}
.headerMenusHoriz{
  overflow: hidden;
}
//
//@media (max-width: 767px) {
//  .horizontalShow {
//    display: none;
//  }
//  .trigger {
//    display: inline-block;
//  }
//}
//@media (min-width: 768px){
//  .horizontalShow {
//    display: inline-block;
//  }
//  .trigger {
//    display: none;
//  }
//}

</style>