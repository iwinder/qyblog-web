<template>
  <div style="  margin: 20px 0;">
    <a-form ref="formRef" :model="dataForm"   v-bind="formItemLayout">
      <a-row>
        <a-col :xs="24"   :lg="{ span: 15, offset: 4 }"  >
          <a-form-item
              label="展示名称"
              name="name"
              :rules="[{ required: true, message: 'Please input your name!' }]"
          >
            <a-input v-model:value="dataForm.name" />
          </a-form-item>
          <a-form-item
              label="标签页名称"
              name="breadcrumbName"
          >
            <a-input v-model:value="dataForm.breadcrumbName"   placeholder="不填时默认与【展示名称】相同"/>
          </a-form-item>
          <a-form-item
              label="路由Name"
              name="identifier"
              :rules="[{ required: true, message: '唯一英文字符串' }]"
          >
            <a-input v-model:value="dataForm.identifier" placeholder="唯一英文字符串"/>
          </a-form-item>
          <a-form-item
              label="路由Path"
              name="path"
              :rules="[{ required: true, message: 'Please input your nickname!' }]"
          >
            <a-input v-model:value="dataForm.path" />
          </a-form-item>
          <a-form-item
              label="路由重定向地址"
              name="redirect"
          >
            <a-input v-model:value="dataForm.redirect" placeholder=""/>
          </a-form-item>
          <a-form-item
              label="文件路径"
              name="component"
          >
            <a-input v-model:value="dataForm.component" :disabled="dataForm.redirect!==''" placeholder="页面：/view/xxx/xxx.vue"/>
          </a-form-item>
          <a-form-item
              label="隐藏"
              name="statusFlag"
          >
            <a-switch v-model:checked="dataForm.statusFlag" checked-children="是" :checked-value="switchObj.checkedValue" un-checked-children="否" :un-checked-value="switchObj.unCheckedValue"/>
          </a-form-item>
          <a-form-item
              label="图标"
              name="icon"
          >
            <a-select
                v-model:value="iconSelect.selected"
                style="width: 100%"
                show-search
                placeholder="选择图标"
                :field-names="{ label: 'name', value: 'value' }"
                :options="iconSelect.options"
                @change="doIconChange"
            >

              <template #option="{ value , name }">
                <span role="img" :aria-label="value"><component :is="value" /></span>
                &nbsp;&nbsp;{{ name }}
              </template>

              <template #suffixIcon><component :is="iconSelect.selected" /></template>
            </a-select>
          </a-form-item>
          <a-form-item
              label="菜单类型"
              name="type"
          >
            <a-select
                v-model:value="typeSelect.selected"
                style="width: 100%"
                show-search
                placeholder="选择菜单类型"
                :field-names="{ label: 'name', value: 'value' }"
                :options="typeSelect.options"
                @change="doTypeChange"
            >
            </a-select>
          </a-form-item>
          <a-form-item
              label="排序"
              name="sort"
          >
            <a-input-number v-model:value="dataForm.sort" />
          </a-form-item>
          <a-form-item
              label="父级菜单"
              name="parentId"
          >
            <a-tree-select
                v-model:value="parentSelect.selected"
                style="width: 100%"
                show-search
                :disabled="!dataForm.id"
                placeholder="选择父级菜单"
                :field-names="{ label: 'name', value: 'id' }"
                :tree-data="parentSelect.options"
                @change="doParentChange"
            >
            </a-tree-select>
          </a-form-item>
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
</template>

<script setup lang="ts">

import {computed, onMounted, reactive, ref} from "vue";
import {FormInstance} from "ant-design-vue";
import {GetOne, MenusAdminType} from "@/api/menus_admin";
import {List} from "@/api/menus_admin";
import {MenusAdminTypeOptions} from "@/config/tableConfigs/qy_menus_admin";
import {constantIconList} from "@/config/icons.config";
import {useParamsStore} from "@/store/params";
const emit = defineEmits(['onAfterSubmit','onAfterCancel'])
const formRef = ref<FormInstance>();
const state = useParamsStore()
const dataForm = reactive<MenusAdminType>({
  id:"",
  path: "",
  redirect: "",
  name: "",
  identifier: "",
  component: "",
  sort: 0,
  breadcrumbName: "",
  icon: "",
  type: 1,
  parentId:state.menusParentId,
  statusFlag:1,
});
const  newData:MenusAdminType = {
  id:"0",
  name:"根目录",
  children:[]
};
const iconSelect = reactive({ selected: "AccountBookOutlined",
  options:constantIconList

});
const typeSelect = reactive({ selected: 1,
  options:MenusAdminTypeOptions

});
const parentSelect = reactive({ selected: state.menusParentId,
  options:[]

});
const formState = reactive({ saveBtn: false,

});
onMounted(() => {
   initMenusList();
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
  const param = {
    ...dataForm
  };
  emit('onAfterSubmit', param);
}
const initMenusList = async () => {
  List({
    current:0,
    type:1,
    parentId:"0",
    hasChildren: true
  }).then((res:any)=>{
    newData.children = newData.children.concat(res.items)
    parentSelect.options = [newData];
  }).catch(err=>{})
}
const InitData = async (oid:string) => {
    GetOne(oid).then(res=>{
      const  data = res.data;
      dataForm.id = data.id;
      dataForm.path = data.path;
      dataForm.name = data.name;
      dataForm.identifier = data.identifier;
      dataForm.component = data.component;
      dataForm.sort = data.sort;
      dataForm.breadcrumbName = data.breadcrumbName;
      dataForm.icon = data.icon;
      dataForm.type = data.type;
      dataForm.parentId = data.parentId;
      dataForm.statusFlag = data.statusFlag;
      dataForm.redirect = data.redirect;
      // dataForm.email = data.email;
      // dataForm.avatar = data.avatar;
      // dataForm.statusFlag = data.statusFlag;
      // dataForm.roles = data.roles;
      if (dataForm.icon!=null&&dataForm.icon.length>0) {
        iconSelect.selected =dataForm.icon
      }
      if (dataForm.type) {
        typeSelect.selected = dataForm.type;
      }
      if (dataForm.parentId) {
        parentSelect.selected = dataForm.parentId;
      }

    }).catch(err=>{})
}
const doIconChange = (value:string, option:any) => {
  dataForm.icon=value;
}
const doTypeChange = (value:number, option:any) => {
  dataForm.type=value;
}
const doParentChange = (value:string, option:any) => {
  dataForm.parentId=value;
}
const doCancel = () => {
  emit('onAfterCancel');
}
defineExpose({formState, dataForm,InitData});
</script>

<style scoped>

</style>
