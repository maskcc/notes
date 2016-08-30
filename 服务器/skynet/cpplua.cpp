1. lua_checkstack() //扩大可用堆栈尺寸. 至少要有 LUA_MINSTACK = 20 的占空间可用
2. lua_gettop() //获取栈中的参数.
3. luaL_check 系列函数在获取值的同时检查类型
	luaL_checkany
	luaL_checkint
	luaL_checkinteager
	luaL_checklong
	luaL_checklstring
	luaL_checknumber (dble)
	luaL_checkstring
	luaL_checkudata

4. lua_push 系列函数可以将参数传递给lua. 每个导出函数需返回一个int型数据,是导出函数的返回值的个数.
	lua_pushboolean
	lua_pushcfunction  //返回lua_CFunction 类型的函数指针 
	lua_pushfstring
	lua_pushinteager
	lua_pushlightuserdata
	lua_pushliteral		//压入一个字面值字符串
	lua_pushlstring
	lua_pushnil
	lua_pushnumber
	lua_pushstring
	lua_pushthread    //压入一个所传递lua_State对应的线程,如果是主线程返回1
	lua_pushvalue	  //将所传递索引处的值复制一份压入栈顶
	lua_pushvfstring

5. C调用Lua 文件中函数的方法
	lua_getglobal(L, funcname)
	lua_push*()  //参数压栈
	lua_pcall(L, aruments num, return nums, 错误处理的函数地址)
		lua_settop(m_pLua, 0);
		lua_getglobal(m_pLua, "mainlogic");
		lua_pushlstring(m_pLua, (char*)msg.getBuf(), msg.size());
		int ret = 0;
		ret = lua_pcall(m_pLua, 1,4, 0);

6. 初始化Lua 环境.
	lua_State* initLuaEnv()
	{
		lua_State* luaEnv, = lua_open();
		luaopen_base(luaEnv);
		lua_openlibs(luaEnv);

		return luaEnv;
	}

7. 加载Lua 文件到运行时环境
	luaL_loadfile(luaEnv, filename);

8. 获取全局函数
	lua_getglobal(luaEnv, name);
	lua_isfunction(luaEnv, 1);
	lua_tofunction(luaEnv, 1);

9. c++调用Lua 过程
	1. 初始化Lua 运行时环境
	2. 加载脚本
	3. 参数入栈
	4. 调用Lua 函数 lua_pcall
	5. 获取返回值 lua_toboolean(luaEnv, -1); 
	6. 返回值出栈 lua_pop(luaenv, 1);
	7. 释放Lua运行环境 lua_close(luaEnv);

10. C++ 作为动态文件被Lua 调用
	1. 定义入口函数, 需要定义成 luaopen_(*.so), so文件名称要保持一致
	2. 动态库供Lua调用的function需满足 typedef int function(lua_State *L);
	3. 在动态库调用Lua注册 struct luaL_Reg lib[] = {}
		动态库入口函数调用luaL_register将结构体注册
			luaL_register(L, "fname", lib);
	4. 编写脚本时, 需要使用 require("fname"), fname 为 luaopen_name中的name

11. lua_touserdata
	void *lua_touserdata(lua_State *L, int index);
	如果给定索引处的值是一个完全用户数据,函数返回其内存块的地址.如果值时一个轻量用户数据
	则返回它表示的指针.否则返回NULL.

12. luaL_openlibs 这个函数能够打开所有的标准库.或者使用luaL_requiref分别打开库. luaopen_base （基础库），
	 luaopen_package （包管理库）， luaopen_coroutine （协程库）， luaopen_string （字符串库）， luaopen_utf8 （UTF8 库），
	  luaopen_table （表处理库）， luaopen_math （数学库）， luaopen_io （I/O 库）， luaopen_os （操作系统库）， 
	  luaopen_debug （调试库）。 这些函数都定义在 lualib.h 中。

13. int luaL_dostring (lua_State *L, const char *str);
	加载并运行指定的字符串。 它是用下列宏定义出来：
     	(luaL_loadstring(L, str) || lua_pcall(L, 0, LUA_MULTRET, 0))
	如果没有错误，函数返回假； 有错则返回真。
