##lambda表达式

一个lambda 表达式表示一个可调用的代码单元.可以理解为一个未命名的内联函数(每个lambda表达式都有自己**唯一的类类型**). lambda 表达式可以说是就地定义仿函数闭包的 `语法糖`  
lambda表达式形式如下:
		
	[capture list (1)] (parameter list)[ mutable] -> return type(3) {function body}
	//可忽略参数列表和返回类型
	1. (函数中捕获的局部变量, 逗号分隔)
	2. 可选, 可以改变它捕获的变量的值, auto f = [v1]() mutable {return ++v1;//v1改变了}
	3. 尾置返回
	auto f = [] {return 42;} //lambda 只有一个return时会根据函数体中代码判断返回类型,  否则(多个return)返回void.
	4. 当没有参数时, 参数列表可以省略, 写成 auto f = []{return 1;}, 但有 mutable修饰时参数列表不能省略.

lambda 不能有默认参数.

	//捕获列表用来列出需要使用的局部变量
	//此处使用的是值捕获, 传递的是sz的一个拷贝, 
	//要使用引用捕获, 需要传入一个引用 [&sz]
	//传入引用要保证在函数结束后该值还有效...lambda表达式会比函数生存周期长 
	//含有引用捕获的lambda 表达式不能作为返回值(类似不能反悔一个局部变量的引用)
	int sz = words.size();  
	stable_sort(words.begin(), words.end(),
			[sz](const string &a, const string&b)
			{return a.size() < b.size();});

使用隐式捕获, 让编译器根据lambda体中的代码推断, `[&]` 捕获引用, `[=]` 捕获值, 可以混合使用

	ostream os;
	int c;
	[=, &os](){os << c << endl;}// os 显式捕获, 引用捕获, c隐式捕获, 值捕获

当有多个return 语句时, 编译器不会自动推断返回类型, 需要填写返回类型, 使用尾置返回类型

	transform(vi.begin(), vi.end(), vi.begin(),
			[](int i) -> int
			{ if(i < 0) return -1; else return i;});

##标准库bind函数
bind函数定义在头文件`functional`中, 可以将它看成一个通用的函数适配器, 它接收一个可调用对象, 生成一个新的可调用对象来"适应"原对象的参数列表.

	//agr_list 是一个逗号分隔的参数列表, 对应给定的callable的参数.
	//arg_list 可能包含形如 `_n`的名字, n是整数, 这些参数是"占位符", 表示这里应该传入和callable对应位置的参数,
		如果不是_n形式, 需要填写具体参数如下.
	auto newCallable = bind(callable, arg_list)
		
	int sz = 7; //_1 是占位符, 传入check_size所需要的第一个参数
	auto wc = find_if(words.begin(), words.end(),
						bind(check_size, _1, sz));

_n 定义在std::placeholders的命名空间中,如 

	使用了using namespace std::placeholders; 就可以直接使用 _1, _2, _3了
	
	std::placeholders::_1
	std::placeholders::_2
	std::placeholders::_3

可以重排参数顺序, 如

	//函数f 的第一个参数和第二参数被放置到 g函数的 _1 和_2 位置.
	auto g = bind(f, a, b, _2, c, _1)

一般情况下, 将那些不是占位符的参数拷贝到bind返回的可调用对象中, 要传递引用, 可以使用`ref`函数.如下:

	for_each(words.begin(), words.end(),
				bind(print, ref(os), _1, ' ' ));
##标准库ref函数 
标准库函数ref 在头文件`functional` 中,  它返回一个对象, 包含给定引用, 这个对象时可以拷贝的.  
**cref** 生成一个保存 const 类型的引用.
