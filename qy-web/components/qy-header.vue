<template>
        <a-layout-header   :style="{background: '#fff', padding: 0,  width: '100%' ,position: 'fixed',zIndex: 2}">
            <a-row style="margin: 0 20px;">
                <a-col   :xs="{span:2}" :sm="{span:2}"  :md="{ span: 0}">
            <a-icon   
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="callChange"
        />
</a-col>
   <a-col  class="logo-col" :xs="{span:6,offset: 8}"  :sm="{span:6,offset: 8}"  :md="{ span: 3, offset:2}">
        <a class="logo nav-col" href="/" title="Windcoder"   > 
                <img src="https://windcoder.com/wp-content/uploads/2017/02/logo_vift.png" alt="Windcoder"  >
        </a>
 </a-col>
      <a-menu  class="horizontalShow"
      
         mode="horizontal"
           :defaultSelectedKeys="[$route.path]"
        :style="{ lineHeight: '64px' }"
    
      >
        <a-menu-item key="1">
          nav 1
        </a-menu-item>
        <a-menu-item key="2">
          nav 2
        </a-menu-item>
        <a-menu-item key="3">
          nav 3
        </a-menu-item>
      </a-menu>
      </a-row>
    </a-layout-header>
</template>

<script>
export default {
    props: { 
        isCollapsed: {
            default:  false
        },
        screenWidths: {
            default:  false
        },      
          afteModeChange: {
            type: Function,
            default: null
        },  
    },
    data() {
      return {
        mode: "horizontal",
        isInline: false,
        horizontalShow: false,
        collapsed: false,
        screenWidth: '',
        screenHeight: ''
      };
    },
    watch: {
        isCollapsed(val) {
            this.collapsed = val;
        }
    },
    mounted() {

    },
    methods: {
        callChange() {
          let _this = this;
          _this.collapsed = !this.collapsed;
           _this.$emit('on-collapsed',this.collapsed);
        }
    }
}
</script>


<style>
 .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

 .logo {
  height: 32px;
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
 }
 
.trigger {
    float: left;
    width: 48px;
    line-height: 64px;
}

@media (max-width: 767px) {
  .horizontalShow {
    display: none;
  }
  .trigger {
     display: inline-block;
  }
}
@media (min-width: 768px){
  .horizontalShow {
    display: inline-block;
  }
    .trigger {
     display: none;
  }
}

</style>