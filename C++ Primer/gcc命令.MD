详细可参考[azreally](http://www.cnblogs.com/azraelly/archive/2012/07/07/2580839.html) 
[参考2](http://www.cnblogs.com/ggjucheng/archive/2011/12/14/2287738.html)

##[动态库与静态库讲解非常详细的文章](http://www.cnblogs.com/skynet/p/3372855.html)

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

22. 生成动态库文件. [博客园写得比较好的参考](http://www.cnblogs.com/skynet/p/3372855.html)
	1. 使用`-fPIC` 选项, `PIC` 指`Position Independent Code`,生成`.o`文件
		
			$gcc -c -fPIC -o source.o source.c

	2. 生成共享库, `-shared`表示生成一个共享库.

			$gcc -shared -o libsource.so source.o
		
	4. `ldd` 用于显示可执行文件所以来的库

24. linux下查看`.so`导出函数列表
		
		nm -D lua.so
		objdump -tT lua.so

25. [动态库与静态库](http://www.cnblogs.com/zxtp/p/5147608.html)

        显式调用C++动态库注意点
        对C++来说，情况稍微复杂。显式加载一个C++动态库的困难一部分是因为C++的name mangling；另一部分是因为没有提供一个合适的API来装载类，在C++中，您可能要用到库中的一个类，而这需要创建该类的一个实例，这不容易做到。

        name mangling可以通过extern "C"解决。C++有个特定的关键字用来声明采用C binding的函数：extern "C" 。用 extern "C"声明的函数将使用函数名作符号名，就像C函数一样。因此，只有非成员函数才能被声明为extern "C"，并且不能被重载。尽管限制多多，extern "C"函数还是非常有用，因为它们可以象C函数一样被dlopen动态加载。冠以extern "C"限定符后，并不意味着函数中无法使用C++代码了，相反，它仍然是一个完全的C++函数，可以使用任何C++特性和各种类型的参数。

26 [编译成动态链接库时, 可以使用 -Wl, -E 来使动态链接库使用主程序的全局变量](http://blog.chinaunix.net/uid-28647963-id-4190817.html)
	[ld命令讲解(En)](https://ftp.gnu.org/old-gnu/Manuals/ld-2.9.1/html_node/ld_3.html)
	[Linux动态库之同名符号](http://stackoverflow.com/questions/2172621/cannot-open-shared-object-file-no-such-file-or-directory)

27. [调用动态库时, 提示 cannot open shared object file: No such file or directory](http://stackoverflow.com/questions/2172621/cannot-open-shared-object-file-no-such-file-or-directory)

28. Gprof 可以用来查看c++ 代码性能. 编译程序时`g++/gcc`添加`-pg`选项, 运行程序并正常退出, 查看`gmon.out`文件. 使用`gprof -b ./main gmon.out > tmp.txt`, 将内容导出到`tmp.txt`文档中.无法得到程序内核空间的运行时间。它对内核态的调用分析无能为力。[参考1](http://en.wikipedia.org/wiki/List_of_performance_analysis_tools), [参考2](https://computing.llnl.gov/tutorials/performance_tools/#Considerations)...内存泄漏问题也可以使用这个工具`valgrind` [使用参考](http://blog.csdn.net/sunmenggmail/article/details/10543483)
29. readelf,
30. 当编译没问题, 运行时提示 `/lib64/libstdc++.so.6: version `GLIBCXX_3.4.21' not found (required by ./r)`, 需要添加连接选项 `-static-libstdc++ -static-libgcc` [问题](http://stackoverflow.com/questions/19386651/how-to-fix-usr-lib-libstdc-so-6-version-glibcxx-3-4-15-not-found)
[原因](http://stackoverflow.com/questions/13636513/linking-libstdc-statically-any-gotchas)
[解决类似 /usr/lib64/libstdc++.so.6: version `GLIBCXX_3.4.21' not found 的问题](http://itbilu.com/linux/management/NymXRUieg.html)