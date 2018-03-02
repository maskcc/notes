jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};


var pm = 0;
 
//关注，取消关注，移除粉丝 通用接口函数	
var current_elem;
 function follow_action(elem){
    if($(elem).hasClass('attentioned')){
    	return false;
    }
    current_elem = elem;
	var uid = $(elem).attr('uid');
	if(!uid){
		alert('参数错误');
	}
	var p = $(elem).attr('p');
    var	url =  'http://my.fengniao.com/ajax/ajaxFollowAction.php?userid=' + uid + '&p='+p ;
    $.ajax({
    	             url:url,
    	             dataType:"jsonp",
    	             jsonp:"jsonp_callback",
    	             success:function(data){
    					 
    	             }
    	        });  
    	    
 
}
 
 function judgeWidth(){
	// var w = $(window).width();
	 var w = screen.width; //屏幕宽度
	 if(w<=1280){
		 //记录cookie 不显示切换 宽窄屏的层
		 
 		 $.cookie('iswidth','0',{expires:7});
		 $("#toggle-width").hide();
		 $('body').addClass('wrapAdapt');
		 $('body').removeClass('wrapMini');
		 //处理列表页的 版主推荐 图片宽度问题
		 $('.recommendBox').addClass('recommendMini');
	 }
	 
 }
 judgeWidth();
 /**
  * 
  * @param url
  * @returns
  */
function jumpToUrl(url){
	 
	window.location.href=url;
}
/**
 * 
 * @param corr  错误提示层id
 * @param msg   若传 则 替换提示信息，若提示层公用建议传
 * @param shade 是否显示阴影
 * @param time  若传 则定时消失
 * @returns
 */
 function popBox(corr,msg, shade, time) {
 	var popArr = new Array();
  
 	popArr[0] = $('#posting');	   
 	popArr[1] = $('#popCreamClose');	//需要用户点击关闭的 信息提示
 	popArr[2] = $('#publish-error');
 	popArr[3] = $('#ipaddress-wraper');
 	popArr[4] = $('#posting');
 	popArr[5] = $('#deling');
 	if (corr > popArr.length - 1) {
 		return false;
 	}
 	//显示消息前线将之前显示的消息隐藏
 	$('.tipsMark').hide();
 	$('#commonPopShade').hide();
 	if(msg){
    	popArr[corr].find(".matter").html(msg);
    }
 	popArr[corr].show();
 	if (shade) {
 		$('#commonPopShade').show();
 	}
 
 	if (4!=parseInt(corr)) {   //发布帖子和回帖等不三秒消失
 		 
 			var time = 3000;
 		 
 		setTimeout(function () {
 			closeAllTips();
		}, time);
  		
 	}
 	return false;
 }
 function closeTips (tispCover){
	 $(tispCover).parent().parent().hide();
	 $('#commonPopShade').hide();
 }
 function closeAllTips (){
	 $('.tipsMark').hide();
	 $('#commonPopShade').hide();
 }
 //弹层关闭按钮
 function closePop(popParent, shade) {
 	if (shade) {
 		$('#commonPopShade').hide();
 	}
 	$(popParent).hide();
 }
//jsonp 回调函数  用的自定义函数，没有用jsonp，回头有空再改也成
function jsonp_callback(data){
	
	if(1 == data.status){
		$(current_elem).addClass('attentioned');
	}else{
		if('notlogin'== data.error){
			alert('请先登录');
			document.location='http://my.fengniao.com/login.php?url='+window.location;
		}else{
			alert(data.info)
		}
		
	}
	
}
//获取元素的纵坐标
function getTop(e){
	var offset=e.offsetTop;
	if(e.offsetParent!=null) offset+=getTop(e.offsetParent);
	return offset;
}

//只处理 把窗口拖拽 变小的 情况，因为这样大图会超出 边框线外，窗口由小变大的不管，没记录原始图片的大小，变大没意义
function threadImgResize(){
	$(window).resize(function() {
		  $('.thread-img').each(function(){
			  var that = $(this).get(0);
			  /*
			  if(($(that).parent().parent().width()-that.width) >1 ) {
				  if($(that).parent().parent().width()>790){
					  that.width=$(that).parent().parent().width(); 
				  }else{
					  that.width = 790;
				  }
				  	
			 }
			 */
			  if((document.body.offsetWidth-that.width)<225) {
				  if(that.width>790){
					  var w = document.body.offsetWidth-225;
					  if(w>790){
						  that.width = w;
					  }else{
						  
					  }
				  }
              }
               
		  });
	});
}
window.onload=threadImgResize;

