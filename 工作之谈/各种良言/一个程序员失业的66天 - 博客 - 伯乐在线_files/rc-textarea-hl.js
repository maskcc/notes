/*
These scripts was originally created by Sig.(CC BY 2.1)
http://archiva.jp/web/javascript/getRange_in_textarea.html

Modified by redcoker
Last modified: 2011/11/23
License: GPL v2
*/

function getAreaRange(obj) {
	var pos = new Object();
	
	if (isIE) {
		obj.focus();
		var range = document.selection.createRange();
		var clone = range.duplicate();
		
		clone.moveToElementText(obj);
		clone.setEndPoint( 'EndToEnd', range );

		pos.start = clone.text.length - range.text.length;
		pos.end   = clone.text.length - range.text.length + range.text.length;
  	}

	else if(window.getSelection()) {
		pos.start = obj.selectionStart;
		pos.end   = obj.selectionEnd;
	}

	return pos;
//	alert(pos.start + "," + pos.end);
}
var isIE = (navigator.appName.toLowerCase().indexOf('internet explorer')+1?1:0);
function surroundHTML(lang, obj, gut, fsl, tag, enc) {
	var target = document.getElementById(obj);
	var pos = getAreaRange(target);

	var val = target.value;
	var range = val.slice(pos.start, pos.end);
	if (tag == 'pre' && enc == '0') {
		range = range.replace(/<\/pre>/g,'<!--[/pre]-->');
	}
	if (enc == '1') {
		range = range.replace(/&/g,'&amp;');
		range = range.replace(/</g,'&lt;').replace(/>/g,'&gt;');
		range = range.replace(/"/g,'&quot;').replace(/'/g,'&#039;');
	}
    	var beforeNode = val.slice(0, pos.start);
    	var afterNode  = val.slice(pos.end);
	var insertNode;
	if (tag == 'shorcode') {
		if (range || pos.start != pos.end) {
			insertNode = '[sourcecode language="' + lang + '" gutter="' + gut + '" firstline="' + fsl + '" highlight="" htmlscript="false"]' + range + '[/sourcecode]';
			target.value = beforeNode + insertNode + afterNode;
		} else if (pos.start == pos.end) {
			insertNode = '[sourcecode language="' + lang + '" gutter="' + gut + '" firstline="' + fsl + '" highlight="" htmlscript="false"]' + '[/sourcecode]';
			target.value = beforeNode + insertNode + afterNode;
		}
	} else if (tag == 'pre') {
		if (range || pos.start != pos.end) {
			insertNode = '<pre class="brush: ' + lang + '; gutter: ' + gut + '; first-line: ' + fsl + '; highlight: []; html-script: false">' + range + '</pre>';
			target.value = beforeNode + insertNode + afterNode;
		} else if (pos.start == pos.end) {
			insertNode = '<pre class="brush: ' + lang + '; gutter: ' + gut + '; first-line: ' + fsl + '; highlight: []; html-script: false">' + '</pre>';
			target.value = beforeNode + insertNode + afterNode;
		}
	}
}
