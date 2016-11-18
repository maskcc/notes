1. 标准库`allocator`类及其算法, 在`memory`头文件中.

		allocator<T> a
		a.allocate(n)		//分配一段原始的, 未构造的内存, 保存n个类型为T的对象
		a.deallocate(p, n)   //释放从T*指针p中地址开始的内存, 在调用前, 用户必须对每个在这块内存中创建的对象调用destroy
		a.construct(p, args) //p为类型为T*的指针, 指向一块原始内存, arg传递给t的构造函数
		a.destroy(p)		//p为T*类型的指针, 次算法对p指向的对象执行析构函数