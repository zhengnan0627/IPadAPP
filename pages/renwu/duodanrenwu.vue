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
				<view class="top-2" v-if="rightdata.length > 0">
					<view class="topitem-2">
						当前位置:{{weizhi}}
					</view>
					<view class="topitem-2 topitem-tiaomu" >
						第
						<text style="color: #007AFF; font-size: 27px; padding: 0 3px;">{{rightindex + 1}}</text>
						条,共
						<text style=" padding: 0 3px; color: #ff0000; font-size: 27px;">{{rightdata.length}}</text>
						条
					</view>
					<view class="topitem-2 topitem-weizhi" >
						
						<text style="color: #ff0000; font-size: 34px;">{{rightdata[rightindex].rw_weizhi}}</text>
						
						
					</view>
				</view>
				<view class="content-box">
					<view class="content-left" v-if="rightdata.length > 0">
						<view class="content-img" >
							<image :src="rightdata[rightindex].Imageurl?rightdata[rightindex].Imageurl:'/static/noimage.png'" mode="aspectFit"></image>
						</view>
						<view class="content-table">
							<!-- <view class="table-item">
								<view class="item-left">位置</view>
								<view class="item-right">{{rightdata[rightindex].rw_weizhi}}</view>
							</view> -->
							<view class="table-item">
								<view class="item-left">名字</view>
								<view class="item-right">{{rightdata[rightindex].rw_yp_name}}</view>
							</view>
							<view class="table-item">
								<view class="item-left">规格</view>
								<view class="item-right">{{rightdata[rightindex].rw_yp_guige}}</view>
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
							
						</view>
						<!-- <view class="content-fenye">
							<uni-pagination :pageSize="1" :total="pagetotal" :current="rightindex + 1" @change="change"></uni-pagination>
						</view> -->
					</view>
					<view class="content-right" v-if="rightdata.length > 0">
						<view class="tuiche-box">
							<view class="tuiche-item" v-for="(item,index) in rightdata[rightindex].rw_yp_jxlist" :key="index">
								<view class="tuicheitem-title" >
									<view>{{item.basket_bianhao}}号{{item.basket_name}}</view>
									<view>{{item.fht_hao}}</view>	
								</view>
								<view class="tuicheitem-zhanwei" :class="{'tuicheitem-bgcolor':item.basket_jhwc == '0'}">
									
								</view>
								<view class="tuicheitem-numbox" :class="{'tuicheitem-bgcolor':item.basket_jhwc == '0'}">
									{{item.basket_rw_num}}
								</view>
								<view class="tuicheitem-numjiajian">
									<u-number-box v-model="item.basket_rw_num"
									:max="item.basket_rw_nummax" 
									:disabled-input="true"
									:min="0"
									:input-width="12" 
									:input-height="20"
									:size="20"
									bgColor="#EEEEEE"
									color="#000000"
									press-time="200"
									:key='item.basket_rw_nummax'
									:disabled="item.basket_jhwc == '1'"
									></u-number-box>
								</view>
								<view class="tuicheitem-confirm" @click="basketconfirm(item,index)">
									<u-icon name="checkmark" :color="item.basket_jhwc == '1'? '#2d8cff':'#cccccc'" size="20"></u-icon>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="footer-fenye" >
					<view class="content-fenye">
						<uni-pagination :pageSize="1" :total="pagetotal" :current="rightindex + 1" @change="change"></uni-pagination>
					</view>
				</view>
				<!-- 进入页面获取不到数据提示框-->
				<u-modal v-model="error" :content="errorcontent" @confirm="backhome"
						width="auto" height="auto" :show-title="false"
						:title-style="{paddingTop:'10px'}" :content-style="{padding:'20px',fontSize:'30px',color:'#606266'}"
						:confirm-style="{padding:'10px',height:'70px',lineHeight:'50px',fontSize:'26px',alignItems:'center'}">
				</u-modal>
				<!-- 提交任务按钮弹出提示框  全部完成状态 -->
				<u-popup v-model="finishshow" mode="center" border-radius="14" :mask-close-able="false">
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
							<view class="tableleft">
								<text class="">挑选条目数:</text>
							</view>
							<view class="tableright">
								<text class="">{{ztm}}</text>
							</view>
						</view>
						<view class="finishtable-box">
							<view class="table-title">
								<view class="tabletitle-xh" style="width: 60px;">
									序号
								</view>
								<view class="tabletitle-fhth"style="width: 120px;">
									复核台号
								</view>
								<view class="tabletitle-lzh" style="width: 120px;">
									篮子编号
								</view>
							</view>
							<view class="finishtable-content" v-for="item in commit_list">
								<view class=""style="width: 60px;">
									{{item.lanzi}}
								</view>
								<view class=""style="width: 120px;">
									{{item.fhtbh}}
								</view>
								<view class=""style="width: 120px; border: 1px solid #CCCCCC; border-radius: 3px;">
									<input class="finishtable-input" type="text" v-model="item.lzbh" :placeholder="placeholder"/>
								</view>
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
				<!-- 提交失败提示框-->
				<u-modal v-model="commiterror" :content="commiterrorcontent"
						width="auto" height="auto" :show-title="false"
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
					// {td_title: '通道101',count: 0,td_wwc_rw_num: 7,},
					// {td_title: '通道202',count: 1,td_wwc_rw_num: 0,},
				],
			//右侧数据集合
				pagetotal:1,//分页器总条目数
				rightindex:0,//右侧数据当前下标
			//右侧区域展示数据集合
				rightdata:[
					// {
					// 	td_id:'11',
					// 	rw_yp_id:'11',
					// 	Imageurl:'',
					// 	rw_weizhi:'L01-01-23',
					// 	rw_yp_name:'阿昔洛韦乳膏',
					// 	rw_yp_num:'22',
					// 	rw_yp_danwei:'盒',
					// 	rw_yp_pihao:'20200818',
					// 	rw_yp_changjia:'重庆XX医药有限公司 ',
					// 	rw_yp_guige:'100mg',
					// 	rw_yp_jxlist:[
					// 		{basket_bianhao:'1',basket_name:'篮',basket_rw_num:99,basket_rw_nummax:99,fht_hao:'1-101',basket_jhwc:'1'},
					// 		{basket_bianhao:'2',basket_name:'篮',basket_rw_num:99,basket_rw_nummax:99,fht_hao:'2-202',basket_jhwc:'0'},
					// 		{basket_bianhao:'3',basket_name:'篮',basket_rw_num:0,basket_rw_nummax:0,fht_hao:'3-303',basket_jhwc:'0'},
					// 		{basket_bianhao:'4',basket_name:'篮',basket_rw_num:99,basket_rw_nummax:99,fht_hao:'4-404',basket_jhwc:'1'},
					// 	]
					// },
					// {
					// 	td_id:'11',
					// 	rw_yp_id:'11',
					// 	Imageurl:'',
					// 	rw_weizhi:'L01-01-23',
					// 	rw_yp_name:'阿昔洛韦乳膏',
					// 	rw_yp_num:'22',
					// 	rw_yp_danwei:'盒',
					// 	rw_yp_pihao:'20200818',
					// 	rw_yp_changjia:'重庆XX医药有限公司 ',
					// 	rw_yp_guige:'100mg',
					// 	rw_yp_jxlist:[
					// 		{basket_bianhao:'1',basket_name:'篮',basket_rw_num:29,basket_rw_nummax:29,fht_hao:'1-101',basket_jhwc:'1'},
					// 		{basket_bianhao:'2',basket_name:'篮',basket_rw_num:19,basket_rw_nummax:19,fht_hao:'2-202',basket_jhwc:'0'},
					// 		{basket_bianhao:'3',basket_name:'篮',basket_rw_num:0,basket_rw_nummax:0,fht_hao:'3-303',basket_jhwc:'0'},
					// 		{basket_bianhao:'4',basket_name:'篮',basket_rw_num:99,basket_rw_nummax:99,fht_hao:'4-404',basket_jhwc:'0'},
					// 	]
					// },
				],
				//提交弹出层序号复核台号篮子号数据组
				need_basketNum:'否',//弹出层是否需要编辑篮子编号控制字段
				placeholder:'非必填项',//弹出层是否编辑篮子编号输入框占位符
				commit_list:[
					// {basket_bianhao:'1',basket_name:'篮',basket_rw_num:29,basket_rw_nummax:29,fht_hao:'1-101',basket_jhwc:'1'},
					// {basket_bianhao:'2',basket_name:'篮',basket_rw_num:19,basket_rw_nummax:19,fht_hao:'2-202',basket_jhwc:'0'},
					// {basket_bianhao:'3',basket_name:'篮',basket_rw_num:0,basket_rw_nummax:0,fht_hao:'3-303',basket_jhwc:'0'},
					// {basket_bianhao:'4',basket_name:'篮',basket_rw_num:99,basket_rw_nummax:99,fht_hao:'4-404',basket_jhwc:'0'},
				],
				error:false,//进入页面获取不到数据报错弹出层
				errorcontent:'获取不到新的任务单据，请稍候再试!', //进入页面获取不到数据报错弹出层文本
				numberbox:false,//步进器组件--控制弹出层
				numberkey:0,//步进器组件--控制刷新组件的key
				numberboxValue:12,//步进器组件--右侧条目信息当前值
				numberboxValueMax:12,//步进器组件--右侧条目信息数量值最大值
				finishshow:false,//弹出层组件--提交任务按钮弹出提示框布尔值控制弹出层(全部完全)
				unfinishedshow:false,//弹出层组件--提交任务按钮弹出提示框布尔值控制弹出层(未完成)
				unfinishedcontent:'当前任务还有未完成条目数,不可提交',//弹出层组件--提交任务按钮弹出提示框内容
				commiterror:false,//弹出层组件--提交失败弹出提示
				commiterrorcontent:'提交失败',//弹出层组件--提交失败弹出提示文本
				quxiaoshow:false,//弹出层组件--取消拣选按钮弹出提示框布尔值控制弹出层
				quxiaocontent:'本条目已拣选完成,是否要取消拣选?',//弹出层组件--取消拣选按钮弹出提示框内容
			}
		},
		onLoad() {
			const _this = this
			_this.ygId = uni.getStorageSync('ygId')
			_this.need_basketNum = uni.getStorageSync('needBasketNum')
			if(_this.need_basketNum == '是'){
				_this.placeholder = '必填项'
			}
			console.log(_this.ygId);
			//第一次进入页面进行一次领取通道任务，之后只允许刷新通道任务接口
			_this.$request({
				data:{'proc':'MYC_APP_hdjh','type':'领取通道任务','yg_id':_this.ygId}
			}).then(res => {
				const resdata = res.Msg_info
				if(resdata[0].error){
					_this.error = true
					_this.errorcontent = resdata[0].error
				}else{
					_this.list = resdata //左侧通道数据数组赋值
					_this.orderId = resdata[0].rw_order_id //保存总任务编号
					_this.fhtId = resdata[0].fht_hao //保存总任务复核台号
					_this.ztm = resdata[0].ztm //保存总任务总条目数
					_this.weizhi = _this.list[0].td_title //赋值第一个显示页面的当前通道位置字段
					_this.hq_rightdata(resdata[0])
				}
			})
		},
		watch:{
			list(newVal,oldVal){
				let everyfinish = newVal.every(item => {
					return item.td_wwc_rw_num == '0'
				})
				if(everyfinish){
					this.finishshow = true
					this.hq_commitlist()
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
					data:{'proc':'MYC_APP_hdjh','type':'通道任务多单','rw_order_id':e.rw_order_id,'yg_id':this.ygId,'td_id':e.td_id}
				}).then(res =>{
					const resdata = res.Msg_info
					// console.log(resdata);
					_this.pagetotal = resdata.length
					_this.rightdata = resdata.map((item,index) => {
						let basket_jhwc = item.basket_jhwc.split('+')
						let basket = item.basket.split('+')
						let basket_name = item.basket_name
						let fht_hao = item.fht_hao.split('+')
						let basket_rw_num = item.basket_rw_num.split('+').map(Number)
						// console.log(basket_jhwc);
						// console.log(basket);
						// console.log(fht_hao);
						// console.log(basket_rw_num);
						let list = basket.map((item,index) => {
							let basketpush = {}
							basketpush.basket_bianhao = item
							basketpush.basket_name = basket_name
							basketpush.basket_rw_num = +basket_rw_num[index]
							basketpush.basket_rw_nummax = +basket_rw_num[index]
							basketpush.fht_hao = fht_hao[index]
							basketpush.basket_jhwc = basket_jhwc[index]							
							return basketpush
						})
						item.rw_yp_jxlist = list
						return item
					})
					console.log(_this.rightdata);
					// let a = ['1','2','3','4']
					// let b = ['23','43','0','63']
					// let c = ['1-101','2-202','3-303','4-404']
					// let d = ['1','1','1','0'] 
					// let list = a.map((item,index) => {
					// 	let basketpush = {}
					// 	basketpush.basket_bianhao = item
					// 	basketpush.basket_name = '篮'
					// 	basketpush.basket_rw_num = +b[index]
					// 	basketpush.fht_hao = c[index]
					// 	basketpush.basket_jhwc = d[index]
					// 	return basketpush
					// })
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
					this.hq_commitlist()
				}else{
					this.unfinishedshow = true
				}
			},
			hq_commitlist(){
				this.$request({
					data:{'proc':'MYC_APP_hdjh','type':'获取提交展示','rw_order_id':this.orderId}
				}).then(res => {
					const resdata = res.Msg_info
					console.log(resdata);
					this.commit_list = resdata
				})
			},
			//多单页面确认拣选方法
			basketconfirm(item,index){
				
				const _this = this
				if(item.basket_jhwc == '1'&&item.basket_rw_nummax == 0){
					return
				}else if(item.basket_jhwc == '0'){
					_this.$request({
						data:{
							'proc':'MYC_APP_hdjh',
							'type':'确认拣选',
							'subtype':'多单',
							'rw_order_id':_this.orderId,
							'yp_id':_this.rightdata[_this.rightindex].rw_yp_id,
							'huowei_bh':_this.rightdata[_this.rightindex].rw_weizhi,
							'pihao':_this.rightdata[_this.rightindex].rw_yp_pihao,
							'yp_num':item.basket_rw_num,
							'basket':item.basket_bianhao,
							'fht_hao':item.fht_hao,
							}
					}).then(res => {
						console.log(res);
						item.basket_jhwc = '1'
						//自动下一个通道逻辑:判断右侧显示页面控制下标rightindex +1
						//之后(因为初始为0，和右侧需展示数据数组长度相比需先 +1)
						//若不相等说明右侧需展示数组还有数据则右侧页面下标 自加1 if判断结束
						//若不相等则说明右侧数据展示完毕判断左侧通道数组通过左侧高亮及选中下标current
						//与左侧通道数组长度相比(逻辑同上),若等于则说明作则通道选择到最后一项了 if结束
						//若if都不成立则什么都不运行
						if(_this.rightdata[_this.rightindex].rw_yp_jxlist.every(item => item.basket_jhwc == '1')){
							_this.rightdata[_this.rightindex].is_jhwc = '1'
							if(_this.rightindex + 1 != _this.rightdata.length){
								_this.rightindex += 1
							}else if(_this.current + 1 != _this.list.length){
								_this.click(_this.list[_this.current + 1],_this.current + 1)
							}else{
								
							}
							_this.updata_td()
						}else{
							uni.showToast({
								title:'确认拣选',
								icon:'none'
							})
						}
						// console.log(_this.list);
					})
				}else{
					_this.$request({
						data:{
							'proc':'MYC_APP_hdjh',
							'type':'取消拣选',
							'subtype':'多单',
							'rw_order_id':_this.orderId,
							'yp_id':_this.rightdata[_this.rightindex].rw_yp_id,
							'huowei_bh':_this.rightdata[_this.rightindex].rw_weizhi,
							'pihao':_this.rightdata[_this.rightindex].rw_yp_pihao,
							'yp_num':item.basket_rw_num,
							'basket':item.basket_bianhao,
							'fht_hao':item.fht_hao,
							}
					}).then(res => {
						console.log(res);
						item.basket_jhwc = '0'
						//自动下一个通道逻辑:判断右侧显示页面控制下标rightindex +1
						//之后(因为初始为0，和右侧需展示数据数组长度相比需先 +1)
						//若不相等说明右侧需展示数组还有数据则右侧页面下标 自加1 if判断结束
						//若不相等则说明右侧数据展示完毕判断左侧通道数组通过左侧高亮及选中下标current
						//与左侧通道数组长度相比(逻辑同上),若等于则说明作则通道选择到最后一项了 if结束
						//若if都不成立则什么都不运行
						if(_this.rightdata[_this.rightindex].rw_yp_jxlist.some(item => item.basket_jhwc == '0')){
							_this.rightdata[_this.rightindex].is_jhwc = '0'
							_this.updata_td()
							uni.showToast({
								title:'取消拣选',
								icon:'none'
							})
						}
					})
				}
				
				

			},
			//确认提交按钮方法
			querencommit(){
				console.log(this.commit_list);
				const _this = this
				if(_this.need_basketNum == '是'&&_this.commit_list.some(item => item.lzbh == '')) {
					uni.showToast({
						title:'请填写篮子编号',
						icon:'none'
					})
					return
				}
				const lanzi1 = _this.commit_list[0]?.lzbh || ''
				const lanzi2 = _this.commit_list[1]?.lzbh || ''
				const lanzi3 = _this.commit_list[2]?.lzbh || ''
				const lanzi4 = _this.commit_list[3]?.lzbh || ''
				this.$request({
					data:{
						'proc':'MYC_APP_hdjh',
						'type':'提交任务多单',
						'rw_order_id':this.orderId,
						'lanzi1':lanzi1,
						'lanzi2':lanzi2,
						'lanzi3':lanzi3,
						'lanzi4':lanzi4
						}
				}).then(res => {
					console.log(res);
					const resdata = res.Msg_info
					if(resdata[0].error){
						this.finishshow = false
						this.commiterror = true
						this.commiterrorcontent = resdata[0].error
					}else{
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
					}	
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
					console.log(res);
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
		flex: 1;
	}
	.topitem-2:last-child{
		text-align: center;
	}
	.topitem-2:first-child{
		flex-grow: 0.6;
	}
	.topitem-tiaomu{
		flex-grow: 0.5;
	}
	.content-box{
		padding-top: 20px;
		width: 100%;
		height: calc(100% - 120px) ;
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
		height: 40%;
	}
	.content-img image{
		width: 100%;
		height: 100%;
	}
	.content-right{
		flex: 1;
		// padding-left: 10px;
		background: transparent  url(/static/renwubj1.png) no-repeat;
		background-size: 100% 95%;
	}
	.tuiche-box{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		width: 80%;
		height: 86%;
		margin-top: 2%;
		margin-left: 16%;
		// background-color: #19BE6B;
	}
	.tuiche-item{
		width: 48%;
		height: 48%;
		// background-color: rgba($color: #00aaff, $alpha: .5);
	}
	.tuicheitem-title{
		width: 100%;
		height: 20px;
		line-height: 20px;
		font-size: 16px;
		color: #000000;
		display: flex;
		justify-content: space-around;
	}
	.tuicheitem-zhanwei{
		width: 100%;
		height: 10rpx;
		border: none;
		background-color: #CCCCCC;
	}
	.tuicheitem-bgcolor{
		background-color: #2d8cff !important;
	}
	.tuicheitem-numbox{
		margin: 0 auto;
		width: 75%;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		font-size: 30px;
		color: #000000;
		border: none;
		background-color: #CCCCCC;
	}
	.tuicheitem-numjiajian{
		margin: 0 auto;
		width: 75%;
		height: 30px;
		line-height: 30px;
		text-align: center;
		font-size: 28px;
		border: none;
		background-color: #EEEEEE;
	}
	.tuicheitem-numjiajian .u-numberbox /deep/.u-number-input{
		opacity: 0;
	}
	.tuicheitem-numjiajian .u-numberbox /deep/.u-icon-disabled{
		background-color: rgba($color: #EEEEEE, $alpha: 1) !important;
	}
	.tuicheitem-numjiajian .u-numberbox /deep/.u-icon-plus,
	.tuicheitem-numjiajian .u-numberbox /deep/.u-icon-minus{
		width: 20rpx;
		border-radius: 0px;
		background-color: rgba($color: #EEEEEE, $alpha: 0);
	}
	.tuicheitem-confirm{
		display: flex;
		align-items: center;
		justify-content: space-around;
		margin: 4px auto;
		width: 30px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		border-radius: 50%;
		background-color: #EEEEEE;
	}
	.content-table{
		margin:0 auto;
		width: 90%;
		height: 55%;
		display: flex;
		flex-direction: column;
		// background-color: #2C405A;
	}
	.table-item{
		flex: 1;
		display: flex;
		font-size: 24px;
		text-align: left;
		vertical-align: middle;
		align-items: center;
		// border-bottom: 1px solid #7e7e7e;
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
	// .table-item:first-child{
	// 	font-size: 32px;
	// 	color: #ff0000;
	// }
	// .table-item:first-child .item-right{
	// 	// font-size: 40px;
	// 	color: #ffffff;
	// }
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
	.footer-fenye{
		width: 100%;
		height: 40px;
		line-height: 40px;
	}
	//提交完成状态提示框样式--------------------------------------
	.finishshow{
		padding: 5px 10px;
		width: 650px;
		height: 480px;
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
		height: 50px;
		line-height:50px;
		font-size: 28px;
		border-bottom: 0.5px solid #000000;
	}
	.tableleft{
		flex: 1.2;
		color: #bebebe;
		text-align: right;
	}
	.tableright{
		box-sizing: border-box;
		flex:1;
		padding-left: 20px;
	}
	.finishtable-box{
		margin: 2px auto;
		width: 80%;
		height: 54%;
		// background-color: #18B566;
		font-size: 22px;
	}
	.table-title{
		display: flex;
		justify-content: space-around;
		align-items: center;
		text-align: center;
		width: 100%;
		height: 40px;
		line-height: 40px;
	}
	.finishtable-content{
		margin: 10px 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		text-align: center;
		width: 100%;
		height: 40px;
		line-height: 40px;
	}
	.finishtable-input{
		height: 40px;
		line-height: 40px;
		font-size: 22px;
	}
	.table-btnbox{
		display: flex;
		justify-content: center;
		width: 100%;
		height: 60px;
		line-height:60px;
		font-size: 28px;
		text-align: center;
		color: #303030;
	}
	.table-btn{
		flex: 1;
	}
	.table-btn text{
		padding: 2px 15px;
		border: 1px solid #303030;
		border-radius: 5px;
	}
	.table-btn:first-child text{
		color: #2a8dff;
	}
	.tip{
		font-size: 18px;
		color: #CCCCCC;
	}
</style>
