<template>
	<view class="rightcontainer">
		<view class="top-title">
				<text>{{titlelist.rank_name}}</text> 
				<!-- <text style="position: relative;  width: 70%; text-align: center;">登录人:{{ygName}}</text> -->
		</view>
		<view class="chartcontainer">
			<view class="columncontainer">
				<view class="column-title">
					<view class="" style="width: 150px; opacity: 0;">
						条目数
					</view>
					<view class="" style="width: 200px;">
						{{titlelist.rank_name2}}
					</view>
				</view>
				<view class="column-content">
					<view class="qiun-charts">
						<!-- <canvas :canvas-id="`canvasColumn${timeshow}`" id="canvasColumn1" class="charts"> </canvas> -->
						<canvas canvas-id="canvasColumn1" id="canvasColumn1" class="charts"> </canvas>
					</view>
				</view>
			</view>
			<view class="piecontainer">
				<view class="pie-title">
						{{titlelist.rank_name3}}
				</view>
				<view class="pie-content">
					<view class="qiun-chartsPie">
						<canvas canvas-id="canvasPie" id="canvasPie" class="charts-pie" ><!-- @touchstart="touchPie" --></canvas>
					</view>
				</view>
			</view>
		</view>
		<view class="top-title2">
				<text>{{titlelist.rank_name4}}</text> 
		</view>
		<view class="area-container">
			<view class="right-flex">
				<scroll-view :scroll-x="true" enable-flex class="scrollbox" >
					<view class="scrollboxflex">
						<view class="rightflex-item" v-for="(item,index) in areaData" :key='index' :style="{'background':item.rw_color}">
							<view class="rightflex-num">
								{{item.rw_num}}
							</view>
							<view class="rightflex-area" >
								{{item.rw_title}}
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>

	import uCharts from '../../components/u-charts/u-charts.js';
	var _self;
	var canvaColumn=null;
	var canvaPie=null;
	export default {
		data() {
			return {
				ygName:'',//员工姓名(从缓存中取)
				ygId:'',//员工姓名(从缓存中取)
				//各区域主标题及副标题数据(内含柱状图数据但是不使用)
				titlelist:{
					rank_name:'业绩排行',
					rank_name2:'拣货排行榜',
					rank_name3:'订单数',
					rank_name4:'区域任务数'
				},
				
				//u-chart相关数据
				cWidth:'550',//树状图宽度数据
				cHeight:'257',//树状图高度数据
				cWidthPie:'320',//饼图宽度数据
				cHeightPie:'257',//饼图高度数据
				pixelRatio:1,
				chartData: {
				  "categories": ['罗的霄','王的杰','张的磊','房的时','章的磊','李的刚','刘的红','张乐乐'],
				  "series": [
					  {
					// "color":"#0081d4",
					// "textColor":"#ffffff",
					// "name": "拣货排行榜",
						"data": [355,344,300,270,250,240,210,190],
					// "color": "red"
					},
				  ]
				},
				//饼图数据
				"PiechartData": {
				  "series": [{
					"name": "未完成",
					"data": 102,
					//下列数据项已通过修改源码实现
					// "color":"#fdbb40", 
					// "legendShape":"rect",
					// "textColor":"#ffffff",
					// "format":()=> this.chartData2.series[0].data
				  }, {
					"name": "已完成",
					"data": 98,
					//下列数据项已通过修改源码实现
					// "color":"#0186ff",
					// "legendShape":"rect",
					// "textColor":"#ffffff",
					// "format":()=> this.chartData2.series[1].data
				 },]
				},
				//区域任务数据
				areaData:[
					{'rw_num':12,'rw_title':'区域101',rw_color:"#87baac"},
				],
			};
		},
		created() {
			_self = this;
			_self.ygName = uni.getStorageSync('ygName')
			_self.ygId = uni.getStorageSync('ygId')
			_self.$request({
				data:{'proc':'MYC_APP_hdjh','type':'首页排行榜'}
			}).then(res => {
				const resdata = res.Msg_info[0] //提取数据返回有效数据存储
				// console.log(resdata);
				_self.titlelist = resdata
				_self.chartData.categories = resdata.Names.split('+')
				_self.chartData.series[0].data = resdata.items.split('+').map(Number)
				_self.$nextTick(function(){
					_self.showColumn("canvasColumn1",_self.$data.chartData);
				})
				// console.log(_self.chartData);
			})
			_self.$request({
				data:{'proc':'MYC_APP_hdjh','type':'任务数'}
			}).then(res => {
				const resdata = res.Msg_info //提取数据返回有效数据存储
				// console.log(resdata);
				_self.PiechartData.series = resdata.map(item =>{
					item.data = item.data * 1
					return item
				})
				// console.log(_self.PiechartData.series);
				_self.$nextTick(function(){
					_self.showPie("canvasPie",_self.PiechartData);
				})
			})
			_self.$request({
				data:{'proc':'MYC_APP_hdjh','type':'区域任务','yg_id':_self.ygId}
			}).then(res => {
				const resdata = res.Msg_info
				// console.log(resdata);
				_self.areaData = resdata
			})
		},
		mounted() {
			
			
		},
		methods:{
			//树状图调用方法
			showColumn(canvasId,chartData){
				// console.log("aaa")
				canvaColumn =new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'column',
					legend:{
						show:false,
						fontColor:"#ffffff",
						},
					fontSize:13,
					colors:['#ffffff',],
					background:'#0076b1',
					padding:[25,3,9,7],
					pixelRatio:_self.pixelRatio,
					animation: false,
					categories: chartData.categories,
					series: chartData.series,
					// enableScroll: true,//开启图表拖拽功能
					xAxis: {
						rotateLabel:true,
						disableGrid:true,
						gridColor:'#cccccc',
						fontColor:'#ffffff',
						axisLineColor:'#cccccc',
						// type:'grid',
						// 	gridType:'dash',
						// 	itemCount:5,//x轴单屏显示数据的数量，默认为5个
						// 	scrollShow:true,//新增是否显示滚动条，默认false
						// 	scrollAlign:'left',//滚动条初始位置
						// 	scrollBackgroundColor:'#F7F7FF',//默认为 #EFEBEF
						// 	scrollColor:'#DEE7F7',//默认为 #A6A6A6
					},
					yAxis: {
						//disabled:true,
						gridColor:"#cccccc",
						data:[{
							// min:100,
							"titleFontColor":"#ffffff",
							"fontColor":"#ffffff",
							"axisLineColor":'#dadada',
						}]			
					},
					dataLabel: true,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						column: {
							type:'group',
							width:chartData.categories.length > 4 ? _self.cWidth*_self.pixelRatio*0.5/chartData.categories.length : 45
						}
					  }
				});
			},
			//饼状图显示方法
			showPie(canvasId,chartData){
				canvaPie=new uCharts({
					$this:_self,
						canvasId: canvasId,
						type: 'pie',
						fontSize:20,
						legend:{
						  fontColor:"#ffffff",
						  show:true,
						  position:'bottom',
						  float:'center',
						  itemGap:10,
						  padding:5,
						  lineHeight:26,
						  margin:2,
						  borderWidth :1,
						  fontSize:19
						},
						background:'#0076b1',
						pixelRatio:_self.pixelRatio,
						series: chartData.series,
						animation: false,
						width: _self.cWidthPie*_self.pixelRatio,
						height: _self.cHeightPie*_self.pixelRatio,
						dataLabel: true,
						dataPointShapeType:"hollow",
						dataPointShape:false,
						extra: {
							pie: {
							  labelWidth:1,
							  offsetAngle:90
							  // border:true
							}
						},
					});
				this.piearr=canvaPie.opts.series;			
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
	color: #FFFFFF;
}
.top-title{
	box-sizing: border-box;
	padding-left: 29.19rpx;
	margin-top: 20rpx;
	// width: 100vw;
	height: 24rpx;
	line-height: 24rpx;
	font-size: 20.43rpx;
	vertical-align: middle;
	display: flex;
	align-items: center;
}
.top-title::before{
	content: '';
	margin-right: 6rpx;
	display: inline-block;
	width: 7.29rpx;
	height: 20.43rpx;
	line-height: 20.43rpx;
	background-color: #36a9ce;
	box-shadow: 2px 0px 3px 0px #000000;
}
.chartcontainer{
	width: 100%;
	height: 290px;
	// background-color: #19BE6B;
	display: flex;
}
.columncontainer{
	width: 550px;
	height: 290px;
	// background-color: #666666;
}
.column-title{
	box-sizing: border-box;
	padding-top: 7px;
	padding-left: 30px;
	display: flex;
	align-items: center;
	width: 100%;
	height: 25px;
	line-height: 25px;
	font-size: 19px;
}
.column-content{
	width: 550px;
	height: 257px;
}
	.qiun-charts {
		width: 550px;
		height: 257px;
	}
	.charts {
		width: 550px;
		height: 257px;
	}
	.piecontainer{
		margin-left: 10px;
		width: 320px;
		height: 290px;
		// background-color: #666666;
	}
	.pie-title{
		box-sizing: border-box;
		padding-top: 7px;
		width: 100%;
		height: 25px;
		line-height: 25px;
		font-size: 19px;
		text-align: center;
	}
	.pie-content{
		width: 320px;
		height: 257px;
	}
	.qiun-chartsPie{
	width: 320px;
	height: 257px;
	}
	.charts-pie{
		width: 320px;
		height: 257px;
	}
	.top-title2{
		box-sizing: border-box;
		padding-left: 29.19rpx;
		margin-top: 10rpx;
		// width: 100vw;
		height: 24rpx;
		line-height: 24rpx;
		font-size: 20.43rpx;
		vertical-align: middle;
		display: flex;
		align-items: center;
	}
	.top-title2::before{
		content: '';
		margin-right: 6rpx;
		display: inline-block;
		width: 7.29rpx;
		height: 20.43rpx;
		line-height: 20.43rpx;
		background-color: #36a9ce;
		box-shadow: 2px 0px 3px 0px #000000;
	}
	.area-container{
		box-sizing: border-box;
		padding: 4px 25px;
		width: 870px;
		height: 200px;
		// background-color: #18B566;
	}
	.right-flex{
		// box-sizing: border-box;
		// padding: 1vh 0.6vw ;
		// background-color: #4CD964;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		.rightflex-item:nth-of-type(1),
		.rightflex-item:nth-of-type(6){
			background-color: #87baac;
		}
		.rightflex-item:nth-of-type(2),
		.rightflex-item:nth-of-type(7){
			background-color: #d06054;
		}
		.rightflex-item:nth-of-type(3),
		.rightflex-item:nth-of-type(8){
			background-color: #0172ce;
		}
		.rightflex-item:nth-of-type(4),
		.rightflex-item:nth-of-type(9){
			background-color: #808a97;
		}
		.rightflex-item:nth-of-type(5),
		.rightflex-item:nth-of-type(10){
			background-color: #e1951e;
		}
	}
	.scrollbox{
		width: 820px;
		height: 192px;
		display: flex !important;
		flex-direction: column !important;
		flex-wrap: wrap !important;
	}
	.scrollboxflex{
		width: 820px;
		height: 192px;
		display: flex !important;
		flex-direction: column !important;
		flex-wrap: wrap !important;
	}
	.rightflex-item{
		margin: 5px 5px;
		width: 18%;
		height: 40%;
		background-color: #C0C0C0;
		border-radius: 6rpx;
		.rightflex-num{
			width: 100%;
			height: 45px;
			line-height: 45px;
			font-size: 30px;
			text-align: center;
		}
		.rightflex-area{
			width: 100%;
			height: 25px;
			line-height: 25px;
			font-size: 17px;
			overflow: hidden;
			text-align: center;
		}
	}
</style>
