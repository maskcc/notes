
/*zol_article_5_3674225_210*/$(function(){
    loadjscssfile("http://intel-sa.buzzopt.com/zol/style/zever_assist_style.css","css");
    var hostWidth;
    var wide_screen_flag=0;
    if(wide_screen_flag==1){
        hostWidth=1110;
    }else{
        hostWidth=980;
    }
    var data = '<div class="zaBlank"> </div><div class="zaBaseBox">'
    <!--content start-->
    +'<div class="zaContent">'
        <!--logo wrapper start-->
    +'  <div class="zaPopHolder zaLogoHolder" title="Intel购物助手">'
    +'      <div class="zaPopTrigger"></div>'
    +'  </div>'
        <!--logo wrapper end-->
        <!--search box start-->
    +'  <div class="zaPopHolder zaSearchHolder">'
    +'      <div class="zaPopTrigger" onclick="zeverTrack(this,\'searchTab\')"></div>'
    +'      <div class="zaPopBoxWrapper zaSearchPopBoxWrapper">'
    +'          <div class="zaPopBox">'
                    <!-- <h2 class="zaPopBoxTtl">搜索</h2> -->
    +'              <div class="zaPopBoxContent zaSearchContent">'
    +'                  <div class="zaSearchInputWrapper">'
    +'                      <form id="search" action="http://search.zol.com.cn/s/search.php" method="get" name="search" target="_blank">'
    +'                          <input type="text" name="kword" class="zaSearchInput" />'
    +'                          <input class="zaBtn zaSearchBtn" type="submit" value=" " />'
    +'                      </form>'
    +'                  </div>'
    +'              </div>'
    +'              <div class="zaPopBoxShadow zaPopBoxShadowRight"></div>'
    +'              <div class="zaPopBoxShadow zaPopBoxShadowBottom"></div>'
    +'              <div class="zaPopBoxShadow zaPopBoxPointerShadow"></div>'
    +'              <div class="zaPopBoxPointer"></div>'
    +'          </div>'
    +'      </div>'
    +'  </div>'
        <!--search box end-->
        <!--promotion box start-->
    +'  <div class="zaPopHolder zaPromotionHolder">'
    +'      <div class="zaPopTrigger" onclick="zeverTrack(this,\'saleTab\')"></div>'
            <!--zaPopBoxWrapper start-->
    +'      <div class="zaPopBoxWrapper zaPromotionPopBoxWrapper">'
    +'          <div class="zaPopBox">'
    +'              <h2 class="zaPopBoxTtl">促销产品</h2>'
    +'              <div class="zaPopBoxContent">'
    +'                  <ul class="zaPromotionListWrapper">'
                            
                                +'                      <li class="zaPromotionList">'
    +'                          <div class="zaPromotionProduct">'
    +'                              <div class="zaPromotionProductPic"><img src="http://intel-sa.buzzopt.com/uploads/thumbnail/5823803.jpg" /></div>'
    +'                              <p class="zaPromotionName" title="联想 Yoga 13-IFI(日光橙)">联想 Yoga 13-IFI(日光橙)</p>'
    +'                              <p class="zaPromotionPrice">京东商城：<em>6999</em>元</p>'
    +'                          </div>'


    +'                          <a href="http://detail.zol.com.cn/339/338733/online.shtml" class="zaPromotionBtn" item_dealer="京东商城" item_name="联想" item_type="Yoga" target="_blank" onclick="zeverTrack(this,\'saleItem\')">去购买</a>'
    +'                      </li>'
                            +'                      <li class="zaPromotionList">'
    +'                          <div class="zaPromotionProduct">'
    +'                              <div class="zaPromotionProductPic"><img src="http://intel-sa.buzzopt.com/uploads/thumbnail/5962756.jpg" /></div>'
    +'                              <p class="zaPromotionName" title="宏碁 V5-471PG-33214G50Mass">宏碁 V5-471PG-33214G50Mass</p>'
    +'                              <p class="zaPromotionPrice">京东商城：<em>4599</em>元</p>'
    +'                          </div>'

    +'                          <div href="javascript:void(0);" class="zaPromotionTip" onclick="">'
    +'                              <span class="zaPromotionTipTrigger"></span>'
    +'                              <i class="zaTipPointer"></i>'
    +'                              <p class="zaTipTxt">赠品：Targus时尚内胆拎包  14英寸 ×1</p>'
    +'                          </div>'
 
    +'                          <a href="http://detail.zol.com.cn/345/344125/online.shtml" class="zaPromotionBtn" item_dealer="京东商城" item_name="宏?" item_type="V5" target="_blank" onclick="zeverTrack(this,\'saleItem\')">去购买</a>'
    +'                      </li>'
                            +'                      <li class="zaPromotionList">'
    +'                          <div class="zaPromotionProduct">'
    +'                              <div class="zaPromotionProductPic"><img src="http://intel-sa.buzzopt.com/uploads/thumbnail/6041286.jpg" /></div>'
    +'                              <p class="zaPromotionName" title="华硕 TAICHI 21G3537">华硕 TAICHI 21G3537</p>'
    +'                              <p class="zaPromotionPrice">京东商城：<em>11999</em>元</p>'
    +'                          </div>'


    +'                          <a href="http://detail.zol.com.cn/350/349203/online.shtml" class="zaPromotionBtn" item_dealer="京东商城" item_name="华硕" item_type="TAICHI太极" target="_blank" onclick="zeverTrack(this,\'saleItem\')">去购买</a>'
    +'                      </li>'
                            +'                      <li class="zaPromotionList">'
    +'                          <div class="zaPromotionProduct">'
    +'                              <div class="zaPromotionProductPic"><img src="http://intel-sa.buzzopt.com/uploads/thumbnail/6031471.jpg" /></div>'
    +'                              <p class="zaPromotionName" title="戴尔 Inspiron 灵越 14(Ins14VD-2308)">戴尔 Inspiron 灵越 14(Ins14VD-2308)</p>'
    +'                              <p class="zaPromotionPrice">京东商城：<em>3999</em>元</p>'
    +'                          </div>'


    +'                          <a href="http://detail.zol.com.cn/347/346457/online.shtml" class="zaPromotionBtn" item_dealer="京东商城" item_name="戴尔" item_type="Inspiron 灵越 14" target="_blank" onclick="zeverTrack(this,\'saleItem\')">去购买</a>'
    +'                      </li>'
                         
                        
    +'                  </ul>'
    +'              </div>'
    +'              <div class="zaPopBoxShadow zaPopBoxShadowRight"></div>'
    +'              <div class="zaPopBoxShadow zaPopBoxShadowBottom"></div>'
    +'              <div class="zaPopBoxShadow zaPopBoxPointerShadow"></div>'
    +'              <div class="zaPopBoxPointer"></div>'
    +'          </div>'
    +'      </div>'
            <!--zaPopBoxWrapper end-->
    +'  </div>'
        <!--promotion box end-->
        <!--news box start-->
    +'  <div class="zaPopHolder zaNewsHolder">'
    +'      <div class="zaPopTrigger" onclick="zeverTrack(this,\'articleTab\')"></div>'
            <!--zaPopBoxWrapper start-->
    +'      <div class="zaPopBoxWrapper zaNewsPopBoxWrapper">'
    +'          <div class="zaPopBox">'
    +'              <h2 class="zaPopBoxTtl">热点新闻</h2>'
    +'              <div class="zaPopBoxContent">'
    +'                  <ul class="zaNewsListWrapper">'
                                                            +'                        <li class="zaNewsList"><i></i><a href="http://nb.zol.com.cn/358/3582379.html" target="_blank">11?Air欲破六千大关 一周本本降价排行</a></li>'
                                +'                        <li class="zaNewsList"><i></i><a href="http://nb.zol.com.cn/354/3547517.html" target="_blank">价格大揭密 实地探访美国连锁电器超市</a></li>'
                                +'                        <li class="zaNewsList"><i></i><a href="http://nb.zol.com.cn/354/3548619.html" target="_blank">宅男你不懂爱 笔记本助力打动女神心</a></li>'
                                +'                        <li class="zaNewsList"><i></i><a href="http://nb.zol.com.cn/357/3575910.html" target="_blank">小巨人登陆! 华硕G46V游戏本首发评测</a></li>'
                                +'                        <li class="zaNewsList"><i></i><a href="http://nb.zol.com.cn/367/3675133.html" target="_blank">拒绝高温！手把手教你提升本本散热效率</a></li>'
                                                            +'                  </ul>'
    +'              </div>'
    +'              <div class="zaPopBoxShadow zaPopBoxShadowRight"></div>'
    +'              <div class="zaPopBoxShadow zaPopBoxShadowBottom"></div>'
    +'              <div class="zaPopBoxShadow zaPopBoxPointerShadow"></div>'
    +'              <div class="zaPopBoxPointer"></div>'
    +'          </div>'
    +'      </div>'
            <!--zaPopBoxWrapper end-->
    +'  </div>'
        <!--news box end-->
    +'  <a href="http://www.zol.com.cn/topic/3632537.html" target="_blank" class="zaInt"> 声明</a>'
    +'</div>'
    <!--content end-->
+'</div>';
            $('body').append(data);
            var zaBaseBox=$('.zaBaseBox'),zaPopHolder=$('.zaPopHolder');
            zaBaseBox.css({'margin-left':-(hostWidth)/2+(hostWidth-333)});
            

            boxEffect(zaBaseBox);
            $(window).scroll(function(){
                boxEffect(zaBaseBox);
            });
            
            if(!window.XMLHttpRequest){
                var zaBroHeight=document.documentElement.clientHeight;
                var zaScrollTop=document.documentElement.scrollTop;
                zaBaseBox.css({'top':zaBroHeight-75+zaScrollTop});
                $(window).scroll(function(){
                    var zaScrollTop=document.documentElement.scrollTop;
                    zaBaseBox.css({'top':zaBroHeight-75+zaScrollTop});
                });
            }
            zaPopHolder.each(function(){
                var obj=$(this);zaTipCo=obj.find('.zaPromotionTip'),zaPromotionList=obj.find('.zaPromotionList');
                obj.click(function(event){
                    event.stopPropagation();
                    boxOpen(obj)
                });
                var popBox=obj.find('.zaPopBoxWrapper');
                popBox.click(function(event){
                    event.stopPropagation();
                }); 
                zaPromotionList.eq(zaPromotionList.size()-1).css('border',0);
                zaPromotionList.mouseenter(function(){
                    $(this).addClass('zaPromotionListCurrent');
                }).mouseleave(function(){
                    $(this).removeClass('zaPromotionListCurrent');
                });
                zaTipCo.mouseenter(function(){
                    var zaTipIndex=$(this).parents('li').index();
                    var zaTipLen=$(this).parents('li').size();
                    if(zaTipIndex>=zaTipLen){
                        $(this).addClass('zaTipUp');
                    }
                    $(this).addClass('zaPromotionTipCurrent');
                }).mouseleave(function(){
                    $(this).removeClass('zaPromotionTipCurrent');
                });
                zaTipCo.mouseenter(function(){
                    var zaTipIndex=$(this).parents('li').index();
                    var zaTipLen=$(this).parents('li').size();
                    if(zaTipIndex>=zaTipLen-1){
                        $(this).addClass('zaTipUp');
                    }
                    $(this).addClass('zaPromotionTipCurrent');
                }).mouseleave(function(){
                    $(this).removeClass('zaPromotionTipCurrent');
                });
            });
            $('body').click(function(){
                boxClose();
            });

});
function boxOpen(obj){
    var siblingsObj=obj.siblings('.zaPopHolder');
    siblingsObj.removeClass('zaPopCurrent');
    obj.toggleClass('zaPopCurrent');
    var zaContent=obj.find('.zaPopBoxContent'),zaShadowRight=obj.find('.zaPopBoxShadowRight');
    zaShadowRight.css('height',parseInt(zaContent.css('height'))-1);
    var zaSearchInput=obj.find('.zaSearchInput');
    if(zaSearchInput){
        zaSearchInput.focus();
    }
}
function boxClose(){
    var zaPopHolder=$('.zaPopHolder');
    zaPopHolder.removeClass('zaPopCurrent');
}

