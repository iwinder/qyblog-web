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
            <a-menu-item key="dashboard">
                <a-icon type="user" />
                <span>仪表盘</span>
            </a-menu-item>

        

            

            <a-sub-menu key="blog">
                <span slot="title"><a-icon type="user" /><span>文章管理</span></span>
                <a-menu-item key="/article">
                    <nuxt-link to="/article">
                        文章列表
                    </nuxt-link>
                </a-menu-item>
                <a-menu-item key="/category">
                    <nuxt-link to="/category"> 
                    分类管理
                    </nuxt-link>
                </a-menu-item>
                <a-menu-item key="/tag">
                     <nuxt-link to="/tag"> 
                            标签管理
                     </nuxt-link>
                </a-menu-item>
            </a-sub-menu> 

            <a-menu-item key="/comment">
               <nuxt-link to="/comment">
                <a-icon type="uplod" />
                <span>评论管理</span>
                </nuxt-link>
            </a-menu-item>

            <a-sub-menu key="system">
                <span slot="title"><a-icon type="user" /><span>系统管理</span></span>
                <a-menu-item key="/user">
                      <nuxt-link to="/user">
                        用户管理
                    </nuxt-link>
                    
                </a-menu-item>
                <a-menu-item key="/role">
                     <nuxt-link to="/role">
                        角色管理
                     </nuxt-link>
                </a-menu-item>
                <a-menu-item key="/permission">
                    <nuxt-link to="/permission">
                        权限管理
                     </nuxt-link>
                </a-menu-item>
            </a-sub-menu>



        </a-menu>
            </a-drawer>
    <!-- </a-layout-sider> -->
</template>

<script>
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