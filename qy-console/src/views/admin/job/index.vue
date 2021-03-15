<template>
    <div>
        <a-row class="table-operations">
           <a-col :xs="{span:24}"  :lg="{ span: 12}" >
              <a-form-model layout="inline" :model="searchFrom"    >
                    <a-form-model-item>
                        <a-input v-model="searchFrom.searchText" placeholder="请输入标题">
                          <a-icon slot="prefix" type="search" style="color:rgba(0,0,0,.25)" />
                        </a-input>
                      </a-form-model-item>
                      <a-form-model-item :wrapper-col="{ span: 14  }">
                            <a-button type="primary"  :loading ="searchLoading"  @click="searchForm('articleForm')">
                                搜索
                            </a-button>
                    </a-form-model-item>
              </a-form-model>
          </a-col>
          <a-col class='table-operations-right' :xs="{span:24}"  :lg="{ span: 8, offset: 3 }" style=" margin-top: 5px;">
            <a-button  type="primary"  @click="add()">
              新增
            </a-button> 
          </a-col>
      </a-row>
        <a-table :columns="columns"
                 :data-source="data"
                 :rowKey = "record => record.jobName + '-' + record.jobGroup "
                :pagination="pagination"
                 :loading="loading"
                 :scroll = "{ x:  800}"
                  :row-selection="{ selectedRowKeys: selectedIds, onChange: onSelectChange }"
                @change="handleTableChange"
                 >

            <a slot="name" slot-scope="text">{{ text }}</a>

           <!-- <span slot="thumbnail" slot-scope="thumbnail">
             <img :src="thumbnail" @error="defImg(this)"  style=" height: 62px;   max-width: 100%;">
           </span> -->
          <!-- <span slot="published" slot-scope="published">
              <template v-if="published"> 已发布 </template> 
              <template v-else> 未发布 </template> 
          </span> -->
            <span slot="cronFlag" slot-scope="cronFlag">
                <template v-if="cronFlag">
                    Cron任务类型
                </template>
                <template v-else>
                    简单任务类型
                </template>
            </span>

            <span slot="action" slot-scope="text, record"> 
                <a  href="javascript:void(0)"  @click="deleted([record.id])" >详情 </a>
                <a-divider type="vertical" />
                <a  href="javascript:void(0)"  @click="deleted([record.id])" >编辑</a>
                <a-divider type="vertical" /> 
                <a  href="javascript:void(0)"  @click="deleted([record.id])" >删除</a> 
            </span>
        </a-table>

        <a-modal v-model="visible"  on-ok="editData" :footer="null" @cancel="handleCancel" :maskClosable="false">
              <template slot="title">
                  <template v-if="dataForm.jobName"> 
                        编辑任务
                  </template>
                   <template v-else> 
                       新增任务
                  </template>
              </template>
                  <a-form-model ref="dataForm" :model="dataForm" :rules="rules" layout="vertical">
                            <a-form-model-item has-feedback label="任务名称" prop="jobName">
                                   <a-input v-model="dataForm.jobName"   placeholder="任务名称" /> 
                            </a-form-model-item>
                          <a-form-model-item has-feedback label="任务组" prop="jobGroup">
                                   <a-input v-model="dataForm.jobGroup"   placeholder="任务组" /> 
                            </a-form-model-item>
                          <a-form-model-item has-feedback label="任务描述" prop="description">
                                <a-input v-model="dataForm.description"   placeholder="任务描述" /> 
                          </a-form-model-item>
                          <a-form-model-item has-feedback label="任务执行类" prop="jobClass">
                                   <a-input v-model="dataForm.jobClass"   placeholder="任务执行类" /> 
                          </a-form-model-item>
                           <a-form-model-item has-feedback label="任务类型" prop="cronFlag">
                                <a-radio-group  v-model="dataForm.cronFlag"  :default-value="true">
                                    <a-radio :value="true"  name="cronFlag">  Cron任务类型 </a-radio>
                                    <a-radio :value="false"  name="cronFlag">  简单任务类型 </a-radio>
                                </a-radio-group>
                            </a-form-model-item>
                             <template v-if="dataForm.cronFlag"> 
                                <a-form-model-item has-feedback label="任务运行时间表达式" prop="cronExpression">
                                        <a-input v-model="dataForm.cronExpression"   placeholder="任务运行时间表达式" /> 
                                </a-form-model-item>
                             </template>
                            <template v-else>
                                <a-form-model-item has-feedback label="开始时间" prop="startTime">
                                        <a-input v-model="dataForm.startTime"   /> 
                                </a-form-model-item>
                            <a-form-model-item has-feedback label="结束时间" prop="endTime">
                                    <a-input v-model="dataForm.endTime"   /> 
                                </a-form-model-item>
                                <a-form-model-item has-feedback label="任务循环间隔" prop="interval">
                                    <a-input v-model="dataForm.interval"  placeholder="单位：分钟" /> 
                                </a-form-model-item>
                            </template>
                            <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                            <a-button type="primary" :loading="editLoading" @click="editData">
                                保存
                            </a-button>
                            <a-button style="margin-left: 10px" @click="handleCancel">
                                取消
                            </a-button>
                            </a-form-model-item>
                        </a-form-model>
         </a-modal>
    </div>
</template>

<script  >
import Vue from 'vue'
import { FormModel } from 'ant-design-vue'; 
import { mapState } from 'vuex'
// import VueDraggableResizable from 'vue-draggable-resizable';
Vue.use(FormModel); 




