##[参考,分析云风makefile以及自动化makfile](http://www.cnblogs.com/thoryan/p/3630930.html)


1. 基础规则
    
    target 目标文件 : 依赖文件
        command(命令)
        
2. Makefile中的一些规则

	- Makefile中的命令,都必须以`Tab`键开始, 
	- `make -n` 打印运行过程(或 `--just-print`). 
	- `make -s` 禁止命令的显示(或 `--silent`)
	- make 会一条一条的执行命令, 如果两条命令向关联, 应该使用 `;` 隔开, 如先`cd` 进目录再操作
	- 执行命令后, 当返回数是0时才会继续执行下一条命令, 如果返回错误, 会中断, 可以使用 `-`(减号)  来忽略错误, 或者 `make -i`  忽略错误 (或 `--ignore-errors`) 
	- `.IGNORE` 作为目标会忽略错误 
	- `make -k` 一些命令错误了依然会执行下去 (或 `--keep-going`)
	- `-w`或是`--print-directory` 会打印一些信息
	
3. Makefile文件名一般写为`makefile`或`Makefile`, 如果不是上述名称,需要使用类似

		make -f Make_gate #或
		make --file Make_gate
        
        

4. 在makefile中使用变量, 使用`:=` 来定义, 使前面的变量不能使用后面的变量

		obj := main.o xml.o net.o tst.o
		target : $(obj)
            g++ -o target $(obj)

		FOO ?= bar   # 如果FOO 没有被定义过, FOO的值是bar, 如果先前定义了将不操作,  等价于 :
		ifeq ($(origin FOO), undefined)
			FOO = bar
		endif

2. make 的自动推导,只要make看到一个`.o`文件, 会自动推出`*.cc`文件,那么`something.c`就是`something.o`的依赖文件.并且`cc -c something.c`也会被推导出来.

        target := test
		obj := main.o xml.o net.o 
		$(target) : $(obj)
        g++ -o $(target) $(obj)

		man.o def.h
		xml.o def.h
		net.o def.h
		
        make -n
        生成过程
        g++    -c -o main.o main.cc
        g++    -c -o xml.o xml.cc
        g++    -c -o net.o net.cc        
        g++ -o main main.o xml.o net.o


3. 清理

		.PHONE : clean
		clean : 
		-rm edit $(objects) #- 表示某系文件出现异常忽略,.PHONY表示clean是一个伪目标.一般clean放在最后.




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

		objects := $(wildcard *.o)    #会将通配符展开到变量中

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

11. 变量高级用法, 变量值的替换.格式为`$(var:a=b)`, 把变量`var`中所有以`a`字符串结尾的a替换成b的字符串.

		foo :=a.o b.o c.o
		bar := $(foo:.o=.c) #替换变种中的公有部分, 将 .o 替换成 .c
		使用 += 给变量追加值

12. 静态模式定义多目标的规则, `$<` 表示所有的依赖目标集, `$@` 表示目标集
		
		<targets ...>: <target-pattern>: <prereq-patterns ...>
			<commands>
		objs := foo.o bar.o
		srcs := $(objs:%.o=%.c) # 静态替换, 将所有 .o 文件替换成 .c 文件
		all: $(objs)
		$(objs): %.o: %.c
			$(CC) -c $(CFLAGS) $< -o $@

14. 使用 `@命令` 那么该命令将不会显示在屏幕上 

15. 定义多行变量

		define two
			echo 1
			echo 2
		endef

16. 使用条件判断:

		ifeq/ifneq/ifdef(arg1, arg2)  #arg1 和arg2 相等则 , 不相等, 非空
		else
		endif
17. 可以使用shell函数处理操作系统的shell命令

		contents := $(shell cat foo)
		files := $(shell echo *.c)
18. 隐含规则常用变量

	- AR 函数库打包程序, ar
	- AS 汇编语言编译程序, as
	- CC C 语言编译程序, 默认 cc
	- CXX c++ 语言编译程序, g++
	- RM 删除, rm -f

	- ARFLAGS ar命令参数
	- CFLAGS C语言编译器参数
	- CXXFLAGS c++ 编译器参数

