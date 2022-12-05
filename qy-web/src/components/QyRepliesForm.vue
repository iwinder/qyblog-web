<template>
  <div style="width: 100%;">
    <a-row class="commentClose"  v-if="parentId==null||parentId.length==0||parentId=='0'">  <h2>参与评论</h2> </a-row>
    <a-comment>
      <template #avatar  v-if="!dataInfo.isInitForm">
        <a-avatar :src="DEF_AVATER_PIX+dataInfo.commentForm.authotImg" :alt="dataInfo.commentForm.memberName" />
      </template>
      <template #content>
        <a-form
            ref="commentForm" :model="dataInfo.commentForm"
            :label-col="{ span: 0 }"
            :wrapper-col="{ span: 24 }"
            :rules="rules"
            autocomplete="off"
            @finish="doSubmit"
            @finishFailed="doFinishFailed">
          <a-row  v-if="dataInfo.isInitForm" :gutter="[24,2]">
            <a-col   :xs="{span:24}"  :lg="{ span: 8}">
              <a-form-item
                  label=""
                  name="memberName"
                  has-feedback >
                <a-input v-model:value="dataInfo.commentForm.memberName" placeholder="昵称" autocomplete="off"  />
              </a-form-item>
            </a-col>
            <a-col   :xs="{span:24}"  :lg="{ span: 8}">
              <a-form-item
                  label=""
                  name="email"
                  has-feedback >
                <a-input v-model:value="dataInfo.commentForm.email" placeholder="邮箱" autocomplete="off" />
              </a-form-item>
            </a-col>
            <a-col   :xs="{span:24}"  :lg="{ span: 8}">
              <a-form-item
                  label=""
                  name="url"
                  has-feedback >
                <a-input v-model:value="dataInfo.commentForm.url" placeholder="网址" autocomplete="off" />
              </a-form-item>
            </a-col>
          </a-row>

          <a-row  v-else style="margin-bottom: 10px;">
            <a-col>
              <a-tooltip  placement="topLeft"  :title="dataInfo.commentForm.email" arrow-point-at-center>
                {{ dataInfo.commentForm.memberName}}
              </a-tooltip>
              <a-button type="dashed" @click="doOpneEditLink()" size="small">
                编辑
              </a-button>
            </a-col>
          </a-row>
          <a-row class="formCOntent">
            <a-col   :xs="{span:24}"  :lg="{ span: 24}">
              <a-form-item
                  :labelCol="{span: 0}"
                  :wrapperCol="{span: 24}"
                  name="content"
                  has-feedback >
                <a-textarea v-model:value="dataInfo.commentForm.content"  :auto-size="{ minRows: 2, maxRows: 5 }" :placeholder="dataInfo.placeholderText" autocomplete="off" />
              </a-form-item>
            </a-col>
            <a-col   :xs="{span:24}"  :lg="{ span: 24}">
              <a-form-item >
                <a-button html-type="submit" :loading="dataInfo.submitting" type="primary"  >
                  回复
                </a-button>

              </a-form-item>
            </a-col>
          </a-row>


        </a-form>
      </template>
    </a-comment>
  </div>
</template>

<script setup lang="ts">

import {onBeforeMount, onMounted, reactive} from "vue";
import {useCommentInfo} from "@/store/comment";
import type { Rule } from 'ant-design-vue/es/form';
import {ChangeStrByMd5} from "@/utils/util";
import {Add, CommentDto} from "@/api/comment";
import {notification} from "ant-design-vue";
import {DEF_AVATER_PIX} from "@/utils/constants"
const commentStore = useCommentInfo()
const emit = defineEmits(['onSaveAfter'])
const props =  defineProps({
  parentId: {
    default: "",
  },
  agentId:{
    default: "",
  },
  replyIdx: {
    default: -1,
  },
  repliesUser: {
    default:""
  }
})
onBeforeMount(() => {
  console.log("ddd user",commentStore.userInfo)
 const user = commentStore.userInfo;
 if (user.memberName.length>0) {
   dataInfo.commentForm.authotImg = user.authotImg;
   dataInfo.commentForm.email = user.email;
   dataInfo.commentForm.memberName = user.memberName;
   dataInfo.commentForm.url = user.url;
   dataInfo.isInitForm = false;
 }
})
const dataInfo = reactive({
  commentForm: {
    memberName:"",
    email:"",
    url:"",
    content:"" ,
    authotImg:"",
  },
  isInitForm:true,
  submitting:false,
  placeholderText:"评论内容",
})
const rules:  Record<string, Rule[]> = {
  memberName: [{ required: true, message: '昵称不可为空!', trigger: 'change' }],
  email: [
      {required: true,whitespace: true, message: "邮箱不可为空",  trigger:"change"},
    {pattern:new RegExp(/^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,6}$/ig), message: "邮箱格式错误"}
  ],
  content: [{ required: true, message: '内容不可为空!', trigger: 'change' }],
}
const doOpneEditLink = () => {
  dataInfo.isInitForm = true;
}
const doSubmit = (values: any) => {
  dataInfo.commentForm.authotImg = ChangeStrByMd5( dataInfo.commentForm.email);
  doSave(dataInfo.commentForm)
}
const doSave = (param:CommentDto) => {
  param.agentId = props.agentId;
  param.parentId = props.parentId;
  if (!param.parentId||param.parentId.length==0) {
    param.parentId = "0";
  }
  Add(param).then(res=>{
    notification.success({
      message: '评论提交成功',
      description: "若未及时展示，可能需要等待管理员审核。"
    });
    if (commentStore.userInfo.memberName.length == 0) {
      commentStore.userInfo.authotImg =   dataInfo.commentForm.authotImg;
      commentStore.userInfo.email =   dataInfo.commentForm.email;
      commentStore.userInfo.url =   dataInfo.commentForm.url;
      commentStore.userInfo.memberName =   dataInfo.commentForm.memberName;

    }
    dataInfo.commentForm.content = "";
    dataInfo.isInitForm = false;
    emit('onSaveAfter',props.replyIdx);
  }).catch(err=>{}).finally(()=>{

  })
}
const doFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
}
const ResetForm = () => {
  dataInfo.commentForm.content = "";

}
defineExpose({ResetForm})
</script>

<style scoped lang="less">
.commentClose {
  width: 100%;
}
.formCOntent {
  width: 100%;
}
</style>