[参考文档](http://www.cnblogs.com/dmcpxy/archive/2012/02/28/grep-normal-usage.html)
[参考 man](http://man7.org/linux/man-pages/man1/grep.1.html)
##grep的参数
1. -c 只输出匹配行的计数
2. -i 不区分大小写
3. -h 查询多文件时不显示文件名
4. -l 查询多文件时只输出包含匹配字符的文件名
5. -n 显示匹配行及行号
6. -w 只选择含有能组成完整的词的匹配行
7. -v 忽略匹配文本的所有行
8. -A num 打印匹配行的下文num行
9. -B num 打印匹配行的上文num行
10. -C num 打印匹配行的上下num行


		grep -C number pattern files ：匹配的上下文分别显示[number]行，
11. -m NUM 找到num个匹配的行后不再读这个文件
12. -R/-r 递归地读每一目录下的所有文件
13. -R/-r --include=PATTERN 仅仅在搜索匹配PATERN的文件时在目录中递归搜索.
14. -R/-r --exclued=PATTERN 在目录中递归搜索,但是跳过匹配PATTERN的文件
15. -s --no-messages 不打印错误消息(不存在或不可读的文件)
16. -a 把 binary file 当成 text 来过滤
17. --include=GLOB 只找文件名匹配 GLOBG的
18. wildcard matching

##grep中的正则表达式
1. ^ 匹配行首
2. $ 匹配行尾
3. * 匹配0个或多个
4. [] 匹配[]内字符,如[1-5]代表[12345]
5. \ 屏蔽一个元字符的含义
6. [^] 匹配不在指定字符组内的字符
7. \< 首词定位符
8. \> 词尾定位符
9. . 匹配任意字符串
10. x\{n\} 匹配字符x重现n次
11. x\{n, m\} 匹配字符x重复出现n到m次

##其他grep
fgrep, 忽略正则,不解释所有文字
egrep 是扩展的grep, 支持更多的元字符  
	
	1. `+` [a-z]+   //匹配多个字母
	2. `?` gr?p     //匹配零个或多个先前的字符
	3. `a|b|c`      //匹配a或b或c,如(grep) | (sed)
	4. `()`         //分组符号,如 love(able|rs)ov+, 匹配loveableov 或loversov
	
## 输出配色设置
这里用到grep的一个参数-color，color有三个值供选择：never、always、auto。
always和auto的区别就是，always会在任何情况下都给匹配字段加上颜色标记，当通过管道或重定向时就会多出一些控制字符，结果会变成

		export ^[[1;32m^[[KGREP^[[m^[[K_OPTIONS='-color=always'

而auto则只在输出到终端时才加上颜色。


可以在.bashrc里加上
export GREP_OPTIONS='-color=auto'
来实现高亮匹配，具体用什么颜色，可以通过
export GREP_COLOR='a;b' #默认是1;31，即高亮的红色
来设置，其中:

	a可以选择:【0,1,4,5,7,8】
	0 关闭所有属性
	1 设置高亮度
	4 下划线
	5 闪烁
	7 反显
	8 消隐

	b可以选择:【30-37或40-47】
	30 black
	31 red
	32 green
	33 yellow
	34 blue
	35 purple
	36 cyan
	37 white
	30 — 37 设置前景色
	40 — 47 设置背景色
	
## cut 使用
1. -c=LIST 只查找这些字符
2. -d --delimiter=Delim 使用分隔符 delim 替代Table
3. -f --fields=LIST 只选择这些字段
4. -s 不打印不包含分隔符的行
5. -z 使用NULL 分割字符, 不是用新的行
	