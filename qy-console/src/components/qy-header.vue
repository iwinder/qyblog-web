<template>
    <a-layout-header     :style="{background: '#fff', padding: 0,  width: '100%' ,position: 'fixed',zIndex: 1}" >
          <a-row class="table-operations">
                <a-col :xs="{span:6}"  :lg="{ span: 12}">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="callChange"
        /> </a-col>
  <a-col  :xs="{span:8, offset: 10 }"  :lg="{ span: 3, offset: 5 }" style="    text-align: center;  " >
        <a-dropdown>
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                         <a-avatar  icon="user"  :src="user.avatar"/>
            </a>
            <a-menu slot="overlay" >
            <a-menu-item key="1">
                1st menu item
            </a-menu-item>
            <a-menu-item key="2">
                2nd menu item
            </a-menu-item>
            <a-menu-item key="3">
                3rd menu item
            </a-menu-item>
            </a-menu>
        </a-dropdown> </a-col>
         </a-row>
      </a-layout-header>
      
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
             collapsed: this.isCollapsed,
             user: {}
         }
     },
    watch: {
        isCollapsed(val) {
            this.collapsed = val;
        }
    },
    created() {
        let _this = this; 
        _this.initUser();
    },
     methods:{ 
         callChange:function() {
             this.collapsed = !this.collapsed;
              this.$emit('on-collapsed',this.collapsed);
         },
         initUser() {
             let _this  = this;
             _this.$axios.get('/admin/currentUser' ).then(res => {
                let resp  = res.data				
                if(resp.success) {
                    _this.user =   resp.content;  
                    QyTool.setLoginUser(_this.user);
                }
          });

         }
     }
}
</script>