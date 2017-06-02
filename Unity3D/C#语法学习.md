1. C#中所有的代码都出现在一个类型定义的内部.可以运行的程序规范:

		//argcs 第一个参数是文件名称后的第一个参数, 使用System.Environment.CommandLine 获取完整命令
		class HelloWorld{
			static void Main(/*string[] argcs*/){
				System.Console.WriteLine("hello world");
			}
		}
2. System.Console.WriteLine(string s); //在stdout上输出字符串s, 可以格式化输出, 用 {0}, {1} 表示参数的占位符.

        System.Console.WriteLine("Her name is {0}, age is {1}", "Lucy", 17);
        
3. System.Console.Read(); //从输入读入一个字符, 并存储为int类型, 输入多个字符会存入一个缓冲区, 如输入n个字符, 调用n次 Read 可以全部读入.

        int val = System.Console.Read();
        log(val.ToString());
        int val2 = System.Console.Read();
        log(val2.ToString());
        
        输入: 01
        输出: 48
              49
3. System.Console.ReadLine(); //
4. BCL 基类库, CTS 公共类型系统, CLS 公共语言规范, CLI 公共语言基础结构, VES 运行时即虚拟执行系统, CIL 公共中间语言.
5. 数字类型:
        在指定类型时, 应该使用C#关键字, 而不是BCL 名称
                                       BCL 名称
        sbyte, 1字节, -128 ~ 127      System.SByte
        byte,  1字节, 0 ~ 255         System.Byte
        short, 2字节, -32768 ~ 32767  System.Int16
        ushort 2字节,  0 ~ 65535      System.UInt16
        int    4字节, 0xffff,ffff ~ 0x7fff,ffff System.Int32  U
        uint   4字节, 0 ~ 0x7fffffff System.UInt32
        long   8字节,                 System.Int64            L
        ulong  8字节,                 System.UInt64           UL
        float  4字节                  System.Single    有效数字 7, F
        double 8字节                   System.Double    有效数字 15~16, D
        decimal 16字节                 System.Decimal   有效数字 28~29, M(精确数据)
        bool  1字节                   System.Boolean
        char                           System.Char
        
        指数记法: 6.023E23F
        一般不用double 或float 比较数字的大小, 会因为精度问题导致比较不准
        浮点数溢出时一般为 -Infinity, Infinity
        浮点数除以0会返回NaNs
     
6. 格式化输出:

        System.Console.WriteLine(0x{0:X}, 42);// 输出 0x2A, `{0:X}` 中X的大小写决定了十六进制书籍的大小写
        //round-trip 格式化, 返回的字符串转换回数值肯定能获得原始值
        string.Format("{0:R}", 3.1415936);
        
7. 字符串
    - 在C#中, 可以在字符串前面使用`@` 符号, 指明转义序列不被处理.唯一支持的转义序列是 `""`.这个双引号不会终止字符串.C#不会自动凭借字符串字面量.
    - static string.Format( string formate, ...);
    - static string.Concat(string str0, string str1);
    - static string.Compare(string str0, string str1);//string.Compare(str1, "/help", true); //忽略大小写
    - StartWith(string); EndWith(string); ToLower(); ToUpper(); Trim(); Trim(...); TrimEnd(); TrimStart();Replace(string oldvalue, string newvalue);
    - windows 下, 换行符是 `\r`和`\n`, 在unix 上是单个 `\n`.在多个平台式, 可以使用 System.Console.Write(str) + System.Environment.NewLine;
    - str.Length; //字符串长度
    - 当有大量字符串需要修改, 可以使用 System.Text.StringBuilder, 有 Append(), AppendFormat(), Remove(), Replace() 等方法, 会直接修改 StringBuilder 本身的数据.
8. null 和 void, null 表明变量不引用任何有效的对象, void 表示没有类型或者没有任何值.
9. C#3.0 增加了上下文关键字 `var` 来声明隐式类型的局部变量
10. 为了声明可以存储null 的变量, 要使用可空修饰符 `?` , 常用在数据库编程. `??`空集合操作, 如果这个值为空, 使用另一个值, 有短路原则.

        expression1 ?? expression2

        int? count = null;
        if( null != count ){
            ...
        }
        
