if (typeof FnMsg == "undefined" || !FnMsg) {
    var FnMsg = {};
};
function getTopForMsg(e){
	var offset=e.offsetTop;
		if(e.offsetParent!=null) offset+= getTopForMsg(e.offsetParent);
		return offset;
}
FnMsg = { box:'#msg-box',closeid:'#msg-close',unameid:'#msg-uname',countid:'#msg-count',tipsid:'#coverTips',
		  tid:'#msg-text',buttonid:'#msg-send' ,userclass:'.private',limit:300,length:0,canSend:false,
		  d:{uid:0,uname:'',content:'',p:''} , 
	checkUser:function(){
		var userid = readCookie('bbuserid');
		if(!userid){
			return false;
		}else{
			return true;
		}
		
	},
	 
	showDialog:function (elem){
		//先判断用户登录
		if(!FnMsg.checkUser()){
			alert('请先登录');
			document.location='http://my.fengniao.com/login.php?url='+window.location;
			return false;
		}
		
		//重置数据
		FnMsg.resetValue(elem);
		FnMsg.sendLimit();
		//显示对话框
		$(FnMsg.box).show();
	},
	closeDialog:function (){
		$(FnMsg.box).hide();
	},
	checkMsg:function(){
		FnMsg.canSend = true;
		FnMsg.textLength();
		 if(FnMsg.length>FnMsg.limit){
			 FnMsg.canSend = false;
		 }else if(0 == FnMsg.length){
			 FnMsg.canSend = false;
		 }
	},
	sendMsg:function(){
		FnMsg.checkMsg();
		if( !FnMsg.canSend){
			return false;
		}
		var url = "http://my.fengniao.com/ajax/ajaxMessage.php?jsoncallback=?"  ;
		var  data = {nickname:FnMsg.d.uname,f_userid:FnMsg.d.uid,invite_content:FnMsg.d.content,action:'send_msg',pmid:0,p:FnMsg.d.p};
		$.getJSON(url,data,function(obj){
			if(1 == obj.flag){
				FnMsg.showTips('发送成功',1000);
				FnMsg.closeDialog();
			}else{
				if('请先登录' == obj.msg){
					alert('请先登录');
					document.location='http://my.fengniao.com/login.php?url='+window.location;
				}else{
					FnMsg.showTips(obj.msg,2500);
				}
			}
		});
	},
	showTips:function(msg,showtime){
	    $(FnMsg.tipsid).html('<div class="popTipsBox"> <p class="matter">'+msg+'</p></div>').show() ;
	    setTimeout(function(){
	    	$(FnMsg.tipsid).hide();
	    	},showtime); 
	},
	sendLimit:function (){
		 
			FnMsg.textLength();
			$(FnMsg.countid).html(FnMsg.length);
			if(FnMsg.length>FnMsg.limit){
				$(FnMsg.countid).parent().addClass("countNo");
				$(FnMsg.buttonid).addClass("bUButton1No");
			}else if(0 == FnMsg.length){
				$(FnMsg.countid).parent().addClass("countNo");
				$(FnMsg.buttonid).addClass("bUButton1No");
			}else{
				$(FnMsg.countid).parent().removeClass("countNo");
				$(FnMsg.buttonid).removeClass("bUButton1No");
			}
	},
	textLength:function(){
				//获取编辑框内容长度
				FnMsg.d.content = $(FnMsg.tid).val();
				var length;
				//空字符串处理
				var content_temp = FnMsg.d.content.replace(/(^\s*)|(\s*$)/g, '');  
				if(0==content_temp.length){
					 length = 0;
				}else{
					var newvalue = FnMsg.d.content.replace(/[^\x00-\xff]/g, "**");  
					length = newvalue.length+1;
				}
				FnMsg.length = Math.abs(parseInt(length/2));
	},
	resetValue:function(elem){
		//重置用户信息变量
		FnMsg.d.p = $(elem).attr('p');
		FnMsg.d.uid = $(elem).attr('uid');
		FnMsg.d.uname = $(elem).attr('uname');
//		重置私信框信息 和高度等
		FnMsg.d.content = '';
		$(FnMsg.tid).val('');
		$(FnMsg.unameid).html('发给：'+ FnMsg.d.uname);
//		var top =   getTopForMsg(elem) ;
//		 
//		$(FnMsg.box).css('top',top-125);
//		$(FnMsg.tipsid).css('top',top-32);
		$(FnMsg.countid).html('0');
 	},
 	
	init:function(){
	  //点击显示私信对话框
	  $(FnMsg.userclass).click(function(){
		    
			FnMsg.showDialog(this);
	  });
	  
	  //关闭私信对话框
	  $(FnMsg.closeid).click(function(){
			FnMsg.closeDialog();
	  });
	  //计算值等，浏览器会记录输入框文字	
	  FnMsg.sendLimit();
	  //绑定文字输入计算字数事件
	  $(FnMsg.tid).keyup(function(){return FnMsg.sendLimit()});
	  //ctrl + 回车 发私信
	  $(FnMsg.tid).keydown(function(keys){ if(keys.ctrlKey && keys.keyCode == 13){
			FnMsg.sendMsg();
		}
	  });
	  //发送私信
	  $(FnMsg.buttonid).click(function(){
			FnMsg.sendMsg();
	   });
	}
}
//私信
FnMsg.init();