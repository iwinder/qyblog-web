<template>
  <a-row class="post-content" v-if="!postLoading">
    <a-col  class="single-left" :xs="{span:24}"  :lg=" { span: 17}" >
      <div>
        <a-row class="single-header"  >
          <a-card  class="header-card"  :style="{backgroundImage:'url(' + postData.defImg + ')'}"  v-realBackgroundImg="postData.thumbnail">
            <a-row class="header-wrap">
              <a-row class="header-meta">
                <template v-if="postData.category!=null">
              <span class="meta-category">
                 <NuxtLink :to=" {name:'category-name',  params:{name:postData.category.identifier} }"    rel="category tag"> {{postData.category.name}} </NuxtLink>
              </span>
                  <span class="separator" role="separator">·</span>
                </template>
                <span class="meta-date"><time class="entry-date"  :datetime="postData.publishedAt" :title="postData.publishedAt">{{postData.publishedDateMD }}</time></span>
                <span class="separator" role="separator">·</span>
                <span class="meta-user">By/{{postData.nickName}}</span>
              </a-row>
              <h1 class="h2">{{postData.title}}</h1>
            </a-row>
          </a-card>
        </a-row>
        <a-row class="single-body">
          <a-row class="article-header">
            <template v-if="postData.tags!=null">
              <a-col  class="post-tags"  :xs="{span:24}"  :sm="{ span: 16}">
                <template  v-for="(tag,idx) in postData.tags" >
                  <a-tag  :color="postData.tagColors[idx]">
                    <NuxtLink :to=" {name:'tag-name',  params:{name:tag.identifier} }"> {{tag.name}}</NuxtLink>
                  </a-tag>
                </template>
              </a-col>
            </template>
            <a-col class="post-meta" :xs="{span:24}"  :sm="{ span: 4,offset: 3}" :lg="{offset: 2}" :xl="{offset: 4}">
              <a class="post-meta-views" href="javascript: void(0)">      <EyeOutlined  />  <span class="num">{{postData.viewCount||0}}</span>  </a>
              <a class="post-meta-comments" href="javascript: void(0)">    <MessageOutlined  />  <span class="num">{{postData.commentCount||0}}</span>   </a>

            </a-col>

          </a-row>
          <a-row class="markdown-dev"  >
            <v-md-preview-html class="markdown-body" v-contentImags="doChagePreviewUrl" ref="postRef" :include-level="[1,2,3, 4]" :html="postData.contentHtml" preview-class="vuepress-markdown-body"></v-md-preview-html>
            <a-image
                :width="200"
                :style="{ display: 'none' }"
                :preview="{  visible:dataInfo.visible, onVisibleChange: doSetVisible, }"
                :src="dataInfo.previewUrl"  />
          </a-row>

          <blockquote class="single-copyright">
            除特别注明外，本站所有文章均为 <a :href="siteInfo.site_url">{{siteInfo.site_name}}</a> 原创，转载请注明出处来自： <a :href="dataInfo.newSiteUrl+postData.permaLink">{{ dataInfo.newSiteUrl}}{{postData.permaLink}}</a>
            <div class="license-tag"><a href="https://creativecommons.org/licenses/by-sa/4.0/deed.zh" target="_blank"><span class="name">License</span> <span class="type">CC BY-SA 4.0</span>
              以商业目的使用本网站原创内容需获许可，非商业目的使用授权遵循CC BY-NC 4.0
            </a></div>
          </blockquote>
        </a-row>
        <a-row class="single-resources" v-if="postData.resources.length>0">
          <QyPostResources :resources-data="postData.resources"></QyPostResources>
        </a-row>
        <a-row class="single-comments" >
          <QyCommentList :comment-agent-id="postData.commentAgentId" :site-comment-flag="siteInfo.site_comment_flag" :comment-flag="postData.commentFlag"></QyCommentList>
        </a-row>

      </div>
    </a-col>
    <a-col  class="single-right" :xs="{span:0}"  :lg=" { span: 6,offset:1}" >
      <QyPostRightSider></QyPostRightSider>
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
  </a-row>
  <a-skeleton active  v-else/>

</template>

