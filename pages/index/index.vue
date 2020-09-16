<template>
	<view class="container">
		<view class="top">
			<view class="top-img">
				<image src="../../static/touxiang.png" mode=""></image>
			</view>
			<view class="top-text" @click="denglu">
				点击登录
			</view>
			<view class="top-img">
				<image src="../../static/fuwuqi.png" mode=""></image>
			</view>
			<view class="top-text" @click="peizhi">
				服务器配置
			</view>
		</view>
		<view class="title">
			仓库智慧平板拣选系统
		</view>
		<view class="gongsi">
			广州时空智友信息科技有限公司
		</view>
		<view class="banben">
			@copyright&nbsp2020&nbspV&nbsp{{version}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				version:'1.0.1'
			}
		},
		onLoad() {
				//#ifdef APP-PLUS
				this.version = plus.runtime.version  ? plus.runtime.version  : '1.0.1'
				//#endif
		},
		methods: {
			denglu(){
				uni.navigateTo({
					url:'login/denglu'
				})
			},
			peizhi(){
				uni.navigateTo({
					url:'login/peizhi'
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: url(../../static/bg.jpg) no-repeat 0 ;
		background-size: 100% 100%;
		
	}
	.container {
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.4);
		overflow: hidden;
		color: rgba($color: #ffffff, $alpha: 0.8);
	}
	.top {
		box-sizing: border-box;
		padding: 2px 9px;
		width: 100vw;
		height: 98px;
		line-height: 98px;
		display: flex;
		align-items: center;
		font-size: 25px;
		
		.top-img{
			width: 60px;
			height: 60px;
			margin: 0 8px;
		}
		.top-text {
			width: 128px;
			height:45px;
			line-height: 45px;
			text-align: center;
		}
		.top-text:nth-of-type(2){
			border-right: 2px solid #FFFFFF;
		}
		.top-img:nth-of-type(3){
			margin-left: 27px;
		}
	}
	.top-img image{
		width: 60px;
		height: 60px;
	}
	.title{
		margin-top: 146px;
		width: 100vw;
		height: 91px;
		line-height: 91px;
		text-align: center;
		font-size: 43px;
	}
	.gongsi{
		margin-top: 54px;
		width: 100vw;
		height: 54px;
		line-height: 54px;
		text-align: center;
		font-size: 25px;
	}
	.banben{
		width: 100vw;
		height: 45px;
		line-height: 45px;
		text-align: center;
		font-size: 18px;
	}
</style>
