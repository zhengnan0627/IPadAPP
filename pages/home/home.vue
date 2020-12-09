<template>
	<view class="container">
		<view class="tabbar">
			<view class="tabbar-container">
				<view class="tabbar-item" v-for="(item,index) in list" :key="index" @click="click(item)">
					<view class="tabbaritem-img">
						<image :src="current == index ? item.selectedIconPath : item.iconPath" mode="aspectFit"/>
						<!-- <u-badge  :count="item.badge" size="mini" :offset="[-10,-2]"></u-badge> -->
					</view>
					<view class="tabbaritem-title" :style="{ color: current == index ? '#2d8cff' : '#e6e6e6' }">
						{{item.text}}
					</view>
				</view>
			</view>
		</view>
		<home v-if="pagesindex =='/pages/home/home'"/>
		<renwu v-if="pagesindex =='/pages/renwu/renwu'"/>
		<!-- <danduorenwu v-if="pagesindex =='/pages/renwu/duodanrenwu'"/> -->
		<lishi v-if="pagesindex =='/pages/lishi/lishi'"/>
		<yeji v-if="pagesindex =='/pages/yeji/yeji'"/>
		<shezhi v-if="pagesindex =='/pages/shezhi/shezhi'"/>
		<!-- 退出登录提示框 -->
		<u-modal v-model="show" :content="content" @confirm="tuichu"
				width="auto" height="auto" show-cancel-button cancel-text="取消"
				:title-style="{paddingTop:'10px'}" :content-style="{padding:'20px 80px',fontSize:'30px',color:'#606266'}"
				:cancel-style="{padding:'10px',height:'70px',lineHeight:'50px',fontSize:'26px',alignItems:'center'}"
				:confirm-style="{padding:'10px',height:'70px',lineHeight:'50px',fontSize:'26px',alignItems:'center'}">
		</u-modal>
		<!-- <u-tabbar v-model="current" :list="list" inactive-color="#ffffff" bg-color="#333333"></u-tabbar> -->
	</view>
</template>

<script>
	import home from "@/components/home/home.vue"
	import renwu from "@/components/renwu/renwu.vue"
	import lishi from "@/components/lishi/lishi.vue"
	import yeji from "@/components/yeji/yeji.vue"
	import shezhi from "@/components/shezhi/shezhi.vue"
	export default {

		data() {
			return {
				show: false,//退出登录状态
				content: '是否退出登录',//退出登录文本
				current: 0,//当前选择项
				pagesindex:'/pages/home/home',//当前选择页面路径
				list: [{
						pagePath: '/pages/home/home',
						iconPath: "/static/shouye-gray.png",
						selectedIconPath: "/static/shouye-highlight.png",
						text: '首页',
						count: 0,
						badge: 0,
					},
					{
						pagePath: '/pages/renwu/renwu',
						iconPath: "/static/renwu-gray.png",
						selectedIconPath: "/static/renwu-highlight.png",
						text: '合单领取',
						count: 1,
						badge: 17,
					},
					{
						pagePath: '/pages/lishi/lishi',
						iconPath: "/static/lishi-gray.png",
						selectedIconPath: "/static/lishi-highlight.png",
						text: '任务历史',
						count: 2,
						badge: 0,
					},
					{
						pagePath: '/pages/yeji/yeji',
						iconPath: "/static/yeji-gray.png",
						selectedIconPath: "/static/yeji-highlight.png",
						text: '业绩查询',
						count: 3,
						badge: 0,
					},
					{
						pagePath: '/pages/shezhi/shezhi',
						iconPath: "/static/shezhi-gray.png",
						selectedIconPath: "/static/shezhi-highlight.png",
						text: '退出登录',
						count: 4,
						badge: 0,
					},

				],
				// list:[
				// 	{'id':0,'iconPath':'../../static/shouye-gray.png','title':'首页'}
				// ]
			}
		},
		onLoad() {
			const ygName = uni.getStorageSync('ygName')
			const jhType = uni.getStorageSync('jhType')
			this.list[4].text = ygName
			if(jhType == '多单拣货'){
				this.list[1].pagePath = '/pages/renwu/duodanrenwu'
				this.list[1].text = '多单领取'
			}
			console.log(jhType);
		},
		methods: {
			click(e){
				// console.log(e);
				//如果点击的是任务则跳转到任务页面
				if(e.count ==1 && e.pagePath == '/pages/renwu/renwu'){
					return uni.navigateTo({
						url:'../renwu/renwu'
					})		
				}else if(e.count == 1 && e.pagePath == '/pages/renwu/duodanrenwu'){
					return uni.navigateTo({
						url:'../renwu/duodanrenwu'
					})	
				}else if(e.count == 4 && e.pagePath == '/pages/shezhi/shezhi'){
					this.show = true
				}else{
					//自定义tabbar定义的高亮下标传值
					this.current = e.count
					//自定义tabbar定义的页面路径传值
					this.pagesindex = e.pagePath
				}
			},
			tuichu(){
				uni.reLaunch({
					url:'/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #5e93bb;
	}

	.container {
		position: relative;
		width: 100vw;
		height: 100vh;
		background-color: #5e93bb;
		overflow: hidden;
	}
	.tabbar{
		position: fixed;
		// width: 76.42rpx;
		width: 90px;
		height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #333333;
	}
	.tabbar-container{
		position: relative;
		box-sizing: border-box;
		padding-top: 10rpx;
		// width: 76.42rpx;
		width: 90px;
		height: 100vh;
		display: flex;
		flex-direction: column;
		font-size: 15rpx;
	}
	.tabbar-item{
		margin: 3rpx 0;
		// width: 76.42rpx;
		width: 90px;
		height: 78.57rpx;
		text-align: center;	
	}
	.tabbar-item:last-child{
		position: absolute;
		bottom: 0;
	}
	.tabbaritem-img{
		position: relative;
		// width: 76.42rpx;
		width: 90px;
		height: 45rpx;
	}
	.tabbaritem-img image{
		// width: 48.17rpx;
		// height: 48.17rpx;
		width: 55px;
		height: 55px;
	}
</style>
