/*
 * 弹出调查层js
 * add by tanqingping
 * 2013-03-22 
 */
(function($) {
	//document.domain = "fengniao.com";
	if(typeof jQuery == 'undefined'){	
		document.write('<script src="http://icon.fengniao.com/forum/js/jquery-1.7.1.min.js" type="text/javascript"></script>');	
	}
	var survey = function(){
		var userid 	 = readCookie('bbuserid');
		var username = readCookie('bbusername');	
		var have_post = false;
		var phone = '';
		var content = '';
		var timer = null;
		var defaults = {
			content:"请输入您的建议",		//输入框默认文字
			tips_long:"字数超过限制",
			phone:false,						//是否显示电话的输入框，true为显示，false为不显示
			login:true,						//是否需要登录，true是登录才显示，false为不需要登录
			words:200,						//字数限制
			show_time:3,					//提示层显示的秒数
			api:'http://atools.fengniao.com/api.php?a=dealFeedBack',//提交的接口
			postStr:''						//提交的内容
		}
		var options = $.extend(defaults, options);
		
		//加载css文件并创建‘我要反馈’的链接
		var __init = function() {
			var css = "http://atools.fengniao.com/css/survey.css";
			document.write('<link href="'+css+'" rel="stylesheet">');
			document.write('<a href="javascript:;" target="_self" class="feedback-btn" id="feedback-btn" hidefocus="true">我要反馈</a>');
		}
		var host = window.location.host;
		if('tuan.fengniao.com' == host || 'go.fengniao.com' == host || 'gou.fengniao.com' == host){
			options.phone = true;
		}
		//创建反馈框HTML
	    var __feedCreate = function() {
	        var feedHtml 	= $("<div id='feedback-window' class='feedback-window'></div>");        
	        if(username){
	        	var title = '&nbsp;<a href="http://my.fengniao.com/'+userid+'">'+username+'</a>&nbsp;<span>欢迎您给蜂鸟网提出建议</span>';
	        }else{
	        	var title = '<span>欢迎您给蜂鸟网提出建议</span>';
	        }
	        if(options.phone){
	        	var phone_title = '<div class="number-area clearfix"><span>手机号：</span><input name="survey_phone" id="survey_phone" type="text" value="" /></div>';
	        }else{
	        	var phone_title = '';
	        }
	        feedHtml.html('<div class="headline"><span id="feed_close" class="close">关闭</span>'+title+'</div><div class="feedback-box">'+phone_title+'<textarea id="survery_text" class="textarea default">'+options.content+'</textarea><div class="clearfix"><span id="feedback-submit" class="feedback-submit submit-no">提交</span></div><div id="survey_tips" class="pop-tips" style="display:none;">提交成功！</div></div>');
	        $('body').append(feedHtml);
	    }
	    //关闭反馈层
	    var __feedClose = function() {
	    	$('#feedback-window').hide();
	    	clearTimeout(timer);
	    	__hide_tips();	    	
	    }
	    
	    //调取用户电话
	    var __phone = function () {
	        $.ajax({
	        	dataType: "jsonp",
	        	type: "get",
	        	url: options.api+'_phone', 
	        	jsonp:'callback',
	            success: function(data) {            	
	            	if (data.status) {
	            		$('#survey_phone').val(data.tips);
	                } else {
	                    __show_tips(data.status);
	                }   
	            },
	            error: function() {
	            	__show_tips('网络异常。');
	            }
	          })
	    }
	    //隐藏提示层
	    var __hide_tips = function(flag) {
	    	$('#survey_tips').hide();
	    	if(1==flag){
	    		__feedClose();	    		
	    	}
	    }
	    //显示提示层
	    var __show_tips = function(tipText,flag){
	    	$('#survey_tips').html(tipText);
			$('#survey_tips').show();
			if(flag==1){
				$('#feedback-btn').show();
	    		$('#survery_text').val(options.content);
	    		$('#survery_text').addClass("default");
			}
			timer = setTimeout(function(){__hide_tips(flag);},options.show_time*1000);
	    } 
	    //字数
        var __content_len = function(){        	
        	content = $('#survery_text').val();
        	content = $.trim(content);
        	if( content == options.content || 0 == content.length){	          		
        		return false;
        	}else{    		
        		var newvalue = content.replace(/[^\x00-\xff]/g, "**");  
        		var length = 0;
        		length = newvalue.length+1;
        		length = parseInt(length/2);        		
        		if(length>options.words){        			        			
        			return false;
        		}
        	}
        	return true;
        }
	  
	    if(options.login && userid){
	    	__init();
	    	__feedCreate();
	    	if(options.phone){
	    		__phone();
	    	}
	    	
	    	//点击关闭
	    	$('#feed_close').live("click", function(){
	    		__feedClose();	    		
	    		$('#feedback-btn').show();
	    		__hide_tips();
	    	});
	    	//输入框获得/失去焦点/键盘事件
	    	var survey_text = $('#survery_text');
	    	survey_text.live({
	    		"focus" :function(){
	    			if($(this).val() == options.content){
	    				$(this).val('');
	    				$(this).removeClass("default");
	            	} 
	    		},
	    		"blur" : function(){
	    			if($(this).val()==''){
	    				$(this).val(options.content);
	    				$(this).addClass("default");
	            	}
	    		},
	    		"keyup" : function(){
	    			if(__content_len()){
	    				$("#feedback-submit").removeClass('submit-no');
	    			}else{
	    				$("#feedback-submit").addClass('submit-no');
	    			}
	    		}
	    	});	    	
	    	
	        //点击我要反馈
	        $('#feedback-btn').live(
	        		"click" , function(){
	        			$(this).hide();
	        			$('#feedback-window').show();
	        		}
	        );
	        //手机号
	        var __checkPhone = function(phone){	        	
	        	if(phone.length>11){
	        		return false;
	        	}
	        	var m = /^1\d{10}$/;
	        	if(m.test(phone)){
	        		return true;
	        	}else{
	        		return false;
	        	}
	        }
	        
	        //判断字数及电话号格式
	        var __validate = function(){
	        	var len_flag = __content_len();
	        	if (len_flag){
	        		phone = $('#survey_phone').val();
		        	if(phone && !__checkPhone(phone)){
		        		__show_tips('电话格式有误');
		        		return false;
		        	}
	        	}else{
	        		__show_tips(options.tips_long);
	        		return false;
	        	}
	        	return true;
	        }
	        //提交
	        $('#feedback-submit').live('click' , function(){
	        	if(!__validate()) return false;		//没填内容或者字数超过了	        	
	        	if(have_post){	        		
	        		return false;
	        	}
	        	$('#feedback-submit').addClass('submit-no');
	        	have_post = true;
	        	var url = window.location.href;
	        	options.postStr = {phone:phone,content:content,url:url,phone_flag:options.phone};        	
	            $.ajax({
	            	dataType: "jsonp",
	            	type: "get",
	            	url: options.api+'_deal', 
	            	data: options.postStr,
	            	jsonp:'callback',
	                success: function(data) {            	                	
	                	if (1== data.status){		//成
	                    	__show_tips(data.tips,1);                    	                                 
	                    }else{				//不成
	                        __show_tips(data.tips);                    
	                    }
	                	have_post = false;
	                	$('#feedback-submit').removeClass('submit-no');
	                },
	                error: function() {
	                	__show_tips('网络异常。');
	                	have_post = false;
	                	$('#feedback-submit').removeClass('submit-no');
	                }
	              })            
	        });
	    }   
	}
	survey();
})(jQuery);
