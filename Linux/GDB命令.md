[参考1](http://www.cnblogs.com/ggjucheng/archive/2011/12/14/2288004.html#_Toc311658074)  
[参考2](http://blog.csdn.net/haoel/article/details/2879)  
[参考3](http://www.programlife.net/gdb-manual.html)  

1. 编译时加上 `-g` 选项写入调试信息.

		g++ gdb.cpp -o g -g

2. `gdb 文件名` 或进入gdb后,`file 文件名`,加载被调试的可执行程序

		gdb file filename


3. `b`, Breakpoint, 设置断点,可用行号,函数名称,执行地址方式指定断点位置.

		b 行号
 		b 函数名
		d 删除所有函数, d n(第几个断点) 删除某个断点
		break filename:line Number //某个文件的某行
		break class::function //某函数
		info b //查询所有断点信息
		disable 断点, enable once range断点停止一次

4. `s,n`, `s`执行一行源码, `n`单步进入函数.`f`退出函数.`until`直到退出循环体. `c`, Continue,继续执行直到下一个断点.
5. `p` 打印变量信息.

		p gameID //打印gameID的信息
		p 'f2.cp::x' //查看全局变量(被局部变量覆盖的)
		p ptr@len //查看连续存储空间ptr,长度为len
		print set x=4 //修改变量的值

6. `display`,设置程序中断后欲显示的数据及格式

		display /i $pc //$pc代表当前汇编指令, /i以十六进制显示
		undisplay, 取消先前的display设置

7. `i`, info,显示各类信息,参考`help i`
8. `q`, quit, 退出 
9. `watch`, 观察点,当值有变化时暂停

		rwatch 表达式, expr 被读时,停住程序
		awatch 变量或表达式的值被读写时暂停
		info watchpoints 列出所有观察点

10. 跳转执行

		jump linepec//跳转到某点
11. 产生信号量
		
		signal signal

12. 强制返回

		return 
		return expression //返回的数值

13. 强制调用函数

		call expr
		print expr

14. 显示源码

		list line  //显示当前停止行到后面line行
		list function
		list 显示后面的源程序
		list - 显示前面的源程序
		set listsize count
		show listsize   //设置和查看当前显示源码的行数

15. GDB调试`core`文件步骤
	- gdb -c core.1111 #将core文件载入gdb
	- file binaryname  #崩溃的程序,在符号集载入gdb
	- 注: 在编译源文件时,需要添加`-g` 选项来保存符号信息
	- bt 显示调用栈信息(函数调用层次结构)
	- frame n 进入上面显示的函数
	- n, 单步, s, 进入函数

