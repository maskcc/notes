1. 头文件 `#include <memory>`, 命名空间 `using namespace std;`
2. 内存分配 `make_shared`

		shared_ptr<p3> = make_shared<int>(43); //调用构造函数, 传入参数必须和类型的某个构造函数匹配
		//也可以使用 auto 来保存返回值的类型
		auto p7 = make_shared<string>("good");
		auto p9(p7); //p7和p9 指向对象相同, 此对象有两个引用者
3. 每个智能指针都有一个关联的计数器.

		auto msg = make_shared<string>("gg");
		msg.use_count();   //与msg共享对象的智能指针的数量, 可能很慢, 主要用于调试
		msg.unique();      //如果msg.use_count() 为1, 返回true, 反之返回false
		msg.get();		   //返回p中保存的指针
		//上面进行的都是点操作符, 智能指针应该重载了解引用操作符, 取指针内容时, 可以使用 `(*p)` 和 `p->`
		msg->size();
		(*msg).c_str();
		p.swap(q); //交换pq的指针

		p.reset(new int(42)); //将新的指针赋给p
		//通常用法
		if(!p.unique())
			p.reset(new string(*p))	//我们不是唯一用户, 分配新的拷贝
		*p += newVal;//是唯一用户, 可以改变对象的值
		
4. 在条件判断是使用智能指针, 效果就是检测该指针是否为空

		auto p = make_shared<int>(17);
		if(NULL == p)
		{
			perror("not right");
		}
5. 将`shared_ptr` 保存在一个容器中后, 容器存在, 则该容器内的智能指针内容就不会销毁, 当容器不需要该指针时, 应该将其`earse()`掉.
6. 将`shared_ptr` 和`new` 混合使用时, 必须使用直接初始化形式. 如果不初始化一个智能指针, 他就会被初始化为一个空指针.

		shared_ptr<int> p1 = new int(1024); //错误, 必须使用直接初始化
		shared_ptr<int> p1(new int(1024));  //正确
			
		//返回时不能隐式转换
		shared_ptr<int> clone(int p){
			return new int(p); //错误. 隐式转换不可
		}
		//正确做法
		shared_ptr<int> clone(int p){
			return shared_ptr<int>(new int(p)); //错误. 隐式转换不可
		}
		
7. 改变`shared_ptr` 的删除方法
	1. p接管**内置指针**指向对象的所有权,q必须能转换成 T*类型,p将使用可调用对象del代替delete
	
			shared_ptr<T> p(q, del); 

	2. p是`shared_ptr` p2 的**拷贝**(不同于上面的内置指针), p将调用 `del` 来代替del

			shared_ptr<T> p(p2, del); 

8. 拷贝一个`shared_ptr` 会递增它的引用计数.(如将其作为函数的参数)

		void process(shared_ptr<int> ptr){
			process
		}//函数返回由引用减一, 如果到0就销毁
		//应该按照如下使用
		shared_ptr<int> p(new int(42));
		process(p);
		int i = *p;

9. 不要使用get 初始化另一个智能指针或者为另一个智能指针赋值. 使用了get指针的代码不能删除该指针.

		shared_ptr<int> p(new int(42));
		int *q = p.get();
		{//新程序块
			//未定义: 两个独立的shared_pt指向了相同的内存
			shared_ptr<int>(q);
		}
		//程序块结束, q已经被消除, 其内存被释放
		int foo = *p;// 未定义! p指向的内存已经被释放 

10. `nothrow`, 定位new(placement new), 允许向new 传递额外的参数,传递`nothrow`告诉它不能抛出异常, 如果new不能分配出所需neicun,会返回空指针. 不然会抛出 `bad_alloc`(定义在头文件 `new` 中)
11. `shared_ptr`不支持管理动态数组, 必须给出其删除器

		shared_ptr<int> sp(new int[10], [](int *p) { delete[] p;});
		sp.reset();//使用提供的lambda 作为删除器释放数组 

		for(size_t i = 0; i != 10; ++i)
		{
			*(sp.get() + i) = i; //shared_ptr 不支持动态数组管理, 不能进行下标运算, 且不支持指针的算术运算
								 //使用get获取一个内置指针
		}