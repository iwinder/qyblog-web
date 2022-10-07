<template>
  <div >
    <a-form ref="formRef"     layout="inline">

          <a-form-item

          > <a-input-search v-model:value="treeInfo.searchValue" style="margin-bottom: 8px" placeholder="Search" /></a-form-item>

          <a-form-item >
            <a-button type="primary" html-type="submit"
                      :loading="treeInfo.saveBtn"
                      @click="doSave">保存</a-button>
          </a-form-item>

    </a-form>

    <a-tree v-if="treeInfo.items.length>0"
        v-model:selectedKeys="treeInfo.selectedKeys"
        v-model:checkedKeys="treeInfo.checkedKeys"
        :fieldNames="treeInfo.fieldNames"
        :tree-data="treeInfo.items"
        checkable
        show-line
        :defaultExpandAll="treeInfo.items.length>0"
    >
    </a-tree>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive} from "vue";
import {List} from "@/api/menus_admin";
const emit = defineEmits(['onAfterSubmit'])
onMounted(() => {
  initMenusList();
})
const treeInfo = reactive({
  items:[],
  selectedKeys:[],
  checkedKeys:[],
  searchValue:"",
  fieldNames:{children:'children', title:'name', key:'id' },
  saveBtn:false
})
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};
const initMenusList = async () => {
  List({
    current:0,
    // type:1,
    parentId:"0",
    hasChildren: true
  }).then(res=>{
    treeInfo.items = res.items;
  }).catch(err=>{})
}
const doSave = () => {
  treeInfo.saveBtn = true;
  var param = {
    menusIDs:treeInfo.checkedKeys
  }
  emit('onAfterSubmit', param);
}
defineExpose({treeInfo});

</script>

<style scoped>

</style>