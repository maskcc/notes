Zhishi.OpenApi=(function(){var REASON={REASON_UNSPECIFIED:0,REASON_SYSTEM_IN_MAINTENANCE:-1,REASON_USER_NOT_LOGGEDIN:-2,REASON_NO_TITLE:-3,REASON_ASK_NUMBER_THRESHOLD:-4,REASON_USER_NO_AUTHORITY:-5,REASON_USER_EXPERIENCE_DEFICIT:-6,REASON_FREQUENT_SUBMISSION:-7,REASON_DUPLICATED_SUBMISSION:-8,REASON_SIMILAR_TITLE:-9,REASON_USER_SCORE_DEFICIT:-10,REASON_ILLEGAL_TITLE:-11,REASON_ILLEGAL_CONTENT:-12,REASON_FREE_ASK_NUMBER_THRESHOLD:-13,REASON_USER_NOT_EXIST:-14,P2POR_REFUSE_QUESTION:-15,REASON_USE_TOO_FREQUENT:-16,REASON_QUESTION_NOT_EXIST:-100,REASON_ANSWERED_ALREADY:-101,REASON_SELF_QUESTION_AND_ANSWER:-102,REASON_ANSWER_IN_AUDIT:-103,REASON_QUESTION_DELETED:-104,REASON_QUESTION_NOT_PENDING:-105,REASON_ILLEGAL_USER_NAME:-106,REASON_NO_CONTENT:-107,REASON_MEANINGLESS_ANSWER:-108,REASON_SIMILAR_CONTENT:-109,REASON_CONTENT_TOO_LONG:-110,REASON_ANSWER_NOT_EXIST:-111,REASON_ANSWERSUPPLEMENT_NUM_EXCEED:-112,REASON_ANSWER_VERIFYCODE_NO_MATCH:-113,REASON_ANSWERSUPPLEMENT_VERIFYCODE_NO_MATCH:-114,REASON_QUESTION_NOT_SOLVED:-115,REASON_COMMENT_ILLEGAL_ID:-116,REASON_VERCOE_ERROR:-117,REASON_OVER_MAX_ANSWER_NUM:-118,REASON_PARAMETER_ERROR:-119,REASON_OVER_MAX_ASK_SUPPLEMENT_NUM:-120,REASON_SYSTEM_ERROR:-121,REASON_MASKQID_NOT_EXIST:-122,REASON_NOT_AUDIT:-123,REASON_AUDIT_FAILED:-124,REASON_QUESTIONID_NOT_EXIST:-125,REASON_TEAM_ANSWER_IN_AUDIT:-126,REASON_TEAM_ANSWER_EXIST:-127,REASON_NOT_SELF_QUESTION:-128,REASON_QUESTION_CANNOT_ANSWER:-129,REASON_AUDIT_MODIFY_EXPIRE:-130,REASON_CONTENT_NOTEDIT:-131,REASON_ILLEGAL_REASONINPUT:-132};
var answerurl="/z/api/answer/submit2?format=json";
var answersupplementurl="/z/api/answer/supplement?format=json";
var askurl="/z/api/ask/submit?format=json";
var questionsupplementurl="/z/api/question/supplement?format=json";
var questionCloseUrl="/z/api/question/close?format=json";
var answerevaluateurl="/z/api/answer/evaluate?format=json";
var answerpkurl="/z/api/answer/answerpk?format=json";
var answereliteurl="/z/api/answer/answerelite?format=json";
var answercommenturl="/z/api/answer/comment?format=json";
var answerRequest={questionid:0,content:"",anonymous:false,userid:"0",username:"",pic:"",teamid:"0",teamcooperate:false,teamcooperatetype:0,editorstats:"0",touserid:"0",replyid:0,orig:0,origParam:0,source:0,from:"",param:"",verifycode:"",verifysession:"",origtmpid:0,origtablename:"",feedback:"",url:"",reasonoption:0,reasoninput:"",tipsQuestion:false,sourceType:0,topicId:0,topicName:"",origmd5:"",quanziId:0};
var answerSupplementRequest={questionid:0,replyid:0,content:"",anonymous:false,userid:"0",username:"",pic:"",teamid:"0",teamcooperatetype:"0",cooperatereplyid:0,editorstats:"",touserid:"0",orig:0,origParam:0,source:0,from:"",param:"",verifycode:"",verifysession:"",origtmpid:0,origtablename:"",feedback:"",url:""};
var askRequest={title:"",content:"",needautocategory:false,categoryid:0,offeredscore:0,broadcast:false,anonymous:false,pic:"",p2puserids:"",agreenofree:false,synctwitter:false,userid:"",username:"",orig:0,origParam:0,source:0,modify:false,origtmpid:0,origtablename:"",contentsupplement:"",vcode:""};
var questionSupplementRequest={questionid:0,content:"",offeredscore:0,broadcast:false,anonymous:false,pic:"",orig:0,origParam:0,source:0,origtmpid:0,origtablename:""};
var evaluateRequest={questionId:0,answerId:0,answerMsg:"",bestAnswerStarLevel:0,answerGift:0,originalType:0,solvedType:0,authorRate:0,authorAttitude:0};
var commentRequest={questionId:0,answerId:0,content:"",orig:0,atReplyId:0,atUserId:""};
var _callback=function(){};
var startTime=0;
function nomalizeText(text){text=text.replace(/\\/g,"\\\\");
text=text.replace(/\"/g,'\\"');
text=text.replace(/\r/g,"\\r");
text=text.replace(/\n/g,"\\n");
text=text.replace(/[^\u0000-\u00FF]/g,function($0){return escape($0).replace(/(%u)(\w{4})/gi,"\\u$2")
});
return text
}function jsonify(value,attrs){var buf="{";
for(var p in attrs){if(value[p]!=attrs[p]){switch(typeof value[p]){case"string":buf+=p+':"'+nomalizeText(value[p])+'",';
break;
case"number":case"boolean":buf+=p+":"+value[p]+",";
break
}}}return buf.slice(0,-1)+"}"
}function asyncCallback(json,o){if(_callback){setTimeout(function(){_callback(json,o)
},100)
}}function postCallBack(r,o){var json=eval("("+r+")");
asyncCallback(json,o)
}function setUserTime(a){if(startTime==0){return
}var t=new Date();
var seconds=t.getTime()-startTime.getTime();
if(seconds>0){a.seconds=seconds
}}return Object.extend(REASON,{init:function(){},startTiming:function(){if(startTime==0){startTime=new Date()
}},submitAnswer:function(a,callback,o){var request=jQuery.extend({},answerRequest,a);
_callback=callback;
setUserTime(request);
var postData=jsonify(request,answerRequest);
var postback={onSuccess:postCallBack,para:o,contentType:"application/json; charset=UTF-8",postdata:postData,raw:true};
Zhishi.Ajax.sendRequest("POST",answerurl,postback)
},submitAnswerSupplement:function(a,callback,o){var request=jQuery.extend({},answerSupplementRequest,a);
_callback=callback;
setUserTime(request);
var postData=jsonify(request,answerSupplementRequest);
var postback={onSuccess:postCallBack,para:o,contentType:"application/json; charset=UTF-8",postdata:postData,raw:true};
Zhishi.Ajax.sendRequest("POST",answersupplementurl,postback)
},submitAsk:function(a,callback,o){var request=jQuery.extend({},askRequest,a);
_callback=callback;
setUserTime(request);
var postData=jsonify(request,askRequest);
var postback={onSuccess:postCallBack,para:o,contentType:"application/json; charset=UTF-8",postdata:postData,raw:true};
Zhishi.Ajax.sendRequest("POST",askurl,postback)
},submitQuestionSupplement:function(a,callback,o){var request=jQuery.extend({},questionSupplementRequest,a);
_callback=callback;
setUserTime(request);
var postData=jsonify(request,questionSupplementRequest);
var postback={onSuccess:postCallBack,para:o,contentType:"application/json; charset=UTF-8",postdata:postData,raw:true};
Zhishi.Ajax.sendRequest("POST",questionsupplementurl,postback)
},submitQuestionClose:function(qid,callback,o){_callback=callback;
if(!qid||qid<=0){asyncCallback({success:false,reason:REASON.REASON_QUESTION_NOT_EXIST,message:"\u95ee\u9898ID\u65e0\u6548"},o);
return false
}var url=questionCloseUrl+"&qid="+qid;
var postback={onSuccess:postCallBack,para:o,contentType:"application/json; charset=UTF-8",raw:true};
Zhishi.Ajax.sendRequest("GET",url,postback)
},submitAnswerEvaluated:function(a,callback,o){var request=jQuery.extend({},evaluateRequest,a);
_callback=callback;
var postData=jsonify(request,evaluateRequest);
var postback={onSuccess:postCallBack,para:o,contentType:"application/json; charset=UTF-8",postdata:postData,raw:true};
Zhishi.Ajax.sendRequest("POST",answerevaluateurl,postback)
},submitAnswerPK:function(a,callback,o){var request=jQuery.extend({},answerRequest,a);
_callback=callback;
setUserTime(request);
var postData=jsonify(request,answerRequest);
var postback={onSuccess:postCallBack,para:o,contentType:"application/json; charset=UTF-8",postdata:postData,raw:true};
Zhishi.Ajax.sendRequest("POST",answerpkurl,postback)
},submitAnswerElite:function(a,callback,o){var request=jQuery.extend({},answerRequest,a);
_callback=callback;
setUserTime(request);
var postData=jsonify(request,answerRequest);
var postback={onSuccess:postCallBack,para:o,contentType:"application/json; charset=UTF-8",postdata:postData,raw:true};
Zhishi.Ajax.sendRequest("POST",answereliteurl,postback)
},submitAnswerComment:function(a,callback,o){var request=jQuery.extend({},commentRequest,a);
_callback=callback;
setUserTime(request);
var postData=jsonify(request,commentRequest);
var postback={onSuccess:postCallBack,para:o,contentType:"application/json; charset=UTF-8",postdata:postData,raw:true};
Zhishi.Ajax.sendRequest("POST",answercommenturl,postback)
},submitQuestionAnonymous:function(qid,callback,o){_callback=callback;
var url="/z/api/question/anonymous?qid="+qid+"&r="+Math.random();
var postback={onSuccess:postCallBack,para:o,contentType:"application/json; charset=UTF-8",timeOut:3000};
Zhishi.Ajax.sendRequest("POST",url,postback)
},submitAnswerAnonymous:function(qid,aid,callback,o){_callback=callback;
var url="/z/api/answer/anonymous?qid="+qid+"&aid="+aid+"&r="+Math.random();
var postback={onSuccess:postCallBack,para:o,contentType:"application/json; charset=UTF-8",timeOut:3000};
Zhishi.Ajax.sendRequest("POST",url,postback)
}})
})();(function(){function c(d,e){return Array.prototype.indexOf?Array.prototype.indexOf.call(d,e):function(){var f=-1;
for(var h=0,g=d.length;
h<g;
h++){if(d[h]==e){f=h;
break
}}return f
}
}function b(d){var e=Element.Methods.getXY(d);
return{x:e[0],y:e[1]}
}function a(k,g){var f,d=[],j=new RegExp("(^|\\s)"+g+"(\\s|$)");
if(k.querySelectorAll){d=k.querySelectorAll("."+g)
}else{f=k.getElementsByTagName("a");
for(var h=0,e=f.length;
h<e;
h++){if(j.test(f[h].className)){d.push(f[h])
}}}return d
}if(typeof Zhishi.Tips=="undefined"){Zhishi.Tips={}
}Zhishi.Tips.init=function(g,e){var f=Zhishi.Tips.init,d;
if(this instanceof f){this.setDefaultConfig.apply(this,arguments)
}else{return new Zhishi.Tips.init(g,e)
}};
Object.extend(Zhishi.Tips.init.prototype,{elem:null,html:"",singleton:true,x:0,y:0,width:0,closeClassName:"",onBefore:function(){},onShow:function(){},reflow:function(){},close:function(){},guid:0,tips:{},singletonElem:null,getAbsolutePos:function(){return b(this.singletonElem)
},getRelativePosition:function(){var h,i,g,e=this.getAbsolutePos(),f=e.x,d=e.y;
if(this.elem){h=b(this.elem);
i=h.x;
g=h.y;
return{x:f-i,y:d-g}
}else{return this.getAbsolutePos()
}},hasElem:function(){return this.singletonElem&&this.singletonElem.nodeType==1
},getElem:function(){return this.singletonElem
},setDefaultConfig:function(e,d){Object.extend(this,e);
if(!d){this.create(e)
}return this
},create:function(k){var j=document.createElement("div"),h,e=this,f=["elem","html","width","position","closeClassName","x","y","reflow","close","singletonElem","getElem","remove","hasElem","setPos","getAbsolutePos","getRelativePosition","addEvent"];
this.elem=document.getElementById(this.elem);
if(k&&typeof k.singleton!="undefined"){Object.extend(this,{singleton:k.singleton})
}if(this.singleton){if(this.hasElem()){this.remove()
}Object.extend(this,k)
}else{h=this.tips[this.guid++]={};
for(var g in this){if(c(f,g)!==-1){if(g=="singletonElem"){h[g]=j
}else{h[g]=this[g]
}}}Object.extend(h,k);
e=h
}j.innerHTML=e.html;
e.singletonElem=j;
document.body.appendChild(j);
e.setPos();
e.addEvent();
return e
},setPos:function(i){var k,d,j,f=this.singletonElem,h=document.getElementById(this.elem)||document.body,g=this.width,e=this.reflow;
if(!f){return
}if(i){d=i.x;
j=i.y
}else{if(h&&h.nodeType==1){k=b(h);
d=k.x;
j=k.y
}d+=this.x;
j+=this.y
}f.style.cssText+=";position:absolute;z-index:9999;top:"+j+"px;left:"+d+"px;width:"+g+"px;";
if(e&&typeof e=="function"){e(this)
}},addEvent:function(){var f=this,e=closeBn=this.singletonElem,d=this.closeClassName;
if(d){closeBn=a(e,d)[0]
}closeBn.onclick=function(g){if(f.close&&typeof f.close=="function"){if(f.close(f,g)==false){return
}f.remove()
}};
closeBn=null
},remove:function(){var e=this.getElem(),d;
if(!e){return
}d=e.parentNode;
if(d){d.removeChild(e)
}else{document.body.removeChild(e)
}this.singletonElem=null
}})
})();var Feed={alertResult:function(f,e,d,a,b,g){var c=null;
if(a&&b){c='<a href="'+b+'" target="_blank">'+a+"</a>"
}Zhishi.Alert.showMessage(f,e,d,c,3000,g)
},alertCollectQuestion:function(data,callback){if(!data){data=""
}var json=eval("("+data+")");
var cnt=null;
if(json.result){cnt='<a href="/z/MyCollectedRecordsNew.htm" target="_blank">\u67e5\u770b\u6211\u7684\u6536\u85cf&gt;&gt;</a>'
}Zhishi.Alert.showMessage(json.result,"\u6536\u85cf",json.message,cnt,3000)
},alertReAskResult:function(c,b,a,d){Zhishi.Alert.showMessage(c,"\u8f6c\u95ee\u7ed9\u597d\u53cb",b,a,3000,d)
},alertZZQzoneResult:function(d,c,e){var a=null;
var b;
if(d){b="\u5df2\u6210\u529f\u8f6c\u8f7d\u5230QQ\u7a7a\u95f4。";
a='<a href="'+c+'" target="_blank">\u8fdb\u5165QQ\u7a7a\u95f4\u67e5\u770b&gt;&gt;</a>'
}else{b="\u95ee\u9898\u8f6c\u8f7d\u5931\u8d25，\u8bf7\u91cd\u65b0\u5c1d\u8bd5"
}Zhishi.Alert.showMessage(d,"\u8f6c\u8f7d\u5230QQ\u7a7a\u95f4",b,a,3000,e)
},alertZZSubjectQzoneResult:function(d,c,e){var a=null;
var b;
if(d){b="\u5df2\u6210\u529f\u8f6c\u8f7d\u5230QQ\u7a7a\u95f4。";
a='<a href="'+c+'" target="_blank">\u8fdb\u5165QQ\u7a7a\u95f4\u67e5\u770b&gt;&gt;</a>'
}else{b="\u4e13\u9898\u8f6c\u8f7d\u5931\u8d25，\u8bf7\u91cd\u65b0\u5c1d\u8bd5"
}Zhishi.Alert.showMessage(d,"\u8f6c\u8f7d\u5230QQ\u7a7a\u95f4",b,a,3000,e)
},alertBookWwDailyResult:function(f,e,d,a,b,g){var c=null;
if(a&&b){c='<a href="'+b+'" target="_blank">'+a+"</a>"
}Zhishi.Alert.showMessage(f,e,d,c,3000,g)
},alertAddFriendResult:function(e,d,a,b,f){var c=null;
if(a&&b){c='<a href="'+b+'" target="_blank">'+a+"</a>"
}else{if(a){c=a
}}Zhishi.Alert.showMessage(e,"\u52a0\u4e3a\u597d\u53cb",d,c,3000,f)
}};var new_bestAnswerHasSelectOne=false;
var new_bestAnswerHasSelectTwo=false;
var currentButton=null;
var zzqqDialog=null;
var checkboxList=new Array();
var buttonList=new Array();
var Link;
var auditTime="1\u5206\u949f";
Zhishi.questionId=0;
function vote(vote_url){Zhishi.Ajax.sendRequest("GET",vote_url+"&r="+Math.random(),{onSuccess:function(data){var rsp=eval(data);
if(rsp[0]==1){alert("\u64cd\u4f5c\u6210\u529f。");
window.location.href=rsp[1]
}else{alert(rsp[1])
}}})
}function addFavourite(a){Zhishi.Ajax.sendRequest("GET",a+"&r="+Math.random(),{onSuccess:function(b){Feed.alertCollectQuestion(b,window.location.reload)
}})
}function addEditorRecommend(a){Zhishi.Ajax.sendRequest("GET",a+"&r="+Math.random(),{onSuccess:function(b){alert(b);
window.location.reload()
}})
}function addEditorPendingRecommend(a){Zhishi.Ajax.sendRequest("GET",a+"&r="+Math.random(),{onSuccess:function(b){alert(b);
window.location.reload()
}})
}function zzQQ(a){zzqqDialog=new Zhishi.Dialog("\u8f6c\u8f7d\u5230QQ\u8d44\u6599\u5361",340,390,true,a);
zzqqDialog.show()
}var setMyDescription_url="";
function updatePersonalDesc(userDesc){var desc=userDesc.value;
if(desc.length>100){alert("\u4e2a\u4eba\u8bf4\u660e\u4e0d\u80fd\u8d85\u8fc7100\u5b57。");
userDesc.select();
return
}Zhishi.Ajax.sendRequest("GET",setMyDescription_url+encodeURIComponent(desc),{onSuccess:function(data){var x=eval(data);
if(x){alert(x[1])
}}})
}function ctrlSetDesc(a,b){if(b.ctrlKey&&(b.keyCode==13)){updatePersonalDesc(a)
}}function impeach_fun(fm){if(fm.desc.value.length>100){alert("\u68c0\u4e3e\u8bf4\u660e\u4e0d\u80fd\u8d85\u8fc7100\u5b57。");
fm.desc.select();
return
}var sURL="/vote?";
var voteValue="";
var vVote=fm.vote;
for(var i=0;
i<fm.vote.length;
i++){if(fm.vote[i].checked){voteValue=fm.vote[i].value
}}if(voteValue==""){alert("\u8bf7\u9009\u62e9\u68c0\u4e3e\u7c7b\u578b。");
return
}sURL+=("vote="+voteValue);
sURL+=("&qid="+fm.qid.value);
sURL+=("&aid="+fm.aid.value);
sURL+=("&uid="+fm.uid.value);
sURL+=("&sid="+fm.sid.value);
sURL+=("&url="+encodeURIComponent(fm.url.value));
sURL+=("&desc="+encodeURIComponent(fm.desc.value));
Zhishi.Ajax.sendRequest("GET",sURL,{onSuccess:function(data){var rsp=eval(data);
if(rsp[0]==1){alert("\u68c0\u4e3e\u6210\u529f，\u6211\u4eec\u4f1a\u5c3d\u5feb\u5904\u7406，\u611f\u8c22\u60a8\u7684\u5173\u6ce8！")
}else{alert(rsp[1])
}}});
window.close()
}function toMicBlog(){Zhishi.Stats.ch("wenwen.zfwb");
var i=encodeURIComponent(filterQuestionTitleAndSub(questionTitleAndSub,questionUrl));
var c=encodeURIComponent(questionUrl);
var b=encodeURIComponent("4f3b9f9a41b743c09b5b474a19b213d9");
var e=encodeURIComponent("http://wenwen.soso.com");
var d=encodeURIComponent(questionPicUrl);
var g="http://v.t.qq.com/share/share.php?title="+i+"&url="+c+"&appkey="+b+"&site="+e+"&pic="+d;
var a=Zhishi.Cookie.getCookie("uin");
if(a&&a.length>3){a=a.substring(1,a.length)
}while(a.charAt(0)=="0"){a=a.substring(1,a.length)
}var h=Zhishi.Cookie.getCookie("skey");
var f="http://ptlogin2.qq.com/jump?clientuin="+a+"&skey="+h+"&u1="+escape(g);
window.open(f,"\u8f6c\u64ad\u5230\u817e\u8baf\u5fae\u535a","width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no")
}function filterQuestionTitleAndSub(b,e){if(b&&e){var d="#\u7cbe\u5f69\u77e5\u8bc6#";
if(isQuestionPending=="true"){d="#\u63d0\u95ee#"
}b=d+b;
var a=e.length;
var c=100-a;
if(b.length>c){b=b.substring(0,c-4);
b+="..."
}}return b
}Zhishi.Validator.AnswerQuestion={clickSubmitButton:false,answerContentRequired:function(){if(Editor.getPlainTextValue().trim()==""&&!Editor.hasImage()){return false
}else{return true
}},verCodeRequired:function(){if(verCode.form.name=="answerQuestion"){if(verCode.value==""||verCode.value==verCodeTipText){return false
}else{return true
}}else{if(document.answerSupplementForm.contentSupplement.checked){if(verCode.value==""||verCode.value==verCodeTipText){return false
}else{return true
}}return true
}},supplementContentRequired:function(){if(document.answerSupplementForm&&document.answerSupplementForm.contentSupplement){if(document.answerSupplementForm.contentSupplement.checked){if(Editor.getPlainTextValue().trim()==""&&!Editor.hasImage()){return false
}else{document.answerSupplementForm.answerSupplementContent.value=Editor.getValue();
document.answerSupplementForm.editorStats.value=Editor.Util.getCountInfo();
document.answerSupplementForm.useTime1.value=Editor.Util.getEditorTime()
}}}return true
},showErrMsg:function(a){setTimeout(function(){var b=get("myAnswerContent_err_msg");
b.innerHTML=a;
b.addClassName("field_err");
b.show()
},100)
},MAX_LEN:10000,nonsenseList:new Array("\u4e0d\u77e5\u9053","rt","\u8def\u8fc7","ding","\u9876","\u6211\u6765\u56de\u7b54...","\u8bf7\u8f93\u5165\u4f60\u7684\u7b54\u6848..."),CONTENT_PATTERN:new RegExp(".*[^ -/:-@[-`{-~\t\r\n。，？！、；：“”‘’·§◎＃％…※—￥《》（）【】『』＋－×÷＝～].*"),validateContent:function(b){var c=Editor.iframe.contentWindow.document.getElementsByTagName("span");
if(b==null||b==""||b.trim().length==0||(c&&c!=null&&c.length==1&&c[0].className=="defaultValue")){Zhishi.Validator.AnswerQuestion.showErrMsg("\u8bf7\u8f93\u5165\u56de\u7b54\u5185\u5bb9\u54e6");
return false
}if(b.length>Zhishi.Validator.AnswerQuestion.MAX_LEN){Zhishi.Validator.AnswerQuestion.showErrMsg("\u8fd9\u91cc\u6700\u591a\u53ea\u80fd\u8f93\u5165"+Zhishi.Validator.AnswerQuestion.MAX_LEN+"\u5b57，\u8bf7\u8c03\u6574\u4e00\u4e0b\u5b57\u6570\u54e6");
return false
}for(var a=0;
a<Zhishi.Validator.AnswerQuestion.nonsenseList.length;
a++){if(b==Zhishi.Validator.AnswerQuestion.nonsenseList[a]){Zhishi.Validator.AnswerQuestion.showErrMsg("\u4f60\u8f93\u5165\u7684\u8bed\u4e49\u4e0d\u591f\u6e05\u6670，\u8bf7\u6b63\u786e\u4f7f\u7528\u5730\u7403\u8bed\u8a00");
return false
}}if(!Zhishi.Validator.AnswerQuestion.CONTENT_PATTERN.test(b)){Zhishi.Validator.AnswerQuestion.showErrMsg("\u4f60\u8f93\u5165\u7684\u8bed\u4e49\u4e0d\u591f\u6e05\u6670，\u8bf7\u6b63\u786e\u4f7f\u7528\u5730\u7403\u8bed\u8a00");
return false
}return true
},beforeSubmit:function(b){if(b&&b.form&&b.form.name!="answerQuestion"){return true
}if(b&&b.id=="myAnswerContent"&&get("verCode")!=null){return true
}var a=Editor.getValue();
if(a){a=a.trim()
}else{a=""
}if(a.length>=4&&a.substr(-4,4)=="<br>"){a=a.slice(0,-4).trim()
}if(!Zhishi.Validator.AnswerQuestion.validateContent(Editor.getPlainTextValue())){return false
}Zhishi.Ajax.sendRequest("GET",Zhishi.loginStateUrl,{onSuccess:function(d){if(d=="1"){Zhishi.Validator.AnswerQuestion.clickSubmitButton=true;
document.answerQuestion.editorStats.value=Editor.Util.getCountInfo();
document.answerQuestion.useTime.value=Editor.Util.getEditorTime();
document.answerQuestion.myAnswerContent.value=a;
Zhishi.Validator.AnswerQuestion.submitAnswer(document.answerQuestion,"myAnswerContent")
}else{if(d=="0"){if(document.answerQuestion.showVerifyCode){document.answerQuestion.showVerifyCode.value="F"
}var e=get("answerSubmit");
var c=Zhishi.Login.loginList.length;
e.setAttribute("wenwenid",c);
e.addClassName("login_norefresh");
Zhishi.Login.loginList[c]=function(){Zhishi.Login.updateLoginStateBar([13,Zhishi.questionId]);
Zhishi.Validator.AnswerQuestion.clickSubmitButton=true;
document.answerQuestion.editorStats.value=Editor.Util.getCountInfo();
document.answerQuestion.useTime.value=Editor.Util.getEditorTime();
document.answerQuestion.myAnswerContent.value=a;
Zhishi.Validator.AnswerQuestion.submitAnswer(document.answerQuestion)
};
Zhishi.Login.openLoginDialog(e);
return true
}}}});
return false
},removeS:function(a){if(!a){return""
}if(typeof a!="string"){return a
}if(a.length>0&&a.charAt(0)=="S"){return a.slice(1)
}return a
},submitAnswer:function(b){var a={};
a.questionid=b.questionId.value;
a.content=b.myAnswerContent.value;
a.myAnswerContentHash=b.myAnswerContentHash.value;
a.origtablename=Zhishi.Validator.AnswerQuestion.removeS(b.origTableName.value);
a.origtmpid=b.origTmpId.value;
a.loginkey=Zhishi.Validator.AnswerQuestion.removeS(b.loginKey.value);
a.replyid=b.origAnswerId.value;
a.useTime=b.useTime.value;
a.editorstats=b.editorStats.value;
a.teamid=b.teamId.value;
if(b.notifyAll&&b.notifyAll.checked){a.teamcooperatetype=1
}if(b.teamCooperate&&b.teamCooperate.checked){a.teamcooperate=true
}if(b.teamCooperateChb&&b.teamCooperateChb.checked){a.teamcooperate=true
}a.param=Zhishi.Validator.AnswerQuestion.removeS(b.param.value);
a.orig=b.orig.value;
if(b.verifyCode){a.verifycode=b.verifyCode.value
}a.referer=Zhishi.Validator.AnswerQuestion.removeS(b.referer.value);
a.anonymous=b.anonymousAnswer.checked;
a.quanziId=b.origQuanId.value;
Zhishi.OpenApi.submitAnswer(a,function(d){if(d.success){var c="/z/AnswerComplete.e?sp="+a.questionid;
window.location.href=c;
return false
}Zhishi.Validator.AnswerQuestion.showErrMsg(d.message);
if(d.reason==Zhishi.OpenApi.REASON_VERCOE_ERROR){getVerifyImage();
b.verifyCode.focus();
b.verifyCode.select()
}if(d.reason==Zhishi.OpenApi.REASON_ANSWERED_ALREADY){setTimeout(function(){window.location.reload()
},500)
}return false
})
}};
Zhishi.Validator.AnswerSupplement=(function(){var d=10000;
var b=new Array("\u4e0d\u77e5\u9053","rt","\u8def\u8fc7","ding","\u9876","\u6211\u6765\u56de\u7b54...","\u8bf7\u8f93\u5165\u4f60\u7684\u7b54\u6848...");
var c=new RegExp(".*[^ -/:-@[-`{-~\t\r\n。，？！、；：“”‘’·§◎＃％…※—￥《》（）【】『』＋－×÷＝～].*");
function a(){if(Editor.getPlainTextValue().trim()==""&&!Editor.hasImage()){return false
}else{return true
}}function h(j){setTimeout(function(){var k=get("answerSupplementContent_err_msg");
if(k){k.innerHTML=j;
k.addClassName("field_err");
k.show()
}},100)
}function i(k){if(k==null||k==""||k.trim().length==0){h("\u8bf7\u8f93\u5165\u56de\u7b54\u5185\u5bb9\u54e6");
return false
}if(k.length>d){h("\u8fd9\u91cc\u6700\u591a\u53ea\u80fd\u8f93\u5165"+d+"\u5b57，\u8bf7\u8c03\u6574\u4e00\u4e0b\u5b57\u6570\u54e6");
return false
}for(var j=0;
j<b.length;
j++){if(k==b[j]){h("\u60a8\u8f93\u5165\u7684\u8bed\u4e49\u4e0d\u591f\u6e05\u6670，\u8bf7\u6b63\u786e\u4f7f\u7528\u5730\u7403\u8bed\u8a00");
return false
}}if(!c.test(k)){h("\u60a8\u8f93\u5165\u7684\u8bed\u4e49\u4e0d\u591f\u6e05\u6670，\u8bf7\u6b63\u786e\u4f7f\u7528\u5730\u7403\u8bed\u8a00");
return false
}return true
}function f(k){var j=Editor.getValue();
if(j){j=j.trim()
}else{j=""
}if(j.length>=4&&j.substr(-4,4)=="<br>"){j=j.slice(0,-4).trim()
}var l=document.answerSupplementForm.contentSupplement;
if(l&&l.checked&&!i(Editor.getPlainTextValue())){return false
}Zhishi.Ajax.sendRequest("GET",Zhishi.loginStateUrl,{onSuccess:function(n){if(n=="1"){document.answerSupplementForm.answerSupplementContent.value=j;
document.answerSupplementForm.editorStats.value=Editor.Util.getCountInfo();
document.answerSupplementForm.useTime1.value=Editor.Util.getEditorTime();
g(document.answerSupplementForm)
}else{if(n=="0"){var o=get("supplementSubmit");
var m=Zhishi.Login.loginList.length;
o.setAttribute("wenwenid",m);
o.addClassName("login_norefresh");
Zhishi.Login.loginList[m]=function(){document.answerSupplementForm.answerSupplementContent.value=j;
document.answerSupplementForm.editorStats.value=Editor.Util.getCountInfo();
document.answerSupplementForm.useTime1.value=Editor.Util.getEditorTime();
g(document.answerSupplementForm)
};
Zhishi.Login.openLoginDialog(o);
return true
}}}});
return false
}function e(j){if(!j){return""
}if(typeof j!="string"){return j
}if(j.length>0&&j.charAt(0)=="S"){return j.slice(1)
}return j
}function g(k){var j={};
j.questionid=k.questionId1.value;
if(k.contentSupplement.checked){j.content=k.answerSupplementContent.value
}j.origtmpid=k.origTmpIdS.value;
j.origtablename=e(k.origTableNameS.value);
j.loginkey=e(k.loginKeyS.value);
j.replyid=k.origAnswerId1.value;
j.useTime=k.useTime.value;
j.editorstats=k.editorStats.value;
j.teamid=k.teamId.value;
j.cooperatereplyid=k.cooperateReplyId.value;
if(k.verCode1){j.verifycode=k.verCode1.value
}var l=document.answerSupplementForm.contentSupplement;
if(k.anonymousSupplement){j.anonymous=k.anonymousSupplement.checked
}Zhishi.OpenApi.submitAnswerSupplement(j,function(n){if(n.success){Zhishi.Stats.ch("2013ww.tw.bchd.ok");
var m="/z/AnswerComplete.e?sp="+j.questionid;
window.location.href=m;
return false
}h(n.message);
return false
})
}return{beforeSubmit:f}
})();
Zhishi.Validator.SupplementQuestion=(function(){var e=10000;
var a=new Array("\u4e0d\u77e5\u9053","rt","\u8def\u8fc7","ding","\u9876","\u6211\u6765\u56de\u7b54...","\u8bf7\u8f93\u5165\u4f60\u7684\u7b54\u6848...");
var c=new RegExp(".*[^ -/:-@[-`{-~\t\r\n。，？！、；：“”‘’·§◎＃％…※—￥《》（）【】『』＋－×÷＝～].*");
function h(k){setTimeout(function(){var l=get("mySupplementContent_err_msg");
if(l){l.innerHTML=k;
l.addClassName("field_err");
l.show()
}},100)
}function i(l){if(l==null||l==""||l.trim().length==0){h("\u8bf7\u8f93\u5165\u95ee\u9898\u5185\u5bb9\u54e6");
return false
}if(l.length>e){h("\u8fd9\u91cc\u6700\u591a\u53ea\u80fd\u8f93\u5165"+e+"\u5b57，\u8bf7\u8c03\u6574\u4e00\u4e0b\u5b57\u6570\u54e6");
return false
}for(var k=0;
k<a.length;
k++){if(l==a[k]){h("\u4f60\u8f93\u5165\u7684\u8bed\u4e49\u4e0d\u591f\u6e05\u6670，\u8bf7\u6b63\u786e\u4f7f\u7528\u5730\u7403\u8bed\u8a00");
return false
}}if(!c.test(l)){h("\u4f60\u8f93\u5165\u7684\u8bed\u4e49\u4e0d\u591f\u6e05\u6670，\u8bf7\u6b63\u786e\u4f7f\u7528\u5730\u7403\u8bed\u8a00");
return false
}return true
}function j(){var k=document.supplementQuestion;
if(k.contentSupplement&&k.contentSupplement.checked){if(Editor.id=="mySupplementContent"&&(Editor.getPlainTextValue().trim()==""&&!Editor.hasImage())){k.mySupplementContent.value="";
return false
}}return true
}function b(){if(Editor.id=="mySupplementContent"){document.supplementQuestion.mySupplementContent.value=Editor.getValue();
document.supplementQuestion.editorStats.value=Editor.Util.getCountInfo()
}return true
}function f(l){var k="";
var m=document.supplementQuestion.contentSupplement;
if(m&&m.checked){k=Editor.getValue();
if(k){k=k.trim()
}else{k=""
}if(k.length>=4&&k.substr(-4,4)=="<br>"){k=k.slice(0,-4).trim()
}if(!i(Editor.getPlainTextValue())){return false
}}Zhishi.Ajax.sendRequest("GET",Zhishi.loginStateUrl,{onSuccess:function(o){if(o=="1"){document.supplementQuestion.mySupplementContent.value=k;
document.supplementQuestion.editorStats.value=Editor.Util.getCountInfo();
document.supplementQuestion.useTime.value=Editor.Util.getEditorTime();
g(document.supplementQuestion)
}else{if(o=="0"){var p=get("supplementSubmitRB");
var n=Zhishi.Login.loginList.length;
p.setAttribute("wenwenid",n);
p.addClassName("login_norefresh");
Zhishi.Login.loginList[n]=function(){document.supplementQuestion.mySupplementContent.value=k;
document.supplementQuestion.editorStats.value=Editor.Util.getCountInfo();
document.supplementQuestion.useTime.value=Editor.Util.getEditorTime();
g(document.supplementQuestion)
};
Zhishi.Login.openLoginDialog(p);
return true
}}}});
return false
}function d(k){if(!k){return""
}if(typeof k!="string"){return k
}if(k.length>0&&k.charAt(0)=="S"){return k.slice(1)
}return k
}function g(l){var k={};
k.questionid=l.questionId1.value;
if(l.contentSupplement&&l.contentSupplement.checked){k.content=l.mySupplementContent.value
}if(l.offerSupplement&&l.offerSupplement.checked){k.offeredscore=l.scoreAmount.value
}if(l.broadcastSupplement&&l.broadcastSupplement.checked){k.broadcast=true
}if(l.anonymousSupplement&&l.anonymousSupplement.checked){k.anonymous=true
}k.origtmpid=l.origTmpId.value;
k.origtablename=d(l.origTableName.value);
k.loginkey=d(l.loginKey.value);
k.useTime=l.useTime.value;
k.editorstats=l.editorStats.value;
Zhishi.OpenApi.submitQuestionSupplement(k,function(m){if(m.success){Zhishi.Stats.ch("2013ww.tw.bcwt.ok");
if(k.content&&k.content.length>0){auditTime=m.message;
afterQuestionSupplement();
Editor.setValue("");
l.offerSupplement.checked=false;
l.broadcastSupplement.checked=false;
l.anonymousSupplement.checked=false;
displayTips(4)
}else{document.location.reload()
}return false
}h(m.message);
return false
})
}return{supplementContentRequired:j,setSupplementQuestion:b,beforeSubmit:f,submit:g}
})();
Zhishi.Validator.AnswerPKQuestion=(function(){function showErrMsg(field,message){setTimeout(function(){var errField=get(field);
if(errField){errField.innerHTML=message;
errField.addClassName("field_err");
errField.show()
}},100)
}function removeS(text){if(!text){return""
}if(typeof text!="string"){return text
}if(text.length>0&&text.charAt(0)=="S"){return text.slice(1)
}return text
}function submit(answerForm){var ar={};
ar.questionid=answerForm.questionId.value;
ar.replyid=answerForm.pkAnswerId.value;
ar.content=answerForm.myAnswerPKContent.value;
ar.reasonoption=eval(jQuery(answerForm).find("input[name=reasonOption]:checked").val())+1;
if(answerForm.pk_other.checked){ar.reasoninput=answerForm.reasonInput.value
}if(answerForm.anonymousPK&&(answerForm.anonymousPK.value=="T"||answerForm.anonymousPK.checked)){ar.anonymous=true
}ar.origtmpid=answerForm.origTmpIdS.value;
ar.origtablename=removeS(answerForm.origTableNameS.value);
ar.loginkey=removeS(answerForm.loginKeyS.value);
ar.useTime=Editor.Util.getEditorTime();
ar.editorstats=Editor.Util.getCountInfo();
Zhishi.OpenApi.submitAnswerPK(ar,function(json){if(json.success){var url="/z/AnswerPkComplete.e?sp="+ar.questionid;
window.location.href=url;
return false
}if(json.code==Zhishi.OpenApi.REASON_AUDIT_MODIFY_EXPIRE){var url="/z/AuditDeleteModifyAlert.e?sp=1";
window.location.href=url
}else{if(json.code==Zhishi.OpenApi.REASON_ILLEGAL_REASONINPUT){showErrMsg("reasonInput_err_msg",json.message)
}else{showErrMsg("myAnswerPKContent_err_msg",json.message)
}}return false
})
}return{answerContentRequired:function(){if(Editor.getPlainTextValue().trim()==""&&!Editor.hasImage()){return false
}else{return true
}},reasonRadioRequiredValidate:function(){var radios=document.getElementsByName("reasonOption");
if(radios&&radios.length){for(var r=0;
r<radios.length;
r++){if(radios[r].checked){return true
}}}get("reasonInput_err_msg").innerHTML="\u8bf7\u60a8\u9009\u62e9\u5b8c\u5584\u7684\u7406\u7531!";
get("reasonInput_err_msg").style.display="block";
return false
},reasonInputRequiredValidate:function(){if($("pk_other").checked){var value=$("reasonInput").value;
if(!value){return false
}value=value.trim();
if(!value||value.length<1){return false
}}return true
},reasonInputLengthValidate:function(){if($("pk_other").checked){var value=$("reasonInput").value;
if(!value){return false
}value=value.trim();
if(!value||value.length<1||value.length>20){return false
}}return true
},beforeSubmit:function(field){if(field&&field.form&&field.form.name!="answerPKQuestion"){return true
}Zhishi.Ajax.sendRequest("GET",Zhishi.loginStateUrl,{onSuccess:function(jsonData){if(jsonData=="1"){document.answerPKQuestion.myAnswerPKContent.value=Editor.getValue();
window.onbeforeunload=function(){};
submit(document.answerPKQuestion)
}else{if(jsonData=="0"){var callBack=get("answerPKSubmit");
var len=Zhishi.Login.loginList.length;
callBack.setAttribute("wenwenid",len);
callBack.addClassName("login_norefresh");
Zhishi.Login.loginList[len]=function(){document.answerPKQuestion.myAnswerPKContent.value=Editor.getValue();
window.onbeforeunload=function(){};
submit(document.answerPKQuestion)
};
Zhishi.Login.openLoginDialog(callBack);
return true
}}}});
return false
}}
})();
Zhishi.Validator.AnswerEliteQuestion=(function(){function showErrMsg(field,message){setTimeout(function(){var errField=get(field);
if(errField){errField.innerHTML=message;
errField.addClassName("field_err");
errField.show()
}},100)
}function removeS(text){if(!text){return""
}if(typeof text!="string"){return text
}if(text.length>0&&text.charAt(0)=="S"){return text.slice(1)
}return text
}function submit(answerForm){var ar={};
ar.questionid=answerForm.questionId.value;
ar.replyid=answerForm.eliteAnswerId.value;
ar.content=answerForm.myAnswerEliteContent.value;
ar.reasonoption=eval(jQuery(answerForm).find("input[name=reasonOption]:checked").val())+1;
if(answerForm.elite_other.checked){ar.reasoninput=answerForm.reasonInput.value
}if(answerForm.anonymousElite||answerForm.anonymousElite.value=="T"||answerForm.anonymousElite.checked){ar.anonymous=true
}ar.origtmpid=answerForm.origTmpIdS.value;
ar.origtablename=removeS(answerForm.origTableNameS.value);
ar.loginkey=removeS(answerForm.loginKeyS.value);
ar.useTime=Editor.Util.getEditorTime();
ar.editorstats=Editor.Util.getCountInfo();
Zhishi.OpenApi.submitAnswerElite(ar,function(json){if(json.success){var url="/z/AnswerEliteComplete.e?sp="+ar.questionid;
window.location.href=url;
return false
}if(json.code==Zhishi.OpenApi.REASON_AUDIT_MODIFY_EXPIRE){var url="/z/AuditDeleteModifyAlert.e?sp=1";
window.location.href=url
}else{if(json.code==Zhishi.OpenApi.REASON_ILLEGAL_REASONINPUT){showErrMsg("reasonInput_err_msg",json.message)
}else{showErrMsg("myAnswerEliteContent_err_msg",json.message)
}}return false
})
}return{answerContentRequired:function(){if(Editor.getPlainTextValue().trim()==""&&!Editor.hasImage()){return false
}else{return true
}},reasonRadioRequiredValidate:function(){var radios=document.getElementsByName("reasonOption");
if(radios&&radios.length){for(var r=0;
r<radios.length;
r++){if(radios[r].checked){return true
}}}get("reasonInput_err_msg").innerHTML="\u8bf7\u60a8\u9009\u62e9\u5b8c\u5584\u7684\u7406\u7531!";
get("reasonInput_err_msg").style.display="block";
return false
},reasonInputRequiredValidate:function(){if($("elite_other").checked){var value=$("reasonInput").value;
if(!value){return false
}value=value.trim();
if(!value||value.length<1){return false
}}return true
},reasonInputLengthValidate:function(){if($("elite_other").checked){var value=$("reasonInput").value;
if(!value){return false
}value=value.trim();
if(!value||value.length<1||value.length>20){return false
}}return true
},beforeSubmit:function(field){if(field&&field.form&&field.form.name!="answerEliteQuestion"){return true
}Zhishi.Ajax.sendRequest("GET",Zhishi.loginStateUrl,{onSuccess:function(jsonData){if(jsonData=="1"){document.answerEliteQuestion.myAnswerEliteContent.value=Editor.getValue();
window.onbeforeunload=function(){};
submit(document.answerEliteQuestion)
}else{if(jsonData=="0"){var callBack=get("answerEliteSubmit");
var len=Zhishi.Login.loginList.length;
callBack.setAttribute("wenwenid",len);
callBack.addClassName("login_norefresh");
Zhishi.Login.loginList[len]=function(){document.answerEliteQuestion.myAnswerEliteContent.value=Editor.getValue();
window.onbeforeunload=function(){};
submit(document.answerEliteQuestion)
};
Zhishi.Login.openLoginDialog(callBack);
return true
}}}})
}}
})();
function focusVerCode(){if(verCode.value==verCodeTipText){verCode.maxLength=4;
verCode.value="";
verCode.style.color="#000"
}}function blurVerCode(){if(verCode.value.trim()==""){verCode.maxLength=6;
verCode.value=verCodeTipText;
verCode.style.color="#ACA899"
}}function supplementStart(){if(supplementTime==0){supplementTime=new Date()
}}function supplementEnd(){var a=new Date(),d=0;
if(supplementTime!=0){d=a.getTime()-supplementTime.getTime()
}d=d<0?0:parseInt(d/1000);
document.answerSupplementForm.useTime1.value=d;
return true
}function answerStart(){if(answerTime==0){answerTime=new Date()
}if(!text){return
}if(text.value==tipText){text.value=""
}text.style.color="#000000"
}function answerEnd(){if(answerTime!=0){var a=new Date();
var d=a.getTime()-answerTime.getTime();
d=d<0?0:parseInt(d/1000);
document.answerQuestion.useTime.value=d
}}function blurMethod(){if(text&&text.value==""){text.value=tipText;
text.style.color="#ACA899"
}}function onAnswerSubmit(a,b){if(b.ctrlKey&&b.keyCode==13){document.getElementById(a).click();
return false
}return true
}function initAnswerQuestion(){var b=document.getElementById("answerQuestionDiv");
if(!b){return
}var a=document.answerQuestion;
if(!a){return
}if(a.verifyCode&&verCode){verCode=a.verifyCode;
blurVerCode();
Zhishi.Event.attachEventListener(verCode,"focus",focusVerCode,false);
Zhishi.Event.attachEventListener(verCode,"blur",blurVerCode,false)
}Editor.init("myAnswerContent",{width:685,height:114,hasStateBar:true,onCtrlEnter:function(){document.getElementById("answerSubmit").click()
},toolBar:"answerToolBar"});
if(Zhishi.Browser.isIE6&&Editor.getSelf()&&$("answer_text_tips")){$("answer_text_tips").className="text_tips_for_ie6"
}if($("meAnswer")){Zhishi.Event.attachEventListener($("meAnswer"),"click",function(){Editor.focus(true)
},false)
}var c=function(){var f=document.lemmaCreateForm;
if(Editor.getSelf()!=null){var d=Editor.getPlainTextValue().trim();
var e=Editor.hasImage();
if((d!=""||e)&&Editor.id=="myAnswerContent"&&!Zhishi.Validator.AnswerQuestion.clickSubmitButton){return"【\u63d0\u793a】\u672a\u4fdd\u5b58\u7684\u5185\u5bb9\u5c06\u4f1a\u4e22\u5931"
}}};
if(document.answerQuestion&&document.answerQuestion.myAnswerContent){Editor.setValue(document.answerQuestion.myAnswerContent.value)
}window.onbeforeunload=c;
Zhishi.TeamCooperate.teamCooperte()
}function answerSupplement(){var a=document.getElementById("divAnswerSupplement");
a.style.display="block";
document.answerSupplementForm.answerSupplementContent.focus()
}function initMySupplementContent(){if(!document.answerSupplementForm){return
}if(document.answerSupplementForm.answerSupplementContent&&document.answerSupplementForm.answerSupplementContent.value!=""){var b=document.answerSupplementForm.teamId;
var a=document.answerSupplementForm.contentSupplement;
var c=document.answerSupplementForm.origTableNameS;
if((b.value==null||b.value=="")||c.value!="X"){if(a){a.checked=true
}}}showMySupplementContent()
}function showMySupplementContent(){var b=null;
var a=document.getElementById("answerQuestionDiv");
if(document.answerSupplementForm){b=document.answerSupplementForm.supplementSubmit;
if(document.answerSupplementForm.verifyCode1&&verCode){verCode=document.answerSupplementForm.verifyCode1;
blurVerCode();
Zhishi.Event.attachEventListener(verCode,"focus",focusVerCode,false);
Zhishi.Event.attachEventListener(verCode,"blur",blurVerCode,false)
}}if(document.answerSupplementForm&&document.answerSupplementForm.contentSupplement){if(document.answerSupplementForm.contentSupplement.checked){document.getElementById("showSC").style.display="block";
if(b!=null){b.disabled=false
}var c=Editor.getSelf();
if(c!=null){if(c.id=="myAnswerContent"&&document.answerQuestion&&document.answerQuestion.myAnswerContent){document.answerQuestion.myAnswerContent.value=Editor.getValue()
}c.parentNode.removeChild(c)
}if(a){a.style.display="none"
}Editor.init("answerSupplementContent",{width:658,height:114,hasStateBar:true,onCtrlEnter:function(){document.getElementById("supplementSubmit").click()
},toolBar:"answerToolBar"});
if(Zhishi.Browser.isIE6&&Editor.getSelf()&&$("supplementAnswer_text_tips")){$("supplementAnswer_text_tips").className="text_tips_for_ie6"
}if(document.answerSupplementForm.answerSupplementContent){Editor.setValue(document.answerSupplementForm.answerSupplementContent.value)
}setTimeout(Editor.focus,100)
}else{document.getElementById("showSC").style.display="none";
var c=Editor.getSelf();
if(c!=null){if(c.id=="answerSupplementContent"){document.answerSupplementForm.answerSupplementContent.value=Editor.getValue()
}c.parentNode.removeChild(c)
}setTimeout(function(){window.focus()
},10);
if(a){a.style.display="block";
initAnswerQuestion()
}}}checkIsDisabled()
}function initAnswerPKQuestion(){Editor.init("myAnswerPKContent",{width:685,height:114,hasStateBar:true,onCtrlEnter:function(){document.getElementById("answerPKSubmit").click()
}});
if(Zhishi.Browser.isIE6&&Editor.getSelf()&&$("answerpk_text_tips")){$("answerpk_text_tips").className="text_tips_for_ie6"
}var a=function(){if(Editor.getSelf()!=null){var b=Editor.getPlainTextValue().trim();
var c=Editor.hasImage();
if((b!=""||c)&&Editor.id=="myAnswerPKContent"){return"【\u63d0\u793a】\u672a\u4fdd\u5b58\u7684\u5185\u5bb9\u5c06\u4f1a\u4e22\u5931"
}}};
window.onbeforeunload=a;
Editor.focus()
}function initAnswerEliteQuestion(){Editor.init("myAnswerEliteContent",{width:685,height:114,hasStateBar:true,onCtrlEnter:function(){document.getElementById("answerEliteSubmit").click()
}});
if(Zhishi.Browser.isIE6&&Editor.getSelf()&&$("answerelite_text_tips")){$("answerelite_text_tips").className="text_tips_for_ie6"
}var a=function(){if(Editor.getSelf()!=null){var b=Editor.getPlainTextValue().trim();
var c=Editor.hasImage();
if((b!=""||c)&&Editor.id=="myAnswerEliteContent"){return"【\u63d0\u793a】\u672a\u4fdd\u5b58\u7684\u5185\u5bb9\u5c06\u4f1a\u4e22\u5931"
}}};
window.onbeforeunload=a;
Editor.focus()
}function checkIsDisabled(){var a=null;
if(document.answerSupplementForm){a=document.answerSupplementForm.supplementSubmit
}if(a==null){return
}if(document.answerSupplementForm.contentSupplement!=null){if(document.answerSupplementForm.contentSupplement.checked){a.disabled=false;
return
}}if(document.answerSupplementForm.anonymousSupplement!=null){if(document.answerSupplementForm.anonymousSupplement.checked){a.disabled=false;
return
}else{a.disabled=true;
return
}}else{a.disabled=true;
return
}}function initSupplementQuestion(){var b=document.getElementsByTagName("input");
for(var a=0;
a<b.length;
a++){if(b[a].type=="checkbox"&&b[a].id.indexOf("checkAnswerPanel")==0){checkboxList.push(b[a])
}else{if(b[a].type=="button"){b[a].disabled=false;
buttonList.push(b[a])
}}}if(document.supplementQuestion&&document.supplementQuestion.mySupplementContent!=null&&document.supplementQuestion.mySupplementContent.value!=""){if(document.supplementQuestion.contentSupplement){document.supplementQuestion.contentSupplement.checked=true
}}showSupplementQuestionContent();
toggleCheckBoxExceptThis()
}function toggleCheckBoxExceptThis(g,e){for(var d=0;
d<checkboxList.length;
d++){if(g&&checkboxList[d].id.indexOf(g)>0){continue
}if(checkboxList[d].checked){var f=checkboxList[d].id.substr(16);
checkboxList[d].checked=false;
hideFollowPanel(f)
}}if(e!=null){var b="b"+e;
for(var c=0;
c<buttonList.length;
c++){if(buttonList[c].id!=b){var a=buttonList[c];
if(a!=null&&a.value=="\u91c7\u7eb3\u4e3a\u7b54\u6848"&&a.disabled==true){a.disabled=false
}}}}}function showSupplementQuestionContent(){if(document.supplementQuestion==null){return
}var a=document.supplementQuestion.supplementSubmit;
if(document.supplementQuestion&&document.supplementQuestion.contentSupplement){toggleCheckBoxExceptThis();
if(document.supplementQuestion.contentSupplement.checked){document.getElementById("showSC").style.display="block";
if(a!=null){a.disabled=false
}var b=Editor.getSelf();
if(b!=null){b.parentNode.removeChild(b)
}Editor.init("mySupplementContent",{width:658,height:114,hasStateBar:true,onCtrlEnter:function(){document.getElementById("supplementSubmit").click()
}});
if(Zhishi.Browser.isIE6&&Editor.getSelf()&&$("supplementQuestion_text_tips")){$("supplementQuestion_text_tips").className="text_tips_for_ie6"
}setTimeout(Editor.focus,100)
}else{document.getElementById("showSC").style.display="none";
var b=Editor.getSelf();
if(b!=null){document.supplementQuestion.mySupplementContent.value=Editor.getValue();
b.parentNode.removeChild(b)
}setTimeout(function(){window.focus()
},10)
}}checkIsSupplementQuestionDisabled()
}function checkIsSupplementQuestionDisabled(){var a=document.supplementQuestion.supplementSubmit;
if(a==null){return
}if(document.supplementQuestion.contentSupplement!=null){if(document.supplementQuestion.contentSupplement.checked){a.disabled=false;
return
}}if(document.supplementQuestion.offerSupplement!=null){if(document.supplementQuestion.offerSupplement.checked){a.disabled=false;
return
}}if(document.supplementQuestion.broadcastSupplement!=null){if(document.supplementQuestion.broadcastSupplement.checked){a.disabled=false;
return
}}if(document.supplementQuestion.anonymousSupplement!=null){if(document.supplementQuestion.anonymousSupplement.checked){a.disabled=false;
return
}else{a.disabled=true;
return
}}else{a.disabled=true;
return
}}function getDisabled(){return document.supplementQuestion.supplementSubmit.disabled
}function setCookie(b,c,a){var d=new Date();
d.setDate(d.getDate()+a);
document.cookie=b+"="+escape(c)+((a==null)?"":";expires="+d.toGMTString())
}function getCookie(a){if(document.cookie.length>0){c_start=document.cookie.indexOf(a+"=");
if(c_start!=-1){c_start=c_start+a.length+1;
c_end=document.cookie.indexOf(";",c_start);
if(c_end==-1){c_end=document.cookie.length
}return unescape(document.cookie.substring(c_start,c_end))
}}return""
}var getShowNum=function(a){try{return new Number(document.getElementById(a).innerHTML)
}catch(b){return 0
}};
var getExpectedNum=function(a){try{return new Number(getCookie("ww_"+a))
}catch(b){return 0
}};
var setExpectedNum=function(a,b){setCookie("ww_"+a,b)
};
var _show="";
var goodOrBad=0;
var showResult=function(rstMsg){if(_show){var area=get(_show);
area.setStyle("opacity",100);
var rsp=null;
try{rsp=eval(rstMsg)
}catch(e){rsp=eval(this.errMsg)
}if(rsp!=null){var code=rsp[0];
var msg=rsp[1];
area.innerHTML=msg;
area.style.display="block";
if(code==0){try{var cid=area.id+goodOrBad;
var num=parseInt(getExpectedNum(cid),10);
setExpectedNum(cid,(num+addNumber));
expectNum(cid)
}catch(e){}}else{if(code==2){window.location.href=loginUrl
}}}window.setTimeout(function(){var e=new Zhishi.Effect(area,"opacity","100","0",1);
e.start()
},1000)
}};
var evaluateAnswer=function(c,d,a){if(a){var b=a+d;
setExpectedNum(b,Math.max(getShowNum(b),getExpectedNum(b)));
goodOrBad=d;
_show=a;
if(c){new WenwenAjaxEvent(c,showResult).notify()
}}};
var expectNum=function(a){try{document.getElementById(a).innerHTML=Math.max(getShowNum(a),getExpectedNum(a))
}catch(b){}};
function followAskEnd(b){Zhishi.Stats.ch("2013ww.tw.zw.ok");
if(null==b){return
}var d=b.id.substring(3);
ansAuthorId=d.split("_")[0];
if(Editor.getPlainTextValue().trim()==""&&!Editor.hasImage()){var e=get("errors"+ansAuthorId);
if(null!=e){e.overwriteClassName("field_err");
e.innerHTML="\u8bf7\u8f93\u5165\u95ee\u9898\u5185\u5bb9\u54e6";
e.style.display="block"
}Editor.focus()
}else{var c=Editor.getPlainTextValue().trim();
var l=false;
if(!Zhishi.Validator.AnswerQuestion.CONTENT_PATTERN.test(c)){l=true
}for(var f=0;
f<Zhishi.Validator.AnswerQuestion.nonsenseList.length;
f++){if(c==Zhishi.Validator.AnswerQuestion.nonsenseList[f]){l=true;
break
}}if(l){var e=get("errors"+ansAuthorId);
if(null!=e){e.overwriteClassName("field_err");
e.innerHTML="\u4f60\u8f93\u5165\u7684\u8bed\u4e49\u4e0d\u591f\u6e05\u6670，\u8bf7\u6b63\u786e\u4f7f\u7528\u5730\u7403\u8bed\u8a00";
e.style.display="block"
}Editor.focus();
return
}if(Editor.getPlainTextValue().trim().length>10000){var e=get("errors"+ansAuthorId);
if(null!=e){e.overwriteClassName("field_err");
e.innerHTML="\u8fd9\u91cc\u6700\u591a\u53ea\u80fd\u8f93\u516510000\u5b57，\u8bf7\u8c03\u6574\u4e00\u4e0b\u5b57\u6570\u54e6";
e.style.display="block"
}Editor.focus();
return
}var g=Editor.Util.getEditorTime();
var h=d.split("_")[1];
var n=Editor.getValue();
n=nomalizeText(n);
n=n.replace(/[^\u0000-\u00FF]/g,function(i){return escape(i).replace(/(%u)(\w{4})/gi,"\\u$2")
});
var k=Editor.Util.getCountInfo();
var a=["{",'userId:"',uin,'",userName:','""',",toUserId:",'"',ansAuthorId,'"',",questionId:",questionId,",seconds:",g,",replyId:",h,',origTableName:"',faOrigTableName,'",editorStats:"',k,'",origTmpId:',faOrigTmpId,',content:"',n,'"}'].join("");
var j="api/answer/follow?format=json";
var m={onSuccess:postCallBack,para:b,contentType:"application/json; charset=UTF-8",postdata:a,raw:true};
Zhishi.Ajax.sendRequest("POST",j,m)
}return false
}function displayResult(){resetFollowErrorTip("errors"+ansAuthorId);
var a=$("answerFrame"+ansAuthorId);
var b=$("checkAnswerPanel"+ansAuthorId);
var c=$("text"+ansAuthorId);
c.value="";
a.style.display="none";
b.checked=false
}function postCallBack(jsonData,o){var json=eval("("+jsonData+")");
if(json.success){new Base.U.Tips("green","\u8ffd\u95ee\u6210\u529f","",true,{autoClose:3000});
auditTime=json.message;
onFollowAsk(textAreaId,followDivId,submitId,followLinkObj);
displayTips(5);
var tipsLink=document.getElementById("follow_tips");
if(Zhishi.Browser.isWebKit){try{if(document.createEvent){var mouseEvent=document.createEvent("MouseEvents");
mouseEvent.initEvent("click",true,true);
tipsLink.dispatchEvent(mouseEvent)
}}catch(ex){}}else{if(tipsLink){tipsLink.click()
}}setTimeout(function(){document.location="/z/q"+questionId+".htm"
},5000)
}else{var tempIds=o.id.substring(3);
ansAuthorId=tempIds.split("_")[0];
var errorO=get("errors"+ansAuthorId);
errorO.innerHTML=json.message;
errorO.overwriteClassName("field_err");
errorO.style.display="block";
Editor.focus()
}}function toggleAnswerPanel(h,f){var b=null;
if(f!=null){b=document.getElementById("b"+f)
}toggleCheckBoxExceptThis(h,f);
if($("contentSupplement")&&$("contentSupplement").checked){$("contentSupplement").checked=false;
document.getElementById("showSC").style.display="none";
var d=Editor.getSelf();
if(d!=null){document.supplementQuestion.mySupplementContent.value=Editor.getValue();
d.parentNode.removeChild(d)
}setTimeout(function(){window.focus()
},10)
}var e=$("checkAnswerPanel"+h);
var g="text"+h;
var c=$("answerFrame"+h);
if(e.checked){if(b!=null&&b.disabled==false){b.disabled=true
}c.style.display="block";
var a=$(g);
if(a!=null){var d=Editor.getSelf();
if(d!=null){d.parentNode.removeChild(d)
}Editor.init(g,{width:658,height:114,hasStateBar:true});
if(Zhishi.Browser.isIE6&&Editor.getSelf()&&$("follow_text_tips"+h)){$("follow_text_tips"+h).className="text_tips_for_ie6"
}setTimeout(Editor.focus,100)
}setTimeout(function(){resetFollowErrorTip("errors"+h)
},0)
}else{if(b!=null&&b.value=="\u91c7\u7eb3\u4e3a\u7b54\u6848"){b.disabled=false
}hideFollowPanel(h)
}}function hideFollowPanel(b){resetFollowErrorTip("errors"+b);
$("answerFrame"+b).style.display="none";
var a=Editor.getSelf();
if(a!=null){$("text"+b).value=Editor.getValue();
a.parentNode.removeChild(a);
$("checkAnswerPanel"+b).checked=false
}setTimeout(function(){window.focus()
},10)
}function resetFollowErrorTip(b){var a=get(b);
if(null!=a){a.overwriteClassName("pump_tips");
a.innerHTML='\u5bf9\u540c\u4e00\u56de\u7b54\u8005\u7684\u8ffd\u95ee\u8d85\u8fc73\u6b21\u540e\u6bcf\u6b21\u5c06\u6d88\u801710\u79ef\u5206  <a href="http://cache.soso.com/wenwen/help/help_ask_03.htm" target="_blank">\u4e86\u89e3\u8be6\u60c5</a>';
a.style.display="block"
}}function nomalizeText(a){a=a.replace(/\\/g,"\\\\");
a=a.replace(/\"/g,'\\"');
a=a.replace(/\r/g,"\\r");
a=a.replace(/\n/g,"\\n");
return a
}var rateTips=["(\u6162)","(\u8f83\u6162)","(\u4e00\u822c)","(\u8f83\u5feb)","(\u5f88\u5feb)"];
var attiTips=["(\u6577\u884d)","(\u8f83\u6577\u884d)","(\u4e00\u822c)","(\u8f83\u8ba4\u771f)","(\u5f88\u8ba4\u771f)"];
Zhishi.SelectBestAnswer={bestAnswerHasSelectOne:false,bestAnswerHasSelectTwo:false,answerId:0,answerNum:0,width:401,height:440,giftHeight:168,bestAnswerDialog:null,twoAnswersDialog:null,twoAnswersDialogClose:"wty.caina5",solvedType:0,originalType:0,rateIndex:0,attiIndex:0,rateDivs:null,attiDivs:null,rateTip:null,attiTip:null,firstAnswerId:0,questionId:0,init:function(a,b){Zhishi.SelectBestAnswer.bestAnswerHasSelectOne=false;
Zhishi.SelectBestAnswer.bestAnswerHasSelectTwo=false;
Zhishi.SelectBestAnswer.firstAnswerId=0;
Zhishi.SelectBestAnswer.answerNum=a;
Zhishi.SelectBestAnswer.answerId=0;
Zhishi.SelectBestAnswer.width=401;
Zhishi.SelectBestAnswer.height=440;
Zhishi.SelectBestAnswer.giftHeight=168;
Zhishi.SelectBestAnswer.bestAnswerDialog=null;
Zhishi.SelectBestAnswer.twoAnswersDialog=null;
Zhishi.SelectBestAnswer.rateIndex="0";
Zhishi.SelectBestAnswer.attiIndex="0";
Zhishi.SelectBestAnswer.questionId=b;
document.bestAnswerForm.bestAnswerId1.value="0";
document.bestAnswerForm.bestAnswerStarLevel1.value="0";
document.bestAnswerForm.bestAnswerMsg1.value="S";
document.bestAnswerForm.bestAnswerGift1.value="0";
document.bestAnswerForm.originalType1.value="0";
document.bestAnswerForm.solvedType1.value="0";
document.bestAnswerForm.authorRate1.value="0";
document.bestAnswerForm.authorAttitude1.value="0";
document.bestAnswerForm.bestAnswerId2.value="0";
document.bestAnswerForm.bestAnswerStarLevel2.value="0";
document.bestAnswerForm.bestAnswerMsg2.value="S";
document.bestAnswerForm.bestAnswerGift2.value="0";
document.bestAnswerForm.originalType2.value="0";
document.bestAnswerForm.solvedType2.value="0";
document.bestAnswerForm.authorRate2.value="0";
document.bestAnswerForm.authorAttitude2.value="0"
},updateSolvedType:function(a){Zhishi.SelectBestAnswer.solvedType=a
},updateOriginalType:function(a){Zhishi.SelectBestAnswer.originalType=a
},initRateEvent:function(){Zhishi.SelectBestAnswer.rateIndex="0";
var c=gets("#chooseStarForm DIV");
var b=gets("#chooseStarForm SPAN");
if(c){Zhishi.SelectBestAnswer.rateDivs=new Array();
for(var a=0;
a<c.length;
a++){if(c[a]&&c[a].className.indexOf(" ratestar")>0){Zhishi.SelectBestAnswer.rateDivs.push(c[a])
}}}if(b){for(var a=0;
a<b.length;
a++){if(b[a]&&b[a].className.indexOf(" ratestar")>0){Zhishi.SelectBestAnswer.rateTip=b[a];
break
}}}if(Zhishi.SelectBestAnswer.rateDivs){for(var a=0;
a<Zhishi.SelectBestAnswer.rateDivs.length;
a++){if(Zhishi.SelectBestAnswer.rateDivs[a]){Zhishi.Event.attachEventListener(Zhishi.SelectBestAnswer.rateDivs[a],"click",Zhishi.SelectBestAnswer.clickRate.bind(null,get(Zhishi.SelectBestAnswer.rateDivs[a]).id),false)
}Zhishi.Event.attachEventListener(Zhishi.SelectBestAnswer.rateDivs[a],"mouseover",Zhishi.SelectBestAnswer.mouseoverRate.bind(null,get(Zhishi.SelectBestAnswer.rateDivs[a]).id),false);
Zhishi.Event.attachEventListener(Zhishi.SelectBestAnswer.rateDivs[a],"mouseout",Zhishi.SelectBestAnswer.mouseoutRate.bind(null,get(Zhishi.SelectBestAnswer.rateDivs[a]).id),false)
}Zhishi.SelectBestAnswer.defaultRate()
}},initAttiEvent:function(){Zhishi.SelectBestAnswer.attiIndex="0";
var c=gets("#chooseStarForm DIV");
var b=gets("#chooseStarForm SPAN");
if(c){Zhishi.SelectBestAnswer.attiDivs=new Array();
for(var a=0;
a<c.length;
a++){if(c[a]){if(c[a]&&c[a].className.indexOf(" attistar")>0){Zhishi.SelectBestAnswer.attiDivs.push(c[a])
}}}}if(b){for(var a=0;
a<b.length;
a++){if(b[a]&&b[a].className.indexOf(" attistar")>0){Zhishi.SelectBestAnswer.attiTip=b[a];
break
}}}if(Zhishi.SelectBestAnswer.attiDivs){for(var a=0;
a<Zhishi.SelectBestAnswer.attiDivs.length;
a++){Zhishi.Event.attachEventListener(Zhishi.SelectBestAnswer.attiDivs[a],"click",Zhishi.SelectBestAnswer.clickAtti.bind(null,get(Zhishi.SelectBestAnswer.attiDivs[a]).id),false);
Zhishi.Event.attachEventListener(Zhishi.SelectBestAnswer.attiDivs[a],"mouseover",Zhishi.SelectBestAnswer.mouseoverAtti.bind(null,get(Zhishi.SelectBestAnswer.attiDivs[a]).id),false);
Zhishi.Event.attachEventListener(Zhishi.SelectBestAnswer.attiDivs[a],"mouseout",Zhishi.SelectBestAnswer.mouseoutAtti.bind(null,get(Zhishi.SelectBestAnswer.attiDivs[a]).id),false)
}}Zhishi.SelectBestAnswer.defaultAtti()
},clickRate:function(a){if(a){Zhishi.SelectBestAnswer.rateIndex=a;
Zhishi.SelectBestAnswer.setRate(a)
}},mouseoverRate:function(a){if(a){Zhishi.SelectBestAnswer.setRate(a)
}},mouseoutRate:function(a){if(a){Zhishi.SelectBestAnswer.setRate(Zhishi.SelectBestAnswer.rateIndex)
}},clickAtti:function(a){if(a){Zhishi.SelectBestAnswer.attiIndex=a;
Zhishi.SelectBestAnswer.setAtti(a)
}},mouseoverAtti:function(a){if(a){Zhishi.SelectBestAnswer.setAtti(a)
}},mouseoutAtti:function(a){if(a){Zhishi.SelectBestAnswer.setAtti(Zhishi.SelectBestAnswer.attiIndex)
}},setRate:function(b){Zhishi.SelectBestAnswer.defaultRate();
if(b>=1&&b<=5){for(var a=0;
a<b;
a++){Zhishi.SelectBestAnswer.rateDivs[a].className="ico_star";
if(Zhishi.SelectBestAnswer.rateTip){Zhishi.SelectBestAnswer.rateTip.style.display="block";
Zhishi.SelectBestAnswer.rateTip.innerHTML=rateTips[a]
}}}},setAtti:function(b){Zhishi.SelectBestAnswer.defaultAtti();
if(b>=1&&b<=5){for(var a=0;
a<b;
a++){Zhishi.SelectBestAnswer.attiDivs[a].className="ico_star";
if(Zhishi.SelectBestAnswer.attiTip){Zhishi.SelectBestAnswer.attiTip.style.display="block";
Zhishi.SelectBestAnswer.attiTip.innerHTML=attiTips[a]
}}}},defaultRate:function(){if(Zhishi.SelectBestAnswer.rateDivs){for(var a=0;
a<Zhishi.SelectBestAnswer.rateDivs.length;
a++){Zhishi.SelectBestAnswer.rateDivs[a].className="ico_gray_star"
}}if(Zhishi.SelectBestAnswer.rateTip){Zhishi.SelectBestAnswer.rateTip.style.display="none"
}},defaultAtti:function(){if(Zhishi.SelectBestAnswer.attiDivs){for(var a=0;
a<Zhishi.SelectBestAnswer.attiDivs.length;
a++){Zhishi.SelectBestAnswer.attiDivs[a].className="ico_gray_star"
}}if(Zhishi.SelectBestAnswer.attiTip){Zhishi.SelectBestAnswer.attiTip.style.display="none"
}},getGiftItems:function(){var c=gets("#chooseStarForm li");
var b=new Array();
if(c){for(var d=0;
d<c.length;
d++){var a=c[d];
if(a.className&&(" "+a.className+" ").indexOf(" gift_item ")>=0){b.push(a)
}}}return b
},initChooseGiftEvent:function(){var b=Zhishi.SelectBestAnswer.getGiftItems();
if(!b){return false
}for(var c=0;
c<b.length;
c++){var a=b[c];
Zhishi.SelectBestAnswer.clickGiftEvent=Zhishi.SelectBestAnswer.clickGift.bind(a);
Zhishi.Event.attachEventListener(a,"click",Zhishi.SelectBestAnswer.clickGiftEvent,false);
if(Zhishi.Browser.isIE6){Zhishi.SelectBestAnswer.mouseOverGiftEvent=Zhishi.SelectBestAnswer.mouseOverGift.bind(a);
Zhishi.SelectBestAnswer.mouseOutGiftEvent=Zhishi.SelectBestAnswer.mouseOutGift.bind(a);
Zhishi.Event.attachEventListener(a,"mouseover",Zhishi.SelectBestAnswer.mouseOverGiftEvent,false);
Zhishi.Event.attachEventListener(a,"mouseout",Zhishi.SelectBestAnswer.mouseOutGiftEvent,false)
}}return true
},isSelectGift:function(a){if(a.className&&(" "+a.className+" ").indexOf(" current ")>=0){return true
}else{return false
}},selectGift:function(c,a){if(a){get(c).addClassName("selected");
var b=c.getElementsByTagName("div");
if(b&&b.length>0){get(b[0]).addClassName("select")
}}else{get(c).removeClassName("selected");
var b=c.getElementsByTagName("div");
if(b&&b.length>0){get(b[0]).removeClassName("select")
}}},clickGift:function(){var b=Zhishi.SelectBestAnswer.getGiftItems();
if(!b){return false
}for(var c=0;
c<b.length;
c++){var a=b[c];
if(a==this){if(Zhishi.SelectBestAnswer.isSelectGift(a)){Zhishi.SelectBestAnswer.selectGift(a,false)
}else{Zhishi.SelectBestAnswer.selectGift(a,true)
}}else{Zhishi.SelectBestAnswer.selectGift(a,false)
}}return false
},mouseOverGift:function(){get(this).addClassName("gift_hover")
},mouseOutGift:function(){get(this).removeClassName("gift_hover")
},clickGiftEvent:function(){},mouseOverGiftEvent:function(){},mouseOutGiftEvent:function(){},getGiftDiv:function(d){var b=gets("#chooseStarForm div");
if(b){for(var a=0;
a<b.length;
a++){var c=b[a];
if(c.id==d){return c
}}}},expandGifts:function(){var d=Zhishi.SelectBestAnswer.getGiftDiv("collapseGift");
var b=Zhishi.SelectBestAnswer.getGiftDiv("expandGift");
if(!d||!b){return false
}get(d).hide();
get(b).show();
var c=Zhishi.SelectBestAnswer.width;
var a=Zhishi.SelectBestAnswer.height+Zhishi.SelectBestAnswer.giftHeight;
Zhishi.SelectBestAnswer.bestAnswerDialog.resize(c,a);
return false
},collapseGifts:function(){var d=Zhishi.SelectBestAnswer.getGiftDiv("collapseGift");
var b=Zhishi.SelectBestAnswer.getGiftDiv("expandGift");
if(!b||!d){return false
}get(b).hide();
get(d).show();
var c=Zhishi.SelectBestAnswer.width;
var a=Zhishi.SelectBestAnswer.height;
Zhishi.SelectBestAnswer.bestAnswerDialog.resize(c,a);
return false
},click:function(c){if(!c||c<=0){return
}if(Zhishi.SelectBestAnswer.answerNum<=0){return
}var d=document.getElementById("choose_button");
if(!d){return
}if(Zhishi.SelectBestAnswer.answerNum>1){if(Zhishi.SelectBestAnswer.bestAnswerHasSelectTwo){var h=document.getElementById("b"+c);
if(h){h.value="\u6b63\u5728\u91c7\u7eb3";
h.disabled=true
}var g=Zhishi.SelectBestAnswer.questionId;
var b=["{",'userId:"',0,'"',",questionId:",g,",answerId1:",Zhishi.SelectBestAnswer.answerId,",answerId2:",c,"}"].join("");
var e="/z/api/adopt/submit?format=json";
var j={onSuccess:Zhishi.SelectBestAnswer.refreshpage,para:g,contentType:"application/json; charset=UTF-8",postdata:b,raw:true};
Zhishi.Ajax.sendRequest("POST",e,j)
}else{d.innerHTML=document.getElementById("choose_three").innerHTML;
Zhishi.SelectBestAnswer.height=160;
var a=Zhishi.SelectBestAnswer.width;
var i=Zhishi.SelectBestAnswer.height;
var f='<DIV style="MARGIN-TOP: 15px; HEIGHT: 40px">';
f+='<P style="FONT-SIZE: 14px; FLOAT: left; LINE-HEIGHT: 40px;font-weight:bold;padding-left:40px;">\u786e\u5b9a\u4ec5\u91c7\u7eb3\u8be5\u7b54\u6848\u5417？</P>';
f+='</DIV><DIV style="PADDING: 25px 0 0 40px;">';
f+='<INPUT style="FONT-SIZE: 14px; MARGIN: 0px 5px; WIDTH: 100px; LINE-HEIGHT: 23px; HEIGHT: 28px; vertical-align:middle;" onclick=Zhishi.SelectBestAnswer.selectFinish() type=button value=\u4ec5\u91c7\u7eb3\u8be5\u7b54\u6848 name=button2>';
f+="<SPAN>";
f+='<INPUT class="login_require login_norefresh" style="FONT-SIZE: 14px;WIDTH: 120px; LINE-HEIGHT: 23px; HEIGHT: 28px; vertical-align:middle;margin:0 20px 0 5px" onclick=Zhishi.SelectBestAnswer.selectSecond() type=button value=\u7ee7\u7eed\u91c7\u7eb3\u7b2c\u4e8c\u4e2a name=button></SPAN>';
f+='<a href="#" style="font-size:14px;" onclick="Zhishi.SelectBestAnswer.twoAnswersDialogCancel();">\u53d6\u6d88</a></DIV>';
Zhishi.SelectBestAnswer.twoAnswersDialog=new Zhishi.Dialog("\u786e\u8ba4\u91c7\u7eb3",a,i,false,f);
Zhishi.SelectBestAnswer.twoAnswersDialog.afterClose=function(){Zhishi.Stats.ch(Zhishi.SelectBestAnswer.twoAnswersDialogClose);
Zhishi.SelectBestAnswer.twoAnswersDialogClose="wty.caina5"
};
Zhishi.SelectBestAnswer.twoAnswersDialog.show();
Zhishi.Stats.ch("wty.caina1")
}}else{var h=document.getElementById("b"+c);
if(h){h.value="\u6b63\u5728\u91c7\u7eb3";
h.disabled=true
}Zhishi.SelectBestAnswer.selectSendRequest(c,0)
}Zhishi.SelectBestAnswer.answerId=c
},twoAnswersDialogCancel:function(){Zhishi.SelectBestAnswer.twoAnswersDialogClose="wty.caina4";
Zhishi.SelectBestAnswer.twoAnswersDialog.close()
},refreshpage:function(jsonData,qid){var json=eval("("+jsonData+")");
if(json.success){document.location.reload()
}else{}},selectSendRequest:function(d,b){var e=Zhishi.SelectBestAnswer.questionId;
var a=["{",'userId:"',0,'"',",questionId:",e,",answerId1:",d,",answerId2:",b,"}"].join("");
var c="/z/api/adopt/submit?format=json";
var f={onSuccess:Zhishi.SelectBestAnswer.postCallBack,para:d,contentType:"application/json; charset=UTF-8",postdata:a,raw:true};
Zhishi.Ajax.sendRequest("POST",c,f)
},postCallBack:function(jsonData,answerId1){var json=eval("("+jsonData+")");
if(json.success){Zhishi.SelectBestAnswer.evaluateAnswer(answerId1,false)
}else{var bt=document.getElementById("b"+answerId1);
if(bt){bt.value="\u91c7\u7eb3\u7b54\u6848";
bt.disabled=false
}}},selectFinish:function(){Zhishi.Stats.ch("wty.caina2");
Zhishi.SelectBestAnswer.twoAnswersDialogClose=null;
Zhishi.SelectBestAnswer.selectSendRequest(Zhishi.SelectBestAnswer.answerId,0)
},selectSecond:function(){Zhishi.Stats.ch("wty.caina3");
var a=document.getElementById("b"+Zhishi.SelectBestAnswer.answerId);
if(a){a.value="\u5df2\u88ab\u91c7\u7eb3";
a.disabled=true
}Zhishi.SelectBestAnswer.bestAnswerHasSelectTwo=true;
var c='<span class="icon_ok2"></span>\u8be5\u7b54\u6848\u5df2\u88ab\u91c7\u7eb3，\u8bf7\u7ee7\u7eed\u91c7\u7eb3\u7b2c\u4e8c\u4e2a\u7b54\u6848。';
var b=document.createElement("span");
b.innerHTML=c;
b.className="tip";
get("b"+Zhishi.SelectBestAnswer.answerId).insertAfter(b);
Zhishi.SelectBestAnswer.twoAnswersDialogClose=null;
Zhishi.SelectBestAnswer.twoAnswersDialog.close()
},evaluateAnswer:function(b,h){Zhishi.SelectBestAnswer.answerId=b;
if(!h){get("choose_two_a").innerHTML="\u8c22\u8c22，\u4e0d\u505a\u8bc4\u4ef7"
}var d=document.getElementById("choose_button");
d.innerHTML=document.getElementById("choose_two").innerHTML;
var a=401;
var i=440;
if(h){var c=document.getElementById("selectSuccess");
var g=get("mySolvedEvaluate");
if(g){g.parentNode.removeChild(g)
}if(c!=null){c.parentNode.removeChild(c)
}i=340
}Zhishi.SelectBestAnswer.width=a;
Zhishi.SelectBestAnswer.height=i;
var e='<form name="chooseStarForm" id = "chooseStarForm" onsubmit="return false;">';
e+=document.getElementById("selectBestAnswerTemplate").innerHTML;
e+="</form>";
if(Zhishi.SelectBestAnswer.twoAnswersDialog!=null){Zhishi.SelectBestAnswer.twoAnswersDialog.close()
}var f;
if(h){f="\u8bc4\u4ef7\u7b54\u6848"
}else{f="\u5b8c\u6210\u91c7\u7eb3"
}Zhishi.SelectBestAnswer.bestAnswerDialog=new Zhishi.Dialog(f,a,i,false,e);
Zhishi.SelectBestAnswer.bestAnswerDialog.afterClose=function(){if(!h){document.location.reload()
}else{var j=get("chooseStarForm");
j.parentNode.removeChild(j)
}};
Zhishi.SelectBestAnswer.bestAnswerDialog.show();
Zhishi.SelectBestAnswer.initChooseGiftEvent();
Zhishi.SelectBestAnswer.initRateEvent();
Zhishi.SelectBestAnswer.initAttiEvent()
},getGiftId:function(){var b=Zhishi.SelectBestAnswer.getGiftItems();
if(!b){return 0
}for(var c=0;
c<b.length;
c++){var a=b[c];
if(Zhishi.SelectBestAnswer.isSelectGift(a)){return a.id.substr(4)
}}return 0
},validateInput:function(b,e){var a;
if(typeof(b)=="undefined"){var d=document.chooseStarForm;
a=d.thankswords.value;
e=(function(f){warnIlegalWords(f);
d.thankswords.focus();
d.thankswords.select()
})
}else{a=b;
if(typeof(e)!="function"){e=(function(f){})
}}if(a.length<=0){e("\u8bf7\u8f93\u5165\u611f\u8a00\u5185\u5bb9\u54e6");
return false
}if(a.length>40){e("\u8bf7\u611f\u8a00\u5185\u5bb9\u9650\u5236\u572840\u4e2a\u5b57\u4ee5\u5185");
return false
}for(var c=0;
c<Zhishi.Validator.AnswerQuestion.nonsenseList.length;
c++){if(a==Zhishi.Validator.AnswerQuestion.nonsenseList[c]){e("\u4f60\u8f93\u5165\u7684\u8bed\u4e49\u4e0d\u591f\u6e05\u6670，\u8bf7\u6b63\u786e\u4f7f\u7528\u5730\u7403\u8bed\u8a00");
return false
}}if(!Zhishi.Validator.AnswerQuestion.CONTENT_PATTERN.test(a)){e("\u4f60\u8f93\u5165\u7684\u8bed\u4e49\u4e0d\u591f\u6e05\u6670，\u8bf7\u6b63\u786e\u4f7f\u7528\u5730\u7403\u8bed\u8a00");
return false
}return true
},getStartlevel:function(){var c=document.chooseStarForm;
if(c.starLevel){var b=c.starLevel.length;
for(var a=0;
a<b;
a++){if(c.starLevel[a].checked){return c.starLevel[a].value
}}}return 3
},afterSelected:function(){var a=document.getElementById("b"+Zhishi.SelectBestAnswer.answerId);
if(a){a.value="\u5df2\u88ab\u91c7\u7eb3";
a.disabled=true
}},selectFirst:function(){var a=document.chooseStarForm;
if(!Zhishi.SelectBestAnswer.validateInput()){return false
}document.bestAnswerForm.bestAnswerId1.value=Zhishi.SelectBestAnswer.answerId;
document.bestAnswerForm.bestAnswerStarLevel1.value=Zhishi.SelectBestAnswer.getStartlevel();
document.bestAnswerForm.bestAnswerMsg1.value="S"+a.thankswords.value;
document.bestAnswerForm.bestAnswerGift1.value=Zhishi.SelectBestAnswer.getGiftId();
document.bestAnswerForm.originalType1.value=Zhishi.SelectBestAnswer.originalType;
document.bestAnswerForm.solvedType1.value=Zhishi.SelectBestAnswer.solvedType;
document.bestAnswerForm.authorRate1.value=Zhishi.SelectBestAnswer.rateIndex;
document.bestAnswerForm.authorAttitude1.value=Zhishi.SelectBestAnswer.attiIndex;
Zhishi.SelectBestAnswer.originalType="0";
Zhishi.SelectBestAnswer.solvedType="0";
Zhishi.SelectBestAnswer.rateIndex="0";
Zhishi.SelectBestAnswer.attiIndex="0";
Zhishi.SelectBestAnswer.afterSelected();
Zhishi.SelectBestAnswer.bestAnswerHasSelectOne=true;
Zhishi.SelectBestAnswer.bestAnswerDialog.close();
Zhishi.SelectBestAnswer.click(Zhishi.SelectBestAnswer.answerId)
},selectCancel:function(){Zhishi.SelectBestAnswer.bestAnswerDialog.close()
},selectOnlyOne:function(){var a=document.chooseStarForm;
if(!Zhishi.SelectBestAnswer.validateInput()){return false
}document.bestAnswerForm.bestAnswerId1.value=Zhishi.SelectBestAnswer.answerId;
document.bestAnswerForm.bestAnswerStarLevel1.value=Zhishi.SelectBestAnswer.getStartlevel();
document.bestAnswerForm.bestAnswerMsg1.value="S"+a.thankswords.value;
document.bestAnswerForm.bestAnswerGift1.value=Zhishi.SelectBestAnswer.getGiftId();
document.bestAnswerForm.originalType1.value=Zhishi.SelectBestAnswer.originalType;
document.bestAnswerForm.solvedType1.value=Zhishi.SelectBestAnswer.solvedType;
document.bestAnswerForm.authorRate1.value=Zhishi.SelectBestAnswer.rateIndex;
document.bestAnswerForm.authorAttitude1.value=Zhishi.SelectBestAnswer.attiIndex;
document.bestAnswerForm.bestAnswerId2.value="0";
document.bestAnswerForm.bestAnswerStarLevel2.value="0";
document.bestAnswerForm.bestAnswerMsg2.value="S";
document.bestAnswerForm.bestAnswerGift2.value="0";
document.bestAnswerForm.originalType2.value="0";
document.bestAnswerForm.solvedType2.value="0";
document.bestAnswerForm.authorRate2.value="0";
document.bestAnswerForm.authorAttitude2.value="0";
document.getElementById("b"+Zhishi.SelectBestAnswer.answerId).disabled=true;
Zhishi.SelectBestAnswer.bestAnswerDialog.close();
Zhishi.SelectBestAnswer.submit()
},selectMore:function(){var b=document.chooseStarForm;
if(!Zhishi.SelectBestAnswer.validateInput()){return false
}document.bestAnswerForm.bestAnswerId1.value=Zhishi.SelectBestAnswer.answerId;
document.bestAnswerForm.bestAnswerStarLevel1.value=Zhishi.SelectBestAnswer.getStartlevel();
document.bestAnswerForm.bestAnswerMsg1.value="S"+b.thankswords.value;
document.bestAnswerForm.bestAnswerGift1.value=Zhishi.SelectBestAnswer.getGiftId();
document.bestAnswerForm.originalType1.value=Zhishi.SelectBestAnswer.originalType;
document.bestAnswerForm.solvedType1.value=Zhishi.SelectBestAnswer.solvedType;
document.bestAnswerForm.authorRate1.value=Zhishi.SelectBestAnswer.rateIndex;
document.bestAnswerForm.authorAttitude1.value=Zhishi.SelectBestAnswer.attiIndex;
Zhishi.SelectBestAnswer.originalType="0";
Zhishi.SelectBestAnswer.solvedType="0";
Zhishi.SelectBestAnswer.rateIndex="0";
Zhishi.SelectBestAnswer.attiIndex="0";
var a=document.getElementById("b"+Zhishi.SelectBestAnswer.answerId);
if(a){a.value="\u5df2\u88ab\u91c7\u7eb3";
a.disabled=true
}Zhishi.SelectBestAnswer.bestAnswerHasSelectOne=true;
Zhishi.SelectBestAnswer.bestAnswerDialog.close()
},selectComplete:function(){var b=document.chooseStarForm;
if(!Zhishi.SelectBestAnswer.validateInput()){return false
}if(Zhishi.SelectBestAnswer.answerId<=0){alert("\u9009\u62e9\u6ee1\u610f\u7b54\u6848\u9519\u8bef!");
return false
}var a={questionId:Zhishi.questionId,answerId:Zhishi.SelectBestAnswer.answerId,bestAnswerStarLevel:Zhishi.SelectBestAnswer.getStartlevel(),answerMsg:b.thankswords.value,answerGift:41271,originalType:Zhishi.SelectBestAnswer.originalType,solvedType:Zhishi.SelectBestAnswer.solvedType,authorRate:Zhishi.SelectBestAnswer.rateIndex,authorAttitude:Zhishi.SelectBestAnswer.attiIndex};
Zhishi.OpenApi.submitAnswerEvaluated(a,function(c){if(c.reason==-12){warnIlegalWords("\u4f60\u8f93\u5165\u7684\u90e8\u5206\u5185\u5bb9\u4e0d\u5408\u6cd5，\u4f60\u61c2\u7684");
return false
}if(c.success){if(offerGiftDialog){offerGiftDialog.close()
}setTimeout(function(){window.location.reload()
},300)
}})
},submit:function(){get("bestAnswerForm").submit()
}};
Zhishi.TeamCooperate={showTeamMemberDialog:null,teamCooperte:function(){var a=document.answerQuestion.teamCooperateChb;
var b=document.getElementById("teamCooperTypeDiv");
if(b&&a){if(a.checked){b.style.display="block"
}else{b.style.display="none"
}}},showTeamAnswerMembers:function(b,a){Zhishi.TeamCooperate.showTeamMemberDialog=new Zhishi.Dialog("\u5408\u4f5c\u7f16\u8f91\u8005",460,310,true,"ShowTeamCooperateMembers.e?sp="+b+"&sp="+a);
Zhishi.TeamCooperate.showTeamMemberDialog.show()
}};
function trim(a){a=a.replace(/(^\s*)|(\s*$)/g,"");
return a
}function redirectSearch4Form(i,g,c){var e=trim(i.w.value);
if(e==""){window.location.reload();
return false
}else{var h=search_solved_url.replace(/\?.*/gi,"");
var d=h+"?sp=S"+encodeURIComponent(e);
if(c&&g!=""){d+="&ch="+g
}if(Zhishi.Browser.isIE||Zhishi.Browser.isOpera){var b=document.createElement("a");
b.href=d;
document.body.appendChild(b);
b.click()
}else{document.location=d
}return false
}}function redirectAskWithParam(c,d,f){var g=trim(c.value);
var e="";
if(d==null){d=""
}if(f==null){f=0
}e=siteBaseUrl+"Ask.e?sp=S"+encodeURIComponent(g)+"&sp="+f+"&ch="+d;
if(Zhishi.Browser.isIE||Zhishi.Browser.isOpera){var b=document.createElement("a");
b.href=e;
document.body.appendChild(b);
b.click()
}else{document.location=e
}}function chat(a,c,f,d,b){var e="http://wenwen.soso.com/cgi-bin/TS_cgi?tu=";
e=e+f+"&tm="+d+"&q="+a+"&a="+c+"&enc="+b;
getLink(e);
return false
}function openChatBox(b){if(b){Link=b;
try{if(Zhishi.Browser.isIE){var a=new ActiveXObject("TimwpDll.TimwpCheck");
if(a){var d=a.GetVersion()
}if(d>=2.1){this.location.href=Link
}else{alert("\u641c\u641c\u95ee\u95ee\u6e29\u99a8\u63d0\u793a：\r\n　　\u8bf7\u60a8\u8bbf\u95eehttp://im.qq.com/\u4e0b\u8f7d\u65b0\u7248\u7684QQ/TM\u4ee5\u652f\u6301\u4e0e\u95ee\u53cb\u5728\u7ebf\u4ea4\u6d41！");
window.target="_top";
window.open("http://im.qq.com/")
}}else{if(Zhishi.Browser.isFirefox){this.location.href=Link
}else{alert("\u641c\u641c\u95ee\u95ee\u6e29\u99a8\u63d0\u793a：\r\n　　\u60a8\u4f7f\u7528\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301QQ\u4e34\u65f6\u4f1a\u8bdd\u529f\u80fd，\u5efa\u8bae\u60a8\u52a0\u5bf9\u65b9\u4e3a\u597d\u53cb，\u6216\u4f7f\u7528IE/TT/FireFox\u6d4f\u89c8\u5668\u8bbf\u95ee。")
}}}catch(c){alert("\u641c\u641c\u95ee\u95ee\u6e29\u99a8\u63d0\u793a：\r\n　　\u8bf7\u60a8\u8bbf\u95eehttp://im.qq.com/\u4e0b\u8f7d\u65b0\u7248\u7684QQ/TM\u4ee5\u652f\u6301\u4e0e\u95ee\u53cb\u5728\u7ebf\u4ea4\u6d41！");
window.target="_top";
window.open("http://im.qq.com/")
}}}function getLink(b){var a;
Editor.Ajax.sendRequest("GET",b,{onSuccess:function(c){openChatBox(c);
return false
}});
return false
}function initOnlineUserClass(f){var b=gets(f);
var d=new Array();
var a="";
if(b){for(var e=0;
e<b.length;
e++){var g=b[e].parentNode;
var c=g.className;
if(c.length>5){c=c.substring(5);
d.push(b[e]);
a+=c;
if(e<b.length-1){a+=","
}}}getResponseString(a,d)
}}function getResponseString(c,a){if(c){var b="/z/WenwenAjaxEvent.e?sp=9&sp=S"+c;
Zhishi.Ajax.sendRequest("GET",b,{onSuccess:function(d){if(d&&d.length>3){var e=d.indexOf(",");
if(e>0&&(e+2)<(d.length-2)){result=d.substring(e+2,d.length-2);
onlineClass(result,a)
}}}})
}}function onlineClass(b,a){if(b&&a){var d=b.split(",");
if(d.length==a.length){for(var c=0;
c<a.length;
c++){if(d[c]=="1"){a[c].className="ico_talk"
}}}}}check_qq_exist=function(){var c=window.navigator.userAgent.toLowerCase();
var f=/gecko/.test(c)&&!/khtml/.test(c);
var a=/safari/.test(c);
if(f||a){return true
}try{var d=new ActiveXObject("TimwpDll.TimwpCheck");
return true
}catch(b){return false
}};
openChatBox=function(a){if(a!=0){Link=a;
try{window.location.href=Link
}catch(b){}}};
function on_click_qq(a,f,i,g,h){var d="http://bizapp.qq.com/webc.htm?new=0&o=jz.soso.com&q=0&sid="+a;
var b="/wenwen/ad/?vid="+g+"&uin="+f+"&type=qq";
var c;
var e="";
if(a>10020){e=d;
c=i+"&clk_bqq=1";
window.open(e,"_blank","height=544, width=644,toolbar=no,scrollbars=no,menubar=no,status=no")
}else{e=b;
c=i+"&clk_bqq=2";
if(check_qq_exist()){Zhishi.Ajax.sendRequest("GET",b,{onSuccess:function(j){openChatBox(j);
return false
},onErr:function(){}})
}else{alert("\u817e\u8baf\u641c\u7d22\u63a8\u5e7f\u6e29\u99a8\u63d0\u793a：\r\n     \u60a8\u6ca1\u6709\u5b89\u88c5QQ\u6216\u8005\u60a8\u7684\u6d4f\u89c8\u5668\u8bbe\u7f6e\u7981\u6b62\u4e86QQ\u4e34\u65f6\u4f1a\u8bdd\u529f\u80fd。")
}}if(typeof h=="object"&&(h.tagName=="A"||h.tagName=="a")){h.href=c
}return false
}function showDaren(a){showOrHideDaren(a,true)
}function hideDaren(a){showOrHideDaren(a,false)
}function showOrHideDaren(c,a){if(!c||c.style.display=="none"){return
}var b=c.getElementsByTagName("div")[0];
if(!b){return
}if(a==true){b.style.display="block";
c.style.position="relative"
}else{b.style.display="none";
c.style.position=""
}}function initDarenAwards(){var users=gets(".daren_info_wrap");
if(users==null||users.length==null||users.length==0){return
}var len=users.length;
var uids="";
var i=0;
for(i=0;
i<len;
i++){var div=users[i];
var uid=div.id.substring(6);
uids+=uid+";"
}Zhishi.Ajax.sendRequest("GET","async/Async.htm?id=DarenAwards&u="+uids+"&r="+Math.random(),{onSuccess:function(data){if(data==null||data.length==0){return
}var json=eval("("+data+")");
if(!json||!json.length){return
}try{for(i=0;
i<json.length;
i++){var user=json[i];
var eid=user.uid;
var contents=user.contents;
if(!contents||!contents.length){continue
}for(var k=0;
k<users.length;
k++){var div=users[k];
if(div.id==("daren_"+eid)){var ul=div.getElementsByTagName("ul")[0];
ul.innerHTML="";
for(var j=0;
j<contents.length;
j++){var text=contents[j].title;
var level=contents[j].level;
var li=document.createElement("li");
if(level<=1){li.innerHTML='<span class="daren_ico_junior"></span>'+text
}else{li.innerHTML='<span class="daren_ico_senior"></span>'+text
}ul.appendChild(li)
}div.style.display="block";
div.getElementsByTagName("div")[0].style.display="none"
}}}}catch(e){alert(e)
}}})
}function domark(b,c,a){if(b.startsWith(c.keyword)){var d="<a href='/z/Search.e?sp=S"+encodeURIComponent(c.keyword)+"&ch=w.search.yjjlink&cid=w.search.yjjlink' target='_blank'>"+c.keyword+"</a>";
return b.replace(c.keyword,d)
}else{return b
}}function markLink(d,j){if(d==null||d[0]==null||j==null||j.length==0){return
}var o=d[0].gets(".answer_con")[0];
if(!o){o=d[0].gets(".pump_wrap .pump_answer .pump_con")[0]
}if(!o){return
}var g=o.innerHTML.trim();
if(g.startsWith("<pre>")&&g.endsWith("</pre>")){o=o.gets("pre")[0]
}g=o.innerHTML.trim();
var k="";
var h=g;
while(j.length>0){var c=h.length;
var m=-1;
var f=-1;
var l="";
for(var e=0;
e<j.length;
e++){var a=j[e].keyword;
var b=h.indexOf(a);
if((b>-1&&b<c)||(b==c&&a.length>f)){c=b;
m=e;
f=a.length;
l=a
}}if(c==h.length&&m==-1&&f==-1){break
}var n="<a href='/z/Search.e?sp=S"+encodeURIComponent(l)+"&ch=w.search.yjjlink&cid=w.search.yjjlink' target='_blank'>"+l+"</a>";
k=k+h.substring(0,c)+n;
if(c+f>=h.length){h="";
break
}h=h.substring(c+f);
j.splice(m,1)
}o.innerHTML=k+h
}function doInnerLink(data,questionId,answerId1,answerId2){if(data==null||data.length==0){return
}var json=eval("("+data+")");
if(!json){return
}if(json.status==null||json.status!=0){return
}if(!json.questionId||json.questionId!=questionId){return
}var main=null;
if(answerId1!=null&&json.answerId1){if(json.answerId1!=answerId1){return
}main=gets(".sloved_answer_main");
if(main){markLink(main,json.content1)
}}if(answerId2!=null&&json.answerId2){if(json.answerId2!=answerId2){return
}main=gets(".sloved_answer_main2");
if(main){markLink(main,json.content2)
}}}function markBestAnswersNormal(b){if(!b){return
}var f=null;
var e=null;
var a=gets(".sloved_answer_main");
if(a!=null&&a[0]!=null){var i=a[0].gets(".sign_bar");
if(i!=null&&i[0]!=null){f=i[0].id
}}a=gets(".sloved_answer_main2");
if(a!=null&&a[0]!=null){var i=a[0].gets(".sign_bar");
if(i!=null&&i[0]!=null){e=i[0].id
}}if(f==null&&e==null){return
}var h=parseInt(b);
var c=h*3;
var g=null;
if(h>0&&h<150000000){g="/z/markLinkInfo2?questionId="+b
}else{if(h>=300000000&&h<450000000){g="/z/markLinkInfo3?questionId="+b
}else{g="/z/markLinkInfo?questionId="+b
}}if(f!=null){g+="&rid1="+f;
c+=parseInt(f)
}if(e!=null){g+="&rid2="+e;
c+=parseInt(e)
}g+="&sign="+c;
Zhishi.Ajax.sendRequest("GET",g+"&r="+Math.random(),{timeOut:3000,onSuccess:function(d){try{doInnerLink(d,b,f,e)
}catch(j){}}})
}function doInnerLinkSpecial(data,questionId,answerId1,answerId2){if(data==null||data.length==0){return
}var json=eval("("+data+")");
if(!json){return
}if(json.status==null||json.status!=0){return
}if(!json.questionId||json.questionId!=questionId){return
}var main=gets(".sloved_answer_main2");
if(answerId1!=null&&json.answerId1){if(json.answerId1!=answerId1){return
}markLink(new Array(main[0]),json.content1)
}if(answerId2!=null&&json.answerId2){if(json.answerId2!=answerId2){return
}markLink(new Array(main[1]),json.content2)
}}function markBestAnswersSpecial(b){if(!b){return
}var f=null;
var e=null;
var a=gets(".sloved_answer_main2");
if(a!=null&&a[0]!=null){var i=a[0].gets(".sign_bar");
if(i!=null&&i[0]!=null){f=i[0].id
}if(a.length>1){i=a[1].gets(".sign_bar");
if(i!=null&&i[0]!=null){e=i[0].id
}}}if(f==null&&e==null){return
}var h=parseInt(b);
var c=h*3;
var g=null;
if(h>0&&h<150000000){g="/z/markLinkInfo2?questionId="+b
}else{if(h>=300000000&&h<450000000){g="/z/markLinkInfo3?questionId="+b
}else{g="/z/markLinkInfo?questionId="+b
}}if(f!=null){g+="&rid1="+f;
c+=parseInt(f)
}if(e!=null){g+="&rid2="+e;
c+=parseInt(e)
}g+="&sign="+c;
Zhishi.Ajax.sendRequest("GET",g+"&r="+Math.random(),{timeOut:3000,onSuccess:function(d){try{doInnerLinkSpecial(d,b,f,e)
}catch(j){}}})
}function markBestAnswers(b){var a=gets(".sloved_answer_main2");
if(a!=null&&a.length==2){markBestAnswersSpecial(b)
}else{markBestAnswersNormal(b)
}}var timeid;
function initWenwenAssistant(){var a=jQuery.noConflict();
a("#wwzs_ask").click(function(){window.location.href="/z/Ask.e?sp=S&sp=0&ch=wwzsdj"
});
a("#wwzs_ask_thisTeam").click(function(){window.location.href="/z/Ask.e?sp=S&sp=1007&sp=X&sp="+thisTeamId+"&ch=wwzsdj";
return false
});
a("a[id^='wwzs_ask_team']").click(function(){window.location.href="/z/Ask.e?sp=S&sp=1007&sp=X&sp="+this.id.substring(13)+"&ch=wwzsdj";
return false
});
a("#wwzs_ask_allTeam").click(function(){if(teamIds&&teamIds.length>0){var c="/z/Ask.e?sp=S&sp=1007&sp=X&sp="+teamIds[0];
if(teamIds.length>1){c+="&sp=X&sp=S"
}for(var d=1;
d<teamIds.length;
d++){c+=teamIds[d];
if(d!=teamIds.length-1){c+="|"
}}window.location.href=c+"&ch=wwzsdj";
return false
}});
a("#wwzs_ask_thisExpert").click(function(){window.location.href="/z/Ask.e?sp=S&sp=1007&sp=S"+thisExpertId+"&ch=wwzsdj";
return false
});
a("a[id^='wwzs_ask_expert']").click(function(){window.location.href="/z/Ask.e?sp=S&sp=1007&sp=S"+this.id.substring(15)+"&ch=wwzsdj";
return false
});
a("#wwzs_ask_allExpert").click(function(){if(expertIds&&expertIds.length>0){var c="/z/Ask.e?sp=S&sp=1007&sp=S"+expertIds[0]+"&sp=0";
if(expertIds.length>1){c+="&sp=S"
}for(var d=1;
d<expertIds.length;
d++){c+=expertIds[d];
if(d!=expertIds.length-1){c+="|"
}}window.location.href=c+"&ch=wwzsdj";
return false
}});
a("a[id^='wwzs_teamId']").mouseover(function(){a(this).next().show()
});
a("a[id^='wwzs_teamId']").mouseout(function(){var c=a(this);
timeid=setTimeout(function(){c.next().hide()
},100)
});
a("a[id^='wwzs_expertId']").mouseover(function(){a(this).next().show()
});
a("a[id^='wwzs_expertId']").mouseout(function(){var c=a(this);
timeid=setTimeout(function(){c.next().hide()
},100)
});
a(".user_layer").mouseover(function(){window.clearTimeout(timeid);
a(this).show()
});
a(".user_layer").mouseout(function(){a(this).hide()
});
var b=["left:10px","left:50px","left:100px","left:150px","left:200px"];
a("dd em").attr("style",function(c){if(typeof(teamIds)!=undefined){if(c<teamIds.length){return b[c%5]
}else{return b[(c-teamIds.length)%5]
}}else{return b[c%5]
}});
if(typeof(questionFirstTime)!="undefined"){a("#questionFirstTimeBar").attr("style",function(){var c=questionFirstTime/1000/86400*180;
return"width:"+(c>180?180:c)+"px"
})
}if(typeof(categoryExpertSize)!="undefined"){a("#categoryExpertSizeBar").attr("style",function(){var c=categoryExpertSize/100*180;
return"width:"+(c>180?180:c)+"px"
})
}if(typeof(questionFinishTime)!="undefined"){a("#questionFinishTimeBar").attr("style",function(){var c=questionFinishTime/1000/3600*180;
return"width:"+(c>180?180:c)+"px"
})
}if(typeof(categoryTeamSize)!="undefined"){a("#categoryTeamSizeBar").attr("style",function(){var c=categoryTeamSize/1200*180;
return"width:"+(c>180?180:c)+"px"
})
}}function anonymous(a,d){if(!a){return
}var e=parseInt(a);
if(e<0){return
}if(d){var b=parseInt(d);
if(b<0){return
}var c="/z/api/answer/anonymous?qid="+e+"&aid="+b;
Zhishi.Ajax.sendRequest("GET",c+"&r="+Math.random(),{timeOut:3000,onSuccess:function(f){Zhishi.Stats.ch("2013ww.tw.hdnm.ok");
setTimeout(function(){window.location.reload()
},1000)
},onErr:function(){window.location.reload()
}})
}else{var c="/z/api/question/anonymous?qid="+e;
Zhishi.Ajax.sendRequest("GET",c+"&r="+Math.random(),{timeOut:3000,onSuccess:function(f){Zhishi.Stats.ch("2013ww.tw.twnm.ok");
setTimeout(function(){window.location.reload()
},1000)
},onErr:function(){window.location.reload()
}})
}}function closeQuestion(b,a){if(a&&!window.confirm(a)){return false
}Zhishi.OpenApi.submitQuestionClose(b,function(){setTimeout(function(){window.location.reload()
},100)
});
return false
}var QB=(function(){return{digg:function(a){var b="/z/WenwenAjaxEvent.e?sp=31&sp="+a;
Zhishi.Ajax.sendRequest("GET",b+"&r="+Math.random(),{onSuccess:function(c){setTimeout(function(){window.location.reload()
},100)
}});
return false
}}
})();function getTagNameByType(b){var a="";
switch(b){case 1:a="solved";
break;
case 3:a="notSolved";
break;
case 4:a="original";
break;
case 5:a="notOriginal";
break
}return a
}function getNumTag(c,b){var a=getTagNameByType(b);
return document.getElementById(a+"Num"+c)
}function getNumBarTag(c,b){var a=getTagNameByType(b);
return document.getElementById(a+"Bar"+c)
}function getTipsTag(c,b){var a=getTagNameByType(b);
return document.getElementById(a+"Tips"+c)
}function getEvaluateTips(a,b){switch(a){case 0:return"\u60a8\u5df2\u8bc4\u4ef7！";
case 1:return"\u8bc4\u4ef7\u6210\u529f\u52a0"+b;
default:return
}}function showEvaluateTips(d,b,a,c){var e=getTipsTag(d,b);
if(e){e.innerHTML=getEvaluateTips(a,c);
e.style.display="block";
window.setTimeout(function(){var f=new Zhishi.Effect(e,"opacity","100","0",1);
f.start()
},1000)
}}function updateTotalSolvedNum(f){var g=getNumTag(f,1);
var b=getNumTag(f,3);
if(!g||!b){return
}var d=parseInt(g.innerHTML,10);
var c=parseInt(b.innerHTML,10);
var e=d+c;
var a=document.getElementById("totalSolvedNum"+f);
if(a){a.innerHTML=e
}}function updateTotalOriginalNum(e){var a=getNumTag(e,4);
var b=getNumTag(e,5);
if(!a||!b){return
}var g=parseInt(a.innerHTML,10);
var f=parseInt(b.innerHTML,10);
var d=g+f;
var c=document.getElementById("totalOriginal"+e);
if(c){c.innerHTML=d
}}function updateSolvedBar(e,d){var f=getNumTag(e,1);
var a=getNumTag(e,3);
if(!f||!a){return
}var c=parseInt(f.innerHTML,10);
var b=parseInt(a.innerHTML,10);
if(isShowGood(c,b)&&d){d=d.parentNode;
if(d){d=get(d);
d.addClassName("good")
}}}function updateOriginalBar(f){var d=getNumTag(f,4);
var i=getNumTag(f,5);
if(!d||!i){return
}var c=getNumBarTag(f,4);
var g=getNumBarTag(f,5);
if(!c||!g){return
}var a=parseInt(d.innerHTML,10);
var h=parseInt(i.innerHTML,10);
var e=a+h;
if(e>0){if(a<=50&&h<=50){var b=Math.max(a,h);
c.style.width=Math.round(a*100*b/(e*50))+"px";
g.style.width=Math.round(h*100*b/(e*50))+"px"
}else{c.style.width=Math.round(a*100/e)+"px";
g.style.width=(100-Math.round(a*100/e))+"px"
}}}function updateBestRate(a){if(a){}}function disableBar(a,b){ulObj=get(a+b);
if(ulObj){ulObj.className="disabled_evaluation"
}}function disableEvaluate(d,c,a){var b=null;
if(a){switch(c){case 1:case 3:disableBar("solveDIV",d);
break;
case 4:case 5:disableBar("origiDIV",d);
break
}}}function checkIsDisable(c,b){var d;
switch(b){case 1:case 3:d=get("solveDIV"+c);
break;
case 4:case 5:d=document.getElementById("origiDIV"+c);
break
}if(d){var a=d.className;
if(a&&a.indexOf("disabled_evaluation")>=0){return true
}else{return false
}}return false
}function updateEvaluateNumAndBar(c,a,b){switch(a){case 1:updateSolvedBar(c,b);
updateBestRate(c);
break;
case 3:updateBestRate(c);
break;
case 4:case 5:updateOriginalBar(c);
break
}}function evaluateAnswerNew(url,answerId,type,value,thisObj,isSimple){var disable=checkIsDisable(answerId,type);
if(disable){return false
}var refer=document.referrer;
if(refer==null||refer==""){refer="null"
}if(isSimple){ac_evaluationParam=""
}url+="&sp=S"+encodeURIComponent(refer)+"&sp=S"+ac_evaluationParam;
var result=0;
Zhishi.Ajax.sendRequest("GET",url,{onSuccess:function(response){if(response){var data=eval("("+response.replace(/'/gi,"")+")")[0];
if(data=="1"){result=1
}}if(result>0){if(isSimple&&isSimple==true){var goodOffset=0;
var badOffset=0;
if(type==1){Zhishi.Stats.ch("rainbow.wty.pingjia1");
goodOffset=value
}else{Zhishi.Stats.ch("rainbow.wty.pingjia2");
badOffset=value
}fixValueBar(answerId,goodOffset,badOffset)
}else{var numDiv=getNumTag(answerId,type);
if(numDiv){var number=parseInt(numDiv.innerHTML,10)+value;
numDiv.innerHTML=number;
updateEvaluateNumAndBar(answerId,type,thisObj)
}}}else{if(isSimple&&isSimple==true){fixValueBar(answerId,0,0)
}}showEvaluateTips(answerId,type,result,value);
if(!isSimple){disableEvaluate(answerId,type,true)
}return false
}})
}function initEvaluateAnswer(b,a){disableEvaluate(b,1,a);
disableEvaluate(b,4,a)
}function getQuestionId(){var a=document.location.href;
if(a&&a.length>0){var c=a.indexOf("q");
if(c>0){a=a.substring(c);
var b=a.indexOf(".");
if(b>0){a=a.substring(1,b);
return a
}}}return 0
}var simpleEvaluateInfo;
var answerIdsString="";
var liArray=new Array();
function initSimpleEvaluate(){var evaLiList=gets("A");
if(evaLiList){for(var i=0;
i<evaLiList.length;
i+=2){var className=evaLiList[i].className;
if(className&&className.indexOf("eva")>=0){var answerId=className.substring(3);
answerId=parseInt(answerId,10);
if(answerId>0){var newArray=gets("A."+className);
if(newArray&&newArray.length==2){answerIdsString+=" "+answerId;
liArray.push(newArray[0]);
liArray.push(newArray[1])
}}}}answerIdsString=trim(answerIdsString)
}if(liArray.length<=0){return
}var url="/z/WenwenAjaxEvent.e?sp=22&sp="+questionId+"&sp=S"+answerIdsString;
var result=0;
Zhishi.Ajax.sendRequest("GET",url,{onSuccess:function(response){if(response&&response.length>6){var data=eval("("+response.replace(/'/gi,"")+")")[0];
var msg=response.substring(4,response.length-2);
msg=eval("("+msg+")");
simpleEvaluateInfo=msg;
if(data=="1"){result=1
}}if(result>0&&liArray.length>=2){for(var i=0;
i<liArray.length;
i+=2){var c=liArray[i].className;
if(c&&c.length>3){c=c.substring(3)
}liArray[i].innerHTML="\u597d："+simpleEvaluateInfo[c].good;
liArray[i+1].innerHTML="\u4e0d\u597d："+simpleEvaluateInfo[c].bad
}}return true
}})
}function isShowGood(a,b){return a>=5&&a/2>=b
}function showGood(b,a,c){if(b&&isShowGood(a,c)){b.addClassName(" good_sim")
}}function fixValueBar(h,a,g){var d=0;
var b=0;
if(simpleEvaluateInfo[h]){d=simpleEvaluateInfo[h].good;
b=simpleEvaluateInfo[h].bad
}if(a>0){d+=a
}if(g>0){b+=g
}var f="eva"+h;
var c=gets("A."+f);
if(c&&c.length==2){var i=get("span_good"+h);
i.innerHTML="\u597d："+d;
i.style.display="inline";
var e=get("span_bad"+h);
e.innerHTML="\u4e0d\u597d："+b;
e.style.display="inline";
jQuery(c[0]).remove();
jQuery(c[1]).remove()
}};var zzQzoneDialog=null;
function zzQzone(a){zzQzoneDialog=new Zhishi.Dialog("\u8f6c\u8f7d\u5230QQ\u7a7a\u95f4",620,436,true,a);
zzQzoneDialog.show()
};function postToPengyou(){var b="\u641c\u641c\u95ee\u95ee";
var a='\u6709\u4ec0\u4e48\u4e0d\u61c2\u7684\u6765\u641c\u641c\u95ee\u95ee\u63d0\u95ee\u5427，\u8fd9\u4e2a\u95ee\u9898\u4f60\u61c2\u5417——"'+title+'" \u5feb\u6765\u770b\u770b';
var c="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+encodeURIComponent(qurl+"?ch=from.pengyou")+"&to=pengyou&summary="+encodeURIComponent(a)+"&title="+encodeURIComponent(title)+"&site="+encodeURIComponent(b);
window.open(c,"","width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=yes, location=yes, resizable=yes, status=no")
}function postToSina(){var a=2982913500;
var b="#\u641c\u641c\u95ee\u95ee\u7cbe\u5f69\u77e5\u8bc6#"+title;
var c="http://v.t.sina.com.cn/share/share.php?&appkey="+a+"&url="+encodeURIComponent(qurl+"?ch=from.t.sina")+"&title="+encodeURIComponent(b)+"&source=&sourceUrl=&content=utf-8";
window.open(c,"","width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=yes, location=yes, resizable=yes, status=no")
}function postToDB(){void (function(){var j={location:qurl,title:"#\u641c\u641c\u95ee\u95ee\u7cbe\u5f69\u63a8\u8350#"+title},i=encodeURIComponent,f=window.getSelection,c=document.getSelection,b=document.selection,g=f?f():c?c():b?b.createRange().text:"",h="http://www.douban.com/recommend/?url="+i(j.location+"?ch=from.douban")+"&title="+i(j.title)+"&sel="+i(g)+"&v=1",a=function(){if(!window.open(h,"douban","toolbar=yes,menubar=yes,status=0,resizable=0,scrollbars=yes,width=450,height=355,left="+(screen.width-450)/2+",top="+(screen.height-330)/2)){location.href=h+"&r=1"
}};
if(/Firefox/.test(navigator.userAgent)){setTimeout(a,0)
}else{a()
}})()
}function postToRR(){var a={location:qurl,title:"#\u641c\u641c\u95ee\u95ee\u7cbe\u5f69\u63a8\u8350#"+title+qurl};
void ((function(h,m,k){if(/xiaonei\.com/.test(m.location)){return
}var i="http://share.renren.com/share/buttonshare.do?link=",g=m.location+"?ch=from.renren",c=m.title,j=[k(g),"&amp;title=",k(c)].join("");
function b(){if(!window.open([i,j].join(""),"xnshare",["toolbar=yes,menubar=yes,status=0,resizable=0,scrollbars=yes,width=626,height=436,left=",(h.width-626)/2,",top=",(h.height-436)/2].join(""))){g.href=[i,j].join("")
}}if(/Firefox/.test(navigator.userAgent)){setTimeout(b,0)
}else{b()
}})(screen,a,encodeURIComponent))
};var followAskLinkObjNow=null;
var content_id_now="";
var $j=jQuery;
$j(document).ready(function(){loadData();
if(typeof(answerNum)!="undefined"){Zhishi.SelectBestAnswer.init(answerNum,questionId)
}init_share();
init_collect();
if(jQuery("#stockDIV").children("iframe").attr("src")==""){jQuery("#stockDIV").remove()
}$j(".star_info_wrap").hover(function(){$j(this).find(".star_info").show()
},function(){$j(this).find(".star_info").hide()
});
init_thank_best();
init_report();
if(!jQuery.browser.webkit){init_discuzLogo()
}init_innerLink();
init_discuz_stat()
});
function initNoticeTips(){if(answerNum>=3&&checkShow(3)){displayTips(3);
return
}}function displayTips(c){var b=get("noticeTips");
var a;
switch(c){case 1:a="\u60a8\u7684\u95ee\u9898\u5373\u5c06\u8fc7\u671f，\u5982\u679c\u60a8\u8fd8\u6ca1\u6709\u83b7\u5f97\u6ee1\u610f\u7b54\u6848，\u8bf7\u5173\u95ed\u95ee\u9898。<a href='javascript:void(0);' onclick='clearTipsAndSetCookie(1);'>\u6211\u77e5\u9053\u4e86</a>";
break;
case 2:a="\u60a8\u7684\u95ee\u9898\u8fd8\u6709"+remainDays+"\u5929\u8fc7\u671f，\u8bf7\u53ca\u65f6\u91c7\u7eb3\u6ee1\u610f\u7b54\u6848，\u5426\u5219\u5c06\u88ab\u6263\u966410\u79ef\u5206。<a href='javascript:void(0);' onclick='clearTipsAndSetCookie(2);'>\u6211\u77e5\u9053\u4e86</a>";
break;
case 3:a="\u60a8\u7684\u95ee\u9898\u5df2\u7ecf\u6709"+answerNum+"\u4e2a\u56de\u7b54，\u8bf7\u53ca\u65f6\u91c7\u7eb3\u6ee1\u610f\u7b54\u6848\u5e76\u611f\u8c22\u70ed\u5fc3\u7f51\u53cb，\u91c7\u7eb3\u7b54\u6848\u5373\u53ef\u83b7\u5f972\u7ecf\u9a8c\u503c。<a href='javascript:void(0);' onclick='clearTipsAndSetCookie(3);'>\u6211\u77e5\u9053\u4e86</a>";
break;
case 4:a="\u60a8\u8865\u5145\u7684\u5185\u5bb9\u63d0\u4ea4\u6210\u529f，\u9884\u8ba1\u5728"+auditTime+"\u5185\u5ba1\u6838\u5b8c\u6210，\u8bf7\u60a8\u8010\u5fc3\u7b49\u5f85。<a href='javascript:void(0);' onclick='document.location.reload();'>\u5237\u65b0</a>";
break;
case 5:a="\u60a8\u8ffd\u95ee\u7684\u5185\u5bb9\u63d0\u4ea4\u6210\u529f，\u9884\u8ba1\u5728"+auditTime+"\u5185\u5ba1\u6838\u5b8c\u6210，\u8bf7\u60a8\u8010\u5fc3\u7b49\u5f85。<a href='javascript:void(0);' onclick='document.location.reload();'>\u5237\u65b0</a>";
break
}if(b){b.innerHTML=a;
b.style.display="block"
}}function unDisplayTips(){var a=get("noticeTips");
if(a){a.style.display="none"
}}function clearTipsAndSetCookie(a){unDisplayTips();
setNoticeCookie(questionId,a)
}function setNoticeCookie(a,f){var c=Zhishi.Cookie.getCookie("ww_questionNoticeTips");
if(c.length<=0){c=a+","+f;
Zhishi.Cookie.setCookie("ww_questionNoticeTips",c);
return
}if(c.indexOf(a)<0){c+=";"+a+","+f
}else{var e=c.split(";");
if(e&&e.length>0){var d="";
for(var b=0;
b<e.length;
b++){if(e[b].indexOf(a)==0){e[b]+=f
}d+=e[b]
}c=d
}}Zhishi.Cookie.setCookie("ww_questionNoticeTips",c)
}function removeNoticeCookie(a){var c=Zhishi.Cookie.getCookie("ww_questionNoticeTips");
if(c.length<=0){return
}if(c.indexOf(a)<0){return
}else{var e=c.split(";");
if(e&&e.length>0){var d="";
for(var b=0;
b<e.length;
b++){if(e[b].indexOf(a)<0){d+=e[b]
}}c=d
}}Zhishi.Cookie.setCookie("ww_questionNoticeTips",c)
}function checkShow(e){var b=Zhishi.Cookie.getCookie("ww_questionNoticeTips");
if(b){if(b.indexOf(questionId)<0){return true
}else{var c=b.split(";");
if(c&&c.length>0){for(var a=0;
a<c.length;
a++){if(c[a].indexOf(questionId)==0){var d=c[a].split(",");
if(d&&d.length==2){if(d[1].indexOf(e)<0){return true
}}}}}}}else{return true
}return false
}function zzQzoneRainbow(a){zzQzoneDialog=new WW.U.Dialog({title:"\u8f6c\u8f7d\u5230QQ\u7a7a\u95f4",confirmValue:"\u8f6c\u8f7d",message:'<iframe id="zzQzoneRainbow" width="620" scrolling="no" height="401" frameborder="0" src="'+a+'"></iframe>',frameLoaded:function(){var b=get("zzQzoneRainbow");
if(!b.contentWindow.get("ZZQzone_submit")){return
}b.contentWindow.get("ZZQzone_submit").style.display="none";
b.contentWindow.get("ZZQzone_cancel").style.display="none";
b.style.height="360px"
},callback:function(c){var d=get("zzQzoneRainbow");
if(c){if(d){d.contentWindow.get("ZZQzone_submit").click();
Zhishi.Stats.ch("rainbow.wty.qzone");
return false
}}else{}}})
}function questionOperateRainbow(b,c,a,d){setTimeout(function(){questionOperateDialog=new WW.U.Dialog({title:c,message:'<iframe id="questionOperateRainbow"  width="'+a+'" scrolling="no" height="'+d+'"  frameborder="0" src="'+b+'"></iframe>',frameLoaded:function(){var e=get("questionOperateRainbow");
if(e.contentWindow.get("describeSubmit")){e.contentWindow.get("describeSubmit").style.display="none"
}else{e.contentWindow.get("notifySubmit").style.display="none"
}e.style.height=(d-60)+"px"
},callback:function(f){var e=get("questionOperateRainbow");
if(f){if(e){if(e.contentWindow.get("describeSubmit")){e.contentWindow.get("describeSubmit").click()
}else{e.contentWindow.get("notifySubmit").click()
}return false
}}else{questionOperateDialog.close()
}}})
},100)
}function addEditorRecommendRainbow(c,b){var a=new WW.U.Dialog({title:b+"\u786e\u8ba4",message:'<div  style="width:380px;"><div class="caihong_confirm_tips"  style="background:#FFF"><div class="icon dark"></div><div class="txt"><p><strong>\u786e\u5b9a\u8981'+b+"\u8be5\u95ee\u9898\u5417？</strong></p></div></div></div>",callback:function(d){if(d){Zhishi.Ajax.sendRequest("GET",c+"&r="+Math.random(),{onSuccess:function(e){a.close();
resultAlert(e,"green");
window.location.reload()
},onErr:function(){resultAlert(data,"yellow");
window.location.reload()
}})
}else{a.close()
}}})
}function resultAlert(c,b,a){new WW.U.Tips(b,c,"",false,{autoClose:2000,callback:function(){if(a){window.location.reload()
}}})
}function anonymousDialog(a,c){var b="\u63d0\u95ee";
if(c){b="\u56de\u7b54";
Zhishi.Stats.ch("2013ww.tw.twnm")
}else{Zhishi.Stats.ch("2013ww.tw.hdnm")
}callbackDialog("\u8bbe\u4e3a\u533f\u540d","<h3>\u786e\u5b9a\u5c06"+b+"\u8005\u8bbe\u4e3a\u533f\u540d\u5417？</h3><p>\u8be5\u95ee\u9898\u4e0d\u4f1a\u5728QQ、QQ\u7a7a\u95f4\u5c55\u793a，\u60a8\u7684\u597d\u53cb\u4e5f\u770b\u4e0d\u5230\u8fd9\u4e2a\u95ee\u9898。</p>",function(){anonymous(a,c)
})
}function showTeamAnswerMembersRainbow(b,a){setTimeout(function(){Zhishi.TeamCooperate.showTeamMemberDialog=new WW.U.Dialog({title:"\u5408\u4f5c\u56de\u7b54\u8005",type:"alert",message:'<iframe id="teamCooperateFrame" width="460" scrolling="no" style="background:#FFF"  height="380" frameborder="0" src="ShowTeamCooperateMembers.e?sp='+b+"&sp="+a+'"></iframe>',callback:function(c){}})
},100)
}function supplementQuestionRainbow(a){setTimeout(function(){if(a=="reward_con"){document.supplementQuestion.offerSupplement.checked=true;
document.supplementQuestion.broadcastSupplement.checked=false;
document.supplementQuestion.anonymousSupplement.checked=false
}if(a=="urgent_con"){document.supplementQuestion.broadcastSupplement.checked=true;
document.supplementQuestion.offerSupplement.checked=false;
document.supplementQuestion.anonymousSupplement.checked=false
}if(a=="anonymous"){document.supplementQuestion.anonymousSupplement.checked=true;
document.supplementQuestion.broadcastSupplement.checked=false;
document.supplementQuestion.offerSupplement.checked=false
}document.supplementQuestion.contentSupplement.checked=false;
Zhishi.Ajax.sendRequest("GET",Zhishi.loginStateUrl,{onSuccess:function(c){if(c=="1"){Zhishi.Validator.SupplementQuestion.submit(document.supplementQuestion)
}else{if(c=="0"){var d=get("supplementSubmitRB");
var b=Zhishi.Login.loginList.length;
d.setAttribute("wenwenid",b);
d.addClassName("login_norefresh");
Zhishi.Login.loginList[b]=function(){Zhishi.Validator.SupplementQuestion.submit(document.supplementQuestion)
};
Zhishi.Login.openLoginDialog(d);
return true
}}}})
},100)
}function clickRainbow(c){if(!c||c<=0){return
}if(Zhishi.SelectBestAnswer.answerNum<=0){return
}if(Zhishi.SelectBestAnswer.answerNum>1){if(Zhishi.SelectBestAnswer.bestAnswerHasSelectTwo){Zhishi.Stats.ch("wty.caina3");
var d=Zhishi.SelectBestAnswer.questionId;
var a=["{",'userId:"',0,'"',",questionId:",d,",answerId1:",Zhishi.SelectBestAnswer.answerId,",answerId2:",c,"}"].join("");
var b="/z/api/adopt/submit?format=json";
var e={onSuccess:Zhishi.SelectBestAnswer.refreshpage,para:d,contentType:"application/json; charset=UTF-8",postdata:a,raw:true};
Zhishi.Ajax.sendRequest("POST",b,e)
}else{Zhishi.SelectBestAnswer.twoAnswersDialog=new WW.U.Dialog({title:"\u786e\u8ba4\u91c7\u7eb3",confirmValue:"\u4ec5\u91c7\u7eb3\u8be5\u7b54\u6848",cancelValue:"\u7ee7\u7eed\u91c7\u7eb3\u7b2c\u4e8c\u4e2a",message:'<div  style="width:450px;"><div class="caihong_confirm_tips"  style="background:#FFF"><div class="icon dark"></div><div class="txt"><p><strong>\u786e\u5b9a\u4ec5\u91c7\u7eb3\u8be5\u7b54\u6848\u5417？</strong></p></div></div></div>',callback:function(f){if(f){Zhishi.Stats.ch("rainbow.wty.caina5");
selectFinishRainbow()
}else{Zhishi.Stats.ch("rainbow.wty.caina4");
var g=document.getElementById("b"+c);
if(g){g.className="choosed"
}Zhishi.SelectBestAnswer.bestAnswerHasSelectTwo=true;
var h='<strong>\u8be5\u7b54\u6848\u5df2\u88ab\u9009\u62e9，\u8bf7\u7ee7\u7eed\u9009\u62e9\u91c7\u7eb3\u7b2c\u4e8c\u4e2a\u7b54\u6848。</strong><a href="javascript:;" onclick="selectFinishRainbow();">\u4ec5\u91c7\u7eb3\u8be5\u7b54\u6848</a><a href="javascript:;" onclick="cancelSelect(this);">\u53d6\u6d88\u91c7\u7eb3</a>';
var i=document.createElement("div");
i.innerHTML=h;
i.className="answer_tips2";
g.parentNode.insertBefore(i,g)
}},addButton:[{value:"\u53d6\u6d88",event:{click:function(){Zhishi.Stats.ch("rainbow.wty.caina6");
Zhishi.SelectBestAnswer.twoAnswersDialog.close()
}}}]});
Zhishi.Stats.ch("wty.caina2")
}}else{Zhishi.Stats.ch("wty.caina1");
selectSendRequestRainbow(c,0)
}Zhishi.SelectBestAnswer.answerId=c
}function cancelSelect(b){var a=document.getElementById("b"+Zhishi.SelectBestAnswer.answerId);
if(a){a.className=""
}a.parentNode.removeChild(b.parentNode);
Zhishi.SelectBestAnswer.bestAnswerHasSelectTwo=false
}function zzQQRainbow(a){zzqqDialog=new WW.U.Dialog({title:"\u8f6c\u8f7d\u5230QQ\u8d44\u6599\u5361",confirmValue:"\u8f6c\u8f7d",message:'<iframe id="zzQQRainbow" width="380" scrolling="no" height="400" frameborder="0" src="'+a+'"></iframe>',frameLoaded:function(){var b=get("zzQQRainbow");
if(!b.contentWindow.get("zzQQSubmit")){return
}b.contentWindow.get("zzQQSubmit").style.display="none";
b.contentWindow.get("zzQQCancel").style.display="none";
b.style.height="400px"
},callback:function(c){var d=get("zzQQRainbow");
if(c){if(d){d.contentWindow.get("zzQQSubmit").click();
Zhishi.Stats.ch("rainbow.wty.qq");
return false
}}else{}}})
}function selectFinishRainbow(){Zhishi.Stats.ch("wty.caina2");
Zhishi.SelectBestAnswer.twoAnswersDialogClose=null;
selectSendRequestRainbow(Zhishi.SelectBestAnswer.answerId,0)
}function selectSendRequestRainbow(d,b){var e=Zhishi.SelectBestAnswer.questionId;
var a=["{",'userId:"',0,'"',",questionId:",e,",answerId1:",d,",answerId2:",b,"}"].join("");
var c="/z/api/adopt/submit?format=json";
var f={onSuccess:postCallBackRainbow,para:d,contentType:"application/json; charset=UTF-8",postdata:a,raw:true};
Zhishi.Ajax.sendRequest("POST",c,f)
}function postCallBackRainbow(jsonData,answerId1){var json=eval("("+jsonData+")");
if(json.success){evaluateAnswerRainbow(answerId1,false)
}else{var bt=document.getElementById("b"+answerId1);
if(bt){bt.value="\u91c7\u7eb3\u7b54\u6848";
bt.disabled=false
}}}function removeNoticeCookie(a){var c=Zhishi.Cookie.getCookie("ww_questionNoticeTips");
if(c.length<=0){return
}if(c.indexOf(a)<0){return
}else{var e=c.split(";");
if(e&&e.length>0){var d="";
for(var b=0;
b<e.length;
b++){if(e[b].indexOf(a)<0){d+=e[b]
}}c=d
}}Zhishi.Cookie.setCookie("ww_questionNoticeTips",c)
}function checkShow(e){var b=Zhishi.Cookie.getCookie("ww_questionNoticeTips");
if(b){if(b.indexOf(questionId)<0){return true
}else{var c=b.split(";");
if(c&&c.length>0){for(var a=0;
a<c.length;
a++){if(c[a].indexOf(questionId)==0){var d=c[a].split(",");
if(d&&d.length==2){if(d[1].indexOf(e)<0){return true
}}}}}}}else{return true
}return false
}function markATag(){var b=document.getElementsByTagName("a");
var f;
if(b&&b.length>0){for(var e=0;
e<b.length;
e++){f="";
if(b[e].ch){f=b[e].ch
}if(b[e].getAttribute("ch")){f=b[e].getAttribute("ch")
}if(f!=""){var c=b[e].href;
if(c.indexOf("javascript:")==0){continue
}var a=c.indexOf("?")<0?"?":"&";
var g="";
if(c.indexOf("#")>-1){g=c.substring(c.indexOf("#"),c.length);
c=c.substring(0,c.indexOf("#"))
}var d=b[e].innerHTML;
b[e].href=c+a+"ch="+f+g;
b[e].innerHTML=d
}}}}function loadData(){var c=get("stockDIV");
if(c){var b=title;
if(!b||title.trim().length==0){b=jQuery(".question_main .question_tit h3").text()
}if(b&&b.trim().length>0){var a="/z/api/stock?title="+encodeURIComponent(b);
Zhishi.Ajax.sendRequest("GET",a,{onSuccess:function(e){if(e&&e.length>0&&e.indexOf("stock")>=0){c.innerHTML=e;
c.style.display="block"
}}})
}}if(typeof(questionId)!="undefined"&&typeof(refererWords)!="undefined"){var d=null;
if(questionId){d="async/Async.htm?id=RelatedQuestionAndHelp&qid="+questionId+"&rw="+encodeURIComponent(refererWords)+"&r="+Math.random()
}else{d="async/Async.htm?id=RelatedQuestionAndHelp&qid=0&mqid="+maskQuestionId+"&rw="+encodeURIComponent(refererWords)+"&r="+Math.random()
}if($j("#RecommendedElite").length>0){d=d+"&tm=true"
}Zhishi.Ajax.sendRequest("GET",d,{onSuccess:function(f){if(f==null||f.length==0){return
}var e=get("loadData");
if(e){e.innerHTML=f;
$j("#QuestionRelatedRB").html($j("#lion_questionrelated").html());
if($j("#QuestionRelatedRB").children().length>0){$j("#QuestionRelatedRB").show()
}if(typeof(isQuestionPending)!="undefined"&&isQuestionPending!=null&&isQuestionPending=="false"){$j("#expertAndAppRight").append($j("#online_expert_list").html())
}if($j("#expertAndAppRight").children().size()>0){$j("#expertAndAppRight").show()
}$j("#OnlineExpertRB").html($j("#online_help_panel").html());
if($j("#OnlineExpertRB").children().length>0){$j("#OnlineExpertRB").show()
}$j("#RecommendedElite").html($j("#online_team_panel").html());
if($j("#RecommendedElite").children().length>0){$j("#RecommendedElite").show()
}$j("#RecommendedPendingQuestion").html($j("#lion_recommended_pending_question").html());
if($j("#RecommendedPendingQuestion").children().length>0){$j("#RecommendedPendingQuestion").show()
}$j("#RelatedQuestionRightRegion").html($j("#lion_related_question_right_region").html());
if($j("#RelatedQuestionRightRegion").children().length>0){$j("#RelatedQuestionRightRegion").show()
}$j("#otherQuestions").html($j("#lion_otherQuestions").html());
if($j("#otherQuestions").children().length>0){if($j("#relatedQuestions").length>0){$j("#otherQuestions h3").html("\u4f60\u4e5f\u53ef\u4ee5\u5e2e\u5e2e\u4ed6\u4eba，\u8fd9\u4e9b\u95ee\u9898\u5728\u7b49\u4f60\u56de\u7b54")
}$j("#otherQuestions li").each(function(g){var h=new Number(g);
if(h>6){$j(this).hide()
}else{$j(this).show()
}});
QuickAnswer.onQuickQuestionHover();
$j("#otherQuestions").show()
}$j("#relatedQuestions").html($j("#lion_relatedQuestions").html());
if($j("#relatedQuestions").children().length>0){$j("#relatedQuestions").show()
}}}})
}}function loadDiscuzRelative(){if(siteId==null||siteId==""){return
}var a="async/Async.htm?id=DiscuzRelative&qid="+questionId+"&siteId="+siteId+"&appName="+encodeURIComponent(appName)+"&url="+encodeURIComponent(url);
Zhishi.Ajax.sendRequest("GET",a,{onSuccess:function(b){if(b==null||b.length==0){return
}if(get("discuz_relative_div")){get("discuz_relative_div").innerHTML=b
}}})
}function loadOpenRelative(){if(questionTitle==null||questionTitle==""){return
}var a="/open_related_search?w="+encodeURIComponent(questionTitle)+"&site="+encodeURIComponent(siteurl)+"&cid=o.wenwen&t="+new Date().getTime();
$j.ajax({url:a,type:"GET",dataType:"xml",success:function(e){var d=$j(e).find("Result_List");
if(d.text()==""){return
}var c=new RegExp("(<em>|</em>)","g");
var b=$j("#open_relative_ul");
b.html("");
d.each(function(){var f=$j(this).find("Item");
if(f.length<3){return false
}var g=0;
var h={};
f.each(function(k){if(g>=3){return false
}var l=$j(this).children("title").text();
var j=$j(this).children("url").text();
if(l==""||j==""){return true
}if(j.indexOf(siteurl)==-1){return true
}l=l.replace(c,"");
if(l.length<=12||l==questionTitle){return true
}var m=typeof(l)+l;
if(h[m]!==1){b.append('<li><a href="'+j+'" target="_blank" apporig="'+questionOrig+'">'+l+"</a>");
g++;
h[m]=1
}});
if(g<3){b.html("")
}});
if(b.html()!=""){$j("#open_relative_div").show()
}},error:function(b){$j("#open_relative_div").hide()
}})
}function getByteLen(d){var a=0;
for(var b=0;
b<d.length;
b++){var c=d.substring(b,b+1);
if(c.match(/[^\x00-\xff]/ig)!=null){a+=2
}else{a+=1
}}return a
}function submitContent(l,n,c,m){if(l&&n){var b=get(l);
var h=get(n);
if(b&&h){b.value=Editor.getValue();
if(m==1){var d=get("userTime");
if(d){d.value=new Date().getTime()-startTimer
}}if(m==2){var a=document.getElementsByTagName("input");
var g;
for(var e=0;
e<a.length;
e++){if(a[e].getAttribute("name")=="contentSupplement"){g=a[e];
break
}}if(g){g.value="T"
}}if(m==4){var j=get("contentSupplement");
if(j){j.value="T"
}}var f=get(c);
var k=Editor.getPlainTextValue();
if(f&&(k==""||trim(k)=="")){f.innerHTML="\u60a8\u8fd8\u6ca1\u6709\u8f93\u5165\u4efb\u4f55\u5185\u5bb9！";
f.addClassName("field_err");
f.style.display="block";
return false
}if(f&&k.length>20000){f.innerHTML="\u60a8\u8f93\u5165\u7684\u5185\u5bb9\u8fc7\u591a，\u8bf7\u5220\u51cf";
f.addClassName("field_err");
f.style.display="block";
return false
}h.submit()
}}}function onTeamCooperate(c,a){var b=a+"Label";
if(c){if(c.checked){get(a).style.display="inline";
get(b).style.display="inline"
}else{get(a).style.display="none";
get(b).style.display="none"
}}}function initAnswerQuestion(c,a){Editor.init(c,{height:114,width:660});
var b=get(a);
if(b){Editor.onCtrlEnter=function(){b.click()
}
}if(get(c)){visibleElem=get(c).parentNode.parentNode;
var d=function(){if(Editor.getSelf()!=null){var e=Editor.getPlainTextValue().trim();
var f=Editor.hasImage();
var g=Editor.iframe.contentWindow.document.getElementsByTagName("span");
if((e!=""||f)&&Editor.id=="myAnswerContent"&&!Zhishi.Validator.AnswerQuestion.clickSubmitButton){if(e!=""){if(g.length==0||g[0].className!="defaultValue"){return"【\u63d0\u793a】\u672a\u4fdd\u5b58\u7684\u5185\u5bb9\u5c06\u4f1a\u4e22\u5931"
}}else{return"【\u63d0\u793a】\u672a\u4fdd\u5b58\u7684\u5185\u5bb9\u5c06\u4f1a\u4e22\u5931"
}}}};
window.onbeforeunload=d
}}function onBeforeSubmitQuestionSupplementContent(a){Zhishi.Ajax.sendRequest("GET",Zhishi.loginStateUrl,{onSuccess:function(c){if(c=="1"){document.supplementQuestion.mySupplementContent.value=Editor.getValue();
document.supplementQuestion.editorStats.value=Editor.Util.getCountInfo();
document.supplementQuestion.contentSupplement.value="T";
document.supplementQuestion.submit()
}else{if(c=="0"){var d=get("supplementSubmitRB");
var b=Zhishi.Login.loginList.length;
d.setAttribute("wenwenid",b);
d.addClassName("login_norefresh");
Zhishi.Login.loginList[b]=function(){document.supplementQuestion.mySupplementContent.value=Editor.getValue();
document.supplementQuestion.editorStats.value=Editor.Util.getCountInfo();
document.supplementQuestion.contentSupplement.value="T";
document.supplementQuestion.submit()
};
Zhishi.Login.openLoginDialog(d);
return true
}}}})
}function supplementContentRequired(){var a=document.supplementQuestion;
if(Editor.id=="mySupplementContent"&&(Editor.getPlainTextValue().trim()==""&&!Editor.hasImage())){a.mySupplementContent.value="";
return false
}return true
}function supplementAnswerRequired(){if(document.answerSupplementForm&&document.answerSupplementForm.contentSupplement){if(Editor.getPlainTextValue().trim()==""&&!Editor.hasImage()){return false
}else{document.answerSupplementForm.answerSupplementContent.value=Editor.getValue();
document.answerSupplementForm.editorStats.value=Editor.Util.getCountInfo();
document.answerSupplementForm.useTime1.value=Editor.Util.getEditorTime()
}}return true
}function onBeforeSubmitAnswerSupplementContent(a){Zhishi.Ajax.sendRequest("GET",Zhishi.loginStateUrl,{onSuccess:function(c){if(c=="1"){document.answerSupplementForm.answerSupplementContent.value=Editor.getValue();
document.answerSupplementForm.editorStats.value=Editor.Util.getCountInfo();
document.answerSupplementForm.useTime1.value=Editor.Util.getEditorTime();
document.answerSupplementForm.contentSupplement.value="T";
document.answerSupplementForm.submit()
}else{if(c=="0"){var d=get("supplementSubmit");
var b=Zhishi.Login.loginList.length;
d.setAttribute("wenwenid",b);
d.addClassName("login_norefresh");
Zhishi.Login.loginList[b]=function(){document.answerSupplementForm.answerSupplementContent.value=Editor.getValue();
document.answerSupplementForm.editorStats.value=Editor.Util.getCountInfo();
document.answerSupplementForm.useTime1.value=Editor.Util.getEditorTime();
document.answerSupplementForm.contentSupplement.value="T";
document.answerSupplementForm.submit()
};
Zhishi.Login.openLoginDialog(d);
return true
}}}})
}function onAnswerSupplement(a,d){if(get("supplement_content").style.display=="none"){if(d){var b=d.parentNode;
if(b){get(b).addClassName("current")
}}if(a){if(visibleElem&&get("answerAreaDiv")){var c=Editor.getSelf();
c.parentNode.removeChild(c);
get("answerAreaDiv").style.display="none"
}}if(get("anonymous_content")){get("anonymous_content").style.display="none"
}if(get("answerAnonymouseLink")){get("answerAnonymouseLink").parentNode.className=""
}Editor.init("answerSupplementContent",{height:114,width:660});
visibleElem=get("answerSupplementContent").parentNode.parentNode;
if(get("supplementSubmit")){Editor.onCtrlEnter=function(){get("supplementSubmit").click()
}
}get("supplement_content").style.display="block";
setTimeout(function(){Editor.focus()
},300);
Zhishi.Stats.ch("rainbow.wty.bchd");
document.answerSupplementForm.contentSupplement.checked=true
}else{if(d){var b=d.parentNode;
if(b){get(b).removeClassName("current")
}}get("supplement_content").style.display="none";
if(a){if(visibleElem){var c=Editor.getSelf();
if(c){c.parentNode.removeChild(c)
}}initAnswerQuestion("myAnswerContent")
}}}function createNew(b,a){Editor.init(b,{height:114,width:609});
visibleElem=a;
setTimeout(function(){Editor.focus()
},300)
}function onFollowAsk(c,g,b,f){Zhishi.Stats.ch("2013ww.tw.zw");
f=get(f);
if(get(g).style.display=="block"){hideLayer(get(g),function(){},true);
Editor.unFocus();
f.removeClassName("current");
f.removeClassName("up");
f.addClassName("down");
followAskLinkObjNow=null
}else{f.addClassName("current");
f.removeClassName("down");
f.addClassName("up");
if(followAskLinkObjNow!=null&&followAskLinkObjNow!=f){followAskLinkObjNow.removeClassName("current")
}followAskLinkObjNow=f;
if(get(c)){var d=Editor.getSelf(),e=get(c).parentNode;
if(visibleElem){if(visibleElem!=e){if(visibleElem==get("mySupplementContent").parentNode){var a=get("scLink");
if(a&&a.parentNode){a.parentNode.className=""
}hideOperateContent()
}visibleElem.style.display="none";
Editor.getSelf().parentNode.removeChild(Editor.getSelf());
createNew(c,e);
showLayer(get(g),function(){},true,250);
if(get(b)){Editor.onCtrlEnter=function(){get(b).click()
}
}}else{showLayer(get(g),function(){},true,250);
setTimeout(function(){Editor.focus()
},300)
}}else{if(!d){createNew(c,e)
}showLayer(get(g),function(){},true,250);
if(get(b)){Editor.onCtrlEnter=function(){get(b).click()
}
}}}else{get(g).style.display="block"
}if(content_id_now=="showSC"){content_id_now=""
}Zhishi.Stats.ch("rainbow.wty.zhuiwen1")
}}function callbackDialog(b,e,d){var a=new WW.U.Dialog({title:b,message:'<div class="dialog_con"><div class="tip_ensure">'+e+"</div></div>",callback:function(c){if(c){d()
}else{a.close()
}}});
return false
}function addFavouriteRB(fav_url,successCallback){Zhishi.Ajax.sendRequest("GET",fav_url+"&r="+Math.random(),{onSuccess:function(data){if(!data){data=""
}var json=eval("("+data+")");
if(json.result){successCallback()
}else{new WW.U.Tips("yellow",json.message,'<div  style="width:130px;">\u8bf7\u7a0d\u5019\u91cd\u8bd5。</div>',false,{autoClose:2000,callback:function(){window.location.reload()
}})
}}})
}function init_opruser(){$j("#q_rainbow_toteam").click(function(){callbackDialog("\u8f6c\u79fb\u95ee\u9898\u5230\u56e2\u961f","<h3>\u786e\u5b9a\u5c06\u8be5\u95ee\u9898\u8f6c\u79fb\u5230\u56e2\u961f\u5417？</h3><p>\u8f6c\u79fb\u540e\u95ee\u9898\u5c06\u663e\u793a\u5728\u56e2\u961f\u4e3b\u9875，\u53ef\u5438\u5f15\u66f4\u591a\u56e2\u5458\u6765\u56de\u7b54。</p>",function(){var a="/z/WenwenAjaxEvent.e?sp=31&sp="+Zhishi.questionId;
Zhishi.Ajax.sendRequest("GET",a+"&r="+Math.random(),{onSuccess:function(b){setTimeout(function(){$j("#team_li span").removeClass("ico_group").addClass("ico_transfer");
$j("#team_li a").replaceWith("<span> \u5df2\u8f6c\u79fb\u5230\u56e2\u961f</span>")
},100)
}})
})
})
}function init_share(){$j(".share_wrap .icon_qzone").click(function(){Zhishi.Stats.ch("2013ww.tw.fxqzone");
$j(this).addClass("login_norefresh");
var a=$j(this).attr("qzoneurl");
Zhishi.Login.clickMe($j(this)[0],function(){zzQzoneRainbow(a)
})
});
$j(".share_wrap .icon_tx_weibo").click(function(){Zhishi.Stats.ch("2013ww.tw.fxt");
$j(this).addClass("login_norefresh");
Zhishi.Login.clickMe($j(this)[0],function(){toMicBlog()
})
});
$j(".share_wrap .icon_pengyou").click(function(){postToPengyou();
return false
});
$j(".share_wrap .icon_sina_weibo").click(function(){Zhishi.Stats.ch("2013ww.tw.fxweibo");
postToSina();
return false
});
$j(".share_wrap .icon_renren").click(function(){postToRR();
return false
});
$j(".share_wrap .icon_douban").click(function(){postToDB();
return false
})
}function init_collect(){$j("a[collecturl]").click(function(){Zhishi.Stats.ch("2013ww.tw.sc");
var d=$j(this);
$j(this).addClass("login_norefresh");
var b=$j(this).attr("collecturl");
var a=$j(this).attr("collected");
var c=$j(this)[0];
Zhishi.Ajax.sendRequest("GET",Zhishi.loginStateUrl,{onSuccess:function(e){if(e=="1"){addFavouriteRB(b+"&rainbow=on",function(){if(a=="1"){d.attr("collected",0);
d.text("\u6536\u85cf\u95ee\u9898")
}else{d.replaceWith('<span class="collected">\u5df2\u6536\u85cf</span>')
}})
}else{Zhishi.Login.clickMe(c,function(){addFavouriteRB(b,function(){window.location.reload()
})
})
}}})
})
}function raiseOffer(){Zhishi.Stats.ch("2013ww.tw.zjxs");
setTimeout(function(){var a=document.supplementQuestion;
a.offerSupplement.checked=true;
a.contentSupplement.checked=false;
Zhishi.Ajax.sendRequest("GET",Zhishi.loginStateUrl,{onSuccess:function(d){if(d=="1"){var c={questionid:a.questionId1.value,offeredscore:a.scoreAmount.value};
Zhishi.OpenApi.submitQuestionSupplement(c,function(f){if(f.success){Zhishi.Stats.ch("2013ww.tw.zjxs.ok");
setTimeout(function(){new Base.U.Tips("green","\u8ffd\u52a0\u60ac\u8d4f\u6210\u529f！","",true,{autoClose:3000})
},300)
}document.location.reload()
})
}else{if(d=="0"){var e=get("supplementSubmitRB");
var b=Zhishi.Login.loginList.length;
e.setAttribute("wenwenid",b);
e.addClassName("login_norefresh");
Zhishi.Login.loginList[b]=function(){Zhishi.Validator.SupplementQuestion.submit(document.supplementQuestion)
};
Zhishi.Login.openLoginDialog(e);
return true
}}}})
},100)
}function setUrgent(){Zhishi.Stats.ch("2013ww.tw.szjj");
setTimeout(function(){var a=document.supplementQuestion;
a.broadcastSupplement.checked=true;
a.contentSupplement.checked=false;
Zhishi.Ajax.sendRequest("GET",Zhishi.loginStateUrl,{onSuccess:function(d){if(d=="1"){var c={questionid:a.questionId1.value,broadcast:true};
Zhishi.OpenApi.submitQuestionSupplement(c,function(f){if(f.success){Zhishi.Stats.ch("2013ww.tw.szjj.ok");
setTimeout(function(){new Base.U.Tips("green","\u8bbe\u4e3a\u7d27\u6025\u6210\u529f！","",true,{autoClose:3000})
},300)
}document.location.reload()
})
}else{if(d=="0"){var e=get("supplementSubmitRB");
var b=Zhishi.Login.loginList.length;
e.setAttribute("wenwenid",b);
e.addClassName("login_norefresh");
Zhishi.Login.loginList[b]=function(){Zhishi.Validator.SupplementQuestion.submit(document.supplementQuestion)
};
Zhishi.Login.openLoginDialog(e);
return true
}}}})
},100)
}function afterQuestionSupplement(){hideOperateContent();
new Base.U.Tips("green","\u8865\u5145\u95ee\u9898\u6210\u529f！","",true,{autoClose:3000});
if(document.supplementQuestion.origTmpId.value>0){document.location="/z/q"+document.supplementQuestion.questionId1.value+".htm"
}}function nextPatch(){Zhishi.Stats.ch("2013ww.tw.hyp");
Zhishi.Ajax.sendRequest("GET",Zhishi.loginStateUrl,{onSuccess:function(a){if(a=="1"){var b="OtherQuestionsPatch.e";
var c={onSuccess:function(d){if(d==null||d.length==0){return
}$j("#otherQuestionsCache").html(d);
$j("#otherQuestionsUp").html($j("#upPatch").html());
$j("#otherQuestionsDown").html($j("#downPatch").html());
if($j("#otherQuestionsUp").children().length==0){$j("#otherQuestionsUp").hide()
}if($j("#otherQuestionsDown").children().length==0){$j("#otherQuestionsDown").hide()
}$j("#otherQuestions li").each(function(e){var f=new Number(e);
if(f>6){$j(this).hide()
}else{$j(this).show()
}});
QuickAnswer.onQuickQuestionHover()
},para:"",contentType:"application/json; charset=UTF-8",raw:true};
Zhishi.Ajax.sendRequest("GET",b,c)
}else{Zhishi.Login.clickMe($j("#otherQuestionsCache")[0],function(){window.location.reload()
})
}}})
}function adopt(a){if(!a||a<=0){return
}if(Zhishi.SelectBestAnswer.answerNum<=0){return
}if(Zhishi.SelectBestAnswer.answerNum>0){showAdoptDialog();
Zhishi.Stats.ch("2013ww.tw.cn")
}Zhishi.SelectBestAnswer.answerId=a
}function syncToWeiboSucc(){new Base.U.Tips("green","\u540c\u6b65\u6210\u529f！","",true,{autoClose:3000});
jQuery("#sync2weiboSpan").remove()
}function initReportUrl(){}function initAnswerQuestionBox(a){if(a){initAnswerQuestion("myAnswerContent","answerSubmit");
setTimeout(function(){try{Editor.focus()
}catch(b){}},300)
}else{jQuery("#firstAnswerBoxBtn").removeClass("answer_current");
jQuery("#answerAreaDiv").hide()
}}function toggleAnswerQuestionBox(){var a=jQuery("#firstAnswerBoxBtn");
if(a.hasClass("answer_current")){a.removeClass("answer_current");
jQuery("#answerAreaDiv").hide()
}else{var c=$j("#supplementAnswerBtn");
if(c&&c.hasClass("answer_current")){toggleAnswerSupplementBox()
}if(visibleElem&&visibleElem.id!="answerQuestion"){var b=Editor.getSelf();
if(b){b.parentNode.removeChild(b)
}}initAnswerQuestion("myAnswerContent","answerSubmit");
a.addClass("answer_current");
jQuery("#answerAreaDiv").show();
setTimeout(function(){try{Editor.focus()
}catch(d){}},500)
}}function toggleAnswerSupplementBox(){Zhishi.Stats.ch("2013ww.tw.bchd");
var b=$j("#supplementAnswerBtn");
b.toggleClass("answer_current");
if(b.hasClass("answer_current")){var a=jQuery("#firstAnswerBoxBtn");
if(a.hasClass("answer_current")){a.removeClass("answer_current")
}if($j("#answerAreaDiv")){onAnswerSupplement(true,$j("#answerSupplementLink"))
}else{$j("#supplement_content").toggle();
setTimeout(function(){try{Editor.focus()
}catch(c){}},300)
}}else{$j("#supplement_content").toggle()
}}function init_thank_best(){jQuery(".orange_button_wrap a[aid]").click(function(){Zhishi.Stats.ch("2013ww.tw.sh2");
var d=jQuery(this);
var c=d.attr("aid");
var b=jQuery("#thankswords_"+c).val();
b=jQuery.trim(b);
var e=(function(f){d.siblings("div.field_err").text(f).show()
});
if(!Zhishi.SelectBestAnswer.validateInput(b,e)){return false
}if(c&&c>0){var a={questionId:Zhishi.questionId,answerId:c,answerMsg:b,answerGift:41271};
Zhishi.OpenApi.submitAnswerEvaluated(a,function(f){if(f.reason==-12){e("\u4f60\u8f93\u5165\u7684\u90e8\u5206\u5185\u5bb9\u4e0d\u5408\u6cd5，\u4f60\u61c2\u7684");
return false
}if(f.success){setTimeout(function(){window.location.reload()
},300)
}})
}return false
})
}function init_report(){jQuery("#reportEffectArea").hover(function(){jQuery(this).addClass("info_wrap_hover").find(".report").show()
},function(){jQuery(this).removeClass("info_wrap_hover").find(".report").hide()
});
jQuery(".satisfaction_answer").hover(function(){jQuery(this).find(".sign_link").show()
},function(){jQuery(this).find(".sign_link").hide()
}).find(".sign_wrap").hover(function(){jQuery(this).find("p:has(.report)").addClass("p_hover").find(".report").show()
},function(){jQuery(this).find("p").removeClass("p_hover").find(".report").hide()
}).find("a[weibo]").click(function(){var a=jQuery(this);
a.addClass("login_norefresh");
Zhishi.Ajax.sendRequest("GET",Zhishi.loginStateUrl,{onSuccess:function(b){if(b=="1"){questionWeibo.addWeibo(a,a.attr("weibo"),a.attr("param"))
}else{Zhishi.Login.clickMe(a[0],function(){questionWeibo.addWeibo(null,a.attr("weibo"),a.attr("param"))
})
}}})
})
}window.onscroll=function(){var c=document.getElementById("scrollToTop");
if(!c){return
}var b=typeof window.pageYOffset=="undefined"?document.documentElement.scrollTop:window.pageYOffset;
var a=980;
if(jQuery(".resolved_question").length>0){a=1300
}if(b>(a-document.documentElement.clientHeight)){c.style.display="block"
}else{c.style.display="none"
}};
function fixDiscuzLogoSize(f,e,b){if(f>40||e>40){if(f>e&&f>40){var a=parseInt(e*40/f);
var d=(40-a)/2;
b.css("width","40px");
b.css("height",a+"px");
b.css("padding-top",d+"px");
b.css("padding-bottom",d+"px")
}if(f<e&&e>40){var c=parseInt(f*40/e);
var d=(40-c)/2;
b.css("width",c+"px");
b.css("height","40px");
b.css("padding-left",d+"px");
b.css("padding-right",d+"px")
}}b.attr("loaded",1)
}function init_discuzLogo(){jQuery("img[from=app][loaded!=1]").each(function(){var a=jQuery(this);
var b=new Image();
b.src=a.prop("src");
if(b.complete){fixDiscuzLogoSize(b.width,b.height,a)
}else{b.onload=function(){fixDiscuzLogoSize(this.width,this.height,a);
this.onload=null
}
}})
}if(jQuery.browser.webkit){jQuery(window).load(function(){init_discuzLogo()
})
}function init_innerLink(){if(jQuery(".resolved_question .satisfaction_answer").length>0){var d=parseInt(questionId);
var b=d*3;
var c=null;
var a=0;
if(d>0&&d<150000000){c="/z/markLinkInfo2?questionId="+questionId
}else{if(d>=300000000&&d<450000000){c="/z/markLinkInfo3?questionId="+questionId
}else{c="/z/markLinkInfo?questionId="+questionId
}}jQuery(".resolved_question .satisfaction_answer div.mod_operate").each(function(){if($j(this).siblings(".ico_complete_answer").length==0){a++;
c+="&rid"+a+"="+jQuery(this).attr("aid");
b+=parseInt(jQuery(this).attr("aid"))
}});
c+="&sign="+b+"&r="+Math.random();
jQuery.getJSON(c,function(f){if(f&&f.questionId==questionId&&f.status==0){var e=gets(".resolved_question .satisfaction_answer");
if((f.content1||f.content2)&&e&&e.length>0){e[0].setAttribute("ss_c","showlink20120508");
if(f.content1){markLink(new Array(e[0]),f.content1)
}if(f.content2&&e.length>1){e[1].setAttribute("ss_c","showlink20120508");
markLink(new Array(e[1]),f.content2)
}}}})
}}function init_discuz_stat(){$j("a.thirdAppLink,a.thirdAppUserLink").live("click",function(){var a="/stqb/orig.php?type=2&orig="+$j(this).attr("apporig");
Zhishi.Ajax.sendRequest("GET",a,{onSuccess:function(b){}})
});
$j("#discuz_question").find("ul a").live("click",function(){var a="/stqb/orig.php?type=3&orig="+$j(this).attr("apporig");
Zhishi.Ajax.sendRequest("GET",a,{onSuccess:function(b){}})
}).end().find("a.more_question").add("#discuz_keywords a").live("click",function(){var a="/stqb/orig.php?type=4&orig="+$j(this).attr("apporig");
Zhishi.Ajax.sendRequest("GET",a,{onSuccess:function(b){}})
})
};$j=jQuery;
var questionWeibo={alreadyFans:false,starType:["\u661f\u661f","\u84dd\u661f","\u7d2b\u661f","\u7ea2\u661f"],errormsg:["\u6210\u529f","\u53c2\u6570\u9519\u8bef","\u9891\u7387\u53d7\u9650","\u9274\u6743\u5931\u8d25","\u670d\u52a1\u5668\u5185\u90e8\u9519\u8bef","\u7528\u6237\u8bef\u64cd\u4f5c","\u8be5\u8d26\u53f7\u672a\u5f00\u901a\u5fae\u535a","\u672a\u5b9e\u540d\u8ba4\u8bc1"],getUrl:"/z/async/Async.htm?id=AnswerAuthorWeibo",showErrorMsg:function(a,b){new WW.U.Tips("yellow","\u63d0\u793a",'<div  style="width:130px;">'+a+"</div>",false,{autoClose:2000,callback:function(){if(typeof(b)=="function"){b()
}else{if(!b){window.location.reload()
}}}})
},showMessage:function(a,b){new WW.U.Tips("green","\u63d0\u793a",'<div  style="width:130px;">'+a+"</div>",false,{autoClose:2000,callback:function(){if(typeof(b)=="function"){b()
}else{if(!b){window.location.reload()
}}}})
},addWeibo:function(c,a,b){jQuery.getJSON("/z/async/Async.htm?id=WeiboFollowRes&name="+a+"&param="+b,{},function(d){if(d.ret==0){if(c){c.replaceWith("<span>\u5df2\u6536\u542c</span>")
}questionWeibo.showMessage("\u6536\u542c\u6210\u529f",c)
}else{if(d.errcode==80103){questionWeibo.showErrorMsg("\u60a8\u5df2\u6536\u542cTA",c)
}else{questionWeibo.showErrorMsg(questionWeibo.errormsg[d.ret],c)
}}})
},redirectToAskHelp:function(b){var a="/z/Ask.e?sp=S&sp=1018&sp=S"+b;
window.open(a)
},addAnsMouseEvent:function(a,f,e,g,b,c){var i=$j("#ans_user_card_name"+a),j=$j("#ans_user_card"+a),h,k,d;
evaluateFlag=false;
i.mouseenter(function(){$j("div[id^=ans_user_card].user_card").hide();
clearTimeout(k);
d=setTimeout(function(){$j("div[id^=ans_user_card].user_card").hide();
$j(".column1").css("z-index",99);
questionWeibo.retriveUserWeiboInfo(a,e,g,b,c)
},200)
}).mouseleave(function(){clearTimeout(d);
h=setTimeout(function(){$j(".column1").attr("style","");
$j(".column1").removeAttr("style");
j.fadeOut("fast")
},300)
});
j.mouseenter(function(){clearTimeout(h)
}).mouseleave(function(){k=setTimeout(function(){$j(".column1").attr("style","");
$j(".column1").removeAttr("style");
j.fadeOut("fast")
},300)
})
},retriveUserWeiboInfo:function(aid,uid,cid,urank,fromWeibo){var $card=$j("#ans_user_card"+aid);
if($card.size()==0){return
}if($card.children().size()>0){$card.css("top",-1*$card.outerHeight()-10);
$card.fadeIn();
return
}var wb="";
if(fromWeibo){wb="true"
}Zhishi.Ajax.sendRequest("GET",questionWeibo.getUrl+"&u="+uid+"&aid="+aid+"&cid="+cid+"&urank="+urank+"&wb="+wb,{onSuccess:function(d){d=eval("("+d+")");
if(d){var html="";
html+='<div class="mod_card_info">';
html+='<a class="mod_card_avater" href="/z/ShowUser.e?sp='+d.uid+'" target="_blank"><i></i><img src="'+d.headImage+'" width="70" height="70"/></a>';
html+="<ul>";
html+='<li class="mod_card_name"><a href="/z/ShowUser.e?sp='+d.uid+'" target="_blank">'+d.uname+"</a>";
if(d.expertUser){html+='<i class="ico '+d.expertIconClass+'" title="'+d.expertLevelName+'" ></i>';
if(d.weiboUser){html+='<i class="ico ico_weibo" title="\u6765\u81ea\u817e\u8baf\u5fae\u535a"></i>'
}if(d.weiboVip){html+='<i class="ico ico_wbrz" title="\u5fae\u535a\u5df2\u8ba4\u8bc1"></i>'
}}else{if(d.level>0){html+='<i class="ico ico_lv'+d.level+'" title="'+d.levelName+'" ></i>';
if(d.starUser){if(d.starType>=1&&d.starType<=3){html+='<i class="ico ico_dr'+d.starType+'" title="'+questionWeibo.starType[d.starType]+'\u8fbe\u4eba"></i>'
}}}}html+="</li>";
html+='<li class="mod_card_btn">';
if(d.canP2pAsk){html+='<a href="/z/Ask.e?sp=S&sp=1018&sp=S'+d.uid+'"  target="_blank">\u5411TA\u63d0\u95ee</a>'
}else{html+='<a href="javascript:void(0);" class="btn_disable">\u5411TA\u63d0\u95ee</a>'
}html+="</li>";
html+="</ul></div>";
html+='<ul class="mod_card_list">';
html+='<li class="mod_card_num"><span>\u91c7\u7eb3\u7387：'+d.adoptedRate+"%</span><span>\u6ee1\u610f\u7b54\u6848："+d.adoptedNum+"</span></li>";
if(!d.notHasCategory){html+='<li class="mod_card_tag">\u64c5\u957f：';
for(var i=0;
i<d.categorys.length;
i++){html+='<a href="'+d.categorys[i].categoryUrl+'" target="_blank">'+d.categorys[i].name+"</a>"
}html+="</li>"
}if(d.expertUser&&d.expertDesc){html+='<li class="mod_card_intro" title="'+d.expertDesc+'" >\u7b80\u4ecb：'+questionWeibo.getProperString(d.expertDesc,19)+"</li>"
}else{if(d.introduction){html+='<li class="mod_card_intro" title="'+d.introduction+'" >\u7b80\u4ecb：'+questionWeibo.getProperString(d.introduction,19)+"</li>"
}}html+="</ul>";
html+='<span class="mod_card_bd"></span>';
$card.html(html);
$j("#ans_weibo_follow"+aid).click(function(){Zhishi.Ajax.sendRequest("GET",Zhishi.loginStateUrl,{onSuccess:function(jsonData){if(jsonData=="1"){questionWeibo.addWeibo("ans_weibo_follow"+aid,d.weiboName,d.param)
}if(jsonData=="0"){var callBack=get("ans_weibo_follow"+aid);
var len=Zhishi.Login.loginList.length;
callBack.setAttribute("wenwenid",len);
callBack.addClassName("login_norefresh");
Zhishi.Login.loginList[len]=function(){questionWeibo.addWeibo("ans_weibo_follow"+aid,d.weiboName,d.param)
};
Zhishi.Login.openLoginDialog(callBack)
}}})
});
$card.css("top",-1*$card.outerHeight()-10);
$card.fadeIn()
}}})
},syncToWeibo:function(questionId){Zhishi.Stats.ch("2013ww.tw.tbwb");
var url="/z/WenwenAjaxEvent.e?sp=35&sp="+questionId+"&rnd="+Math.random();
jQuery.get(url,function(response){if(response&&response.length>6){var json=eval("("+response+")");
var data=json[0];
if(data=="0"){syncToWeiboSucc()
}}})
},getProperString:function(b,a){if(b&&b.length>a){return b.substring(0,a-1)+"..."
}return b
}};
var answerComment={nonsenseList:new Array("\u4e0d\u77e5\u9053","rt","\u8def\u8fc7","ding","\u9876","\u6211\u6765\u56de\u7b54...","\u8bf7\u8f93\u5165\u4f60\u7684\u7b54\u6848..."),CONTENT_PATTERN:new RegExp(".*[^ -/:-@[-`{-~\t\r\n。，？！、；：“”‘’·§◎＃％…※—￥《》（）【】『』＋－×÷＝～].*"),MAX_LENGTH:140,commentDialogHandle:function(h,i,c,g,a){if(typeof i==undefined||i==0){return
}c=c|false;
g=g|0;
var e=h.attr("loaded");
if(e=="1"){var f=c?h.parent().parent().siblings(".evaluation_list"):h.siblings(".evaluation_list");
if(f.is(":visible")){f.slideUp(300)
}else{f.slideDown(300);
var d=f.find(".replay_area");
var j=d.find("textarea");
answerComment.focusOnEnd(j)
}}else{var b=c?h.parent().parent().parent():h.parent();
jQuery.get("AnswerComment.htm",{aid:i,pg:g,rnd:Math.random()},function(q){var o=b.children(".evaluation_list");
if(o.length>0){o.remove()
}if(c){h.parent().parent().after(q)
}else{b.append(q)
}var m=b.children(".evaluation_list");
var r=m.find(".replay_area");
var l=r.find("textarea");
var k=m.find(".reply_bt");
var n=m.children(".reply_con");
var p=k.siblings(".error_tips");
if(m.find(".pagination").length==0){n.find("li:last").addClass("last")
}l.blur(function(){r.removeClass("textarea_focus")
}).focus(function(){r.addClass("textarea_focus")
}).keyup(function(){var s=l.val().trim();
if(s.length==0){k.addClass("reply_disabled")
}else{if(s.length>0&&s.length<=answerComment.MAX_LENGTH){k.removeClass("reply_disabled");
p.hide()
}}if(s.length>43){l.addClass("textarea_auto");
if(s.length>answerComment.MAX_LENGTH){l.val(s.substring(0,140));
p.html('<span class="i_error_tip"></span>\u6700\u591a\u8f93\u5165140\u5b57').show()
}}else{l.removeClass("textarea_auto")
}});
k.click(function(){var t=jQuery(this);
if(t.hasClass("reply_disabled")){return
}var u=l.val().trim();
if(u.length==0){p.html("<span class='i_error_tip'></span>\u8bf7\u8f93\u5165\u8bc4\u8bba\u5185\u5bb9\u54e6").show();
return false
}if(u.length>answerComment.MAX_LENGTH){p.html("<span class='i_error_tip'></span>\u8bc4\u8bba\u8d85\u51fa\u4e86140\u5b57").show();
return false
}for(var s=0;
s<answerComment.nonsenseList.length;
s++){if(u==answerComment.nonsenseList[s]){p.html("<span class='i_error_tip'></span>\u4f60\u8f93\u5165\u7684\u8bed\u4e49\u4e0d\u591f\u6e05\u6670，\u8bf7\u6b63\u786e\u4f7f\u7528\u5730\u7403\u8bed\u8a00").show();
return false
}}if(!answerComment.CONTENT_PATTERN.test(u)){p.html("<span class='i_error_tip'></span>\u4f60\u8f93\u5165\u7684\u8bed\u4e49\u4e0d\u591f\u6e05\u6670，\u8bf7\u6b63\u786e\u4f7f\u7528\u5730\u7403\u8bed\u8a00").show();
return false
}Zhishi.Login.clickMe(t[0],function(){Zhishi.OpenApi.submitAnswerComment({questionId:a,answerId:i,content:l.val().trim(),orig:2004,atReplyId:l.attr("commentId"),atUserId:l.attr("uid")},function(y){if(y.code==1){var v=new Date();
var z=v.getFullYear()+"-"+(v.getMonth()+1)+"-"+v.getDate()+" "+v.getHours()+":"+v.getMinutes();
var x='<li><p><a class="userName" href="/z/MyHome.htm" target="_blank">'+y.username+"</a>："+l.val().trim()+'</p><div class="reply_op"><span>'+z+'</span><span class="reply" href="javascript:void(0);">\u5ba1\u6838\u4e2d</span></div></li>';
var w=m.children(".reply_con");
w.find("li:eq(5)").remove();
w.prepend(x);
l.val("");
l.removeClass("textarea_auto");
k.addClass("reply_disabled");
p.hide();
if(jQuery.browser.msie){setTimeout(function(){w[0].style.zoom="1.1";
w[0].style.zoom="1"
},0)
}if(m.find(".pagination").length==0){w.find("li:last").addClass("last")
}}else{p.html("<span class='i_error_tip'></span>"+y.message).show()
}});
return false
})
});
m.find(".reply").click(function(){answerComment.replyHandle(l,jQuery(this))
});
m.children(".evaluation_close").click(function(){m.slideUp(300)
});
m.find(".pagination a").click(function(){var t=jQuery(this).attr("href");
var u=0;
var s=t.lastIndexOf("pg=");
if(s>0){u=parseInt(t.substring(s+3))
}h.attr("loaded",2);
answerComment.commentDialogHandle(h,i,c,u,a);
return false
});
if(e=="2"){m.show()
}else{m.slideDown(300)
}answerComment.focusOnEnd(l)
});
h.attr("loaded","1")
}},replyHandle:function(a,b){var c="\u56de\u590d "+b.attr("uname")+"：";
a.val(c);
a.attr("commentId",b.attr("commentId"));
a.attr("uid",b.attr("uid"));
answerComment.focusOnEnd(a)
},focusOnEnd:function(b){var c=b.val();
if(jQuery.browser.msie){var a=b[0].createTextRange();
a.move("character",c.length);
a.select()
}else{b[0].setSelectionRange(c.length,c.length);
b.focus()
}},loadCommentAndEva:function(){var answerIds="";
jQuery(".mod_operate[aid][loaded=0]").each(function(){answerIds+=jQuery(this).attr("aid")+" "
});
if(answerIds!=""){var url="/z/WenwenAjaxEvent.e?sp=33&sp="+questionId+"&sp=S"+answerIds.substring(0,answerIds.length-1)+"&rnd="+Math.random();
jQuery.get(url,function(response){if(response&&response.length>6){var data=eval("("+response.replace(/'/gi,"")+")")[0];
var msg=response.substring(4,response.length-2);
var result=0;
msg=eval("("+msg+")");
if(data=="1"){result=1
}if(result>0){for(var i in msg){var item=msg[i];
var $ans_eva=jQuery("#ans_eva_"+i);
var $zan=$ans_eva.find(".operate_support");
var $cai=$ans_eva.find(".operate_oppose");
$zan.find("em").text((item.eva||""));
$cai.find("em").text((item.cai||""));
if(item.hasZan){$zan.addClass("operate_already").attr({mine:1,num:item.eva,voted:true}).siblings().addClass("operate_already").attr("voted",true)
}if(item.hasCai){$cai.addClass("operate_already").attr({mine:1,num:item.cai,voted:true}).siblings().addClass("operate_already").attr("voted",true)
}jQuery("#evaluation"+i).html("\u8bc4\u8bba("+item.com+")")
}}}})
}},zanClick:function($this,callback){var url="/z/WenwenAjaxEvent.e?sp=34&sp="+questionId+"&sp=S"+$this.attr("aid")+"&rnd="+Math.random();
jQuery.get(url,function(response){if(response&&response.length>6){var json=eval("("+response+")");
var data=json[0];
var msg=parseInt(json[1]);
if(!msg||msg<0){msg=parseInt($this.attr("val"));
if(!msg){msg=0
}}var $voted=$this.siblings(".voted");
$voted.attr("val",msg);
if(data=="0"){$this.attr("val",msg);
var $msg=$this.siblings(".vote_tips");
$msg.slideDown(1000,function(){$msg.fadeOut(1000,function(){$voted.html("");
$voted.removeClass("vote").addClass("voted");
$this.hide();
$voted.show()
})
})
}else{$voted.html("");
$voted.removeClass("vote").addClass("voted");
$this.remove();
$voted.show()
}if(typeof(callback)=="function"){callback()
}}})
},bindEvaCommentEvent:function(){jQuery("a.operate_support:not(.operate_already)").click(function(){Zhishi.Stats.ch("2013ww.tw.zan");
var a=jQuery(this);
if(a.hasClass("operate_already")){return
}EvaAndComment.zanAnswer(questionId,a.parent().attr("aid"),function(b){EvaAndComment.evaluateSuccess(a,b)
})
});
jQuery("a.operate_oppose:not(.operate_already)").click(function(){Zhishi.Stats.ch("ask.o.answer.down");
var a=jQuery(this);
if(a.hasClass("operate_already")){return
}EvaAndComment.caiAnswer(questionId,a.parent().attr("aid"),function(b){EvaAndComment.evaluateSuccess(a,b)
})
});
EvaAndComment.bindEvaluateHover();
jQuery(".evaluation").click(function(){answerComment.commentDialogHandle(jQuery(this),jQuery(this).attr("aid"),true,0,questionId)
});
jQuery(".default_answer").hover(function(){jQuery(this).find(".sign_link").show()
},function(){jQuery(this).find(".sign_link").hide()
}).find(".sign_wrap").hover(function(){jQuery(this).find("p:has(.report)").addClass("p_hover").find(".report").show()
},function(){jQuery(this).find("p").removeClass("p_hover").find(".report").hide()
}).find("a[weibo]").click(function(){var a=jQuery(this);
a.addClass("login_norefresh");
Zhishi.Ajax.sendRequest("GET",Zhishi.loginStateUrl,{onSuccess:function(b){if(b=="1"){questionWeibo.addWeibo(a,a.attr("weibo"),a.attr("param"))
}else{Zhishi.Login.clickMe(a[0],function(){questionWeibo.addWeibo(null,a.attr("weibo"),a.attr("param"))
})
}}})
})
}};
$j(function(){answerComment.loadCommentAndEva();
answerComment.bindEvaCommentEvent()
});function getMoreAnswer(a,d,c){var b="/z/MoreAnswer.htm?qid="+a+"&from="+d+"&sz="+c;
Zhishi.Ajax.sendRequest("GET",b,{onSuccess:function(e){if(e&&e.length>0){jQuery(".expansion_other_wrap").replaceWith(e);
answerComment.bindEvaCommentEvent();
init_discuzLogo()
}}})
}function bindPaginationEvent(){jQuery(".load_more .pagination a").click(function(){var a=jQuery(this).attr("href");
getMorePage("MoreAnswer.htm?"+a.substring(a.lastIndexOf("?")+1));
return false
})
}function getMorePage(a){Zhishi.Ajax.sendRequest("GET",a,{onSuccess:function(b){if(b&&b.length>0){var c=jQuery(".answer_wrap .load_more").parent();
c.children(".default_answer").remove();
c.children(".load_more").remove();
c.append(b);
answerComment.bindEvaCommentEvent();
init_discuzLogo();
bindPaginationEvent();
jQuery(document).scrollTop(0)
}}})
}jQuery(function(){bindPaginationEvent()
});function joinTeamFans(a,b){doJoin(a,"fans"+b,function(e){var c=e.indexOf(",");
if(c<0){return
}var d=parseInt(e.substr(0,c));
switch(d){case 0:jQuery("#joinfans"+b).hide();
jQuery("#cancelfans"+b).show();
new Base.U.Tips("green","\u606d\u559c，\u4f60\u5df2\u6210\u4e3a\u8be5\u56e2\u7c89\u4e1d！","",true,{autoClose:2000,unique:true});
break;
case 127:if(e.indexOf("\u5df2\u7ecf\u662f\u672c\u56e2\u6210\u5458")>0){jQuery("#joinfans"+b).hide();
jQuery("#cancelfans"+b).show();
new Base.U.Tips("green","\u606d\u559c，\u4f60\u5df2\u6210\u4e3a\u8be5\u56e2\u7c89\u4e1d！","",true,{autoClose:2000,unique:true})
}else{}break;
default:break
}})
}function cancelTeamFans(a,b){doCancel(a,"fans"+b,function(e){var c=e.indexOf(",");
if(c<0){return
}var d=parseInt(e.substr(0,c));
switch(d){case 0:jQuery("#joinfans"+b).show();
jQuery("#cancelfans"+b).hide();
new Base.U.Tips("green","\u6210\u529f\u53d6\u6d88\u5173\u6ce8","",true,{autoClose:2000,unique:true});
break;
default:break
}})
}function joinTeam(a,b){doJoin(a,b,function(j){var e=j.indexOf(",");
if(e<0){return
}var h=parseInt(j.substr(0,e));
switch(h){case 0:jQuery("#join"+b).hide();
jQuery("#cancel"+b).show();
new Base.U.Tips("green","\u606d\u559c，\u4f60\u5df2\u6210\u529f\u7533\u8bf7\u52a0\u5165\u8be5\u56e2！","",true,{autoClose:2000,unique:true});
break;
case 1537:var d=j.substr(e+1);
var g=d.indexOf(",");
var f=parseInt(d.substr(0,g));
d=d.substr(g+1);
g=d.indexOf(",");
var c=d.substr(0,g);
var k=d.substr(g+1);
showCancelOtherApplicant(f,c,k,b,a);
break;
default:break
}})
}function cancelTeam(a,b){doCancel(a,b,function(e){var c=e.indexOf(",");
if(c<0){return
}var d=parseInt(e.substr(0,c));
switch(d){case 0:jQuery("#join"+b).show();
jQuery("#cancel"+b).hide();
new Base.U.Tips("green","\u6210\u529f\u53d6\u6d88\u52a0\u5165\u56e2\u961f","",true,{autoClose:2000,unique:true});
break;
default:break
}})
}function doJoin(a,b,c){if(a&&a.length>4){Zhishi.Ajax.sendRequest("GET",a,{onSuccess:function(d){if(d){c(d)
}}})
}}function doCancel(a,b,c){if(a&&a.length>4){Zhishi.Ajax.sendRequest("GET",a,{onSuccess:function(d){if(d){c(d)
}}})
}}function showCancelOtherApplicant(c,a,f,b,d){var e="/t/t"+c+".htm";
new WW.U.Dialog({type:"confirm",title:"\u7533\u8bf7\u52a0\u5165\u56e2\u961f",message:'<div class="dialog_con"><div class="tip_ensure"><h3>\u786e\u5b9a\u7533\u8bf7\u52a0\u5165\u8be5\u56e2\u961f\u5417？</h3><p>\u7533\u8bf7\u8be5\u56e2\u961f\u4f1a\u53d6\u6d88\u5bf9\u539f\u56e2\u961f<a target="_blank" href="'+e+'">'+f+"</a>\u7684\u7533\u8bf7。</p></div></div>",callback:function(g){if(!g){return
}Zhishi.Ajax.sendRequest("GET",a.replace(/&amp;/g,"&"),{onSuccess:function(j){if(j){var h=j.indexOf(",");
if(h<0){return
}else{var i=parseInt(j.substr(0,h));
switch(i){case 0:jQuery("#join"+c).show();
jQuery("#cancel"+c).hide();
joinTeam(d,b);
break;
default:break
}}}}})
}})
};var QuickAnswer={onQuickQuestionHover:function(){jQuery(".similar_questions.wait_answer li").hover(function(){jQuery(this).siblings("li").find(".answer_question").hide();
jQuery(this).find(".answer_question").show()
},function(){jQuery(this).find(".answer_question").hide()
})
},onAnswerBtnClick:function(a){Zhishi.Stats.ch("2013ww.tw.kshd");
$this=jQuery("#quickAnsBtn_"+a);
$li=$this.parents("li");
if($li.hasClass("current")){$li.removeClass("current")
}else{jQuery(".similar_questions li").removeClass("current");
$li.addClass("current")
}return false
},submit:function(a){Zhishi.Stats.ch("2013ww.tw.kshd.ok");
Zhishi.Ajax.sendRequest("GET",Zhishi.loginStateUrl,{onSuccess:function(c){if(c=="1"){QuickAnswer.onAnswerSubmit(a)
}else{if(c=="0"){var d=get("quickAnsSubmit_"+a);
var b=Zhishi.Login.loginList.length;
d.setAttribute("wenwenid",b);
d.addClassName("login_norefresh");
Zhishi.Login.loginList[b]=function(){QuickAnswer.onAnswerSubmit(a)
};
Zhishi.Login.openLoginDialog(d);
return true
}}}})
},onAnswerSubmit:function(qid){var anonymValue=$("answerAnonymous_"+qid).checked;
var textEle=$("answerContent_"+qid);
var text=QuickAnswer.nomalizeText(textEle.value);
if(text.trim()==""||text.trim()=="\u6211\u6765\u56de\u7b54..."){jQuery("#ansErrorTips_"+qid).html("\u4f60\u8fd8\u6ca1\u6709\u8f93\u5165\u5185\u5bb9\u54e6");
jQuery("#ansErrorTips_"+qid).show();
jQuery("#answerContent_"+qid).focus();
return
}else{if(text.length>10000){jQuery("#ansErrorTips_"+qid).html("\u60a8\u7684\u56de\u7b54\u5185\u5bb9\u591a\u4e8e10000\u5b57，\u8bf7\u5220\u51cf");
jQuery("#ansErrorTips_"+qid).show();
jQuery("#answerContent_"+qid).focus();
return
}}var postData='{userId:"",userName:"",questionId:'+qid+",anonymous:"+anonymValue+',seconds:0,orig:2004,content:"'+text+'"}';
var posturl="/z/api/answer/submit?format=json";
var callback={onSuccess:function(jsonData){var json=eval("("+jsonData+")");
if(json.success){window.setTimeout(function(){$btn=jQuery("#quickAnsBtn_"+qid);
$li=$btn.parents("li");
$li.removeClass("current");
$li.remove("div[class!='quick_ans_btn_wrap']");
$btn.replaceWith("<span class='answered'>\u5df2\u56de\u7b54</span>");
new Base.U.Tips("green","\u56de\u7b54\u6210\u529f","",true,{autoClose:3000})
},100)
}else{jQuery("#ansErrorTips_"+qid).html(json.message);
jQuery("#ansErrorTips_"+qid).show()
}},para:"",contentType:"application/json; charset=UTF-8",postdata:postData,raw:true};
Zhishi.Ajax.sendRequest("POST",posturl,callback)
},nomalizeText:function(a){a=a.replace(/\\/g,"\\\\");
a=a.replace(/\"/g,'\\"');
a=a.replace(/\r/g,"\\r");
a=a.replace(/\n/g,"\\n");
return a
},fixIE6Hover:function(){jQuery("#otherQuestions li").hover(function(){jQuery(this).addClass("hover")
},function(){jQuery(this).removeClass("hover")
})
}};function showOfferFlowerDialog(a){offerGiftDialog=new WW.U.Dialog({title:"\u786e\u5b9a\u91c7\u7eb3",message:a,confirmValue:"\u786e\u5b9a",cancelValue:"\u5173\u95ed",frameLoaded:function(){},callback:function(c){if(c){selectSendRequestRainbow(Zhishi.SelectBestAnswer.answerId,0);
return false
}}});
setTimeout(function(){initFlowers()
},10)
}function postCallBackRainbow(b,a){if(!jQuery(".offerflower").is(":checked")){if(offerGiftDialog){offerGiftDialog.close()
}setTimeout(function(){window.location.reload()
},300);
return
}else{Zhishi.Stats.ch("2013ww.tw.sh")
}Zhishi.Stats.ch("2013ww.tw.cn.ok");
Zhishi.SelectBestAnswer.selectComplete()
}var FlowerMsg=["\u8c22\u8c22\u4f60\u5e2e\u4e86\u6211\u5927\u5fd9！","\u4f60\u5c31\u662f\u5f53\u4ee3\u7684\u6d3b\u96f7\u950b，\u592a\u611f\u8c22\u4e86！","\u771f\u5fc3\u4f69\u670d\u4f60，\u8c22\u8c22！","\u4e0d\u77e5\u9053\u8bf4\u4ec0\u4e48，\u9001\u4f60\u4e00\u6735\u5c0f\u7ea2\u82b1\u5427：）","\u5f53\u4ee3\u52b3\u6a21！\u6240\u6709\u4eba\u90fd\u5e94\u8be5\u5411\u4f60\u5b66\u4e60！","\u8d5e！\u5f88\u8d5e！\u975e\u5e38\u8d5e！\u4ece\u6765\u6ca1\u6709\u8fd9\u4e48\u8d5e\u8fc7！"];
function initFlowers(){jQuery("input.offerflower").change(function(){Zhishi.Stats.ch("2013ww.tw.sh1");
if((jQuery(this).is(":checked"))){jQuery(".thank.hidable").show()
}else{jQuery(".thank.hidable").hide()
}});
jQuery("#flowermsg").val(FlowerMsg[parseInt(Math.random()*FlowerMsg.length)])
}function showOfferGiftDialog(c,b,a){offerGiftDialog=new WW.U.Dialog({title:c,message:b,confirmValue:"\u8d60\u9001\u793c\u7269",cancelValue:"\u5173\u95ed",frameLoaded:function(){},callback:function(d){if(d){Zhishi.SelectBestAnswer.selectComplete();
return false
}else{if(a){setTimeout(function(){window.location.reload()
},1000)
}}}});
offerGiftDialog.confirmButton.disable();
initGift(offerGiftDialog)
}function prePatchGifts(a){if(jQuery(a).hasClass("disable")){return
}jQuery(".gift_item").each(function(b){var c=new Number(b);
if(c>3){jQuery(this).hide()
}else{jQuery(this).show()
}});
jQuery("#preGift").addClass("disable");
jQuery("#nextGift").removeClass("disable")
}function nextPatchGifts(a){if(jQuery(a).hasClass("disable")){return
}jQuery(".gift_item").each(function(b){var c=new Number(b);
if(c<4){jQuery(this).hide()
}else{jQuery(this).show()
}});
jQuery("#nextGift").addClass("disable");
jQuery("#preGift").removeClass("disable")
}function getGiftText(){jQuery(".gift_item.current").attr("desc")
}function initGift(a){jQuery(".gift_item").click(function(){jQuery(".gift_item").removeClass("current");
jQuery(this).addClass("current");
jQuery("#iptText").val(jQuery(this).attr("desc")).addClass("focus").removeAttr("disabled");
a.confirmButton.enable()
});
jQuery(".gift_item").each(function(b){var c=new Number(b);
if(c>3){jQuery(this).hide()
}})
}function warnIlegalWords(a){jQuery("#gift_error_tips").html(a).show()
}function hideGiftWordsWarn(){jQuery("#gift_error_tips").html("").hide()
};if(!jQuery.loginAndCall){jQuery.loginAndCall=function(a,b){jQuery.get("/z/LoginState.htm?rnd="+Math.random(),function(c){if(c=="1"){setTimeout(function(){b(a,false)
},1)
}else{if(c=="0"){var e=Zhishi.Login.loginList.length;
Zhishi.Login.loginList[e]=function(){b(a,true)
};
var d=document.createElement("input");
d.className="login_norefresh";
d.setAttribute("wenwenid",e);
Zhishi.Login.openLoginDialog(d)
}}})
}
}var EvaAndComment={ansZanUrl:"/z/WenwenAjaxEvent.e?sp=34",ansCaiUrl:"/z/WenwenAjaxEvent.e?sp=40",otherZanUrl:"/z/WenwenAjaxEvent.e?sp=41",otherCaiUrl:"/z/WenwenAjaxEvent.e?sp=42",getAnsEvaUrl:"/z/WenwenAjaxEvent.e?sp=33",getOtherEvaUrl:"/z/WenwenAjaxEvent.e?sp=43",getCommentUrl:"/z/WenwenAjaxEvent.e?sp=44",delCommentUrl:"/z/WenwenAjaxEvent.e?sp=45",submitCommentUrl:"/z/api/answer/comment?format=json",commentTemp:'<li id="comment_item_{{commentId}}">	<a tabindex="-1" class="comment_user" href="{{&uhome}}" target="_blank">		<img alt="{{userName}}" src="{{&uhead}}">	</a>	<div class="comment_cont">		<a href="{{&uhome}}" target="_blank">{{userName}}</a>:		<span>{{#replyUserId}}\u56de\u590d <a href="/z/ShowUser.e?sp={{replyUserId}}" target="_blank">{{replyUserName}}</a>：{{/replyUserId}}{{content}}</span>		<span class="time">{{timeStr}}</span>		<span class="comment_op" commentId="{{commentId}}" itemId="{{itemId}}">{{#isAdmin}}<a href="javascript:;">\u5220\u9664</a>{{/isAdmin}}{{^isMine}}<a href="javascript:;" reply="T" userId="{{userId}}" uname="{{userName}}">\u56de\u590d</a>{{/isMine}}</span>	</div>	</li>',commentEngine:null,zanAnswer:function(e,c,d,a){var b=this.ansZanUrl+"&sp="+e+"&sp="+c;
jQuery.loginAndCall({url:b,success:d,fail:a},this._wenwenAjaxCallback)
},caiAnswer:function(e,c,d,a){var b=this.ansCaiUrl+"&sp="+e+"&sp="+c;
jQuery.loginAndCall({url:b,success:d,fail:a},this._wenwenAjaxCallback)
},zanEssay:function(b,d,a){var c=this.otherZanUrl+"&sp=2&sp="+b;
jQuery.loginAndCall({url:c,success:d,fail:a},this._wenwenAjaxCallback)
},caiEssay:function(b,d,a){var c=this.otherCaiUrl+"&sp=2&sp="+b;
jQuery.loginAndCall({url:c,success:d,fail:a},this._wenwenAjaxCallback)
},zanReadItem:function(d,c,a){var b=this.otherZanUrl+"&sp=3&sp="+d;
jQuery.loginAndCall({url:b,success:c,fail:a},this._wenwenAjaxCallback)
},caiReadItem:function(d,c,a){var b=this.otherCaiUrl+"&sp=3&sp="+d;
jQuery.loginAndCall({url:b,success:c,fail:a},this._wenwenAjaxCallback)
},_wenwenAjaxCallback:function(params,login){jQuery.get(params.url,function(data){var ret=eval("("+data+")");
if(ret[0]==0){params.success(ret[1])
}else{if(typeof(params.fail)=="function"){params.fail(ret[1])
}}if(login){window.location.reload()
}})
},getAnsEvaNum:function(e,c,d,a){var b=this.getAnsEvaUrl+"&sp="+e+"&sp="+c;
this._getEvaluateNum(b,d,a)
},getEssayEvaNum:function(b,d,a){var c=this.getOtherEvaUrl+"&sp=2&sp="+b;
this._getEvaluateNum(c,d,a)
},getReadItemEvaNum:function(d,c,a){var b=this.getOtherEvaUrl+"&sp=3&sp="+d;
this._getEvaluateNum(b,c,a)
},_getEvaluateNum:function(url,success,fail){jQuery.get(url,function(data){var ret=eval("("+data+")");
if(ret[0]==0||ret[0]==1){success(eval("("+ret[1]+")"))
}else{if(typeof(fail)=="function"){fail(ret[1])
}}})
},evaluateSuccess:function(a,b){a.attr({mine:1,num:b}).addClass("operate_already").siblings().addClass("operate_already");
jQuery("<span>+1</span>").insertAfter(a.find("em")).slideDown(1000,function(){jQuery(this).fadeOut(1000).siblings("em").text(b)
})
},bindEvaluateHover:function(){jQuery("a.operate_already").live("mouseenter",function(a){var b=jQuery(this);
if(b.attr("mine")!="1"){b=b.siblings("a.operate_already")
}if(b.is(":animated")){return
}b.attr("num",b.find("em").text());
if(b.hasClass("operate_support")){b.find("em").text("\u5df2\u8d5e")
}else{b.find("em").text("\u5df2\u8e29")
}}).live("mouseleave",function(){var a=jQuery(this);
if(a.attr("mine")!="1"){a=a.siblings("a.operate_already")
}if(a.is(":animated")){return
}a.find("em").text(a.attr("num"))
})
},getAnsComment:function(c,e,b,d,a){this._getComment(c,1,e,b,d,a)
},getEssayComment:function(c,e,b,d,a){this._getComment(c,2,e,b,d,a)
},getReadComment:function(d,e,b,c,a){this._getComment(d,3,e,b,c,a)
},_getComment:function(d,e,g,b,f,a){var c=this.getCommentUrl+"&sp="+e+"&sp="+d+"&start="+g+"&limit="+b;
jQuery.getJSON(c,function(h){if(h[0]==0&&h[1]){f(h[1])
}else{if(typeof(a)=="function"){a(h[1])
}}})
},deleteAnsComment:function(b,c,d,e,a){this._deleteComment(1,b,c,d,e,a)
},deleteEssayComment:function(b,d,c,e,a){this._deleteComment(2,b,d,c,e,a)
},deleteReadComment:function(e,c,b,d,a){this._deleteComment(3,e,c,b,d,a)
},_deleteComment:function(e,b,d,g,f,a){var c=this.delCommentUrl+"&sp="+e+"&sp="+b+"&sp="+d+"&sp="+g;
jQuery.loginAndCall({url:c,success:f,fail:a},this._wenwenAjaxCallback)
},submitEssayComment:function(a,d,b,c){jQuery.loginAndCall({type:"articleId",itemId:a,callback:d,$text:b,$tips:c},this._loginSubmitComment)
},submitReadComment:function(c,d,a,b){jQuery.loginAndCall({type:"subscribeId",itemId:c,callback:d,$text:a,$tips:b},this._loginSubmitComment)
},submitAnswerComment:function(a,d,e,b,c){jQuery.loginAndCall({type:"questionId:"+a+", answerId",itemId:d,callback:e,$text:b,$tips:c},this._loginSubmitComment)
},_loginSubmitComment:function(b,a){EvaAndComment._submitComment(b.type,b.itemId,b.callback,b.$text,b.$tips)
},_submitComment:function(j,k,h,l,e){if(!l){l=$("#comment_text_"+k)
}if(!e){e=$("#comment_tips_"+k)
}var a=l.attr("atReplyId");
var b=l.attr("atUserId");
var i=l.attr("atUserName");
if(!a){a=0
}if(!b){b=""
}var g=jQuery.trim(l.val());
if(g==""||g=="\u6211\u6765\u56de\u7b54..."){e.find("span").text("\u60a8\u8fd8\u6ca1\u6709\u8f93\u5165\u5185\u5bb9\u54e6").end().show();
return
}else{if(jQuery.isTextNonsense(g)){e.find("span").text("\u60a8\u8f93\u5165\u7684\u8bed\u4e49\u4e0d\u591f\u6e05\u6670，\u8bf7\u6b63\u786e\u4f7f\u7528\u5730\u7403\u8bed\u8a00").end().show();
return
}else{if(g.length>250){e.find("span").text("\u60a8\u7684\u8bc4\u8bba\u8d85\u8fc7\u4e86250\u4e2a\u5b57，\u8bf7\u5220\u51cf").end().show();
return
}}}if(a>0&&g.indexOf("\u56de\u590d")==0){var c=g.indexOf("：");
if(c>0){g=jQuery.trim(g.substring(c+1));
if(g==""){e.find("span").text("\u60a8\u8fd8\u6ca1\u6709\u8f93\u5165\u56de\u590d\u5185\u5bb9\u54e6").end().show();
return
}}else{a=0;
b=0
}}else{a=0;
b=0
}e.find("span").text("").end().hide();
var f=jQuery.nomalizeText(g);
var d="{"+j+":"+k+",orig:2021,quanziId:"+quan_config.quanId+',content:"'+f+'", atUserId:"'+b+'", atReplyId :'+a+"}";
jQuery.loginAndCall(d,function(n,m){jQuery.ajax({type:"post",contentType:"application/json; charset=UTF-8",data:n,url:EvaAndComment.submitCommentUrl,dataType:"json",success:function(o){if(o.success){h(k,{commentId:o.message,content:g,replyCommentId:a,replyUserId:b,replyUserName:i})
}else{e.find("span").text(o.message).end().show()
}},error:function(){e.find("span").text("\u53d1\u8868\u8bc4\u8bba\u5931\u8d25，\u8bf7\u7a0d\u540e\u91cd\u8bd5").end().show()
}})
})
},renderComment:function(a){if(this.commentEngine){return this.commentEngine(a)
}else{if(typeof(Mustache)!="undefined"){this.commentEngine=Mustache.compile(this.commentTemp);
return this.commentEngine(a)
}}return""
}};