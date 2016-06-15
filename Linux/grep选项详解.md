[参考文档](http://www.cnblogs.com/dmcpxy/archive/2012/02/28/grep-normal-usage.html)
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