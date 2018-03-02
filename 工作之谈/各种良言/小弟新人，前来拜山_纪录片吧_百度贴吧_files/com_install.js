//调起3.0或2.0客户端播放流程，不支持1.0
var $$ = function(value){
    if(document.getElementById(value)){
        return document.getElementById(value);
    }else{
        return false;
    }
}
var bdplayer={
    'url': BdParam['url'],
    'title': BdParam['title'],
    'installed':false,
    'VerUp':false,
    'timeid':false,
    'timely':true,
    'xbdyyVer':false,
    'subVer':false,
    'playFrom':0,
    'IsInstall' : function() {
        var browser = navigator.appName;
        if(browser == "Microsoft Internet Explorer"){
            this.Msie();
        }else if(browser == "Netscape" || browser == "Opera"){
            this.Navigate();
        }
        if(this.installed && !this.Vercheck()){//有xbdyy但版本为1.0
            this.installed=false;
        }

        if(this.timely){
            if(!this.installed){
                this.timely=false;
                this.timeid= window.setInterval("bdplayer.Timecheck()",1000*2);
            }
        }
        if(this.installed){
            this.ClientPlugin();
        }
        return this.installed;
        
    },
    'Msie': function() {
        if(navigator.platform =='Win32'){
            try{
                $$('Bdobj').innerHTML='<object classid="clsid:02E2D748-67F8-48B4-8AB4-0A085374BB99" width="0" height="0" id="BaiduPlayer" name="BaiduPlayer"  style="display:none"></object>';
                this.xbdyyVer=$$('BaiduPlayer').GetVersion();
                this.installed=true;
            }catch(e){
                return false;
            }
        }else{
            return false;
        }
    },
    'Navigate': function() {
        window.navigator.plugins.refresh(false);
        if (navigator.plugins) {
            for (var i=0;i<navigator.plugins.length;i++) {
                if(navigator.plugins[i].name == 'BaiduPlayer Browser Plugin'){
                   try{
                     if($$('Bdobj').innerHTML==''){
                       $$('Bdobj').innerHTML='<object id="BaiduPlayer" name="BaiduPlayer" type="application/player-activex" width="0" height="0" progid="Xbdyy.PlayCtrl.1"></object>';
                     }
                    this.xbdyyVer=$$('BaiduPlayer').GetVersion();
                    this.installed=true;break;
                   }catch(e){}
                }
            }
        }
        if(this.installed){
            return true;
        }else{
            return false;
        }
    },
    'Vercheck':function(){
        var ua = navigator.userAgent.toLowerCase();
        var compVer='3.1.0.176';
        if(ua.match(/biduplayerbrowser\/([\d.]+)/)){ //影音浏览器内
            this.subVer=2;
            return true;
        }
        var tempsp=this.xbdyyVer.split('.');
        var tempVer=tempsp[0];
        ua = this.getUa();
        try{
            var uainfo=ua.match(/biduplayer\/([\d.]+)/);
            if(uainfo){ //3.0内 ua获取
                if(tempVer==2 && uainfo[1]){//后安2.0时
                    this.xbdyyVer=uainfo[1];
                }
                if(this.VersionCompare(this.xbdyyVer,compVer)>0){
                    this.subVer=3;
                    return true;
                }else{
                    this.VerUp=true;
                    return false;
                }
            }
        }catch(e){}

        if(!this.subVer){  //第三方或3.0低版本
            if (navigator.appName=="Microsoft Internet Explorer") {
                //if(!this.VerUp){
                    try{
                        new ActiveXObject("bdbphNew.1");
                        if(this.VersionCompare(this.xbdyyVer,compVer)>0){
                            this.subVer=3;
                            return true;
                        }
                    }catch (e){}
               // }
                if(tempVer>=3 && this.VersionCompare(this.xbdyyVer,compVer)<0){
                    this.VerUp=true;
                    return false;
                }
                if(!this.VerUp){//3.0内部低版本 不再检测2.0
                    try{
                        new ActiveXObject("bdbph.1");
                        this.subVer=2;
                        return true;
                    }catch(e){}
                }
            }else if(navigator.appName == "Netscape" || navigator.appName == "Opera"){
                window.navigator.plugins.refresh(false);
                if(!this.VerUp){
                    this.subVer=tempVer;
                    if(this.subVer>=3){
                        if(this.VersionCompare(this.xbdyyVer,compVer)>0){
                            return true;
                        }else{//3.0低版本不再调起2.0
                            this.VerUp=true;
                            return false;
                        }

                    }
                    if(this.subVer==2){
                        return true;
                    }
                }
                for (var i=0;i<navigator.plugins.length;i++) {//2.0
                    if(navigator.plugins[i].name == 'BaiduPlayer BrowserSetup Plugin'){
                        this.subVer=2;
                        return true;
                        break;
                    }
                }
            }
            //xbdyy3.0,但低版本
            try{
                if(tempVer==1 || (tempVer>=3 && this.VersionCompare(this.xbdyyVer,compVer)<0)){
                    this.VerUp=true;
                    return false;
                }
            }catch(e){}

        }
        return false;
    },
    'Timecheck':function(){
        this.IsInstall();
        if(this.installed){
            window.clearInterval(this.timeid);
            if(this.url!=''){
                this.ClientPlay(this.url,this.title);
            }
            window.location.reload();
        }
    },
    'ClientPlugin':function(){//插件初始化
        var classid=false;
        var progid=false;
        if(this.subVer==2){
            classid='3A0283D9-34FE-45CE-8E1A-CA665D4D43EC';
            progid ='bdbph.1';
        }else{
            classid='E1819698-0CD0-435C-AE0D-F288924C40A1';
            progid ='bdbphNew.1';
        }
        try{
            var browser = navigator.appName;
            if(browser == "Microsoft Internet Explorer"){
                $$('callbdplay').innerHTML='<object id="bdbph" classid="clsid:'+classid+'" width="0" height="0"/>';
            }else if(browser == "Netscape" || browser == "Opera"){
                $$('callbdplay').innerHTML='<object id="bdbph" type="application/player-activex" progid="'+progid+'" width="0" height="0" />';
            }
        }catch(e){}

    },
    'ClientPlay':function(url,title){//调起客户端播放
        if(!title){
            var fileTitle = url.split("|");//补充title
            if(fileTitle[2]){
                title=fileTitle[2];
            }
        }
        try{
            if(BdParam['from']){
                this.playFrom=BdParam['from'];
            }
        }catch(e){}
        try{
            var iplay = 'iplay://{"url":"'+url+'","playInfo":{"url":"'+url+'","title":"'+title+'","urlType":2,"encoded":1},"queryPlayInfo":0,"from":'+this.playFrom+'}';
            if(url.substr(0,7)=='http://'){
                iplay='iplay://{"url":"'+encodeURI(url)+'","title":"'+title+'","img":"","from":'+this.playFrom+'}'
            }
            $$('bdbph').call("p0", iplay);
        }catch(e){}

    },
    'getUa':function(){
        var ua = navigator.userAgent.toLowerCase();
        if(navigator.appName== "Microsoft Internet Explorer" && (!ua.match(/biduplayer\/([\d.]+)/))){//ie6  ua获取异常
            try{
                ua=bdplayerUa;
            }catch(e){}
        }
        return ua;
    },
    'VersionCompare':function(v1, v2){
        var v1_split=v1.split(".");
        var v2_split=v2.split(".");

        if(parseInt(v1_split[0])>parseInt(v2_split[0])) return 1;
        else if(parseInt(v1_split[0])<parseInt(v2_split[0])) return -1;

        if(parseInt(v1_split[1])>parseInt(v2_split[1])) return 1;
        else if(parseInt(v1_split[1])<parseInt(v2_split[1])) return -1;

        if(parseInt(v1_split[2])>parseInt(v2_split[2])) return 1;
        else if(parseInt(v1_split[2])<parseInt(v2_split[2])) return -1;

        if(parseInt(v1_split[3])>parseInt(v2_split[3])) return 1;
        else if(parseInt(v1_split[3])<parseInt(v2_split[3])) return -1;

        return 0;
}

};
try{
    if(PageData){//tieba
    }
}catch(e){
    document.write('<div id="Bdobj" style="width: 0px;height: 0px;"></div><div id="callbdplay" style="width: 0px;height: 0px;"></div>');
}
