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
		<view class="logo-box">
			<view class="logo">
				<image :src="imgurl" mode="aspectFit"></image>
			</view>
		</view>
		<view class="title">
			{{appname}}
		</view>
		<view class="gongsi">
			{{gongsi}}
		</view>
		<view class="banben" v-if="banben" @click="banbenLog">
			{{banben}}&nbsp&nbsp&nbsp&nbspV&nbsp{{version}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgurl:'',//公司logo，默认为空
				appname:'',//APP名称,默认为空
				gongsi:'',//公司名，默认为空
				banben:'',//版本发布时间，默认为空
				version:'1.0.1',//版本号
			}
		},
		onShow() {
			this.appname = uni.getStorageSync('appname') ? uni.getStorageSync('appname') : '智慧仓库平板拣选系统';
			this.imgurl = uni.getStorageSync('imgurl') ? uni.getStorageSync('imgurl') : '';
			this.gongsi = uni.getStorageSync('gongsi') ? uni.getStorageSync('gongsi') : '';
			this.banben = uni.getStorageSync('banben') ? uni.getStorageSync('banben') : '';
			//#ifdef APP-PLUS
			this.version = plus.runtime.version  ? plus.runtime.version  : '1.0.1'
			/** 检测升级 */
			//整包更新前端代码
			// var server = "http://152.136.28.147:9009/VXMail/PublicUrl.ashx"; //检查更新地址
			var req = { //升级检测数据
				"proc":"MYC_APP_hdjh",
				"type":"获取版本更新",
				"appid": plus.runtime.appid, 
				"version": plus.runtime.version  
			}; 
			if(uni.getStorageSync('baseUrl')){
				this.$request({
					data:req
				}).then(res => {
					if (res.Msg_info[0].status == 1) {
					    uni.showModal({ //提醒用户更新  
					        title: "更新提示",  
					        content: res.Msg_info[0].note,  
					        success: (ress) => {  
					            if (ress.confirm) {  									
					                plus.runtime.openURL(res.Msg_info[0].url);  
					            }  
					        }  
					    })  
					} 
				}) 
			}    
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
			},
			banbenLog(){
				uni.navigateTo({
					url:'login/versionlog'
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
	.logo-box{
		width: 100vw;
		height: 146px;
		line-height: 146px;
	}
	.logo{
		margin: auto;
		width: 300px;
		height: 140px;
		// background-color: #FFFFFF;
	}
	.logo image{
		width: 300px;
		height: 140px;
	}
	.title{
		// margin-top: 146px;
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
