1. 文本替换

		sed s/source/dest/g  mm.txt # s 替换, source 要替换的word, dest 目标word, /g 全文替换
		
2. sed -i 选项直接修改文件内容
3. sed中的正则表达式

	- ^ 表示一行的开头 /^#/ 以#开头的匹配
	- $ 表示一行的结尾 /m$/ 以m结尾的匹配 
	- \< 表示词首 \<abc 表示以abc为首的词
	- \> 表示词尾 \>abc 表示以abc为结尾的词
	-  '.' 点, 表示任何个字符
	-  * 表示某个字符出现了0次或多次
	-  [] 字符集合, [abc] 表示匹配 a 或 b 或 c. [a-zA-Z] 所有26个字符, [^a]表示去反, 非a

4. 常用替换
	
		sed -i 3,6s/your/my/g mm.txt #替换第3到6行的文本
		sed -i s/your/my/n		     #替换每行第n个your为my, n为123
		sed -i s/your/my/ng		     #替换每行第n到最后一个your为my, n为123

5. 多个匹配, 可以一次替换多个模式, 中间使用分号分隔,也可以使用 `-e` 命令.

		sed '1,3s/my/your/g; 3,$s/This/That/g' mm.txt  #第一行到第三行的my换成your, 第三以后的This换成That
		sed -e '1,3s/my/your/g' -e '3,$s/This/That/g' mm.txt  #和上面等价
	
6. 可以使用 `&` 当做被匹配的变量, 在基本左右添加单词

		sed 's/my/[& god]/g' mm.txt
		This is [my god] friend.

7. 使用圆括号匹配, 圆括号括起来的正则表达式所匹配的字符串可以被当成变量, sed中使用的是 \1, \2..

		sed 's/This is my \([^,]*\), .*is \(.*\)/\1:\2/g' mm.txt
		This is my cat, my cat's name is mio   
		-->
			cat:mio

		正则为  This is my ([^,]*),.*is(.*)
		匹配到的为: This is my (cat), my cat's name is (mio)
		\1对应 cat, \2 对应 mio
	 
8. a 命令是append, i命令是insert, 用来添加行

		sed "1 i Good job." mm.txt # 在第一行插入 Good job.
		sed "/fish/a GoodJob " mm.txt #匹配到fish后在后面追加一行.

9. c 命令是替换匹配行

		sed "2 c gg" mm.txt # 把第二行替换成gg

10. d 命令, 删除匹配行

		sed "/fish/d" mm.txt #删除含有fish的行

11. p 打印, 可以看成是grep类似命令

		sed -n "/fish/p" mm.txt
		sed -m "/dog/, /fish/p"  #打印匹配到dog和fish的两行

12. `[address[,address]][!]{cmd}`, address 表示匹配到的模式, 模式间以逗号分隔, 匹配到了 ! 就表示能执行,其中 address 可以使用相对位置:

		sed "/dog/, +3s/^/# /g" mm.txt #+3表示后面的3行, 将dog后面的三行的开始处添加`# `.
	
	后面的cmd 可以是多个, 用分号分开, 可以用大括号括起来作为嵌套命令

		sed "3,6 {/This/d}" mm.txt
		sed "3,6 {/This/{/fish/d}}" mm.txt #对3到6行, 匹配/This/成功后再匹配/Fish/ 成功后执行d
		sed "1,${/This/d;s/^ *//g}" mm.txt #从第一行到最后一行, 如果匹配到This,删除, 如果前面有空格, 去掉空格

13. pattern space, 处理结果的缓存, 一行行处理的.

	- g 将hold space 中的内容拷贝到 pattern space 中, 原来pattern space的内容清除
	- G 将hold space 内容append 到 pattern space\n 之后
	- h 将pattern space 中的内容拷贝到hold space 中, 原来hold space内容清除
	- H 将pattern space 内容 append 到hold space\n 中
	- x 交换 pattern space 和hold space 内容
	
			one
			two
			threee 
			sed 'H;g' mm.txt (示意图1)
		![](http://coolshell.cn/wp-content/uploads/2013/02/sed_demo_00.jpg)

			patternspace的概念
			foreach line in file {
			    //放入把行Pattern_Space
			    Pattern_Space <= line;
			 
			    // 对每个pattern space执行sed命令
			    Pattern_Space <= EXEC(sed_cmd, Pattern_Space);
			 
			    // 如果没有指定 -n 则输出处理后的Pattern_Space
			    if (sed option hasn't "-n")  {
			       print Pattern_Space
			    }
			}


			sed '1!G;h;$!d' t.txt
			反序一个文件的行 示意图2
	![](http://coolshell.cn/wp-content/uploads/2013/02/sed_demo.jpg)

[参考sed简明教程](http://coolshell.cn/articles/9104.html)  
[参考awk简明教程](http://coolshell.cn/articles/9070.html/comment-page-3#comments)