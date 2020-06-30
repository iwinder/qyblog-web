<template>
    <a-tree-select ref="treeSelect"
            tree-data-simple-mode
             v-model="value"
            style="width: 100%"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            :tree-data="treeData"
            :replaceFields="replaceTreeFields" 
            placeholder="Please select"
            :expandedKeys = "expandedKeys"
            :load-data="onLoadData"
            @select	= "onSelectTree"
        />
</template>

<script>
export default {
    props: { 
       selectedId:null,
       parentTreeObj: null,
        afterSelect: {
            type: Function,
            default: null
        }, 
        
    },
    data() {
        return {
            value: null,
                treeData: [
                ],
                replaceTreeFields: {
                    children:'children', 
                    value: 'id',
                    title:'name', 
                    key:'id' 
                },
                expandedKeys:[]
        }
    },
    watch: {
        parentTreeObj(val) {
             console.log("parentObj", val);
            let _this = this;
            _this.initTreeData(val);
        },
        value(value) {
            console.log(value);
        },
  },
   mounted() {
       let _this = this;
       console.log("mounted parentTreeObj", _this.parentTreeObj)
       _this.initTreeData(_this.parentTreeObj);
   },
    methods: {
        initList() {
            let _this = this;
            _this.$axios.get('blogCategorys',{ params: {}}).then(res => {
                    console.log("treeNode res", res);
                    let resp = res.data;
                    if(resp.success) {
                        // treeNode.dataRef.children =   
                        // console.log("treeNode 2", treeNode.dataRef);
                        this.treeData =[...resp.content];
                        console.log("treeNode 3",  this.treeData);
                     
                    }
            });
        },
        initTreeData(obj){
            let _this = this;
            if(obj.id == 0) {
                this.treeData = [...obj.children]
            } else {
                this.treeData =  [obj]
                // _this.expandedKeys = [obj.id]
                _this.value = obj.id;
                _this.onLoadData({
                    dataRef: {
                        id:0
                    }
                });
            }
            console.log('initTreeData', _this.expandedKeys);
        },
        onLoadData(treeNode) {
            let _this = this;
            return new Promise(resolve => {
                console.log("treeNode", treeNode.dataRef);
                if(!treeNode || treeNode.dataRef.id == 0) {
                    let params = {};
                    treeNode.dataRef.children = [];
                     _this.loadCategoryData(params, function(resp) {
                            if(resp.success) {
                                    treeNode.dataRef.children =   [...resp.content];
                                    _this.treeData = [ ... resp.content];
                                }
                            resolve();
                            return;
                     });
                } else {
                    let params = {
                        parentId: treeNode.dataRef.id 
                    }
                     _this.loadCategoryData(params, function(resp) {
                            if(resp.success) {
                                treeNode.dataRef.children =   [...resp.content];
                                _this.treeData = [..._this.treeData];
                            }
                            resolve();
                            return;
                     })
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
        onSelectTree(selectedKeys, info) {
                    console.log('selected', selectedKeys, info);
                    let _this = this; 
                    _this.afterSelect(selectedKeys,  info.dataRef);
                    _this.value = undefined;
                   
                    // this.$refs.treeSelect.value = null;
                    // let params = {};
                    // if(selectedKeys[0]==0) {
                    //     params = {};
                    // } else {
                    //     params.parentId = selectedKeys[0];
                    // }
                  
                    // _this.list(params);
        }

    },
}
</script>