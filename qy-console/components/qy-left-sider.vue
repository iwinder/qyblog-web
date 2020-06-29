<template>
    <a-layout-sider v-model="collapsed"  :trigger="null" collapsible 

       :style="{ }">
        <div class="logo" />
        <a-menu theme="dark" mode="inline" >
            <a-menu-item key="1">
                <a-icon type="user" />
                <span>控制面板</span>
            </a-menu-item>

        

            <a-sub-menu key="sub1">
                <span slot="title"><a-icon type="user" /><span>用户</span></span>
                <a-menu-item key="3">
                    Tom
                </a-menu-item>
                <a-menu-item key="4">
                    Bill
                </a-menu-item>
                <a-menu-item key="5">
                    Alex
                </a-menu-item>
            </a-sub-menu>

            <a-sub-menu key="sub2">
                <span slot="title"><a-icon type="user" /><span>文章管理</span></span>
                <a-menu-item key="6">
                    <nuxt-link to="/article/">
                        文章列表
                    </nuxt-link>
                </a-menu-item>
                <a-menu-item key="7">
                    分类管理
                </a-menu-item>
                <a-menu-item key="8">
                    标签管理
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
        }
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
    }
}
</script>