11. 将代码放到 checked块中, 在运行时发生溢出时抛出 `System.OverflowException` 异常.unchecked 不抛出异常.

        checked{
            int n = int.MaxValue;
            n = n = 1;
            System.Console.WriteLine(n);
        }
        
12. C# 不支持从数值到bool 型的转换. 每个数值数据类型都包含一个Parse() 方法, 将字符串转换成对应的值类型.如 int.Parse("32");
    int.TryParse("32", out num); 不会返回异常, 失败返回 false .
    也能使用 System.Convert 将一种类型转换成另一种类型.
    System.Convert.ToDouble(string);System.Convert.ToBoolean(string);所有类型都有ToString()方法,一般是返回数据类型的名称.
    **C# 计算参数或者某个表达式的值是, 总是从左向右运算的, 不会造成误解!如 int i = 1; M(i++, ++i);  只能是 (1, 3); **
    
13. 数组
    - 数组的声明: string[] languages; int[,]/*注: 这种形式的数组每个组的长度必须是一致的*/ cells; //二维数组
        
        string[] languages = {"VBS", "Lua", "Python"};
        languages = new string[3];
        languages = new string[3]{"VBS", "Lua", "Python"};
        int[,] cells = int[3,3];
        
        cells={
            {1, 0, 2},
            {1, 2, 1},
            {2, 0, 1}
        };
        
    - 使用 default 操作符显示地获取任何数据类型的默认值. int count = default(int);
    - 可以使用方括号访问数组.
    - 交错数组的初始化
        
        int[][] cells = {
            new int[]{1, 2, 3},
            new int[]{0, 1},
            new int[]{7,9,5,2}
        };
	
	- 数组提供的方法: System.Array.sort();System.Array.BinarySearch();//先进行排序System.Array.Reverse();System.Array.clear();//不删除元素, 只是将数据都初始化为默认值; System.Array.Reverse(); 翻转数组
	- 获得特定唯独的长度是实用GetLength()方法, cells.GetLength(0); Rank() 函数获取整个数组的维数, Clone()返回数组的一个副本.

14.  字符串, 应该使用复合格式化来拼接字符串而不是用加法运算符.
	- ToCharArray() 转换为数组
  
15. 运算优先级和集合性
    - *, \, % 最高优先级
    - +, - 次之
    - =, 最低
    - 位移操作符的优先级低于算术操作符 
    
16. 线程安全的自增自减操作: System.Threading.Interlocked.Increment(), Decrement();
17. foreach( char letter in email)
18. switch(input)
    {
        case "exit":
        case "close":
            break;
        default:
            break;
    }
    goto identifier;
    goto case input;
    goto default;

19. AND(&), OR(|), XOR(^), 按位取反(~), 位操作符
20. foreach循环, foreach 循环期间禁止修改循环变量 variable

        foreach( type variable in collection )
            statement
    
21. 预处理指令
    - #if() #elif #else #endif
    - #define DEBUG
    - #undef DEBUG
    - #error
    - #warning      //编译器会提出警告
    - #pragma warning disable(restore) 1030 //禁用(还原)#warning 指令
    - #line org-line new-line #line default  //指定警告的行号 #line 113 "test.cs" #warning "warn happen" #line default
    - #region pre-proc-msg code ... #endregion
    - 在编译时使用define 选项 csc.exe /define:DEBUG test.cs

22. 使用 `using namespace;` 的 using 指令来引用命名空间, 但是要使用命名空间的一个子命名空间, 如 System.Console 下的内容, 应该在
    using System; 后添加 using System.Console; using 指令不会导入任何嵌套命名空间中的类型. 可以为命名空间指定一个别名`using sys = System;`
    