14. luaL_argcheck,检查 cond 是否为真。 如果不为真，以标准信息形式抛出一个错误.
void luaL_argcheck (lua_State *L,
                    int cond,			//判断条件
                    int arg, 			//第几个参数
                    const char *extramsg);//错误提示

15. 　void *lua_newuserdata (lua_State *L, size_t size);
　　新建full userdata。
　　（1）分配一块指定大小的内存；
　　（2）将该full userdata压栈；
　　（3）返回该内存块的地址给主机程序，主机程序能够随意使用这块内存。

16.	luaL_checkudata
	检查函数的第 arg 个参数是否是一个类型为 tname 的用户数据 ( luaL_newmetatable )如果注册表中已存在键 tname，返回 0 。 否则， 为用户数据的元表创建一张新表。 向这张表加入 __name = tname 键值对， 并将 [tname] = new table 添加到注册表中， 返回 1 。 （__name项可用于一些错误输出函数。）
这两种情况都会把最终的注册表中关联 tname 的值压栈。
	它会返回该用户数据的地址 ( lua_touserdata )void *lua_touserdata (lua_State *L, int index);
如果给定索引处的值是一个完全用户数据， 函数返回其内存块的地址。 如果值是一个轻量用户数据， 那么就返回它表示的指针。 否则，返回 NULL 。

17. void lua_register (lua_State *L, const char *name, lua_CFunction f);
把 C 函数 f 设到全局变量 name 中。 它通过一个宏定义：
     #define lua_register(L,n,f) \
            (lua_pushcfunction(L, f), lua_setglobal(L, n))

18. int luaL_getmetatable (lua_State *L, const char *tname);
将注册表中 tname 对应的元表 （参见 luaL_newmetatable）压栈。 如果没有 tname 对应的元表，则将 nil 压栈并返回假。
void lua_setmetatable (lua_State *L, int index);
把一张表弹出栈(luaL_getmetatable将元表压栈)，并将其设为给定索引处的值(userdata)的元表。
19. 使用getmetatable来获取一个table或userdata类型变量的元表.任何table都可以作为任何值得元表，而一组相关的table有可以共享一个通用的元表，此元表描述了它们共同的行为。
20. 表内可以包含任何类型的值（ nil 除外）。 任何键的值若为 nil 就不会被记入表结构内部。 换言之，对于表内不存在的键，都对应着值 nil 。
21. local retSet = Set.new{} -- 此处相当于Set.new({})
22. 表、函数、线程、以及完全用户数据在 Lua 中被称为 对象： 变量并不真的 持有 它们的值，而仅保存了对这些对象的 引用。 赋值、参数传递、函数返回，都是针对引用而不是针对值的操作， 这些操作均不会做任何形式的隐式拷贝。
23. __index 是元表的一个值,如
	mt = {}
	mt.__index = {a = 33, b = 77}
	c = {}
	setmetatable(c, mt)
	而不是 c.__index = {a = 33, b = 77}
	此时, c买有变量a时, c.a 访问的是mt.__index中的a
	默认mt__index = function(table, key)
						return table[v]
						end
24. 表的构造 http://www.shouce.ren/api/lua/5/_30.htm
25. lua_State *luaL_newstate(void);
	//创建一个新的lua状态机
25. void luaL_openlibs(lua_State *L);
	//打开指定状态机中的所有Lua标准库
26. const char *lua_pushlstring(lua_State *L, const char *s, size_t len);
	//把执政s指向的长度为len的字符串压栈.lua对这个字符串做一个内部副本(或是复用一个副本), 字符串
	//内可以是任意的二进制数据,包括零字符.返回内部副本的指针.
27. const char *lua_pushliteral(lua_State *L, const char *s);
	//等价于 lua_pushstring, 区别在于s是一个字面量时才能使用,会自动给出字符串长度
28. int lua_isstring(lua_State *L, int index);
	//当给定索引的值是一个字符串或是一个数字时(数字总能转换成字符串)返回1, 否则返回0
29. int lua_isnumber (lua_State *L, int index);
	//当给定索引的值是一个数字，或是一个可转换为数字的字符串时，返回 1 ，否则返回 0 。
30. lua_to* 函数用于从栈上获取一个值.
31. 当Lua调用的一个C函数返回时, Lua就会清空它的栈, 所以, 不要在C函数之外使用一个C函数内获得的指向
	Lua字符串的指针.
