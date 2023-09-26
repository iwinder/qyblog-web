<template>
  <div style="  margin: 20px 0;">
    <a-form ref="formRef" :model="dataForm"   :layout="'vertical'">
      <a-row>
        <a-col :xs="24"   :lg="24"   >
          <a-form-item
              label=""
              name="title"
              :rules="[{ required: true, message: 'Please input your title!' }]"
          >
            <a-input v-model:value="dataForm.title" placeholder="添加标题"  @blur="doInitPermaLink"/>
          </a-form-item>
          <a-form-item
              label=""
              name="permaLink">
            <QyPostLinkEdit :permaLink="dataForm.permaLink" @onAfterSubmit="doSavePermaLink"></QyPostLinkEdit>
          </a-form-item>
          <a-form-item
              label=""
              name="content"
          >
            <v-md-editor v-model="dataForm.content"
                         :disabled-menus="[]"
                         @upload-image="doUploadImage"
                         height="400px"></v-md-editor>
          </a-form-item>
<!--          <a-form-item-->
<!--              label="封面"-->
<!--              name="thumbnail"-->
<!--          >-->
<!--            <a-input v-model:value="dataForm.thumbnail"   name="thumbnail" placeholder="添加标题"/>-->
<!--          </a-form-item>-->
<!--          <a-form-item-->
<!--              label=""-->
<!--              name="thumbnaila"-->
<!--          >-->
<!--            <a-upload-->
<!--                v-model:file-list="formInfo.fileList"-->
<!--                list-type="picture-card"-->
<!--                class="avatar-uploader"-->
<!--                action="/api/admin/v1/file/upload"-->
<!--                :before-upload="doThumbnailBeforeUpload"-->
<!--                @change="doThumbnailUploadChange"-->
<!--                @preview="doThumbPreview"-->
<!--            >-->
<!--              <div v-if="formInfo.fileList.length < 1">-->
<!--                <plus-outlined />-->
<!--                <div style="margin-top: 8px">Upload</div>-->
<!--              </div>-->
<!--            </a-upload>-->
<!--          </a-form-item>-->
<!--          <a-form-item-->
<!--              label="标签"-->
<!--              name="tags"-->
<!--              extra="下拉框第一行为当前输入值。如果有搜索结果，将从第二行开始展示。"-->
<!--          >-->
<!--            <a-select v-model:value="dataForm.tagStrings"   show-search mode="tags"-->
<!--                      placeholder="选择文章标签"-->
<!--                      :field-names="{ label: 'name', value: 'name' }"-->
<!--                      :default-active-first-option="false"-->
<!--                      :show-arrow="false"-->
<!--                      :filter-option="false"-->
<!--                      :options="formInfo.tagsOptions"-->
<!--                      @search="doTagsSearch"-->
<!--                      @change="doTagsChange"></a-select>-->
<!--          </a-form-item>-->
<!--          <a-form-item-->
<!--              label="选择所属分类"-->
<!--              name="parentId"-->
<!--          >-->
<!--            <a-tree-select-->
<!--                v-model:value="dataForm.categoryId"-->
<!--                style="width: 100%"-->
<!--                show-search-->
<!--                placeholder="选择所属分类"-->
<!--                :field-names="{ label: 'name', value: 'id' }"-->
<!--                :tree-data="formInfo.options"-->
<!--                @select="doCategorySelect"-->
<!--            >-->
<!--            </a-tree-select>-->
<!--          </a-form-item>-->
          <a-row type="flex" justify="start">
            <a-col :span="4">
              <a-form-item
                  label="发布"
                  name="published"
              >
                <a-switch v-model:checked="dataForm.published" checked-children="是"   un-checked-children="否" />
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item
                  label="允许评论"
                  name="commentFlag"
              >
                <a-switch v-model:checked="dataForm.commentFlag" checked-children="是"   un-checked-children="否" />
              </a-form-item>
            </a-col>
          </a-row>
<!--          <a-form-item-->
<!--              label="规范链接"-->
<!--              name="canonicalLink"-->

<!--          >-->
<!--            <a-input v-model:value="dataForm.canonicalLink" placeholder=""/>-->
<!--            <div slot="extra">-->
<!--              <ol>-->
<!--                <li>留空默认当前链接</li>-->
<!--                <li>原创文章无需填写，转载文章可填写转载地址</li>-->
<!--              </ol>-->
<!--            </div>-->

<!--          </a-form-item>-->
          <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" html-type="submit"
                      :loading="formState.saveBtn"
                      @click="doSave">保存</a-button>
            <a-button  :loading="formState.saveBtn"
                       @click="doCancel">取消</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
  <a-modal :visible="formInfo.previewVisible" title="预览封面" :footer="null" @cancel="doPreviewCancel">
    <img alt="example" style="width: 100%" :src="formInfo.previewImage" />
  </a-modal>
</template>

<script setup lang="ts">

import {computed, onMounted, reactive, ref} from "vue";
import {FormInstance, message, UploadChangeParam, UploadProps} from "ant-design-vue";
import {GetOne, ArticleType, InitPermaLink} from "@/api/article";
import {CategoryType, List} from "@/api/category";
import {List as TagList, TagsType} from "@/api/tags";
import QyPostLinkEdit from "@/components/QyPostLinkEdit.vue";
import VMdEditor, { xss }  from '@kangc/v-md-editor/lib/codemirror-editor';
import {Upload} from "@/api/file_lib_config";
import {UploadFile} from "ant-design-vue";
const formRef = ref<FormInstance>();
const emit = defineEmits(['onAfterSubmit','onAfterCancel'])
const dataForm = reactive<ArticleType>({
  id:"",
  title:"",
  permaLink:"",
  canonicalLink:"",
  summary: "",
  thumbnail:"",
  password:"" ,
  statusFlag:1,
  atype:2 ,
  categoryId: "0",
  commentAgentId:"0"  ,
  published:true ,
  content:"" ,
  contentHtml:"",
  publishedAt:"",
  nickName:""  ,
  tagStrings: [],
  commentFlag:true,
});



