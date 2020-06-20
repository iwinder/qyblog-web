<template>
    <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="callChange"
        />
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
             collapsed: this.isCollapsed
         }
     },
     methods:{ 
         callChange:function() {
             this.collapsed = !this.collapsed;
              this.$emit('on-collapsed',this.collapsed);
         }
     }
}
</script>