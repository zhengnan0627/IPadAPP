<template>
	<view class="container">
		<view class="back" @click="back">
			 <uni-icons type="back" color="#ffffff" size="25"></uni-icons>返回
		</view>
		
		<view class="content">
			<view class="peizhi-title">
				输入服务器地址
			</view>
			<view class="peizhi-content">
				<view class="peizhi-input">
					<view class="peizhi-img">
						<image class="peizhi-image" src="../../../static/fuwuqi.png" mode=""></image>
					</view>
					<input class="input" type="text" v-model="baseUrl"  :placeholder="placeholder" placeholder-class="input-placeholder "/>
				</view>
				<view class="confirm" @click="confirm">
					确定
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="gongsi">
				广州时空智友信息科技有限公司
			</view>
			<view class="banben">
				@copyright&nbsp2020
			</view>
		</view>
		<u-popup v-model="show" mode="center" width="300" height="130" border-radius="8" :mask-close-able="false">
			<view class="" style="font-size: 34.28rpx; color: #000000; text-align: center;padding: 3prx 0;">
				提示信息
			</view>
			<view class=""style="font-size:20rpx; color: #6c6c6c; text-align: center;padding: 3prx 0;">
				数据库连接成功
			</view>
			<view class="popup-confirm"  @click="popupconfirm" >
				确定
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseUrl:'',//配置url
				show:false,//弹出层
				placeholder:'',//输入框提示值
			};
		},
		onLoad() {
			this.placeholder = uni.getStorageSync('baseUrl') ? uni.getStorageSync('baseUrl') : '请输入配置地址';
		},
		methods:{
			//返回方法
			back(){
				uni.navigateBack({
					
				})
			},
			// 点击确认按钮触发      
			confirm(){
			    // 输入框的值
				const value = this.baseUrl
				// console.log(this.baseUrl)
				const test = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
				const testurl = test.test(value)
				if (testurl){
					uni.setStorageSync('baseUrl', value);
					console.log(value);
					this.$request({
						data:{'proc':'MYC_APP_hdjh','type':'链接测试',}
					}).then(res => {		
						console.log(res);
						this.show = true
					});
				}else {
					uni.showToast({
						icon:'none',
						title:'配置输入有误,请重新配置',
						duration:1000
					})
				}
			},
			popupconfirm(){
				this.show = false
				uni.reLaunch({
					url:'../index'
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
		margin-top:calc(40vh - 50rpx);
		margin-left: auto;
		margin-right: auto;
		width: 50vw;
		height: 114.28rpx;
		text-align: center;
		.peizhi-title{
			font-size: 14.28rpx;
			text-align: left;
			margin-bottom: 7.14rpx;
		}
		.peizhi-content{
			display: flex;
			align-items: center;
			font-size: 20rpx;
			color: #FFFFFF;
			.confirm{
				margin-left: 7rpx;
				width:160rpx;
				height: 39.28rpx;
				line-height: 39.28rpx;
				background-color: #36a9e1;
				border-radius: 3.57rpx;
			}
			.peizhi-input{
				box-sizing: border-box;
				width: 100%;
				height: 39.28rpx;
				line-height: 39.28rpx;
				display: flex;
				align-items: center;
				border-bottom: 1px solid #FFFFFF;
				.input{
					width: 100%;
					height: 39.28rpx;
					line-height: 39.28rpx;
					font-size: 20rpx;
					color: rgba($color: #FFFFFF, $alpha: .9);
				}
				.input-placeholder {
					color: rgba($color: #FFFFFF, $alpha: .7);
				}
				.peizhi-img{
					width: 28rpx;
					height: 28rpx;
					.peizhi-image{
						width: 28rpx;
						height: 28rpx;
					}
				}
			}
			
		}
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
