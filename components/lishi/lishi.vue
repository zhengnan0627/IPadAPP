<template>
	<view class="rightcontainer">
		<view class="top">
			<view class="top-img">
				<image src="/static/lishi-gray.png" mode=""></image>
			</view>
			<view class="top-title">
				历史任务
			</view>
			<view class="top-date">
				<view class="date-item">
					<text>开始日期</text>
					<view class="date-result" style="font-size: 14px;" @click="show1 = true">{{ input1 ? input1 : defaultTime1}}</view>
					<u-picker
						safe-area-inset-bottom
						mode="time"
						:defaultTime="defaultTime1"
						v-model="show1"
						:params="params"
						@confirm="confirm1"
						title="选择开始时间"
					></u-picker>
				</view>
				<view class="date-item">
					<text>结束日期</text>
					<view class="date-result" style="font-size: 14px;" @click="show2 = true">{{ input2 ? input2 : defaultTime2 }}</view>
					<u-picker
						safe-area-inset-bottom
						mode="time"
						:defaultTime="defaultTime1"
						v-model="show2"
						:params="params"
						@confirm="confirm2"
						title="选择结束时间"
					></u-picker>
				</view>
				<view class="chaxun" @click="chaxun">
					查询
				</view>
			</view>
		</view>
		<view class="table-container">
			<view class="table-top">
				<view class="tabletop-item">
				</view>
				<view class="tabletop-item" v-for="(item,index) in topList" :key="index">
					{{item}}
				</view>
			</view>
			<view class="tablecontent-error" v-if="error">
				<view class="" style="margin: auto auto;">
					<text>暂无数据</text>
				</view>
			</view>
			<view class="table-content" v-if="!error">
				<view class="tablecontent-line" v-for="(linedata,linenum) in tableData">
					<view class="tableline-item">
						<image src="/static/lishi-gray.png" mode=""></image>
					</view>
					<view class="tableline-item" >
						{{linedata.rw_finished_date}}
					</view>
					<view class="tableline-item" >
						{{linedata.rw_items}}
					</view>
					<view class="tableline-item" >
						{{linedata.rw_real_items}}
					</view>
					<view class="tableline-item" >
						{{linedata.rw_fht_hao}}
					</view>
					<view class="tableline-item" @click="chakan(linedata)">
						<text>查看</text>
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<uni-pagination title="标题文字" pageSize="8" :total="total" @change="change"></uni-pagination>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ygId:'',//员工主键id(从缓存中取)
				total:8,//总条目数
				//日期选择显示项(false为不显示该项)
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false	
				},
				show1: false,//开始时间picker组件控制值
				show2: false,//结束时间picker组件控制值
				input1: '',//开始时间输入值
				input2: '',//结束时间输入值
				defaultTime1: '2020-9-11',//默认开始时间
				defaultTime2: '2020-9-13',//默认结束时间
				//表格标题数据
				topList:['完成日期','条目数','拣选数','复核台号','操作'],
				error:false,//无数据时为真显示'暂无数据'字段
				//历史任务切割控制参数
				startSlice:0,//开始切割参数
				endSlice:8,//结束切割参数
				//历史任务数据集合,做切割后传给tableData
				tableDataList:[
					// {'rw_finished_date':'2020-9-11 20:15:35','rw_items':'12','rw_real_items':'12','rw_fht_hao':'05-01','rw_order_id':'20200821-AMD8471812341'},
				],
				tableData:[
					
				]
			};
		},
		created() {
			this.ygId = uni.getStorageSync('ygId')//从缓存中获取员工主键ID
			let datetime = new Date();
			let year = datetime.getFullYear();
			let month = datetime.getMonth()+1;//js从0开始取 
			let date = datetime.getDate(); 
			if(month<10){
			month = "0" + month;
			}
			if(date<10){
			date = "0" + date;
			}
			this.defaultTime1 = year+"-"+month+"-"+date;
			this.defaultTime2 = year+"-"+month+"-"+date;
			this.input1 = year+"-"+month+"-"+date;
			this.input2 = year+"-"+month+"-"+date;
		},
		methods:{
			//查询按钮调用历史人物接口
			chaxun(){
				const _this = this
				_this.$request({
					data:{'proc':'MYC_APP_hdjh','type':'历史任务','start_date':_this.input1,'end_date':_this.input2,'yg_id':_this.ygId}
				}).then(res =>{
					const resdata = res.Msg_info
					console.log(resdata);
					_this.tableDataList = resdata
					_this.total = _this.tableDataList.length
					_this.tableData = _this.tableDataList.slice(0,8)
					_this.startSlice = 0
					_this.endSlice = 8
					if(_this.tableData[0].error == '无数据'){
						_this.error = true
					}else{
						_this.error = false
						
					}
				})
			},
			confirm1(e) {
				this.input1 = '';
				if (this.params.year) this.input1 += e.year;
				if (this.params.month) this.input1 += '-' + e.month;
				if (this.params.day) this.input1 += '-' + e.day;
				if (this.params.hour) this.input1 += ' ' + e.hour;
				if (this.params.minute) this.input1 += ':' + e.minute;
				if (this.params.second) this.input1 += ':' + e.second;
			},	
			confirm2(e) {
				this.input2 = '';
				if (this.params.year) this.input2 += e.year;
				if (this.params.month) this.input2 += '-' + e.month;
				if (this.params.day) this.input2 += '-' + e.day;
				if (this.params.hour) this.input2 += ' ' + e.hour;
				if (this.params.minute) this.input2 += ':' + e.minute;
				if (this.params.second) this.input2 += ':' + e.second;
			},
			chakan(e){
				console.log(e);
				const rw_order_id = e.rw_order_id
				uni.navigateTo({
					url:'/pages/lishi/xiangqing?rw_order_id='+rw_order_id
				})
			},
			//点击上下页方法
			change(e){
				// console.log(e);
				if(e.type == 'next'){
					console.log('下一页');
					this.startSlice += 8
					this.endSlice += 8
					this.tableData = this.tableDataList.slice(this.startSlice,this.endSlice)
				}else{
					console.log('上一页');
					this.startSlice -= 8
					this.endSlice -= 8
					this.tableData = this.tableDataList.slice(this.startSlice,this.endSlice)
				}
			}
		}
	}
