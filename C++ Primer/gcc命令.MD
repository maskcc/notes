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
14. `-llibrary` 连接名为library的库文件, **添加动态文件时,不需要库前面的lib**,新加入到`/usr/local/lib`的库时,要修改`/etc/ld.so.conf`和执行 `echo "/usr/local/lib" >> /etc/ld.so.conf   #/sbin/ldconfig`
15. 在include语句中，“<>”表示在标准路径中搜索头文件，““””表示在本目录中搜索。故在上例中，可把hello1.c的“#include<my.h>”改为“#include “my.h””，就不需要加上“-I”选项了。
16. `-On` 来控制优化代码的生成,n是一个代表优化级别的整数.不用编译器对应效果不同.一般从0-3.一般在发行时才开启优化.
17. 一条编译语句范例 

				    
		g++ -I../include -I../../lib/include -I../../../third_part/xml2c    #引入的头文件
		 -g -DDEBUG -D_REENTRANT 											#编译选项
		-o ../../bin/LobbyServer/LobbyServer ../../obj/LobbyServer/DBOperationCallback.o   #生成的文件
		../../lib/lib/libaes.a ../../../third_part/pugixml/pugixml.a 		#引入的静态库   
		 -lpthread -lrt -lnsl -lz -lgcc_s -lodbc 							#引入的动态链接库
18. 在引用了第三方库后编译报错`undefined reference to 'event_init'`, 可能需要将 `-levent` 放到编译命令的末尾.[解释](http://blog.chinaunix.net/uid-28682353-id-4116673.html),gcc的链接顺序是 被依赖的库放在其它库的后面.
19. [理解编译与连接](http://www.cprogramming.com/compilingandlinking.html)
20. 将文件编译成动态链接库的命令范例, 以及连接使用该动态库.`$ ldd main` 可以查看是否调用了该动态库.

		$ g++ one.cpp two.cpp three.cpp -fPIC -shared -o libtest.so
		g++ main.cpp -L. -ltest -o main

	- -shared 该选项指定生成动态连接库（让连接器生成T类型的导出符号表，有时候也生成弱连接W类型的导出符号），不用该标志外部程序无法连接。相当于一个可执行文件
	- -fPIC：表示编译为位置独立的代码，不用此选项的话编译后的代码是位置相关的所以动态载入时是通过代码拷贝的方式来满足不同进程的需要，而不能达到真正代码段共享的目的。
	- -L.：表示要连接的库在当前目录中
	- -ltest：编译器查找动态连接库时有**隐含的命名规则**，即在**给出的名字前面加上lib**，后面加上.so来确定库的名称

			注意:
			调用动态库的时候有几个问题会经常碰到，有时，明明已经将库的头文件所在目录 通过 “-I” include进来了，
			库所在文件通过 “-L”参数引导，并指定了“-l”的库名，但通过ldd命令察看时，就是死活找不到你指定链接的so文件，
			这时你要作的就是通过修改 LD_LIBRARY_PATH或者/etc/ld.so.conf文件来指定动态库的目录。
			通常这样做就可以解决库无法链接的问题了。
			export LD_LIBRARY_PATH="../lib",零时设置环境变量.

21. 生成静态库.如果`gcc`已经生成了一些`*.o`文件, 则使用

		$ ar rcs libmylib.a *.o
	打包成`libmylib.so`文件

		gcc中关于库的参数有：

		-L  指定搜寻库的目录
		      如指定当前目录 gcc -L .
		-l    指定要链接的库的名称
		      加入库的名称是libmylib.a，则gcc -l mylib，即去头去尾。
		--static  组织在链接时使用动态库
		--shared 生成动态库
		--static-libgcc  链接静态libgcc库
		--shared-libgcc 链接动态libgcc库
		
		可见对动态库和静态库的使用方法是一样的，同一个库如果同时存在动态库和静态库，优先链接动态库，除非使用--static强制使用静态库。


