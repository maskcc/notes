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

##CSS盒模型
css中html的标签元素大体分为:__块状元素,内联元素__(行内元素)和__内联块状元素__.常见分类:  

- 块状:div, p, h1, h6, ol, url, dl, table, address, blockquote, form
- 内联:a, span, br, i, em, strong, label, q, var, cite, code
- 内联块状: img, input 