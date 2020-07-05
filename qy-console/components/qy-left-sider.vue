<template>
    <a-layout-sider v-model="collapsed"  :trigger="null" collapsible 
    breakpoint="lg"
      collapsed-width="0"
 @breakpoint="onBreakpoint"
       :style="{ }">
        <div class="logo" />
        <a-menu theme="dark" mode="inline"  
            :defaultSelectedKeys="[$route.path]"
             :defaultOpenKeys="['sub1', 'sub2', 'sub3']">
            <a-menu-item key="1">
                <a-icon type="user" />
                <span>控制面板</span>
            </a-menu-item>

        

            <a-sub-menu key="sub1">
                <span slot="title"><a-icon type="user" /><span>系统管理</span></span>
                <a-menu-item key="/user">
                      <nuxt-link to="/user">
                        用户管理
                    </nuxt-link>
                    
                </a-menu-item>
                <a-menu-item key="4">
                     <nuxt-link to="/role">
                        角色管理
                     </nuxt-link>
                </a-menu-item>
                <a-menu-item key="5">
                    <nuxt-link to="/role">
                        权限管理
                     </nuxt-link>
                </a-menu-item>
            </a-sub-menu>

            <a-sub-menu key="sub2">
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

            <!-- <a-menu-item key="3">
                <a-icon type="upload" />
                <span>nav 3</span>
            </a-menu-item> -->

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