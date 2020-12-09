<template>
    <div>
        <a-row>
            <a-page-header
                style="border: 1px solid rgb(235, 237, 240)"
                :title="'媒体库'"
                sub-title="This is a subtitle" 
            />
            <a-tabs default-active-key="1" @change="tabChange">
                <a-tab-pane   :tab="type.name" v-for=" type in typeList" :key="type.id">
                   
                </a-tab-pane>
                <!-- <a-tab-pane key="2" tab="详细配置" force-render>
                   
                </a-tab-pane>  -->
            </a-tabs>
        </a-row>
    </div>
</template>

<script  >
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            typeList:{},
        }
        
    },
    mounted() {
        let _this  = this;
        _this.initTypeList();
    },
    methods: {
        initTypeList() {
            let _this = this;
            _this.typeLoading = true;
            let params = {
                status:  true, 
            }  
            _this.$axios.get('/admin/fileLibType/allList',
                { params: params}).then(res => {
                let resp  = res.data
                _this.typeList = resp.content;
                _this.typeLoading = false; 
            }).catch((response) => {
                _this.typeLoading = false; 
            });
        },
        tabChange(e) {
            console.log("tabChange",e);
        }
    }
})
</script>

<style lang="scss" scoped>

</style>