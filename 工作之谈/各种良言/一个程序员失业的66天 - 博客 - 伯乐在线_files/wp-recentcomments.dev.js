/**
 * @author mg12
 * @update 2010/08/22
 * @website http://www.neoease.com/
 */

RecentComments = function() {
	this.param = rcGlobal;

	this.config = {
		commentTempId	:'rc-comment-temp',
		pingTempId		:'rc-ping-temp',
		itemIdPrefix	:'rc-comment-',
		commentClass	:'rc-comment',
		infoClass		:'rc-info',
		excerptClass	:'rc-excerpt',
		ellipsisClass	:'rc-ellipsis',
		contentClass	:'rc-content',
		labelClass		:'rc-label',
		toggleClass		:'rc-toggle',
		collapseClass	:'rc-collapse',
		expandClass		:'rc-expand',
		naviClass		:'rc-navi',
		newestClass		:'rc-newest',
		newerClass		:'rc-newer',
		olderClass		:'rc-older',
		loadingClass	:'rc-loading'
	};

	this.context = {
		commentTemp		:null,
		pingTemp		:null,
		list			:null
	};
};

RecentComments.prototype = {

	init: function(config) {
		this.config = config || this.config;

		var commentTemp = document.getElementById(this.config.commentTempId);
		var pingTemp = document.getElementById(this.config.pingTempId);

		if(!commentTemp || !pingTemp) {
			return false;
		}

		this.context.commentTemp = commentTemp.cloneNode(true);
		this.context.pingTemp = pingTemp.cloneNode(true);
		this.context.list = commentTemp.parentNode;

		this.page(1);
	},

	page: function(page) {
		var _self = this;

		var url = _self.param.serverUrl;
		url += '?action=rc-ajax';
		url += '&page=' + page;
		url += '&_=' + Date.parse(new Date());

		_self._ajax('GET', url, {
			beforeSend: function() {
				_self._changeCursor('wait');
				_self._loading();
			},
			success: function(data) {
				var json = eval('(' + data + ')');
				_self._buildList(json);
				_self._changeCursor('auto');
			}
		});
	},

	_buildList: function(json) {
		var _self = this;

		if(!json.items) {
			_self.context.list.innerHTML = '<li>' + _self.param.noCommentsText + '</li>';
			return false;
		}

		var listCode = _self._createCommentCode(json.items);
		var naviCode = _self._createNaviCode(json.navi);
		if(naviCode.length > 0) {
			listCode += naviCode;
		}

		_self.context.list.innerHTML = listCode;

		if(_self.param.showContent) {
			var commentItems = _self.context.list.getElementsByTagName('li');
			for(var i=0; i<commentItems.length; i++) {
				var commentItem = commentItems[i];
				_self._bindCommentAction({item:commentItem});
			}
		}

		if(this.param.external) {
			_self._initLinks();
		}

		if(naviCode.length > 0) {
			_self._bindNaviAction({item:_self.context.list, pageNumber:json.navi.page});
		}

		return true;
	},

	_createCommentCode: function(items) {
		var list = document.createElement('ul');

		for(var i=0; i<items.length; i++) {
			var item = items[i];
			var node = null;
			if(item.type == 'pingback' || item.type == 'trackback') {
				node = this._buildPing(item);
			} else {
				node = this._buildComment(item);
			}
			if(node) {
				list.appendChild(node);
			}
		}

		return list.innerHTML;
	},

	_createNaviCode: function(navi) {
		if(!navi) {
			return '';
		}

		var pageNumber = parseInt(navi.page, 10);
		if(pageNumber <= 1 && !navi.more) {
			return '';
		}

		var _self = this;
		var code = '<li class="' + _self.config.naviClass + ' rc-clearfix">';

		if(pageNumber >= 2) {
			if(pageNumber > 2) {
				code += '<a "rel=nofollow" class="' + _self.config.newestClass + '">' + _self.param.newestText + '</a>';
			}
			code += '<a "rel=nofollow" class="' + _self.config.newerClass + '">' + _self.param.newerText + '</a>';
		}
		if(navi.more) {
			code += '<a "rel=nofollow" class="' + _self.config.olderClass + '">' + _self.param.olderText + '</a>';
		}

		code += '</li>';
		return code;
	},

	_bindCommentAction: function(args) {
		var item = args.item;
		var _self = this;

		var itemExcerpt = _self._getElementsByClassName(_self.config.excerptClass, 'div', item)[0];
		var itemEllipsises = _self._getElementsByClassName(_self.config.ellipsisClass, 'span', item);

		if(itemEllipsises.length == 1) {
			_self._addListener(itemExcerpt.parentNode, 'mouseover', _self._enterCommnet, {_self:_self, item:item});
			_self._addListener(itemExcerpt.parentNode, 'mouseout', _self._leaveCommnet, {_self:_self, item:item});
		}
	},

	_bindNaviAction: function(args) {
		var item = args.item;
		var pageNumber = args.pageNumber;
		var _self = this;

		var newestLinks = _self._getElementsByClassName(_self.config.newestClass, 'a', item);
		if(newestLinks.length == 1) {
			_self._addListener(newestLinks[0], 'click', function(ev){_self.page(1);});
		}

		var newerLinks = _self._getElementsByClassName(_self.config.newerClass, 'a', item);
		if(newerLinks.length == 1) {
			_self._addListener(newerLinks[0], 'click', function(ev){_self.page(parseInt(pageNumber, 10) - 1);});
		}

		var olderLinks = _self._getElementsByClassName(_self.config.olderClass, 'a', item);
		if(olderLinks.length == 1) {
			_self._addListener(olderLinks[0], 'click', function(ev){_self.page(parseInt(pageNumber, 10) + 1);});
		}
	},

	_buildComment: function(item) {
		var itemNode = this.context.commentTemp.cloneNode(true);
		var itemInfo = this._getElementsByClassName(this.config.infoClass, 'div', itemNode)[0];
		var itemExcerpt = this._getElementsByClassName(this.config.excerptClass, 'div', itemNode)[0];

		itemNode.id = this.config.itemIdPrefix + item.id;

		if(item.reviewerName.length <= 0) {
			item.reviewerName = this.param.anonymous;
		}

		var reviewerLink = '';
		
		if(item.title) {
			
			if(item.reviewerUrl && item.reviewerUrl.length > 0) {
				var relTag = 'nofollow';
				if(this.param.external && item.reviewerUrl.indexOf(this.param.serverUrl) !== 0) {
					relTag += ' external';
				}
				reviewerLink = '<a class="rc-reviewer" rel="' + relTag + '" href="' + item.reviewerUrl + '">' + '  '+  item.reviewerName + '</a>';
			} else {
				reviewerLink = '<span class="rc-reviewer">' + '  '+ item.reviewerName + '</span>';
			}
			var postLink = '<a class="rc-post" rel="nofollow" href="' + item.postUrl + '#comment-' + item.id + '">' + item.postTitle + '</a>';
			itemInfo.innerHTML = this.param.infoTemp.replace(/%REVIEWER%/g, reviewerLink).replace(/%POST%/g, postLink);

		} else {
			var reviewerLink = '<a class="rc-reviewer" rel="nofollow" href="' + item.postUrl + '#comment-' + item.id + '" title="' + item.postTitle + '">' + '  ' + item.reviewerName + '</a>';
			itemInfo.innerHTML = reviewerLink;
		}

		if(item.timestamp && item.timestamp.length > 0) {
			var timestamp = document.createElement('span');
			timestamp.className = 'rc-timestamp';
			timestamp.innerHTML = item.timestamp;
			itemInfo.appendChild(timestamp);
		}

		
		if(item.ellipsis) {
			itemExcerpt.innerHTML = item.excerpt;
			
			var ellipsis = document.createElement('span');
			ellipsis.className = this.config.ellipsisClass;
			ellipsis.innerHTML = '...'+ "" + reviewerLink;
			itemExcerpt.appendChild(ellipsis);
		}
		else
		{
			itemExcerpt.innerHTML = item.excerpt+"" + reviewerLink;
		}
		
		

		if(item.avatarImage) {
			var avatar = document.createElement('img');
			avatar.className = 'rc-avatar rc-' + this.param.avatarPosition;
			avatar.width = this.param.avatarSize;
			avatar.height = this.param.avatarSize;
			avatar.alt = '';
			avatar.src = item.avatarImage;
			itemNode.insertBefore(avatar, itemInfo);
		}

		return itemNode;
	},

	_buildPing: function(item) {
		var itemNode = this.context.pingTemp.cloneNode(true);
		var itemLabel = this._getElementsByClassName(this.config.labelClass, 'span', itemNode)[0];

		itemNode.removeAttribute('id');

		var relTag = 'nofollow';
		if(this.param.external && item.reviewerUrl.indexOf(this.param.serverUrl) !== 0) {
			relTag += ' external';
		}

		var pingLink = document.createElement('a');
		pingLink.rel = relTag;
		pingLink.href = item.reviewerUrl;
		pingLink.title = item.postTitle;
		pingLink.innerHTML = item.reviewerName;
		itemNode.appendChild(pingLink);

		itemLabel.innerHTML = item.type + ': ';

		return itemNode;
	},

	_initLinks: function() {
		var list = this.context.list;
		if (!list.getElementsByTagName) {
			return;
		}

		var links = list.getElementsByTagName('a');
		for(var i=0; i<links.length; i++) {
			var link = links[i];
			if(link.href && /external/i.test(link.rel)) {
				this._addListener(link, 'click', this._bindPopup, {link:link});
			}
		}
	},

	_bindPopup: function(ev, args) {
		window.open(args.link.href);

		if(ev.preventDefault) {
			ev.preventDefault();
		} else {
			ev.returnValue = false;
		}
	},

	_enterCommnet: function(ev, args) {
		var _self = args._self;
		var item = args.item;

		var itemExcerpt = _self._getElementsByClassName(_self.config.excerptClass, 'div', item)[0];
		var itemToggles = _self._getElementsByClassName(_self.config.toggleClass, 'a', item);

		if(itemToggles.length == 1) {
			_self._show(itemToggles[0]);
		} else {
			var itemToggle = document.createElement('a');
			itemToggle.rel = 'nofollow';
			itemToggle.className = _self.config.toggleClass + ' ' + _self.config.collapseClass;
			_self._addListener(itemToggle, 'click', _self._toggleComment, {_self:_self, item:item, source:itemToggle});
			itemExcerpt.parentNode.insertBefore(itemToggle, itemExcerpt);
		}
	},

	_leaveCommnet: function(ev, args) {
		var _self = args._self;
		var item = args.item;

		var itemToggles = _self._getElementsByClassName(_self.config.toggleClass, 'a', item);
		if(itemToggles.length == 1) {
			_self._hide(itemToggles[0]);
		}
	},

	_toggleComment: function(ev, args) {
		var _self = args._self;
		var item = args.item;
		var source = args.source;

		var itemContents = _self._getElementsByClassName(_self.config.contentClass, 'div', item);
		var itemExcerpt = _self._getElementsByClassName(_self.config.excerptClass, 'div', item)[0];

		if(itemContents.length == 1 && source.className.indexOf(_self.config.collapseClass) > 0) {
			_self._hide(itemExcerpt);
			_self._show(itemContents[0]);
			source.className = _self.config.toggleClass + ' ' + _self.config.expandClass;

		} else if(itemContents.length == 1) {
			_self._hide(itemContents[0]);
			_self._show(itemExcerpt);
			source.className = _self.config.toggleClass + ' ' + _self.config.collapseClass;

		} else {
			var node = document.createElement('div');
			node.className = _self.config.contentClass;
			_self._hide(node);
			itemExcerpt.parentNode.appendChild(node);

			var url = _self.param.serverUrl;
			url += '?action=rc-content';
			url += '&id=' + item.id.replace(_self.config.itemIdPrefix, '');
			url += '&_=' + Date.parse(new Date());

			_self._ajax('GET', url, {
				success: function(data) {
					if(data.length <= 0) {
						data = itemExcerpt.innerHTML;
					}
					node.innerHTML = data;
					_self._hide(itemExcerpt);
					_self._show(node);
					source.className = _self.config.toggleClass + ' ' + _self.config.expandClass;
				}
			});
		}
	},

	_loading: function() {
		var navis = this._getElementsByClassName(this.config.naviClass, 'li', this.context.list);
		if(navis.length == 1) {
			navis[0].innerHTML = '<span class="' + this.config.loadingClass + '">' + this.param.loadingText + '...<span>';
		}
	},

	_changeCursor: function(status) {
		this.context.list.style.cursor = status;
	},

	_hide: function(element) {
		element.style.display = 'none';
	},

	_show: function(element) {
		element.style.display = '';
	},

	_getElementsByClassName: function(className, tag, parent) {
		var allTags = (tag == '*' && parent.all) ? parent.all : parent.getElementsByTagName(tag);
		var matchingElements = [];

		className = className.replace(/\-/g, '\\-');
		var regex = new RegExp('(^|\\s)' + className + '(\\s|$)');

		var element;
		for (var i = 0; i < allTags.length; i++) {
			element = allTags[i];
			if (regex.test(element.className)) {
				matchingElements.push(element);
			}
		}

		return matchingElements;
	},

	_getXmlHttpObject: function() {
		try {
			xmlHttp = new XMLHttpRequest();
		} catch(e) {
			try {
				xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
			} catch(e) {
				xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
			}
		}

		return xmlHttp;
	},

	_ajax: function(type, url, actions) {
		var _self = this;
		var xmlHttp = _self._getXmlHttpObject();

		xmlHttp.onreadystatechange = function(ev){_self._callback(xmlHttp, actions);};
		xmlHttp.open(type, url, true);
		xmlHttp.setRequestHeader('Content-type', 'charset=UTF-8');
		xmlHttp.send(null);
	},

	_callback: function(xmlHttp, actions) {
		if (actions.beforeSend && xmlHttp.readyState == 1) {
			actions.beforeSend();
		}
		if (actions.success && (xmlHttp.readyState == 4 || xmlHttp.readyState == 'complete')) {
			actions.success(xmlHttp.responseText);
		}
	},

	_addListener: function(node, type, listener, obj) {
		var param = obj || {};

		if(node.addEventListener) {
			node.addEventListener(type, function(ev){listener(ev, param);}, false);
			return true;
		} else if(node.attachEvent) {
			node['e' + type + listener] = listener;
			node[type + listener] = function() {
				node['e' + type + listener](window.event, param);
			};
			node.attachEvent('on' + type, node[type + listener]);
			return true;
		}
		return false;
	}

};

if (document.addEventListener) {
	document.addEventListener("DOMContentLoaded", function(){(new RecentComments()).init();}, false);

} else if (/MSIE/i.test(navigator.userAgent)) {
	document.write('<script id="__ie_onload_for_wp_recentcomments" defer src="javascript:void(0)"></script>');
	var script = document.getElementById('__ie_onload_for_wp_recentcomments');
	script.onreadystatechange = function() {
		if (this.readyState == 'complete') {
			(new RecentComments()).init();
		}
	};

} else if (/WebKit/i.test(navigator.userAgent)) {
	var _timer = setInterval( function() {
		if (/loaded|complete/.test(document.readyState)) {
			clearInterval(_timer);
			(new RecentComments()).init();
		}
	}, 10);

} else {
	window.onload = function(e) {
		(new RecentComments()).init();
	};
}