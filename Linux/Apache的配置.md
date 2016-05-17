1. [apache官方文档](https://httpd.apache.org/docs/2.4/zh-cn/bind.html)
2. [Tomcat添加PHP支持](http://blog.csdn.net/rznice/article/details/40650737)
3. `MySQl` [download](), `Apache` [download](), `PHP` [download]()的 windows配置方法

		1. php环境时忽略警告:display_errors 设置为Off
		2. 配置 Apache时在conf/httpd.conf末尾添加如下
			LoadModule php5_module c:/php/php5apache2_4.dll
			PHPIniDir "c:/php"
			AddType application/x-httpd-php .php
			AddType application/x-httpd-php .html				
				<IfModule dir_module>
					DirectoryIndex index.html index.php    #index.php可以让它作为默认首页
				</IfModule>
		3. php和Apache要安装对应的版本,2.4要放php5apache2_4.dll, 2.2的要放php5apache2_4.dll
		4. 32位版本和64位版本也要对应,不然启动Apache会失败,windows日志显示 `Cannot load c:/php/php7apache2_4.dll into server:`