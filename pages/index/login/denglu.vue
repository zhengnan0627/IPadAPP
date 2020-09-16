<template>
	<view class="container">
		<view class="back" @click="back">
			 <uni-icons type="back" color="#ffffff" size="25"></uni-icons>返回
		</view>
		
		<view class="content">
			<view class="peizhi-title">
				输入工号
			</view>
			<view class="peizhi-content">
				<view class="peizhi-input">
					<view class="peizhi-img">
						<image class="peizhi-image" src="../../../static/bianhao.png" mode=""></image>
					</view>
					<input class="input" type="text" v-model="bianhao"  placeholder="" placeholder-class="input"/>
				</view>
				<view class="confirm3" :class="{'confirm4':bianhao!=''}" @click="bianhao!=''?confirm():''">
					确认
				</view>
			</view>
			<view class="peizhi-title">
				姓名
			</view>
			<view class="peizhi-content">
				<view class="peizhi-input">
					<view class="peizhi-img">
						<image class="peizhi-image" src="../../../static/touxiang.png" mode=""></image>
					</view>
					<input :disabled="true" class="input" type="text" v-model="name" placeholder="" placeholder-class="input"/>
				</view>
				<view class="confirm2">
					
				</view>
			</view>
			<view class="peizhi-title">
				密码
			</view>
			<view class="peizhi-content">
				<view class="peizhi-input">
					<view class="peizhi-img">
						<image class="peizhi-image" src="../../../static/mima.png" mode=""></image>
					</view>
					<input class="input" type="text" v-model="mima" password placeholder="" placeholder-class="input"/>
				</view>
				<view class="confirm3"  :class="{'confirm4':mima!=''}" @click="mima!=''?denglu():''">
					登录
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bianhao:'',//工号
				name:'',//姓名
				mima:'',//密码
				baseUrl:'',//配置url 
				jiaoyanmima:'',//服务器返回密码用于校验
				jiaobianhao:'',//服务器返回密码用于校验
				ygid:'',//服务器返回员工主键id
			};
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
				const gh = this.bianhao
				this.$request({
					data:{'proc':'MYC_APP_hdjh','type':'工号验证','gh':gh}
				}).then(res =>{
					console.log(res.Msg_info[0]);
					const resdata = res.Msg_info[0]
					if(resdata.error){
						uni.showToast({
							title:'无此工号,请重新输入',
							icon:'none',
						})
						this.name = ''
						this.mima = ''
						this.jiaoyanmima = ''
						this.jiaoyanbianhao = ''
					}
					else{
						this.name = resdata.yg_name
						this.jiaoyanmima = resdata.password
						this.jiaoyanbianhao = resdata.gh
						uni.setStorageSync('ygId', resdata.yg_id);//缓存员工主键id
						uni.setStorageSync('ygName', resdata.yg_name);//缓存员工姓名
					}
				})
			},
			denglu(){
				
				if(this.jiaoyanmima == this.mima&&this.name&&this.jiaoyanbianhao == this.bianhao){
					uni.reLaunch({
						url:'../../home/home'
					})
					// console.log('登录成功');
				}else{
					uni.showToast({
						title:'登录失败,请重试',
						icon:'none',
						duration:1000
					})
				}
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
		margin-top:calc(30vh - 100rpx);
		margin-left: auto;
		margin-right: auto;
		width: 50vw;
		height: 114.28rpx;
		text-align: center;
		.peizhi-title{
			font-size: 14.28rpx;
			text-align: left;
			margin-top: 20rpx;
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
			.confirm2{
				margin-left: 7rpx;
				width:160rpx;
				height: 39.28rpx;
				line-height: 39.28rpx;
			}
			.confirm3{
				margin-left: 7rpx;
				width:160rpx;
				height: 39.28rpx;
				line-height: 39.28rpx;
				background-color: #CCCCCC;
				border-radius: 3.57rpx;
			}
			.confirm4{
				background-color: #36a9e1;
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
					box-sizing: border-box;
					padding-left: 14rpx;
					width: 100%;
					height: 39.28rpx;
					line-height: 39.28rpx;
					font-size: 20rpx;
					color: #FFFFFF;
					text-align: left;
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
</style>
