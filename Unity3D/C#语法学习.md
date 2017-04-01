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
10. 为了声明可以存储null 的变量, 要使用可空修饰符 `?` , 常用在数据库编程.

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
    
    






