<script setup lang="ts">
import QyPostRightSider from "~/components/QyPostRightSider.vue";
import QyCommentList from "~/components/QyCommentList.vue";
import {ArticleDto} from "~/api/article";
import {
  EyeOutlined,
  MessageOutlined,
} from '@ant-design/icons-vue';
import {reactive, ref, watch} from "vue";
import QyPostResources from "~/components/QyPostResources.vue";
const postRef =  ref();
const props =  defineProps({
  postData: {
    default: {
      commentAgentId: "0",
      commentFlag:false,
    } as ArticleDto,
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

watch(() =>props.siteInfo.site_url,(a)=>{
  dataInfo.newSiteUrl = a;
  if (!a.endsWith("/")) {
    dataInfo.newSiteUrl = a+"/";
  }
} );

watch(() =>postRef.value,(a:any)=>{
  if(!dataInfo.titles.length&&postRef.value) {
    doSetTitleMenuls();
  }
});


const dataInfo = reactive({
  titles: [],
  visible:false,
  previewUrl:"",
  newSiteUrl:"",
  siteCommentFlag:"0",
})
watch(() => postRef.value,(data) => {
  if(!dataInfo.titles.length&&postRef.value) {
    doSetTitleMenuls();
  }
})

const doSetTitleMenuls = () => {
  const anchors = postRef.value.$el.querySelectorAll('h1,h2,h3,h4,h5,h6');
  const titles = Array.from(anchors).filter((title) => !!title.innerText.trim());
  if (!titles.length) {
    dataInfo.titles = [];
    return;
  }

  const hTags = Array.from(new Set(titles.map((title) => title.tagName))).sort();

  dataInfo.titles = titles.map((el) => ({
    title: el.innerText,
    lineIndex: el.getAttribute('data-v-md-line'),
    indent: hTags.indexOf(el.tagName),
  }));

  if (dataInfo.newSiteUrl.length==0) {
    dataInfo.newSiteUrl = props.siteInfo.site_url;
    if (!props.siteInfo.site_url.endsWith("/")) {
      dataInfo.newSiteUrl = props.siteInfo.site_url+"/";
    }
  }

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
.single-right {
  .menusAffix{
    max-height: 400px;
    :deep(.ant-card-body) {
      overflow-y: scroll;
      max-height: 80%;
    }
  }
}

.single-header {
  background: #fff;
  :deep(.ant-card-bordered) {
    background-size: cover;
    background-position: center;
    color: #fff;
    overflow: hidden;
    z-index: 1;
    width: 100%;
    height: 400px;
    .header-wrap {
      position: absolute;
      left: 0;
      width: 100%;
      z-index: 2;
    }
    h1 {
      padding: 16px 0 0;
      margin: 24px 0 0;
      border-top: 1px dotted rgba(255,255,255,.3);
      color: #fff;
      font-weight: 600;
    }
  }
  .ant-card-bordered::before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    content: '';
    background-color: rgba(0,0,0,.55);
  }
}


.header-meta {
  width: 100%;
}
.single-body {
  padding: 20px;
  background: #fff;
  .article-header{
    width: 100%;
  }
}
.markdown-body  :deep(img) {
  margin: 5px 0;
}
.article-header {
  margin-bottom: 30px;

}
.single-copyright{
  border-radius: 3px;
  background: #fcf8e3;
  margin: 20px 0;
  padding: 12px 20px 12px 40px;
  font-size: 0.8rem;
  position: relative;
  color: #000;
  word-break: break-all;
}
.single-comments {
  background: #fff;
  margin-top: 30px;
  padding: 20px;
}
.post-tags {
  display: table-cell;
  padding-right: 40px;
}
.post-meta {
  display: table-cell;
  padding-left: 1px;
  white-space: nowrap;
  vertical-align: top;
  width: 1%;
  a{
    font-size: 1.1rem;
    line-height: 24px;
    padding: 0 5px;
    color: #34495e;
  }
}
@media (max-width: 576px) {
  .post-meta {
    display: block;
    width: 100%;
    margin: 10px 0px;
  }
  .header-card {
    height: 210px;
  }
  .header-wrap {
    // top:0;
    bottom: 0;
    padding: 40px 20px;
    overflow: hidden;
    .h2   {
      font-size: 1.2rem;
      margin: 10px 0 0;
      padding: 10px 0 0;
    }
  }
}
@media (min-width: 577px) {
  .ant-card-bordered {
    .header-wrap {
      bottom: 40px;
      padding-left: 25px;
      .h2   {
        font-size: 2rem;
      }
    }

  }


}
.license-tag {
  margin: 2px 0;
}
.license-tag  .name,
.license-tag .type {
  text-align: center;
  padding: 1px 3px;
  font-size: 0.1rem;
  display: table-cell;
}
.license-tag   .name {
  background-color: #409eff;
  color: #fefefe;
  border: 1px solid #409eff;
  font-weight: 700;

}
.license-tag  .type{
  background-color: #fefefe;
  color: #409eff;
  border: 1px solid #409eff;
}
.markdown-dev {
  width: 100%;
}
.markdown-body{
  overflow: auto;
}
</style>
