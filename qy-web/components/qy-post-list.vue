<template>
        <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">
    <a-list-item slot="renderItem" key="item.title" slot-scope="item">
        
        <template   slot="extra" style="width:272px"> 
            <template v-if="item.category!=null">
                <nuxt-link :to=" {name:'category-name',  params:{name:item.category.identifier, aid:item.category.id} }"     class="category-tag"> {{item.category.name}} </nuxt-link>
                  <!-- <a href="https://windcoder.com/category/java"  class="category-tag" rel="category tag"> {{item.category.name}}</a> -->
            </template>
            <!-- <template v-else>                
                    <a href="https://windcoder.com/category/java"  class="category-tag" rel="category tag"> 未分类</a>   
            </template> -->
            <!-- <a href="https://windcoder.com/dawenjianfenpianshangchuanjavabanjiandanshixian" > -->
            <nuxt-link  slot="title"  :to="{name:'name',params:{name:item.href, aid:item.id}}" class="img-a">
                            <img
                            width="272px"
                            alt="logo"
                            :src="item.thumbnail"
                        />
                        
                         </nuxt-link>  
        </template>
        <template v-for="{ type, text } in actions" slot="actions">
            <span :key="type">
            <a-icon :type="type" style="margin-right: 8px" />
              
                {{ text }}
            </span>
        </template>

        <a-list-item-meta >
            <template slot="description">
                {{item.author.nickname}} {{item.publishedDateMD}}
            </template>
            <nuxt-link  slot="title"  :to="{name:'name',params:{name:item.href, aid:item.id}}"> {{ item.title }} </nuxt-link>
        </a-list-item-meta>

         <a-row style="margin: 5px 0;">
                <a-tag color="#f50" v-for=" tag in item.tags" :key="tag.id">
                  <nuxt-link :to=" {name:'tag-name',  params:{name:tag.identifier, aid:tag.id} }"> {{tag.name}} </nuxt-link>
                </a-tag>
             
        </a-row> 
        <a-row class="post-summary">   {{ item.content }}...</a-row>
    </a-list-item>
  </a-list>
</template>

<script >
import Vue from 'vue'
export default Vue.extend({
     async  asyncData (context) {
         console.log("listcontext", context);
     },
    props: { 
            pagination: {},
            listData: {
                type: Array,
                default: []
            },
            actions: [
          { type: 'like-o', text: '156' },
          { type: 'message', text: '2' },
        ],

    },
    watch: {

    },
    mounted() {

    },
    data() {
        return {

        }
    },
    
})
</script>