23. 如果一个程序的两个类都有Main()方法, 可以使用 csc.exe 的 /m 开关指定包含入口的类.
23. 参数默认是传值的. 如果要以传引用方式传值, 可以使用 func(ref argc1, ref argc2); 使用 out 修饰参数类型, 可以以传引用的方式传入一个未初始化的值. 如果要返回多个值, 可以返回 tuple 类型.
24. 传入多个参数 static string Combine(params string[] paths);// 在方法申明的最后一个参数之前添加 params 关键字, 将最后一个参数声明为数组(方法最多只能有一个参数数组).
25. 异常处理:
    - 所有的异常类都派生自 System.Exception.

        try{
            int.Parse("32");
        }
        catch( FormatException ){
            ...
        }
        catch( System.Exception ){
            ...
        }
        catch{
            //应该避免使用
            //常规catch块, 等价于获取object数据类型的catch块
        }
        finally{
            //finally 不论是否异常后肯定会执行的内容
        }
        
    - 常见异常类型
    
        System.Exception 异常的基类
        System.ArgumentExcetion 传给方法的参数无效
        System.ArgumentNullExcepion 不应该为null的参数为null
        System.ApplicationException 应避免使用这个异常, 初衷是实把系统异常和应用程序异常区分开, 实际行不通
        System.FormatException 参数格式不符合调用的方法的参数规范
        System.IndexoutOfRangeException 试图访问不存在的数元素或其他集合元素
        System.InvalidCastException 因无效的类型转换引发的异常
        System.NotImplementedException 找到方法的签名但是实现没找到
        System.NullReferenceException 试图通过一个空的引用访问对象
        System.AritheticException 发生无效的数学运算, 不包括被零除
        System.ArrayTypeMismatchException 试图将类型有误的元素存储到数组
        System.StackOverflowException 发生了非预期的深递归
      
    - 使用 throw 语句报告错误. `throw new Exception ( "not handled!" );`
    
26. 类的字段可以在声明时设置字段的初始值.在类的实例成员内部, 可以使用this 获取对这个内的引用.
27. C#中属性的声明.

        class Employee{
            public string first_name{
                get{
                    return first_name_;
                }
                //可以给get和set指定访问修饰符, 
                private set{
                    first_name_ = value;//value 关键字引用赋值操作符的右侧部分
                }
            }
            //虚字段, 根据value来设置first_name_ 和 last_name_
            public string name {
                get{
                }
                set{
                }
            }
            public string last_name{ get; set; }
            private string first_name_;
            private string last_name_;
        }
28. 属性和方法调用不允许作为ref或out参数值使用.
29. 可以使用对象初始化器对对象进行初始化.只是一种语法糖 如:

        Employee ep1 = new Employee("Jack", "Cananda")
        { Title = "Computer engneer", Salary = "not enough"};
        
        //集合初始化器 
        List<Employee> eps = new List<Employee>(){
            new Employee ("Mike", "Japan"),
            new Employee ("Cike", "Nihong"),
        };
        
30. 构造器链, 从一个构造器中调用同一个类的另一个构造器:

        public Employee(string fname, string lname){
            first_name_ = fname;
            last_name_ = lname;
                    
        }
        //使用this 调用构造器 
        public Employee(int id, string fname, string lname):
            this(fname, lname){
            Id = id;
        }
        
31. 未初始化的静态字段将获得默认值 default(T), 静态构造器用于对类进行初始化, 运行时在首词访问类时自动调用静态构造器.

        static Employee{
            Random randomGenerator = new Random();
            NexId = randomGenerator.Next(101, 999);
        }
        //声明时对静态变量赋的值被移动到静态构造器的第一条语句前.可以考虑以内联的方式初始化静态字段.
        
32. 用static 关键字修饰类, 表明该类是个静态类, 只能通过类名来调用成员函数.不能有非静态的成员变量.被标记为 abstract 和 sealed.
33. 扩展类, 为类添加实例方法, 即使是哪些不在同一个程序集的类. 第一个参数是要扩展或者要操作的类型(被扩展的类型), 在被扩展的类型名称前附加this修饰符, 要将方法作为一个扩展方法来访问. 如果扩展方法的签名已经和被扩展类型中的签名匹配, 则扩展方法不会被调用.
    public static class DirectoryInfoExtension{
        public static void CopyTo(
            this DirectoryInfo sourceDir, string target, 
            SsearchOption opt, string searchPattern){
                ...
            }
    }
    
        DirectoryInfo dir = new DirctoryInfo(".\\source");
        dir.CopyTo(".\\target", SearchOption.AllDirectories, "*");
        