function replyPost(elem){
	
 	 
	var threadid  = $(elem).attr('threadid');
	var postid =  $(elem).attr('postid');
	var postData = {threadid:threadid,postid:postid,act:'quote'};
	var url = "/ajax/ajaxPreview.php";
	$.post(url,postData,function(data){
		if(data.status){
			 
			$("#quick-reply-area").val(data.text).focus();
		}else{
			  popBox(2,data.info, true);	
			if(!data.login){
				top.location="http://my.fengniao.com/login.php?url="+document.location.href;
			}
		}
	},"json");	
}
//获得消息提醒 add by tanqp
function getNotice(){
	//AJAX 发送数据
	$.ajax({
		dataType: "jsonp",
		url:"/ajax/ajaxNotice.php",
		type:'get',
		jsonp:'callback',
		success : function(data){
		//var data = eval('('+data+')');
		if(0 == data){
			return false;
		  }else{
			  pm = data.pm;
			  var priv = data.priv;
			  var reply = data.reply;
			  if(pm>0){
				  $('.popMessage em').html(pm);
				  $('.popMessage').show();
				  $('#msgTips em').html('('+pm+')');
			  }
			  if(priv>0){
				  $('#msgPrivate em').html('('+priv+')');
			  }
			  if(reply>0){
				  $('#msgReply em').html('('+reply+')');
			  }
			  if(pm>0 || priv>0 || reply>0){
				  $('.messageIco').addClass('messageIcoOn');
			  }
		  }
		}
	});
}
//close 关闭
//所有dom结构加载完后注册的事件
$(document).ready(function(e) {
 
	//控制消息层吸顶start add by tanqp
	var popMsgTop = 127;	//贴顶新消息条距顶距离
	setPopMsg();
	$(window).scroll(function () { setPopMsg() });
	function setPopMsg() {
		if ($(document).scrollTop() > popMsgTop) {
			$('.popMessage').addClass('popMessageTop');
		} else {
			$('.popMessage').removeClass('popMessageTop');
		}
	}
	//控制消息层吸顶end
	
 
	//页面加载完判断是宽屏还是窄屏,如果是窄屏，则给消息提示层加popMessageLeft这个样式
	if($('body').hasClass('wrapMini')){
		$('.popMessage').addClass('popMessageLeft');	//add by tanqingping 用来控制消息层
	}
	//切换宽窄屏  
	$("#toggle-width").click(function(){
		if($('body').hasClass('wrapMini')){
			$('body').removeClass('wrapMini');
			$(this).html('切换到窄屏').removeClass('setWide');
			$('.popMessage').removeClass('popMessageLeft');	//add by tanqingping 用来控制消息层
			//setCookie('iswidth','1');
			$.cookie('iswidth','1',{expires:7})
		}else{
			$('body').addClass('wrapMini');
			$(this).html('切换到宽屏').addClass('setWide');			
			$('.popMessage').addClass('popMessageLeft');	//add by tanqingping 用来控制消息层
			$.cookie('iswidth','0',{expires:7})
			//setCookie('iswidth','0');
		}
	});
	//回复 引用 时添加所引用的帖子正文
	$(".add-text").click(function(){
		replyPost(this);
	});
	//复制该帖子链接
	$(".copyBtn").click(function () {
		var _val = $("#forumUrl").val();
		if (document.all) {                                            //判断Ie
			window.clipboardData.setData('text', _val);
			alert("复制成功！");
		} else {
			alert("您的浏览器不支持剪贴板操作，请自行复制。");
		}
	});
	
	//显示未读悄悄话，私信，论坛回复
	//setTimeout("getNotice()",30*1000);
	
	$('.popMessage .close').click(function(){
		$('.popMessage').hide();
		pm = 0;		//清空未读悄悄话数，目的是下拉表鼠标移出时不再显示消息层
	});
	$(".IPInfo").click(function(){
		var ip = $(this).attr('ip');
		popBox(3,ip, true);
	});
	//消息下拉表的鼠标移入
	$('.message').mouseover(function(){
		$(this).addClass('messageOn');
		$('.popMessage').hide();
	});
	//消息下拉表的鼠标移出
	$('.message').mouseout(function(){
		$(this).removeClass('messageOn');
		if(pm>0){	//如果有未读悄悄话则显示消息层
			$('.popMessage').show();
		}
	});
	//通用的 关闭提示层，只是用于关闭按钮和 和外层父级隔一层的 dom 结构，要加请自行加上 commonCloseTips class 属性
	$(".commonCloseTips").click(function(){
		closeTips (this);
	});
 
});


//加精华从这里开始
$(".execpost").click(function(){
	var execpost_status = $(this).attr('name');
	var postid = $(this).attr('id');
	if('yes' == execpost_status){
		updateExecpost(postid,2);
		$(this).attr('name','no');
		$(this).removeClass("addCreamBtn");
		$(this).addClass("removeCreamBtn");
		$(this).children().html("<i></i>设为精华");
	}else{
		updateExecpost(postid,1);
		$(this).attr('name','yes');
		$(this).removeClass("removeCreamBtn");
		$(this).addClass("addCreamBtn");
		$(this).children().html("<i></i>取消精华");
	}
})
function updateExecpost(postid,type){
	var tid = $CONFIG.tid;
	var fid = $CONFIG.fid;
	$.ajax({
			type:'get',
			url:'./ajax/ajaxExecpost.php',
			dataType:'json',
			data:({tid:tid,fid:fid,execpid:postid,type:type,t:Math.random()}),
			success:function(data){
				if(2 == type){
					if(1==data.code){
						var stamp = "#stamp"+postid;
						setTimeout($(stamp).fadeOut("slow"),200);
					}else if(0 == data.code){
							alert('请求提交失败，请稍后再试');
						}
				}else if(1 == type){
					if(1 == data.code){
						var stamp = "#stamp"+postid;
						setTimeout($(stamp).fadeIn("slow"),200);
					}else if(0 == data.code){
						alert('请求提交失败，请稍后再试');
					}
				}
			}
		
	})
	
}

//加精华到这里结束



