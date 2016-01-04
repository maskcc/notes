1. struct模块中的pack, unpack, calcsize函数
		
		pack(fmt, v1, v2)     //fmt 指定格式, v1,v2参数
		unpack(fmt, string)   //按照指定的格式(fmt)解析字节流string,返回解析出来的tuple
		calcsize(fmt)		  //计算给定的格式占用内存的字节数

2. 数据类型代表的意思

		1. byte 				1字节     'x'
		2. char  				1字节     'c'
		3. signed char  		1字节     'b'
		4. unsigned char 		1字节     'B'
		5. _Bool 				1字节,    '?'
   		6. short 				2字节,    'h'
   		7. unsigned short 		2字节,    'H'
   		8. int  				4字节,    'i'
   		9. unsigned int 		4字节,    'I'
   		10. long				4字节,    'l'
   		11. unsigned long 		4字节,    'L'
   		12. long long 			8字节,    'q'
   		13. void *  			4字节,    'P' 表示一个指针类型
   		14. float 				4字节,    'f'
   		15. double  			8字节,    'd'
   		16. char[]  			1字节,    's', 4s表示长度为4的字符串
   		17. char[]  			1字节,    'p', p表示pascal字符串
   		18. unsigned long long  8字节,    'Q'

3. 常用格式化字符串的第一个字符改变对其方式.为了应对c/c++编译器的字节对齐

		@		native					native   凑够4个字节
		=		native					standard 按原始字节数
		<		littlen-endian 			standard 按原字节数
		>       big-endian              standard 按原字节数
		!		network(= big-endian) 	standard 按原字节数

4. 读取示例:

		struct Header
		{
			unsigned short 	id;
			char[4]  		tag;
			unsigned int 	version;
			unsigned int 	count;
		}
		解析函数:
		import struct
		id, tag, version, count = struct.unpack('!H4s2I', s)

		打包:
		ss = struct.pack('!H4s2I', id, tag, version, count)
		