1. shell中给变量赋值,变量名与值之间不要有空格.获取值可以使用 $value, 常常使用${value}来取值.
		
		#!/bin/sh
		a="hello world"

2. 保存好shell.sh后,还要给它执行权限. chmod +x shell.sh
3. shell中读取用户输入
		
		read var

4. 重定向操作符:
	- `>` 写入文件并覆盖旧文件
	- `>>` 加到文件的尾部,保留旧文件的内容

5. 减号,将一个命令的输出作为其他命令的命令行参数
	
	tar -zcvf lastmod.tar.gz `find .-mtime -l -type f -print`

6. 流程控制,使用" [] "来表示条件测试,括号两边有空格

	if ...; then
	...
	elif...; then
	...
	else
	...
	fi

	[-f "somefile"] 判断是否是一个文件
	[-x "/bin/ls"] 判断/bin/ls是否有可执行权限
	[-n "$var"] 判断$var变量是否有值
	["$sa" = "$sb"] 判断$sa和$sb是否相等
	执行 man test 可以查看测试表达式,一般是比较文件等
7.

8. 逻辑操作符`&&` , `||`
		
		if [-f "/etc/shadow"] && echo "This pc use shadow passwd"
		if [-f "/etc/shadow"] || {echo "good file"; exit 1;}
		exit 1 退出
		使用花括号作为匿名函数.

9. $1 表示传递给脚本的第一个参数.
10. 函数的使用
