<template>
    <a-layout-sider v-model="collapsed"  :trigger="null" collapsible 
    breakpoint="lg"
      collapsed-width="0"
 @breakpoint="onBreakpoint"
       :style="{ }">
        <div class="logo" >       <img  :src="site.site_small_logo" alt="logo">  </div>
        <a-menu theme="dark" mode="inline"  
            :defaultSelectedKeys="[$route.path]"
             :defaultOpenKeys="['blog']">
            <a-menu-item key="dashboard">
                <a-icon type="dashboard" />
                <span>仪表盘</span>
            </a-menu-item>

        

            

            <a-sub-menu key="blog">
                <span slot="title"><a-icon type="form" /><span>文章管理</span></span>
                <a-menu-item key="/article">
                    <router-link to="/article">
                        文章列表
                    </router-link>
                </a-menu-item>
                <a-menu-item key="/category">
                    <router-link to="/category"> 
                    分类管理
                    </router-link>
                </a-menu-item>
                <a-menu-item key="/tag">
                     <router-link to="/tag"> 
                            标签管理
                     </router-link>
                </a-menu-item>
               <a-menu-item key="/page">
                <router-link to="/page">
                    <a-icon type="snippets" />
                    <span>页面管理</span>
                </router-link>
                </a-menu-item>
            <a-menu-item key="/comment">
               <router-link to="/comment">
                <a-icon type="message" />
                <span>评论管理</span>
                </router-link>
            </a-menu-item>
            </a-sub-menu> 
            <a-sub-menu key="media">
                <span slot="title"><a-icon type="form" /><span>媒体管理</span></span>
                <a-menu-item key="/media-lib-config">
                <router-link to="/media-lib-config">
                    <a-icon type="snippets" />
                    <span>媒体库配置</span>
                </router-link>
                </a-menu-item>
            </a-sub-menu>
           <a-sub-menu key="system-link">
                <span slot="title"><a-icon type="setting" /><span>链接管理</span></span>
            <a-menu-item key="/menus">
               <router-link to="/menus">
                <a-icon type="apartment" />
                <span>导航管理</span>
                </router-link>
            </a-menu-item>
                <a-menu-item key="/link"> 
                    <router-link to="/link">
                        <a-icon type="share-alt" />
                        <span>友链管理</span>
                        </router-link>
                    </a-menu-item>
                <a-menu-item key="/short-link">
                    <router-link to="/short-link">
                        <a-icon type="link" />
                        <span>短链接管理</span>
                        </router-link>
               </a-menu-item>
           </a-sub-menu>
             <a-sub-menu key="system-safe">
                  <span slot="title"><a-icon type="setting" /><span>安全管理</span></span>
                <a-menu-item key="/ip-black">
                    <router-link to="/ip-black">
                        IP黑名单
                     </router-link>
                </a-menu-item>
                <a-menu-item key="/login-log">
                    <router-link to="/login-log">
                        登录日志
                     </router-link>
                </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="system">
                <span slot="title"><a-icon type="setting" /><span>系统管理</span></span>
                <a-menu-item key="/user">
                      <router-link to="/user">
                        用户管理
                    </router-link>
                    
                </a-menu-item>
                <a-menu-item key="/role">
                     <router-link to="/role">
                        角色管理
                     </router-link>
                </a-menu-item>
                <a-menu-item key="/permission">
                    <router-link to="/permission">
                        权限管理
                     </router-link>
                </a-menu-item>
                <a-menu-item key="/site">
                    <router-link to="/site">
                        站点管理
                     </router-link>
                </a-menu-item> 
            </a-sub-menu>



        </a-menu>
    </a-layout-sider>
</template>

<script>
 import { mapState } from 'vuex'
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
    computed: {
        ...mapState({
        site: state => state.siteInfo.siteInfo
        })
    },
    data() {
        return {
            collapsed: this.isCollapsed,
             
        }
    },
    watch: {
        isCollapsed(val) {
            this.collapsed = val;
        }
    },
    created() {
      let _this = this; 
      _this.initSiteInfo(); 
  },
    methods: {
            onBreakpoint(broken) {
                let _this = this;
                _this.afterBreakpoint(broken);
            },
            initSiteInfo() {
              let _this = this; 
              if(QyTool.isEmpty( _this.site)) {
                  _this.$store.dispatch("initSiteBase");
              } 
          },
    }
}
</script>