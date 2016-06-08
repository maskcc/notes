把下面一小段代码加到你的主页中即可在您的网页上中显示来访用户的IP及其地区<script type="text/javascript" src="http://ip.chinaz.com/getip.aspx"></script>

1. JavaScript代码可以内嵌在网页的任何地方,但是一般将JavaScript代码放到`<head>`中.由`<script></script>`所包围.或者将JavaScript代码放到一个单独的`.js`文件,在Html中使用 `<script src=''></script>`来引入.
2. Js不强求结尾添加`;`,语句块用`{...}`.
3. Js使用`//`注释,块注释类似c++`/**/`.
4. Js中的数据类型:
	- Number,不区分整数和浮点数,NaN表示Not a Number,无法计算结果显示NaN,Infinity,无限大,超过了Js的Number的最大值
	- 字符串,单引号或双引号括起来的文本
	- 布尔值,true, false
	- 比较运算符, `>=<`,`==`会自动转换数据类型再比较,`===`不会转换,一般推荐使用`===`比较,NaN是特殊Number不等于所有其他值,包含它自己...只能通过`isNaN()`函数判断.浮点数的比较只能通过比较绝对值之差是否小于某阀值.
	- null表示空,undefined一般用于判断函数参数是否传递.
	- 数组,Js中数组可以包含任意数据类型,用`[...]`括起来,使用逗号分隔.也可使用`new Array(1,2,3);`创建数组.Js中也可以使用索引来访问,索引起始值为0.
	- Js对象由键值对组成的__无序__集合,对象的键都是字符串类型,值可以为任意类型,使用`对象变量.属性名`访问.
	- Js变量由大小写英文、数字、$和_的组合,不能用数字开头.申明一个变量使用var语句.

			var a;
			var $b = 7;
			var t = null;
			
	- strict模式,不用var申明的是全局变量,在strict模式下未使用`var`申明的都会报错.启用strict方式

			use strict;//写在首行
	- 多行字符串可以使用``[1左边的东西]来表示.
	- 字符串不可变,不能通过索引更改其信息,`s[3]='d'`会不做处理.
	- 字符串常用函数

			var s = 'game';
			s.length;//字符串长度
			s.toUpperCase(); //变成大写,返回生成的字符串,不改变原字符串
			s.toLowerCase();
			s.indexof();//搜索指定字符串出现的位置
			s.substring(0,3)//返回从0开始到3,不包含3
			s.substring(9)//从9开始,返回空串 ''
	- 通过索引给数组赋值时,会引起Array大小变化,没有值得为`undefined`.
	- 可以直接修改数组大小.
	- 对数组进行`slice()`操作类似字符串的substring.不传参数时会截取整个数组.可以用来拷贝数组.
	- push()和pop()在末尾添加删除元素
	- shift()和unshift()在首部添加删除元素unshift()完数组内容时返回 undefined.
	- sort()对数组进行排序.reverse()数组反转.
	- splice,t.splice(2,3, 'good', 'jon')从索引2开始删除3个元素再添加两个元素.
	- a.concat(b),连接ab两个数组.并没有修改数组而是产生新数组.也可接收任意个元素和Array,并将__Array拆开__添加到新Array中.
	- join(),将单签Array的每个元素使用指定的字符串连接起来再返回字符串.`var arr = ['a', 'b', 'c']; arr.join(',');//a-b-c`
	- 判断属性是否在对象中用`in`,`'c' in china;`.要判断一个属性是否是对象自身拥有而不是继承的,可以使用`hasOwnProperty()`方法.
