<template>
        <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">
    <a-list-item slot="renderItem" key="item.title" slot-scope="item">
        
        <template   slot="extra" style="width:272px"> 
            <template v-if="item.category!=null">
                <nuxt-link :to=" {name:'category-name',  params:{name:item.category.identifier, aid:item.category.id} }"     class="category-tag"> {{item.category.name}} </nuxt-link>
            </template>
            <nuxt-link  slot="title"  :to="{name:'name',params:{name:item.href, aid:item.id}}" class="img-a">
                            <img
                            width="272px"
                            alt="logo"
                            :src="item.thumbnail"
                        />
                         </nuxt-link>  
        </template>

    <template v-for="{ type, text } in actions" slot="actions">
        <span :key="type" v-if="type==='view-o'">
          <a-icon type="eye" style="margin-right: 8px" />
          {{ item.viewCount || text }} 
        </span>
          <span :key="type" v-else-if="type==='comment-o'">
                <a-icon type="message" style="margin-right: 8px" />
          {{ item.commentCount || text }} 
        </span>
      </template>
        <!-- <template   slot="actions">
            <span key="view-o">
                    <a-icon type="eye" style="margin-right: 8px" />
                        {{ item.viewCount }} 
            </span> 
            <span key="comment-o">
                        <a-icon type="message" style="margin-right: 8px" />
                            {{ item.commentCount }}  
            </span>
        </template> -->

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
           actions: {
                  type: Array,
                 default: function() {
                     return  [
                            { type: 'view-o', text: '0' }, 
                            { type: 'comment-o', text: '0' },
                        ];
                 }
           }   

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

