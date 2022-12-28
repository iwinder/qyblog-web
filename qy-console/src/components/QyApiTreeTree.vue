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
        @check="doCheck"
    >
    </a-tree>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive} from "vue";
import {ApisType, GetTree} from "@/api/apis";
const emit = defineEmits(['onAfterSubmit'])
onMounted(() => {
  initMenusList();
})
const treeInfo = reactive({
  items:[],
  selectedKeys:[],
  checkedKeys:[],
  searchValue:"",
  fieldNames:{children:'children', title:'description', key:'id' },
  saveBtn:false,
  realApis:[] as ApisType[],
  realApiIDs:[] as string[],
})
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};
const initMenusList = async () => {
  GetTree().then((res:any)=>{
    treeInfo.items = res.items;
  }).catch(err=>{})
}
const doSave = () => {
  treeInfo.saveBtn = true;
  var param = {
    apis:treeInfo.realApis,
    apiIDs:treeInfo.realApiIDs
  }
  emit('onAfterSubmit', param);
}
const doCheck = (item:string[],e:any) => {
  let newApis: ApisType[]=[];
  let newApiIds: string[]=[];
  e.checkedNodes.forEach((item:ApisType)=> {
    if (item.id.indexOf("AG_")<0) {
      newApis.push(item);
      newApiIds.push(item.id);
    }
  });
  treeInfo.realApis = newApis;
  treeInfo.realApiIDs = newApiIds;
}
defineExpose({treeInfo});
</script>

<style scoped>

</style>