5. `if{...} esle if{...} else{...}`条件判断.
6. Js把`null`, `undefined`,`0`,`NaN`和空字符串`''`都视为`false`其他都是true.
7. 循环`for (i=1; i<=10000; i++){...}`,break语句退出循环,`for(var key in o){if(o.hasOwnProperty(key)){...}...}`.
8. while循环.`while(...){...}`,`do {...}while`至少执行一次.
9. `Map`是一组键值对,能够极快查找.(S6新增数据类型)

		var m = new Map(['a', 3], ['b', 4], ['c', 5);
		m.get(a);
		m.set('age', 17);
		m.has('c');
		m.delete('a');
		多次设置同一个键会覆盖掉之前的值.
10. `Set`存储一组键的集合,不存储value,`Set`中没有重复的key.

		创建:
		var s1 = new Set();
		var s2 = new Set([1,2,3]);//数组创建.
		可以重复添加但是没效果.
		s1.add(9);
		s1.delete(3);
11. `interable`类型的集合(Map, set)可以通过`for ... of`遍历`for (var x of a) {...}`
12. `for...in`与`for...of`的区别,`for...in`实际遍历的是对象的属性名称,当遍历Array`对象时`会出现下列错误:

		var a = ['A', 'B', 'C'];
		a.name = 'Hello';
		for (var x in a) {
		    alert(x); // '0', '1', '2', 'name'
		}
		for ... in循环将把name包括在内，但Array的length属性却不包括在内。
		for ... of循环则完全修复了这些问题，它只循环集合本身的元素：
		
13. 一般推荐使用`forEach()`,forEach()方法是ES5.1标准引入的.  

		var a = ['A', 'B', 'C'];
		a.forEach(function (element, index, array) {
	
		// element: 指向当前元素的值
		// index: 指向当前索引
		// array: 指向Array对象本身
		alert(element);
		});
			
			
		Set与Array类似，但Set没有索引，因此回调函数的前两个参数都是元素本身：		
		var s = new Set(['A', 'B', 'C']);
		s.forEach(function (element, sameElement, set) {
			    alert(element);
		});
			
		Map的回调函数参数依次为value、key和map本身：
		var m = new Map([[1, 'x'], [2, 'y'], [3, 'z']]);
		m.forEach(function (value, key, map) {
			   alert(value);
		});
			
		如果对某些参数不感兴趣，由于JavaScript的函数调用不要求参数必须一致，因此可以忽略它们。例如，只需要获得Array的element：
			
		var a = ['A', 'B', 'C'];
		a.forEach(function (element) {
			 alert(element);
		});
			

14. 定义函数,函数也是对象.

		function func(args)
		{
			//如果没有return语句会返回undefined
		}
		
		var func = function (args)
		{
			//function为匿名函数
		}; //结尾要添加个分号
		由于JavaScript允许传入任意个参数而不影响调用，因此传入的参数比定义的参数多也没有问题，虽然函数内部并不需要这些参数：
15. Js的`arguments`只在函数内部起作用,指向当前函数的调用者所传的参数.利用arguments，你可以获得调用者传入的所有参数。也就是说，即使函数不定义任何参数，还是可以拿到参数的值.可用于判断传入参数个数.
16. `rest`参数索引传入以外的参数,如函数签名只有2个参数但是传入了5个参数,后面三个会传给`rest`.写法:`function foo(a, b, ...rest)`
17. `return`的坑...

		function foo() {
		    return   //Js引擎会在这后面添加个`;`,相当于return undefined;
		        { name: 'foo' };
		}
		一般写成:
		function foo() {
		    return { // 这里不会自动加分号，因为{表示语句尚未结束
		        name: 'foo'
		    };
		}

18. Js特性,会先扫描整个函数定义语句,把所有申明的变量提升到函数顶部.使用 strict模式时之前使用未声明的变量如果没赋值会是`undefined`.所以应该在函数内部首先申明所有变量.
19. 全局作用域,Js默认有一个全局对象`window`全局作用域的变量实际上绑定到`window`的一个属性.

		'use strict';
		
		var course = 'Learn JavaScript';
		alert(course); // 'Learn JavaScript'
		alert(window.course); // 'Learn JavaScript'
		因此，直接访问全局变量course和访问window.course是完全一样的。
		
20. 减少冲突的一个方法是把自己的所有变量和函数全部绑定到一个全局变量中。例如：
		var MYAPP = {};
		
		// 其他变量:
		MYAPP.name = 'myapp';
		MYAPP.version = 1.0;
		
21. 由于JavaScript的变量作用域实际上是函数内部，我们在for循环等语句块中是无法定义具有局部作用域的变量的：

		'use strict';

		function foo() {
		    for (var i=0; i<100; i++) {
		        //
		    }
		    i += 100; // 仍然可以引用变量i
		}
		为了解决块级作用域，ES6引入了新的关键字let，用let替代var可以申明一个块级作用域的变量：
		'use strict';
		
		function foo() {
		    var sum = 0;
		    for (let i=0; i<100; i++) {
		        sum += i;
		    }
		    i += 1; // SyntaxError
		}
22. ES6标准引入了新的关键字const来定义常量，const与let都具有块级作用域：`const PI = 3.14`
23. Map函数.

		function pow(x) {
		    return x * x;
		}
		
		var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		arr.map(pow); // [1, 4, 9, 16, 25, 36, 49, 64, 81]

24. reduce.Array的reduce()把一个函数作用在这个Array的[x1, x2, x3...]上，这个函数必须接收两个参数，reduce()把结果继续和序列的下一个元素做累积计算
25. Array的sort()方法默认把所有元素先转换为String再排序.对数字排序时应该注意.sort()方法会直接对Array进行修改，它返回的结果仍是当前Array
26. 我们在函数`lazy_sum`中又定义了函数sum，并且，内部函数sum可以引用外部函数`lazy_sum`的参数和局部变量，当`lazy_sum`返回函数sum时，相关参数和变量都保存在返回的函数中，这种称为“闭包（Closure）”的程序结构拥有极大的威力。返回函数不要引用任何循环变量，或者后续会发生变化的变量。

		function lazy_sum(arr) {
		    var sum = function () {
		        return arr.reduce(function (x, y) {
		            return x + y;
		        });
		    }
		    return sum;
		}
		数据类型	转换为bool后的值
		null	FALSE
		undefined	FALSE
		Object	TRUE
		function	TRUE
		0	FALSE
		1	TRUE
		0、1之外的数字	TRUE
		字符串	TRUE
		""(空字符串)	FALSE
		
27. a=a||"defaultValue";
28. 箭头函数

		x => x * x
		相当于
		function (x) {
		    return x * x;
		}
		// 两个参数:
		(x, y) => x * x + y * y
		返回对象
		x => ({ foo: x })
	
29. typeof操作符获取对象的类型

		typeof 123; // 'number'
		typeof NaN; // 'number'
		typeof 'str'; // 'string'
		typeof true; // 'boolean'
		typeof undefined; // 'undefined'
		typeof Math.abs; // 'function'
		typeof null; // 'object'
		typeof []; // 'object'
		typeof {}; // 'object'

30. 包装对象.使用new创建,它们的类型为object.如果我们在使用Number、Boolean和String时，没有写new会发生什么情况？此时，Number()、Boolean和String()被当做普通函数，把任何类型的数据转换为number、boolean和string类型（注意不是其包装类型）
31. Js需要注意的问题
	- 不要使用new Number()、new Boolean()、new String()创建包装对象；

    - 用parseInt()或parseFloat()来转换任意类型到number；

    - 用String()来转换任意类型到string，或者直接调用某个对象的toString()方法；

    - 通常不必把任意类型转换为boolean再判断，因为可以直接写if (myVar) {...}；

    - typeof操作符可以判断出number、boolean、string、function和undefined；

    - 判断Array要使用Array.isArray(arr)；

    - 判断null请使用myVar === null；

    - 判断某个全局变量是否存在用typeof window.myVar === 'undefined'；

    - 函数内部判断某个变量是否存在用typeof myVar === 'undefined'。

	- 最后有细心的同学指出，任何对象都有toString()方法吗？null和undefined就没有！确实如此，这两个特殊值要除外，虽然null还伪装成了object类型。
		
	- 更细心的同学指出，number对象调用toString()报SyntaxError：
		
	- 123.toString(); // SyntaxError
		
	- 遇到这种情况，要特殊处理一下：
		
			123..toString(); // '123', 注意是两个点！
			(123).toString(); // '123'

32. Date获取时间.月份范围从0开始...到11月.

		var d = new Date(2015, 5, 19, 20, 15, 30, 123);
		d; // Fri Jun 19 2015 20:15:30 GMT+0800 (CST)
		
		var d = Date.parse('2015-06-24T19:49:22.875+08:00');
		d; // 1435146562875
		
		var d = new Date(1435146562875);
		d; // Wed Jun 24 2015 19:49:22 GMT+0800 (CST)
		
		var d = new Date(1435146562875);
		d.toLocaleString(); // '2015/6/24 下午7:49:22'，本地时间（北京时区+8:00），显示的字符串与操作系统设定的格式有关
		d.toUTCString(); // 'Wed, 24 Jun 2015 11:49:22 GMT'，UTC时间，与本地时间相差8小时
		
		获取时间戳:
		if (Date.now) {
		    alert(Date.now()); // 老版本IE没有now()方法
		} else {
		    alert(new Date().getTime());
		}
		
33. 创建正则表达式

		var re1 = /ABC\-001/;
		var re2 = new RegExp('ABC\\-001');
		re.test('010-12345'); // 

34. 切分字符串

		'a,b;; c  d'.split(/[\s\,\;]+/); // ['a', 'b', 'c', 'd']
	
35. 分组:

		var re = /^(\d{3})-(\d{3,8})$/;
		re.exec('010-12345'); // ['010-12345', '010', '12345']
		re.exec('010 12345'); // null
		
36. 非贪婪匹配,加个`?`.`var re = /^(\d+?)(0*)$/;`.
37. `JSON.stringify(xiaoming)`,按缩进输出:`JSON.stringify(xiaoming, null, '  ');`第二个参数用于控制如何筛选对象的键值，如果我们只想输出指定的属性，可以传入Array：.还可以传入一个函数，这样对象的每个键值对都会被函数先处理：如果我们还想要精确控制如何序列化小明，可以给xiaoming定义一个toJSON()的方法，直接返回JSON应该序列化的数据：.

		JSON.stringify(xiaoming, ['name', 'skills'], '  ');
		
		{
		  "name": "小明",
		  "skills": [
		    "JavaScript",
		    "Java",
		    "Python",
		    "Lisp"
		  ]
		}
		
		var xiaoming = {
		    name: '小明',
		    age: 14,
		    gender: true,
		    height: 1.65,
		    grade: null,
		    'middle-school': '\"W3C\" Middle School',
		    skills: ['JavaScript', 'Java', 'Python', 'Lisp'],
		    toJSON: function () {
		        return { // 只输出name和age，并且改变了key：
		            'Name': this.name,
		            'Age': this.age
		        };
		    }
		};
		
		JSON.stringify(xiaoming); // '{"Name":"小明","Age":14}'
		
38. 拿到一个JSON格式的字符串，我们直接用JSON.parse()把它变成一个JavaScript对象：
39. 输入密码变多的原因;这个做法看上去没啥问题，但用户输入了口令提交时，口令框的显示会突然从几个*变成32个*（因为MD5有32个字符）。要想不改变用户的输入，可以利用<input type="hidden">实现.
40. 设置数字的小数位.`alert((0.9996*100).toFixed(2))`;
		






