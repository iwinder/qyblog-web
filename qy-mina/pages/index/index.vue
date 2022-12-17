<template>
	<view class="container">
		<view class="header">
			 <uni-search-bar placeholder="搜索" v-model="searchText"
			 clearButton="auto" bgColor="#FFFFFF" @cancel="doCancel" @confirm="doSearch" />
		</view>
		<view class="listRow">
			<uni-row>
				<uni-list>
					<navigator v-for="(item,idx) in items" :key="item.permaLink" :url="'/pages/postInfo/index?pid='+item.permaLink" class="qy-media-box"     hover-class="weui-cell_active">
						 <uni-list-item direction="column"> 
								<template v-slot:header>
									<view class="slot-box item-header">
										<view class="item-header-category">{{item.category?item.category.name:"默认分类"}}</view>
										<image class="item-header-image" lazy-load="true" :src="item.thumbnail" mode="scaleToFill"></image>
									</view> 
								</template>
								<template v-slot:body>
										<view class="item-body-title">
												<uni-title type="h2" color="#4e7ca1" :title="item.title"></uni-title>
										</view>
								
									<view class="qy-media-date">
										<uni-row >
											<uni-col :span="19">
												{{item.nickName}} <uni-dateformat :date="item.publishedAt"></uni-dateformat> 
											</uni-col>
											<uni-col :span="3" :offset="1" >
												<view class="item-header-count">
													<uni-icons type="eye" size="16"></uni-icons>
													<text class="uni-text">{{item.viewCount}}</text>
												</view>
																							</uni-col>
										</uni-row> 
									</view>
									
								</template>
							<template v-slot:footer>
								<text class="item-desc">
									{{item.summary}}
								
								</text>
							</template>
						</uni-list-item>
					</navigator> 
					<uni-load-more  v-if="items.length==0" :status="status" :content-text="contentText" />
				</uni-list>
			</uni-row>
		</view>
	</view>
</template>

<script lang="ts">
	import { ArticleDto } from '../../api/article';
	import { PageInfo } from '../../api/common';
	import QyConfig from '../../utils/qy-config';
	import {GetRandomColor,GetRandomDefImg} from '../../utils/qy-util';
	export default {
		data() {
			return {
				searchText: '', 
				items:[] as ArticleDto[],
				status: 'noMore',
				statusTypes: [{
								value: 'more',
								text: '加载前',
								checked: true
							}, {
								value: 'loading',
								text: '加载中',
								checked: false
							}, {
								value: 'noMore',
								text: '没有更多',
								checked: false
							}],
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				pageInfo: {
					current:1,
					pageSize:QyConfig.defaultPageSize,
					lastFlag:false,
				} as PageInfo
			}
		},
		
		onLoad: function (options) {  
				const that = this;
				that.searchText="";
				that.doInit();
		},
		onPullDownRefresh() { 
			const that = this;  
			that.doInit().finally(()=>{
				uni.stopPullDownRefresh();
			});
			
		},
		onReachBottom() {
			const that = this;
			if(that.pageInfo.lastFlag) {
				uni.showToast({
					title: "暂无更多数据",
					duration: 2000
				})
				return;
			}
			that.pageInfo.current++;
			that.doList({current:that.pageInfo.current,pageSize:that.pageInfo.pageSize})
		},
		// #ifdef MP-WEIXIN
		onShareAppMessage: function (res) {
		    return {
		      title: "邀请你一起来探索WindCoder的新大陆",
		      path: "/pages/index/index",
		      success: function (res) {
		        // 转发成功
		        wx.reportAnalytics('share', {
		          page: "index",
		          flag: "success"
		        })
		      },
		      fail: function (res) {
		        // 转发失败
		        wx.reportAnalytics('share', {
		          page: "index",
		          flag: "fail"
		
		        })
		      }
		    }
		  },
		  onShareTimeline: function () {
		    return {
		        title: "邀请你一起来探索WindCoder的新大陆",
		         query: "",
		    }
		 },
		// #endif
		methods: {
			doSearch:function() {
				const that = this;
				that.doInit();
			},
			doCancel:function(){
				const that = this;
				that.searchText = "";
				that.doInit();
			},
			doInit: async function() {
				const that = this;
				that.items = [];
				that.doList({current:1,pageSize:that.pageInfo.pageSize})
			},
			doList: function(page:PageInfo) {
				let that = this;
				const param = {
					current: page.current,
					pageSize: page.pageSize,
					searchText:that.searchText,
					atype:1,
				}
				uni.showLoading({
					title: '加载中'
				});

				 uni.request({
				    url: QyConfig.apiUrlPrefix+"article", //仅为示例，并非真实接口地址。
				    data: param, 
				    success: (res) => { 
						if(res.statusCode!=200) { 
							console.error("数据获取异常："+res.data)
							uni.showToast({
								title: "数据查询失败",
								icon:"error",
								duration: 2000
							});
							return;
						}
						let list = res.data.items;
						list.forEach((e:ArticleDto) => {
						    const tags = e.tags;
						    if (tags) {
						      e.tagColors = []
						      for (let i = 0; i < tags.length; i++) {
						        e.tagColors[i] = GetRandomColor();
						      }
						    }
						    if (!e.thumbnail || e.thumbnail.length == 0) {
						      e.thumbnail =  GetRandomDefImg();
						    }
						  });
						let tpageInfo = res.data.pageInfo;
						if (that.pageInfo) {
							that.pageInfo.current = parseInt(tpageInfo.current);
							that.pageInfo.pageSize = parseInt(tpageInfo.pageSize);
							that.pageInfo.total = parseInt(tpageInfo.total);
							that.pageInfo.pages = parseInt(tpageInfo.pages);
							that.pageInfo.lastFlag = tpageInfo.lastFlag
						} 
						that.items = that.items.concat(list);
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
			}
		}

	}
</script>

<style lang="less">
	 .container  {
		// padding: 20px;
		font-size: 14px;
		line-height: 24px;
		.header {
			position: fixed;
			width: 100%;
			top: 0;
			z-index:20;
			background: #EEEEEE;
		}
		.listRow {
			 margin-top: 55px;
			 .qy-media-box {
				 padding: 10px;
				 :deep(.qy-media-date) {
					 font-size: 14px;
					 margin: 0 0 5px 0;
				 }
			 }
		}
		:deep(.item-header) {
			height: 180px;
			.item-header-image{
				width: 100%;
				height: 100%;
			}
			.item-header-category {
				float: left;
				position: absolute;
				direction: inherit;
				height: 2em;
				line-height: 2em;
				top: 27px;
				color: #fff;
				padding: 0 8px;
				font-size: 12px;
				text-align: center;
				margin: 0 auto;
				background-color: rgba(91,192,222,0.8); 
			}
		}
		:deep(.item-body-title){
			 word-wrap:break-word; 
			 text {
				 width: 100%;
			 }
		}
		.item-header-count{
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
		}
		.item-desc {
			    color: #999;
			    font-size: 20rpm;
			    line-height: 20px;
			    overflow: hidden;
			    text-overflow: ellipsis;
			    display: -webkit-box;
			    -webkit-box-orient: vertical;
			    -webkit-line-clamp: 4;
		}
		
	}
</style>
