1. 在`lua5.1`的版本中, 注册`c++` 函数使用`luaL_register`.在以后的版本中, 将这个函数删除了. 现在使用如下函数.[参考StackOverflow](http://stackoverflow.com/questions/19041215/lual-openlib-replacement-for-lua-5-2)
	
		extern "C" int luaopen_server(lua_State *L)
		{
			lua_newtable(L);
			luaL_setfuncs(L, polycoreLib, 0);
			return 1;
		}

2. 在`cpp`文件生成的库给lua调用时.生成`.so`文件后, 运行lua脚本时,报错:.也可以使用lua.hpp

		lua: error loading module 'server.so' from file './server.so':
		./server.so: undefined symbol: _Z15lua_createtableP9lua_Statei
	说是符号未找到,其实是要将包含的和lua有关的头文件


3. 报错

		lua: error loading module 'svr' from file './svr.so':
		./svr.so: undefined symbol: luaopen_svr
		stack traceback:
			[C]: in ?
			[C]: in function 'require'
			test.lua:1: in main chunk
			[C]: in ?

4. 生成`.so`文件后, lua文件require后, 报错.包文件是`server.so`.lua中写的是`require "server.so"`

		lua: test.lua:1: module 'server.so' not found:
		no field package.preload['server.so']
		no file '/usr/local/share/lua/5.3/server/so.lua'
		no file '/usr/local/share/lua/5.3/server/so/init.lua'
		no file '/usr/local/lib/lua/5.3/server/so.lua'
		no file '/usr/local/lib/lua/5.3/server/so/init.lua'
		no file './server/so.lua'
		no file './server/so/init.lua'
		no file '/usr/local/lib/lua/5.3/server/so.so'
		no file '/usr/local/lib/lua/5.3/loadall.so'
		no file './server/so.so'
		no module 'server.so' in file './server.so'

	出现这个问题,是由于so文件没找到, lua中的`require`后不能接`.so`

5. 通过源码安装lua时, 会有报错,解决如下
	
		If you're running Linux and get compilation errors, make sure you have installed the 
	  	readline development package (which is probably named libreadline-dev or readline-devel). 
		If you get link errors after that, then try "make linux MYLIBS=-ltermcap".

6. 在 c++ 中调用 lua脚本, lua脚本中再调用导出的库`*.so`文件`undefined symbol:`, 会发现执行失败, 有不认识的标识符.google 得知:

		> You need to tell the linker to export the Lua symbols so they are
		> visible to a dynamic object that is loaded at runtime. With GCC it's
		> typically the following you need to add to your link command: -Wl,-E
		> (see also the 'ld' man page).

	是由于编译`*.so`文件的时候没有使用 `-Wl,-E` 选项. 还得多学习一个`ld`的用法

7. 在调用函数时打印错误是很重要的, 在lua中, 最好能够使用语言自带的错误功能, 有错误时, 会将错误消息压栈, 可以使用

		lua_tostring(L, -1);
	获得最新的错误信息, 方便定位.


