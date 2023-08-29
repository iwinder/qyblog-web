<template>
  <a-menu
      :class="menusClass"
      :mode="listMode"
      v-model:selectedKeys="selectedKeys"
      @select="doSelectKeys"
  >
    <QyMenusItem :items="menusList" ></QyMenusItem>
  </a-menu>
</template>

<script setup lang="ts">
import QyMenusItem from "~/components/QyMenusItem.vue"
import { onMounted, ref, watch} from "vue";
const emit = defineEmits(['onAfterSelect'])
const props = defineProps({
  menusList:{
    default:[]
  },
  listMode: {
    default:""
  },
  menusClass:{
    default:"menus-class"
  },
  menusSelect: {
    default:[]
  }
});
const selectedKeys= ref<string[]>(['dashboard']);
watch(() =>props.menusSelect,(a)=>{
  selectedKeys.value = a;
} );
onMounted(() => {
})
// 菜单选中
const doSelectKeys = (data:any) => {
  emit('onAfterSelect',data);
}
</script>

<style scoped>

</style>
