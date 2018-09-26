1. 在windows 中不能直接导入 `.dll` 文件， 需要使用相应的 `.lib` 的文件来代替,  `project -> properties -> Configureation properties -> linker -> Additional Dependencies` 加入`.dll`对应的`.lib` 文件.
2. `project -> properties -> Configureation properties -> C/C++ ->代码生成 --> 运行库 --> 选择 MD(多线程 dll)`
3. `project -> properties -> Configureation properties -> C/C++ -> 常规 -> 附加包含目录` 中要设置头文件目录
4. `project -> properties -> Configureation properties -> linker -> 常规  -> 附加库目录` 中要设置库所在的目录
5. 要将 `.dll` 文件加入`%PATH%` 路径或者可执行文件目录中
6. [Visual Studio 和 GCC 引用 dll 文件的区别](https://bitmingw.com/2014/12/15/dll-in-visual-studio-and-gcc/)

	- 为了正确链接一个动态链接库文件，GCC 类的编译器需要指定以下参数：

		- 编译器所需的头文件的搜索路径
		- 链接器所需的动态链接库(dll)文件的搜索路径
		- 动态链接库的名字(*.dll)
	- Visual Studio 需要指定的参数有：
		- 编译器所需的头文件的搜索路径（与 GCC 相同）
		- 链接器所需的库(lib)文件的搜索路径
		- 库文件的名字(*.lib)

	我们想要连接 dll 文件，需要指定一个 `lib` 文件.原因如下:

	GCC 在链接的时候，会扫描整个 dll 文件，寻找项目中引用的函数的声明。如果 dll 中提供的接口与源代码中实际调用的方法吻合，则在最后生成的可执行文件中添加该 dll 文件的引用。
	而 Visual Studio 的机制则复杂一些。对于每一个已事先组建好的动态链接库，会存在两个相互关联的文件，分别是 *.lib 和 *.dll。这里的 lib 文件其实是相应的 dll 文件的索引，它存放了 dll 文件中所有函数和变量的声明，以及一些其他的 meta 信息。在链接时，Visual Studio 可以依据 lib 文件中提供的信息添加对相应 dll 的引用，而不需要直接扫描原先的 dll 文件。因此，在指定相关的参数时，我们也就改为指定 lib 文件的路径和文件名了。
7.  [问题](https://stackoverflow.com/questions/8599539/lib-and-dll-linking-to-an-exe-error-cannot-read-at-0x300) `Lib and DLL linking to an exe error “cannot read at 0x300”`
8.  windows 程序连接lib 或dll， 要是对应版本的， 要么在 Debug 边上选 x64 或者  x86 来对应 32位库还是64 位库
	