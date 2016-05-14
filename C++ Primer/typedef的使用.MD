在C++中,可以用`typedef`声明一个新的类型名称来代替已有类型.
1.  基础方法

		typedef int INT; //类型INT等价于int

2. 声明结构体类型:

		typedef struct tagMsg{
			int msgType;
			char* msg;
		}Msg; //Msg是新类型名,不是结构体变量名
		Msg clientMsg;  //使用Msg声明一个变量

		c语言中,声明struct对象时需要添加struct关键字,如
		struct Msg{
			int msgType;
			char* msg;
		};
		struct Msg msg;
		C++中,可以直接使用 Msg msg;

3. 声明数组类型

		typede int NUM[100]; //NUM为整型数组类型,包含100个int型整数.

4. 为复杂的声明定义一个简单的别名.
		
		如:
		void (*b[10])(void (*)());
		//变量名为b, 先替换右边括号里,pFuncParam为别名一:
		typedef void (*pFuncParam)();
		//再替换左边变量b,pFun为别名二:
		typedef void (*pFun)(pFunParam);
		//原声明的最简化:
		pFun b[10];

		typedef void(*Sigfunc)(int);
		Sigfunc *func(int, Sigfunc);
		//参数是一个函数指针,该函数是返回值为空,参数为int型的函数Sigfunc
		//func 是一个有两个参数, int 和 Sigfunc, 返回值是指向Sigfunc的函数指针
		void (*signal(int signo, void (*func)(int))(int);
		signal函数原型说明此函数需要两个参数,返回一个函数指针.而该指针所指的函数无返回值(void).第一个参数是signo是一个整型,第二个参数是函数指针,它所指向的函数需要一个整型参数,无返回值.signal的返回值是一个函数地址,该函数有一个整型参数,即最后的(int).