34. 使用const 和 readonlye 将数据封装到类中.public 常量应该恒定不变, 其他地方引用的常量会在编译时写入到引用程序集中, 当常量改变而没有重新编译, 程序集将使用原始值而不是新值. 将来可能改变的值应该制定为readonly(只能应用于字段, 只能从构造器中更改或者声明时指定).readonly 应用于数组, 不会冻结数组的内容, 智慧冻结数组中的元素数量.
35.  嵌套类能访问包容类的任何成员, 包容类不能访问嵌套类的私有成员.
36. 除非明确指定了基类, 否则所有类都默认从object派生. 可以将派生类型的值直接赋给基类类型的变量.反之, CLR 会在运行时检测这个转换, 错误就抛出异常.
37. C# 只有单继承, 不能同时继承两个基类
39. 密封类, 避免非预期的派生 

        public sealed class Cls{}
        
40. C#中需要重写的函数都需要加上virtual 关键字, 子类重写时要加上 override 关键词, 用 override 修饰的任何方法都自动成为虚方法. C# 总是调用派生得最远的虚成员.

        public class PdaItem{
            public virtual string Name{get; set;}
        }
        public class Contact : PdaItem{
            public override string Name{get; set;}
        }

41. C# 在派生类中用new 修饰符实现的函数调用派生类的函数.
42. sealed 修饰符禁止从该类继承, 虚成员也可以密封, 防止其子类重写该成员.

        class Base{
            public virtual void Method(){}
        }
        
        class Der{
            public override sealed void Method(){}
        }
        class SubDer{
            //这里会报错, 密封后不能重写
            public override void Method(){}
        }
    
43. 使用 关键字 base 指代基类, 可以在派生类中调用基类函数.派生类的构造器可以使用关键字base 来明确指明基类应该调用的构造函数.

        public class BaseClass{
            public BaseClass(string name){}
        }
        public class Der : BaseClass{
            public Der(string name):base(name){}
        }

44. 使用关键字  abstract 来标志抽象类. 
    - 抽象类不可实例化
    - 包含抽象成员
    - 没有实现的方法或属性
    - 其作用是强制所有的派生类提供实现
    - 抽象成员不能声明为私有
  
45. 所有类都从System.Object派生, 都含有这些成员函数:
    - public virtual bool Equals(object o)
    - public virtual int GetHashCode()
    - public Type GetType()
    - public static bool ReferenceEquals(object a, object b) //如果两个参数引用同一个对象就返回true
    - public virtual string ToString()
    - public virtual void Finalize()  // 析构器的一个别名, 通知对象准备终结, C#禁止直接调用这个方法.
    - protected object MemberwiseClone() //创建当前对象的浅表副本.引用会被复制, 但被引用类型中的数据不会被复制.
   
46. 使用is 操作符判断基础类型. 

        string data;
        if ( data is string ){
            ...
        }

47. 使用 as 操作符进行转换, 当转换失败会返回null, as 不能成功判断基础类型, as能在继承链中向上或向下转型.
48. 接口成员使用访问修饰符, 所有成员都自动定义为公共成员.
49. 实现和使用接口:

        interface IListable{
            string[] ColumnValues{
                get;
            }
        }
        public abstract class PdaItem{
            public PdaItem(string name){
                name_ = name;
            }
            public virtual string name_{get; set;}
        }
        
        //继承的基类写在前面, 接口写在后面, 可以实现多个接口, 但只能从一个基类派生.接口不能包含静态成员
        class Contact : PdaItem, IListable{
            public Contact(string argc1, string argc2) : base(null){
                argc1_ = argrc1;
                argc2_ = argrc2;
            }
            public string argc1_ {get; set}
            public string argc2_ {get; set}
            
            public string[] ColumnValues{
                get{
                    return new string[]{
                        argc1_,
                        argc1_
                    };
                }
                
                
            }
        }
        interface IShow{
            void show(string s);
        }
        class JackShow : IShow
        {
            //接口的显式实现, 没有public前缀, 调用时要强制转换 ((IShow)obj).show(argc);
            void IShow.show(string name){}
        }

