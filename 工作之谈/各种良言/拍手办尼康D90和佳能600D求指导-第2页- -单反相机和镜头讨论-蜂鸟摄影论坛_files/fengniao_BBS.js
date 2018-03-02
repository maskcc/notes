_BFD.addEvent = function (a, b, c) {
	if (a.addEventListener) {
		a.addEventListener(b, c, false)
	} else {
		if (a.attachEvent) {
			a.attachEvent("on" + b, function () {
				c.call(a)
			})
		} else {
			a["on" + b] = c
		}
	}
};
_BFD.removeEvent = function (a, b, c) {
	if (a.removeEventListener) {
		a.removeEventListener(b, c, false)
	} else {
		if (a.detachEvent) {
			a.detachEvent("on" + b, function () {
				c.call(a)
			})
		} else {
			a["on" + b] = null
		}
	}
};
_BFD.createElement = function (d, a) {
	var c = document.createElement(d);
	if (a) {
		for (var b in a) {
			if (a.hasOwnProperty(b)) {
				if (b === "class" || b === "className") {
					c.className = a[b]
				} else {
					if (b === "style") {
						c.style.cssText = a[b]
					} else {
						c.setAttribute(b, a[b])
					}
				}
			}
		}
	}
	return c
};
_BFD.loadScript = function (a, b) {
	setTimeout(function () {
		var c = _BFD.createElement("script", {
				src : a,
				type : "text/javascript"
			});
		if (c.readyState) {
			_BFD.addEvent(c, "readystatechange", function () {
				if (c.readyState === "loaded" || c.readyState === "complete") {
					if (b) {
						b()
					}
					_BFD.removeEvent(c, "readystatechange", arguments.callee)
				}
			})
		} else {
			_BFD.addEvent(c, "load", function () {
				if (b) {
					b()
				}
				_BFD.removeEvent(c, "load", arguments.callee)
			})
		}
		document.getElementsByTagName("head")[0].appendChild(c)
	}, 0)
};
_BFD.getByAttribute = function (f, g, a) {
	var b = [],
	a = (a) ? a : document,
	d = a.getElementsByTagName("*");
	for (var c = d.length - 1; c >= 0; c--) {
		var e = d[c];
		if (f === "className" || f === "class") {
			if (e.className === g) {
				b.send(e)
			}
		} else {
			if (e.getAttribute(f) === g) {
				b.send(e)
			}
		}
	}
	return b
};
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

_BFD.getById = function (a) {
	if (typeof a === "string" && !!a) {
		return document.getElementById(a)
	}
};
_BFD.loadCss = function (a) {
	var b = _BFD.createElement("link", {
			href : a,
			rel : "stylesheet",
			type : "text/css"
		});
	document.getElementsByTagName("head")[0].appendChild(b)
};

