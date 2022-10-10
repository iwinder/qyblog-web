<template>
    <LayTableInfo>
      <template #searchForm>
        <a-form :model="searchForm"    ref="formRef" v-bind="formItemLayout">
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item  label="媒体库名称"  name="username">
                <a-input v-model:value="searchForm.name" placeholder="请输入关键字"></a-input>
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
            <a-button  type="primary"  @click="doAdd()">
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
        <a-table :columns="FileLibTypeColumns"
                 :data-source="listInfo.items"
                 :rowKey = "record => record.id"
                 :pagination="listInfo.pageInfo"
                 :scroll = "{ x:  800}"
                 :loading="listInfo.loading"
                 :row-selection="rowSelection"
                 @change="doTableChange"
        >

          <template #bodyCell="{ text, record, index, column}">
            <template v-if="column.dataIndex === 'statusFlag'">
              <template v-if="text==1">启用</template>
              <template v-else>未启用</template>
            </template>
            <template v-if="column.dataIndex === 'type'">
              <template v-if="text=='SYSTEM'">系统</template>
              <template v-else-if="text=='USER'">自定义</template>
              <template v-else>未知</template>
            </template>
            <template v-if="column.dataIndex === 'action'">
              <a  href="javascript:void(0)"  @click="doUpdate(record)">配置</a>
              <template v-if="record.type!='SYSTEM'">
                <a-divider type="vertical" />
                <a-popconfirm title="确定要删除所选项吗？"  @confirm="doDeleted([record.id])">
                  <a  href="javascript:void(0)"  >删除</a>
                </a-popconfirm>
              </template>
            </template>

          </template>

        </a-table>
      </template>
    </LayTableInfo>
    <a-modal v-model:visible="modalInfo.visible" title="新增媒体库类型">
      <template #title>
      </template>
      <a-form ref="modelForm" :model="modalInfo.dataInfo" :footer="null" @cancel="doCancel">
        <a-form-item has-feedback label="媒体库名称" name="name"
                     :rules="[{ required: true, message: 'Please input your 媒体库名称!' }]"
        >
          <a-input v-model:value="modalInfo.dataInfo.name" placeholder="请输入媒体库名称"></a-input>
        </a-form-item>
        <a-form-item has-feedback label="类型标识" name="identifier"
                     :rules="[{ required: true, message: 'Please input your 媒体库名称!' }]"
        >
          <a-input v-model:value="modalInfo.dataInfo.identifier" placeholder="类型标识"></a-input>
        </a-form-item>
        <a-form-item
            label="启用"
            name="statusFlag"
            :rules="[{ required: true, message: 'Please input your email!' }]"
        >
          <a-switch v-model:checked="modalInfo.dataInfo.statusFlag" checked-children="是" :checked-value="switchObj.checkedValue" un-checked-children="否" :un-checked-value="switchObj.unCheckedValue"/>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" :loading="modalInfo.editLoading" @click="doEditData">
            保存
          </a-button>
          <a-button style="margin-left: 10px" @click="doCancel">
            取消
          </a-button>
        </a-form-item>
      </a-form>
    </a-modal>
</template>

<script setup lang="ts">
  import LayTableInfo from '@/components/LayTableInfo.vue'
  import {FileLibTypeColumns} from "@/config/tableConfigs/qy_file_lib_type"
  import {onMounted, reactive, ref} from "vue";
  import {useRouter} from "vue-router";
  import {FormInstance, message, notification, TableProps} from "ant-design-vue";
  import {DEFAULT_PAGESIZE} from "@/utils/constants";
  import {PageInfo} from "@/api/common";
  import {FileLibType, TypeAdd, TypeDelete, TypeList} from "@/api/file_lib_config";
  import {useParamsStore} from "@/store/params";
  const state = useParamsStore()
  const searchForm = reactive({ name: "",
  });
  const router = useRouter();
  const formRef = ref<FormInstance>();
  const modelForm = ref<FormInstance>();
  type Key = string | number;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const switchObj = {
    checkedValue: 1,
    unCheckedValue: 2,
  }

  const listInfo = reactive({
    pageInfo: {
      current: 1,
      pageSize: DEFAULT_PAGESIZE,
      total: 0,
      pages: 1,
      firstFlag: true,
      LastFlag: false,
    },
    items:[],
    selectedIds:[],
    loading: false,
    searchLoading: false,
  });
  const modalInfo = reactive({
    visible:false,
    editLoading: false,
    dataInfo:{
      id:"",
      name:"",
      type: "",
      identifier: 0,
      statusFlag:2
    }
  })
  const rowSelection: TableProps['rowSelection'] = reactive({
    // selectedRowKeys:  listInfo.selectedIds,
    onChange: (selectedRowKeys: Key[]) => {
        listInfo.selectedIds = selectedRowKeys;
    },
    getCheckboxProps: (record: FileLibType) => ({
      disabled: record.type === 'SYSTEM', // Column configuration not to be checked
      // name: record.name,
    }),
  });
  onMounted(() => {
    doSearchForm();
  })


  function doAdd() {
    modalInfo.visible = true;
  }
  function doUpdate(data:FileLibType) {
    state.fileLibType = data;
    router.push({name:"fileLib-config-update",params:{id:data.id}});
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
    TypeDelete(ids).then(res=>{
      notification.success({
        message: '成功',
        description: "删除"
      });
      initData();
    }).catch(err=>{console.error("Delete error",err);});
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
      ...searchForm,
      ...pageInfo
    }
    await TypeList(param).then(res => {
      if(res.pageInfo.current<=0) {
        res.pageInfo.current = 1;
      }
      listInfo.pageInfo = res.pageInfo;
      listInfo.items =  res.items;

    }).catch(err => { console.error("List error",err);
    }).finally(() => {
      listInfo.loading = false;
      listInfo.searchLoading = false;
    });
  }

  function doTableChange(pagination:any, filters:any, sorter:any) {
    doList(pagination);
  }
  function doSearchForm() {
    listInfo.searchLoading = true;
    initData();
  }
  // function doSelectChange(selectedRowKeys: Key[]) {
  //   listInfo.selectedIds = selectedRowKeys;
  // }
  function doEditData() {
    modalInfo.editLoading = true;
    const param = {
      ...modalInfo.dataInfo
    };

    TypeAdd(param).then(res=>{
      notification.success({
        message: '成功',
        description: "保存成功"
      });
      doCancel();
      initData();
    }).catch(err=>{

    }).finally(()=>{
      modalInfo.editLoading = false;
    });



  }
  function doCancel() {
    modelForm.value.resetFields();
    modalInfo.visible = false;
    modalInfo.dataInfo.id = "";

  }
</script>

<style scoped>

</style>