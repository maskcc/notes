## 0x00  基础
1. 使用参数 `-i` 来启动Lua 解释器, 程序会在运行完指定程序块后进入交互模式, 可以用来调试
    
        $lua -i test.lua
        
   	也可以使用 `dofile("name")` 来运行代码块(chunk)
2. Lua 区分大小写, 可以使用`--` 来注释一行, 或者使用`--[[   --]]` 来注释多行.
3. 在Unix系统中, 可以再行首添加一行代码让系统自动调用解释器来运行程序, 如
		
     	#!/usr/local/bin/lua --或 #!/usr/bin/env lua , 添加在脚本第一行 
     	./file.lua  --直接运行程序. 可能需要给程序添加运行权限.如(chmod 755 file.lua)  

4. Lua中的基础类型, 使用`type`函数的返回值(string类型)可查看变量类型.

        - nil 全局变量赋值前是nil, 表示无效值, 将nil赋给全局变量等同于删除它
        - boolean  false 和 nil 被视为假, 其他值为真. 0也表示真
        - number
        - string
        - userdata
        - function
        - thread
        - table

## 0x01 字符串
1. Lua 中的字符串是不可变的值, 要修改其值, 只能通过创建新字符串来实现.
2. Lua 中可以用匹配的双括号定义字符串, Lua 不会解释其中的转义序列.

        page = [===[  --第一行的换行会被忽略
            <html>
            <head>
            <title>learn lua</title>
            </head>
            <body>a[c[i]] </body> --为了防止其中嵌套的 `]]`, 可以在其中添加`=`来匹配(同样适用于注释)
            </html>
        ]===]
3. Lua 将运行时数字和字符串做自动转换,  使用`+`时会将字符串转换成数字所以 `print("10" + 1)`会成功输出11
   而`print("a" + 1)`会报错. `..`是连接字符串操作, 会将数字转换成字符串如 `print(33 ..77)` 会输出
   `3377`. 第一个数字后面需要添加一个空格, 不然Lua会将其解释成小数点.
4. Lua中`#` 字符串的长度, 字符串不包括尾部的'\0'

## 0x02 table
1. Lua中`#` 用来获取一个数组或线性表的最后一个值的索引, 如果类似`t={};t["c"] = 7`,  用`#`获取结果为0
2. 当将Lua中的table被设置为`nil`时, lua的 `GC` 最终会删除table, 复用其内存.
3. Lua 中国提供的语法糖, `a["name"]` 等价于 `a.name`
4. table的构造式 可以使用 `t = {}` 来表示.一下方式等价.可以用分号`;`来代替分隔的逗号`,`.

		t = {}
		t = {"c", "c++", "java"}				--构造数组, 其实等价于下面
		t = {[1] = "c",[2] = "c++",[3] = "java"}

		t = {a = 1, b = 2, c = 3} 等价于下面
		t.a = 1; t.b = 2; t.c = 3; 等价于下面
		t["a"] = 1; t["b"] = 2; t["c"] = 3 等价于下面
		t = {["a"] = 1, ["b"] = 2, ["c"] = 3}


5. table 中数组通常以1 开始作为索引的起始值.
6. Lua中所有未初始化的元素的索引结果都是nil, Lua 将nil 作为界定数组结尾的标志.一般不要在table中设置nil值.
7. 在Lua中, 将数组的某个下标设置为nil, 索引会断掉.如:

		t = {1,2,3,4,5}
		t中内容为:
			1   1
			2	2
			3	3
			4	4
			5	5
		将table中元素置为nil时,t[3] = nil, t中元素会变成  
			1   1
			2	2			
			4	4
			5	5
		此时, 使用#t 时, 会返回5, `#` 用来获取一个数组或线性表的最后一个值的索引. 会有问题
		在迭代使用 ipairs时, 只显示如下
			1   1
			2	2

8. table 的内置函数:
	- table.unpack(t) 将table 中从下标1开始返回所有元素.(数组)

