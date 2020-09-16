<template>
	<view class="container">
		<view class="fixed">
			<view class="top">
				<view class="top-back"  @click="back">
					<uni-icons type="back" color="#ffffff" size="25"></uni-icons>返回
				</view>
				
				<view class="top-title">
					<text style="position: relative; left: -100px;">任务详情</text>
				</view>
			</view>
			<view class="xiangqing-title">
					<view class="title-item">
						复核台:{{titledata.fuhe}}
					</view>
					<view class="title-item">
						任务编号:{{titledata.bianhao}}
					</view>
					<view class="title-item">
						完成日期:{{titledata.date}}
					</view>
			</view>
			<view class="table-top">
				<view class="tabletop-item" v-for="(item,index) in topList" :key="index">
					{{item}}
				</view>
			</view>
		</view>
		<view class="zhanwei" style="width: 100vw; height: 170px;">
			
		</view>
		<view class="xiangqing">
			<view class="table-content">
				<view class="tablecontent-line" v-for="(linedata,linenum) in tableData">
					<view class="tableline-item">
						{{linedata.rw_weizhi}}
					</view>
					<view class="tableline-item">
						{{linedata.rw_yp_name}}
					</view>
					<view class="tableline-item">
						{{linedata.rw_yp_num}}
					</view>
					<view class="tableline-item">
						{{linedata.rw_yp_danwei}}
					</view>
					<view class="tableline-item">
						{{linedata.rw_yp_pihao}}
					</view>
					<view class="tableline-item">
						{{linedata.rw_yp_changjia}}
					</view>
					<view class="tableline-item">
						{{linedata.rw_yp_guige}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rw_order_id:'',//历史任务页面传参任务编号id
				titledata:{
					'name':'李大静',
					'fuhe':'05-01',
					'bianhao':'202008010320200801032020080103',
					'date':'2020-08-21 14:12:03'
				},
				//表格标题数据
				topList:['位置','品名','数量','单位','批号','厂家','规格'],
				tableData:[
					{'rw_weizhi':'L01-01-23','rw_yp_name':'阿莫西林阿莫西林阿莫西林','rw_yp_num':'12','rw_yp_danwei':'盒','rw_yp_pihao':'20200821','rw_yp_changjia':'重启XX药业有限公司药业有限公司药业有限公司','rw_yp_guige':'100mg'},
					{'rw_weizhi':'L01-01-23','rw_yp_name':'阿莫西林','rw_yp_num':'12','rw_yp_danwei':'盒','rw_yp_pihao':'20200821','rw_yp_changjia':'重启XX药业有限公司','rw_yp_guige':'100mg*10包/100mg'},
					{'rw_weizhi':'L01-01-23','rw_yp_name':'阿莫西林','rw_yp_num':'12','rw_yp_danwei':'盒','rw_yp_pihao':'20200821','rw_yp_changjia':'重启XX药业有限公司','rw_yp_guige':'100mg'},
					{'rw_weizhi':'L01-01-23','rw_yp_name':'阿莫西林','rw_yp_num':'12','rw_yp_danwei':'盒','rw_yp_pihao':'20200821','rw_yp_changjia':'重启XX药业有限公司','rw_yp_guige':'100mg'},
					{'rw_weizhi':'L01-01-23','rw_yp_name':'阿莫西林','rw_yp_num':'12','rw_yp_danwei':'盒','rw_yp_pihao':'20200821','rw_yp_changjia':'重启XX药业有限公司','rw_yp_guige':'100mg'},
					{'rw_weizhi':'L01-01-23','rw_yp_name':'阿莫西林','rw_yp_num':'12','rw_yp_danwei':'盒','rw_yp_pihao':'20200821','rw_yp_changjia':'重启XX药业有限公司','rw_yp_guige':'100mg'},
					{'rw_weizhi':'L01-01-23','rw_yp_name':'阿莫西林','rw_yp_num':'12','rw_yp_danwei':'盒','rw_yp_pihao':'20200821','rw_yp_changjia':'重启XX药业有限公司','rw_yp_guige':'100mg'},
					{'rw_weizhi':'L01-01-23','rw_yp_name':'阿莫西林','rw_yp_num':'12','rw_yp_danwei':'盒','rw_yp_pihao':'20200821','rw_yp_changjia':'重启XX药业有限公司','rw_yp_guige':'100mg'},
					{'rw_weizhi':'L01-01-23','rw_yp_name':'阿莫西林','rw_yp_num':'12','rw_yp_danwei':'盒','rw_yp_pihao':'20200821','rw_yp_changjia':'重启XX药业有限公司','rw_yp_guige':'100mg'},
					{'rw_weizhi':'L01-01-23','rw_yp_name':'阿莫西林','rw_yp_num':'12','rw_yp_danwei':'盒','rw_yp_pihao':'20200821','rw_yp_changjia':'重启XX药业有限公司','rw_yp_guige':'100mg'},
					{'rw_weizhi':'L01-01-23','rw_yp_name':'阿莫西林','rw_yp_num':'12','rw_yp_danwei':'盒','rw_yp_pihao':'20200821','rw_yp_changjia':'重启XX药业有限公司','rw_yp_guige':'100mg'},
					{'rw_weizhi':'L01-01-23','rw_yp_name':'阿莫西林','rw_yp_num':'12','rw_yp_danwei':'盒','rw_yp_pihao':'20200821','rw_yp_changjia':'重启XX药业有限公司','rw_yp_guige':'100mg'},
					{'rw_weizhi':'L01-01-23','rw_yp_name':'阿莫西林','rw_yp_num':'12','rw_yp_danwei':'盒','rw_yp_pihao':'20200821','rw_yp_changjia':'重启XX药业有限公司','rw_yp_guige':'100mg'},
					{'rw_weizhi':'L01-01-23','rw_yp_name':'阿莫西林','rw_yp_num':'12','rw_yp_danwei':'盒','rw_yp_pihao':'20200821','rw_yp_changjia':'重启XX药业有限公司','rw_yp_guige':'100mg'},
				]
			}
		},
		onLoad:function(option){//opthin为object类型，会序列化上页面传递的参数
			const _this = this
			console.log(option);//打印出上页面传递的参数
			_this.rw_order_id = option.rw_order_id
			_this.$request({
				data:{'proc':'MYC_APP_hdjh','type':'历史任务详情','rw_order_id':_this.rw_order_id}
			}).then(res =>{
				const resdata = res.Msg_info
				console.log(resdata);
				_this.titledata.name = resdata[0].yg_name
				_this.titledata.fuhe = resdata[0].fht_hao
				_this.titledata.bianhao = _this.rw_order_id
				_this.titledata.date = resdata[0].finished_date
				_this.tableData = resdata
				
				// _this.tableDataList = resdata
				// _this.total = _this.tableDataList.length
				// _this.tableData = _this.tableDataList.slice(0,8)
				// _this.startSlice = 0
				// _this.endSlice = 8
				// if(_this.tableData[0].error == '无数据'){
				// 	_this.error = true
				// }else{
				// 	_this.error = false
				// }
			})
		},
		methods: {
			//关闭窗口返回原页面
			back(){
				uni.navigateBack({
					
				})
			}
		}
	}