20. 生成函数库打包文件 

		.c.a:
		$(CC) $(CFLAGS) $(CPPFLAGS) -c $< -o $*.o
		$(AR) r $@ $*.o
		$(RM) $*.o
		其等效于：
		(%.o) : %.c
		$(CC) $(CFLAGS) $(CPPFLAGS) -c $< -o $*.o
		$(AR) r $@ $*.o
		$(RM) $*.o

19. 自动化变量

		$@
		表示规则中的目标文件集。在模式规则中，如果有多个目标，那么，"$@"就是匹配于
		目标中模式定义的集合。
		$%
		仅当目标是函数库文件中，表示规则中的目标成员名。例如，如果一个目标是"foo.a
		(bar.o)"，那么，"$%"就是"bar.o"，"$@"就是"foo.a"。如果目标不是函数库文件（Unix
		下是[.a]，Windows 下是[.lib]），那么，其值为空。
		$<
		依赖目标中的第一个目标名字。如果依赖目标是以模式（ 即"%"）定义的，那么"$<"将
		是符合模式的一系列的文件集。注意，其是一个一个取出来的。
		$?
		所有比目标新的依赖目标的集合。以空格分隔。
		$^
		所有的依赖目标的集合。以空格分隔。如果在依赖目标中有多个重复的，那个这个变量
		会去除重复的依赖目标，只保留一份。
		$+
		这个变量很像"$^"，也是所有依赖目标的集合。只是它不去除重复的依赖目标。
		$*
		这个变量表示目标模式中"%"及其之前的部分。如果目标是"dir/a.foo.b"，并且目标的
		模式是"a.%.b"，那么，"$*"的值就是"dir/a.foo"。这个变量对于构造有关联的文件名是比
		较有较。

20. 模式规则实例

		#其中，"$@"表示所有的目标的挨个值，"$<"表示了所有依赖目标的挨个值。
		%.o : %.cc
			$(CXX) -c $(CXXFLAGS) $< -o $@
		

##常用函数
调用函数方法:  $(function arg)  

- `subst <from>, <to>, <text>`, 字符串替换函数

		$(subset ee, EE, feet on the street)
		#fEEt on the strEEt

- `patsubst <pattern>, <replacement>, <text>`, 模式字符串替换函数.pattern可包含通配符`%`表示任意长度的字符串.函数**返回**被替换过的字符串

		$(patsubst %.c, %.o, x.c.c bar.c)
		#x.c.o bar.o

- `strip <string>` 去掉<string>字符串中开头和结尾的空字符.
- findstring arg, in  查找字符串
- filter pattern, text 保留符合pattern的单词
- filter-out 反过滤函数  
- sort 排序, 会去掉相同单词
- word n , text 去text中的第n个单词 
- Wordlist start, end, text 去 从 start(数字) 到 end 的单词字串 
- words text 统计单词个数 
- firstword text 手单词
- dir 返回目录名, 如 $(dir src /foo.c num) 返回 src/ ./ (返回了src目录 和当前目录 )
- notdir 取文件函数 $(dir src /foo.c) 返回 foo.c
- suffix name 取文件后缀.$(suffix src/foo.c src-1.0/bar.c hacks)返回值是“.c .c”
- basename file 取文件前缀. 不包含后缀名
- addsuffix suffix, files, 给files添加 suffix 后缀
- addprefix prefix, files 添加前缀
- join str1, str2 拼接字符串
- foreach $(foreach var, list, func), 把每个list的中的元素取出到var 执行func 

		names := a b c d
		files := $(foreach n, $(names), $(n).o)
		输出:
			a.o b.o c.o d.o
- $(if condition, then..., else... )

[参考1](https://segmentfault.com/a/1190000000349917)  
[参考2, 头文件](https://www.binss.me/blog/solving-make-doesn't-rebuild-when-headers-changed-problem/)
[参考3, 多目录](http://www.cnblogs.com/lidabo/p/4521117.html)