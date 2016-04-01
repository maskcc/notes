##1. 选择器

1. 引入jQuery文件库

		<script language="javascirpt" type="text/javascript" src="1.9.0/jquery.js"></script>
		
2. $()是jQuery中的函数,获得()中指定的标签元素,也可能是函数.等价于jQuery()
3. $("#my_id"), 通过id选择器获取页面中指定的标签元素并且返回唯一一个元素
4. 调用html()方法的功能是设置或获取元素中显示的内容

		$("#divtest").html("设置div的内容");
		$("#default").html($("#divtest").html());
		
5. 根据元素名称可以查找到元素,调用css(),该函数设置或获取元素的某项样式属性

		$("button").attr("disabled","true"); #attr修改属性
		$("div").css("font-weight", "bold"); #css设置样式
		
6. .class选择器,通过class选择器获取某个元素,并显示该元素的class类别名称

		<style>
			.red{color:Red;}
		</style>
		<div id="divtest" class="red">I am red</div>
		
		<script>
		var $className = $(".red").attr("class");
		$(".red").html($className);
		</script>
		
7. *选择器选取全部元素. `<head>`,`<body>`,`<script>`等.此方法某些浏览器会比较慢,需谨慎使用.

		$("div *").html("good job") #选取div标签下的所有元素
		
8. 多想选择器, 可以一次选择多个元素,使用`,`隔开.

		$("div, p, .red, .green").html("good job");
		
9. `ance, desc`选择器,可以快速定位某一层次的一个或多个元素.`$("ance, desc")`, 是两个参数,ance表示ancestor, desc表示 descendant.
	
		<div>gs
			<p>
				<span></span>
			</p>
			<span></span>
		</div>
		$("div span").html("your name is what?|What's your name")
		
10. `parent > child` 选择器,选择目标是子集元素.但不包括孙辈.

		<div>
            码农家族
            <p>
                <label></label>  /*该选择器选不到子元素*/
            </p>
            <label></label>  /*只能选到这个*/
            <label></label>  /*只能选到这个*/
        </div>
        <label></label>
        
        <script type="text/javascript">
            $("div > label").css("border", "solid 5px red");
        </script>
        
12. `prev + next` 选择器,可以查找与`prev`元素紧邻的下一个`next`元素.

		<div>
            码农家族
            <label></label>
            <p></p>  /*获取p 的下一个元素*/
            <label></label>
            <label></label>
        </div>
        <label></label>
        
        <script type="text/javascript">
            $("p + label").css("background-color","red");
        </script>
        
13. `prev ~ siblings` 选择器获取`prev`后面全部相邻的元素.

		<div>
            码农家族
            <label></label>
            <p></p>
            <label></label> /*这两个会受到*/
            <label></label> /*这两个会受到*/
        </div>
        <label></label>
        
        <script type="text/javascript">
            $("p~label").css("border", "solid 1px red");
            $("p~label").html("我们都是p先生的粉丝");
        </script>
    
14. `:input`表单选择器,返回全部的表单元素 

		<h3>修改全部表单元素的背景色</h3>
        <form id="frmTest" action="#">
        <input type="button" value="Input Button" /><br />
        <select>
            <option>Option</option>
        </select><br />
        <textarea rows="3" cols="8"></textarea><br />
        <button>
            Button</button><br />
        </form>
        
        <script type="text/javascript">
            $("#frmTest :input").addClass("bg_blue"); /*选择所有input 表单*/
        </script>

15. `addClass()`,给元素添加style. 
16. `:text`表单文本选择器.单行文本输入框
17. `:password`表单密码选择器
18. `:radio`单选按钮选择器.可以获取表单中的全部单选按钮元素.

		<h3>将表单中单选按钮设为不可用</h3>
        <form id="frmTest" action="#">
        <input type="button" value="Input Button" /><br />
        <input id="Radio1" type="radio" />
        <label for="Radio1">
            男</label>
        <input id="Radio2" type="radio" />
        <label for="Radio2">                  /*label for 表示为某个radio*/
            女</label><br />
        </form>
        
        <script type="text/javascript">
            $("#frmTest :radio").attr("disabled","true");  /*attr 设置属性*/
        </script>
 
19. `hide()`函数为隐藏指定的元素
20. `:checkbox` 复选框选择器

		$("#frmTest :checkbox").attr("checked", "true")
		