##0x03 运算操作符
1. 对于table, userdata 和函数, Lua 是作引用个比较的.只有当其引用的是同一个对象时, 才认为他们相等.
2. Lua 中的不等于用`~=`表示.
3. Lua中操作符优先级如下. 应显示地用括号指定期望的运算次序 

		^    (右结合)
		not # -(一元运算符)
		* / %
		+ -
		..	(右结合)
		< > <= >= ~= ==
		and 
		or
4. Lua中可以多重赋值, 类似

		x, y = 3, 7
		x, y = y, x --用来交换两个数的内容
5. 在交互环境中, local 变量名 就是一个语句块, 再在下面引用, 不会读到刚才的变量名

		>>local i = 7
		>>print(i) nil
   
##0x04 控制语句
1. if语句 
	
		if then
		elseif then
		else then
		end
2. while循环

		while true do
			...
		end
3. 至少会执行一遍的循环
		repeat
			...
		until 0     
4. for循环
	
		数字for:
		for var=exp1, exp2, exp3 do
			...
		end  --从exp1 到exp2, 步长为exp3, 循环第一次计算出其值
		math.huge 可用来表示无穷大的数. 
		不要在循环过程中修改控制变量的值, 会使结果未定义

		泛型for:
		通过iterator 函数遍历所有值
		ipairs是数组迭代器, 碰到nil停如:
		a = {1,2,3,4,5}; a[3] = nil; 
		for _, v in ipairs(a) do
			print(v)
		end
		会输出 1 2,  _ 表示忽略的参数, 哑元
		
		pairs元素迭代
		for i, v in ipairs(a) do
			...
		end 
5. break 和return 跳语句. 它们应该是程序块的最后一个语句. 下面语句会报错

		while true
			return  --可以改成  do return end 来生效 
			print (7)
		end

## 0x05 函数
1. 如果函数只有一个参数,而且此参数是一个字面字符串或table 构造式, 可以省略圆括号

		setname{a= 1, b =2}
2. 如果一个函数调用, 不是一系列表达式的最后一个元素, 那么只产生一个值
		function foo()
			return "a", "b"
		end
		x, y = foo(), 20    --x = "a" y = 20, foo返回多个值
		
		print(foo().."x")   -- ax 函数调用不是表达式的最后一个元素, 只产生一个值
		print((foo())) --将函数放入一对圆括号, 只返回一个值
3. Lua 中参数表中的三个点`(...)`表示该函数可接受不同参数两的实参
4. 具名实参的写法

		rename{old = "timo.lua", new = "gank.lua"}
		将一个table传入
		function rename(arg)
			return os.rename(arg.old, arg.new)
		end
5. 函数的写法

		function foo(x)
			return 2 * x
		end --语法糖

		foo = functoin(x)
			return 2 * x
		end
6. 一个闭包(cloure)就是一个函数加上该函数所需范文的所有`非局部变量`

		function newCounter()
			i = 0
			return function ()
				i = i + 1
				return i
			end
		end
		
		c1 = newCounter()
		print(c1()) --> 1
		print(c1()) --> 2
		print(c1()) --> 3
		
		--创建了新的局部变量i, 返回了新的cloure
		c2 = newCounter()
		print(c2())	--> 1
		print(c2()) --> 2
7. 局部函数

	它们具有特定的词法域(Lexical Scoping).指这个函数可以嵌套在另外一个函数中, 内部的函数可以访问外部函数中的变量

		local function foo()  ... end
		展开为
		local foo
		foo = function() ... end
		
		local pack = {}	
		function pack.new() ... end
8. 尾调用, 当return 后, 该函数的栈信息不需要保存(无其他事情要做)

		function f(x) g(x) end -- 不是尾调用, 需要丢弃g返回值
		return g(x) + 1		-- 不是, 得加一
		return x or g(x)    -- 要调整为一个返回值
		return (g(x))		-- 要调整为一个返回值
	 形式如下: `return <func>(args)` 才为尾调用
9. 使用next

		for k, v in next, t do
			...
		end
## 0x06 编译连接和错误
1. 可以在在c函数动态链接库 

		local path = "*.so"
		local f = package.loadlib(path, "luaopen_socket(函数名)")
