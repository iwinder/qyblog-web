<template>
        <a-layout-header  style="background: #fff;padding: 0">
            <a-row style="margin: 0 20px;">
                <a-col   :xs="{span:2}" :sm="{span:2}"  :md="{ span: 0}">
            <a-icon   v-show="isInline"
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="callChange"
        />
</a-col>
   <a-col  :xs="{span:6,offset: 8}"  :sm="{span:6,offset: 8}"  :md="{ span: 3, offset:2}">
        <a class="logo nav-col" href="https://windcoder.com" title="Windcoder" :class="{'floatLeft' : !isInline, 'logoIsInline':isInline }" >
                <img src="https://windcoder.com/wp-content/uploads/2017/02/logo_vift.png" alt="Windcoder"  :class="{'floatLeft' : !isInline}" >
        </a>
 </a-col>
      <a-menu  v-show="horizontalShow"
      
         mode="horizontal"
        :default-selected-keys="['2']"
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
        screenWidth(val) {
            console.log(val);      
            let  _this  = this;
            if(val < 768) {
                _this .mode = "inline";
                _this.isInline = true;
                  _this.horizontalShow = false;
                  _this.afteModeChange(true);
            } else {
                _this .mode = "horizontal";
                 _this.isInline = false;
                _this.horizontalShow = true;
                _this.afteModeChange(false);
            }
        },
        isCollapsed(val) {
            this.collapsed = val;
        }
    },
    mounted() {
        let  _this  = this;
      this.screenWidth = document.body.clientWidth;  
      this.screenHeight = document.body.clientHeight;
            if( this.screenWidth < 768) {
                _this .mode = "inline";
                _this.isInline = true;
                _this.horizontalShow = false;
                      _this.afteModeChange(true);
            } else {
                _this .mode = "horizontal";
                 _this.isInline = false;
                 _this.horizontalShow = true;
                 _this.afteModeChange(false);
            }
      window.onresize = () => {
        return (() => {
          this.screenWidth = document.body.clientWidth;
          this.screenHeight = document.body.clientHeight;

        })();
      };
    },
    methods: {
        callChange() {
             this.collapsed = !this.collapsed;
              this.$emit('on-collapsed',this.collapsed);
        }
    }
}
</script>


<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

 .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
  display: inline-block;
}
.logo img {
    max-width:  100%;
    height: 100%;
    display: block;
}
.floatLeft {
    float: left;
}
.logoIsInline{
        /* left: 20%; */
    float: left;
    /* position: relative; */
}
.trigger {
    float: left;
    width: 48px;
    line-height: 64px;
}
</style>