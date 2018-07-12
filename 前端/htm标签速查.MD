
##代码大体布局
主要构成如下：

- `header: <header>`.  
- `navigation bar: <nav>`.
- main content: <main>, with various content subsections represented by `<article>, <section>, and <div>` elements.
- sidebar: `<aside>`; often placed inside `<main>`.
- footer: `<footer>`.

		<!DOCTYPE html>  // 标头
		<html>
		<head>
		    <meta charset="utf-8">
		    <title>My page title</title>
		    <link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300|Sonsie+One" rel="stylesheet" type="text/css">
		    <link rel="stylesheet" href="style.css">
		    <!-- the below three lines are a fix to get HTML5 semantic elements working in old versions of Internet Explorer-->
		    <!--[if lt IE 9]>
		      <script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.js"></script>
		    <![endif]-->
		 </head>
		
		<body>
	    	<!-- Here is our main header that is used across all the pages of our website -->
	    <header>   // 标题
	      <h1>Header</h1>
	    </header>
	    <nav>      // 导航栏
	      <ul>
	        <li><a href="#">Home</a></li>
	        <li><a href="#">Our team</a></li>        
	      </ul>
	
	       <!-- A Search form is another commmon non-linear way to navigate through a website. -->
	
	       <form>
	         <input type="search" name="q" placeholder="Search query">
	         <input type="submit" value="Go!">
	       </form>
	     </nav>
	
	    <!-- Here is our page's main content -->
	    <main>  // 住页面内容 
	
	      <!-- It contains an article -->
	      <article>  // 文章
	        <h2>Article heading</h2>
	
	        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Donec a diam lectus. Set sit amet ipsum mauris.</p>
	      </article>
	
	      <!-- the aside content can also be nested within the main content -->
	      <aside>   // 侧边栏
	        <h2>Related</h2>
	
	        <ul>
	          <li><a href="#">Oh I do like to be beside the seaside</a></li>
	          <li><a href="#">Oh I do like to be beside the sea</a></li>          
	        </ul>
	      </aside>
	
	    </main>
	
	    <!-- And here is our main footer that is used across all the pages of our website -->
	
		// 脚注
	    <footer>
	      <p>©Copyright 2050 by nobody. All rights reversed.</p>
	    </footer>
	
		  </body>
		</html>
	
