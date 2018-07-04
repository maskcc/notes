##简介
CSS全称`层叠样式表(Cascading Style Sheets)`,主要用于定义HTML内容在浏览器内的显示样式(文字大小,颜色,加粗等).通过定义某个样式让不同网页位置的文字有__统一的字体,字号,颜色等__.

##CSS代码语法
- css样式由选择符和声明组成.`p[选择符]{color[属性]: blue[值]; font-size: 12px;}[声明]`,多条声明可以用分号分隔.  
- css中可以使用`/*注释语句*/`来注释.Html中使用`<!--注释语句-->`.  
- css内联式,将css写入标签内,多条用分号分隔`<p style="color:red">内嵌内容</p>`.  
- css嵌入式,将css写入标签间,一般写在`<head></head>`标签内:
		
		<style type="text/css">
		span{
			color: red;
			font-size: 20px;
		}
		</style>

- 外部式(外联式),将css代码写到单独的外部文件中,以`.css`为扩展名.在`<head>`内,使用<link>标签将css样式文件链接到htm了文件,`<link>`标签一般写在`<head>`标签内:

		<link href="base.css" rel="stylesheet" type="text/css" />

- css三种凡是的优先级`内联式 > 嵌入式 > 外部式`.嵌入式>外部式有一个前提：嵌入式css样式的位置一定在外部式的后面,其实就是--就近原则（离被设置元素越近优先级别越高).
- css申明有选择器和样式组成,选择器可以是标签.类似`选择器{样式1;样式2;}`
- 类选择器,__以英文远点开头,可以任意起名__,来定义内容样式,使用时用`class=name`来选择.

		<style type="text/css">
			.stress{color: red;}
		</style>
		<span class="stress">圆神</span>

###CSS中的选择器
- ID选择器, 设置标签时为`id="ID"名称`.ID选择符的前面是`#`,如下:
		
		#setGreen{
			color: green;
		}
		<span id="setGreen">公开课</span>

- ID选择器在一个Html文档中只__能使用一次__,类选择器可以使用列表方法为同一个原色设置多个样式,而ID选择器并不能.如`<span class="setGreen bigSize">data</span>`.
- 子选择器,会渲染标签的所有子元素,在大于号`>`的右侧添加选择的内容如:
  
		<style type="text/css"> 
		.food>li{border:1px solid red;}
		</style>
		
		<ul class="food">
		    <li>水果
		        <ul>
		        	<li>香蕉</li>
		            <li>苹果</li>
		            <li>梨</li>
		        </ul>
		    </li>
		    <li>蔬菜
		    	<ul>
		        	<li>白菜</li>
		            <li>油菜</li>
		            <li>卷心菜</li>
		        </ul>
		    </li>
		</ul>
- 包含(后代)选择器,加入空格,用于选择自定标签元素下的后辈元素.即所有元素`> 作用域第一代后代,空格作用于元素的所有后代`.如:

		<style type="text/css">
			.first span{color:red;}
		</style>
		<p class="first">三年级时，我还是一个<span>胆小如鼠</span>的小女孩<span>他们都好傻啊</sapn></p>

- 通用选择器会用一个`*`指定,会将匹配html中的所有标签元素.`* {color:red}`所有html标签颜色指定为红色.
- 伪类选择符,在CSS3中它允许给html不存在的标签设置样式,如鼠标滑过状态:`a:hover{color:red;}`, `p:hover{color:red;}`.但是由于兼容问题,常用`a:hover的组合`.
- 分组选择标签,一次为多个标签设置样式,便签间使用逗号隔开如:`h1, span{color:red;}`

###CSS的继承,层叠和特殊性
- css__某些样式__有继承性,如p标签下设置红色属性,其下面的span标签也会继承该红色属性
- 特殊性,如果对同一个元素设置了不同的css样式代码,会根据权值来设置.权值规则:

		标签权值为1, 类选择符权值为10, ID选择符权值最高位100,继承权值0.1最低

		p{color:red;}/*权值为1*/
		p span{color:green;}/*权值为1+1=2*/
		.warning{color:white;}/*权值为10*/
		p span.warning{color:purple}/*全职位1+1+10=12*/
		#footer .note p{color:yellow;} /*权值为100+10+1=111*/
- css层叠,当同一个元素的css样式权值相同时会层叠处理,会根据css样式的前后顺序来处理,最后面的css样式会被使用.

		内联样式表（标签内部）> 嵌入样式表（当前文件中）> 外部样式表（外部文件中）。

