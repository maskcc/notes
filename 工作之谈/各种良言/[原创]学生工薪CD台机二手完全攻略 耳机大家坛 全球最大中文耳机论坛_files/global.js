var cookie_name = 0;
var agt = navigator.userAgent.toLowerCase();
var is_ie = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1));
var is_gecko= (navigator.product == "Gecko");

getObj = function(id) {
	return document.getElementById(id);
}
function findPosX(obj){
	var curleft = 0;
	if (obj.offsetParent){
		while (obj.offsetParent){
			curleft += obj.offsetLeft
			obj = obj.offsetParent;
		}
	}
	else if (obj.x)
		curleft += obj.x;
	return curleft - ietruebody().scrollLeft;
}
function findPosY(obj){
	var curtop = 0;
	if (obj.offsetParent){
		while (obj.offsetParent){
			curtop += obj.offsetTop
			obj = obj.offsetParent;
		}
	}else if (obj.y){
		curtop += obj.y;
	}
	return curtop - ietruebody().scrollTop;;
}
function click_open(idName,object,type){
	if(getObj("showmenu").style.display==''){
		closep();
		return false;
	}
	cookie_name = 1;
	mouseover_open(idName,object,type);
}
function mouseover_open(idName,object,type){

	if(typeof type == "undefined"){
		type = '1';
	}
	if(cookie_name == 1 || type>2){
		obj  = getObj("showmenu");
		obj2 = getObj(idName);
		obj3 = getObj(object);

		var left  = findPosX(obj3) + ietruebody().scrollLeft;
		var top   = findPosY(obj3) + ietruebody().scrollTop;
		
		obj.innerHTML = obj2.innerHTML;
        obj.className = obj2.className;
		obj.style.filter = "alpha(opacity=96);opacity:0.96;";
		obj.style.display = "";
		
		var height = obj.offsetHeight;
		var width  = obj.offsetWidth;
		
		if(left + width > ietruebody().scrollLeft + ietruebody().clientWidth){
			left -= width;
		}
		if(type=='2' && height + top > ietruebody().scrollTop + ietruebody().clientHeight){
			top -= height;
		} else{
			top += type=='4' ? 31 : 15;
		}
		obj.style.top	= top + 'px';
		obj.style.left	= left + 'px';

		if(type>'2'){
			addEvent(document,"mouseout",doc_mouseout);
		} else if(type<'2'){
			addEvent(document,"mousedown",doc_mousedown);
		}
	}
	return false;
}
function closep(type){
	if(typeof type == "undefined"){
		type = 'down';
	}
	cookie_name = 0;
	obj = getObj("showmenu");
	obj.innerHTML = "";
	obj.className = "";
	obj.style.display = "none";
	if(type=='out'){
		removeEvent(document,"mouseout",doc_mouseout);
	} else{
		removeEvent(document,"mousedown",doc_mousedown);
	}
	return false;
}
function doc_mousedown(e){
	var e = is_ie ? event: e;
	obj	= getObj("showmenu");
	_x	= is_ie ? e.x : e.pageX;
	_y	= is_ie ? e.y + ietruebody().scrollTop : e.pageY;
	_x1 = obj.offsetLeft;
	_x2 = obj.offsetLeft + obj.offsetWidth;
	_y1 = obj.offsetTop - 25;
	_y2 = obj.offsetTop + obj.offsetHeight;

	if(_x<_x1 || _x>_x2 || _y<_y1 || _y>_y2){
		closep('down');
	}
}
function doc_mouseout(e){
	var e = is_ie ? event: e;
	obj	= getObj("showmenu");
	_x	= is_ie ? e.x : e.pageX;
	_y	= is_ie ? e.y + ietruebody().scrollTop : e.pageY;
	_x1 = obj.offsetLeft - 20;
	_x2 = obj.offsetLeft + obj.offsetWidth + 20;
	_y1 = obj.offsetTop - 35;
	_y2 = obj.offsetTop + obj.offsetHeight + 20;

	if(_x<_x1 || _x>_x2 || _y<_y1 || _y>_y2){
		closep('out');
	}
}
function ietruebody(){
	return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body;
}
function IsElement(id){
	return document.getElementById(id)!=null ? true : false;
}
function addEvent(el,evname,func){
	if(is_ie){
		el.attachEvent("on" + evname,func);
	} else{
		el.addEventListener(evname,func,true);
	}
};
function removeEvent(el,evname,func){
	if(is_ie){
		el.detachEvent("on" + evname,func);
	} else{
		el.removeEventListener(evname,func,true);
	}
};