2. 显式调用 `error` 来触发错误
	
		if not ptr then error("invalid pointer") end
		或者使用
		assert(nil != ptr, "invalid pointer")
		assert 会检查第一个参数, 为false或nil会引发错误
		file = assert(io.open("name", "r")), assert的第二个参数是io.open 的返回值
## 0x07 元表
1. Lua中的每个值都有一个元表, table 和userdata可以有个字独立的元表, 其他类型的值共享器类型所属的单一元表.创建table时不会创建元表.可以用`setmetatable`来设置或修改元表.

		-- 设置table的元表
		t1 = {}
		setmettable(t, t1)
		assert(getmetatable(t) == t1)
2. `setmetatable` 和`getmetatable` 也会用到元表的一个字段, 用于保护元表. 设置该字段后, 用户既不能能看到也不能修改该元表, 需要设置字段`__metatable`. 设置后`getmetatable`会返回这个字段的值, 且`setmetatable`会引发错误
3. 当访问table 中不存在的字段时, 解释器会查找`__index`的元方法, 由它提供结果.

		mt = {}
		function mt.test()
		    --方法一, 直接将base的 __index 设置
		    base = {}
		    base.__index = {age=0, sex=0, name="rose", id="0"}
		    der = {}
		    setmetatable(der, base)
		    print(der.name, der.age)
		   
		    -- 方法二, 写个函数, Lua 检测到der 中没有字段, 会用 der 和 key 来调用__index函数:
		    base = {}
		    base.tb = {age = 0, sex = 0, name = "rose, id = 0"}
		    base.__index = function(t, key)
		                   return base.tb[key]
		                   end 
		    der = {}
		    setmetatable(der, base)
		    print(der.name, der.age)
		
		end
4. 如果不想在访问时涉及到 `__index`方法, 可以使用 `rawget(t, i)` 函数.`rawset(t, k, v)` 可以不涉及任何原方法而直接设置table t中与 key(k) 相关的value(v)
5. 具有默认值的table. 常规table中任何字段的默认值都是nil.通过元表设置可修改

		function setDefault(t, d)
			local mt = {__index = functoin() return d end}
			setmetatable(t, mt)
		end
		tab = { a = 7}
		setDefault(tab, 0)
		print(tab.x, tab.m) >> 7, 0

6. 创建只读的table
	
		function readOnly (t)
			local proxy = {}
			local mt = {
				__index = t
				__nexindex = function(t, k, v)
					error("attempt to update a read-only table", 2)
			end
			setmetatable(proxy, mt)
			return proxy

## 0x08 环境 
1. Lua将其所有的全局变量表存在一个常规的table, 这个table称为环境. Lua 将环境table 自身保存在全局变量 `_G`中.

## 0x09 编写模块
1. 编写模块, 创建一个table, 将所有需要导出的函数放入其中, 追后返回这个table.

		local M = {}
		complex = M
		function M.add(a, b)
			...
		end 
		return complex

		local modname = ...
		local M = {]
		_G[modname] = M
		package.loaded[modname] = M
		这样不需要在块结尾返回M, 此时require 会返回package.loaded[modname]的当前值

## 0x10 面向对象
1. 创建新实例的方法

		function Account:new(o)
			o = o or {}  --用户没提供table 就创建一个
			setmetatable(o, self)	--使用自身作为元表
			self.__index = self
			return 0
		end

## 0x11 弱引用
1. table的弱引用类型通过其元表中的 `__mode` 字段决定, 如果字符串中包含`k`, 则这个table的key 是弱引用的, 包含`v` 则value是弱引用的.如果table内的某个key 或value 是弱引用, 只要有一个key或value被回收了, 则该条目会从table中删除

		a = {}
		b = {__mode = "k"}	--a 的key就是弱引用了
		setmetatable(a,b)
		key = {}			--第一个key
		a[key] = 1
		key = {}			--创建第二个key, 第一个key会被回收
								(没有其他地方引用第一个key)
		a[key] = 2
		collectgarbage()    --垃圾回收
		for k, v in pairs(a) do print(v) end
		>> 2
		字符串想数字和bool一样, 不会从弱引用table中删除, 除非与他关联的value被回收了.

        