<template>
  <LayTableInfo>
    <template #searchForm>
      <a-form :model="searchForm"    ref="formRef" v-bind="formItemLayout">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item  label="关键字"  name="searchText">
              <a-input v-model:value="searchForm.searchText" placeholder="请输入关键字"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8" style="text-align: right">
            <a-button type="primary" html-type="submit"  :loading ="listInfo.searchLoading"  @click="doSearchForm">搜索</a-button>
            <a-button style="margin: 0 8px" @click="()=>formRef.resetFields()">重置</a-button>
          </a-col>
        </a-row>

      </a-form>
    </template>
    <template #operations>
      <a-row >
        <a-col  :xs="{span:24}"  :lg="{ span: 24 }" style=" margin-top: 5px;">
          <a-button  type="primary"  @click="doAdd('0')">
            新增
          </a-button>
          <a-dropdown>
            <template #overlay>
              <a-menu @click="doMenuClick">
                <a-menu-item key="1">
                  删除
                </a-menu-item>
              </a-menu>
            </template>
            <a-button>
              批量操作
              <DownOutlined />
            </a-button>
          </a-dropdown>
        </a-col>
      </a-row>
    </template>
    <template #content>
      <a-table :columns="ArticleColumns"
               :data-source="listInfo.items"
               :rowKey = "record => record.id"
               :pagination="listInfo.pageInfo"
               :scroll = "{ x:  800}"
               :loading="listInfo.loading"
               :row-selection="{ selectedRowKeys:  listInfo.selectedIds, onChange: doSelectChange }"
               @change="doTableChange"
      >

        <template #bodyCell="{ text, record, index, column}">
          <template v-if="column.dataIndex === 'thumbnail'">
            <a-image
                :width="100"
                :height="100"
                :src="text"
                :fallback="DEF_IMG_ERR"
            />
          </template>
          <template v-if="column.dataIndex === 'published'">
            <template v-if="text"> 已发布 </template>
            <template v-else> 未发布 </template>
          </template>
          <template v-if="column.dataIndex === 'tagStrings'">
            <template  v-for="(tag,idx) in text" >
              <a-tag  :color="record.tagColors[idx]"> {{tag}}</a-tag>
            </template>

          </template>

          <template v-if="column.dataIndex === 'action'">
            <template v-if="record.type==1">
              <a  href="javascript:void(0)"  @click="doAdd(record.id)">添加子菜单</a>
              <!--              <router-link :to="{name:'Article-add',params:{ pid: record.id }}">添加子菜单 </router-link>-->
              <a-divider type="vertical" />
            </template>
            <router-link :to="{name:'article-update',params:{ id: record.id }}">编辑 </router-link>
            <a-divider type="vertical" />
            <a-popconfirm title="确定要删除所选项吗？"  @confirm="doDeleted([record.id])">
              <a  href="javascript:void(0)"  >删除</a>
            </a-popconfirm>
          </template>

        </template>

      </a-table>
    </template>
  </LayTableInfo>
</template>

<script setup lang="ts">
import LayTableInfo from '@/components/LayTableInfo.vue'
import {onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {PageInfo} from "@/api/common";
import {ArticleType, Delete, List} from "@/api/article";
import {ArticleColumns} from "@/config/tableConfigs/qy_article";
import {FormInstance, message, notification} from "ant-design-vue";
import {useParamsStore} from "@/store/params";
import {DEFAULT_PAGESIZE,DEF_IMG_ERR} from "@/utils/constants";
import {GetRandomColor} from "@/utils/util";
type Key = string | number;
const router = useRouter();
const state = useParamsStore()
const formRef = ref<FormInstance>();
const listInfo = reactive({
  pageInfo: {
    current: 1,
    pageSize: DEFAULT_PAGESIZE,
    total: 0,
    pages: 1,
    firstFlag: true,
    LastFlag: false,
  },
  items:[] as ArticleType[],
  selectedIds:[],
  loading: false,
  searchLoading: false,
});
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};
const searchForm = reactive({ searchText: "",
});
onMounted(() => {
  initData();
})
function doAdd(pid:string) {
  state.menusParentId = pid
  router.push("/blog/article/add");
}
function doSearchForm() {
  listInfo.searchLoading = true;
  initData();
}
function initData() {
  doList({
    current: 1,
    pageSize: listInfo.pageInfo.pageSize,
  });
}
async function doList(pageInfo:PageInfo) {
  listInfo.loading = true;
  var param = {
    ...pageInfo,
    ...searchForm,
    atype:1,
  }
  await List(param).then((res:any)=>{
    if(res.pageInfo.current<=0) {
      res.pageInfo.current = 1;
    }
    listInfo.pageInfo = res.pageInfo;
    listInfo.items =  res.items;
    listInfo.items.forEach(e=>{
      const tags = e.tagStrings;
      if (tags) {
        e.tagColors=[]
        for (let i=0;i<tags.length;i++){
          e.tagColors[i]= GetRandomColor();
        }
      }
    });
    console.log(" listInfo.items", listInfo.items)

  }).catch(err => { console.error("List error",err);
  }).finally(() => {
    listInfo.loading = false;
    listInfo.searchLoading = false;
  });
}

function doTableChange(pagination:any, filters:any, sorter:any) {
  doList(pagination);
}

function doMenuClick(e:any) {
  if (e.key=="1") {
    if( listInfo.selectedIds &&  listInfo.selectedIds.length>0) {
      doDeleted(listInfo.selectedIds);
    } else {
      message.warning('请选择要删除项',5);
    }
  }
}

function doDeleted(ids:string[]){
  Delete(ids).then(res=>{
    notification.success({
      message: '成功',
      description: "删除"
    });
    initData();
  }).catch(err=>{console.error("Delete error",err);});
}

function doSelectChange(selectedRowKeys: Key[]) {
  listInfo.selectedIds = selectedRowKeys;
}


</script>

<style scoped>
.ant-tag {
  margin-top: 8px;
  margin-bottom: 8px;
}
</style>
