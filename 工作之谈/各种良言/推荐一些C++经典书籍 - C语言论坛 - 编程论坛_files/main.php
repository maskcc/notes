//<script>
var $ = function(o){return document.getElementById(o)};
var browser = function(){
	agent = navigator.userAgent;
	if(agent.indexOf('IE')>0){
		return 'IE';
	}else if(agent.indexOf('Firefox')>0){
		return 'FF';
	}else{
		return 'OTHER';
	}
}();
function jlen(j){l=0;for(i in j)l++;return l;}


var oldid;
function ShowMenu(id){
	if($(oldid)){$(oldid).style.display="none";}
	if(window.delayhide){clearTimeout(delayhide);}
	$(id).style.display='block';
	oldid = id;
}

function HideMenu(id){
	delayhide=setTimeout(function(){$(id).style.display="none";},200);
}

var pmwin_open = null;
function pmwin(action, param){
	if(action == 'open'){
		var clientWidth = document.body.clientWidth;
		var pmleft = ((clientWidth - 600)/2);
		if(!param) {
			var theparam = '/zzz/pm/pm.php';
		}else{
			var theparam = '/zzz/pm/pm.php?action=new&touid=' + param;
		}
		if(pmwin_open){
			if(!pmwin_open.closed){
				pmwin_open.close();
			}
			pmwin_open = null;
		}
		pmwin_open = window.open(theparam,"pmwin_open","left="+pmleft+",top=50,width=600,height=590,scrollbars=yes");
	}
}

function setcopy(text, alertmsg){
	if(browser=='IE'){
		clipboardData.setData('Text', text);
		alert(alertmsg);
	}else{
		if(prompt('按下 Ctrl+C 复制到剪贴板', text)) {
			alert(alertmsg);
		}
	}
}



var ajaxCaches = {};	//解决非IE无法缓存get的烦恼
function ajax(json){
	var url = json.url;
	var method = json.method || 'get';
	var data = json.data || {};
	var async = 'async' in json ? json.async : true;
	var cache = 'cache' in json ? json.cache : true;
	var success = json.success || function(x){};

	if(typeof(data)=='object'){
		var params = new Array();
		for(var key in data){
			var param = key + '=' + encodeURIComponent(data[key]);
			params.push(param);
		}
		data = params.join('&');
	}
	if(method=='get'){
		url += '?' + data;
		if(cache){
			if(url in ajaxCaches){
				success(ajaxCaches[url]);
				return;
			}
		}
	}

	var xmlHttp;
	if(window.ActiveXObject){
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}else if(window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
	}

	if(browser!='FF' || async){xmlHttp.onreadystatechange = function(){dodo()};}
	xmlHttp.open(method, method=='get'?url+'&rand='+Math.random()*100000:url, async);
	if(method=='get'){
		xmlHttp.send(null);
	}else{
		xmlHttp.setRequestHeader('cache-control','no-cache');
		xmlHttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xmlHttp.send(data);
	}
	if(browser=='FF' && !async){dodo()}
	function dodo(){
		if(xmlHttp.readyState==4){
			if(xmlHttp.status==200){
				var result = xmlHttp.responseText;
				if(method=='get' && cache){
					ajaxCaches[url] = result;
				}
				success(result);
			}
		}
	};
}

function serialize(form){
	var params = new Array();
	for(var i = 0; i < form.elements.length; i++){
		var param = form.elements[i].name;
		param += "=";
		param += encodeURIComponent(form.elements[i].value);
		params.push(param);
	}
	return params.join("&");
}