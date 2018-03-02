// JavaScript Document
function readCookie(name){
  var cookieValue = "";
  var search_s = name + "=";
  if(document.cookie.length > 0)
  {
    offset = document.cookie.indexOf(search_s);
    if (offset != -1)
    {
      offset += search_s.length;
      end = document.cookie.indexOf(";", offset);
      if (end == -1) end = document.cookie.length;
      cookieValue = decodeURI(document.cookie.substring(offset, end))
    }
  }
  return cookieValue;
}
function setCookie(name, value){
	var argv = setCookie.arguments;
	var argc = setCookie.arguments.length;
	var expDay = (argc > 0) ? argv[2] : 30;
	try{
		expDay=parseInt(expDay);
		if(expDay<0)expDay=0;
	}catch(e){
		expDay=30;
	}
	var expDate = new Date();
	// The expDate is the date when the cookie should expire, we will keep it for a month
	expDate.setTime( expDate.getTime() + (expDay * 24 * 60 * 60 * 1000) ); 
	setCookieVal( name, value, expDate,'/','.fengniao.com'); 	
}
function setCookieVal(name, value){
	var argv = setCookieVal.arguments;
	var argc = setCookieVal.arguments.length;
	var expires = (argc > 2) ? argv[2] : null;
	var path = (argc > 3) ? argv[3] : null;
	var domain = (argc > 4) ? argv[4] : null;
	var secure = (argc > 5) ? argv[5] : false;
	document.cookie = name + "=" + escape (value) +
	((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
	((path == null) ? "" : ("; path=" + path)) +
	((domain == null) ? "" : ("; domain=" + domain)) +
	((secure == true) ? "; secure" : "");
}
