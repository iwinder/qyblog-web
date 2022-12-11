<template>
  <a-layout-header   :style="{background: '#fff', padding: 0,  width: '100%' ,position: 'fixed',zIndex: 33}">
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
        <NuxtLink  class="logo nav-col" :to="{path:'/',query: { }}"  :title="siteInfo.site_name" rel="link noopener"  @click.native="doToIndex"  >
          <img   :src="siteInfo.site_logo" :alt="siteInfo.site_name"  >
        </NuxtLink >
      </a-col>
      <a-col  :xs="{span:0}"  :sm="{span:0}"  :md="{ span: 13}" justify="center" align="middle">
        <QyAMenus  ref="menusRef" :menus-select="dataInfo.menusSelectKey"
                   menusClass="headerMenusHoriz" listMode="horizontal"
                   :menusList="headerMenus" @onAfterSelect="doAfterSelect"></QyAMenus>

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
import {MenusDto} from "@/api/menus";
const emit = defineEmits(['onCollapsed',"onMenusSelect"])
let menusRef=ref(null);
const router = useRouter();
const selectForm = ref<FormInstance>();
const props =  defineProps({
  isCollapsed: {
    default:  false
  },
  searchLoading:{
    default:false
  },
  siteInfo: {
    default: {
      site_logo:"",
      site_name:"",
    }
  },
  headerMenus: {
    default:[] as MenusDto[]
  },
  selectKey: {
    default:[] as string[]
  }
})



watch(() =>props.isCollapsed,(a)=>{
  dataInfo.collapsed = a;
} );
watch(() =>props.selectKey,(a)=>{
  dataInfo.menusSelectKey = a;
} );
watch(() =>router.currentRoute.value,(a)=>{
  if (a.fullPath=="/") {
    doToIndex();
  }
});
const dataInfo = reactive({
  searchLoading: false,
  menusSelectKey: [] as string[],
  visible: false,
  collapsed: false,
  formInfo:{
     searchText:"",
  },
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
  dataInfo.menusSelectKey = ["/"]
  // menusRef.value.doSelect("/");
   emit('onMenusSelect',   ["/"]);
}
const doAfterSelect = (data:any) => {
  emit('onMenusSelect',   data.selectedKeys);
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
  router.push("/search/"+searchText);
  // router.push({path:"/",query: {searchText:searchText }})

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
.logo img,  {
  max-width:  100%;
  height: 100%;
  display: inline-block;
}
:deep(.ant-skeleton-element){
  max-width:  100%;
  .ant-skeleton-image {
    height: auto;
  }
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
