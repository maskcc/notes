function cf(flashsrc,flashwidth,flashheight,flashlink,br){
	document.write("<table width="+flashwidth+" height="+flashheight+" border=0 cellpadding=0 cellspacing=0><tr><td>");
	document.write("<div style=\"position:relative\">");
	document.write("<embed style=\"position:absolute;z-index:0\" src="+flashsrc+" quality=\"high\" width="+flashwidth+" height="+flashheight+" TYPE=\"application/x-shockwave-flash\" PLUGINSPAGE=\"http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash\" wmode=\"opaque\"></embed>");
	document.write("<div style=\"background:white;filter:alpha(opacity=0);opacity:0;position: relative;z-index:10;left:0pt;top:0pt;width:"+flashwidth+";height:"+flashheight+"px;\">");
	document.write("<a href="+flashlink+" target=\"_blank\" style=\"cursor:pointer;display:block;width:"+flashwidth+";height:"+flashheight+"px;\"></a>");
	document.write("</div>");
	document.write("</div>");
	document.write("</td></tr></table>");
	if (br=="1") {
	document.write("<br>");
	}
}

function cf1(flashsrc,flashwidth,flashheight,br,flashvar){
	document.write("<embed src=\""+flashsrc+"\""+((typeof flashvar == "string")?(" flashvars=\""+flashvar+"\""):"")+" quality=high pluginspage=\"http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash\" type=\"application/x-shockwave-flash\" width="+flashwidth+" height="+flashheight+" align=center wmode=\"opaque\"></embed>");
	if (br=="1") {
	document.write("<br> <br>");
	}
}
