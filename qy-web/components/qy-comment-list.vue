<template>
    <a-row>
                 <qy-replies-form      :commentAgentId="agentId" > </qy-replies-form>
        <a-list
            v-if="comments.length"
            :pagination ="pagination" 
            :data-source="comments"
            :header="`${pagination.total} 条评论`"
            item-layout="horizontal"
            >
      <a-list-item slot="renderItem" slot-scope="item, index" class="commentItem"> 
            <a-comment
            :author="item.authorName"
            :avatar="item.avatar"
            :datetime="item.createdDate"
            >
            <span slot="actions"> 
                <a-row>
                <a href="javascript:void(0)"  @click="onShow(index)">回复</a>
                </a-row>
                <qy-replies-form  :ref="repliesForm[index]"   v-show="repliesFormShow[index]"   :commentAgentId="agentId"  :parentCommentId="item.id"> </qy-replies-form>
            </span>
            <p slot="content"> 
                {{item.content}}
            </p>
            <qy-comment-child-list  v-if="item.replyCount>0"  :parentId="item.id"  :commentAgentId="agentId"></qy-comment-child-list>

             </a-comment>
        </a-list-item>
    </a-list>
    </a-row>
</template>

<script >
import Vue from 'vue'
import  QyCommentChildList from '~/components/qy-comment-child-list.vue'
import  QyRepliesForm from '~/components/qy-replies-form.vue'

export default Vue.extend({
    props: {  
        commentAgentId: null
    },
    components: {
        QyCommentChildList,
        QyRepliesForm
    },
    data() {
        return {
              comments: [],
              pagination:{
                  onChange: page => {
                    let _this  = this;
                    _this.list({
                            page: page,
                            size: _this.defPageSize
                    })
                },
              },
              defPageSize: 2,
              agentId: null,
              repliesFormShow: [false],
              repliesForm:["repliesForm0"]
        }
    },
    watch: {
        // commentAgentId(val) {
        //     let _this = this;
        //     _this.agentId = val;
        // }
    },
    mounted() {
           let _this = this;
         _this.agentId = _this.commentAgentId;
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
            _this.$axios.get('comment/' +  _this.agentId, { params: params })
                .then(res => {
                    let resp  = res.data				
                    if(resp.success) {
                        _this.comments = resp.content.list;
                        _this.comments.forEach((e,i)  => { 
                            e.avatar =  'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';
                            Vue.set(_this.repliesFormShow,i, false);
                             _this.repliesForm[i] = "repliesForm"+i; 
                        });
                    }
                    _this.pagination.total =   resp.content.total;
                    _this.pagination.current =   resp.content.page;
                    _this.pagination.pageSize =   resp.content.size; 
          });
        },
        onShow(index) {
            let _this = this;
            let nowFlag =  !_this.repliesFormShow[index] ;
            Vue.set(_this.repliesFormShow, index,nowFlag ); 
            _this.repliesFormShow.forEach((e,i)=>{
                if(i!=index && _this.repliesFormShow[i]  == true) {
                    Vue.set(_this.repliesFormShow, i, false );
                     _this.$refs[_this.repliesForm[i]].resetForm();
                }
            })
            if(!nowFlag) {
                  _this.$refs[_this.repliesForm[index]].resetForm();
            } 

        },
    }
    
})
</script>

<style scoped>
.commentItem {
        line-height: 1;
}
</style>