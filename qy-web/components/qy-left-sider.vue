<template>
     <a-drawer
      title="Basic Drawer"
      placement="left"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >

        <a-menu theme="light" mode="inline"  
            :defaultSelectedKeys="[$route.path]"
             :defaultOpenKeys="['blog']">
            

<template  v-for="(menu) in  siteInfo.header"  v-show="siteInfo.header">  
        <a-sub-menu  v-if="menu.children" :key="menu.url">
                      <span slot="title" class="submenu-title-wrapper"
                        >   {{menu.name}} </span >
                      
            </a-sub-menu>  
         
          <a-menu-item :key="menu.url"   v-else>
            {{menu.name}} 
          </a-menu-item>

   
      </template>


        <a-menu-item key="2">
          nav 2
        </a-menu-item>
        <a-menu-item key="3">
          nav 3
        </a-menu-item>
 


        </a-menu>
            </a-drawer>
    <!-- </a-layout-sider> -->
</template>

<script>

 import { mapState } from 'vuex'
export default {
    props: { 
        isCollapsed: {
            default:  false
        },
         afterClose: {
            type: Function,
            default: null
        }, 
    },
    data() {
        return {
            visible: this.isCollapsed
        }
    },
    watch: {
        isCollapsed(val) {
                  
            this.visible = val;
        }
    },
    computed: {
    ...mapState({
      siteInfo: state => state.siteInfo.siteInfo
    })
  },
    methods: {
         afterVisibleChange(val) {
             let _this = this;
                console.log('visible', val);
                // _this.visible = !val;
                // if(val) {
                //     _this.visible = false;
                // }
        },
    onClose() {
      this.visible = false;
      this.afterClose(false);
    },
    }
}
</script>

<style scoped>
.ant-layout-sider  {
    position: absolute;
}
</style> 