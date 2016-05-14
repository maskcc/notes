详细可参考[azreally](http://www.cnblogs.com/azraelly/archive/2012/07/07/2580839.html) 
[参考2](http://www.cnblogs.com/ggjucheng/archive/2011/12/14/2287738.html)

1. 编译可以用gcc/g++，而链接可以用g++或者gcc -lstdc++  
2. gcc 编译过程分为预编译(Preprocessing),编译(Compilation),汇编(Assembly),连接(Linking).
3. 预处理:
	
		gcc -E test.c -o test.i
		-E 只进行预编译，不做其他处理

4. 编译为汇编代码 

		gcc -S test.i -o test.s
		-S 只是编译不汇编，生成汇编代码

5. 汇编连接,将其与标准库进行连接,最终生成程序

		gcc -c test.cpp -o test.o 
		gcc test.o -o test
		-c 只编译不连接,生成目标文件".o"  

6. `-Wall`选项能够使gcc竟可能多的产生警告信息

		gcc -Wall test.c -o test
		gcc -Werror test.c -o test //所有警告都停止编译

7. 连接库文件,编译成可执行文件

		gcc -c -I /usr/dev/mysql/include test.c -o test.o
		gcc -L /usr/dev/mysql/lib -lmysqlclient test.o -o test

8. Linux下库文件有动态链接库(通常.so结尾)和静态链接库(通常以.a结尾).区别在于是在运行时动态加载还是在编译时静态加载.默认Gcc连接时优先使用动态库,在动态库不存在时使用静态链接库,可以在编译时加上 `-static`选项强制使用静态库.

		gcc -L /usr/dev/mysql/lib -static -lmysqlclient test.o -o test

9. `-g` 在可执行程序中包含标准调试信息
10. `-o file`把文件输出到file里
11. `-l dir` 在头文件的搜索路径列表中添加dir目录 
12. `-L dir` 在库文件的搜索路径列表中添加dir目录
13. `-static` 静态链接库
14. `-llibrary` 连接名为library的库文件
15. 在include语句中，“<>”表示在标准路径中搜索头文件，““””表示在本目录中搜索。故在上例中，可把hello1.c的“#include<my.h>”改为“#include “my.h””，就不需要加上“-I”选项了。
16. `-On` 来控制优化代码的生成,n是一个代表优化级别的整数.不用编译器对应效果不同.一般从0-3.一般在发行时才开启优化.