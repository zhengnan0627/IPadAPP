<template>
	<view class="container">
		<scroll-view scroll-y scroll-with-animation class="tabbar tabbar-container" :scroll-top="scrollTop" :key="tdkey">
			<view class="tabbar-item" v-for="(item,index) in list" :key="index" @click="click(item,index)">
				<view class="tabbaritem-img">
					<image :src="current == index ? '/static/huojia-highlight.png' : '/static/huojia-gray.png'" mode="aspectFit"/>
					<u-badge  :count="item.td_wwc_rw_num" size="mini" :offset="[-7,5]"></u-badge>
				</view>
				<view class="tabbaritem-title" :style="{ color: current == index ? '#2d8cff' : '#e6e6e6' }">
					{{item.td_title}}
				</view>
			</view>
		</scroll-view>
		<view class="right-container">
			<view class="right-box">
				<view class="top">
					<view class="top-bianhao">
						任务编号:{{orderId}}
					</view>
					<view class="top-commit" @click="commit">
						提交任务
					</view>
					<view class="top-img" @click="backhome">
						<image src="/static/shouye-gray.png" mode=""></image>
					</view>
				</view>
				<view class="top-2">
					<view class="topitem-2">
						当前位置:{{weizhi}}
					</view>
					<view class="topitem-2" >
						当前通道第
						<text style="color: #007AFF; font-size: 27px; padding: 0 3px;">{{rightindex + 1}}</text>
						个条目,本通道共
						<text style=" padding: 0 3px; color: #ff0000; font-size: 27px;">{{rightdata.length}}</text>
						个条目
					</view>
				</view>
				<view class="content-box">
					<view class="content-left">
						<view class="content-img">
							<image :src="rightdata[rightindex].Imageurl" mode="aspectFit"></image>
						</view>
						<view class="content-fenye">
							<uni-pagination :pageSize="1" :total="pagetotal" :current="rightindex + 1" @change="change"></uni-pagination>
						</view>
					</view>
					<view class="content-right">
						<view class="content-table">
							<view class="table-item">
								<view class="item-left">位置</view>
								<view class="item-right">{{rightdata[rightindex].rw_weizhi}}</view>
							</view>
							<view class="table-item">
								<view class="item-left">名字</view>
								<view class="item-right">{{rightdata[rightindex].rw_yp_name}}</view>
							</view>
							<view class="table-item">
								<view class="item-left">数量</view>
								<!-- <view class="item-right">
									<u-number-box v-model="numberboxValue" 
									@change="valChange" 
									:max="numberboxValueMax"
									:input-width="60" 
									:input-height="30"
									:size="20"
									color="#5e5e5e"
									:key="numberkey"
									:disabled="rightdata[rightindex].is_jhwc == '1'"
									></u-number-box>
								</view> -->
								<view class="item-right">
									{{numberboxValue}}
								</view>
								<text 	:class="{'btn-active':rightdata[rightindex].is_jhwc == '0'}"
										@click="rightdata[rightindex].is_jhwc == '1'? '':numberbox = true"  
										style="height: 35px; line-height: 35px; 
										font-size: 24px; margin-right: 5px; padding: 0 15px; 
										background-color: #d7d7d7; color: #FFFFFF;">
									修改
								</text>
							</view>
							<view class="table-item">
								<view class="item-left">单位</view>
								<view class="item-right">{{rightdata[rightindex].rw_yp_danwei}}</view>
							</view>
							<view class="table-item">
								<view class="item-left">批号</view>
								<view class="item-right">{{rightdata[rightindex].rw_yp_pihao}}</view>
							</view>
							<view class="table-item">
								<view class="item-left">厂家</view>
								<view class="item-right">{{rightdata[rightindex].rw_yp_changjia}}</view>
							</view>
							<view class="table-item">
								<view class="item-left">规格</view>
								<view class="item-right">{{rightdata[rightindex].rw_yp_guige}}</view>
							</view>
						</view>
						<view class="content-caozuo">
							<view class="caozuo-quxiao">
								<text  :class="{'btn-active':rightdata[rightindex].is_jhwc != '0'}"
										@click="rightdata[rightindex].is_jhwc == '0'? '':quxiaoshow = true"
								>取消拣选</text>
							</view>
							<view class="caozuo-queren">
								<text :class="{'btn-active':rightdata[rightindex].is_jhwc == '0'}"
										@click="rightdata[rightindex].is_jhwc == '0'? querenjianxuan():''"
								>确认拣选</text>
							</view>
						</view>
					</view>
				</view>
				
				<u-modal v-model="numberbox"  @confirm="numberbox = false" :show-title="false"
						width="auto" height="auto"  :mask-close-able="true"
						:content-style="{padding:'20px',fontSize:'30px',color:'#606266'}"
						:confirm-style="{padding:'10px',height:'40px',lineHeight:'30px',fontSize:'22px',alignItems:'center'}">
						<view class="slot-content">
								<u-number-box v-model="numberboxValue"
								@change="valChange" 
								:max="numberboxValueMax"
								:input-width="60" 
								:input-height="30"
								:size="20"
								color="#5e5e5e"
								:key="numberkey"
								:disabled="rightdata[rightindex].is_jhwc == '1'"
								></u-number-box>
						</view>
				</u-modal>
				<!-- 提交任务按钮弹出提示框  全部完成状态 -->
				<u-popup v-model="finishshow" mode="center" border-radius="14">
					<view class="finishshow">
						<view class="finish-title">
							任务完成结果
						</view>
						<view class="finish-bianhao">
							{{orderId}}
						</view>
						<view class="finish-table">
							<view class="tableleft">
								<text class="">总条目数:</text>
							</view>
							<view class="tableright">
								<text class="">{{ztm}}</text>
							</view>
						</view>
						<view class="finish-table">
							<view class="tableleft">
								<text class="">提交复核台号:</text>
							</view>
							<view class="tableright">
								<text class="" style="font-size: 40px; color: #ff0000;">{{fhtId}}</text>
							</view>
						</view>
						<view class="table-btnbox">
							<view class="table-btn">
								<text @click="querencommit">确认提交</text>
							</view>
							<view class="table-btn">
								<text @click="finishshow = false">取消</text>
							</view>
						</view>
						<view class="tip">
							提示:任务完成,请将任务提交到指定编号复核台,确认提交后,任务将不可再修改
						</view>
					</view>
				</u-popup>
				<!-- 提交任务按钮弹出提示框  条目未完成状态 -->
				<u-modal v-model="unfinishedshow" :content="unfinishedcontent"
						width="auto" height="auto" confirm-text="关闭"
						:title-style="{paddingTop:'10px'}" :content-style="{padding:'20px',fontSize:'30px',color:'#606266'}"
						:confirm-style="{padding:'10px',height:'70px',lineHeight:'50px',fontSize:'26px',alignItems:'center'}">
				</u-modal>
				<!-- 取消拣选按钮弹出提示框 -->
				<u-modal v-model="quxiaoshow" :content="quxiaocontent" @confirm="quxiao"
						width="auto" height="auto" show-cancel-button cancel-text="不,点错了"
						:title-style="{paddingTop:'10px'}" :content-style="{padding:'20px',fontSize:'30px',color:'#606266'}"
						:cancel-style="{padding:'10px',height:'70px',lineHeight:'50px',fontSize:'26px',alignItems:'center'}"
						:confirm-style="{padding:'10px',height:'70px',lineHeight:'50px',fontSize:'26px',alignItems:'center'}">
				</u-modal>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			// 整体页面固有数据(如:员工id 总任务编号  总条目数  总体复核台号)
				ygId:'',//员工主键id(从缓存中取)
				orderId:'',//总任务编号
				fhtId:'',//总复核台号
				ztm:'',//总条目数
				weizhi:'',//当前位置
			//左侧tabbar
				current: 0,//左边菜单当前选择项
				tdkey:0,//左侧控制渲染绑定key
				scrollTop: 0, //tab标题的滚动条位置
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
			//左侧菜单数据集合
				list:[
					// {text: '通道101',count: 0,badge: 7,},
					// {text: '通道202',count: 1,badge: 0,},
				],
			//右侧数据集合
				pagetotal:1,//分页器总条目数
				rightindex:0,//右侧数据当前下标
			//右侧区域展示数据集合
				rightdata:[
					{
						td_id:'',
						rw_yp_id:'',
						Imageurl:'',
						rw_weizhi:'',
						rw_yp_name:'',
						rw_yp_num:'',
						rw_yp_danwei:'',
						rw_yp_pihao:'',
						rw_yp_changjia:'',
						rw_yp_guige:''
					},
				],
				numberbox:false,//步进器组件--控制弹出层
				numberkey:0,//步进器组件--控制刷新组件的key
				numberboxValue:null,//步进器组件--右侧条目信息当前值
				numberboxValueMax:null,//步进器组件--右侧条目信息数量值最大值
				finishshow:false,//弹出层组件--提交任务按钮弹出提示框布尔值控制弹出层(全部完全)
				unfinishedshow:false,//弹出层组件--提交任务按钮弹出提示框布尔值控制弹出层(未完成)
				unfinishedcontent:'当前任务还有未完成条目数,不可提交',//弹出层组件--提交任务按钮弹出提示框内容
				quxiaoshow:false,//弹出层组件--取消拣选按钮弹出提示框布尔值控制弹出层
				quxiaocontent:'本条目已拣选完成,是否要取消拣选?',//弹出层组件--取消拣选按钮弹出提示框内容
			}
		},
		onLoad() {
			const _this = this
			this.ygId = uni.getStorageSync('ygId')
			console.log(this.ygId);
			//第一次进入页面进行一次领取通道任务，之后只允许刷新通道任务接口
			this.$request({
				data:{'proc':'MYC_APP_hdjh','type':'领取通道任务','yg_id':this.ygId}
			}).then(res => {
				const resdata = res.Msg_info
				console.log(resdata);
				this.list = resdata //左侧通道数据数组赋值
				this.orderId = resdata[0].rw_order_id //保存总任务编号
				this.fhtId = resdata[0].fht_hao //保存总任务复核台号
				this.ztm = resdata[0].ztm //保存总任务总条目数
				this.weizhi = this.list[0].td_title //赋值第一个显示页面的当前通道位置字段
				_this.hq_rightdata(resdata[0])
			})
		},
		watch:{
			list(newVal,oldVal){
				let everyfinish = newVal.every(item => {
					return item.td_wwc_rw_num == '0'
				})
				if(everyfinish){
					this.finishshow = true
				}else{
					this.finishshow = false
				}
			}
		},
		methods: {
			//右上角返回首页
			backhome(){
				uni.navigateBack({
					
				})
			},
			//点击通道获取对应通道内任务列表方法,可反复调用参数e为左侧被点击通道的item
			hq_rightdata(e){
				const _this = this
				// console.log('qqqq');
				_this.$request({
					data:{'proc':'MYC_APP_hdjh','type':'通道任务','rw_order_id':e.rw_order_id,'yg_id':this.ygId,'td_id':e.td_id}
				}).then(res =>{
					const resdata = res.Msg_info
					// console.log(resdata);
					_this.pagetotal = resdata.length
					_this.rightdata = resdata
					_this.numberboxValue = resdata[_this.rightindex].rw_yp_num * 1
					_this.numberboxValueMax = resdata[_this.rightindex].rw_yp_num * 1
					_this.numberkey += 1
					// console.log(_this.numberboxValue,_this.numberboxValueMax);
				})
			},
			//刷新通道信息方法
			updata_td(){
				const _this = this
				_this.$request({
					data:{'proc':'MYC_APP_hdjh','type':'刷新通道信息','rw_order_id':_this.orderId}
				}).then(res => {
					const resdata = res.Msg_info
					_this.list = resdata
					// _this.tdkey += 1
					// console.log(resdata);
				})
			},
			//左侧点击item事件（参数e为item，index为数组下标index）
			async click(e,index){
				// console.log(e);
				// console.log(index);
				this.rightindex = 0  //重置右侧通道显示页下标
				this.current = index //高亮显示下标
				this.weizhi = e.td_title 
				// 如果为0，意味着尚未初始化
				if(this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('tabbar-container', 'menuHeight');
					await this.getElRect('tabbar-item', 'menuItemHeight');
				}
				// 将菜单菜单活动item垂直居中
				this.scrollTop = this.current * this.menuItemHeight + this.menuItemHeight  - this.menuHeight / 2;
				// this.hq_rightdata()
				//获取点击对应的右侧任务条目列表
				this.hq_rightdata(e);
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({size: true},res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if(!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return ;
						}
						this[dataVal] = res.height;
					}).exec();
				})
			},
			//点击上下页方法
			change(e){	
				const _this = this
				// console.log(e);
				if(e.type == 'next'){
					// console.log('下一页');
					if(_this.rightindex + 1 < _this.rightdata.length){
						_this.rightindex += 1
						return
					}else {
						_this.rightindex = _this.rightindex
						return
					}
				}else{
					// console.log('上一页');
					if(_this.rightindex + 1 > 0){
						_this.rightindex -= 1
						return
					}else {
						_this.rightindex = _this.rightindex
						return
					}
				}
			},
			//数量加减方法
			valChange(e) {
				// console.log('当前值为: ' + e.value)
			},
			//提交任务按钮选择打开哪种状态弹出层方法
			commit(){
				//判断左侧通道列表list数组中未完成条目字段td_wwc_rw_num是否都为0，都为0则打开finishshow
				//否则打开uniunfinishedshow
				// console.log(this.list);
				let everyfinish = this.list.every(item => {
					return item.td_wwc_rw_num == '0'
				})
				if(everyfinish){
					this.finishshow = true
				}else{
					this.unfinishedshow = true
				}
			},
			//确认提交按钮方法
			querencommit(){
				this.$request({
					data:{'proc':'MYC_APP_hdjh','type':'提交任务','rw_order_id':this.orderId}
				}).then(res => {
					const resdata = res.Msg_info
					// _this.tdkey += 1
					// console.log(resdata);
					this.finishshow = false
					uni.showToast({
						title:'提交成功回首页',
						icon:'success',
						duration:1000,
						success: () => {
							setTimeout(() =>{
								uni.navigateBack({
								})
							},1000)
							
						}
					})
					
				})	
			},
			//确认拣选按钮方法
			querenjianxuan(){
				// console.log('eeeeee');
				const _this = this
				_this.$request({
					data:{
						'proc':'MYC_APP_hdjh',
						'type':'确认拣选',
						'rw_order_id':_this.orderId,
						'yp_id':_this.rightdata[_this.rightindex].rw_yp_id,
						'yp_num':_this.numberboxValue,
						'huowei_bh':_this.rightdata[_this.rightindex].rw_weizhi,
						'pihao':_this.rightdata[_this.rightindex].rw_yp_pihao
						}
				}).then(res => {
					// console.log(res);
					_this.rightdata[_this.rightindex].is_jhwc = '1'
					//自动下一个通道逻辑:判断右侧显示页面控制下标rightindex +1
					//之后(因为初始为0，和右侧需展示数据数组长度相比需先 +1)
					//若不相等说明右侧需展示数组还有数据则右侧页面下标 自加1 if判断结束
					//若不相等则说明右侧数据展示完毕判断左侧通道数组通过左侧高亮及选中下标current
					//与左侧通道数组长度相比(逻辑同上),若等于则说明作则通道选择到最后一项了 if结束
					//若if都不成立则什么都不运行
					if(_this.rightindex + 1 != _this.rightdata.length){
						_this.rightindex += 1
					}else if(_this.current + 1 != _this.list.length){
						_this.click(_this.list[_this.current + 1],_this.current + 1)
					}else{
						
					}
					_this.updata_td()
				
					// console.log(_this.list);
				})
			},
			//取消拣选按钮方法
			quxiao(){
				const _this = this
				_this.$request({
					data:{
						'proc':'MYC_APP_hdjh',
						'type':'取消拣选',
						'rw_order_id':_this.orderId,
						'yp_id':_this.rightdata[_this.rightindex].rw_yp_id,
						'yp_num':_this.numberboxValue,
						'huowei_bh':_this.rightdata[_this.rightindex].rw_weizhi,
						'pihao':_this.rightdata[_this.rightindex].rw_yp_pihao
						}
				}).then(res => {
					// console.log(res);
					_this.rightdata[_this.rightindex].is_jhwc = '0'
					_this.updata_td()
					// this.$nextTick(function(){
					// 	// console.log(_this.list);
					// })
					// console.log(_this.list);
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-image: linear-gradient(#646d73, #3886b9);
	}
	.container{
		background-image: linear-gradient(#646d73, #3886b9);
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		color: #b9c3ca;
		display: flex;
	}
	.btn-active{
		color: #FFFFFF !important;
		background-color: #2d8cff !important;
	}	
	.tabbar{
		width: 90px;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #333333;
	}
	.tabbar-container{
		position: relative;
		box-sizing: border-box;
		// padding-top: 10rpx;
		
		// width: 76.42rpx;
		width: 90px;
		height: 100%;
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
	.tabbar-item:first-child{
		margin-top: 10rpx;
	}
	.tabbaritem-img{
		position: relative;
		width: 90px;
		height: 45rpx;
	}
	.tabbaritem-img image{
		// width: 48.17rpx;
		// height: 48.17rpx;
		width: 50px;
		height: 50px;
	}
	.right-container{
		box-sizing: border-box;
		padding: 20px 20px;
		width: 100%;
		height: 100%;
	}
	.right-box{
		padding: 10px;
		width: 100%;
		height: 100%;
		background-color: rgba($color: #ffffff, $alpha: 0.3);
	}
	.top{
		display: flex;
		width: 100%;
		height: 40px;
		line-height: 40px;
	}
	.top-bianhao{
		font-size: 20px; 
		flex-grow: 2;
		color: #2d2d2d;
	}
	.top-commit{
		flex-grow: 1;
		height: 40px;
		line-height: 40px;
		background-color: #2a8dff;
		border-radius: 5px;
		text-align: center;
		font-size: 22px;
		color: #FFFFFF;
	}
	.top-img{
		// width: 40px;
		flex-grow: 1;
		height: 40px;
		text-align: center;
	}
	.top-img image{
		width: 40px;
		height: 40px;
	}
	.top-2{
		display: flex;
		width: 100%;
		height: 50px;
		line-height: 50px;
		font-size: 20px;
		color: #CCCCCC;
	}
	.topitem-2{
		flex: 5;
	}
	.topitem-2:last-child{
		text-align: center;
	}
	.content-box{
		padding-top: 20px;
		width: 100%;
		height: calc(100% - 90px) ;
		// background-color: #18B566;
		display: flex;
	}
	.content-left{
		flex: 1;
		// background-color: #000000;
	}
	/deep/ .uni-pagination__num{
		flex-grow: 0.5;
		width: 150px;
		// opacity: 0;
	}
	.content-img{
		width: 100%;
		height: 90%;
	}
	.content-img image{
		width: 100%;
		height: 90%;
	}
	.content-right{
		flex: 1;
		padding-left: 10px;
	}
	.content-table{
		width: 100%;
		height: 85%;
		display: flex;
		flex-direction: column;
		// background-color: #2C405A;
	}
	.table-item{
		flex: 1;
		display: flex;
		font-size: 30px;
		text-align: left;
		vertical-align: middle;
		align-items: center;
		border-bottom: 1px solid #7e7e7e;
	}
	.item-left{
		width: 100px;
		color: #4b4b4b;
	}
	.item-right{
		flex: 1;
		color: rgba($color: #ffffff, $alpha: 0.7);
		max-width: 300px;
		font-size: 26px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow:ellipsis;
	}
	.table-item:first-child{
		// background-color: #2C405A;
		flex-grow: 1.5;
		
	}
	.table-item:first-child .item-right{
		font-size: 40px;
		color: #ff0000;
	}
	.content-caozuo{
		display: flex;
		align-items: center;
		width: 100%;
		height: 15%;
		
	}
	.caozuo-quxiao,
	.caozuo-queren{
		flex: 1;
		text-align: center;
	}
	.caozuo-quxiao text,
	.caozuo-queren text{
		padding: 7px 20px;
		background-color: #d7d7d7;
		opacity: 1;
		font-size: 24px;
		color: #FFFFFF;
	}
	//提交完成状态提示框样式--------------------------------------
	.finishshow{
		padding: 5px 10px;
		width: 450px;
		height: 380px;
		color: #303030;
	}
	.finish-title{
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		color: #000000;
	}
	.finish-bianhao{
		width: 100%;
		height: 20px;
		line-height: 20px;
		text-align: center;
		font-size: 20px;
	}
	.finish-table{
		display: flex;
		justify-content: center;
		width: 100%;
		height: 80px;
		line-height:80px;
		font-size: 28px;
	}
	.tableleft{
		flex: 1.2;
		text-align: right;
	}
	.tableright{
		box-sizing: border-box;
		flex:1;
		padding-left: 20px;
	}
	.table-btnbox{
		display: flex;
		justify-content: center;
		width: 100%;
		height: 80px;
		line-height:80px;
		font-size: 28px;
		text-align: center;
		color: #303030;
	}
	.table-btn{
		flex: 1;
	}
	.table-btn text{
		padding: 4px 15px;
		border: 1px solid #303030;
		border-radius: 5px;
	}
	.table-btn:first-child text{
		color: #2a8dff;
	}
	.tip{
		font-size: 20px;
		color: #CCCCCC;
	}
</style>
