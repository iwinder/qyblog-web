<template>
    <a-row class="content">
        <a-col :xs="{span:24}"  :lg="{ span: 16}" > 
                  <a-row class="card-class"  >
                       <a-card    :style="{backgroundImage:'url(' + postData.thumbnail + ')'}">
                           <!-- <template     slot="cover"> 
                               
                            <a-card-meta :title="postData.title">
                                <template slot="description">
                                    蜜汁超酸奶/2020-07-08
                                </template>
                                </a-card-meta>
                           </template> -->

                           <a-row class="header-wrap">
                                    <a-row class="header-meta">
                                        <span class="meta-category"><a href="https://windcoder.com/category/java" rel="category tag">Java笔记</a></span>
                                        <span class="separator" role="separator">·</span>
                                        <span class="meta-date"><time class="entry-date"  :datetime="postData.publishedDateTime" :title="postData.publishedDateTime">{{postData.publishedDateMD }}</time></span>
                                         <span class="separator" role="separator">·</span>
                                         <span class="meta-user">By/蜜汁炒酸奶</span>
                                    </a-row>
                                    <h1 class="h2">{{postData.title}}</h1>
                            </a-row>
                            </a-card>
                  </a-row>
                  <a-row></a-row>
        </a-col>

        <a-col :xs="{span:24}"  :lg="{  span: 5, offset: 7 }" > 

        </a-col>
    </a-row>
</template>

<script>
import moment from 'moment';
export default {
     async  asyncData (context) { 
         console.log(context)
         let id = context.params.aid;
        let name = context.params.name;
         let url = "articles/";
            if  (id) {
                    url = url  +id;
              } else {
                   url = "articles/name/" + name ;
              }
          let[res1] = await Promise.all([ 
           
        context.$axios.get(url).then(res => {
            let resp  = res.data				
            let result = {};
            if(resp.success) { 
              result  = resp.content;
            }
            console.log("result", result);
             result.publishedDateMD =   moment(result.publishedDate).format('YYYY-MM-DD');
              result.publishedDateTime =   moment(result.publishedDate).format('YYYY-MM-DD HH:mm:ss');
            //   console.log("restempTimeult", tempTime);
            // result.publishedDateMD =  context. moment(result.publishedDate, 'YYYY/MM/DD');
          
            return result;

          })
         ])
          return{
              postData : res1,  
        }

     },
     data() {
         return {
             postData: {}
         }
     },
    methods: {
    moment,
  },
}
</script>

<style lang="scss" scoped>
.content {
  padding: 20px 15px;
    width: 85%;
    margin-right: auto;
    margin-left: auto;
    background: #fff;
}
.card-class {
height: 400px;
}

.ant-card-bordered {
    background-size: cover;
    background-position: center;
    color: #fff;
    overflow: hidden;
    z-index: 1;
    width: 100%;
    height: 400px;
    .header-wrap {
        position: absolute;
        bottom: 40px;
        left: 0;
        padding-right: 60px;
        padding-left: 25px;
        width: 100%;
        z-index: 2;
    }
    h1 {
    padding: 16px 0 0;
    margin: 24px 0 0;
    border-top: 1px dotted rgba(255,255,255,.3);
    color: #fff;
    font-weight: 600;
    }
    .h2   {
    font-size: 2rem;
}

}
 .ant-card-bordered::before {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        content: '';
        background-color: rgba(0,0,0,.55);
    }
 .card-class /deep/  .ant-card-cover {
    height: 100%;
    overflow: hidden;
}
</style>