21. `:submit`提交按钮选择器.通常一个表单只有一个`type`属性为 `submit`的提交按钮.

		<h3>修改表单中提交按钮的背景色</h3>
        <form id="frmTest" action="#">
        <input type="button" value="Input Button" /><br />
        <input type="submit" value="点我就提交了" /><br />
        <button>
            Button</button><br /> /*因为 :submit  是取提交按钮    如果在一个form中  如果有button按钮 没有写type 会被默认当作 type=submit 来处理。所以它就也会被被获取到。*/
        </form>
        
        <script type="text/javascript">
            $("#frmTest input:submit").addClass("bg_red");  /*submit 前面需要input限定*/
        </script>
        
 22. `:image`图像域选择器.当一个`<input>`元素的`type`是`image`时, 该元素就是一个图像域, 使用`:image`可以快速获取该类全部元素.
 23. `:button`表单按钮选择器.只能获取到`type`属性值为`button`的`<input>`和`<button>`这两类普通按钮元素.在jq中 :button 是属于表单选择器选取类型为 `button` 的 `<input>` 元素或`button`元素。所以, `:button`能获取 `type`值为`button`的`input`元素和`buttton`元素，亦能获取`<button></button>`
 24. `:checked`选中状态选择器.使用该选择器能获取处于选中状态的元素.
 25. `:selected`选择器,只能获取`<select>`下拉列表框中全部处于选中状态的`<option>`选项元素
		
			<h3>获取处于选中状态元素的内容</h3>
	        <form id="frmTest" action="#">
	        <select id="Select1" multiple="multiple">
	            <option value="0">苹果</option>
	            <option value="1" selected="selected">桔子</option>
	            <option value="2">荔枝</option>
	            <option value="3" selected="selected">葡萄</option>
	            <option value="4">香蕉</option>
	        </select><br /><br />
	        <div id="tip"></div>
	        </form>
	        
	        <script type="text/javascript">
	            var $txtOpt = $("#frmTest :selected").text();
	            $("#tip").html("选中内容为:" + $txtOpt); /*选中内容为桔子葡萄*/
	        </script>
	        /*为什么把text换成html就会剩下桔子而没有葡萄了呢 +1积分
			swalle swalle: .text(): 返回一个字符串，包含所有匹配元素的合并文本..html(): 获取集合中第一个匹配元素的HTML内容.*/
		
26. 为何使用form时候，：checked之前必须有空格。input的时候：checked之前没有空格
	
	form是表单元素，本身并没有checked属性，加空格表示对属于form的子元素（后代元素）进行筛选是否是checked状态；而input本身有checked属性，是对其本身的checked状态进行筛选检查，所以不需要加空格。
	**总结一下就是说：有空格的是对子元素进行筛选，没有空格是对元素本身进行筛选。**
	
##2. 事件
1. 页面加载时触发`ready()`事件.只要页面的DOM结构加载后就触发.`onLoad()`必须在页面全部元素加载成功后触发.`ready()`可以写多个,按照顺序执行.

		$(document).ready(function*(){})等价于
		$(function(){})
		
		<h3>页面载入时触发ready()事件</h3>
        <div id="tip"></div>
        <input id="btntest" type="button" value="点下我" />
        
        <script type="text/javascript">
            $(function() {    /*在ready()事件中绑定一个按钮的单击事件*/
                $("#btntest").bind("click", function () {
                    $("#tip").html("我被点击了！");
                });
            });
        </script>
        
2. 使用`bind()`方法绑定元素的事件.

		$(selector).bind(event, [data] function) /*event为事件名称,多个事件用空格隔开.*/
		
		<h3>bind()方法绑多个事件</h3>
        <input id="btntest" type="button" value="点击或移出就不可用了" />
        
        <script type="text/javascript">
            $(function () {
                $("#btntest").bind("click mouseout", function () {/*点击或鼠标易初就不可用*/
                    $(this).attr("disabled", "true");
                })
            });
        </script>
        
3. `hover()`方法切换事件.`hover()`方法的功能是当鼠标移动到所选元素上时,执行方法中的第一个函数,鼠标移出时执行方法中的第二个函数,实现事件的切换效果:
	
		$(selector).hover(over, out);
		
		<h3>hover()方法切换事件</h3>
        <div>别走！你就是土豪</div>
        
        <script type="text/javascript">
            $(function () {
                $("div").hover(  /*hover方法实现元素背景色的切换 */
                function () {
                    $(this).addClass("orange");
                },
                function () {
                    $(this).removeClass("orange")
                })
            });
        </script>
      
