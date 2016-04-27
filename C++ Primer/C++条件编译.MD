一般情况下，源程序中所有的行都参加编译。但是希望当满足某条件时对一组语句进行编译，而当条件不满足时则编译另一组语句。

		#ifdef 标识符
			程序段1
		#elif
			程序段2
		#else
			程序段3
		#endif
		
		当标识符已经被定义过,则对程序段1进行编译,否则编译程序段2.

标志一般命名规则:头文件名全大写,前后加下划线,并把文件名中的"."也变成下划线.如:`#ifndef _STDIO_H_`
如果是#define 宏名,没有宏体,如:#define DEBUG, 就必须使用#ifdef或ifndef与之对应.否则也可以使用`#if DEBUG #endif`

		
		
		#define GOOD 0
		void test()
		{
			#if GOOD
				cout<< "#if GOOD is defined!"<<endl;
			#else
				cout << "#if You have done nothing"<<endl;  //使用if会判断变量的值
			#endif

			
			#ifdef GOOD
				cout<< "#ifdef GOOD is defined!"<<endl;    //使用ifdef会只会判断该变量是否定义
			#else
				cout << "#ifdef You have done nothing"<<endl;
			#endif

		}
