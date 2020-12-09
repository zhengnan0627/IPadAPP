<script>
export default {
	onLaunch: function() {
		let _this = this;
		//#ifdef APP-PLUS
			//保持横屏显示
			plus.screen.lockOrientation('landscape-primary');
	
	/** 检测升级 */
		//整包更新前端代码
		  //   var server = "http://152.136.28.147:9009/VXMail/PublicUrl.ashx"; //检查更新地址  
		  //   var req = { //升级检测数据
				// "proc":"MYC_APP_hdjh",
				// "type":"获取版本更新",
		  //       "appid": plus.runtime.appid,  
		  //       "version": plus.runtime.version  
		  //   };  
		  //   uni.request({  
		  //       url: server,  
		  //       data: req,  
		  //       success: (res) => {  
				// 	// console.log(res.data);
		  //           if (res.statusCode == 200 && res.data.Msg_info[0].status == 1) {  
		  //               uni.showModal({ //提醒用户更新  
		  //                   title: "更新提示",  
		  //                   content: res.data.Msg_info[0].note,  
		  //                   success: (ress) => {  
		  //                       if (ress.confirm) {  
				// 					// console.log(ress);
		  //                           plus.runtime.openURL(res.data.Msg_info[0].url);  
		  //                       }  
		  //                   }  
		  //               })  
		  //           }  
		  //       }  
		  //   })  
			/** 检测升级 */
				//整包更新前端代码
				    // var server = "http://152.136.28.147:9009/VXMail/PublicUrl.ashx"; //检查更新地址  
				 //    var req = { //升级检测数据
					// 	"proc":"APP_YWY_PORT",
					// 	"type":"获取版本更新",
				 //        "appid": plus.runtime.appid,  
				 //        "version": plus.runtime.version  
				 //    }; 
					// if(uni.getStorageSync('baseUrl')){
					// 	this.$request({
					// 		data:req
					// 	}).then(res => {
					// 		if (res.Msg_info[0].status == 1) {
					// 		    uni.showModal({ //提醒用户更新  
					// 		        title: "更新提示",  
					// 		        content: res.Msg_info[0].note,  
					// 		        success: (ress) => {  
					// 		            if (ress.confirm) {  		
					// 		                plus.runtime.openURL(res.Msg_info[0].url);  
					// 		            }  
					// 		        }  
					// 		    })  
					// 		} 
					// 	}) 
					// }
					
					
			// plus.io.requestFileSystem( plus.io.PUBLIC_DOWNLOAD, function(fs){
			// 		// fs.root是根目录操作对象DirectoryEntry
			// 		// 创建读取目录信息对象 
			// 		var directoryReader = fs.root.createReader();
			// 		directoryReader.readEntries( function( entries ){
			// 		// readEntries: 获取当前目录中的所有文件和子目录
			// 			var i;
			// 			for( i=0; i < entries.length; i++ ) {
			// 				//进行对文件进行操作
			// 				//这里可以指定文件名，看需求定
			// 				var fileName = entries[i].name;
			// 				var filePath = "_downloads/" + entries[i].name;
			// 				//获取文件对象
			// 				plus.io.resolveLocalFileSystemURL(filePath,function(entry){
			// 					//删除文件
			// 					entry.remove();
			// 				},function(e){
			// 					console.log('???',e)
			// 				})
			// 			}
			// 		}, function ( e ) {
			// 			alert( "Read entries failed: " + e.message );
			// 		} );
			// 	} );
		// 取得版本号

		// plus.runtime.getProperty(plus.runtime.appid, function(info) {
		
		// console.log("当前应用版本：" + info.version + "---" + plus.runtime.version);
		
		// _this.$com.ajax("update", {
		
		// "appid": plus.runtime.appid,
		
		// "version": plus.runtime.version
		
		// }, "POST", false,function(ret) {
		
		// console.log("【appid】", plus.runtime.appid)
		
		// console.log("【version】", plus.runtime.version)
		
		//     console.log("版本升级接口回调", ret)
		
		// if (ret.status) {
		
		// // 下载wgt文件 
		
		// var wgtUrl = "https://xxxxx.cn/update/1.0.1.wgt";  //下载文件地址（也可以从后台获取）
		
		// plus.nativeUI.showWaiting("正在更新中，请稍后..");
		
		// plus.downloader.createDownload(wgtUrl, {
		
		// filename: "_doc/update/"
		
		// }, function(d, status) {
		
		// if (status == 200) {
		
		// let path =d.filename
		
		// // 安装wgt包 更新应用资源
		
		// plus.nativeUI.showWaiting("正在更新中，请稍后...");
		
		// plus.runtime.install(d.filename, {
		
		// 　force: true
		
		// }, function() {
		
		// plus.nativeUI.closeWaiting();
		
		// console.log("新版本文件成功！");
		
		// plus.nativeUI.alert("软件应用更新完成！", function() {
		
		// plus.runtime.restart(); //必须执行 plus.runtime.restart()，否则新的内容并不会生效
		
		// });
		
		// }, function(e) {
		
		// console.log(e)
		
		// plus.nativeUI.closeWaiting();
		
		// console.log("更新失败[" + e.code + "]：" + e.message);
		
		// plus.nativeUI.alert("更新失败[" + e.code + "]：" + e.message);
		
		// });
		
		// } else {
		
		// console.log("下载wgt失败！");
		
		// plus.nativeUI.alert("下载wgt失败！");
		
		// }
		
		// plus.nativeUI.closeWaiting();
		
		// }).start();
		
		// }
		
		
		
		// })
		
		// })
		
		//热更新前端代码
			// plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {  
			//     uni.request({  
			//         url: 'http://www.example.com/update/',  
			//         data: {  
			//             version: widgetInfo.version,  
			//             name: widgetInfo.name  
			//         },  
			//         success: (result) => {  
			//             var data = result.data;  
			//             if (data.update && data.wgtUrl) {  
			//                 uni.downloadFile({  
			//                     url: data.wgtUrl,  
			//                     success: (downloadResult) => {  
			//                         if (downloadResult.statusCode === 200) {  
			//                             plus.runtime.install(downloadResult.tempFilePath, {  
			//                                 force: false  
			//                             }, function() {  
			//                                 console.log('install success...');  
			//                                 plus.runtime.restart();  
			//                             }, function(e) {  
			//                                 console.error('install fail...');  
			//                             });  
			//                         }  
			//                     }  
			//                 });  
			//             }  
			//         }  
			//     });  
			// });  
			// #endif
		// console.log('App Launch');
	},
	onShow: function() {
		// console.log('App Show');
	},
	onHide: function() {
		// console.log('App Hide');
	}
};
</script>

<style lang="scss">
@import "uview-ui/index.scss";
</style>