- 设置重要性使其具有最高权值.`p{color:red!important;}`

	>当网页制作者不设置css样式时，浏览器会按照自己的一套样式来显示网页。并且用户也可以在浏览器中设置自己习惯的样式，比如有的用户习惯把字号设置为大一些，使其查看网页的文本更加清楚。这时注意样式优先级为：浏览器默认的样式 < 网页制作者样式 < 用户自己设置的样式，但记住!important优先级样式是个例外，权值高于用户自己设置的样式。


##CSS的排版
- `font-familyt:"宋体"` 设置字体,现在一般网页喜欢设置“微软雅黑”，如下代码：
		
		body{font-family:"Microsoft Yahei";}
- `font-size:12px;color:#777` 设置字号,颜色
- `font-weight:bold` 设置为粗体
- `font-style:italic` 设置斜体
- `text-decoration:underline` 设置下划线
- `text-decoration:line-through` 设置删除线
- `p{text-indent:2em;}` 设置2个缩进,2em就是文字的2倍大小
- `p{line-height:1.5em;}` 设置行间距,行高,段落间行距为1.5倍
- `h1{letter-spacing:50px;word-spacing:50px}` 设置字母间距为`letter-spacing`,单词间间距为`word-spacing`,当设置元素为__英文__时，`letter-spacing` 设置不是__英文单词的间隔__，而是字母间的间隔。
- `text-align:center`,`text-align:left` 段落排版对齐
- `background:-moz-linear-gradient(top, #FFC3C8, #FF9298);`
##CSS盒模型
css中html的标签元素大体分为:__块状元素,内联元素__(行内元素)和__内联块状元素__.常见分类:  

- 块状:div, p, h1, h6, ol, url, dl, table, address, blockquote, form
- 内联:a, span, br, i, em, strong, label, q, var, cite, code
- 内联块状: img, input 

###块状元素
css中块级元素都从新的一行开始,并且气候的元素也得另起一行,如`h1`,元素的高度,宽度,,行高以及顶和底边距都可设置.设置`sisplay:block`将元素设置为块级元素.如设置:

		a{display:block;}/*将a变成块级元素,这行本身也是块级元素*/

###内联元素
内联元素和其他元素都在一行上,元素的高度,宽度以及顶部和底部边距不可设置,元素的宽度就是它包含的文字或突变的宽度,不可改变.通过`display:inline`将元素设置为内联元素.如`div{display:inline;}`

###内联块状元素
内联块状元素和其他元素都在一行上,元素的高度宽度行高以及顶和底边距都可设置.使用`display:inline-block`来设置.

###盒模型边框
围绕着内容以及补白的线,可为他设置粗细,样式和颜色.

		div{border:2px solid red;}
		div{
			border-width:2px;
			border-style:solid(dashed(虚线)|dotted(点线)|solid(实线));
			border-color:red;
		}
详细样式:

		div{border-bottom:1px solid red;}
		border-top:1px solid red;
		border-right:1px solid red;
		border-left:1px solid red;

