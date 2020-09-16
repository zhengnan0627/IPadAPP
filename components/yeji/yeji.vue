<template>
	<view class="rightcontainer">
		<view class="top">
			<view class="top-img">
				<image src="/static/yeji-gray.png" mode=""></image>
			</view>
			<view class="top-title">
				个人业绩查询
			</view>
			<view class="top-date">
				<view class="tabbar-containers">
					<view class="tabbar-items" v-for="(item,index) in list" :key="index" @click="click(item)">
						<view class="tabbaritem-title" :style="{ color: current == index ? '#2d8cff' : '#e6e6e6',
						 background: current == index ? '#FFFFFF' : ''}">{{item.name}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="content-item" v-for="(item,index) in contentList" :key="index">
				<view class="content-num">
					{{item.num}}
				</view>
				<view class="content-title">
					{{item.title}}
				</view>
			</view>
		</view>
		<view class="charts-container">
			<view class="columncontainer">
				<view class="column-title">
					<view class="" style="width: 200px;">
						{{chartsTitle}}
					</view>
					
				</view>
				<view class="column-content">
					<view class="qiun-charts">
						<!-- <canvas :canvas-id="`canvasColumn${timeshow}`" id="canvasColumn1" class="charts"> </canvas> -->
						<canvas canvas-id="canvasColumn1" id="canvasColumn1" class="charts"> </canvas>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '../../components/u-charts/u-charts.js';
	var _self;
	var canvaColumn=null;
	export default {
		data() {
			return {
				ygId:'',//员工主键id(从缓存中取)
				sub_type:'日',//数据请求参数默认日,点击tab切换赋值再次请求
				list: [{
						name: '日',
						count:0
					}, 
					{
						name: '周',
						count:1
					}, 
					{
						name: '月',
						count:2
					}],
				current: 0,
				contentList:[
					{'num':null,'title':'排名'},
					{'num':null,'title':'条目数'},
					{'num':null,'title':'折合件数'},
					{'num':null,'title':'金额'},
				],
				//u-chart相关数据
				chartsTitle:'',//柱状图标题
				cWidth:'810',//树状图宽度数据
				cHeight:'295',//树状图高度数据
				pixelRatio:1,
				chartData: {
				  "categories": [],
				  "series": [
					  {
					// "color":"#0081d4",
					// "textColor":"#ffffff",
					// "name": "拣货排行榜",
						"data": [],
					// "color": "red"
					},
				  ]
				},
			};
		},
		created() {
			_self = this;
			_self.ygId = uni.getStorageSync('ygId')//从缓存中获取员工主键ID
			
		},
		mounted() {
			_self.tabrequest('日')
		},
		methods:{
			click(e){
				// console.log(e);
				//自定义tabbar定义的高亮下标传值
				_self.current = e.count
				_self.tabrequest(e.name)
			},
			//数据请求方法 两个接口写在一起 参数(subType为tabbar选中项)
			tabrequest(subType){
				_self.$request({
					data:{'proc':'MYC_APP_hdjh','type':'个人业绩','yg_id':_self.ygId,'sub_type':subType}
				}).then(res =>{
					const resdata = res.Msg_info[0] //返回数据第一个对象为所需数据对象 提取出来
					// console.log(resdata);
					_self.contentList[0].num = resdata.paiming  ?resdata.paiming : 0
					_self.contentList[1].num = resdata.items ?resdata.items : 0
					_self.contentList[2].num = resdata.jianshu ?resdata.jianshu : 0
					_self.contentList[3].num = resdata.amout ?resdata.amout : 0
				})
				_self.$request({
					data:{'proc':'MYC_APP_hdjh','type':'业绩排行榜','sub_type':subType}
				}).then(res =>{
					const resdata = res.Msg_info[0] //返回数据第一个对象为所需数据对象 提取出来
					// console.log(resdata);
					_self.chartsTitle = resdata.rank_name
					_self.chartData.series[0].data = resdata.items.split('+').map(Number)
					_self.chartData.categories = resdata.Names.split('+')
					_self.$nextTick(function(){
						_self.showColumn("canvasColumn1",_self.$data.chartData);
					})
				})
			},
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
					fontSize:11,
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
						format:val =>{
							return val.toFixed(2);
						},
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
							width:chartData.categories.length > 6 ? _self.cWidth*_self.pixelRatio*0.5/chartData.categories.length : 45
						}
					  }
				});
			},
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
		margin: 20px 50px;
		width: 700px;
		height: 61px;
		line-height: 61px;
		display: flex;
		align-items: center;
	}
	.top-img{
		width: 61px;
		height: 61px;
		
	}
	.top-img image{
		width: 61px;
		height: 61px;
	}
	.top-title{
		width: 250px;
		height: 61px;
		line-height: 61px;
		font-size: 36px;
		text-align: center;
	}
	.top-date{
		width: 290px;
		height: 35px;
	}
	.tabbar-containers{
		width: 290px;
		height: 35px;
		line-height: 35px;
		display: flex;
		flex-direction: row;
		font-size: 15rpx;
		border-radius:4px;
		border: 1px solid #FFFFFF;
	}
	.tabbar-items{
		flex: 1;
		text-align: center;	
	}
	.tabbaritem-title{
		width: 100%;
		height: 100%;
		text-align: center;	
		
		// border: 1px ;
	}
	.tabbar-items:first-child{
		border-right: 1px solid #FFFFFF;
		
	}
	.tabbar-items:last-child{
		border-left: 1px solid #FFFFFF;
		
	}
	.tabbar-items:first-child .tabbaritem-title{
		border-radius:4px 0 0 4px;
	}
	.tabbar-items:last-child .tabbaritem-title{
		border-radius:0 4px 4px 0;
	}
	.content{
		box-sizing: border-box;
		padding: 0 15px;
		width: 100%;
		height: 160px;
		line-height:160px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.content-item {
		width: 23.5%;
		height: 160px;
		background-color: rgba($color: #ffffff, $alpha: 0.3);
	}
	.content-num{
		width: 100%;
		height: 90px;
		line-height: 90px;
		text-align: center;
		font-size: 45px;
	}
	.content-title{
		width: 100%;
		height: 70px;
		line-height: 70px;
		text-align: center;
		font-size: 36px;
	}
	.charts-container{
		margin-top: 5px;
		box-sizing: border-box;
		padding: 0 15px;
		width: 100%;
		height: 330px;
		// background-color: #18B566;
	}
	.columncontainer{
		width: 100%;
		height: 325px;
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
		width: 810px;
		height: 295px;
	}
	.qiun-charts {
		width: 810px;
		height: 295px;
	}
	.charts {
		width: 810px;
		height: 295px;
	}
</style>
