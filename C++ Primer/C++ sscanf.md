1. 函数原型([参考](https://msdn.microsoft.com/zh-cn/library/zkx076cy(v=vs.110).aspx?sentenceGuid=a363818adb4d022c86b20f42c2e77a72#mt4)):
		
		int sscanf(
			const char *buffer,  //存储的数据
			const char *format [,//[格式控制字符串](https://msdn.microsoft.com/zh-cn/library/kwwtf9ch(v=vs.110).aspx)
			argument ] ...       //可选参数
			);
		
		int _sscanf_l(
			const char *buffer,
			const char *format,
			locale_t locale [,  //使用的区域设置
			argument ] ...
			);
			
	可选的格式: %[*] [width] [{h | l | ll | I64 | L}]type