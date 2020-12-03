<template>
    <a-row>
                 <qy-replies-form  ref="repliesTopForm"       :commentAgentId="agentId"  :afterSubmit="repliesFormAfterSubmit"> </qy-replies-form>
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
                <qy-replies-form  :ref="repliesForm[index]"   v-show="repliesFormShow[index]"   :repliesIndex="repliesIndex" :afterSubmit="repliesChildFormAfterSubmit"  :commentAgentId="agentId"  :parentCommentId="item.id"> </qy-replies-form>
            </span>
            <p slot="content"> 
{{item.content}}
            </p>
            <qy-comment-child-list  v-show="item.replyCount>0"   :ref="repliesChildList[index]"   :parentId="item.id"  :commentAgentId="agentId"  :afteReplieShow="parentReplieChange"></qy-comment-child-list>

             </a-comment>
        </a-list-item>
    </a-list>
    </a-row>
</template>

<script >
import Vue from 'vue'
import  QyCommentChildList from '~/components/qy-comment-child-list.vue'
import  QyRepliesForm from '~/components/qy-replies-form.vue'
import   md5 from 'js-md5'
import { Comment} from 'ant-design-vue';
Vue.use( Comment);
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
                    _this.repliesChildList = ["repliesChildList0"];
                    _this.comments = [];
                    _this.list({
                            page: page,
                            size: _this.defPageSize
                    })
                },
              },
              repliesIndex: null,
              defPageSize: 10,
              agentId: null,
              repliesFormShow: [false],
              repliesChildList:["repliesChildList0"],
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
            _this.$axios.get('/web/comment/' +  _this.agentId, { params: params })
                .then(res => {
                    let resp  = res.data;
                    if(resp.success) {
                        _this.comments = resp.content.list;
                        _this.comments.forEach((e,i)  => { 
                            // e.avatar =  'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';
                             if(e.user && e.user.avatar) {
                                e.avatar =  e.user.avatar;
                            } else {
                                  e.avatar =  '//sdn.geekzu.org/avatar/'+e.authorEmail;
                            }
                            Vue.set(_this.repliesFormShow,i, false);
                             _this.repliesForm[i] = "repliesForm" + i; 
                             _this.repliesChildList[i] = "repliesChildList" + i;
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
                if(i!=index && e == true) {
                    Vue.set(_this.repliesFormShow, i, false );
                     _this.$refs[_this.repliesForm[i]].resetForm();
                }
                if(nowFlag) {
                    _this.$refs[_this.repliesChildList[i]].initChildRepliesForm(); 
                    _this.repliesIndex = index;
                }
            })
            if(!nowFlag) {
                  _this.$refs[_this.repliesForm[index]].resetForm();
                 
            } 

        },
        parentReplieChange(falg) {
            let _this = this;
            if(falg) {
                _this.repliesFormShow.forEach((e,i)=>{
                    if( e == true) {
                        Vue.set(_this.repliesFormShow, i, false );
                        _this.$refs[_this.repliesForm[i]].resetForm();
                    }
                })
            }
        },
        repliesFormAfterSubmit(params) {
            let _this  = this;
            _this.$refs.repliesTopForm.resetForm();
            _this.initData();

        },
        repliesChildFormAfterSubmit(index) {
            let _this = this;
            if(_this.comments[index].replyCount ==0) {
                _this.comments[index].replyCount  = 1;
            }
              _this.$refs[_this.repliesChildList[index]].initData(); 
              _this.onShow(index);
        },

    }
    
})
</script>

<style scoped>
.commentItem {
        line-height: 1;
}
 
</style>