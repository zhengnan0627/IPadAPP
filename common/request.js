// const api = "http://152.136.28.147:9009/VXMail/"

//网络请求 封装文件


//请求分装
 function Request(options){
	const baseUrl = uni.getStorageSync('baseUrl') ? uni.getStorageSync('baseUrl') : '';
	const api = `http://${baseUrl}/VXMail/PublicUrl.ashx`
	const promise = new Promise(function(resolve,reject){
		uni.showLoading({
			title:'加载中'
		})
		uni.request({
			url:api,// + options.url
			method:options.method ||"GET",
			data:options.data || {},
			dataType:options.dataType || "json",
			header:options.header || {},
			success:function(res){
				uni.hideLoading()
				// console.log('接口返回'+ res);
				if(res.statusCode == 200){
					resolve(res.data)
				}else{
					resolve(res.data)
				}
			},
			fail:function(res){
				uni.hideLoading()
				// console.log('接口失败'+ baseUrl);
				reject('网络出错')
			}
		})
	})
	return promise;
}
export default Request
// module.exports = Request