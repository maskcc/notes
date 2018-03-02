function ol(){
	
	try{
		var len=document.all.ol_stat.length;
	}catch(e){
		return false;
	}
	
	var ad_key_list='';
	for(i=0;i<len;i++){
		if(i>0) ad_key_list+='|';
		ad_key_list+=document.all.ol_stat[i].title+'';
	}
	
	if(isNaN(len)){
		try{
			ad_key_list=document.all.ol_stat.title;
		}catch(e){}
	}
	
	var now = new Date().getTime();
	var datestr=escape(now*1000+Math.round(Math.random()*1000));
	s_url='http://stat.fengniao.com/ol_fn.php?ad_key_list='+ad_key_list+'&t='+datestr;
	document.write('<scr'+'ipt src="'+s_url+'"></scr'+'ipt>');
}
//ol();

if (document.location.href != 'http://www.fengniao.com/' && -1 === document.location.href.indexOf('eosfans.fengniao.com')) {
    //document.write('<script type="text/javascript" src="http://stat.fengniao.com/cgrs/sub_sub/tag_vpv.php?'+Math.random()+'"></scr'+'ipt>');
    //document.write('<script type="text/javascript" src="http://stat.fengniao.com/cgrs/sub_sub/bms_tag.php?'+Math.random()+'"></scr'+'ipt>');
    //document.write('<script type="text/javascript" src="http://stat.fengniao.com/cgrs/sub_sub/bms_tag_direct.php?'+Math.random()+'"></scr'+'ipt>');
    
    //new
    document.write('<sc'+'ript type="text/javascript" id="adstat_js" src="http://stat.fengniao.com/adrs/ol.js"></scr'+'ipt>');
}
//log real click
document.write('<img id="log_click_link" width="0" height="0" style="display:none;" />');
function log_click(barid) {
    var url = 'http://stat.fengniao.com/cgrs/log_real_click.php?from=sub&barid='+barid+'&r='+Math.random();
    try{
        document.getElementById('log_click_link').src = url;
    }catch(e){}
}