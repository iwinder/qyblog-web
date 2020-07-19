<template>
        <a-list-item slot="renderItem" key="item.title" slot-scope="item">
                
                <template   slot="extra" style="width:272px"> 
                    <template v-if="item.category!=null">
                        <a href="https://windcoder.com/category/java"  class="category-tag" rel="category tag"> {{item.category.name}}</a>
                    </template>
                    <template v-else>                
                            <a href="https://windcoder.com/category/java"  class="category-tag" rel="category tag"> 未分类</a>   
                    </template>
                    <a href="https://windcoder.com/dawenjianfenpianshangchuanjavabanjiandanshixian" class="img-a">
                                    <img
                                    width="272px"
                                    alt="logo"
                                    :src="item.thumbnail"
                                /></a>
                </template>
                <template v-for="{ type, text } in actions" slot="actions">
                    <span :key="type">
                    <a-icon :type="type" style="margin-right: 8px" />
                    
                        {{ text }}
                    </span>
                </template>

                <a-list-item-meta :description="item.description">
                    <nuxt-link  slot="title"  :to="{name:'name',params:{name:item.href, aid:item.id}}"> {{ item.title }} </nuxt-link>
                </a-list-item-meta>

                <a-row style="margin: 5px 0;">
                        <a-tag color="#f50" v-for=" tag in item.tagStrings" :key="tag">
                        {{tag}}
                        </a-tag>
                    
                </a-row> 
                <a-row>   {{ item.content }} </a-row>
            </a-list-item>
</template>

<script >
import Vue from 'vue'
export default Vue.extend({
     async  asyncData (context) {
         console.log("listcontext", context);
     },
    props: { 
            paginationObj: {},
            listDataObj: {
                type: Array,
                default: []
            },
            afterSubmit: {
                type: Function,
                default: null
            }, 
            afterPageChange: {
                type: Function,
                default: null
            }
    },
    watch: {
        paginationObj(val) {
            // let _this = this;
            // _this.pagination = val;
        },
        listDataObj(val) {
            // let _this = this;
            // _this.listData = val;
        }
    },
    mounted() {
            let _this = this;
            _this.pagination = _this.paginationObj;
             _this.listData = _this.listDataObj;
    },
    data() {
        return {
            listData: [],
            pagination: {},
            actions: [
                    { type: 'like-o', text: '156' },
                    { type: 'message', text: '2' },
            ],
        }
    },
    
})
</script>