</script>

<style lang="scss">
page {
	// background-image: linear-gradient(#33383b, #3886b9);
	background-color:#36576d;
}
	.container{
		// background-image: linear-gradient(#33383b, #3886b9);
		background-color:#36576d;
		width: 100vw;
		overflow: hidden;
		color: #b9c3ca;
	}
	.fixed{
		position: fixed;
		top: 0;
		box-sizing: border-box;
		padding: 0 25px;
		width: 100vw;
		height: 170px;
		z-index: 99;
		// background-image: linear-gradient(#33383b, #34434d);
		background-color:#36576d;
	}
	.top{
		display: flex;
		width: 100vw;
		height: 80px;
		line-height: 80px;
		text-align: center;
		font-size: 44px;
		color: #efefef;
	}
	.top-back{
		width: 150px;
		height: 80px;
		line-height: 80px;
		text-align: left;
		font-size: 24px;
	}
	.top-title{
		flex: 1;
	}
	.xiangqing{
		box-sizing: border-box;
		padding: 5px 25px;
		width: 100vw;
		// background-color: #18B566;
	}
	.xiangqing-title{
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 50px;
		line-height: 50px;
		font-size: 20px;
	}
	.table-top{	
		display: flex;
		width: 100%;
		height: 40px;
		line-height: 40px;
		font-size: 24px;
		border-bottom: 1px solid #FFFFFF;
	}
	.tabletop-item{
		flex: 1;
		text-align: center;
	}
	.tabletop-item:nth-of-type(1){
		flex-grow:1;
	}
	
	.tabletop-item:nth-of-type(2){
		flex-grow:1.5;
	}
	.tabletop-item:nth-of-type(3),
	.tabletop-item:nth-of-type(4){
		flex-grow:0.6;
	}
	.tabletop-item:nth-of-type(7){
		flex-grow: 1;
	}
	.tabletop-item:nth-of-type(6){
		flex-grow:2.3;
	}
	.tabletop-item:nth-of-type(5){
		flex-grow:1;
		
	}
	.table-content{
		box-sizing: border-box;
		width: 100%;
		// background-color: #18B566;
	}
	.tablecontent-line{
		display: flex;
		align-items: center;
		width: 100%;
		height: 52px;
		
		font-size: 20px;
		.tableline-item{
			box-sizing: border-box;
			padding: 0 3px;
			flex: 1;
			flex-grow:1;
			text-align: center;
		}
		.tableline-item:nth-of-type(1){
			flex-grow:1;
		
		}
		
		.tableline-item:nth-of-type(2){
			flex-grow:1.5;
		}
		.tableline-item:nth-of-type(3),
		.tableline-item:nth-of-type(4),
		{
			flex-grow:0.6;
		}
		.tableline-item:nth-of-type(7){
			flex-grow: 1;
			max-width: 114px;
			overflow: hidden;
			text-overflow:ellipsis;
		}	
		.tableline-item:nth-of-type(6){
			flex-grow:2.3;
			// white-space: nowrap;
			// overflow: hidden;
			// text-overflow:ellipsis;
		}
		.tableline-item:nth-of-type(5){
			flex-grow:1;
		
		}
	}
	.close{
		margin: 20px auto;
		width: 200px;
		height: 50px;
		line-height: 50px;
		text-align: center;
		font-size: 24px;
		color: #000000;
		background-color: #FFFFFF;
		border-radius: 8px;
	}
</style>
