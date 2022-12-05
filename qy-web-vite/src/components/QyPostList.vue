<template>
  <a-skeleton :loading="dataLoading" active avatar v-if="dataLoading&&listData.length==0">

  </a-skeleton>
  <a-list v-else item-layout="vertical" size="large" :pagination="dataInfo.pagination" :data-source="listData">
    <template #renderItem="{ item , index}">
      <a-list-item key="item.title">

        <template #extra v-if="!dataLoading"  style="width:272px">
          <template v-if="item.category.identifier!=null&&item.category.identifier.length>0">
            <router-link :to=" {name:'category-name',  params:{name:item.category.identifier} }"     class="category-tag"> {{item.category.name}} </router-link>
          </template>
          <router-link  :to="{name:'home-name',params:{name:item.permaLink}}" class="img-a">
<!--            <a-image-->
<!--                width="272"-->
<!--                height="170"-->
<!--                alt="logo"-->
<!--                :preview="false"-->
<!--                :src="item.thumbnail"-->
<!--                :fallback="GetRandomDefImg()"-->
<!--                class="post-list-img lazy show"-->
<!--            />-->

            <img v-if="!dataLoading"
                width="272"
                height="170"
                alt="logo"
                v-lazy="item.thumbnail"
                class="post-list-img lazy show"
            />
          </router-link>
        </template>

        <template v-if="!dataLoading" #actions>
          <template v-for="{ type, text } in actions">
            <span :key="`type`+index" v-if="type==='view-o'">
              <EyeOutlined style="margin-right: 8px"/>
            {{ item.viewCount || text }}
            </span>
            <span  :key="`type`+index" v-else-if="type==='comment-o'">
              <MessageOutlined  style="margin-right: 8px"/>
            {{ item.commentCount || text }}
            </span>
          </template>


        </template>

        <a-list-item-meta >
          <template #description>
            {{item.nickName}} {{ moment(item.publishedAt).format('YYYY-MM-DD')}}
          </template>
          <template #title>
            <router-link  :to="{name:'home-name',params:{name:item.permaLink}}" >
              <template v-if="item.statusFlag==3">
                私密：
              </template>  {{item.title }}
            </router-link>
          </template>

        </a-list-item-meta>
        <a-row style="margin: 5px 0;"  v-if="!dataLoading">
          <template  v-for="(tag,idx) in item.tags" >
            <a-tag  :color="item.tagColors[idx]">
              <router-link :to=" {name:'tag-name',  params:{name:tag.identifier} }"> {{tag.name}}</router-link>
            </a-tag>
          </template>
        </a-row>
        <a-row class="post-summary"  v-if="!dataLoading">   {{ item.summary }}...</a-row>

        <a-skeleton :loading="dataLoading" active avatar>
          <a-list-item-meta  >
            <template #title>
            </template>
            <template #avatar> </template>
          </a-list-item-meta>
        </a-skeleton>
      </a-list-item>
    </template>
  </a-list>
</template>

<script setup lang="ts">
import {ArticleType} from "@/api/article";
import {
  EyeOutlined,
  MessageOutlined,
} from '@ant-design/icons-vue';
import {computed, onMounted, reactive, watch} from "vue";
import * as moment_ from 'moment';

import {PageInfo} from "@/api/common";
const moment = moment_;
const emit = defineEmits(['onAfterPageChange'])
const props =  defineProps({
  listData: {
    type: Array,
    default:  [{},{}] as ArticleType [],
  },
  dataLoading: {
    default:true,
  },
  actions: {
    type: Array,
    default: function() {
      return  [
        { type: 'view-o', text: '0' },
        { type: 'comment-o', text: '0' },
      ];
    }
  },
})



onMounted(() => {
  console.log("listData",props.listData)
  console.log("dataLoading",props.dataLoading)
})
const dataInfo = reactive({
  pagination:{
    onChange: (page: number) => {
      console.log(page);
      emit('onAfterPageChange',  page);
    },
    pageSize: 3,
    total:0,
    current:1,
  },
})
const doChangePage = (page:PageInfo) => {
  dataInfo.pagination.pageSize = page.pageSize;
  dataInfo.pagination.total = page.total as number;
  dataInfo.pagination.current = page.current;
}
defineExpose({doChangePage})
</script>

<style scoped lang="less">
:deep(.post-list-img){
  -webkit-transition: all .3s ease;
  -moz-transition: all .3s ease;
  -ms-transition: all .3s ease;
  -o-transition: all .3s ease;
  transition: all .3s ease;
}
:deep(.post-list-img:hover){
  transform: scale(1.2);
  /*transition: all 2s ease-in-out 0s;*/
}

img.lazy{
    opacity: .3;
    -webkit-transform: scale(.9);
    -moz-transform: scale(.9);
    transform: scale(.9);
    -webkit-transition: all ease-in-out .3s;
    -moz-transition: all ease-in-out .3s;
    transition: all ease-in-out .3s;
    -webkit-perspective-origin: top center;
    -moz-perspective-origin: top center;
    perspective-origin: top center;
}
img.show{
  opacity: 1;
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  transform: scale(1);
}


</style>