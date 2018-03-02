function pr_getdt1(hfurl, ch, resv, sc){var  d=document,r=d.referrer,suid='-',c=new Date().getUTCMilliseconds(),m=d.cookie.match(/suid=([^;]*)(;|$)/);
if(m)suid=m[1];else{d.cookie="suid="+(Math.round(Math.random()*2147483647)*c)%10000000000+";path=/; domain=soso.com;expires=Sun, 18 Jan 2038 00:00:00 GMT;";
	m=d.cookie.match(/suid=([^;]*)(;|$)/);if(m)suid=m[1];}sc=sc||"";var timg = new Image(1,1);
	timg.src="http://pr.soso.com/pingd?srctype=getsret&ourl="+escape(hfurl)+"&lurl="+escape(d.location)+"&suid="+suid+"&ch="+ch+"&sort="+resv+"&sc="+sc+"&rand="+Math.random();}
function pr_get(hfurl, ch, resv, sc){if(  (0 == hfurl.length)  || (0==ch.length))return;pr_getdt1(hfurl, ch, resv,sc); return;}