function boxEffect(obj){
    var winHeight;
    var zaScrollTop;
    winHeight = document.documentElement.clientHeight;
    zaScrollTop = document.documentElement.scrollTop;
    if(document.body.scrollTop){
        zaScrollTop = document.body.scrollTop;
    }
    if(winHeight > 1150 || zaScrollTop+winHeight > 1150){
        obj.fadeIn();
    }else{
        obj.hide();
    }
}

//监测代码
zeverTrack('','none');
function zeverTrack(obj,trackTarget){
	var obj=jQuery(obj);
	var r='';
	var axel = Math.random() + "";
	var a = axel * 10000000000000;
	var img = new Image();
	var img1=new Image();
	var zaUrlSet='';
	var zaWindowUrl=window.location;
	
	if (axel*100 < 80)
	{
		r='http://'+window.location.host+'/';
	}

	var zaUrlStr='http://2218289.fls.doubleclick.net/activityi;src=2218289;type=13q1i711;u3='+encodeURIComponent(r)+';u7='+encodeURIComponent(zaWindowUrl)+';cat='
	
	switch (trackTarget){
		case 'none': //曝光监测
			zaUrlSet='zol-i759';
			img.src=zaUrlStr+zaUrlSet+';ord=' + a + '?';
		break;
		case 'articleTab': //文章标签点击监测
			if(platform=='pcpop'){
				zaUrlSet='pcpop581';
			}else if(platform=='pchome'){
				zaUrlSet='pchom503';
			}else if(platform=='it168'){
				zaUrlSet='it168009';
			}else if(platform=='yesky'){
				zaUrlSet='yesky180';
			}else if(platform=='zol'){
				zaUrlSet='zol-c587';
			}
			img.src=zaUrlStr+zaUrlSet+';ord=' + a + '?';
		break;
		case 'saleTab': //促销标签点击监测
			if(platform=='pcpop'){
				zaUrlSet='pcpop114';
			}else if(platform=='pchome'){
				zaUrlSet='pchom054';
			}else if(platform=='it168'){
				zaUrlSet='it168404';
			}else if(platform=='yesky'){
				zaUrlSet='yesky018';
			}else if(platform=='zol'){
				zaUrlSet='zol-c750';
			}
			img.src=zaUrlStr+zaUrlSet+';ord=' + a + '?';
		break;
		case 'searchTab': //搜索标签点击监测
			if(platform=='pcpop'){
				zaUrlSet='pcpop246';
			}else if(platform=='pchome'){
				zaUrlSet='pchom054';
			}else if(platform=='it168'){
				zaUrlSet='it168115';
			}else if(platform=='yesky'){
				zaUrlSet='yesky944';
			}else if(platform=='zol'){
				zaUrlSet='zol-c390';
			}
			img.src=zaUrlStr+zaUrlSet+';ord=' + a + '?';
		break;
		case 'saleItem': //促销产品点击监测
			var EC=obj.attr('item_dealer'),ProNO=obj.attr('item_name')+'|'+obj.attr('item_type');
			if(platform=='pcpop'){
				img1.src='http://ad-apac.doubleclick.net/clk;270360067;96477578;x?http://ad-apac.doubleclick.net/dot.gif';
				zaUrlSet='pcpop977;';
			}else if(platform=='pchome'){
				zaUrlSet='pchom590;';
			}else if(platform=='it168'){
				zaUrlSet='it168893;';
			}else if(platform=='yesky'){
				zaUrlSet='yesky208;';
			}else if(platform=='zol'){
				zaUrlSet='zol-p881;';
			}
			img.src=zaUrlStr+zaUrlSet+';u5=['+EC+'];u4=['+ProNO+']+ord=' + a + '?';
		break;
		case 'articleClick': //点击文章监测
			if(platform=='pcpop'){
				//暂未提供
			}else if(platform=='pchome'){
				zaUrlSet='pchom726;';
			}else if(platform=='it168'){
				//暂未提供
			}else if(platform=='yesky'){
				zaUrlSet='yesky289';
			}else if(platform=='zol'){
				//zol要求删除
			}
			img.src=zaUrlStr+zaUrlSet+';ord=' + a + '?';
		break;
		case 'searchKey': //搜索关键词监测,pcpop定制
			if(platform=='pcpop'){
				img1.src='http://ad-apac.doubleclick.net/clk;270360067;96477578;x?http://ad-apac.doubleclick.net/dot.gif';
			}
		break;
	}
	
}
function loadjscssfile(filename,filetype){

    if(filetype == "js"){
        var fileref = document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src",filename);
    }else if(filetype == "css"){
    
        var fileref = document.createElement('link');
        fileref.setAttribute("rel","stylesheet");
        fileref.setAttribute("type","text/css");
        fileref.setAttribute("href",filename);
    }
   if(typeof fileref != "undefined"){
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
    
}
