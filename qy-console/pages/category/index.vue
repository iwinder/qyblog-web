<template>
    <div>
        <a-row>
            <a-col :span="5">
                  <a-directory-tree ref="categoryTree"  :load-data="onLoadData" 
                        :tree-data="treeData" 
                        :replaceFields="replaceTreeFields" 
                        :default-selected-keys="['0']"
                         :default-expanded-keys="['0']"
                        @select="onSelectTree"/>
            </a-col>
            <a-col :span="17 " :offset="1">
                <a-row class="table-operations">
                    <a-col :span="6" :offset="18" style=" margin-top: 5px;">
                        <a-button  type="primary"  @click="add()">
                            新增
                        </a-button>
                        <a-dropdown>
                            <a-menu slot="overlay" @click="handleMenuClick">
                                <a-menu-item key="1">
                                    删除
                                </a-menu-item>
                            </a-menu>
                            <a-button> 批量操作 <a-icon type="down" /> </a-button>
                        </a-dropdown>
                    </a-col>
                </a-row>
                <a-table :columns="columns"
                        :data-source="data"
                        :rowKey = "record => record.id"
                        :pagination="pagination"
                        :loading="loading"
                        :row-selection="{ selectedRowKeys: selectedIds, onChange: onSelectChange }"
                        @change="handleTableChange"
                >

                    <span slot="action" slot-scope="text, record">
                        <nuxt-link :to="{name:'article-id',params:{ id: record.id }}">编辑 </nuxt-link >
                        <a-divider type="vertical" />

                            <a  href="javascript:void(0)"  @click="deleted([record.id])" >删除</a>

                    </span>
                </a-table>
            </a-col>
        </a-row>

          <a-modal v-model="visible"  on-ok="editCategory" :footer="null" @cancel="handleCancel">
              <template slot="title">
                  <template v-if="categoryObj.id">
                      修改分类
                  </template>
                  <template v-else>
                      新增分类
                  </template>
              </template>
                  <a-form-model ref="categoryForm" :model="categoryForm" :rules="rules" v-bind="layout">
                            <a-form-model-item has-feedback label="名称" prop="name">
                                <a-input v-model.number="categoryForm.name" />
                            </a-form-model-item>

                              <a-form-model-item has-feedback label="当前父级" prop="parent">
                                  <a> 
                                      <template v-if="editParentData.id==0" >  无</template>
                                    <template v-else > 
                                         <a-tooltip placement="topLeft" :title="editParentData.namePath" arrow-point-at-center>
                                        {{editParentData.name}}
                                         </a-tooltip>
                                        </template>
                                    </a>
                            </a-form-model-item>

                            <a-form-model-item has-feedback label="选择父级" prop="editParentId">
                                <qy-article-category-tree-select   ref="categoryTreeSelect" :parentTreeObj='editParentData'  :afterSelect="afterSelectTree"></qy-article-category-tree-select>
                            </a-form-model-item>
                            <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                            <a-button type="primary" :loading="editLoading" @click="editCategory">
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
     import  QyArticleCategoryTreeSelect from '~/components/qy-article-category-tree-select.vue';

    Vue.use(FormModel);

    const columns = [
         {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '关键词',
            dataIndex: 'keyWord',
            key: 'keyWord',
        },
        {
            title: ' id路径',
            dataIndex: 'idPath',
            key: 'idPath',
        },
        {
            title: '名称路径',
            dataIndex: 'namePath',
            key: 'namePath',
        },
        {
            title: '显示顺序',
            dataIndex: 'displayOrder',
            key: 'displayOrder',
        },
        {
            title: '父级分类',
            dataIndex: 'parentId',
            key: 'parentId',
        },
        {
            title: '创建者',
            dataIndex: 'createdBy',
            key: 'createdBy',
        },
        {
            title: '更新者',
            dataIndex: 'lastModifiedBy',
            key: 'lastModifiedBy',
        },
        {
            title: '创建时间',
            dataIndex: 'createdDate',
            key: 'createdDate',
        },
        {
            title: '更新时间',
            dataIndex: 'lastModifiedDate',
            key: 'lastModifiedDate',
        },
        {
            title: 'Action',
            key: 'action',
            scopedSlots: { customRender: 'action' },
        },

    ];


    export default Vue.extend({
          components: {
                QyArticleCategoryTreeSelect
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
                treeData: [
                    { name: '文章分类', id: '0' }
                ],
                replaceTreeFields: {
                    children:'children', 
                    title:'name', 
                    key:'id' 
                },
                editLoading: false,
                visible: false,
                rules:  {},
                categoryObj: {},
                layout: {
                    labelCol: { span: 4 },
                    wrapperCol: { span: 14 },
                },
                categoryForm: {
                    name: '',
                    parentId: null
                },
                treeParent: {},
                treeObj: {},
                editParentId: null,
                selectedTreeNode: null,
                selectedTreeData: {},
                editParentData: {}
            };
        },
        mounted() {
            let _this = this;
            // _this.initData();
        },
        methods: {
            initData() {
                let _this = this;
                _this.list({
                    page: 1,
                    size: _this.pagination.pageSize
                });
            },
            list(params) {
                let _this = this;
                _this.loading = true;

                _this.$axios.get('blogCategorys',{ params: params

                }).then(res => {
                    let resp  = res.data
                    _this.data = resp.content;
                    _this.loading = false;
                    _this.selectedIds = [];
                }).catch((response) => {
                    _this.loading = false;
                    console.log("error：", response);
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
            add(obj) {
               let _this = this;
               _this.editParentId = null;
                if(obj) {
                    _this.categoryObj = obj[0];
                    _this.categoryForm.name = _this.categoryObj.name;
                }
                console.log("add selectedTreeData", _this.selectedTreeData)
                 _this.visible = true;
                 _this.editParentData   = _this.selectedTreeData;
            },
            searchForm() {
                let _this = this;
                _this.initData();

            },
            handleMenuClick(e) {
                let _this = this;
                console.log('click', e);
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
                            console.log('OK');
                            _this.$axios.delete("blogCategorys", {data:  ids}).then(res => {
                                console.log("deleted !res", res);
                                if(res.data.success) {
                                    _this.$message.success("删除成功",5);
                                    _this.initData();
                                }
                            }).catch((response) => {
                                console.log("error：", response);
                            });
                        },
                        onCancel() {
                            console.log('Cancel');
                        },
                        class: 'test',
                    });
                }
            },
            onLoadData(treeNode) {
                 console.log('onLoadData info',treeNode);
                let _this = this;
                _this.selectedTreeNode = treeNode;
                _this.selectedTreeData = treeNode.dataRef;
                return new Promise(resolve => {
                     if(treeNode.dataRef.id == 0) {
                          let params = {};
                           treeNode.dataRef.children = [];
                           _this.loadCategoryData(params,function( resp) {
                                if(resp.success) {
                                        treeNode.dataRef.children =   [...resp.content];
                                        _this.treeData = [..._this.treeData];
                                        _this.data = resp.content;
                                    }
                                    resolve();
                                    return;
                           });
                     } else {
                         let params = {
                             parentId: treeNode.dataRef.id 
                         }
                        _this.loadCategoryData(params,function( resp) {
                                if(resp.success) {
                                    treeNode.dataRef.children =   [...resp.content];
                                    _this.treeData = [..._this.treeData];
                                    _this.data = resp.content;
                                 }
                                resolve();
                                return;
                        });
                     }
                })
            },
            loadCategoryData(params, callBack) {
                let _this = this;
                _this.$axios.get('blogCategorys',{ params: params}).then(res => {
                        console.log("treeNode res", res);
                        let resp = res.data;
                        callBack(resp);
                });
            },
            editCategory() {
                 let _this = this;
                  _this.editLoading = true;
                _this.$refs.categoryForm.validate(valid => {
                    if (valid) {
                        _this.categoryObj.name = _this.categoryForm.name;
                        if(_this.editParentId) {
                            _this.categoryObj.parentId = _this.editParentId;
                        }
                        _this.$axios.post('blogCategorys/save', _this.categoryObj).then(res => {
                                _this.editLoading = false;
                                if(res.data.success) {
                                    this.$message.success('保存成功',5);
                                     _this.categoryObj = {}; 
                                     _this.$refs.categoryForm.resetFields();
                                    _this.visible = false;
                                    _this.editParentId = null;
                                    _this.$refs.categoryTreeSelect.treeData = [];
                                    _this.$refs.categoryTreeSelect.value = null;
                                    console.log("  _this.$refs.categoryTree",   _this.$refs.categoryTree);
                                   _this.$refs.categoryTree.loadData (_this.selectedTreeNode);
                                    //   _this.$refs.categoryTree .expand([_this.treeParent.id]);
                                    // _this.initData();
                                }
                        }).catch((response) => {
                                _this.editLoading = false;
                                console.log("error：", response);
                            });
                    } else {
                          _this.editLoading = false;
                        return false;
                    }
                });
            },
            handleCancel() {
                let _this = this;
                 _this.categoryForm= {
                     name: ""
                 };
                _this.$refs.categoryForm.resetFields();
                _this.visible = false;
                _this.categoryObj = {}; 
            },
            onSelectTree(selectedKeys, info) {
                   
                    let _this = this;
                    let params = {};
                    if(selectedKeys[0]==0) {
                        params = {};
                    } else {
                        params.parentId = selectedKeys[0];
                    }

                    _this.selectedTreeNode = info.selectedNodes[0];
                    _this.selectedTreeData = info.selectedNodes[0].dataRef;


                     _this.loadCategoryData(params,function( resp) {
                                if(resp.success) {
                                        _this.data = resp.content;
                                    }
                           }); 
                    _this.treeParent.id = selectedKeys[0];  
            },
            afterSelectTree(id, obj) {
                let _this = this;
                console.log("afterSelectTree", obj);
                _this.editParentId = id;
                _this.editParentData = obj;
            }
        },

    })
</script>

<style scoped>
    .table-operations {
        margin-bottom: 16px;
    }

    .table-operations > button {
        margin-right: 8px;
    }
</style>

