<template>
    <a-layout-sider v-model="collapsed"  :trigger="null" collapsible 
    breakpoint="lg"
      collapsed-width="0"
 @breakpoint="onBreakpoint"
       :style="{  'background': '#f0f2f5'  }">
        <span class="logo"  style="    margin: 0;" />
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
    </a-layout-sider>
</template>

<script>
export default {
    props: { 
        isCollapsed: {
            default:  false
        },
        afterBreakpoint: {
            type: Function,
            default: null
        }, 
    },
    data() {
        return {
            collapsed: this.isCollapsed
        }
    },
    watch: {
        isCollapsed(val) {
                    console.log("isCollapsed sider",val);
            this.collapsed = val;
        }
    },
    methods: {
            onBreakpoint(broken) {
                let _this = this;
                _this.afterBreakpoint(broken);
            },
    }
}
</script>

<style scoped>
.ant-layout-sider  {
    position: absolute;
}
</style> 