32. int lua_gettop(lua_State *L); 
	//返回栈中元素的个数,就是栈顶元素的所有. lua_settop(L, 0);能清空栈
33. void lua_pushvalue(lua_State *L, int index);
	//把栈上给定索引处的元素做一个副本压栈.
34. int lua_getglobal(lua_State *L, const char *name);
	//把全局变量 name 里面的值压栈,返回该值的类型
35. int lua_getfield(lua_State *L, int index, const char *k);
	//把 t[k]的值压栈, 这里的t是索引指向的值.
36. int lua_gettable(lua_State *L, int index);
	// 把t[k] 的值压栈, t是指向索引的值,k是栈顶存放的值,会弹出栈上的键, 把结果放在栈上同样的位置.可能触发对应的index元方法
37. typedef int (* lua_CFunctin) (lua_State *L)	; 
	//C函数的类型.返回值是压入栈中的返回值数量, 返回后lua会自动删除栈中结果.
38. void lua_pushcfunction(lua_State *L, lua_CFunctin f);
	//
39. 对于一个Lua 函数而言, 有三个地方可以存放非局部的数据.他们是
	//1. 全局变量
	//2. 函数环境
	//3. 非局部的变量(closure)
	而C API 也有三种地方来保存这类数据
	//1. 注册表 是一个全局的table, 只能被C代码访问,保存需要再几个模块中共享的数据
	//2. 环境 每个C函数都有自己的环境table,一个模块内的所有函数共享一个环境table
	//3. upvalue
	//
	//获取注册表中key为 "Key" 的值:
	//	lua_getfield(L, LUA_REGISTERINDEX, "Key");.
	//	注册表中不应该使用数字类型的key, 其为引用系统所保留
	//	
	//	环境表的伪索引是L: LUA_ENVIRONINDEX.
	// int luaopen_foo(lua_State *L)
	//{ 
	//	lua_newtable(L);
	//	lua_replace(L, LUA_ENVIRONINDEX);
	//	luaL_register(L, '库名', '函数列表');
	// 	}
	//
	//C函数与 upvalue的关联称为closure.
	//
40. luaL_newlib

	void luaL_newlib (lua_State *L, const luaL_Reg l[]);
	创建一张新的表，并把列表 l 中的函数注册进去。

	它是用下列宏实现的：

	     (luaL_newlibtable(L,l), luaL_setfuncs(L,l,0))
	数组 l 必须是一个数组，而不能是一个指针。

41. uaL_newlibtable

	void luaL_newlibtable (lua_State *L, const luaL_Reg l[]);
	创建一张新的表，并预分配足够保存下数组 l 内容的空间（但不填充）。 这是给 luaL_setfuncs 一起用的 （参见 luaL_newlib）。

	它以宏形式实现， 数组 l 必须是一个数组，而不能是一个指针。

42. luaL_setfuncs

	void luaL_setfuncs (lua_State *L, const luaL_Reg *l, int nup);
	把数组 l 中的所有函数 （参见 luaL_Reg） 注册到栈顶的表中（该表在可选的上值之下，见下面的解说）。

	若 nup 不为零， 所有的函数都共享 nup 个上值。 这些值必须在调用之前，压在表之上。 这些值在注册完毕后都会从栈弹出。//用法如下
	struct skynet_context * context = lua_touserdata(L, lua_upvalueindex(1));  //获取upvalue

	
	lua_pushlightuserdata(L, ctx);
	lua_setfield(L, LUA_REGISTRYINDEX, "skynet_context");  //ctx为常驻内存的一个变量, 将其设置为轻量用户数据

	luaL_newlibtable(L, l);
	lua_getfield(L, LUA_REGISTRYINDEX, "skynet_context");
	struct skynet_context *ctx = lua_touserdata(L,-1);
	if (ctx == NULL) {
		return luaL_error(L, "Init skynet context first");
	}
	luaL_setfuncs(L,l,1);  //最后一个参数为一, 表示将栈上的一个参数(ctx)设置为所有函数公用的upvalue

	struct skynet_context * context = lua_touserdata(L, lua_upvalueindex(1));  //获取upvalue