参考样式， 如图:![](https://mdn.mozillademos.org/files/12417/sample-website.png)
## 标头
- link  
	- rel="shortcut icon", 可以设置一个`.ico, .gif, .png` 类型的 16*16图像在 index 目录下
	`<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">`
	-  `<link rel="stylesheet" href="my-css-file.css">`, 设置css
- script
	- `<script src="my-js-file.js"></script>`, 一般将 js 加载放在 body 结束标签的上面一个标签，这样等网页所有内容加载完成后可以用 js 操作网页内容，　不然可能页面还未加载就去操作内容，抛出错误(暗坑+1)
	- script 需要关闭标签　
- meta
	常用 meta:
	- charset="utf-8" 设置编码  
	- name="author" content="joe" 设置一些自定义,name="description" 一般和 [SEO](https://developer.mozilla.org/en-US/docs/Glossary/SEO) 相关
- base 	用来表示该HTML文档中所有连接的默认连接   
	`<base href="/" target="_blank">`

- style
- base

## 表格
- table
	- 以下属性不要使用了， 用css设置 
		- align(margin-left, margin-right 为 auto ), 
		- bgcolor(background-color), 
		- border( border, border-color, 
		- border-width and border-style),
		- cellpadding( border-collapse, padding to td), 
		- cellspacing(border-spacing, ),
		- frame(border-style, border-width),
		- rules( `<thead>`, `<tbody>`, `<tfoot>`, `<col>` or `<colgroup>`),
		- summary,
		- width   
	- tr, 一列数据
		- th 表格头, 表示表头
		- td 表格数据
		- th有一个 scope 属性， 设置为  col 表示列表头， 设置为 row  表示为行表头, 主要是为了方便 ScreenReader for blind
			- scope="colgroup", scope="col". 对于上面有大分类的表头， 如 人， 设置属性为 scope="colgroup", 下面的 列男人， 
			女人设置为 scope="col" 表示从属关系 
		- colspan  和 rowspan 设置跨越 row 和  col 的宽度
	- thead， `<thread></thread>`,  表示表头内容, 方便css 设置格式
	- tbody, `<tbody></tbody>`, content 内容 
	- tfoot， `<tfoot></tfoot>`, 脚注	
	- caption 带标题
- button 按钮
	- autofocus, boolean 属性， 页面加载完成后自动聚焦
	- disabled, 禁用
	- form, 关联的 form id
	- formaction, 处理这个按钮的网页
	- method="post"
	- formmethod, 为 post 或 get
	- type, submit 提交内容, reset 将form 内容设置为默认, button 操作本地js
	- value, 默认信息， 当表单没填信息时
- form 表格， 
	- action， 可以被 input或 button 的 formaction覆盖掉
	- target, 网页结果展示目标
	- name 参数是key， value 是提交的属性, 一个页面只有一个提交， type = submit 就是提交按钮, 一定要对name 属性赋值才会提交数据
	- filedset 标签描述下面标签的用途, 可以在下面的组下用  legend 分组, legend标签内部为描述内容
	- enctype="multipart/form-data" 传送文件, application/x-www-form-urlencoded 这是已编码为URL参数的表单数据
- input 输入框,
	- type, 输入类型
		- button 按钮, 没有默认操作 <input type=button value=submit>
		- text 文本输入
		- radio 单选框 <input type=radio>
		- checkbox 选择框 <input type=checkbox>
		- color 字体颜色 <input type=color>
		- file 选择文件 <input type=file>, accept 设置可接收的类型, audio/* video/* image/* 
		- image, 图片， 可以设置 src, title, alt, height, width 属性, 会提交点击的坐标， name.x, name.y
		- password 密码 maxlength, minlength  最大最小长度
		- date 输入一个日期 <input type=date>
		- datetime-local 无时区， 本地时间
		- email  <input type=email>		
		- hidden 隐藏， 但是可以被提交到服务器		
		- month 输入月份
		- number 输入数字,有 max, min, step 属性，  step 是设置改变的步长的
		- range 进度条,滑块
		- reset 设置为默认内容
		- submit 提交表单
		- ratio 单选框, 如果它们的name属性共享相同的值，那么它们将被认为属于同一组的按钮
	- list 属性， 绑定一个 datalist 的id， 会自动填充匹配内容
	- name, __一定要对name 属性赋值才会提交数据__
	- autocomplete 是否能被浏览器自动填充, "off", "on", 还有许多常见默认属性 
	- autofocus  自动聚焦， 加载完页面后
	- checked 是否被选中 
	- disabled 禁止
	- form  关联的form id
	- list 显示的备选下拉框id， 必须是一个 `datalist`的id 
	- max  最大数, maxlength, min, minlength
	- multiple, 文件或 email 是否支持一次输入多个
	- placeholder 默认提示内容, <input type=text  placeholder="最大音量">
	- readonly  只读
	- required  必须填写, optional 选填
	- size 默认长度是20 
	- value 默认值
	- required 不能为空， css 中 input:valid 样式表示内容有误时的显示
	- pattern="banana|cherry" 表单验证中的正则表达式
	- maxlength 最大字数, minlength 最小
- textarea 文本输入框
	- form
	- cols 行数, rows	
	- maxlength 最大字数, minlength 最小
	- wrap , hard, soft
	- autocomplete 自动完成
	- autofocus	
	- placeholder 提示字符
	- required 必填, 
	- css 属性  resize: none; 是否可以调整大小
- select 选择框
	- name 提交时的key
	- id 对应的描述 label, 和对应 label id 一样
	- multiple 多选
	- size, 当 multiple 设置后， 默认显示几个在列表中 
	- option
		- label 指定对应的 label
		- selected 是否默认选择
		- value 被提交的值
	- optgroup, 对数据进行分组，用来放入一组 option, 有个 label标签表示这组名称
- colgroup 对表格分组, 每个 `<col>` 代表一列， 属性 span=num, span 表示跨num列,
		 
		<table>
	    <caption>Superheros and sidekicks</caption>
	    <colgroup>
	        <col>
	        <col span="1" styple="background-color: #ffe8d4;">
	        <col span="3" class="flash">
	    </colgroup>
	    <tr>
	        <td> </td>
	        <th scope="col">Batman</th>
	        <th scope="col">Robin</th>
	        <th scope="col">The Flash</th>
	        <th scope="col">Kid Flash</th>
	    </tr>
	    <tr>
	        <th scope="row">Skill</th>
	        <td>Smarts</td>
	        <td>Dex, acrobat</td>
	        <td>Super speed</td>
	        <td>Super speed</td>
	    </tr>
	    <tr>
	        <th scope="row">Weapon</th>
	        <td>Martial, gadgets</td>
	        <td>Martial, gadgets</td>
	        <td>Martial</td>
	        <td>Martial</td>
	    </tr>
	</table> 

- progress 进度条
	- id 对应的 label
	- name 提交的key
	- max 最大值
	- value 当前进度	
- datalist 数据列表， 给其他控件使用 
	- id 对应的 input
	- option value="花"	 可供选择的内容
- hgroup 一些标题的组合
- figure, 一个图像， 里面常嵌套一个 img 和 figcaption 描述


		<figure>
		  <img
		  src="https://developer.cdn.mozilla.net/media/img/mdn-logo-sm.png"
		  alt="An awesome picture">	
		  <figcaption>MDN Logo</figcaption>
		</figure>
- meter, 仪表盘 `<meter min="0" max="100" value="75" low="33" high="66" optimum="50">75</meter>`
## 列表
- ul　--> li 无序列表
- ol --> li 有序列表　　
- dl --> dt --> dd 

##段落标签
- `<h1></h1>`到`<h6></h6>`标题栏
- `<p></p>`段落,自动在前后添加空行

##空标签
- `<br />`换行
- `<hr />`水品线

##文本处理
- `<!-- This is a comment -->` 注释
- `<del>$120</del>`<del>删除线</del>
- `<ins>十二</ins>`<ins>下划线</ins>
- `<pre></pre>`预格式化处理文本,保留本来空格换行
- `<b></b>`**加粗文本**
- `<em>斜体</em>`<em>斜体</em>
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
- `<a><img></img></a>` 可以提供图片链接　
- 使用`<a>`跳转到指定位置, 先给跳转位置一个id, 再通过 a　标签访问，　跳html 文件使用　`.` 分割


		<p id="content">jump here</p> // 在 index.html中
		<a href="index.html#content"> jump to index</a>
		// 疑问: 当设置了 base 标签，　指向当前目录，　使用跳转会跳到目录页面

- blockquote 引用文本, q 段内引用
- abbr, 设置文本的缩写  `<abbr title="Hypertext Markup Language">HTML</abbr>` <abbr title="Hypertext Markup Language">HTML</abbr>
- sup 上标, `China<sup>TM</sup>` China<sup>TM</sup>, sub 下标， `H<sub>2</sub>O` H<sub>2</sub>O
- code, pre, samp, 代码片段, var 变量, kbd 输入数据
- time  标签， 放置时间属性
- span, 用来放置一些没有特定意义， 但是需要特定 style 的内容
- div, 是一个区块包含标签 
## 常见属性
- src 制定所加在的内容路径， 根据meta 的 `<base>` 相对目录下开始 
- class 制定标签的样式
- href 制定 a 标签的链接路径 
- title tooltip, 当鼠标移动上去时弹出的提示
- target 点击链接时是打开新页面 
- disabled 输入框等可以设置disabled属性 来禁止输入(这是可以没有值得属性)   
	`<input type="text" disabled="disabled">`
- lang 可以设置　p 标签的语言如 <p lang = ja></p>, [具体可查](https://en.wikipedia.org/wiki/ISO_639-1)
	- zh, 中文　
	- en, 英文
	- ja, 日本
	- ko, 韩语
- alt 当 img 无法显示时，　代替的文字
- a 标签的　download　属性，　直接下载文件

		<a href="https://download.mozilla.org/?product=firefox-latest-ssl&os=win64&lang=en-US"
		   download="firefox-latest-64bit-installer.exe">
		  Download Latest Firefox for Windows (64-bit) (English, US)
		</a>
- white-space:nowrap 设置文档不换行

##样式标签
<style>定义样式</style>
<link>资源引用</link>
<div>文档中的节或块级</div>
<span>文档中的行内的小块或区域</span>
<font>规定文本的字体、字体尺寸、字体颜色。不赞成使用。请使用样式。<font>
<center>对文本进行水平居中。不赞成使用。请使用样式。</center>
没下划线的连接<a href="/example/html/lastpage.html" style="text-decoration:none">a</a>


## 特殊字符
-  < `&lt;`
-  > `&gt;`
-  " `&quot;`
-  ' `&apos;`
-  & `&amp;`

## 参考
- [Introduce to HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML)
- [HTML5参考](https://html.spec.whatwg.org/multipage/indices.html#element-content-categories)
- [标签列表](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav)
- [[html module1]](https://html5up.net/) [[module2]](https://freehtml5.co/)