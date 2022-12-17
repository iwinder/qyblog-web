<template>
	<view class="page">
		<view class="page__hd">
			<view class="weui-media-box__title_diy">
			<uni-title type="h1" color="#4e7ca1" :title="postData.title"></uni-title>
			 </view>
			<view class="weui-media-box__lable">
				{{postData.nickName}} <uni-dateformat :date="postData.publishedAt"></uni-dateformat> 
			</view>
		</view>
		<div class="v-md-editor-preview"
			  :style="{ 
				'-moz-tab-size': tabSize,
				'-o-tab-size': tabSize
			  }" >
			<view class="vuepress-markdown-body" >
			  	<rich-text :nodes="html"></rich-text>
			</view>
		</div>
		<view class="page__fd"  @click="doClipboard">
			<view> 除特别注明外，本站所有文章均为WindCoder原创，转载请注明出处来自(tip:链接点击可复制)：</view>
			<view >{{sourceUrl}}</view> 
		</view>
	</view>
		
	
</template>

<script lang="ts">  
	import QyConfig from '@/utils/qy-config';  
	// import qyMdPreviewHtmlVue from "../../components/qy-md-preview-html/qy-md-preview-html.vue"
	 // import Prism from 'prismjs'
	 

	export default {
		data () {
		      return {
				tabSize:2,
				previewClass:"vuepress-markdown-body",
		        html: '<div>Hello World!</div>',
				pid:"",
				sourceUrl:"",
				postData: {
					title:"",
					nickName:"",
					publishedAt:"",
					
				}
		      }
		},
		components: { 
			// qyMdPreviewHtmlVue
		},
		onLoad: function (option:any) {
			const that = this;
			that.pid = option.pid;
			if(!that.pid||that.pid.length==0) {
				that.html = "文章未找到";
				return
			}
			that.doGetOne(that.pid)
			// const item = JSON.parse(decodeURIComponent(option.item));
		},
		// #ifdef MP-WEIXIN
		onShareAppMessage: function (res) {
		    return {
			  title: "《"+this.postData.title+"》还不错呦，也推荐给你",
			  path: "/pages/postInfo/index?pid="+this.pid,
		      success: function (res) {
		        // 转发成功
		        wx.reportAnalytics('share', {
		          page: "postInfo",
		          flag: "success"
		        })
		      },
		      fail: function (res) {
		        // 转发失败
		        wx.reportAnalytics('share', {
		          page: "postInfo",
		          flag: "fail"
		
		        })
		      }
		    }
		  },
		  onShareTimeline: function () {
		    return {
		       title: "《"+this.postData.title+"》还不错呦，也推荐给你",
			   query: "pid="+this.pid,
		    }
		 },
		// #endif
		methods: {
			doClipboard:function(e){
				const that = this;
				uni.setClipboardData({
					data: " 原文链接："+that.sourceUrl,
					success: function () {
						console.log('success');
					}
				});
			},
			doGetOne:function(pid:string){
				const that = this; 
				uni.showLoading({
					title: '加载中'
				});
				uni.request({
				    url: QyConfig.apiUrlPrefix+"article/"+pid, 
				    success: (res) => {  
						if(res.statusCode!=200) { 
							console.error("详情数据获取异常："+res.data)
							uni.showToast({
								title: "详情查询失败",
								icon:"error",
								duration: 2000
							});
							return;
						} 
						let info = res.data.data.contentHtml;
						info = info.replace(/<p (?!.*class)+([\s\w"-=\/\.:;]+)*/ig, '<p class="v-md-pre-p" ')
						          .replace(/<pre(.*?class=")/ig, '<pre class="v-md-pre-pre ')
								  .replace(/<code([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/ig, '<code')
								  .replace(/<code([\s\w"=\/\.:;]+)((?:(class="[^"]+")))/ig, '<code')
								  .replace(/<code(\s)+/ig, '<code class="v-md-pre-code" ')
								   .replace(/<img(\s)+/ig, '<img class="v-md-pre-img" ')
								   .replace(/<a(\s)+/ig, '<a class="v-md-pre-a" ') ;
						info = info.replace(/<table(\s)+/ig, '<table class="v-md-pre-table" ')
								   .replace(/<thead/ig, '<thead class="v-md-pre-thead" ')
								   .replace(/<tr/ig, '<tr class="v-md-pre-tr" ')
								   .replace(/<tbody/ig, '<tbody class="v-md-pre-tbody"')
								   .replace(/<td/ig, '<td class="v-md-pre-td"')
								   .replace(/<strong/ig, '<strong class="v-md-pre-strong"')
								   .replace(/<blockquote/ig, '<blockquote class="v-md-pre-blockquote"')
								   .replaceAll(/<th[^(ead)\s]/ig, '<th class="v-md-pre-th">');	
						   
						info = info.replace(/<h1(\s)+/ig, '<h1 class="v-md-pre-h1" ')
								   .replace(/<h2(\s)+/ig, '<h2 class="v-md-pre-h2" ')
								   .replace(/<h3(\s)+/ig, '<h3 class="v-md-pre-h3" ')
								   .replace(/<h4(\s)+/ig, '<h4 class="v-md-pre-h4" ')	   
								   .replace(/<h5(\s)+/ig, '<h5 class="v-md-pre-h5" ')	   
								   .replace(/<h6(\s)+/ig, '<h6 class="v-md-pre-h6" ');
								   
					   info = info.replace(/<details(\s)+/ig, '<div ')
								   .replace(/<\/details>/ig, '</div> ')
									.replace(/<summary>/ig, '<div class="v-md-pre-summary"> ')   
								  .replace(/<\/summary>/ig, '</div>'); 	
						that.html = info;  	 
						that.sourceUrl = QyConfig.baseUrl;
						if(!QyConfig.baseUrl.endsWith("/")) {
							that.sourceUrl +="/";
						}
						that.sourceUrl +=res.data.data.permaLink;
						that.postData.title = res.data.data.title;
						that.postData.nickName = res.data.data.nickName;
						that.postData.publishedAt = res.data.data.publishedAt;
						
				    },
					fail:(err) =>{
						uni.showToast({
							title: '数据获取异常：'+err.errMsg,
							icon:"error",
							duration: 2000
						});
					},
					complete:()=>{
						uni.hideLoading();
					}
				});
			},
		 
				// getWxml:(str:string)=>{
				// 	let content = this.towxml(str,'html',{
				// 		base: 'https://www.xxx.com'
						 
				// 	});
				// }
		}
	}
</script>

<style lang="less">
	 @import url("../../static/css/preview-html.css");
	 @import url("../../static/css/vuepress.css");
	 
	 .page {
		 padding: 15px;
		 background: #fff;
		 .page__hd{ 
			 padding: 0 1.5rem; 
		 }
		  .page__fd{
			margin: 0 1.25rem;
			padding: 1.25rem;
			font-size: 10px; 
			text-overflow: ellipsis; 
			display: -webkit-box;
			-webkit-box-orient: vertical;
			line-height: 17px;
			background: #e0e0e0;
			overflow: hidden;
			word-wrap: break-word;
		  }
	 }
	
 
</style>