4. 使用`toogle()`方法可以在元素的`click`事件中绑定多个函数.循环依次执行.在`1.9.0`之后的版本不支持.还能控制元素的显示与隐藏.

		$(selector).toggle(fun1(), fun2(), funN()...);
		
		<h3>toggle()方法绑定多个函数</h3>
        <input id="btntest" type="button" value="点一下我" />
        <div>我是动态显示的</div>
        
        <script type="text/javascript">
            $(function () {
                $("#btntest").bind("click", function () {
                    $("div").toggle(
                        function(){
                            $("#btntest").attr("visible", "false")/*这行可不要,toggle可以控制元素的显示与隐藏*/                                                      
                        }
                        );
                })
            });
        </script>
        
        /*轮流显示apple, banana*/
        <div>葡萄</div>
        <script>
        	$(function(){
        		$("div").toogle(
        		function(){
        			$(this).html("apple");
        		},
        		function(){
        			$(this).html("banana");
        		})
        	});
        </script>
        	
5. `unbind()`方法可以移除元素已绑定的事件.如果没有规定参数,会删除指定元素的所有事件处理程序.

		$(selector).unbind(event, fun)
		<div>such things</div>
		<script>
			$(function(){
				$("div").bind("click",
					function(){
						$(this).removeClass(backcolor).addClass("color");
					}).bind("dbclick", function(){
						$(this).removeClass("color").addClass("backcolor");	
					})
					
					$("#btntest").bind("click", function(){
						$("div").unbind("dbclick");
						$(this.attr("disabled", "true"));
					
					});			
			});
		</script>
		
		<h3>unbind()移除绑定的事件</h3>
        <input id="btntest" type="button" value="移除事件" />
        <div>土豪，咱们交个朋友吧</div>
        
        <script type="text/javascript">
            $(function () {
                $("div").bind("click",
                function () {
                    $(this).removeClass("backcolor").addClass("color");
                }).bind("dblclick", function () {
                    $(this).removeClass("color").addClass("backcolor");
                })
                $("#btntest").bind("click", function () {
                    $("div").unbind();
                    $(this).attr("disabled", "true");
                });
            });
        </script>
        
6. 使用`one()`方法绑定元素的一次性事件.

		$(selector).one(event, [data], fun)
		<div>我被点击了(0)次</div>
		<script>
			$(function(){
				var intI = 0;
				$("div").one("click", function(){
					intI++;
					$(this).html("我被点击了(" + intI + ")次");
				
				})			
			});
		</script>

7. `trigger()`方法手动触发指定的事件,这些事件可以是元素的自带事件,也可以是自定义的事件.

		$(selector).trigger(event)
		<h3>trigger()手动触发事件</h3>
        <div>土豪，咱们交个朋友吧</div>
        
        <script type="text/javascript">
            $(function () {
                $("div").bind("change-color", function () { /*定义的事件*/
                    $(this).addClass("color");
                });
                $("div").trigger ("change-color"); /*手动触发事件*/
            });
        </script>
        
8. `focus`事件在元素获取焦点时触发,`blur`事件在元素丢失焦点时触发.

		<input id="txtest" type="text" value="" />
        <div></div>
        
        <script type="text/javascript">
            $(function () {
                $("input")
                .bind("focus", function () {
                    $("div").html("请输入您的姓名！");
                })
                $("input").bind("blur", function () {
                    if ($(this).val().length == 0)     /***元素的内容*****/
                        $("div").html("你的名称不能为空！");
                })
            });
        </script>

9. 当一个元素的值发生变化时,会触发`change`事件.

		<h3>下拉列表的change事件</h3>
        <select id="seltest">
            <option value="葡萄">葡萄</option>
            <option value="苹果">苹果</option>
            <option value="荔枝">荔枝</option>
            <option value="香焦">香焦</option>
        </select>
        
        <script type="text/javascript">
            $(function () {
                $("#seltest").bind("change", function () {
                    if ($(this).val() == "苹果")
                        $(this).css("background-color", "red");
                    else
                        $(this).css("background-color", "green");
                })
            });
        </script>
        
