##代码大体布局

	<html>
	<!-- 注释方法 -->
	<head>	
	<title>标题</title>
	<script>脚本</script>
	<style>CSS代码</style>	
	</head>
	
	<body>
	本体
	</body>
	
	</htm>
	
##段落标签
- `<h1></h1>`到`<h6></h6>`标题栏
- `<p></p>`段落,自动在前后添加空行

##空标签
- `<br />`换行
- `<hr />`水品线

##文本处理
- `<del>$120</del>`<del>删除线</del>
- `<ins>十二</ins>`<ins>下划线</ins>
- `<pre></pre>`预格式化处理文本,保留本来空格换行
- `<b></b>`**加粗文本**
- `<var>定义变量</var>`,`<i>_斜体_</i>`
- `<code>代码</code>,<kbd>键盘吗</kbd>,<tt>打字机</tt>,<samp></samp>`代码标签
- `<address></address>`地址标签
- `<abbr title="etcetera">etc.</abbr>`定义缩写..<abbr title="etcetera">etc.</abbr>
- `<acronym title="World Wide Web">WWW</acronym>`定义首字母缩写..<acronym title="World Wide Web">WWW</acronym>
- 从右向左输出,反向输出`bdo`

		<bdo dir="rtl">
		Here is some Hebrew text
		</bdo>
		<!--输出 Here is some Hebrew text-->
- 常引用,会插入换行和外边距`<blockquote></blockquote>`,`<q></q>`引用,不会有,只有空格`<cite></cite>`定义引用、引证,`<dfn></dfn>`定义一个定义项目。
- `<big>加大字号</big>,<small>缩小字号</small>,<strong>加重语气</strong>`
- `<sub>定义下标</sub>, <sup>上标字</sup>`


##样式标签
<style>定义样式</style>
<link>资源引用</link>
<div>文档中的节或块级</div>
<span>文档中的行内的小块或区域</span>
<font>规定文本的字体、字体尺寸、字体颜色。不赞成使用。请使用样式。<font>
<center>对文本进行水平居中。不赞成使用。请使用样式。</center>
没下划线的连接<a href="/example/html/lastpage.html" style="text-decoration:none">a</a>