<template>
	<view class="container">
		<view class="top" style="display: flex; overflow: hidden;">
			<view class="back" @click="back">
				 <uni-icons type="back" color="#ffffff" size="25"></uni-icons>返回
			</view>
			<view class="top-title" style="flex: 1; height: 50rpx; box-sizing: border-box;
		line-height: 50rpx; text-align: center; ">
				<text style="position: relative; left: -50rpx;">版本日志</text>
			</view>
		</view>
		
		
		<view class="content">
			<view class="content-box">
				<view class="" style="padding-left: 0px; border-bottom: 1px solid #818181;">
					----20200916-1.1.0-----
				</view>
				<view class="">
					<text style=" font-weight: 900;padding-left: 40px;">·</text>初始版本发布
				</view>
			
			</view>
		</view>
		<view class="footer">
			<view class="gongsi">
				{{gongsi}}
			</view>
			<view class="banben" v-if="banben">
				{{banben}}&nbsp&nbsp&nbsp&nbspV&nbsp{{version}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gongsi:'',//公司名，默认为空
				banben:'',//版本发布时间，默认为空
				baseUrl:'',//配置url
				version:'1.0.1'//版本号
			};
		},
		onLoad() {
			this.placeholder = uni.getStorageSync('baseUrl') ? uni.getStorageSync('baseUrl') : '请输入配置地址';
			this.gongsi = uni.getStorageSync('gongsi') ? uni.getStorageSync('gongsi') : '';
			this.banben = uni.getStorageSync('banben') ? uni.getStorageSync('banben') : '';
			//#ifdef APP-PLUS
			this.version = plus.runtime.version  ? plus.runtime.version  : '1.0.1'
			//#endif
		},
		methods:{
			//返回方法
			back(){
				uni.navigateBack({
					
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: url(../../../static/bg.jpg) no-repeat 0 ;
		background-size: 100% 100%;
	}
	.container {
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.4);
		overflow: hidden;
		color: rgba($color: #ffffff, $alpha: 0.8);
	}
	.back{
		box-sizing: border-box;
		width: 100rpx;
		height: 50rpx;
		line-height: 50rpx;
		padding-left: 10rpx;
		font-size: 20rpx;
	}
	.content{
		box-sizing: border-box;
		padding: 10px 145px;
		width: 100vw;
		height: 75vh;
		color: #000000;
		font-size: 20px;
	}
	.content-box{
		width: 100%;
		height: 100%;
		background-color: rgba($color: #ffffff, $alpha: 0.5);
	}
	.footer{
		position: fixed;
		bottom: 10rpx;
		width: 100vw;
		// height: 71.42rpx;
		text-align: center;
	}
	.gongsi{
		width: 100vw;
		height: 35rpx;
		line-height: 35rpx;
		text-align: center;
		font-size: 20rpx;
	}
	.banben{
		width: 100vw;
		height: 30rpx;
		line-height: 30rpx;
		text-align: center;
		font-size: 14.28rpx;
	}
	.popup-confirm{
		width: 71.42rpx;
		height: 28.57rpx;
		font-size:20rpx;
		color: #6c6c6c;
		margin:auto;
		margin-top: 13rpx;
		text-align: center;
		border: 1px solid #6c6c6c;
		border-radius: 5rpx;
	}
</style>