10. 调用live()方法绑定元素的事件.可以动态绑定.但是jQuery从1.7开始不建议用.live()方法,1.9不支持.

		$(selector).live(event, [data], fun)
		<h3>live()方法绑多个事件</h3>
        
        <script type="text/javascript">
            $(function () {/**之前没有这个input,动态绑定***/
                $("#btntest").live("click mouseout", function () {
                    $(this).attr("disabled", "true");
                })
                $("body").append("<input id='btntest' type='button' value='点击或移出就不可用了' />");
            });
        </script>
        
##Ajax请求 
1. 使用`load()`方法通过Ajax请求加载服务器中的数据,并把返回的数据放置到指定的元素中.

		load(url, [data],[callback])
		<div id="divtest">
            <div class="title">
                <span class="fl">我最爱吃的水果</span> 
                <span class="fr">
                    <input id="btnShow" type="button" value="加载" />
                </span>
            </div>
            <ul></ul>
        </div>
        
        <script type="text/javascript">
            $(function () {
                $("#btnShow").bind("click", function () {
                    var $this = $(this);
                    $("ul")
                    .html("<img src='Images/Loading.gif' alt=''/>")
                   .load("http://www.imooc.com/data/fruit_part.html", function() {
                        $this.attr("disabled", "true");
                    });
                })
            });
        </script>
        
2. 使用`getJSON()`方法可以通过Ajax异步请求的方式,获取服务器中的数据,并对获取的数据进行解析.
	
		jQuery.getJSON(url, [data],[callback]) 或
		$.getJSON(url, [data], [callback])
		
		 <div id="divtest">
            <div class="title">
                <span class="fl">我最喜欢的一项运动</span> 
                <span class="fr">
                    <input id="btnShow" type="button" value="加载" />
                </span>
            </div>
            <ul></ul>
        </div>
        
        <script type="text/javascript">
            $(function () {
                $("#btnShow").bind("click", function () {
                    var $this = $(this);
                    $.getJSON("http://www.imooc.com/data/sport.json", function(data){
                        $this.attr("disabled", "true");
                        $.each(data, function (index, sport) {
                            if(index==3)
                            $("ul").append("<li>" + sport["name"] + "</li>");
                        });
    
                    });
                })
            });
        </script>
        
3. 使用`getScript()`方法异步请求并执行服务器中的`JavaScript`格式的文件.调用格式如下:

		jQuery.getScript(url, [callback]) 或
		$.getScript(url, [callback])
	
		<div id="divtest">
            <div class="title">
                <span class="fl">我最喜欢的运动</span> 
                <span class="fr">
                    <input id="btnShow" type="button" value="加载" />
                </span>
            </div>
            <ul></ul>
        </div>
        
        <script type="text/javascript">
            $(function () {
                $("#btnShow").bind("click", function () {
                    var $this = $(this);
                    ? {
                        $this.attr("disabled", "true");
                    });
                })
            });
        </script>
        
4. 使用`get()`方法时,采用`GET`方式向服务器请求数据,并通过方法中回调函数的参数返回请求的数据.调用格式为:

		$.get(url, [callback])
		
		<body>
        <div id="divtest">
            <div class="title">
                <span class="fl">我的个人资料</span> 
                <span class="fr">
                    <input id="btnShow" type="button" value="加载" />
                </span>
            </div>
            <ul></ul>
        </div>
        
        <script type="text/javascript">
            $(function () {
                $("#btnShow").bind("click", function () {
                    var $this = $(this);
                    $.get("http://www.imooc.com/data/info_f.php", function(data) {
                        $this.attr("disabled", "true");
                        $("ul").append("<li>我的名字叫：" + data.name + "</li>");
                        $("ul").append("<li>男朋友对我说：" + data.say + "</li>");
                    }, "json");
                })
            });
        </script>
     
