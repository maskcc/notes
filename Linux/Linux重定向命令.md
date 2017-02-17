1. Liunx 命令提示符下的标准输入的描述符是0, 标准输出的描述符是1, 标准错误输出描述符是2
2. `>` 重定向符, 将 stdout 重定向一个文件, 不存在就创建新文件, 存在就将文件覆盖掉	
	
		: > file 或  > filename
		#将file 变为一个空文件, 文件不存在就创建一个长度为0的空文件, 与touch相似, :是占位符, 不产生任何输出

3. `>>` 将stdout 重定向到一个文件, 创建文件或者追加到文件尾部

		cat text.txt 1> file #将text.txt 的内容重定向到file
		cat text.txt 1>> file #将text.txt 的内容重定向到file的尾部
		2>> file 或 2> file #将stderr重定向到file
		&> file 或 &>> file 将 stdout 和stderr都重定向到file   

		M > &N 将一个描述符M 的内容重定向到另一个文件描述符 N
4.  0 < FILENAME , 从文件中接受输入

		grep search-woard < filename

5. [j]<>filename, 为了读写filename, 打开filename 并将描述符j分配给它, filename 不存在就创建filename,
	j没指定默认是 0, stdin.

		echo 12345678 > file
		exec 3 <> file  打开file 并将fd3 分配给它
		read -n 4 <&3 # 只读取4个字符
		echo -n . >&3 写一个小数点
		exec 3>&- 关闭 fd3

6. tea 双向重定向, 即在重定向数据到目标文件的同时, 还要保证数据能够正常处理, tea -a file, 向文件尾添加内容