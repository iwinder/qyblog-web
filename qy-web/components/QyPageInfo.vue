<template>
  <a-row class="post-content"  v-if="!postLoading">
    <a-col  class="single-left" :xs="{span:0}"  :lg="dataInfo.leftLg" >

      <a-affix class="menusAffix" :offset-top="100" v-if="dataInfo.titles.length>0">
        <a-card title="目录" style="width: 100%;height: 100%;">
          <div
              v-for="anchor in dataInfo.titles"
              :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"
              @click="handleAnchorClick(anchor)"
          >
            <a style="cursor: pointer">{{ anchor.title }}</a>
          </div>
        </a-card>
      </a-affix>
    </a-col>
    <a-col  class="single-right" :xs="{span:24}"  :lg=" dataInfo.rightLg" >
      <a-row class="single-header"  type="flex" justify="center" align="middle" >
        <a-card>
          <a-typography-title >{{postData.title}}</a-typography-title>
          <div class="header-meta">

            <span class="meta-date"><time class="entry-date"  :datetime="postData.publishedAt" :title="postData.publishedAt">{{postData.publishedDateMD }}</time></span>
            <span class="separator" role="separator">·</span>
            <span class="meta-user">By/{{postData.nickName}}</span>
            <span class="separator" role="separator">·</span>
            <span class="post-meta">
                <a class="post-meta-views" href="javascript: void(0)">     <EyeOutlined  />   <span class="num">{{postData.viewCount}}</span>  </a>
                <a class="post-meta-comments" href="javascript: void(0)">     <MessageOutlined  />   <span class="num">{{postData.commentCount}}</span>   </a>
            </span>
          </div>
        </a-card>
      </a-row>
      <a-row class="single-body">

        <a-row class="markdown-dev"  >
          <v-md-preview-html class="markdown-body" v-contentImags="doChagePreviewUrl" ref="postRef" :include-level="[1,2,3, 4]" :html="postData.contentHtml" preview-class="vuepress-markdown-body"></v-md-preview-html>
          <a-image
              :width="200"
              :style="{ display: 'none' }"
              :preview="{  visible:dataInfo.visible, onVisibleChange: doSetVisible, }"
              :src="dataInfo.previewUrl"  />
        </a-row>
        <a-row class="link-row" :gutter="2" v-show="linkList &&  linkList.length>0">

            <a-col :span="6" v-for="link in linkList" :key="'link-' + link.id">
              <a-card title="" :bordered="false">
                <a-row class="link-div">
                    <img src="/favicon.ico" v-realImg="'//'+link.url+'/favicon.ico'" class="link-img">
                    <a  :href="'//'+link.url"  :title="link.name" target="_blank" rel="noopener">{{link.name}}</a>
                    <p>
                      <template v-if="link.description.length>0">
                        <a-tooltip>
                          <template #title>{{link.description}}</template>
                          {{link.description}}
                        </a-tooltip>
                      </template>
                      <template v-else>
                        &nbsp&nbsp
                      </template>
                    </p>
                </a-row>
              </a-card>
            </a-col>

        </a-row>
      </a-row>
      <a-row class="single-comments" >
        <QyCommentList :comment-agent-id= "postData.commentAgentId" :site-comment-flag="siteInfo.site_comment_flag"  :comment-flag="postData.commentFlag"></QyCommentList>
      </a-row>

    </a-col>

  </a-row>
  <a-skeleton active  v-else/>
</template>

<script setup lang="ts">
import {
  EyeOutlined,
  MessageOutlined,
} from '@ant-design/icons-vue';
import {ArticleType} from "@/api/article";
import {onMounted, onUpdated, reactive, ref, watch} from "vue";
import QyCommentList from "@/components/QyCommentList.vue";
const postRef =  ref();
const props =  defineProps({
  postData: {
    default: {

    } as ArticleType,
  },
  linkList: {
    default:[]
  },
  postLoading:{
    default: true
  },
  siteInfo: {
    default: {
      site_url:"",
      site_name:"",
      site_comment_flag:"0",
    },
  },
})
const dataInfo = reactive({
  titles: [],
  visible:false,
  previewUrl:"",
  leftLg: {
    span: 0
  },
  rightLg: { span: 24},
})


// watch(() => postRef.value,(data) => {
//   if(!dataInfo.titles.length&&postRef.value) {
//     doSetTitleMenuls();
//   }
// })


const doSetTitleMenuls = () => {
  const anchors = postRef.value.$el.querySelectorAll('h1,h2,h3,h4,h5,h6');
  const titles = Array.from(anchors).filter((title) => !!title.innerText.trim());
  dataInfo.leftLg.span = 6;
  dataInfo.rightLg.span = 17;
  dataInfo.rightLg.offset = 1;
  if (!titles.length) {
    dataInfo.titles = [];
    dataInfo.leftLg.span = 0;
    dataInfo.rightLg.span = 24;
    dataInfo.rightLg.offset = 0;
    return;
  }
  const hTags = Array.from(new Set(titles.map((title) => title.tagName))).sort();

  dataInfo.titles = titles.map((el) => ({
    title: el.innerText,
    lineIndex: el.getAttribute('data-v-md-line'),
    indent: hTags.indexOf(el.tagName),
  }));
}
const handleAnchorClick = (anchor) => {
  const   preview  = postRef.value;
  const { lineIndex } = anchor;
  const heading = preview.$el.querySelector(`[data-v-md-line="${lineIndex}"]`);

  if (heading) {
    preview.scrollToTarget({
      target: heading,
      scrollContainer: window,
      top: 60,
    });
  }
}
const doSetVisible = (val:boolean) => {
  dataInfo.visible = val;
}

const doChagePreviewUrl = (val:string) =>{
  dataInfo.previewUrl = val;
  doSetVisible(true);
}

</script>

<style scoped lang="less">
.single-left {
  .menusAffix{
    height: 400px;
    :deep(.ant-card-body) {
      overflow-y: scroll;
      max-height: 80%;
    }
  }
}
.single-header {
  background: #fff;
  text-align: center;
  .post-meta{
    padding-left: 1px;
    white-space: nowrap;
    vertical-align: top;
    width: 1%;
    a{
      font-size: 0.9rem;
      line-height: 24px;
      padding: 0 5px;
      color: rgba(0, 0, 0, 0.65);
    }
  }
}

.single-comments {
  background: #fff;
  margin-top: 30px;
  padding: 20px;
}

.ant-card-bordered {
  width: 100%;
}
.single-body {
  padding: 20px;
  background: #fff;
}
.link-row {
  width: 100%;
  :deep(.ant-card-body) {
    padding: 6px;
  }
}




.link-div {
  background: #e6faf0;
  margin: 10px;
  padding: 10px;
  position: relative;
  border: 1px solid #d5efe2;
  border-radius: 2px;
  a {
    width: 100%;
    text-align: center;
  }
  p {
    overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
    width: 100%;
    text-align: center;
  }
  .link-img {
    width: 30px;
    height: 30px!important;
    box-shadow: none;
    margin-right: 10px!important;
    vertical-align: bottom;
    display: inline-block!important;
    position: absolute;
    bottom: -15px;
    left: 50%;
    margin-left: -15px!important;
    margin-bottom: 0!important;
    border-radius: 50%;
    padding: 1px;
    border: 1px solid #bbb;
    background: #fff;
    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
    transition: all .5s ease;
  }
}


</style>