50. 除了string 和 object 是引用类型, 所有C# 内建类型都是值类型. 定义值类型使用关键字 struct. 
    - 一般使用值类型的良好规范是确保值类型是不可变的. 一旦实例化值类型就不能修改.
    - 不能包含用户定义的默认参数构造器, 每个结构会自动获得一个无参构造器将所有字段初始化为默认值
    - C# 禁止在声明时对结构的实例字段进行赋值.
    - 可以使用有参数的构造器, 但是构造时要将所有属性初始化.否则编译器会报错.
    - 将new 用于值类型时, 在临时存储池中创建对象新的实例, 并将所有字段初始化为默认值, 再调用构造器, 将临时存储位置作为ref变量以this传给构造器. 

51. C#中 new 创建的值类型 任然是值类型.

        int c1 = new int();
        c1 = 9;
        int c2 = c1;
        c2 = 7;
        print(c1, c2); // --> 9, 7  按值复制, 修改c2 不会影响c1
       
52. 所有值类型都是隐式密封, 除了枚举之外的所有值类型都派生自System.ValueType, 结构的继承链总是从object到System.ValueType到结构.
53. 装箱, 将值类型转换成一个临时的引用类型, 拆箱, 将引用类型转换成值类型.每个装箱操作都涉及到内存分配和复制, 每个拆箱操作都设计类型检查和复制.

        //一般是将一个值类型传给一个需要object 类型的函数
        void add(object obj);
        int c = 7;
        add(c);

        int number;
        object thing;
        doublie big_num;
        
        number = 42;
        thing = number;

54. 枚举类型的定义方法, 其他类型转换成枚举要显示转换, 除了0, 0能隐式转换成任何枚举类型, 继承链从 System.ValueType 到 System.Enum 到枚举.

		enum DAYS{
			Monday = 0, //第一个默认等于0
			Tuesday = 3,
			Wednesday //这个为3+1 = 4
		}

55. 重写 `ToString()` 方法

		public override string ToString(){
			return string.Format("{0} : {1}", hour, second);
		}
56. 声明对象为弱引用, 使用前一般要先判断是否等于 null

		public WeakReference Data;

57. 终结期不能重载, 也不能显示调用, 调用它的只能是垃圾回收器.终结器不支持访问修饰符.基类中的终结器作为对象终结调用的一部分被自动调用. `~Destructor(){}`

58. 委托的使用

        //委托的声明
        public delegate bool ComparisonHandler( int argc1, int argc2 );
        //委托的实例化, 参数必须和签名的参数一致, 
        void sort( int[] items, ComparisonHandler h);
        public bool greater_than( int argc1, int argc2 ){ return argc1 > argc2; }
        //从方法组向委托类型的转换会自动创建一个新的委托对象, 不必new 实例化 ComparisonHandler
        sort( items, greater_than );
        //Lambda 表达式的使用
        sort( items, (int argc1, int argc2 ) => {
            return argc1 > argc2;
        });
        //也能省略参数类型
        sort( items, (argc1, argc2 ) => {
            return argc1 > argc2;
        });
        //表达式 Lambda
        sort( items, (argc1, argc2) => argc1 < argc2 );

59. C#中多线程, 命名空间 `using System.Threading`, 启动一个无参数线程

        using System.Threading;
        //无参线程
        public static void DoWork(){}
        ThreadStart threadStart = DoWork;
        Thread th = new Thread(threadStart);
        th.Start();
        th.Join();
        
        //有一个objcet参数的线程
        public static void DoWork(object obj){}
        ParameterizedThreadStart threadStart = DoWork;
        Thread th = new Thread(threadStart);
        th.Start( obj /*线程参数*/);
        th.Join();
        
60. [C#中特性的使用](http://www.cnblogs.com/liuxinxin/articles/2265672.html)








