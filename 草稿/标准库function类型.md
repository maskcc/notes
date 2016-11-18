##标准库function 类型
function 类型定义在 `functional`头文件中.操作如下:
		
	function<T> f;				//f用来存储可调用对象的空function
	function<T> f(nullptr);		//显示地构造一个空function
	function<T> f(obj);			//f中存储可调用对象obj的副本
	if(f)						//将f作为条件.f中有调用对象为真, 反之为false
	f(args)						//调用f, 参数args

	定义为 function<T> 的成员的类型
	result_type					//返回的类型
	argument_type				//实参类型, 只有一个参数时, 等价于下面 first_
	first_argument_type			//分别代表两个实参的类型 
	second_argument_type

对于函数, lambda表达式, bind函数创建的对象, 可以使用如下形式存入function类型

	int(*add)(int, int);
	typedef decltype(add) *padd;
	function<int(int, int)> f1 = add;//函数(或者函数指针)
	function<int(int, int)> f2 = divide();//函数类的对象, 见下面	
	function<int(int, int)> f3 = mod; //命名的lambda
	function<int(int, int)> f4 = [](int a, int b){return a * b}; //未命名的lambda

	int add(int i, int j){return i + j;}
	auto mod = [](int i, int j){return i % j;}

	**待理解**
	//参考标准库函数对象 std::minus<int>()
	struct divide{
		int operator()(int denominator, int divisor){
			return denominator / divisor;
		}
	}

不能将重载的函数存入function类型的对象中,如

	int add(int a, int b);
	Data add(Data a, Data b);
	map<string, function<int(int, int)>> bimap;
	bimap.insert({"+", add}); //会有错误, 不能识别重载.

可以存入函数指针解决上述问题, 或者使用lambda表达式 :
		
	int(*fp)(int, int) = add;
	bimap.insert({"+", fp});
	bimap.insert({"+", [](int a, int b) {return add(a, b);}}); //另外一种方法 
	
	