const formInfo = reactive({
  options:[] as CategoryType[],
  tagsOptions:[],
  fileList:[] as UploadFile[],
  loading:false,
  thumbnail:"",
  oldCategoryId:"",
  imageNum:0,
  previewImage:"",
  previewVisible:false,

});
const formState = reactive({ saveBtn: false,

});
onMounted(() => {
  initCategoryList();
})
const switchObj = {
  checkedValue: 2,
  unCheckedValue: 1,
}
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const doSave = () => {
  formState.saveBtn = true;
  dataForm.contentHtml = xss.process(VMdEditor.vMdParser.themeConfig.markdownParser.render(dataForm.content));
  if (dataForm.categoryId == undefined) {
    if (formInfo.options.length>0) {
      dataForm.categoryId = formInfo.options[0].id;
      dataForm.categoryName = formInfo.options[0].name;
    }
  }
  const param = {
    ...dataForm
  };
  emit('onAfterSubmit', param);
}
const initCategoryList = async () => {
  List({
    current:0,
    parentId:"0",
  }).then((res:any)=>{
    formInfo.options = res.items;
  }).catch(err=>{})
}
const InitData = async (oid:string) => {
  GetOne(oid).then((res:any)=>{
    const  data = res.data;
    dataForm.id = data.id;
    dataForm.title = data.title;
    dataForm.permaLink = data.permaLink;
    dataForm.canonicalLink = data.canonicalLink;
    dataForm.summary = data.summary;
    dataForm.thumbnail = data.thumbnail;
    dataForm.password = data.password;
    dataForm.statusFlag = data.statusFlag;
    dataForm.atype = data.atype;
    dataForm.categoryId = data.categoryId;
    dataForm.commentAgentId = data.commentAgentId;
    dataForm.published = data.published;
    dataForm.content = data.content;
    dataForm.contentHtml = data.contentHtml;
    dataForm.tagStrings = data.tagStrings;
    formInfo.oldCategoryId = data.categoryId;
    dataForm.commentFlag = data.commentFlag;
    if (dataForm.thumbnail) {
      setFileList(dataForm.thumbnail);
    }

  }).catch(err=>{})
}

const doCancel = () => {
  emit('onAfterCancel');
}
const doSavePermaLink = (val:string) => {
  dataForm.permaLink = val;
}
const doTagsSearch = (val: string) => {
  TagList({
    current:0,
    name:val,
  }).then((res:any)=>{
    formInfo.tagsOptions = res.items;
  }).catch(err=>{})
}
const doTagsChange = (value:string[], option:TagsType[]) => {
  dataForm.tagStrings = value;
}


const doInitPermaLink = () => {
  if (dataForm.title&&dataForm.title.length>0&&(!dataForm.permaLink||dataForm.permaLink.length==0)){
    InitPermaLink(dataForm.title).then((res:any)=>{
      dataForm.permaLink = res.permaLink;
    }).catch(err=>{})
  }
}

const doThumbPreview = () => {
  formInfo.previewImage = dataForm.thumbnail;
  formInfo.previewVisible = true;
}
const doPreviewCancel = () => {
  formInfo.previewVisible = false;
}
const doThumbnailUploadChange = (info: UploadChangeParam) => {
  if (info.file.status === 'uploading') {
    formInfo.loading = true;
    return;
  }
  if (info.file.status === 'done') {
    // Get this url from response in real world.
    // dataForm.thumbnail = res.DefUrl;
    dataForm.thumbnail =info.file.response.DefUrl;
    formInfo.loading = false;
    setFileList(dataForm.thumbnail);
    // getBase64(info.file.originFileObj, (base64Url: string) => {
    //   imageUrl.value = base64Url;
    //
    // });
  }
  if (info.file.status === 'error') {
    formInfo.loading = false;
    message.error('upload error');
  }
};

const doThumbnailBeforeUpload = (file: UploadProps['fileList'][number]) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG file!');
  }
  // const isLt2M = file.size / 1024 / 1024 < 2;
  // if (!isLt2M) {
  //   message.error('Image must smaller than 2MB!');
  // }
  return isJpgOrPng ;
};

const doCategorySelect = (value:string, node:CategoryType, extra:any) => {
  if (node) {
    dataForm.categoryName = node.name;
  }
}

const doUploadImage = (event:any, insertImage:any, files:any) => {
  var formdata = new FormData();
  formdata.append('file', files[0]);
  Upload(formdata).then((res:any)=>{
    insertImage({
      url:res.DefUrl,
      desc: res.OriginFileName,
      // width: 'auto',
      // height: 'auto',
    });
    formInfo.imageNum++;
    if (formInfo.imageNum==1&&(!dataForm.thumbnail||dataForm.thumbnail=="")) {
      dataForm.thumbnail = res.DefUrl;
      setFileList(dataForm.thumbnail);
    }
  }).catch(err=>{})
}
function setFileList(url:string) {
  formInfo.fileList = [{
    uid: '-1',
    name: 'image.png',
    status: 'done',
    url: url,
  }];
}
defineExpose({formState, dataForm,InitData});
</script>

<style scoped>

</style>
