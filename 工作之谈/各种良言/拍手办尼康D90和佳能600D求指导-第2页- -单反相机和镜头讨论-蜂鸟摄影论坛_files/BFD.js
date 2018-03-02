window["_BFD"] = window["_BFD"] || {};
//推荐中的每一项链接
_BFD.getByClass =function (oParent, sClass){
	var aEle=oParent.getElementsByTagName('*');
	var re=new RegExp('\\b'+sClass+'\\b', 'i');
	var aResult = [],aTmp = [],i = 0,j = 0;
	for(i=0;i<aEle.length;i++){
		if(re.test(aEle[i].className)){
			aResult.push(aEle[i]);
		}
	}
	return aResult;
}
_BFD.getByteLen =function (str,num){
	var arr=str.split("");
	if(str.length>num)
	{
		return str.substring(0,num);
	}
	else 
	{
		return str;
	}
}
_BFD.bfd_templat =function (data_one,div,req_id){
	var href = data_one.url;
	var li = document.createElement('li');


	var html = '<a target="_blank" title="'+data_one.name+'" href="'+href+'">'+_BFD.getByteLen(data_one.name.replace("&quot;","\""),25)+'</a>';
	
	li.style.overflow="hidden";
	li.innerHTML = html;
	div.appendChild(li);
	return li;
}

_BFD.showBFD =function (){	
	if(document.getElementById("bfd_vav")){		
		var div=document.getElementById("bfd_vav");
		div.className="wrapper mt";
		div.style.display="block";//id:portal_block_88_content
		div.innerHTML = '<div class="relatedPush"><div class="headline"><strong>蜂鸟猜你喜欢</strong><span class="otherGuide"><a href="http://www.baifendian.com" target="_blank" class="bfd_img_logo" title="百分点推荐引擎"></a></span></div><div class="pushBox clearfix"></div></div>'
		div.style.overflow="hidden";
		return _BFD.getByClass(document,"pushBox")[0];
	}
}

tmp=location.pathname;
tmp_pos=tmp.indexOf('.')-1;
iid=tmp.substr(1,tmp_pos);
title=$('.caption a').text();
url=location.href;
link_list=$('.crumbs a');
categoryDetail=new Array();
for(i=1;i<link_list.length;i++){
	categoryDetail[i-1]=new Array(link_list[i].text,link_list[i].href);
}
_BFD.BFD_INFO = {
	user_id : $.cookie('bbusername'),
	iid : iid,
	title : title,
	url : url,		
	categoryDetail:categoryDetail
};
_BFD.script = document.createElement("script");
_BFD.script.type = 'text/javascript';
_BFD.script.async = true;
_BFD.script.charset = 'utf-8';
_BFD.script.src = (('https:' == document.location.protocol?'https://ssl-static1':'http://static1')+'.baifendian.com/service/fengniao/fengniao_BBS.js');
document.getElementsByTagName("head")[0].appendChild(_BFD.script);