_BFD.loadCss('http://static1.baifendian.com/service/fengniao/fengniao_BBS.css');
_BFD.loadScript(('https:' == document.location.protocol ? 'https://ssl-static' : 'http://static') + '.baifendian.com/api/2.0/bcore.min.js', function () {
	
	//new $Core(function(){
	var _this = new $Core();
	var bfd_invoketime = 0;
	try { //获取dom节点，dom没加载完毕，捕获到异常，等待一秒重行，总共等十秒。
		/*var s = getByClass(document,"text_box1")[0];
		var sA = s.getElementsByTagName('h2')[0];
		var oArrParent = getByClass(document,"area clearfix")[0];
		var oArrDiv=getByClass(oParent,"path")[0];
		var bfd_uid=document.getElementById("__uname__").innerHTML;*/
	} catch (e) {
		if (bfd_invoketime < 10) {
			setTimeout(arguments.callee, 1000);
			bfd_invoketime++;
			return;
		} else {}
	}
	
	function getByClass(oParent, sClass) {
		var aEle = oParent.getElementsByTagName('*');
		var re = new RegExp('\\b' + sClass + '\\b', 'i');
		var aResult = [],
		aTmp = [],
		i = 0,
		j = 0;
		for (i = 0; i < aEle.length; i++) {
			if (re.test(aEle[i].className)) {
				aResult.push(aEle[i]);
			}
		}
		return aResult;
	}
	
	//导入Tools
	var Tools = $Core.tools.Tools;
	var _customid = "Cfengniao";
	var _bid = "6ADCE95E_B9E8_5D23_506A_CE012C97BF55";
	
	_this.options.uid = _BFD.BFD_INFO.user_id;
	if (typeof(_this.options.uid) == 'undefined' || _this.options.uid == '' || _this.options.uid == '0' || _this.options.uid == null) {
		_this.options.uid = _this.options.sid;
	}
	
	var category = _BFD.BFD_INFO.categoryDetail;
	var catid = [];
	if (category && category instanceof Array) {
		for (var i = 0; i < category.length; i++) {
			catid.push(category[i][0]);
		}
	}
	if (catid.length == 0) {
		catid.push('Not provided');
	}
	//var _link =self.location.href;
	var _iid = _BFD.BFD_INFO.iid;
	if(_iid.indexOf("_")!=-1)
	{
		var _iidArr=_iid.split("_");
		_iid=_iidArr[0];
	}
	var _title = _BFD.BFD_INFO.title;
	
	function BFD_trim(str) {
		return str.replace(/(^\s*)|(\s*$)/g, "");
	}
	
	var author='';//作者	
	var s =  getByClass(document,"name clearfix")[0];
	if(s){
		var arr = s.getElementsByTagName('a');
		if(arr.length>0){
			author = arr[0].innerHTML;
		}
	}
	var qicai='';//器材
	var equip_param ='';
	var s1 =  getByClass(document,"info")[0];
	if(s1){
		if(s1.innerHTML.indexOf('[器材]')!==-1){
			equip_param =  s1.innerHTML.replace(/<(S*?)[^>]*>.*?|<.*?\/>/ig,"");	
			var arr = s1.getElementsByTagName('a');
			if(arr.length>0){
				qicai = arr[0].innerHTML;
			}		
		}
	}
	var s11 =  getByClass(document,"info")[1];
	if(s11){
		if(s11.innerHTML.indexOf('[参数]')!==-1){
			equip_param += "\t" + s11.innerHTML.replace(/<(S*?)[^>]*>.*?|<.*?\/>/ig,"");			 
		}
	}
	
	
	var user_level='';
	var s2 =  getByClass(document,"status")[0];
	if(s2){
		 user_level =s2.innerHTML.replace(/<(S*?)[^>]*>.*?|<.*?\/>/ig,"");		 
	}
	

	_this.options.cid = _customid;
	
	_this.options.p_t = "dt"; //页面类型
	_link = window.location.href;
	var _flip = false;
	var re = /(_\d+\.){1}/g || /(_1\.){1}/g;
	if (re.test(_link)) {
		
		_flip = true; //第二页
	}
	
	if (_flip) {
		_this.send(new $Core.inputs.Visit(_iid));
		//浏览页面
		var page_view = new $Core.inputs.PageView();
		page_view.p_s = _title; //页面标签
		page_view.p_p = 'rec'; //页面标签
		_this.send(page_view);
	} else {
		
		var add_item = new $Core.inputs.AddItem(_iid);
		//add_item.typ="bbs";
		add_item.title = _title;
		add_item.url = _BFD.BFD_INFO.url;
		add_item.cat = catid.join('|');
		add_item.author = author;
		
		var json = new $Core.inputs.JObject();
		json.equipment = qicai;
		json.equip_param = equip_param;
		json.user_level = user_level;
		add_item.attr = json.toString();
		
		//attr":{"equip_param":"[器材] 佳能数码相机【佳能 5D Mark II】\t[参数] 光圈: F/3.2 快门:1/125 焦距:50 毫米 感光度:320","user_level":"高级会员","resmd5":"102019015632641387857f5eae4bbfc4","equipment":["佳能数码相机","佳能 5D Mark II"]

		
		var arrTit = _title.split('');
		var k = 0;
		for (var i = 0; i < arrTit.length; i++) {
			
			var reg = /[\u4E00-\u9FA5]+/g;
			if (reg.test(arrTit[i])) {
				k++;
			}
			
		}
		
		/*if (k < 8 || _title.search('span') != -1 || _title == "") {
			_this.send(new BCore.inputs.RmItem(_iid));
		} else {*/
			_this.send(add_item);
		//}
		
		//添加类别
		if (catid.length > 0) {
			var cat = catid[catid.length - 1];
			_this.send(new $Core.inputs.VisitCat(cat));
			var add_cat = new $Core.inputs.AddCat(cat);
			if (category.length > 0) {
				add_cat.url = category[category.length - 1][1];
				category.pop();
				add_cat.ptree = new $Core.inputs.JObject().toString(category);
				_this.send(add_cat);
			}
		}
		
		//浏览文章
		_this.send(new $Core.inputs.Visit(_iid));
		
		//浏览页面
		var page_view = new $Core.inputs.PageView();
		page_view.p_s = _title; //页面标签
		page_view.p_p = 'rec'; //页面标签
		_this.send(page_view);
	}
	
	//去重
	function remRepeat(arr, repeat_ids, num) {
		var res = [];
		var j = 0;
		for (var i = 0; i < arr.length; i++) {
			var item_id = arr[i]["iid"];
			// 如果没有与需要过滤的结果重复,并且不足希望返回结果数目
			if (!repeat_ids[item_id]) {
				res.push(arr[i]);
				repeat_ids[item_id] = true;
				j++;
			}
			if (j >= num) {
				break;
			}
		}
		return res;
	}
	
	var repeat_ids = {};
	var rfmt = new $Core.inputs.JObject();
	rfmt.iid = "$id";
	rfmt.name = "$title";
	rfmt.url = "$url";
	
	BCore.recommends.Recommend.prototype.fmt = rfmt.toString();
	
	var rec_vav = new $Core.recommends.MRecVAV(_iid, 12);
	rec_vav.et = 'NewsBase';
	rec_vav.cat = catid; //为了补热览
	rec_vav.p_bid = _bid;
	rec_vav.fmt = rfmt.toString();
	
	function DataLength(str) {
		var intLength = 0;
		for (var i = 0; i < str.length; i++) {
			if ((str.charCodeAt(i) < 0) || (str.charCodeAt(i) > 255))
				intLength = intLength + 2;
			else
				intLength = intLength + 1;
		}
		return intLength;
	}
	
	_this.send(rec_vav, function (json) {
		
		var rec_result;
		var req_id;
		if (json) {
			rec_result = json[3];
			req_id = json[2];
		}
		
		if (rec_result != null) {
			
			rec_result = remRepeat(rec_result, repeat_ids, 10);
			var banner_id = _bid;
			if (rec_result && rec_result.length > 0) {
				var banner_vav = _BFD.showBFD();
				bfd_show_vav(rec_result, banner_vav, req_id, banner_id);
			}
		}
		
	});
	
	function bfd_show_vav(datas, obj, req_id, banner_id) {
		var ul_obj = '';
		for (var i = 0; i < datas.length; i++) {
			if (i % 5 == 0) {
				ul_obj = document.createElement("ul");
				//ul_obj.className = "bfd_content";
				obj.appendChild(ul_obj);
			};
			var item_div = _BFD.bfd_templat(datas[i], ul_obj);
			var _a = item_div.getElementsByTagName("a");
			for (var j = 0; j < _a.length; j++) {
				Tools.bind(_a[j], "click", (function (x, iid) {
						return function () {
							new BCore(function () {
								var fb = new $Core.inputs.FeedBack(req_id);
								fb.p_on = x + 1;
								fb.p_bid = banner_id;
								fb.iid = iid;
								this.send(fb);
							});
						}
					})(i, datas[i].iid));
			}
			
		}
		
		if(document.getElementById("bfd_vav")){
				BCore.exts.BannerShow.prototype.push(document.getElementById("bfd_vav"),banner_id);
			}
		
	}
	/*
	//推荐中的每一项链接
	function bfd_templat(data_one,div,req_id){
	var href = data_one.url;
	var li = document.createElement('li');
	
	if(DataLength(data_one.name)>30){
	var html = '<a target="_blank" title="'+data_one.name+'" href="'+href+'">'+Tools.getByteLen(data_one.name.replace("&quot;","\""),30)+".."+'</a>';
	}else{
	var html = '<a target="_blank" title="'+data_one.name+'" href="'+href+'">'+data_one.name+'</a>';
	}
	li.style.overflow="hidden";
	li.innerHTML = html;
	div.appendChild(li);
	return li;
	}
	
	
	function showBFD(){
	
	if(document.getElementById("bfd_vav")){
	
	var div=document.getElementById("bfd_vav");
	div.className="wrapper mt";
	div.style.display="block";//id:portal_block_88_content
	div.innerHTML = '<div class="relatedPush"><div class="headline"><strong>蜂鸟猜你喜欢</strong><span class="otherGuide"><a href="http://www.baifendian.com" target="_blank" class="bfd_img_logo" title="百分点推荐引擎"></a></span></div><div class="pushBox clearfix"></div></div>'
	
	
	div.style.overflow="hidden";
	
	return getByClass(document,"pushBox")[0];
	}
	
	}*/
	
	function DataLength(str) {
		var intLength = 0;
		for (var i = 0; i < str.length; i++) {
			if ((str.charCodeAt(i) < 0) || (str.charCodeAt(i) > 255))
				intLength = intLength + 2;
			else
				intLength = intLength + 1;
		}
		return intLength;
	}
	
	//});
});
