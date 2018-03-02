function $A(c){if(!c){return[]
}if(c.toArray){return c.toArray()
}var b=c.length||0,a=new Array(b);
while(b--){a[b]=c[b]
}return a
}function get(a){if(Object.isString(a)){a=document.getElementById(a)
}return Element.extend(a)
}function gets(a){if(a){return Zhishi.Selector.find(a)
}}function newElement(b,a){var d=document.createElement(b);
for(var c in a){if(c=="class"){d.className=a[c]
}else{if(c=="style"){d.style.cssText=a[c]
}else{d.setAttribute(c,a[c])
}}}return d
}var Zhishi={onBeforeClose:null,removeWindowCloseEvent:function(){if(window.onbeforeunload){Zhishi.onBeforeClose=window.onbeforeunload;
window.onbeforeunload=null
}},resumeWindowCloseEvent:function(){if(Zhishi.onBeforeClose){setTimeout(function(){window.onbeforeunload=Zhishi.onBeforeClose;
Zhishi.onBeforeClose=null
},100)
}},hackForIeReload:function(){if(Zhishi.Browser.isIE){document.body.style.zoom=1.1;
document.body.style.zoom=""
}}};
Zhishi.Browser={isIE:!!(window.attachEvent&&!window.opera),isFirefox:navigator.userAgent.indexOf("Gecko")>-1&&navigator.userAgent.indexOf("KHTML")==-1,isOpera:!!window.opera,isTT:false,isIE6:navigator.appVersion.indexOf("MSIE 6.")>=0,isWebKit:navigator.userAgent.indexOf("AppleWebKit/")>-1};
try{if(window.external.getTTVerStr!=null){Zhishi.Browser.isTT=true
}}catch(e){}Object.extend=function(a,c){for(var b in c){a[b]=c[b]
}return a
};
Object.extend(Object,{isElement:function(a){return a&&a.nodeType==1
},isArray:function(a){return a!=null&&typeof a=="object"&&"splice" in a&&"join" in a
},isFunction:function(a){return typeof a=="function"
},isString:function(a){return typeof a=="string"
},isNumber:function(a){return typeof a=="number"
},isUndefined:function(a){return typeof a=="undefined"
}});
Object.extend(Function.prototype,{bind:function(){var a=this,c=$A(arguments),b=c.shift();
return function(){return a.apply(b,c.concat($A(arguments)))
}
},delay:function(){var a=this,b=$A(arguments),c=b.shift();
return window.setTimeout(function(){return a.apply(a,b)
},c)
},methodize:function(){if(this._methodized){return this._methodized
}var a=this;
return this._methodized=function(){return a.apply(null,[this].concat($A(arguments)))
}
}});
Object.extend(Array.prototype,{first:function(){return this[0]
},last:function(){return this[this.length-1]
},size:function(){return this.length
},indexOf:function(c,a){a||(a=0);
var b=this.length;
if(a<0){a=b+a
}for(;
a<b;
a++){if(this[a]===c){return a
}}return -1
}});
Object.extend(String.prototype,{trim:function(){return this.replace(/^\s+/,"").replace(/\s+$/,"")
},contains:function(a){return this.indexOf(a)>-1
},startsWith:function(a){return this.indexOf(a)===0
},endsWith:function(a){var b=this.length-a.length;
return b>=0&&this.lastIndexOf(a)===b
},empty:function(){return this==""||this==null
}});
Zhishi.Ajax={_transaction_id:0,_poll:{},_timeOut:{},createXhrObject:function(){if(Zhishi.Browser.isIE){var c=["MSXML2.XMLHTTP.5.0","MSXML2.XMLHTTP.4.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"];
for(var a=c.length-1;
a>=0;
a--){try{return new ActiveXObject(c[a])
}catch(b){}}}else{return new XMLHttpRequest()
}},getConnectionObj:function(){var b=this.createXhrObject();
var a={conn:b,tId:this._transaction_id};
if(b){this._transaction_id++
}return a
},sendRequest:function(i,a,h){var g=this.getConnectionObj();
g.onSuccess=h.onSuccess;
g.onLoading=h.onLoading?h.onLoading:"";
g.onErr=h.onErr?h.onErr:this.onErr;
g.cacheTime=h.cacheTime?h.cacheTime:0;
g.postdata=h.postdata?h.postdata:"";
g.timeOut=h.timeOut?h.timeOut:30000;
g.para=h.para?h.para:"";
g.isClearCache=h.isClearCache?h.isClearCache:false;
g.isAsyn=true;
g.encode=true;
if(h.isAsyn!=null&&!h.isAsyn){g.isAsyn=false
}if(h.encode!=null&&!h.encode){g.encode=false
}var f=new Date();
if(g.isClearCache||g.cacheTime==0){var b=f.valueOf().toString()
}else{var b=f.getDate()*24*3600+f.getHours()*3600+f.getMinutes()*60+f.getSeconds();
if(b%g.cacheTime!=0){b-=b%g.cacheTime
}}if(i.toUpperCase()=="GET"){a+=((a.indexOf("?")==-1)?"?":"&")+"rnd="+b
}g.conn.open(i,a,g.isAsyn);
if(h.contentType){g.conn.setRequestHeader("Content-Type",h.contentType)
}else{g.conn.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8")
}this.handleReadyState(g);
if(h.raw){g.conn.send(g.postdata)
}else{var c=g.postdata!=""?this.toQueryString(g.postdata):null;
if(!g.encode){c=g.postdata!=""?g.postdata:null
}g.conn.send(c)
}if(!g.isAsyn){if(g.conn&&g.conn.readyState===4&&g.conn.status==200){window.clearInterval(this._poll[g.tId]);
delete this._poll[g.tId];
window.clearTimeout(this._timeOut[g.tId]);
delete this._timeOut[g.tId];
g.onSuccess(g.conn.responseText,g.para)
}else{g.onErr()
}}},handleReadyState:function(b){var a=this;
this._timeOut[b.tId]=window.setTimeout(function(){b.conn.abort();
b.onErr()
},b.timeOut);
this._poll[b.tId]=window.setInterval(function(){if(b.conn&&b.conn.readyState===4&&b.conn.status==200){window.clearInterval(a._poll[b.tId]);
delete a._poll[b.tId];
window.clearTimeout(a._timeOut[b.tId]);
delete a._timeOut[b.tId];
b.onSuccess(b.conn.responseText,b.para)
}else{if(b.onLoading){b.onLoading()
}}},20)
},onErr:function(){},toQueryString:function(c){var d="";
if(c.indexOf("&")==-1){return c.split("=")[0]+"="+encodeURIComponent(c.split("=")[1])
}else{var b=c.split("&");
for(var a=0;
a<b.length;
a++){d+=b[a].split("=")[0]+"="+encodeURIComponent(b[a].split("=")[1])+"&"
}return d.substring(0,d.length-1)
}}};
Zhishi.Cookie={setCookie:function(c,d,a){var b="";
if(a!=null){b=new Date((new Date()).getTime()+a*3600000);
b="; expires="+b.toGMTString()
}document.cookie=c+"="+escape(d)+b
},getCookie:function(b){var f=escape(b)+"=";
var a=document.cookie.split(";");
for(var d=0;
d<a.length;
d++){var g=a[d];
while(g.charAt(0)==" "){g=g.substring(1,g.length)
}if(g.indexOf(f)==0){return unescape(g.substring(f.length,g.length))
}}return null
},delCookie:function(b){var a="; expires=Mon, 26 Jul 1997 05:00:00 GMT";
document.cookie=b+"="+a
}};
Zhishi.Event={domLoadedEventList:new Array(),attachEventListener:function(d,b,c,a){if(Object.isString(d)){d=get(d)
}if(d==window&&b=="domready"){Zhishi.Event.domLoadedEventList.push(c)
}else{if(d.addEventListener){d.addEventListener(b,c,a)
}else{if(d.attachEvent){d.attachEvent("on"+b,c)
}}}},removeEventListener:function(d,b,c,a){if(Object.isString(d)){d=get(d)
}if(d.removeEventListener){d.removeEventListener(b,c,a)
}else{if(d.detachEvent){d.detachEvent("on"+b,c)
}}return true
},fireDomReady:function(){if(Zhishi.Event.domLoadedEventList){for(var a=0;
a<Zhishi.Event.domLoadedEventList.length;
a++){Zhishi.Event.domLoadedEventList[a]()
}}},getTarget:function(a){var b=a||window.event;
if(b){return b.target||b.srcElement
}else{return null
}},mouseX:function(a){a=a||window.event;
return a.pageX||(a.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft))
},mouseY:function(a){a=a||window.event;
return a.pageY||(a.clientY+(document.documentElement.scrollTop||document.body.scrollTop))
}};
Zhishi.Size={getScrollSize:function(){var i=document;
var c=i.documentElement.scrollLeft?i.documentElement.scrollLeft:i.body.scrollLeft;
var f=i.documentElement.scrollTop?i.documentElement.scrollTop:i.body.scrollTop;
var g=i.compatMode=="CSS1Compat"?i.documentElement.scrollHeight:i.body.scrollHeight;
var b=i.compatMode=="CSS1Compat"?i.documentElement.scrollWidth:i.body.scrollWidth;
var d=i.compatMode=="CSS1Compat"?i.documentElement.clientHeight:i.body.clientHeight;
var a=i.compatMode=="CSS1Compat"?i.documentElement.clientWidth:i.body.clientWidth;
if(g<d){g=d
}if(b<a){b=a
}return[c,f,b,g]
},getClientSize:function(){var c=document;
var b=c.compatMode=="CSS1Compat"?c.documentElement.clientHeight:c.body.clientHeight;
var a=c.compatMode=="CSS1Compat"?c.documentElement.clientWidth:c.body.clientWidth;
return[a,b]
}};
var Element={};
Element.extend=(function(){return function(c){if(!c||c.nodeType!=1||c==window){return c
}var a=Object.extend({},Element.Methods),b=c.tagName,f,d;
for(f in a){d=a[f];
if(Object.isFunction(d)&&!(f in c)){c[f]=d.methodize()
}}c._extended=true;
return c
}
})();
Element.Methods={visible:function(a){return get(a).style.display!="none"
},hide:function(a){get(a).style.display="none";
return a
},show:function(a){get(a).style.display="block";
return a
},hasClassName:function(a,b){if(!(a=get(a))){return
}var c=a.className;
return(c.length>0&&(c==b||new RegExp("(^|\\s)"+b+"(\\s|$)").test(c)))
},addClassName:function(a,b){if(!(a=get(a))){return
}if(!a.hasClassName(b)){a.className+=(a.className?" ":"")+b
}return a
},removeClassName:function(a,b){if(!(a=get(a))){return
}a.className=a.className.replace(new RegExp("(^|\\s+)"+b+"(\\s+|$)")," ").trim();
return a
},overwriteClassName:function(a,b){if(!(a=get(a))){return
}a.className=b;
return a
},replaceClassName:function(c,b,a){if(!(c=get(c))){return
}var d=c.className.replace(new RegExp("(^|\\s+)"+b+"(\\s+|$)")," ").trim();
if(!c.hasClassName(a)){d+=(d?" ":"")+a
}c.className=d;
return c
},scrollTo:function(a){a=get(a);
var b=a.getXY();
window.scrollTo(b[0],b[1]);
return a
},getSize:function(b){var a=b.offsetWidth;
var c=b.offsetHeight;
return[a,c]
},setSize:function(c,f,a){var b=(!f||f<0)?"auto":parseInt(f)+"px";
var d=(!a||a<0)?"auto":parseInt(a)+"px";
c.width=b;
c.height=d
},getScrollSize:function(b){var a=b.scrollWidth;
var c=b.scrollHeight;
return[a,c]
},getHideSize:function(c){if(c.visible()){return c.getSize()
}var b=c.style.cssText;
c.style.cssText=b+"visibility:hidden; position: absolute;overflow-y:scroll;";
c.show();
var a=c.scrollWidth;
var f=c.scrollHeight;
c.hide();
c.style.cssText=b;
if(Zhishi.Browser.isIE){var g=newElement("div",{style:"display:none;"});
document.body.appendChild(g)
}return[a,f]
},getXY:function(d){var c=0;
var b=0;
if(document.documentElement.getBoundingClientRect){var f=d.getBoundingClientRect();
var a=d.ownerDocument;
c=f.top-2+Zhishi.Size.getScrollSize(a)[1];
b=f.left-2+Zhishi.Size.getScrollSize(a)[0]
}else{while(d.offsetParent){c+=d.offsetTop;
b+=d.offsetLeft;
d=d.offsetParent
}}return[b,c]
},setXY:function(c,a,f){var d=c.style.marginLeft?c.style.marginLeft:0;
var b=c.style.marginTop?c.style.marginTop:0;
c.style.left=parseInt(a)-d+"px";
c.style.top=parseInt(f)-b+"px"
},setStyle:function(a,c,b){switch(c){case"opacity":if(Zhishi.Browser.isIE){a.style.filter="alpha(opacity="+parseFloat(b)+")"
}else{a.style.opacity=parseFloat(b)/100
}break;
default:a.style[c]=b;
break
}},insertAfter:function(b,a){if(!(b=get(b))){return
}var c=b.parentNode;
if(c.lastChild==b){c.appendChild(a)
}else{c.insertBefore(a,b.nextSibling)
}},fadeIn:function(d,c,a,b){if(!(d=get(d))){return
}c=c||3;
d.setStyle("opacity",0);
d.setStyle("display","block");
var f=new Zhishi.Effect(d,"opacity",0,100,c,b);
if(a){setTimeout(a,c*1000)
}f.start()
},fadeOut:function(d,c,a,b){if(!(d=get(d))){return
}c=c||3;
var f=new Zhishi.Effect(d,"opacity",100,0,c,b);
f.start();
if(a){setTimeout(a,c*1000)
}},slideUp:function(f,d,a,c){if(!(f=get(f))){return
}d=d||3;
var b=parseInt(f.getSize()[1]);
var g=new Zhishi.Effect(f,"height",b+"px",0+"px",d,c);
g.start();
if(a){setTimeout(a,d*1000)
}},slideDown:function(d,f,c,a,b){if(!(d=get(d))){return
}if(f){c=c||3;
var g=new Zhishi.Effect(d,"height",0+"px",f+"px",c,b);
g.start();
if(a){setTimeout(a,c*1000)
}}},gets:function(a,b){if(b){return Zhishi.Selector.find(b,a)
}}};
Zhishi.Load={jsLoader:function(a,c){var b=document.createElement("script");
b.setAttribute("charset","utf-8");
b.setAttribute("type","text/javascript");
b.setAttribute("src",a);
document.getElementsByTagName("head")[0].appendChild(b);
if(Zhishi.Browser.isIE){b.onreadystatechange=function(){if(this.readyState=="loaded"||this.readyStaate=="complete"){c()
}}
}else{if(Zhishi.Browser.isFirefox){b.onload=function(){c()
}
}else{c()
}}}};
Zhishi.Selector={snack:/(?:[\w\-\\.#]+)+(?:\[\w+?=([\'"])?(?:\\\1|.)+?\1\])?|\*|>/ig,exprClassName:/^(?:[\w\-_]+)?\.([\w\-_]+)/,exprId:/^(?:[\w\-_]+)?#([\w\-_]+)/,exprNodeName:/^([\w\*\-_]+)/,na:[null,null],find:function(f,c){c=c||document;
var a=/^[\w\-_#]+$/.test(f);
if(!a&&c.querySelectorAll){var j=$A(c.querySelectorAll(f));
if(j){for(var h=0;
h<j.length;
h++){j[h]=Element.extend(j[h])
}}return j
}if(f.indexOf(",")>-1){var n=f.split(/,/g),l=[];
for(var k=0;
k<n.length;
k++){l=l.concat(Zhishi.Selector.find(n[k],c))
}return Zhishi.Selector.uinq(l)
}var g=f.match(Zhishi.Selector.snack),d=g.pop(),b=(d.match(Zhishi.Selector.exprId)||Zhishi.Selector.na)[1],m=!b&&(d.match(Zhishi.Selector.exprClassName)||Zhishi.Selector.na)[1],o=!b&&(d.match(Zhishi.Selector.exprNodeName)||Zhishi.Selector.na)[1],j;
j=!b&&$A(c.getElementsByTagName(o||"*"));
if(j){for(var h=0;
h<j.length;
h++){j[h]=Element.extend(j[h])
}}if(m){j=Zhishi.Selector.filterByAttr(j,"className",RegExp("(^|\\s)"+m+"(\\s|$)"))
}if(b){var p=c.getElementById(b);
return p?[Element.extend(p)]:[]
}return g[0]&&j[0]?Zhishi.Selector.filterParents(g,j):j
},filterParents:function(m,g,d){var h=m.pop();
if(h===">"){return Zhishi.Selector.filterParents(m,g,true)
}var i=[],a=-1,b=(h.match(Zhishi.Selector.exprId)||Zhishi.Selector.na)[1],j=!b&&(h.match(Zhishi.Selector.exprClassName)||Zhishi.Selector.na)[1],l=!b&&(h.match(Zhishi.Selector.exprNodeName)||Zhishi.Selector.na)[1],k=-1,c,n,f;
l=l&&l.toLowerCase();
while((c=g[++k])){n=c.parentNode;
do{f=!l||l==="*"||l===n.nodeName.toLowerCase();
f=f&&(!b||n.id===b);
f=f&&(!j||RegExp("(^|\\s)"+j+"(\\s|$)").test(n.className));
if(d||f){break
}}while((n=n.parentNode));
if(f){i[++a]=Element.extend(c)
}}return m[0]&&i[0]?Zhishi.Selector.filterParents(m,i):i
},filterByAttr:function(h,a,g){var c=-1,f,d=-1,b=[];
while((f=h[++c])){if(g.test(f[a])){b[++d]=Element.extend(f)
}}return b
},uinq:function(f){var h=[],a=0,k,g=+new Date(),b=1;
for(var d=0;
d<f.length;
++d){k=f[d];
var j=k[g],c=b++;
if(!j){k[g]=c;
h[a++]=k
}}g++;
return h
}};
Zhishi.UrlHelper={getQueryString:function(a){var b=new RegExp("(^|&)"+a+"=([^&]*)(&|$)","i");
var c=window.location.search.substr(1).match(b);
if(c!=null){return c[2]
}else{return null
}}};
if(Zhishi.Browser.isIE){document.write("<script id=__ie_onload defer src=javascript:void(0)><\/script>");
var script=document.getElementById("__ie_onload");
script.onreadystatechange=function(){if(this.readyState=="complete"){var d=false;
try{d=window.frameElement==null&&document.documentElement
}catch(c){}if(d&&d.doScroll){var b=false;
(function a(){if(!b){try{d.doScroll("left")
}catch(f){return setTimeout(a,50)
}Zhishi.Event.fireDomReady();
b=true
}})()
}}}
}else{if(Zhishi.Browser.isWebKit){var _timer=setInterval(function(){if(/loaded|complete/.test(document.readyState)){clearInterval(_timer);
Zhishi.Event.fireDomReady()
}},10)
}else{document.addEventListener("DOMContentLoaded",Zhishi.Event.fireDomReady,false)
}}Zhishi.Statistical={statisDefaultAttr:"clickp",statisDefaultUrl:"/z/api/sendState",statisticalEvent:function(g){var d,b,c,f,a;
g=g||window.event;
d=g.target||g.srcElement;
if(d.nodeType!==1){return
}b=d.tagName.toLowerCase();
f=d.getAttribute(Zhishi.Statistical.statisDefaultAttr);
if(f===null){return
}if(typeof sp_config!="undefined"){c=sp_config.uin
}a=new Image();
a.src=Zhishi.Statistical.statisDefaultUrl+"?random="+Math.random()*100000+"&type="+f+(Object.isUndefined(c)?"":"&uin="+c);
a=null
}};
Zhishi.Event.attachEventListener(window,"load",function(){Zhishi.Event.attachEventListener(document.body,"mousedown",function(a){Zhishi.Statistical.statisticalEvent(a)
})
});Zhishi.Effect=function(g,e,a,d,f,b){this.obj=get(g);
this.isColor=/^#/.test(a);
this.prop=e;
var c=/\d+([a-z%]+)/i.exec(a);
this.fun=b||Zhishi.Tween.Cubic.easeIn;
this.suffix=c?c[1]:"";
this.startValue=this.isColor?0:parseFloat(a);
this.finishValue=this.isColor?100:parseFloat(d);
if(this.isColor){this.startColor=this.convertHexColor(a);
this.finishColor=this.convertHexColor(d)
}this.duration=f||10;
this.startTime=0;
this.currentValue=0;
this.changeValue=this.finishValue-this.startValue;
this.isPlayed=false
};
Zhishi.Effect.prototype.start=function(){this.reloadTimer();
this.isPlayed=true;
this.runTime()
};
Zhishi.Effect.prototype.reloadTimer=function(){this.startTime=new Date().getTime()
};
Zhishi.Effect.prototype.playTime=function(c){var b=false;
if(c>this.duration){c=this.duration;
b=true
}var a=this.fun(c,this.startValue,this.changeValue,this.duration);
this.currentValue=/(opacity)/i.test(this.prop)?a:Math.round(a);
if(this.isColor){this.currentValue=this.getColor(this.startColor,this.finishColor,a)
}this.obj.setStyle(this.prop,this.currentValue+this.suffix);
if(b){this.isPlayed=false;
if(window.CollectGarbage){CollectGarbage()
}}};
Zhishi.Effect.prototype.runTime=function(){var a=this;
if(a.isPlayed){a.playTime((new Date().getTime()-this.startTime)/1000);
setTimeout(function(){a.runTime.apply(a)
},0)
}};
Zhishi.Effect.prototype.getColor=function(f,b,e){var g=f;
var d=b;
var a=[];
if(e>100){e=100
}if(e<0){e=0
}for(var c=0;
c<3;
c++){a[c]=Math.floor(g[c]*1+(e/100)*(d[c]-g[c])).toString(16);
if(a[c].length<2){a[c]="0"+a[c]
}}return"#"+a.join("")
};
Zhishi.Effect.prototype.simpleFun=function(d,a,b,c){return b*d/c+a
};
Zhishi.Effect.prototype.convertHexColor=function(d){d=/^#/.test(d)?d.substr(1):d;
var c=new RegExp("\\w{2}","ig");
d=d.match(c);
if(!d||d.length<3){return[0,0,0]
}var f=parseInt(d[0],16);
var e=parseInt(d[1],16);
var a=parseInt(d[2],16);
return[f,e,a]
};
Zhishi.Tween={Linear:function(e,a,g,f){return g*e/f+a
},Quad:{easeIn:function(e,a,g,f){return g*(e/=f)*e+a
},easeOut:function(e,a,g,f){return -g*(e/=f)*(e-2)+a
},easeInOut:function(e,a,g,f){if((e/=f/2)<1){return g/2*e*e+a
}return -g/2*((--e)*(e-2)-1)+a
}},Cubic:{easeIn:function(e,a,g,f){return g*(e/=f)*e*e+a
},easeOut:function(e,a,g,f){return g*((e=e/f-1)*e*e+1)+a
},easeInOut:function(e,a,g,f){if((e/=f/2)<1){return g/2*e*e*e+a
}return g/2*((e-=2)*e*e+2)+a
}},Quart:{easeIn:function(e,a,g,f){return g*(e/=f)*e*e*e+a
},easeOut:function(e,a,g,f){return -g*((e=e/f-1)*e*e*e-1)+a
},easeInOut:function(e,a,g,f){if((e/=f/2)<1){return g/2*e*e*e*e+a
}return -g/2*((e-=2)*e*e*e-2)+a
}},Quint:{easeIn:function(e,a,g,f){return g*(e/=f)*e*e*e*e+a
},easeOut:function(e,a,g,f){return g*((e=e/f-1)*e*e*e*e+1)+a
},easeInOut:function(e,a,g,f){if((e/=f/2)<1){return g/2*e*e*e*e*e+a
}return g/2*((e-=2)*e*e*e*e+2)+a
}},Sine:{easeIn:function(e,a,g,f){return -g*Math.cos(e/f*(Math.PI/2))+g+a
},easeOut:function(e,a,g,f){return g*Math.sin(e/f*(Math.PI/2))+a
},easeInOut:function(e,a,g,f){return -g/2*(Math.cos(Math.PI*e/f)-1)+a
}},Expo:{easeIn:function(e,a,g,f){return(e==0)?a:g*Math.pow(2,10*(e/f-1))+a
},easeOut:function(e,a,g,f){return(e==f)?a+g:g*(-Math.pow(2,-10*e/f)+1)+a
},easeInOut:function(e,a,g,f){if(e==0){return a
}if(e==f){return a+g
}if((e/=f/2)<1){return g/2*Math.pow(2,10*(e-1))+a
}return g/2*(-Math.pow(2,-10*--e)+2)+a
}},Circ:{easeIn:function(e,a,g,f){return -g*(Math.sqrt(1-(e/=f)*e)-1)+a
},easeOut:function(e,a,g,f){return g*Math.sqrt(1-(e=e/f-1)*e)+a
},easeInOut:function(e,a,g,f){if((e/=f/2)<1){return -g/2*(Math.sqrt(1-e*e)-1)+a
}return g/2*(Math.sqrt(1-(e-=2)*e)+1)+a
}},Elastic:{easeIn:function(g,e,k,j,f,i){if(g==0){return e
}if((g/=j)==1){return e+k
}if(!i){i=j*0.3
}if(!f||f<Math.abs(k)){f=k;
var h=i/4
}else{var h=i/(2*Math.PI)*Math.asin(k/f)
}return -(f*Math.pow(2,10*(g-=1))*Math.sin((g*j-h)*(2*Math.PI)/i))+e
},easeOut:function(g,e,k,j,f,i){if(g==0){return e
}if((g/=j)==1){return e+k
}if(!i){i=j*0.3
}if(!f||f<Math.abs(k)){f=k;
var h=i/4
}else{var h=i/(2*Math.PI)*Math.asin(k/f)
}return(f*Math.pow(2,-10*g)*Math.sin((g*j-h)*(2*Math.PI)/i)+k+e)
},easeInOut:function(g,e,k,j,f,i){if(g==0){return e
}if((g/=j/2)==2){return e+k
}if(!i){i=j*(0.3*1.5)
}if(!f||f<Math.abs(k)){f=k;
var h=i/4
}else{var h=i/(2*Math.PI)*Math.asin(k/f)
}if(g<1){return -0.5*(f*Math.pow(2,10*(g-=1))*Math.sin((g*j-h)*(2*Math.PI)/i))+e
}return f*Math.pow(2,-10*(g-=1))*Math.sin((g*j-h)*(2*Math.PI)/i)*0.5+k+e
}},Back:{easeIn:function(e,a,h,g,f){if(f==undefined){f=1.70158
}return h*(e/=g)*e*((f+1)*e-f)+a
},easeOut:function(e,a,h,g,f){if(f==undefined){f=1.70158
}return h*((e=e/g-1)*e*((f+1)*e+f)+1)+a
},easeInOut:function(e,a,h,g,f){if(f==undefined){f=1.70158
}if((e/=g/2)<1){return h/2*(e*e*(((f*=(1.525))+1)*e-f))+a
}return h/2*((e-=2)*e*(((f*=(1.525))+1)*e+f)+2)+a
}},Bounce:{easeIn:function(e,a,g,f){return g-Zhishi.Tween.Bounce.easeOut(f-e,0,g,f)+a
},easeOut:function(e,a,g,f){if((e/=f)<(1/2.75)){return g*(7.5625*e*e)+a
}else{if(e<(2/2.75)){return g*(7.5625*(e-=(1.5/2.75))*e+0.75)+a
}else{if(e<(2.5/2.75)){return g*(7.5625*(e-=(2.25/2.75))*e+0.9375)+a
}else{return g*(7.5625*(e-=(2.625/2.75))*e+0.984375)+a
}}}},easeInOut:function(e,a,g,f){if(e<f/2){return Zhishi.Tween.Bounce.easeIn(e*2,0,g,f)*0.5+a
}else{return Zhishi.Tween.Bounce.easeOut(e*2-f,0,g,f)*0.5+g*0.5+a
}}}};Zhishi.Dialog=function(j,f,c,b,g,a){try{this.oldSize=Zhishi.Size.getScrollSize()
}catch(h){}this.height=c||100;
this.width=f||100;
this.title=j||"\u641c\u641c\u95ee\u95ee";
this.isNewContent=false;
this.isContentInPage=false;
this.rawContentInPage="";
this.contentPageId="";
this.maskObj=null,this.maskClass="layer_mask_class";
this.maskOpacity=25;
this.removeCloseEvent=true;
this.backIframeObj=null;
this.backIframeClass="layer_backIframe_class";
this.mainObj=null;
this.mainClass="layer_main_class";
this.headObj=null;
this.headHeight=35;
this.headClass="layer_head_class";
this.hasBottomHr=true;
this.headBottomHrClass="layer_head_bottomHr";
this.closeLinkClass="layer_closeLink_class";
this.containerObj=null;
this.canDrag=false;
this.isNeedClose=true;
this.top=null;
for(var d in a){this[d]=a[d]
}this.isFrame=b||false;
if(this.isFrame){this.iframe=document.createElement("iframe");
this.iframe.setAttribute("scrolling","no");
this.iframe.setAttribute("frameborder","0",0)
}this.value=g||""
};
Zhishi.Dialog.prototype.setContent=function(a){this.isNewContent=true;
this.value=a
};
Zhishi.Dialog.prototype.setPageContent=function(a){this.isContentInPage=true;
this.value=get(a).innerHTML;
this.contentPageId=a;
get(a).innerHTML=" ";
this.rawContentInPage=this.value
};
Zhishi.Dialog.prototype.show=function(){if(Zhishi.isDialogAlive){return
}if(this.removeCloseEvent){Zhishi.removeWindowCloseEvent()
}Zhishi.isDialogAlive=true;
this.createUI();
this.initEvent();
if(this.canDrag){this.bindDrag()
}if(this.isNeedClose){this.appendClose()
}if(this.hasBottomHr){this.appendBottomBorder()
}this.setPosition();
Zhishi.hackForIeReload()
};
Zhishi.Dialog.prototype.bindDrag=function(){this.headMouseDownEvent=this.headMouseDown.bind(this);
if(this.headObj){Zhishi.Event.attachEventListener(this.headObj,"mousedown",this.headMouseDownEvent)
}};
Zhishi.Dialog.prototype.headMouseDownEvent=function(){};
Zhishi.Dialog.prototype.headMouseDown=function(d){d=d||window.event;
var a=this.mainObj;
a.oldX=d.clientX;
a.oldY=d.clientY;
var c=a.style.left?parseInt(a.style.left):0;
var b=a.style.top?parseInt(a.style.top):0;
a.differenceX=c-d.clientX;
a.differenceY=b-d.clientY;
this.headMouseMoveEvent=this.headMouseMove.bind(this);
Zhishi.Event.attachEventListener(document,"mousemove",this.headMouseMoveEvent);
this.headMouseUpEvent=this.headMouseUp.bind(this);
Zhishi.Event.attachEventListener(document,"mouseup",this.headMouseUpEvent);
this.stopDefaultEvent(d)
};
Zhishi.Dialog.prototype.headMouseMoveEvent=function(){};
Zhishi.Dialog.prototype.headMouseMove=function(b){b=b||window.event;
var a=this.mainObj;
a.style.left=b.clientX+a.differenceX+"px";
a.style.top=b.clientY+a.differenceY+"px";
this.stopDefaultEvent(b)
};
Zhishi.Dialog.prototype.headMouseUpEvent=function(){};
Zhishi.Dialog.prototype.headMouseUp=function(a){Zhishi.Event.removeEventListener(document,"mousemove",this.headMouseMoveEvent);
Zhishi.Event.removeEventListener(document,"mouseup",this.headMouseUpEvent);
this.stopDefaultEvent(a)
};
Zhishi.Dialog.prototype.stopDefaultEvent=function(a){a=a||window.event;
a.returnValue=false;
if(a.preventDefault){a.preventDefault()
}return true
};
Zhishi.Dialog.prototype.initEvent=function(){this.resetPositonEvent=this.resetPosition.bind(this);
Zhishi.Event.attachEventListener(window,"resize",this.resetPositonEvent)
};
Zhishi.Dialog.prototype.removeEvent=function(){Zhishi.Event.removeEventListener(window,"resize",this.resetPositonEvent);
if(this.headObj){Zhishi.Event.removeEventListener(this.headObj,"mousedown",this.headMouseDownEvent)
}};
Zhishi.Dialog.prototype.resetPositonEvent=function(){};
Zhishi.Dialog.prototype.resetMaskStyle=function(){if(this.maskObj){var a=this.maskObj;
a.style.left="0px";
a.style.top="0px";
a.style.width="100%";
a.style.height="100%";
if(Zhishi.Browser.isIE6||document.compatMode!="CSS1Compat"){a.style.width=Zhishi.Size.getScrollSize()[2]+"px";
a.style.height=Zhishi.Size.getScrollSize()[3]+"px"
}}};
Zhishi.Dialog.prototype.resetBackIframeStyle=function(b,a){if(this.backIframeObj){this.backIframeObj.style.left=(Zhishi.Size.getScrollSize()[0]+(Zhishi.Size.getClientSize()[0]-this.width)/2)+"px";
this.backIframeObj.style.top=b+"px";
if(this.height>400){this.backIframeObj.style.top=a+"px"
}}};
Zhishi.Dialog.prototype.resetPosition=function(){this.resetMaskStyle();
var a=this.mainObj;
var c=Zhishi.Size.getScrollSize()[1]+125;
var b=Zhishi.Size.getScrollSize()[1]+(Zhishi.Size.getClientSize()[1]-this.height)/2;
if(this.top){c=Zhishi.Size.getScrollSize()[1]+this.top;
b=Zhishi.Size.getScrollSize()[1]+this.top
}if(Zhishi.Browser.isIE6){this.resetBackIframeStyle(c,b)
}a.style.left=(Zhishi.Size.getScrollSize()[0]+(Zhishi.Size.getClientSize()[0]-this.width)/2)+"px";
a.style.top=c+"px";
if(this.height>400){a.style.top=b+"px"
}};
Zhishi.Dialog.prototype.setMaskStyle=function(){if(this.maskObj){var a=this.maskObj;
a.style.left="0px";
a.style.top="0px";
a.style.width="100%";
a.style.height="100%";
if(Zhishi.Browser.isIE6||document.compatMode!="CSS1Compat"){a.style.width=this.oldSize[2]+"px";
a.style.height=this.oldSize[3]+"px"
}}};
Zhishi.Dialog.prototype.setBackIframeStyle=function(c,b){if(this.backIframeObj){var a=this.backIframeObj;
a.style.left=(Zhishi.Size.getScrollSize()[0]+(Zhishi.Size.getClientSize()[0]-this.width)/2)+"px";
a.style.top=c+"px";
if(this.height>400){a.style.top=b+"px"
}if(Zhishi.Browser.isFirefox){a.style.height=this.height+9+"px"
}else{a.style.height=this.height+2+"px"
}a.style.width=this.width+2+"px"
}};
Zhishi.Dialog.prototype.setPosition=function(){this.setMaskStyle();
var a=this.mainObj;
var c=Zhishi.Size.getScrollSize()[1]+125;
var b=Zhishi.Size.getScrollSize()[1]+(Zhishi.Size.getClientSize()[1]-this.height)/2;
if(this.top){c=Zhishi.Size.getScrollSize()[1]+this.top;
b=Zhishi.Size.getScrollSize()[1]+this.top
}if(Zhishi.Browser.isIE6){this.setBackIframeStyle(c,b)
}a.style.left=(Zhishi.Size.getScrollSize()[0]+(Zhishi.Size.getClientSize()[0]-this.width)/2)+"px";
a.style.top=c+"px";
if(this.height>400){a.style.top=b+"px"
}a.style.height=this.height+"px";
a.style.width=this.width+"px";
this.updateHeadStyle()
};
Zhishi.Dialog.prototype.updateHeadStyle=function(){if(this.headObj){var a=this.headObj;
a.style.width=this.width+"px"
}};
Zhishi.Dialog.prototype.createUI=function(){var c=null;
if(get("ww_mask_lay")){c=get("ww_mask_lay");
c.show()
}else{c=document.createElement("div");
c.id="ww_mask_lay";
c.style.position="fixed";
if(Zhishi.Browser.isIE6||document.compatMode!="CSS1Compat"){c.style.position="absolute"
}c.className=this.maskClass;
this.setOpacity(c,this.maskOpacity)
}var a=document.createElement("div");
a.style.position="absolute";
a.className=this.mainClass;
var b=document.createElement("div");
var d=document.createElement("div");
d.style.width=this.width+"px";
d.style.height=this.headHeight+"px";
d.className=this.headClass;
var f=document.createElement("span");
f.className="layer_title";
f.innerHTML=this.title;
f.setAttribute("style","height:"+(this.headHeight-2)+"px;line-height:"+(this.headHeight-2)+"px;");
d.appendChild(f);
a.appendChild(d);
a.appendChild(b);
document.body.appendChild(c);
document.body.appendChild(a);
if(Zhishi.Browser.isIE6){var e=document.createElement("iframe");
e.style.position="absolute";
e.className=this.backIframeClass;
e.setAttribute("scrolling","no");
e.setAttribute("frameborder","0",0);
this.setOpacity(e,this.borderOpacity);
document.body.appendChild(e);
this.backIframeObj=e
}if(this.isFrame){this.iframe.setAttribute("src",this.value);
this.iframe.setAttribute("height",this.height-this.headHeight);
this.iframe.setAttribute("width",this.width);
b.appendChild(this.iframe)
}else{b.innerHTML=this.value
}this.maskObj=c;
this.containerObj=b;
this.mainObj=a;
this.headObj=d
};
Zhishi.Dialog.prototype.removeUI=function(){if(this.maskObj){get(this.maskObj).hide()
}if(this.mainObj){get(this.mainObj).hide()
}if(Zhishi.Browser.isIE6){get(this.backIframeObj).hide()
}if(this.isNewContent){this.containerObj.innerHTML=""
}if(this.isContentInPage){get(this.contentPageId).innerHTML=this.rawContentInPage;
this.rawContentInPage="";
this.containerObj.innerHTML=""
}};
Zhishi.Dialog.prototype.appendClose=function(){var b=document.createElement("a");
b.href="javascript:void(0)";
b.onclick=this.close.bind(this);
b.title="\u5173\u95ed";
b.className=this.closeLinkClass;
var a=document.createElement("span");
a.className="layer_close";
a.setAttribute("style","height:"+(this.headHeight-9)+"px;line-height:"+(this.headHeight-9)+"px;");
a.appendChild(b);
this.headObj.appendChild(a)
};
Zhishi.Dialog.prototype.appendBottomBorder=function(){var a=document.createElement("div");
a.className=this.headBottomHrClass;
this.headObj.appendChild(a)
};
Zhishi.Dialog.prototype.onClose=function(){return true
};
Zhishi.Dialog.prototype.afterClose=function(){};
Zhishi.Dialog.prototype.close=function(){if(this.removeCloseEvent){Zhishi.removeWindowCloseEvent()
}if(this.onClose()){this.removeEvent();
this.removeUI();
this.afterClose();
Zhishi.resumeWindowCloseEvent()
}Zhishi.isDialogAlive=false
};
Zhishi.Dialog.prototype.setOpacity=function(a,b){if(Zhishi.Browser.isIE){a.style.filter="alpha(opacity="+parseFloat(b)+")"
}else{a.style.opacity=parseFloat(b)/100
}};
Zhishi.Dialog.prototype.resize=function(d,b){if(Zhishi.Browser.isIE6){var e=this.backIframeObj
}var c=this.iframe;
var a=this.mainObj;
if(this.isFrame){if(Zhishi.Browser.isFirefox){c.style.height=b-35+"px"
}else{if(Zhishi.Browser.isIE6){e.style.height=2+b+"px"
}c.style.height=b-35+"px"
}if(Zhishi.Browser.isIE6){e.style.width=d+"px"
}c.style.width=d+"px"
}a.style.height=b+"px";
a.style.width=d+"px";
this.height=b;
this.width=d;
this.updateHeadStyle()
};
Zhishi.Alert=function(g,d,c,b,e,f,a){Zhishi.Dialog.call(this,g,d,c,b,e,a);
this.mainClass="w_layer_wrap";
this.closeLinkClass="close";
this.hasBottomHr=false;
this.maskClass="w_layer_mask";
this.backIframeClass="w_layer_backIframe_class";
this.closeLink=null;
this.timeInMillis=f
};
Zhishi.Alert.prototype=new Zhishi.Dialog();
Zhishi.Alert.prototype.createUI=function(){var a=document.createElement("div");
a.style.position="absolute";
a.className=this.mainClass;
var d=document.createElement("div");
d.className=this.maskClass;
d.style.width=this.width;
d.style.height=this.height;
var g=document.createElement("h3");
g.innerHTML=this.title;
var f=document.createElement("a");
f.href="javascript:void(0)";
f.title="\u5173\u95ed";
f.className=this.closeLinkClass;
var b=document.createElement("div");
b.className="w_layer_con";
var c=document.createElement("div");
c.className="w_layer_main";
c.appendChild(g);
c.appendChild(f);
c.appendChild(b);
a.appendChild(d);
a.appendChild(c);
document.body.appendChild(a);
if(Zhishi.Browser.isIE6){var e=document.createElement("iframe");
e.style.position="absolute";
e.className=this.backIframeClass;
e.setAttribute("scrolling","no");
e.setAttribute("frameborder","0",0);
this.setOpacity(e,this.borderOpacity);
document.body.appendChild(e);
this.backIframeObj=e
}if(this.isFrame){this.iframe.setAttribute("src",this.value);
this.iframe.setAttribute("height",this.height-this.headHeight);
this.iframe.setAttribute("width",this.width);
b.appendChild(this.iframe)
}else{b.innerHTML=this.value
}this.maskObj=d;
this.closeLink=f;
this.containerObj=b;
this.mainObj=a;
this.headObj=g
};
Zhishi.Alert.prototype.appendClose=function(){this.closeLink.onclick=this.close.bind(this)
};
Zhishi.Alert.prototype.resetMaskStyle=function(){this.setMaskStyle()
};
Zhishi.Alert.prototype.setMaskStyle=function(){if(this.maskObj){var a=this.maskObj;
a.style.width=this.width;
a.style.height=this.height;
if(document.compatMode!="CSS1Compat"){a.style.width=this.width+8+"px";
a.style.height=this.height+8+"px";
if(Zhishi.Browser.isIE6){a.style.width=this.width+0+"px";
a.style.height=this.height+0+"px"
}else{if(Zhishi.Browser.isIE){a.style.width=this.width+0+"px";
a.style.height=this.height+0+"px"
}}}else{if(Zhishi.Browser.isIE6){a.style.width=this.width+8+"px";
a.style.height=this.height+5+"px"
}else{if(Zhishi.Browser.isIE){a.style.width=this.width+8+"px";
a.style.height=this.height+8+"px"
}}}}};
Zhishi.Alert.prototype.resetBackIframeStyle=function(b,a){if(this.backIframeObj){}};
Zhishi.Alert.prototype.setBackIframeStyle=function(b,a){if(this.backIframeObj){}};
Zhishi.Alert.prototype.updateHeadStyle=function(){};
Zhishi.Alert.prototype.close=function(){if(this._timeout){clearTimeout(this._timeout);
this._timeout=null
}Zhishi.Dialog.prototype.close.call(this)
};
Zhishi.Alert.prototype.show=function(){Zhishi.Dialog.prototype.show.call(this);
var c=this.timeInMillis;
var b=this;
if(c&&c>0){this._timeout=setTimeout(function(){b.close()
},c)
}};
Zhishi.Alert.showMessage=function(e,h,g,d,f,i){var c="";
if(e){c='<div class="w_layer_suc"></div>'
}else{c='<div class="w_layer_err"></div>'
}if(d){c+="<p>";
c+="<strong>"+g+"</strong>";
c+=d;
c+="</p>"
}else{c+='<p class="line_height">';
c+="<strong>"+g+"</strong>";
c+="</p>"
}var b=new Zhishi.Alert(h,380,129,false,c,f);
if(i){b.afterClose=i
}b.show()
};
Zhishi.Alert.showMessageLink=function(g,f,e,b,a,d,h){var c=null;
d=d||3000;
if(b&&a){c='<a href="'+a+'" target="_blank">'+b+"</a>"
}Zhishi.Alert.showMessage(g,f,e,c,d,h)
};Zhishi.loginStateUrl="";
Zhishi.loginStateBarUrl="";
Zhishi.popLoginUrl="";
Zhishi.loginOutUrl="";
Zhishi.ptLoginUrl="http://ui.ptlogin2.soso.com/cgi-bin/login?link_target=blank&appid=6000201&f_url=loginerroralert&hide_uin_tip=1";
Zhishi.popIframeUrlFix="&target=self&qtarget=0&hide_title_bar=1&s_url=";
Zhishi.pageIframeUrlFix="&target=parent&hide_close_icon=1&s_url=";
Zhishi.isLogin="0";
function ptlogin2_onResize(a,b){if(Zhishi.Login.loginDialog){Zhishi.Login.loginDialog.resize(a,b+30)
}if(Baike&&Baike.Login.loginDialog){Baike.Login.loginDialog.resize(a,b+25)
}}Zhishi.Login={loginList:[],callBackObj:"",loginDialog:null,loginNavIds:["TW","loginNav"],q_bInit:false,q_type:0,q_hummerQtrl:null,g_vOptData:null,q_aUinList:new Array(),hummer_loaduin:function(){Zhishi.Login.q_aUinList.length=0;
var g=Zhishi.Login.q_hummerQtrl.DoOperation(1,Zhishi.Login.g_vOptData);
if(null==g){return
}try{var j=g.GetArray("PTALIST");
var b=j.GetSize();
var h="";
var r=document.getElementById("list_uin");
for(var a=0;
a<b;
a++){var u=j.GetData(a);
var e=u.GetDWord("dwSSO_Account_dwAccountUin");
var q="";
var c="";
try{q=u.GetArray("SSO_Account_AccountValueList");
c=q.GetStr(0)
}catch(f){c=0
}var l=0;
try{l=u.GetWord("wSSO_Account_wFaceIndex")
}catch(f){l=0
}var k="";
try{k=u.GetStr("strSSO_Account_strNickName")
}catch(f){k=""
}var n=0;
try{n=u.GetByte("cSSO_Account_cGender")
}catch(f){n=0
}var m=0;
try{m=u.GetDWord("dwSSO_Account_dwUinFlag")
}catch(f){m=0
}var t=u.GetBuf("bufGTKey_PTLOGIN");
var s=u.GetBuf("bufST_PTLOGIN");
var o="";
var w=s.GetSize();
for(var i=0;
i<w;
i++){var v=s.GetAt(i).toString("16");
if(v.length==1){v="0"+v
}o+=v
}var p={uin:e,name:c,face:l,nick:k,gender:n,key:o};
Zhishi.Login.q_aUinList[a]=p
}}catch(f){}},ptui_qInit:function(){if(Zhishi.Login.q_bInit){return
}Zhishi.Login.q_bInit=true;
if(!window.ActiveXObject){return
}try{Zhishi.Login.q_hummerQtrl=new ActiveXObject("SSOAxCtrlForPTLogin.SSOForPTLogin");
var a=Zhishi.Login.q_hummerQtrl.CreateTXSSOData();
Zhishi.Login.q_hummerQtrl.InitSSOFPTCtrl(0,a);
Zhishi.Login.g_vOptData=Zhishi.Login.q_hummerQtrl.CreateTXSSOData()
}catch(b){Zhishi.Login.q_hummerQtrl=null
}if(Zhishi.Login.q_hummerQtrl!=null){Zhishi.Login.q_type=2;
Zhishi.Login.hummer_loaduin();
if(Zhishi.Login.q_aUinList.length>0){return
}}if(Zhishi.Login.q_hummerQtrl!=null){Zhishi.Login.q_type=2
}},isFastActiveX:function(){if(!window.ActiveXObject){return false
}try{var b=new ActiveXObject("SSOAxCtrlForPTLogin.SSOForPTLogin");
if(b!=null){return true
}}catch(c){return false
}},isSupportLogin:function(){Zhishi.Login.ptui_qInit();
if(0==Zhishi.Login.q_type){return false
}if(2==Zhishi.Login.q_type&&Zhishi.Login.q_aUinList.length<=0){return false
}return true
},getElements:function(){var a=[];
Zhishi.Login.pushElements("input",a);
Zhishi.Login.pushElements("button",a);
Zhishi.Login.pushElements("a",a);
return a
},pushElements:function(a,c){var e=document.getElementsByTagName(a);
for(var b=0;
b<e.length;
b++){if((" "+e[b].className+" ").indexOf(" login_require ")!=-1){c.push(e[b])
}}},init:function(){var h=Zhishi.Cookie.getCookie("ww_hasLogOut");
var k=document.location.href;
var l=document.location.host;
var e=false;
if(l=="baike.soso.com"||k.indexOf("http://"+l+"/m")==0||k.indexOf("http://"+l+"/t")==0){e=false
}if(e&&(Zhishi.isLogin=="0"&&Zhishi.Login.isSupportLogin()&&(h==null||h==""))){var j=Zhishi.Login.q_aUinList;
if(j&&j.length==1){var a=document.location.href;
if(a.indexOf("pid=")==-1){a+=a.indexOf("?")==-1?"?":"&";
a+="pid=wenwen.autologin"
}Zhishi.Cookie.setCookie("ww_hasLogOut","1");
Zhishi.Cookie.setCookie("ww_oneKeyUrl",a,1);
var g="http://ptlogin2.soso.com/wenwen_clientJump?clientuin="+j[0].uin+"&clientkey="+j[0].key+"&keyindex=9";
document.location.href=g
}}var b=Zhishi.Login.getElements();
for(var f=0;
f<b.length;
f++){var c=b[f];
if(c.onclick){Zhishi.Login.loginList[f]=c.onclick
}else{if(c.tagName.toLowerCase()=="a"){Zhishi.Login.loginList[f]=c.href;
c.href="javascript:void(0);"
}else{Zhishi.Login.loginList[f]=function(){}
}}c.setAttribute("wenwenid",f);
c.onclick=Zhishi.Login.newMethod;
c.style.cursor="pointer"
}Zhishi.Event.attachEventListener(window,"load",function(){if(Zhishi.Cookie.getCookie("ww_searchWord")!=null){if($("sb")&&$("sb").value==""){$("sb").value=Zhishi.Cookie.getCookie("ww_searchWord")
}Zhishi.Cookie.setCookie("ww_searchWord","")
}},false)
},changeLoginStateBar:function(c){var e="",b=Zhishi.Login.loginNavIds;
for(var a=0;
a<b.length;
a++){if(get(b[a])!=null){e=b[a];
break
}}if(e!=""){get(e).innerHTML=c
}},updateLoginStateBar:function(spParams){if(get("s_user_more")){return
}Zhishi.Ajax.sendRequest("GET","/z/WenwenAjaxEvent.e?sp=30",{onSuccess:function(json){d=eval("("+json+")");
if(d[0]!=0){return
}else{var m=eval("("+d[1]+")");
var userName="SOSO \u7528\u6237";
var userLevel=0;
var msgCountSQ=0;
var msgCountXT=0;
var g_tk="";
if(m.userName){userName=m.userName
}if(m.userLevel){userLevel=m.userLevel
}if(m.msgCountSQ){msgCountSQ=m.msgCountSQ
}if(m.msgCountXT){msgCountXT=m.msgCountXT
}if(m.g_tk){g_tk=m.g_tk
}var param="?g_tk="+g_tk;
if(spParams&&spParams.length>0){for(var i=0;
i<spParams.length;
i++){param+="&sp="+spParams[i]
}}var userInfo=gets(".s_user")[0],html="";
html+='<ul class="s_user">';
html+='<li class="s_user_name login" id="s_user_name" ><a href="/z/MyHome.htm?ch=ww.id.ww" class="my_wenwen">'+userName+'</a><div class="more_menu" style="display:none;"><a href="/z/MyAskedPendingRecordsNew.htm?ch=ww.id.ask">\u6211\u7684\u63d0\u95ee</a><a href="/z/MyAnsweredRecordsNew.htm?ch=ww.id.answer">\u6211\u7684\u56de\u7b54</a><a href="/z/MyTaskSummary.htm?ch=ww.id.task">\u6211\u7684\u4efb\u52a1</a><a href="/z/SetMyCommonNew.htm?ch=ww.id.setup">\u6211\u7684\u8bbe\u7f6e</a></div></li>';
if((msgCountSQ+msgCountXT)>0){var tmp=(msgCountSQ+msgCountXT)+"";
if((msgCountSQ+msgCountXT)>99){tmp="99+"
}html+='<li class="s_user_msg have_msg" id="s_msg_more"><a href="/z/CommunityMsgCenter.htm?ch=ww.top.msg" class="msg_num" id="login_msg_num">'+tmp+"</a>";
html+='<div class="msg_layer_wrap" style="display:none;">';
html+='<div class="msg_layer"><span class="msg_horn"></span><!--<a href="#" class="close_layer" style="visibility:visible;"></a> -->';
html+='<ul><li><a href="/z/CommunityMsgCenter.htm?ch=ww.top.msgtz">\u793e\u533a\u901a\u77e5';
if(msgCountSQ>0){html+="("+msgCountSQ+")"
}html+='</a></li><li><a href="/z/SystemMsgCenter.htm?ch=ww.top.msgxi">\u793e\u533a\u6d88\u606f';
if(msgCountXT>0){html+="("+msgCountXT+")"
}html+="</a></li></ul>";
html+="</div></div></li>"
}else{html+='<li class="s_user_msg no_msg" id="s_msg_more"><a href="/z/CommunityMsgCenter.htm?ch=ww.top.msg" class="msg_icon"></a>';
html+='<div class="msg_layer_wrap" style="display:none;"><div class="msg_layer"><span class="msg_horn"></span><p>\u6ca1\u6709\u65b0\u6d88\u606f</p></div></div></li> '
}html+='<li class="s_user_log"><a href="/z/LLogout.e'+param+'" id="s_logout" onclick="Zhishi.Login.logout(this.href);return false;">\u9000\u51fa</a></li>';
userInfo.innerHTML=html;
actUserMenu();
actUserMenu2();
actMsgMenu()
}}})
},clickMe:function(b,a){if(!b){b=document.createElement("input");
b.className="login_norefresh"
}var e=b.getAttribute("wenwenid");
if(!e){e=Zhishi.Login.loginList.length;
if(a){Zhishi.Login.loginList[e]=a
}else{if(b.tagName.toLowerCase()=="a"){Zhishi.Login.loginList[e]=b.href;
b.href="#"
}else{Zhishi.Login.loginList[e]=function(){}
}}b.setAttribute("wenwenid",e)
}Zhishi.removeWindowCloseEvent();
var c={onSuccess:Zhishi.Login.checkLogin,para:b};
Zhishi.Ajax.sendRequest("GET",Zhishi.loginStateUrl,c)
},newMethod:function(){Zhishi.removeWindowCloseEvent();
var b=Zhishi.Browser.isIE?event.srcElement:arguments[0].target;
if(b.tagName.toLowerCase()!="input"&&b.tagName.toLowerCase()!="a"&&b.tagName.toLowerCase()!="button"){var a=3;
while(b.tagName.toLowerCase()!="input"&&b.tagName.toLowerCase()!="a"&&b.tagName.toLowerCase()!="button"){a--;
b=b.parentNode;
if(a<0){break
}}}var c={onSuccess:Zhishi.Login.checkLogin,para:b};
Zhishi.Ajax.sendRequest("GET",Zhishi.loginStateUrl,c)
},execOldMethod:function(a){var b=Zhishi.Login.loginList[a.getAttribute("wenwenid")];
if(a.tagName.toLowerCase()=="input"||typeof b=="function"){b()
}else{document.location=b
}},checkLogin:function(a,b){if(a=="1"){Zhishi.Login.execOldMethod(b);
Zhishi.resumeWindowCloseEvent()
}else{if(a=="0"){Zhishi.Login.openLoginDialog(b)
}}},openLoginDialog:function(a,c,e){this.callBackObj=a?a:this.callBackObj;
var b=200;
if(Zhishi.popLoginUrl.indexOf(Zhishi.ptLoginUrl)>=0){var g=Zhishi.popLoginUrl
}else{var g=Zhishi.ptLoginUrl+Zhishi.popIframeUrlFix+encodeURIComponent(Zhishi.popLoginUrl)
}var f=Zhishi.Browser.isIE?373:371;
if(e){Zhishi.Login.loginDialog=new Zhishi.Dialog('<img src="http://cache.soso.com/wenwen/i/loginIcon_2.gif" style="vertical-align:middle;" height="30" width="20"/>&nbsp;\u7528\u6237\u767b\u5f55',373,b,true,g,e)
}else{Zhishi.Login.loginDialog=new Zhishi.Dialog('<img src="http://cache.soso.com/wenwen/i/loginIcon_2.gif" style="vertical-align:middle;" height="30" width="20"/>&nbsp;\u7528\u6237\u767b\u5f55',373,b,true,g)
}Zhishi.Login.loginDialog.show()
},loginLink:function(){Zhishi.Login.rememberSearchWord();
var a=document.location.href;
if(a.indexOf("pid=")==-1){a+=a.indexOf("?")==-1?"?":"&";
a+="pid=wenwen.fastlogin"
}Zhishi.Cookie.setCookie("ww_oneKeyUrl",a,1);
Zhishi.Ajax.sendRequest("GET",Zhishi.loginStateUrl,{onSuccess:Zhishi.Login.doLoginForOnekey})
},doLogin:function(a){Zhishi.Login.rememberSearchWord();
if(a=="1"){document.location.reload()
}else{if(a=="0"){Zhishi.Login.openLoginDialog()
}}},doLoginForOnekey:function(a){if(a=="1"){document.location.reload()
}else{if(a=="0"){Zhishi.Login.openLoginDialog(null,true)
}}},rememberSearchWord:function(){if($("sb")&&$("sb").value!=""){Zhishi.Cookie.setCookie("ww_searchWord",$("sb").value)
}},logout:function(a){Zhishi.Cookie.setCookie("ww_hasLogOut","1");
Zhishi.Login.rememberSearchWord();
document.location=a
},autoCloseLoginDialog:function(){Zhishi.Login.loginDialog.close();
var e=Zhishi.Login.callBackObj;
if(e){var g="",b=Zhishi.Login.loginNavIds;
for(var a=0;
a<b.length;
a++){if(get(b[a])!=null){g=b[a];
break
}}var f=Zhishi.Login.loginList[e.getAttribute("wenwenid")];
if(typeof f!="function"){document.location=f
}else{var c=false;
if((" "+Zhishi.Login.callBackObj.className+" ").indexOf(" login_norefresh ")>-1){c=true
}else{if(get(g)){if((" "+get(g).className+" ").indexOf(" reload ")==-1){c=true
}}}if(c){if(Zhishi.loginStateBarUrl&&Zhishi.loginStateBarUrl.length>0){Zhishi.Ajax.sendRequest("GET",Zhishi.loginStateBarUrl,{onSuccess:Zhishi.Login.changeLoginStateBar})
}if(Zhishi.Login.callBackObj){Zhishi.Login.execOldMethod(Zhishi.Login.callBackObj)
}}else{document.location=document.location
}}}else{document.location=document.location
}}};function trim(a){if(typeof a=="string"){return a.replace(/(^\s*)|(\s*$)/g,"")
}}function $(a){return document.getElementById(a)
}Zhishi.Validator={};
Zhishi.Tool={};
Zhishi.Tool.InputHelp={_inputId:"",_message:"",_messageClassName:"",callClick:function(){},callBlur:function(){},startT:function(a,c,b){this._inputId=a?a:this._inputId;
this._message=c?c:"";
this._messageClassName=b?b:"WenwenInputHelpClass";
if(get(Zhishi.Tool.InputHelp._inputId).value==""){Zhishi.Tool.InputHelp.createT();
Zhishi.Tool.InputHelp.setT();
Zhishi.Event.attachEventListener(window,"resize",Zhishi.Tool.InputHelp.setT,false)
}Zhishi.Tool.InputHelp.callBlur()
},createT:function(){var a=document.createElement("div");
a.id="WenwenTipId";
a.innerHTML=Zhishi.Tool.InputHelp._message;
document.body.appendChild(a)
},setT:function(){var i=get(Zhishi.Tool.InputHelp._inputId),g=get("WenwenTipId");
g.style.position="absolute";
g.className=Zhishi.Tool.InputHelp._messageClassName;
var f=i.style.padding?parseInt(i.style.padding):0;
var c=i.style.margin?parseInt(i.style.margin):0;
if(Zhishi.Browser.isIE){var d=0,h=0,a=i;
while(a!=null&&a!=document.body){d+=a.offsetLeft;
h+=a.offsetTop;
parseInt(a.currentStyle.borderLeftWidth)>0?d+=parseInt(a.currentStyle.borderLeftWidth):"";
parseInt(a.currentStyle.borderTopWidth)>0?h+=parseInt(a.currentStyle.borderTopWidth):"";
a=a.offsetParent
}var b=d+f+4,e=h+f
}else{var j=i.getXY();
var b=j[0]+4,e=j[1]+2
}if(i.tagName.toLowerCase()=="textarea"){b+=4;
e+=4
}if(i.tagName.toLowerCase()=="input"){e+=(i.offsetHeight-c-f-g.scrollHeight)/2
}g.style.left=b+"px";
g.style.top=e+"px";
g.onclick=Zhishi.Tool.InputHelp.stopT;
i.onblur=Zhishi.Tool.InputHelp.startT;
i.onfocus=Zhishi.Tool.InputHelp.stopT
},stopT:function(){try{Zhishi.Tool.InputHelp.callClick();
document.body.removeChild(get("WenwenTipId"));
get(Zhishi.Tool.InputHelp._inputId).focus()
}catch(a){}}};function createSmartbox(a){createHtml();
Zhishi.oldSearchText="";
Zhishi.searchOldTime=-1;
Zhishi.Event.attachEventListener(document,"click",hideSb);
Zhishi.g_msg=[];
Zhishi.jsAutoInstance=new jsAuto("Zhishi.jsAutoInstance","divc",a);
Zhishi.Event.attachEventListener(window,"resize",function(){if(Zhishi.Browser.isIE6){setTimeout(function(){Zhishi.jsAutoInstance.showBox()
},100)
}else{Zhishi.jsAutoInstance.showBox()
}})
}function smartboxInit(a){if(typeof jQuery=="function"){jQuery(document).ready(function(){createSmartbox(a)
})
}else{createSmartbox(a)
}}function createHtml(){var a=document.createElement("div");
a.id="divc";
document.body.appendChild(a)
}function withRefererRedirect(c){if(Zhishi.Browser.isIE||Zhishi.Browser.isOpera){var b=document.createElement("a");
b.href=c;
document.body.appendChild(b);
b.click()
}else{document.location=c
}}function hideSb(){if(Zhishi.jsAutoInstance._o!=null){Zhishi.jsAutoInstance._o.style.visibility="hidden";
Zhishi.jsAutoInstance._f=false
}}function onSuggest(a,c){if(a.length<=1){Zhishi.g_msg=[]
}else{Zhishi.g_msg=a.replace(/(^\s*)|(\s*$)/g,"").split("\n");
if(Zhishi.Browser.isFirefox){Zhishi.g_msg[Zhishi.g_msg.length-1]=Zhishi.g_msg[Zhishi.g_msg.length-1].replace(/\0/g,"")
}}try{Zhishi.jsAutoInstance.handleEvent(get(c).value.trim(),c,g_event)
}catch(b){alert(b)
}}function userControl(a,c,b){var b=b?b:window.event;
g_event=b.keyCode?b.keyCode:b.which;
if(g_event==40||g_event==38){Zhishi.jsAutoInstance.directionKey()
}}function userInput(a,e,c){var b=(new Date()).getTime();
if(a.replace(/\s/g,"")==""){Zhishi.jsAutoInstance.handleEvent("",0,g_event);
return
}if(Zhishi.searchOldTime==-1||(b-Zhishi.searchOldTime>200&&(g_event>40||g_event<37))){var c=c?c:window.event;
g_event=c.keyCode?c.keyCode:c.which;
if(a.replace(/\s/g,"")==""){Zhishi.jsAutoInstance.handleEvent("",0,g_event);
return
}if((g_event!=40&&g_event!=38&&g_event!=27)||Zhishi.searchOldTime==-1){Zhishi.oldSearchText=get(e).value.trim()
}var d=siteBaseUrl+"SmartBox.e?sp=S"+encodeURIComponent(Zhishi.oldSearchText);
Zhishi.Ajax.sendRequest("GET",d,{onSuccess:onSuggest,cacheTime:600,para:e});
Zhishi.searchOldTime=(new Date()).getTime()
}}function jsAuto(a,b,c){this._msg=[];
this._x=null;
this._o=get(b);
if(!this._o){return
}this._f=false;
this._i=a;
this._fid=c;
this._r=get(c);
this._c=-1;
this._v=null;
this._e=0;
return this
}jsAuto.prototype.directionKey=function(){with(this){var ul=get(_o).gets("ul")[0];
if(_o.style.visibility=="hidden"&&_r.value!=""){if(Zhishi.searchOldTime>0){_i.showBox()
}}else{if(ul.childNodes.length<1){return
}var e=g_event;
var l=ul.childNodes.length-1;
if(e==40){if(_c>=0||_c==l){ul.childNodes[_c].className="sb_mouseout"
}_c++;
if(_c>=0&&_c<l+1){ul.childNodes[_c].className="sb_mouseover";
document.flpage.w.value=_x[_c]
}else{if(_c==l+1){_c=-1;
document.flpage.w.value=Zhishi.oldSearchText
}}}else{if(e==38){if(_c==-1){_c=ul.childNodes.length
}if(_c<l||_c==l){ul.childNodes[_c].className="sb_mouseout"
}_c--;
if(_c>=0){ul.childNodes[_c].className="sb_mouseover";
document.flpage.w.value=_x[_c]
}else{if(_c==-1){document.flpage.w.value=Zhishi.oldSearchText
}}}}document.flpage.w.focus()
}}};
jsAuto.prototype.domouseover=function(a){a.tagName=="li"?a.className="sb_mouseover":a.className="sb_mouseover"
};
jsAuto.prototype.domouseout=function(a){a.tagName=="li"?a.className="sb_mouseout":a.className="sb_mouseout"
};
jsAuto.prototype.doclick=function(c){if(this._r){var a=siteBaseUrl;
a+="Search.e?sp=S";
var b=document.flpage;
a+=encodeURIComponent(c.innerHTML)+"&pid=ask.smb";
withRefererRedirect(a)
}};
jsAuto.prototype.append2=function(){with(this){var ul=document.createElement("ul");
for(var i=0;
i<Zhishi.g_msg.length;
i++){var msg=Zhishi.g_msg[i];
_i?"":_i=eval(_i);
var li=document.createElement("li");
li.className="sb_mouseout";
info=msg.split(",");
if(!info||info.length<3){return;
num=info[0]
}var word=info[1];
var len=info.length;
if(len>3){for(var ii=2;
ii<len-1;
ii++){word+=","+info[ii]
}}var flag=eval(info[info.length-1]);
_x.push(word);
var word2=word.replace(/&/gi,"&amp;");
word2=word2.replace(/</gi,"&lt;");
word2=word2.replace(/>/gi,"&gt;");
lv=_v.toLowerCase();
msg=word2;
if(_v){li.innerHTML=msg
}li.onmouseover=function(){_i.domouseover(this)
};
li.onmouseout=function(){_i.domouseout(this)
};
li.onclick=function(){_i.doclick(this)
};
ul.appendChild(li);
_f=true
}_o.appendChild(ul)
}};
jsAuto.prototype.handleEvent=function(fValue,fID,event){with(this){var e=event;
_v=fValue;
_i=eval(_i);
if(e==27){_r.value=Zhishi.oldSearchText;
_o.innerHTML="";
_o.style.visibility="hidden";
return
}if(e==38||e==40){if(_o.style.visibility=="hidden"){_i.showBox();
var ul=get(_o).gets("ul")[0];
for(var i=0;
i<Zhishi.g_msg.length;
i++){var text=Zhishi.g_msg[i].split(",")[1];
if(text==document.flpage.w.value){_c=i;
ul.childNodes[_c].className="sb_mouseover";
document.flpage.w.focus()
}}}return
}if(e==13){return
}_i.showBox()
}};
jsAuto.prototype.showBox=function(){with(this){_c=-1;
_x=[];
_o.innerHTML="";
_f=false;
if(_i.append2){_i.append2()
}if((_f&&_v!="")||_e==-1){var l=_r.offsetLeft;
var t=_r.offsetTop+_r.offsetHeight;
_o.style.width=_r.offsetWidth-2+"px";
var tmp=_r;
while(tmp=tmp.offsetParent){l+=tmp.offsetLeft;
t+=tmp.offsetTop
}_o.style.left=l+"px";
_o.style.top=(t-2)+"px";
_o.style.visibility="visible"
}else{_o.style.visibility="hidden"
}}};
function ctrlSubmit(a,b){if(b.ctrlKey&&(b.keyCode==13)){document.getElementById(a).click()
}}function setTab(name,itemCnt,curItem,classHide,classShow){for(i=1;
i<=itemCnt;
i++){eval("document.getElementById('tab_"+name+"_"+i+"').className='"+classHide+"'")
}eval("document.getElementById('tab_"+name+"_"+curItem+"').className='"+classShow+"'");
for(i=1;
i<=itemCnt;
i++){eval("ele_hide = document.getElementById('con_"+name+"_"+i+"')");
if(ele_hide){ele_hide.style.display="none"
}}eval("ele_play = document.getElementById('con_"+name+"_"+curItem+"')");
if(ele_play){ele_play.style.display="block"
}}function isEmpty(a){return(a==null)||(a.length==0)
}function searchAnswer(a){var b=a.value.trim();
return !isEmpty(b)
}var importFriendDialog=null;
var questionOperateDialog=null;
function checkKey(a,b){if(b.keyCode==13){if(searchAnswer(a)){window.location.href=search_url+encodeURIComponent(a.value)
}else{window.location.reload()
}return false
}return true
}function redirectToOthers(b){var a=document.forms[0].w.value;
if(a!=null){window.location.href=siteBaseUrl+"Portal.htm?t=60&r="+encodeURIComponent(b.href)+"&w="+encodeURIComponent(a)
}}function redirectToOthersNoEncode(b){var a=document.forms[0].w.value;
if(a!=null){window.location.href=b.href+encodeURIComponent(a)
}}function redirectSearch(a,b){if(b){if(!a.empty()){window.location.href=siteBaseUrl+"Search.e?sp=S"+encodeURIComponent(a)+"&ch=k2"
}else{window.location.reload()
}}else{window.location.href=siteBaseUrl+"AskQuestionConfirm.e?sp=0&sp=S"+encodeURIComponent(a)+"&ch=k1"
}}function redirectSearch4Form(k,b){var g=k.w.value.trim();
if(g==""){window.location.reload();
return false
}else{var h="w.search.sb";
if(b&&b!=""){Zhishi.Stats.ch(b)
}var j="";
try{if(search_solved_url){j=search_solved_url.replace(/\?.*/gi,"")
}}catch(l){j="/z/Search.e"
}if(Zhishi.Browser.isIE||Zhishi.Browser.isOpera){var c=document.createElement("a");
c.href=j+"?sp=S"+encodeURIComponent(g)+"&ch="+h;
var d=get("sb");
d.parentNode.appendChild(c);
c.click();
return false
}else{k.action=j;
k.sp.value="S"+g;
k.ch.value=h;
return true
}}}function redirectForAsk(a,f,d,b){if(d==null){d=0
}if(b==null){b=pageId
}var e=a.value.trim();
var c="";
c=siteBaseUrl+"Ask.e?sp=S"+encodeURIComponent(e)+"&sp="+d;
if(e==""){c+="&ch=w.ask.empty"
}else{c+="&ch=w.ask.word"
}withRefererRedirect(c)
}function alertExpert(){setTimeout(function(){var a=new Zhishi.Dialog("\u56fe\u6807\u8bf4\u660e",380,240,true,"http://cache.soso.com/wenwen/help_sw_new3.htm");
a.show()
},0)
}function redirectAnswer(){var b=get("sb");
var a="";
if(b.value.trim()!=""){a="sw="+encodeURIComponent(b.value.trim())+"&answerkey="+encodeURIComponent(b.value.trim())+"&ch=w.answer.word";
withRefererRedirect("/z/TopQuestion.htm?"+a)
}else{a+="ch=w.answer.empty";
withRefererRedirect("/z/AnswerCenter.htm?"+a)
}}function redirectAskWithParam(c,d,f){var g=c.value.trim();
var e="";
if(d==null){d=""
}if(f==null){f=0
}e=siteBaseUrl+"Ask.e?sp=S"+encodeURIComponent(g)+"&sp="+f+"&ch="+d;
if(Zhishi.Browser.isIE||Zhishi.Browser.isOpera){var b=document.createElement("a");
b.href=e;
document.body.appendChild(b);
b.click()
}else{document.location=e
}}function redirectSearch4FormWithParam(k,h){var j="";
try{if(search_solved_url){j=search_solved_url.replace(/\?.*/gi,"")
}}catch(l){j="/z/Search.e"
}var d=k.znInput.value.trim();
var g=h==null?"":h;
if(d==""){window.location.reload();
return false
}else{if(Zhishi.Browser.isIE||Zhishi.Browser.isOpera){var b=document.createElement("a");
b.href=j+"?sp=S"+encodeURIComponent(d)+"&ch="+g;
var c=get("sb");
c.parentNode.appendChild(b);
b.click();
return false
}else{k.action=j;
k.sp.value="S"+d;
k.ch.value=g;
return true
}}}function markLinkAttrPreferred(c,b,e,a){var d=c(b);
if(!(d.is("a"))){return
}c.each(["ch","pid","cid"],function(h,g){var k;
var m=d.attr(g);
if(m!==undefined&&m!=""){k=m
}else{if(g==a){k=e
}}if(k){var j=d.attr("href");
if(j.indexOf("javascript:")==0){return
}var f=j.indexOf("?")<0?"?":"&";
var n="";
if(j.indexOf("#")>-1){n=j.substring(j.indexOf("#"),j.length);
j=j.substring(0,j.indexOf("#"))
}if(g=="pid"||g=="ch"||g=="cid"){var l=d.html();
d.attr("href",j+f+g+"="+k+n);
d.html(l)
}}})
}function mark(c,k,g){if(!c){return
}var f=c.childNodes;
var h=null;
if(!f||!f.length){return
}for(var d=0;
d<f.length;
d++){h=null;
if(f[d].tagName=="A"){if(typeof(jQuery)!="undefined"){markLinkAttrPreferred(jQuery,f[d],k,g)
}else{if(k&&f[d].setAttribute){var a=f[d].href;
if(a.indexOf("javascript:")==0){continue
}var j=a.indexOf("?")<0?"?":"&";
var e="";
if(a.indexOf("#")>-1){e=a.substring(a.indexOf("#"),a.length);
a=a.substring(0,a.indexOf("#"))
}var b=f[d].innerHTML;
if(g=="pid"){f[d].href=a+j+"pid="+k+e
}if(g=="ch"){f[d].href=a+j+"ch="+k+e
}if(g=="cid"){f[d].href=a+j+"cid="+k+e
}f[d].innerHTML=b
}}}else{if(typeof f[d]!="null"){if(document.all&&f[d].ch){h=f[d].ch;
g="ch"
}else{if(document.all&&f[d].pid){h=f[d].pid;
g="pid"
}else{if(document.all&&f[d].cid){h=f[d].cid;
g="cid"
}else{if(navigator.userAgent.toLowerCase().search("msie")<0&&f[d].getAttribute){if(f[d].getAttribute("ch")){h=f[d].getAttribute("ch");
g="ch"
}if(f[d].getAttribute("pid")){h=f[d].getAttribute("pid");
g="pid"
}if(f[d].getAttribute("cid")){h=f[d].getAttribute("cid");
g="cid"
}}}}}if(h){mark(f[d],h,g)
}else{mark(f[d],k,g)
}}}}}function focus_input(a){if(!a||a.disabled){return true
}else{a.select();
return false
}}function aboutSpecialty(b){var a="http://cache.soso.com/wenwen/help_sw_new3.htm";
if(b){Zhishi.Stats.ch(b)
}setTimeout(function(){var c=new Zhishi.Dialog("\u56fe\u6807\u8bf4\u660e",380,240,true,a);
c.show()
},0)
}function importQQFriend(){importFriendDialog=new Zhishi.Dialog("\u6dfb\u52a0\u597d\u53cb",390,450,true,"MyFriendImportNew.htm");
importFriendDialog.afterClose=function(){document.location.reload()
};
importFriendDialog.show()
}function questionOperate(b,d,c,a){questionOperateDialog=new Zhishi.Dialog(d,c,a,true,b);
questionOperateDialog.afterClose=function(){document.location.reload()
};
questionOperateDialog.show()
}function splitResNum(g){var f=g.toString();
var a=f.length;
if(a<4){document.write(f);
return
}var e=a/3;
var c=Math.floor(e);
var b=a%3;
res="";
if(b==0){b=3;
c=c-1
}res+=f.substr(0,b)+","+f.substr(b,3);
for(var d=1;
d<c;
d++){res+=","+f.substr(b+d*3,3)
}document.write(res)
}function addFavourite(a){Zhishi.Ajax.sendRequest("GET",a+"&r="+Math.random(),{onSuccess:function(b){Feed.alertCollectQuestion(b,window.location.reload)
}})
}function expandUser(j){if(j){var g=j.id;
var e=document.getElementById(g);
var h=g.charAt(g.length-1);
var a=h+h;
var b;
var c;
if(g.indexOf(a)>-1){b=g.substring(0,g.length-1);
c=document.getElementById(b)
}else{b=g+h;
c=document.getElementById(b)
}var f=e.style.display;
var d=c.style.display;
e.style.display=d;
c.style.display=f
}}function WenwenAjaxEvent(b,a,c){this.url=b;
this.cbh=(a==null||typeof a=="undefined")?this.defaultCbHandler:a;
this.async=(c==null||typeof c=="undefined")?false:c;
this.errMsg="[-1, '\u64cd\u4f5c\u672a\u80fd\u6210\u529f，\u8bf7\u91cd\u8bd5！']"
}WenwenAjaxEvent.prototype.setUrl=function(a){this.url=a
};
WenwenAjaxEvent.prototype.setCbh=function(a){this.cbh=a
};
WenwenAjaxEvent.prototype.setAsync=function(a){this.async=a
};
WenwenAjaxEvent.prototype.defaultCbHandler=function(rstMsg){var rsp=null;
try{rsp=eval(rstMsg)
}catch(e){rsp=eval(this.errMsg)
}if(rsp!=null){var code=rsp[0];
var msg=rsp[1];
alert(msg);
window.location.reload()
}};
WenwenAjaxEvent.prototype.getXmlHttp=function(){var a=null;
try{a=new ActiveXObject("Msxml2.XMLHTTP")
}catch(c){try{a=new ActiveXObject("Microsoft.XMLHTTP")
}catch(b){a=null
}}if(!a&&typeof XMLHttpRequest!="undefined"){try{a=new XMLHttpRequest()
}catch(c){a=null
}}if(!a&&window.createRequest){try{a=window.createRequest()
}catch(c){a=null
}}return a
};
WenwenAjaxEvent.prototype.notify=function(){var b=this.getXmlHttp();
if(!b){this.cbh(this.errMsg);
return
}b.open("GET",this.url+(this.url.indexOf("?")<0?"?":"&")+"r="+Math.random(),this.async);
if(this.async){var a=this;
b.onreadystatechange=function(){if(b.readyState==4&&b.status==200){a.cbh(b.responseText)
}}
}b.send(null);
if(!this.async){this.cbh(b.responseText)
}};
var Wenwen=new Object();
Wenwen.defaultHttpRequest=function(a){Wenwen.syncHttpRequest(a)
};
Wenwen.syncHttpRequest=function(a,b){var c=new WenwenAjaxEvent(a,b);
c.notify()
};
Wenwen.asyncHttpRequest=function(a,b){var c=new WenwenAjaxEvent(a,b,true);
c.notify()
};
Wenwen.openWindow=function(c,g,b,e,a,d){var f=window.open(c,g,"scrollbars=yes,width="+b+",height="+e+",left="+a+",top="+d);
if(f.focus){f.focus()
}};
var nav=(function(){var d=null,f=null,c=null;
function j(){Zhishi.Event.attachEventListener("topQuestion","mouseover",g);
Zhishi.Event.attachEventListener("topQuestion","mouseout",e);
Zhishi.Event.attachEventListener("topCategories","mouseout",h);
Zhishi.Event.attachEventListener("topCategories","mouseover",k)
}function g(){if(f!=null){clearTimeout(f)
}d=setTimeout(function(){if(!c.visible()){c.show()
}},200)
}function e(){if(d!=null){clearTimeout(d)
}h()
}function h(){f=setTimeout(function(){if(c.visible()){c.hide()
}},400)
}function k(){if(f!=null){clearTimeout(f)
}}function b(){c=get("topCategories")
}function a(){j();
b()
}return{initNavigation:a}
})();
if(typeof jQuery=="function"){jQuery(document).ready(function(){var b=jQuery;
var a=Zhishi.Cookie;
if(b(".notice_wrap").length>0){if(a.getCookie("zs_bubble_md5")==""||a.getCookie("zs_bubble_md5")!=b(".notice_wrap").attr("md5")){b(".notice_wrap").fadeIn(2000)
}if(b(".notice_wrap:visible").length>0){b(".notice_wrap .close_layer, a").click(function(){b(".notice_wrap").hide();
a.setCookie("zs_bubble_md5",b(".notice_wrap").attr("md5"),365*24)
});
setTimeout(function(){b(".notice_wrap").fadeOut(2000);
a.setCookie("zs_bubble_md5",b(".notice_wrap").attr("md5"),3)
},30000)
}}b(".s_user_more").mouseover(function(){b(".notice_wrap").fadeOut();
a.setCookie("zs_bubble_md5",b(".notice_wrap").attr("md5"),3)
});
b(".s_user_msg").mouseover(function(){b(".notice_wrap").fadeOut();
a.setCookie("zs_bubble_md5",b(".notice_wrap").attr("md5"),3)
})
})
}(function(){if(typeof jQuery=="function"){jQuery(document).ready(function(){if(document.URL.indexOf("final2011")>-1){jQuery(".s_search_form").append('<a class="answer_center" href="/z/AnswerCenter.htm">\u56de\u7b54\u4e2d\u5fc3</a>')
}})
}})();
function redirectWrapped(b,a){Zhishi.Stats.ch("2013ww.tw.kf");
if(Zhishi.Browser.isIE){if(b&&b.href){if(b.href.indexOf("/z/UrlAlertPage.e?sp=S")>=0){return true
}b.href="/z/UrlAlertPage.e?sp=S"+encodeURIComponent(b.href)
}return true
}if(b&&b.href){window.open("/z/UrlAlertPage.e?sp=S"+encodeURIComponent(b.href));
return(a==true)?true:false
}else{return false
}};(function(){function c(j,f,g,o){var l=document,e=l.referrer,k="-",n=new Date().getUTCMilliseconds(),i=l.cookie.match(/suid=([^;]*)(;|$)/);
if(i){k=i[1]
}else{l.cookie="suid="+(Math.round(Math.random()*2147483647)*n)%10000000000+";path=/; domain=soso.com;expires=Sun, 18 Jan 2038 00:00:00 GMT;";
i=l.cookie.match(/suid=([^;]*)(;|$)/);
if(i){k=i[1]
}}o=o||"";
var h=new Image(1,1);
h.src="http://pr.soso.com/pingd?srctype=getsret&ourl="+escape(j)+"&lurl="+escape(l.location)+"&suid="+k+"&ch="+f+"&sort="+g+"&sc="+o+"&rand="+Math.random()
}function b(d,f,e,g){if((0==d.length)||(0==f.length)){return
}c(d,f,e,g);
return
}function a(d,f,e){b(d,f,e,"ask")
}Zhishi.Stats={};
Zhishi.Stats.ch=function(e,d){if(!e){return false
}if(e.length>3&&e.slice(0,3)=="ch="){e=e.slice(3)
}var f=document.location||"/";
if(d&&d.length>0){f=d
}setTimeout(function(){a(f,e,0)
},0)
}
})();(function(b){function a(d){var c=d||location.href;
c=encodeURIComponent(c);
return'<img src="/x/chart?q='+c+'" id="QRCode">'
}b.fn.qrcode=function(d){var c=a(d);
b(this).append(c)
};
b.extend({qrcode:a})
})(jQuery);