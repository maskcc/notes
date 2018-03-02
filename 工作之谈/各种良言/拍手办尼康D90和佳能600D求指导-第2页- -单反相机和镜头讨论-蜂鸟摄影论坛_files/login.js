var username = readCookie('bbusername');
var userid = readCookie('bbuserid');
var jumpUrl =  encodeURIComponent(document.URL);
if(userid){
$('.login').html('<li class="user"><span>您好，</span><a href="http://my.fengniao.com/'+userid+'" class="notly">'+username+'</a></li> <li>|</li> <li class="message" > <div class="title"><span class="messageIco">message</span></div> <div class="messageDetail"> <a id="msgTips" target="_blank" href="http://bbs.fengniao.com/forum/private.php">悄悄话<em id="msgNum"></em></a> <a id="msgPrivate" target="_blank" href="http://my.fengniao.com/messages.php">我的私信<em></em></a> <a id="msgReply" target="_blank" href="http://my.fengniao.com/bbsReply.php">论坛回复<em></em></a> </div> </li> <li>|</li> <li class="goMy"><a href="http://my.fengniao.com/">个人中心</a></li> <li id="control-toggle" class="control"  > <i class="titleIco"></i> <p class="title">控制面板</p> </li><li><a class="exit" href="http://my.fengniao.com/login.php?action=logout&url='+jumpUrl+'"  target="_self">退出</a></li>');
}else{
$('.login').html("<li><a href='http://my.fengniao.com/login.php?url="+jumpUrl+"' target='_self'>登录</a></li> <li class='division'><span>|</span></li><li> <a href='http://my.fengniao.com/register.php'>注册</a></li>");
}