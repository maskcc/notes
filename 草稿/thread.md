##C++11的多线程库

1. 多线程库的头文件时 `thread`, 在命名空间 `std` 中.使用c++线程库启动线程, 构造`std::thread`对象

		void do_net_wort();
		std::thread th(do_net_work);


2. 线程终止, `std::thread` 销毁时会调用析构函数, 会调用 ` std::terminate()`. 等待线程完成, 可以使用 `std::thread` 的 `join()`函数.可以确保局部变量在线程完成后才会被销毁. 对线程 ` join()` 后线程调用 `joinable()` 会返回 `false`. 对线程设置 `detach()` 后 `joinable()` 也会返回 `false`.

		//这个是函数类吗
		struct func{
			int& i;
			func(int& i_) : i(i_) {}
			void operator() (){
				for(unsigned j = 0; j < 1000; ++j){
					do_net_work(i);		//潜在访问隐患, 悬空引用
				}
			}
		};
	
		void oops(){
			int some_local_state = 0;
			func my_func(some_local_state);	
			std::thread my_thread(my_func);
			my_func.detach(); //分离了线程 my_func
		}

3. 使用 `RAII` 等待线程完成

		class thread_guard{
			std::thread& t;
		public:
			explicit thread_guard(std::thread& t_):
				t(t_){}
			~thread_gurad(){
				if(t.joinable()){//这个很重要, 不能join 两次
					t.join();
				}
			}
			//禁止拷贝构造函数和拷贝
			thread_gurad(thread_guard const&)=delete;
			thread_guard& operator=(thread_guard const&)=delete;
		};
		auto func = []() {cout << "1024" << endl;};
		std::thread t(func);
		thread_guard g(t); // 当前线程要结束时会自动调用 join RAII,即使异常发生也会调用 `join()`
		//do some thing in current thread;

4. `std::thread` 的构造函数将参数传入线程内时, 只会直接复制这个这个变量.如果要传入引用, 需要使用 `std::ref()`函数, 将该变量转换成引用.这点和 `std::bind` 类似

		auto my_func = [](int, Data&){};   //原函数传入的是Data的一个引用.
		std::thread t(my_func, 3, data);//传入的只是data的拷贝
		std::thread t(my_func, 3, std::ref(data));//传入data的引用

5. 可以传递一个成员函数指针作为线程函数, 并提供一个合适的对象指针作为第一个参数:

		class x{
		public:
			void do_some_work(int);
		};
		X my_x;
		std::thread t(&x::do_some_work, &my_x, 7);  //第三个参数开始是 `do_some_work` 成员函数的实参.

	提供的参数可以移动(**move**), 但是不能拷贝.当原对象是一个临时变量时, 自动进行移动操作, 但当原对象是一个命名变量, 那么移动的时候要使用 `std::move` 进行显示移动.

		void process_big_object(std::unique_ptr<big_object>);

		std::unique_ptr<big_object> p(new big_object);
		p->prepare_data(42);
		std::thread t(process_big_object, std::move(p));

6. c++标准库中有很多资源占有类型, 可移动不可拷贝.如: `std::ifstream`, `std::unique_ptr`, `std::thread`.如下创建两个执行线程, 并在 `std::thread`实例间实现(t1, t2, t3)转义所有权.

		void som_func();
		void some_other_func();
		std::thread t1(some_func);
		std::thread t2 = std::move(t1);
		t1 = std::thread(some_other_func);

		std::thread t3;
		t3 = std::move(t2);
		t1 = std::move(t3);

	`std::thread` 对象的容器, 如果这个容器是移动敏感的(如 `std::vector`)那么移动操作同样适用于这些容器如下:
	
		void do_work(unsigned id);
		void f(){
			std::vector<std::thread> threads;
			for(unsigned i = 0; i < 20; ++i){
				threads.push_back(std::thread(do_work, i));
			}
			std::for_each(threads.begin(), threads.end(),
				std::mem_fn(^std::thread::join));
		}
		

7. `std::thread::hardware_concurrency()` 返回能同时并发在一个系统中的线程数量,但是当系统信息无法获取时会返回0.
8. 线程标识类型是 `std::thread::id`, 可以通过 `thread.get_id()` 来获取, 如果没有关联线程, `get_id()`会返回 
	`std::thread::type` 默认构造值, 表示没有线程. 或者使用 `std::this_thread::get_id()`



##互斥量
1. c++中通过实例化 `std::mutex` 创建互斥量, 通过其成员函数 `lock()`上锁, `unlock()` 解锁. c++标准库为互斥量提供了RAII语法的模板类 `std::lock_guard`, 会在构造时提供已锁的互斥量, 析构时解锁. 在 `mutex` 头文件中

		#include <list>
		#include <mutex>
		#include <algorithm>

		using namespace std;
		list<int> some_list;
		mutex some_mutex;
		void add_to_list(int new_value){
			lock_guard<mutex> guard(some_mutex);
			some_list.push_back(new_value);
		}
		
		boollist_contains(int value_to_find){
			lock_guard<mutex> guard(some_mutex);
			return find(some_list.begin(), some_list.end(), value_to_find) != some_list.end();
		}

2. mutable, 用来突破const限制而设置的如下:

		struct Data{ int  x; mutable int count;}
		void show(const Data& data){
			cout<< data.x << endl;
			++data.count;//这个是可以使用的, 用了mutable的变量可以突破const限制 
		}

3. 可以使用 `std::thread::lock` 一次锁住多个互斥量而不产生死锁.
		
		locak_guard<mutex> locka(amutex, std::adopt_lock);
		//std::adopt_lock参数除了表示std::lock_guard对象已经上锁外，还表示现成的锁，而非尝试创建新的锁。

4. 避免死锁常见原则
	- 避免嵌套锁.当一个线程获得一个锁时, 不要再去获得第二个.当需要获取多个锁时, 使用一个 `std::lock` 来操作.
	- 避免在尺有所时调用用户提供的代码.(用户可能再去获取锁造成死锁)
	- 使用固定顺序获取锁 
	- 使用锁的层次结构.

































[参考_gitbook](https://chenxiaowei.gitbooks.io/cpp_concurrency_in_action/content/content/chapter2/chapter2-chinese.html)