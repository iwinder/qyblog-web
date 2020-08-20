<template>
     <a-row> 
         <a-row class="single-header"  >
                <a-card    >
                    <!-- <a-row class="header-wrap"> -->
                            <h1 class="h2">{{postData.title}}</h1>
                            <a-row class="header-meta">
                            
                                <span class="meta-date"><time class="entry-date"  :datetime="postData.publishedDateTime" :title="postData.publishedDateTime">{{postData.publishedDateMD }}</time></span>
                                <span class="separator" role="separator">·</span>
                                <span class="meta-user">By/{{postData.author.nickname}}</span>
                                 <span class="separator" role="separator">·</span>
                                <span class="post-meta">
                                    <a class="post-meta-views" href="javascript: void(0)">   <a-icon type="eye" />   <span class="num">{{postData.viewCount}}</span>  </a>
                                    <a class="post-meta-comments" href="javascript: void(0)">    <a-icon type="message" /> <span class="num">{{postData.commentCount}}</span>   </a>
                                </span>
                            </a-row>
                        
                    <!-- </a-row> -->
                </a-card>
        </a-row>
        <a-row class="single-body">
            
            <a-row class="" v-highlight> 
                    <div  class="markdown-body"   v-html="postData.contentHtml"></div>
            </a-row>
        </a-row>
        <a-row class="single-comments"> 
                <qy-comment-list :commentAgentId= "postData.commentAgentId"></qy-comment-list>
        </a-row>
    </a-row>
</template>

<script  >
import Vue from 'vue'
 import  QyCommentList from '~/components/qy-comment-list.vue'

export default Vue.extend({
    components: {
        QyCommentList
    },
      props: { 
          postData: {
              default: {}
          }
      }
})
</script>

<style lang="scss" scoped>
@media (max-width: 480px) {
#main>.post>.single-body>.article-header>.post-meta {
    display: block;
    width: 100%;
    margin-top: 10px;
}
}

</style>

<style lang="scss" scoped>

 

.single-header {
    background: #fff;
    text-align: center
}
.ant-card-bordered {
    // background-size: cover;
    // background-position: center;
    // color: #fff;
    // overflow: hidden;
    // z-index: 1;
    // width: 100%;
    // height: 400px;
    // .header-wrap {
    //     position: absolute;
    //     bottom: 40px;
    //     left: 0;
    //     padding-right: 60px;
    //     padding-left: 25px;
    //     width: 100%;
    //     z-index: 2;
    // }
    h1 {
    padding: 16px 0 0;
    margin: 24px 0 0;
    // border-top: 1px dotted rgba(255,255,255,.3);
    // color: #fff;
    font-weight: 600;
    }
    .h2   {
    font-size: 2rem;
}

}
//  .ant-card-bordered::before {
//         position: absolute;
//         top: 0;
//         bottom: 0;
//         left: 0;
//         right: 0;
//         content: '';
//         background-color: rgba(0,0,0,.55);
//     }
 
.single-body {
    padding: 20px;
    background: #fff;
}
 .markdown-body  /deep/ img {
    margin: 5px 0;
}
.article-header {
        margin-bottom: 30px;
        
}
.single-comments {
        background: #fff;
    margin-top: 30px;
    padding: 20px;
}
.post-tags {
        display: table-cell;
    padding-right: 40px;
}
.post-meta{ 
    padding-left: 1px;
    white-space: nowrap;
    vertical-align: top;
    width: 1%;
    a{
font-size: 0.9rem;
    line-height: 24px;
    padding: 0 5px;
    color: rgba(0, 0, 0, 0.65);
    }
}
</style>