$(document).ready(function(){
	$("#preview-button").click(function(){
		getPreview();
	});
	
});

function getPreview(){
	    var pass = checkForm(true);
	    if(pass){
	    	var title = $("#post-title").val();
	 	   var content = $("#post-content").val();
	 	   var act = 'preview';
	 	   var url = '/ajax/ajaxPreview.php';
	 	   $.ajax({
	 				type: 'POST',
	 				url: url,
	 				dataType: "json",
	 				data: {'title':title,'content':content,'act':act},
	 				success: function(data) {
	 					 var title = data.title;
	 					 var content = data.content;
	 					 $("#preview-title").html(title);
	 					 $("#preview-content").html(content);
	 					  
	 					 $("#preview-wraper").show();
	 					 setTimeout('focusPreview();', 10);
	 				}
	 			}); //ajax完成
	    }
}

	function focusPreview(){
		scrollTo(0,0);
	}
	//添加图片
	function addPicture(){
		$("#post-type").val('addpicture');
		var pass = checkForm();
		if(pass){
			document.posting.submit();
		}
	}
	

	function checkForm(){
		var pass = false;
		var titleid = "#post-title";
		var contentid = "#post-content";
		var titleLens = textLength(titleid);
		var contentLens = textLength(contentid,true);
		 
		var dataType = $(titleid).attr("data-type");
		//回复标题可以为空
		var titleLimit = 0;
		var contentLimit = 5;
		var checkTitle= false;
		if("newThread" == dataType){
			 titleLimit = 5;
			 checkTitle = true;
		}else if('reply'==dataType){
			contentLimit = 1;
		}
		 
 		if(0!=titleLimit  && titleLimit> titleLens){
			var msg = "标题最少"+(titleLimit)+"个中文(或"+2*(titleLimit)+"个英文)";
			popBox(2,msg, true);
			return false;
		}else if(0!=titleLimit && 60 < titleLens){
			var msg = "标题不能超过60个汉字或 120个英文字母";
			popBox(2,msg, true);
			return false;
		}else{
			pass=true;
		}
		if(pass && contentLimit>contentLens){
			var msg = "内容最少"+(contentLimit)+"个中文(或"+2*(contentLimit)+"个英文)";
			popBox(2,msg, true);
			return false;
		}else{
			pass = true;
		}
		return pass;

	}
	//发帖时要过滤相同标题的 帖子  前端不验证了，累死那些乱发帖的货
	function checkThreadTitle(title){
		var postData  = {act:'checktitle',title:title};
		$.ajax({
			  url: "/ajax/ajaxPreview.php",
			  type: "POST",
			  data: (postData),
			  success: function(data){
				  var data = eval('('+data+')'); 
				  if(1 == data.status){
					  document.posting.submit();
				  }else{
					  var msg = "抱歉，不能发重复的内容";
					  popBox(2,msg, true);
					  return false;
				  }
			  }
			});
	}
	//返回指定输入框文字字数
	function textLength(editor_id,isContent){
		var content = $.trim($(editor_id).val());
		var length;
		 
		//判断内容长度时，先剔除引用的内容
		if(isContent){ 
			var myregexp = /(?:\[QUOTE[^\]]+?\][\s\S]{0,400}?\[\/QUOTE\])/ig;
			var content = content.replace(myregexp, "");
//			console.log(content);
//			content.replace(/(?:\[QUOTE[^\]]+?\][\s\S]{0,200}?\[\/QUOTE\])/ig, ''); 
			 
		}
		var content_temp = content.replace(/(^\s*)|(\s*$)/g, '');  
		if(0==content_temp.length){  
			 length = 0;
		}else{
			var newvalue = content.replace(/[^\x00-\xff]/g, "**");  
			length = newvalue.length+1;
		}
		length = parseInt(length/2);
		return length;
	}
	//快速回复
	var is_replying = false;
	function quickReply(){
		if(is_replying){
			return false;
		}
		is_replying = true;
		var contentLimit = 1;
		var contentid = "#quick-reply-area";
		var contentLens = textLength(contentid,true);
		if(contentLimit>contentLens){
			var msg = "内容最少"+contentLimit+"个中文(或"+2*contentLimit+"个英文)";
			popBox(2,msg, true);
			is_replying = false;
			return false;
		}
		var threadid= $(contentid).attr('threadid');
		var forumid = $(contentid).attr('forumid');
		var content = $(contentid).val();
		var bonus = $('#rating-id').val();
		if(!bonus){
			bonus = 0;
		}
		popBox(4,false,true);

		var postData = {threadid:threadid,forumid:forumid,action:'publish',type:'quickreply',content:content,bonus:bonus};
		$.ajax({
			  url: "/ajax/ajaxPost.php",
			  type: "POST",
			  data: (postData),
			  success: function(data){
				  var data = eval('('+data+')'); 
				  if(1 == data.status){
					  setTimeout("jumpToUrl('"+data.jumpUrl+"');",500);
				  }else{
					  popBox(2,data.info, true);	
					  is_replying = false;
					 if(!data.login){
						 top.location="http://my.fengniao.com/login.php?url="+document.location.href;
					}
					  
				  }
			  }
			});
	}
	
	//直接发帖
	function publishthread(){
		$("#post-type").val('publish');
		 var  pass = checkForm();
		 if(pass){
			 popBox(4,false,true);
			 document.posting.submit();
		 }
	}
	var edit_save = false;
	//返回编辑后发的贴
	function editPublishthread(){
		if(edit_save){
			return false;
		}
		$("#post-type").val('publish');
		 var  pass = checkForm();
		 if(pass){
			 var title = $("#post-title").val();
			 
			 var threadContent =  $("#post-content").val();   
			 if($("#reply-close").get(0).checked){
				 var threadopen = 0;
			 }else{
				 var threadopen = 1;
			 }
 
			 var forumid =  $("#post-fid").val(); 
			 var mark =  $("#mark-id").val(); 
			 edit_save = true;
			 popBox(4,false,true);
			 //发帖
			 $.ajax({
				  url: "/ajax/ajaxPost.php",
				  type: "POST",
				  data: ({action:'editPublish' ,title:title,content:threadContent,forumid:forumid,open:threadopen,mark:mark}),
				  success: function(data){
					  var data = eval('('+data+')'); 
					  if(1 == data.status){
						  setTimeout("jumpToUrl('"+data.jumpUrl+"');",1000);
					  }else{
						  popBox(2,data.info, true);	
						  edit_save = false;
					  }
				  }
				});
		 }
	}