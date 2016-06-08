1. 在makefile中使用变量

		obj = main.o xml.o net.o tst.o
		target : $(obj)
        g++ -o target $(obj)

2. make 的自动推导,只要make看到一个`.o`文件,那么`something.c`就是`something.o`的依赖文件.并且`cc -c something.c`也会被推导出来.

		obj = main.o xml.o net.o tst.o
		target : $(obj)
        g++ -o target $(obj)

		man.o def.h
		xml.o def.h
		net.o def.h
		tst.o def.h

3. 清理

		.PHONE : clean
		clean : 
		-rm edit $(objects) #- 表示某系文件出现异常忽略,.PHONY表示clean是一个伪目标.一般clean放在最后.

4. Makefile中的命令,都必须以`Tab`键开始.
5. Makefile文件名一般写为`makefile`或`Makefile`, 如果不是上述名称,需要使用类似

		make -f Make_gate #或
		make --file Make_gate

6. 引用其他Makefile

		include foo.make *.mk $(bar)

7. 规则语法

		targets : prerequisites
		command
		...
		或是这样：
		targets : prerequisites ; command
		command
		...

		command 是命令行，如果其不与“target:prerequisites”在一行，那么，必须以[Tab键]开头， 如果和 prerequisites 在一行， 那么可以用分号做为分隔。

8. make 支持三个通配符,`*`, `?` 和`[...]`

		objects := $(wildcard *.o)    #展开通配符

9. VPATH 设置查找路径

		VPATH = src:../headers   ##定义了两个而目录,src和headers,用冒号分隔 
		vpath 指定不同的文件在不同的而搜索目录中.
		vpath<pattern><directories> 为符合模式<pattern>的文件指定搜索目录<directories>。  
		vpath <pattern> 清除符合模式<pattern>的文件的搜索目录。
		vpath 清除所有已被设置好了的文件搜索目录。

		vapth 使用方法中的<pattern>需要包含“%”字符。“%”的意思是匹配零或若干字符，
		例如，“%.h”表示所有以“.h”结尾的文件。<pattern>指定了要搜索的文件集，而
		<directories>则指定了<pattern>的文件集的搜索的目录。例如：
		vpath %.h ../headers
		该语句表示，要求 make 在“../headers”目录下搜索所有以“.h”结尾的文件。（如果
		某文件在当前目录没有找到的话）

10. 伪目标.并不是一个文件,只是一个标签,所以make无法生成它的依赖关系和决定是否要执行,且命名不能和文件名重复,可以使用标记`.PHONY`明确指明一个目标是伪目标.

		伪目标一般没有依赖的文件。但是，我们也可以为伪目标指定所依赖的文件。伪目标同
		样可以作为“默认目标”，只要将其放在第一个。一个示例就是，如果你的 Makefile 需要
		一口气生成若干个可执行文件，但你只想简单地敲一个 make 完事，并且，所有的目标文件
		都写在一个 Makefile 中，那么你可以使用“伪目标”这个特性：

		all : prog1 prog2 prog3
		.PHONY : all
		prog1 : prog1.o utils.o
		cc -o prog1 prog1.o utils.o
		prog2 : prog2.o
		cc -o prog2 prog2.o
		prog3 : prog3.o sort.o utils.o
		cc -o prog3 prog3.o sort.o utils.o

##常用函数
- `subst <from>, <to>, <text>`, 字符串替换函数

		$(subset ee, EE, feet on the street)
		#fEEt on the strEEt

- `patsubst <pattern>, <replacement>, <text>`, 模式字符串替换函数.pattern可包含通配符`%`表示任意长度的字符串.函数**返回**被替换过的字符串

		$(patsubst %.c, %.o, x.c.c bar.c)
		#x.c.o bar.o

- `strip <string>` 去掉<string>字符串中开头和结尾的空字符.