作者：张景旺
链接：https://www.zhihu.com/question/23260677/answer/24081527
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。


**为什么C++调用空指针对象的成员函数可以运行通过？**		

		#include <iostream>

		using namespace std;
		
		class B {
		public:
		    void foo() { cout << "B foo " << endl; }
		    void pp() { cout << "B pp" << endl; }
		    void FunctionB() { cout << "funB" << endl; }
		};
		
		int main()
		{
		    B *somenull = NULL;
		    somenull->foo();
		    somenull->pp();
		    somenull->FunctionB();
		
		    return 0;
		}

这个问题很好，可以阐明“**静态绑定**”和“**动态绑定**”的区别。  
真正的原因是：因为对于非虚成员函数，Ｃ++这门语言是静态绑定的。这也是Ｃ++语言和其它语言Java, Python的一个显著区别。以此下面的语句为例： 
 
	somenull->foo();  
这语句的意图是：调用对象somenull的foo成员函数。如果这句话在Java或Python等动态绑定的语言之中，编译器生成的代码大概是：  
找到somenull的foo成员函数，调用它。（注意，这里的找到是程序运行的时候才找的，这也是所谓动态绑定的含义：运行时才绑定这个函数名与其对应的实际代码。有些地方也称这种机制为迟绑定，晚绑定。）  
但是对于C++。为了保证程序的运行时效率，Ｃ++的设计者认为凡是编译时能确定的事情，就不要拖到运行时再查找了。所以C++的编译器看到这句话会这么干： 

1. 查找somenull的类型，发现它有一个非虚的成员函数叫foo。（编译器干的）  
2. 找到了，在这里生成一个函数调用，直接调B::foo(somenull)。  

所以到了运行时，由于foo()函数里面并没有任何需要解引用somenull指针的代码，所以真实情况下也不会引发segment fault。这里对成员函数的解析，和查找其对应的代码的工作都是在编译阶段完成而非运行时完成的，这就是所谓的静态绑定，也叫早绑定。  
正确理解C++的静态绑定可以理解一些特殊情况下C++的行为。	