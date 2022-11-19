<template>
  <div>


    <template v-if="!linkInfo.editLinkShow">
      永久链接：
      <a-tooltip placement="topLeft"  :title="siteInfo.site_url+linkInfo.oldLink" arrow-point-at-center>
        <a  :href="siteInfo.site_url+linkInfo.oldLink" class="viewlinka" target="_blank" > {{siteInfo.site_url}}<span class="viewlink">{{linkInfo.oldLink}}</span>
        </a>
      </a-tooltip>
      <a-button type="dashed" @click="doOpneEditLink(linkInfo.oldLink)">
        编辑
      </a-button>
    </template>
    <template  v-else>
      永久链接： <span > {{siteInfo.site_url}}<span class="viewlinkInpu"><a-input type="text"  size="small"  v-model:value="linkInfo.newLink" /></span> </span>

      <a-button type="dashed" @click="doSaveEditLink">
        保存
      </a-button>
    </template>

  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, reactive} from "vue";
import loginims from "@/assets/vue.svg";
import {useSiteInfo} from "@/store/siteInfo";
const emit = defineEmits(['onAfterSubmit'])
const siteStore =  useSiteInfo();
const props =  defineProps({
  permaLink:{
    default:""
  },
})
const siteInfo = reactive({
  site_url:"",
})
const linkInfo = reactive({
  oldLink:  computed(() => props.permaLink),
  newLink: "",
  editLinkShow: false,

})

onMounted(() => {
  siteInfo.site_url = siteStore.GetSiteInfoByKey("site_url");
  if (!siteInfo.site_url.endsWith("/")) {
    siteInfo.site_url =  siteInfo.site_url + "/";
  }
})


function doOpneEditLink(val:string) {
  console.log("doOpneEditLink",val);
  linkInfo.editLinkShow = true;
  linkInfo.newLink = val;
}
function doSaveEditLink() {
  linkInfo.editLinkShow = false;
  emit('onAfterSubmit', linkInfo.newLink);
}
</script>

<style scoped lang="less">
a {
  padding-right: 10px;
}
.viewlinka{
  display: inline-block;
}
.viewlink {
  display: inline-block;
  max-width: 200px;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: bottom;
}
</style>