</script>

<style lang="scss">

.rightcontainer{
	box-sizing: border-box;
	// padding-left: 76.42rpx;
	padding-left: 90px;
	width: 100vw;
	height: 100vh;
	color: #e6e6e6;
}
	.top{
		margin-top: 15px;
		margin-left: 30px;
		width: 820px;
		height: 61px;
		line-height: 61px;
		display: flex;
		align-items: center;
		overflow: hidden;
	}
	.top-img{
		width: 45px;
		height: 45px;
		
	}
	.top-img image{
		width: 45px;
		height: 45px;
	}
	.top-title{
		width: 170px;
		height: 61px;
		line-height: 61px;
		font-size: 36px;
		text-align: center;
	}
	.top-date{
		display: flex;
		align-items: center;
		font-size: 20px;
	}
	.date-item{
		display: flex;
		align-items: center;
	}
	.date-result{
		padding: 0 7px;
		margin: 0 20px;
		// width:130px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		background-color: #b5bdc5;
		color: #000000;
	}
	.chaxun{
		padding: 0 20px;
		height: 30px;
		line-height: 30px;
		background-color: #2a8dff;
		border-radius: 5px;
		text-align: center;
	}
	.table-container{
		margin-left: 30px;
		width: 820px;
		// height: 470px;
		// background-color: #18B566;
	}
	.table-top{
		display: flex;
		width: 100%;
		height: 40px;
		line-height: 40px;
		font-size: 20px;
	}
	.tabletop-item{
		flex: 1;
		text-align: center;
	}
	.tabletop-item:nth-of-type(1){
		flex-grow: 0.7;
	}
	
	.tabletop-item:nth-of-type(2){
		flex-grow:2;
	}
	.tabletop-item:nth-of-type(3),
	.tabletop-item:nth-of-type(4),
	.tabletop-item:nth-of-type(5),
	.tabletop-item:nth-of-type(6){
		flex-grow:1;
	}
	// .tabletop-item:nth-of-type(6){
	// 	flex-grow:3;
	// }
	// .tabletop-item:nth-of-type(7){
	// 	flex-grow:1;
		
	// }
	.table-content{
		width: 820px;
		height: 420px;
		border: 1px solid #FFFFFF;
	}
	.tablecontent-error{
		width: 820px;
		height: 420px;
		line-height: 420px;
		border: 1px solid #FFFFFF;
		text-align: center;
	}
	.tablecontent-line{
		display: flex;
		align-items: center;
		width: 100%;
		height: 52px;
		line-height: 52px;
		font-size: 20px;
		.tableline-item{
			flex: 1;
			flex-grow:1;
			text-align: center;
		}
		.tableline-item:nth-of-type(1){
			flex-grow: 0.7;
		
		}
		
		.tableline-item:nth-of-type(2){
			flex-grow:2;
		}
		.tableline-item:nth-of-type(3),
		.tableline-item:nth-of-type(4),
		.tableline-item:nth-of-type(5),
		.tableline-item:nth-of-type(6),{
			flex-grow:1;
		}
		// .tableline-item:nth-of-type(6){
		// 	flex-grow:3;
		// 	white-space: nowrap;
		// 	overflow: hidden;
		// 	text-overflow:ellipsis;
		// }
		// .tableline-item:nth-of-type(7){
		// 	flex-grow:1;
		
		// }
		.tableline-item:nth-of-type(6) text{
			padding: 3px 8px;
			border-radius: 6px;
			background-color: #cad3db;
			color: #5097e7;
		}
	}
	.tableline-item image{
		width: 40px;
		height: 40px;
		vertical-align: middle;
	}
	.footer{
		margin: 8px auto;
		width: 300px;
		height: 50px;
		line-height: 50px;
	}
</style>
