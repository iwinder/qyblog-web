<template>
    <a-row>


                <a-list
                v-if="comments.length"
                :data-source="comments"
                :pagination ="pagination" 
                :header="`${pagination.total} 条评论`"
                item-layout="horizontal"
                >
        <a-list-item slot="renderItem" slot-scope="item,index" class="childItem">
                <a-comment
                :author="item.authorName"
                :avatar="item.avatar"
                :datetime="item.createdDate"
                >
                <span slot="actions">
                    
                    <a-row>
                    <a href="javascript:void(0)"  @click="onShow(index)">回复</a>
                    </a-row>
                    <qy-replies-form   v-show="repliesFormChildShow[index]"   :commentAgentId="agentId"  :parentCommentId="item.id"> </qy-replies-form>
                </span>
                <p slot="content"> 
                    {{item.content}}
                </p>
          

                </a-comment>
            </a-list-item>
        </a-list>
    </a-row>
</template>

<script  >
import Vue from 'vue'
import  QyRepliesForm from '~/components/qy-replies-form.vue'

export default Vue.extend({
    props: {  
        parentId: null,
        commentAgentId: null,
      
    },
    components: {
        QyRepliesForm
    },
    data() {
        return {
              comments: [],
              topParentId: null,
             agentId: null,
              defPageSize: 3,
              pagination:  false,
              repliesFormChildShow: [false]
        }
    },
    watch: {
        commentAgentId(val) {
            let _this = this;
            _this.agentId = val;
        }
    },
    mounted() {
        let _this = this;
         _this.agentId = _this.commentAgentId;
         _this.topParentId = _this.parentId;
         _this.initData();
    },
    methods: {
        initData() {
            let _this = this;
            _this.list({
                page: 1,
                size: _this.defPageSize
            });
        },
        list(pageInfo)  {
            let _this = this;
            let params = {
                ...pageInfo
            } ;
            _this.$axios.get('comment/' +  _this.agentId + "/"+ _this.topParentId+"/replies", { params: params })
                .then(res => {
                    let resp  = res.data				
                    if(resp.success) {
                        _this.comments = resp.content.list;
                        _this.comments.forEach((e,i)  => {
                            e.avatar =  'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';
                              Vue.set(_this.repliesFormChildShow,i, false);
                        });
                    }
                    if(resp.content.total  > resp.content.size ) {
                        if (resp.content.page==1) {
                                _this.pagination = {
                                        total:   resp.content.total,
                                        current:  resp.content.page,
                                        pageSize: resp.content.size,
                                        onChange: page => {
                                            let _this  = this;
                                            _this.list({
                                                    page: page,
                                                    size: _this.pagination.pageSize
                                            })
                                         },

                                };
                        }
                        _this.pagination.total = resp.content.total;
                        _this.pagination.current =   resp.content.page;
                        _this.pagination.pageSize =   resp.content.size; 
                    } else {
                        _this.pagination = false;
                    }
   
          });
        },
        onShow(index) {
            let _this = this;
            // let nowFlag =  ;
            Vue.set(_this.repliesFormChildShow, index, !_this.repliesFormChildShow[index] );
            // _this.repliesFormShow[index]=;
            _this.repliesFormChildShow.forEach((e,i)=>{
                if(i!=index && _this.repliesFormChildShow[i]  == true) {
                    Vue.set(_this.repliesFormChildShow, i, false );
                }
            })
            console.log("e------",  _this.repliesFormChildShow[index]== true );

        },
    }
})
</script>
<style scoped>
.childItem {
          line-height: 1;
}
</style>