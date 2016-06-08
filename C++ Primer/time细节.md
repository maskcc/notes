##Linux time() 函数
头文件:time.h  
1. `time_t time(time_t *timer);`
	获取当前的额系统时间,返回值是time_t类型,其值表示从CUT(`1979年1月1日00:00:00`)到当前时刻的秒数.

2. 调用`localtime` 将`time_t`表示的`CUT`时间转换成本地时间.并转换成`struct tm`类型.
3. 使用int(32)保存时间戳可能的问题

		目前相当一部分操作系统使用32位二进制数字表示时间。此类系统的Unix时间戳最多可以使用到格林威治时间  
		2038年01月19日03时14分07秒（二进制：01111111 11111111 11111111 11111111）。其后一秒，二进制
		数字会变为10000000 00000000 00000000 00000000，发生溢出错误，造成系统将时间误解为1901年12月13
		日20时45分52秒。这很可能会引起软件故障，甚至是系统瘫痪。

4. `struct tm`结构

		struct timeval
		{
			long tv_sec;//秒
			long tv_usec;//微秒
		}

		struct tm
		{
			int tm_sec; //秒,正常范围0-59, 但允许61
			int tm_min; //分
			int tm_hour; //小时 
			int tm_mday; //日,即一个月中的第几天
			int tm_mon;  //月,从一月算起,0-11
			int tm_year; //年,从1990至今过了多少年 1990 + p->tm_year;
			int tm_wday; //星期,一周期的第几天 ,0-6,0表示星期日,1表示星期一
			int tm_yday;  //从今年1月1日到目前的天数
			int tm_isdst; //日光节约时间的旗标
		}

4. `char *asctime(const struct tm* timeptr);`, 将结构中的信息转换为真实世界的时间,以字符串的形式显示
5. `char *ctime(const time_t *timep);`, 将timep转换为真实世界的时间,以字符串显示.**CTime表示的日期上限是2038年1月18日，下限是1970年1月1日 12:00:00 AM GMT**
6. `double difftime(time_t time1, time_t time2);`, 返回两个时间相差的秒数.
7. `int gettimeofday(struct timeval *tv, struct timezone *tz);`, 返回当前距离1970年的秒数和微妙数,后面tz是时区,一般不用.
8. `struct tm* gmtime(const time_t *timep);`将time_t表示的时间转换为没有经过时区转换的UTC时间，是一个struct tm结构指针
9. `stuct tm* localtime(const time_t *timep);`和gmtime类似，但是它是经过时区转换的时间。
10. `time_t mktime(struct tm* timeptr);`将struct tm 结构的时间转换为从1970年至今的秒数
11. `time_t mktime(struct tm* timeptr);`将struct tm 结构的时间转换为从1970年至今的秒数.

12. time, gmtime, asctime 所表示的时间都是UTC时间，只是数据类型不一样，而localtime, ctime 所表示的时间都是经过时区转换后的时间，它和你用系统命令date所表示的CST时间应该保持一致。
13. strftime() 函数将时间格式化
我们可以使用strftime（）函数将时间格式化为我们想要的格式。它的原型如下：
		
		size_t strftime(
		     char *strDest,
		     size_t maxsize,
		     const char *format,
		     const struct tm *timeptr
		);
		%a 星期几的简写
		%A 星期几的全称
		%b 月分的简写
		%B 月份的全称
		%c 标准的日期的时间串
		%C 年份的后两位数字
		%d 十进制表示的每月的第几天
		%D 月/天/年
		%e 在两字符域中，十进制表示的每月的第几天
		%F 年-月-日
		%g 年份的后两位数字，使用基于周的年
		%G 年分，使用基于周的年
		%h 简写的月份名
		%H 24小时制的小时
		%I 12小时制的小时
		%j 十进制表示的每年的第几天
		%m 十进制表示的月份
		%M 十时制表示的分钟数
		%n 新行符
		%p 本地的AM或PM的等价显示
		%r 12小时的时间
		%R 显示小时和分钟：hh:mm
		%S 十进制的秒数
		%t 水平制表符
		%T 显示时分秒：hh:mm:ss
		%u 每周的第几天，星期一为第一天 （值从0到6，星期一为0）
		%U 第年的第几周，把星期日做为第一天（值从0到53）
		%V 每年的第几周，使用基于周的年
		%w 十进制表示的星期几（值从0到6，星期天为0）
		%W 每年的第几周，把星期一做为第一天（值从0到53）
		%x 标准的日期串
		%X 标准的时间串
		%y 不带世纪的十进制年份（值从0到99）
		%Y 带世纪部分的十制年份
		%z，%Z 时区名称，如果不能得到时区名称则返回空字符。
		%% 百分号