5. 使用`post()`方法向服务器发送数据.服务器接收到数据后进行处理,并将处理结果返回页面.

		$.post(url, [data], [callback])
		
		<div id="divtest">
            <div class="title">
                <span class="fl">检测数字是否大于0</span> 
                <span class="fr"><input id="btnCheck" type="button" value="检测" /></span>
            </div>
            <ul>
               <li>请求输入一个数字 <input id="txtNumber" type="text" size="12" /></li>
            </ul>
        </div>
        
        <script type="text/javascript">
            $(function () {
                $("#btnCheck").bind("click", function () {
                    $.post("http://www.imooc.com/data/check_f.php",{
                        num: $("#txtNumber").val()                        
                    },  
                    
                    function (data) {
                        $("ul").append("<li>你输入的<b>  "
                        + $("#txtNumber").val() + " </b>是<b> "
                        + data + " </b></li>");
                    });
                })
            });
        </script>
        
6. 使用`serialize()`方法可以将表单中有name属性的元素值进行序列化,生成标准URL编码文本字符串,直接可用于`ajax`请求.

		$(selector).serialize()
		
7. 使用`ajax()`方法加载服务器数据

		jQuery.ajax([settings])  或
		$.ajax([settings])
		
		<div id="divtest">
            <div class="title">
                <span class="fl">检测数字的奇偶性</span> 
                <span class="fr">
                    <input id="btnCheck" type="button" value="检测" />
                </span>
            </div>
            <ul>
               <li>请求输入一个数字 
                   <input id="txtNumber" type="text" size="12" />
               </li>
            </ul>
        </div>
        
        <script type="text/javascript">
            $(function () {
                $("#btnCheck").bind("click", function () {
                    $.ajax({
                        url: "http://www.imooc.com/data/check.php",
                        data: { num: $("#txtNumber").val() },
                        dataType: "text",
                        success: function (data) {
                            $("ul").append("<li>你输入的<b>  "
                            + $("#txtNumber").val() + " </b>是<b> "
                            + data + " </b></li>");
                        }
                    });
                })
            });
        </script>
        
8. 使用`ajaxSetup()`方法可以设置Ajax请求的一些全局性选项值,设置完成后,后面的Ajax请求将不需要再添加这些选项值.

		jQuery.ajaxSetup([options])
		$.ajaxSetup([options])
		
		<div id="divtest">
            <div class="title">
                <span class="fl">奇偶性和是否大于0</span> 
                <span class="fr">
                    <input id="btnShow_1" type="button" value="验证1" />
                    <input id="btnShow_2" type="button" value="验证2" />
                </span>
            </div>
            <ul>
               <li>请求输入一个数字 
                   <input id="txtNumber" type="text" size="12" />
               </li>
            </ul>
        </div>
        
        <script type="text/javascript">
            $(function () {
                $.ajaxSetup({
                dataType: "text",
                success: function(data){
                        $("ul").append("<li>你输入的<b>  "
                            + $("#txtNumber").val() + " </b>是<b> "
                            + data + " </b></li>");
                    }
                });
                $("#btnShow_1").bind("click", function () {
                    $.ajax({
                        data: { num: $("#txtNumber").val() },
                        url: "http://www.imooc.com/data/check.php"
                    });
                })
                $("#btnShow_2").bind("click", function () {
                    $.ajax({
                        data: { num: $("#txtNumber").val() },
                        url: "http://www.imooc.com/data/check_f.php"
                    });
                })
            });
        </script>
        
9. `ajaxStart()`和`ajaxStop()`方法是绑定Ajax事件,`ajaxStart()`方法用于在Ajax请求发出前触发函数,ajaxStop()方法用于在Ajax请求完成后触发函数

		$(selector).ajaxStart(function())和
		$(selector).ajaxStop(function())
		
		 <div id="divtest">
            <div class="title">
                <span class="fl">加载一段文字</span> 
                <span class="fr">
                    <input id="btnShow" type="button" value="加载" />
                </span>
            </div>
            <ul>
               <li id="divload"></li>
            </ul>
        </div>
        
        <script type="text/javascript">
            $(function () {
                $("divload").ajaxStart(function(){
                    $(this).html("正在请求数据...");
                });
                $("divload").ajaxStop(function(){
                    $(this).html("数据请求完成！");
                });
                $("#btnShow").bind("click", function () {
                    var $this = $(this);
                    $.ajax({
                        url: "http://www.imooc.com/data/info_f.php",
                        dataType: "json",
                        success: function (data) {
                            $this.attr("disabled", "true");
                        $("ul").append("<li>我的名字叫：" + data.name + "</li>");
                        $("ul").append("<li>男朋友对我说：" + data.say + "</li>");
                        }
                    });
                })
            });
        </script>