###和模型的宽度和高度
css内定义的宽和高指的是填充以内的内容范围.盒子的实际宽度=左边界 + 左边框 + 内容宽度 + 右边框 + 右边界.高度同理.块状元素的特点之一：在不设置宽度的情况下，显示为父容器的100%.元素与其他元素间的距离用margin设置.padding在框里面,margin在框外面.

		div{
			width:200px;
			padding:20px;/*内边边距*/
			border:1px solid red;
			margin:10px;/*外边距*/
		填充
		div{
			padding-top:20px;
			padding-right:10px;
			padding-bottom:15px;
			padding-left:30px;
			padding:10;/*上下左右都填充为10px*/
		}
元素盒模型图示:  
![元素盒模型图示](http://img.mukewang.com/543b4cae0001b34304300350.jpg)  

  
盒模型里面的宽度和高度:  
![盒模型里面的宽度和高度](http://img.mukewang.com/539fbb3a0001304305570259.jpg)

line-height 属性设置行间的间距(行高).其值可以为百分比或者数字

##CSS布局模型
- 流动模型(Flow)是默认的网页布局模式.1,块状元素都会在所处的包含元素内自上而下按顺序垂直延伸分布,默认状态下,块状元素的宽度在没设置width时都为百分百,实际上,块状元素都会以行的形式占据位置正个行,类似贴上代码那行.2.内联元素都会在所处的包含元素内从左到右水平分布显示

		类似这行,流动模型

- 浮动模型.使css定义为浮动来使两个块状元素并排显示.
	
		div{width:20px; fload:left;}
		div{
    		width:200px;
    		height:200px;
    		border:2px red solid;
		}
		#div1{float:left;}
		#div2{float:right;}

###层模型
- 绝对定位,要设置`position:absolute`,将元素从文档流中拖出来,然后使用left,right,top,bottom属性相对于其最近的一个具有定位属性的父包含块进行绝对定位.如果不存在父包含快,则相对于body即浏览器窗口.

		div{
		    width:200px;
		    height:200px;
		    border:2px red solid;
		    position:absolute;
		    left:100px;
		    top:50px;
		}
		<div id="div1"></div>

- 相对定位,需要设置`position:relative`,通过left,right,top,bottom属性确定元素在正常文档流中的便宜位置.元素会相对于以前的位置移动.移动前的位置保留不动.占据的仍然是以前的位置.
- 固定定位,需要设置`position:fixed`,它的相对移动的坐标是视图(屏幕内的网页)本身.视图是固定的,它不会随浏览器窗口的滚动而变化.与`background-attachment:fixed`功能相同.
- Relative与Absolute组合使用.设定相对于其他元素进行定位,`position:relative`
	>1. 参照定位的元素必须是相对定位元素的前辈元素
	>2. 参照定位的元素必须加入position:relative
	>3. 定位元素加入position:absolute，便可以使用top、bottom、left、right来进行偏移定位了。

##盒模型代码简写
- `margin,padding,border:10px 11px 12px 13px` 分别设置上下左右边距.可以缩写,上下一样可以省略,左右一样可以省略,都一样可以只写一个.
- 颜色值缩写,每两位值相同可以缩写一半.`p{color:#000000;}`-->`p{color:#000}`,`p{color:#336699;}`-->`p{color:#369}`
- 字体缩写:

		body{
		    font-style:italic;
		    font-variant:small-caps; 
		    font-weight:bold; 
		    font-size:12px; 
		    line-height:1.5em; 
		    font-family:"宋体",sans-serif;
		}
		可以缩写成如下
		body{
		    font:italic  small-caps  bold  12px/1.5em  "宋体",sans-serif;
		}
		1、使用这一简写方式你至少要指定 font-size 和 font-family 属性，其他的属性  
		  (如 font-weight、font-style、font-varient、line-height)如未指定将自  
		  动使用默认值。

		2、在缩写时 font-size 与 line-height 中间要加入“/”斜扛。一般情况下因为对于
		  中文网站，英文还是比较少的，所以下面缩写代码比较常用：
		
			body{
			    font:12px/1.5em  "宋体",sans-serif;
			}
			只是有字号、行间距、中文字体、英文字体设置。

##值和单位
- 颜色值,有字体颜色`color`, 背景色`background-color`,边框色`border`等.有几种配色方案:

		p{color:red;}			   /*英文*/
		p{color:rgb(133,45,200);}  /*RGB色*/
		p{color:rgb(20%,33%,25%);} /*百分比*/
		p{color:#00ffff;}          /*十六进制数字*/
[常用颜色可查表](http://img.mukewang.com/54c5b4120001f20808000902.jpg)
- 长度值.`px`:像素,`em`:本元素给定字体的 font-size 值,如果`font-size:14px`,那么`1em`表示14px.但当给 font-size 设置单位为em时，此时计算的标准以p的__父元素的__ `font-size` 为基础。 **`百分比`**:`p{font-size:12px;line-height:130%}.`设置行高（行间距）为字体的130%.
		
		p{font-size:12px;text-indent:2em;}/*首行缩进24px.两个字体大小距离*/
		/*设置博客文章只在中间显示文章列表可以更具百分比来设置, padding*/
		.wrapper{
		  box-sizing: border-box;
		  padding-left: 15%;
		  padding-right: 15%;
		  position: relative;
		  left: 17;		  
		}
		
		
##常见style
- 隐藏style="display:none"
- 背景图body {background-image: url(/i/eg_bg_04.gif);}
- 元素靠右 float:right 后面一般加个`<br />`如果后面元素需要换行.
- border-collapse: collapse; 将 表格的两边框合并为一条
- vertical-align: center; 设置垂直方向的位置
- 设置文本在图片下面居中， 需要设置图片`display:inline-block`, 再将其上层设置为  `text-align: center`