const columns = [ 
            {
                title: '任务名称',
                dataIndex: 'jobName',
                key: 'jobName',
            },
            {
                title: '任务组',
                dataIndex: 'jobGroup',
                key: 'jobGroup',
            }, 
            {
                title: '任务描述',
                dataIndex: 'description',
                key: 'description', 
            },  
            {
                title: '任务状态',
                dataIndex: 'status',
                key: 'status',
                scopedSlots: { customRender: 'status' },
            },
            {
                title: '任务类型',
                key: 'cronFlag',
                dataIndex: 'cronFlag',
                scopedSlots: { customRender: 'cronFlag' },
            },
            {
                title: '操作',
                key: 'action',
                scopedSlots: { customRender: 'action' },
            },
        ];
 

export default Vue.extend({
      components: {
        // VueDraggableResizable,
    },
     data() {
        return {
            columns,
            loading: false,
            searchLoading: false,
            searchFrom: {
              searchText: null
            },
            selectedIds:[],
            data: [],
            pagination: {
              pageSize: 10,
              current: 1,
              total: 0
            },
            editLoading: false,
            visible: false,
            jobModelType: 1,
          dataForm: {
              jobName: '',
              jobGroup: '',
              description: '',
              jobClass: '',
              startTime: null,
              interval: 0,
              endTime: null,
              cronExpression: '',
              cronFlag: true
          },
          siteUrl:'',
          rules:  {
                jobName: [
                    {required: true,whitespace: true, message: "任务名称不可为空",  trigger:"change"}
                ],
                jobClass: [
                    {required: true,whitespace: true, message: "任务执行类不可为空",  trigger:"change"}
                ], 
          },
        };
    },
   computed: {
        ...mapState({
        site: state => state.siteInfo.siteInfo
        })
    },
    mounted() {
      let _this = this; 
      _this.siteUrl = _this.site.site_url.endsWith('/')?_this.site.site_url:_this.site.site_url+'/';
      _this.initData();
    },
    methods: {
        initData() {
          let _this = this;
          _this.list({
              page: 1,
              size: _this.pagination.pageSize
          });
      },
      list(pageInfo) {
        let _this = this;
        _this.loading = true;
        let params = {
          searchText:  _this.searchFrom.searchText,
          ...pageInfo
        }
        if (QyTool.isEmpty(params.searchText)) {
          delete params.searchText;
        }

       
        _this.$axios.get('/admin/jobInfo',{ params: params
            
          }).then(res => {
            let resp  = res.data				
            _this.data = resp.content.list; 
            _this.pagination.total =   resp.content.total;
            _this.pagination.current =   resp.content.page;
            _this.pagination.pageSize =   resp.content.size;
            _this.loading = false;
            _this.selectedIds = [];
          });
      },
      handleTableChange(pagination, filters, sorter ) {
          const pager = { ...this.pagination };
          pager.current = pagination.current;
          this.pagination = pager;
          this.list({
                size: pagination.pageSize,
                page: pagination.current,
           })
      },
      add() {
        let _this = this;
        _this.jobInfo
        _this.importb(); 
      },
      importb() {
            let _this = this; 
            _this.visible = true;
      },
      handleCancel() {
                let _this = this; 
                _this.$refs.dataForm.resetFields();
                _this.visible = false; 
      },
      searchForm() {
        let _this = this;
        _this.initData();

      },
      handleMenuClick(e) {
        let _this = this;
        if(e.key === "1") {
          if( _this.selectedIds &&  _this.selectedIds.length>0) {
            _this.deleted(_this.selectedIds );
          } else {
              this.$message.warning("请选择要删除项",5); 
              return false;
          }
           
        }
      },
      onSelectChange(selectedRowKeys) {
        let _this = this;
          _this.selectedIds = selectedRowKeys;
      },   
      confirmDeleted(e) {
          let _this = this;
          _this.deleted(e);
      },
       deleted(ids) {
        let _this = this;
      if(ids) {
          this.$confirm({
              title: '确认删除?',
              onOk() { 
                _this.$axios.delete("/admin/articles", {data:  ids}).then(res => {
                  if(res.data.success) {
                    _this.$message.success("删除成功",5); 
                    _this.initData();
                  }
                });
              },
              onCancel() { 
              },
              class: 'test',
            });
        }
      },
      editData() {  
          let  _this = this;
            _this.editLoading = true;
            _this.$refs.dataForm.validate(valid => {
                if (valid) {
                      _this.$axios.post('/admin/jobInfo/save',_this.dataForm).then(res => { 
                              _this.editLoading= false;
                              if(res.data.success) { 
                                  _this.$message.destroy();
                                   _this.$message.success('导入成功',5);
                              }
                      }).catch((response) => {
                              _this.editLoading = false;
                              _this.$message.destroy();
                              _this.$message.error('导入失败: ' + response,5);
                      }); 
                } else {
                    _this.editLoading= false;
                    return false;
                }
            });
      },
      refreshLink() {
        let _this = this;
         _this.$axios.post("/admin/articles/refreshLink").then(res => {
          if(res.data.success) {
            _this.$message.success("更新成功",5);  
          }
        });
      },
      handleSystemMenuClick(e) {
        let _this = this;
        if(e.key === "1") {
          _this.importb(); 
        } else if(e.key === "2") {
          _this.refreshLink();
        }
      },
      defImg() {
        let _this = this;
        console.log("img event", event);
        let defImg = _this.siteUrl+'img/thumb/'+ QyTool.randomNum(1,32)+'.jpg';
        let img =   event.target || event.srcElement;
        img.src = defImg;
        console.log("img event2", event);
        img.onerror = null; //防止闪图
           console.log("img event3", event);
      },
    },

})
</script>

<style lang="scss" scoped>
.table-operations {
  margin-bottom: 16px;
}

.table-operations  {
  button {
    margin-right: 8px;
  }
}
</style>

