#C++的一些基础知识
 [C++语言细节的官方参考网站](http://www.cplusplus.com/reference/cctype/)  
 [Linux函数参考](http://linux.die.net/man/3/pthread_join)
[]()
- 

1. C++标准库兼容了C语言的标准库,C语言的头文件形如name.h,C++会将文件命名为cname.去掉了.h后缀且在文件面name前加了字母c.名为cname	的头文件从属于std.而.h的头文件则不然.标准库中的名字总能在命名空间中找到.
2. 要使用vector必须使用下面头文件
    ```
        #include <vector>
        using std::vector;    //如1所述,标准库的名词大都在std命名空间
    ```
3. vector能容纳绝大多数类型的对象作为其元素,但是因为引用不是对象,所以不存      在包含引用的vector.
4. sizeof是运算符,strlen为函数.sizeof可以用类型做参数,strlen只能用char*做参数,且必须是以"\0"结尾的.一般编译器在编译时便计算过	sizeof的值.strlen在运行时计算,一般用来计
5. 算字符串的长度,而且不包含末尾的'\0'.sizeof后如果是类型必须加括号,如果是变量名可以不加括号.
	对于静态数组处理:
	```
	    char *ss = "0123456789";
	    cout<<sizeof(ss)<<endl; //-->4 ss指向字符串常量的字符指针,获得指针所占空间
	    cout<<sizeof(*ss)<<endl;//-->1 *ss是字符.获得字符串第一位'0'所占空间char类型
	    cout<<strlen(ss);      //-->10 输出数组字符串长度,不包含结尾'\0'
	```
6. vector初始化时使用圆括号和花括号意义不同.(p.g 89)圆括号时可以说提供的值来构造vector对象.花括号时可以列表初始化该vector对象,	当无法列表初始化时,会是其他方法.如:
	```
	    vector<string> v1{10};      //v1有10个默认初始化的元素
	    vector<int> v2{10};         //v2有1个元素,值为10,列表初始化
	    vector<string> v3{10, "hi"};//v3有10个元素都初始化为"hi"
	
	    vector<string> v4("hi");    //粗无,不能使用字符串字面值构建vector对象
	    vector<int>    v5(10);      //v5有10个元素,每个都是0
	```
7. 复杂数组的声明(由内向外,由右向左理解)(p.g 102)
	```
	    int *ptrs[10]           //含有10个整形指针的数组
	    int &refs[10];          //错误,不存在引用的数组
	    int (*Parray)[10] = &arr; //Parray指向一个含有10个整数的数组.*Parray,Parray为指针.[10]表示Parray是一个纸箱大小为10的数组的指针
	    int (&arrRef)[10] = arr;  //arrRef引用一个含有10个整数的数组.(&arrRef)表示arrRef是个引用,它引用的对象是一个大小为10的数组.数组中元素类型是int
	    int *(&arry)[10] = ptrs; //array是一个10个int行指针的数组的引用
	```
    int *(&arry)[10] = ptrs分析:由内向外,arry是一个引用,右侧克制,arry引用的对象时一个大小为10的数组,观察左侧知数组的元素类型是指向int的指针.
8. 数组指针理解的一题目(测试理解)
    `int (*p)[4] = ia;` p指向含有4个整数的数组
    `int *ip[4];`整型指针的数组
	```
	    int array[5] = { 1, 2, 3, 4, 5 };
	    int *pArray = (int *)(&array + 1);
	    cout << "*(array + 1)  ? " << *(array + 1) << endl;
	    cout << "*(pArray - 1) ? " << *(pArray - 1) << endl;
	
	    int (*pArray2)[5] = (&array + 1);
	    cout << "*(pArray2 - 1) ? " << **(pArray2 - 1) << endl;
	```
9.  int ia = {0,1,2,3,4,5,6,7,8,9};  
	decltype(ia) ia3 = {0,1,2,3,4,5,6,7,8,9};
	//decltype(ia) 返回的类型是由10个整数构成的数组.  
10. strlen(p),strcmp(p1,p2),strcat(p1,p2),strcpy(p1,p2),参数p1,p2必须指向以非空字符作为结束的数组.,不然会有错误.
	```
		char ca[] = {'C', '+', '+' };
		cout << strlen(ca) <<endl;    //错误,ca没有以'\0'结尾
	```
11. 要使用范围for语句处理多维数组,出了最内存的循环外,其他所有循环的控制变量都应该是引用类型.
    ```
        for(auto &row :ia)
        for(auto col : row)
    ```
12. 初始化规则.C++允许使用字面值初始化常量引用.
```
    const int &r1 = 42;
    int &r2 = 42;        //错误,不能使用字面值初始化一个非常量引用 p.g 45
```	
13. 数组形参
```
    void print(const int *);
    void print(const int[]);
    void print(const int[10]);
```
三个函数等价.p.g 193

14. 在include语句中，“<>”表示在标准路径中搜索头文件，““””表示在本目录中搜索。故在上例中，可把hello1.c的“#include<my.h>”改为“#include “my.h””，当 gcc时 就不需要加上“-I”选项了。
15. std::cout 里的解析顺序是从右向左进行的.
16. [C语言解析结构的右左法则](http://www.cnblogs.com/ficow/p/5282066.html)
17. 静态成员变量的初始化.`静态成员仍然遵循public，private，protected访问准则。`,`静态成员不能在类定义里边初始化，只能在class body外初始化`.
数据类型 类名：：静态数据成员名 = 初值


		class Singleton
		{
		private:
		static Singleton* _instance;  //私有变量也能修改
		Singleton(){}
		public:
		static Singleton *getInstance()
		{
		if (nullptr == _instance)
		{
		_instance = new Singleton();
		cout << "we have create a new singleton" << endl;
		}
	
		return _instance;
		}
		};
	
		Singleton* Singleton::_instance = nullptr;  //类的静态成员变量要初始化!,也要声明返回值
		//注意：不能用参数初始化表对静态成员初始化。一般系统缺省初始为0.

18. c++中输出百分号.

		%和转义字符\一样特殊，所以输出%是用%%，而不是\%

19. c++ [在cout中的输出控制](http://www.cnblogs.com/lucyjiayou/archive/2012/01/04/2312225.html)
		
		输出16进制
		cout << hex << 98110 << endl;

20. assert的使用
	- 头文件: `assert.h`
	- 函数原型

			void assert(int expression); //参数为0则报错

	- 报错格式 `Assertion failed: expression, file filename, line line number `
	- 忽略方法: 可以使用

			#define NDEBUG //头文件中
			-DNDEBUG	   //makefile时的选项
21. `memset` 对字符串数组的取首址操作一样 

		char name[50];
		memset(name, 0, 5);
		memset(&name, 0, 5);

22. c 的类型定义一般都在`<stdint.h>`中如下:c++的头文件为`<cstdint>`:

		void test()
        {
                cout << "long " << sizeof(long) << endl;
                cout << "signed " << sizeof(signed) << endl;
                cout << "unsigned " << sizeof(unsigned) << endl;
                cout << "int " << sizeof(int) << endl;
                cout << "short " << sizeof(short) << endl;
                cout << "unsigned short " << sizeof(unsigned short) << endl;
                cout << "short unsigned " << sizeof(short unsigned) << endl;
                cout << "char " << sizeof(char) << endl;
                cout << "unsigned long " << sizeof(unsigned) << endl;
                cout << "long long " << sizeof(long long) << endl;
                cout << "float " << sizeof(float) << endl;
                cout << "double " << sizeof(double) << endl;
                cout << "char " << sizeof(char) << endl;
                cout << "long int " << sizeof(long int) << endl;
                cout << "int64_t " << sizeof(int64_t) << endl;
                cout << "int32_t " << sizeof(int32_t) << endl;
                cout << "int16_t " << sizeof(int16_t) << endl;
                cout << "int8_t " << sizeof(int8_t) << endl;

                cout << "uint64_t " << sizeof(uint64_t) << endl;
                cout << "uint32_t " << sizeof(uint32_t) << endl;
                cout << "uint16_t " << sizeof(uint16_t) << endl;
                cout << "uint8_t " << sizeof(uint8_t) << endl;
            }

	例如, long 在不同的硬件平台或者编译器下, 会有不同的长度.在64位`ubuntu`, gcc版本 4.8.2时, 结果如下,所以建议长度都设置为 `int32_t` 或 `uint32_t`类似类型来定义数据长度.

			long 		8
			signed 		4
			unsigned 	4
			int 		4
			short 		2			
			char 		1			
			long long 	8
			float 		4
			double 		8
			char 		1
			long int 	8
			int64_t 	8
			int32_t 	4
			int16_t 	2
			int8_t 		1
			uint64_t 	8
			uint32_t 	4
			uint16_t 	2
			uint8_t 	1
			unsigned short  2
			unsigned long   4
			short unsigned  2
            
23. [Linux下`printf`打印出彩色文字解决方案](http://nulls.cc/linux-printf-color.html)
24. 全局变量的内存保证会在程序启动时被清零, 局部变量配置于程序的堆栈中, 堆对象位于heap中, 不一定会被清零, 它们的内容是内存上次被使用后的内容.
25. [Linux终端下打印彩色文字的调用方法](http://www.cnblogs.com/clover-toeic/p/4031618.html)
26. 基本类型的对象没有析构函数，所以回收基本类型组成的数组空间用 delete 和 delete[] 都是应该可 以的；但是对于类对象数组，只能用 delete[]。对于 new 的单个对象，只能用 delete 不能用 delete[] 回收空间。所以一个简单的使用原则就是：new 和 delete、new[] 和 delete[] 对应使用。
27. 对sizeof ('a') 和 char ch = 'a'; sizeof(ch) 的处理, c和c++方式不同.c 中的结果为 4, 1, c++中为 1, 1
    In C, the type of a character constant like 'a' is actually an int, with size of 4 (or some other implementation-dependent value). In C++, the type is char, with size of 1. This is one of many small differences between the two languages.
28. [ISO C99 和 ISO c++ 的细微不同之处](http://david.tribble.com/text/cdiffs.htm#C99-char-literal)
29. `memset` 是按字节赋值的... 所以对`int`型赋值`1` 会有奇怪的数值产生
30. [long 和int 的区别](http://www.cnblogs.com/x_wukong/p/5675795.html)
    指针在32位和64位机器上有差别, 32位机器上为4字节, 64位机器上为8字节
    long 在32 位和64位机器上也有区别, 不过也的看编译器, 一般 在32位机器上为 4字节, 在64位机器上为8字节
    long long 一般不论编译器都定义为8字节
31. c++ 中，  One of the guidelines for C++ compilers, in order to resolve code ambiguities, is: when something can be a function declaration, it is a function declaration.
	(编译器总是倾向于将一些歧义的语句解释为申明。[stackoverflow参考](https://stackoverflow.com/questions/5116541/difference-between-creating-object-with-or-without)). 
	[编译器参考文档2](https://caligari.dartmouth.edu/doc/ibmcxx/en_US/doc/language/ref/rnrslvng.htm)如下代码

		class Foo{
		public:
			Foo(){
				cout << "constructed" << endl;
			}
		}
		int main(){
			Foo f(); // 是一个函数声明， 一个返回 Foo 的函数 f, 
			Foo k;   // 是 foo 的一个对象
		}

32. 在对 map 中的数据进行sort 排序时, 要注意将比较操作函数修改为  const, 因为如果在其中修改了key, 可能导致重排, 正确写法

		bool operator<(const A& rsh) const{
			return rsh.x < x;
		}
