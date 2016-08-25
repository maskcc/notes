1. 编译源代码为动态链接库方法

		g++ -fPIC -shared name.cpp -o name.so

2. 动态加载函数

	1. 头文件`dlfcn.h`
	2. 函数原型

			//flag
			//RTLD_LAZY 暂缓决定, 等有需要时再接触符号
			//RTLD_NOW 立即决定, 返回前接触所有未决定的符号
			//指定模式打开动态链接库文件,返回一个句柄给调用进程
			void *dlopen(const char *filename, int flag);
			
			//返回出现的错误,返回值为NULL时表示操作函数执行成功。
			char *dlerror(void);

			//通过句柄和连接符名称获取函数名或变量名
			void *dlsym(void *handle, const char *symbol);

			//卸载打开的库.只有当此动态链接库的使用计数为0时,才会真正被系统卸载
			int dlclose(void *handle);