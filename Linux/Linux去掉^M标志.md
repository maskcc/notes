第一种方法：
cat -A filename 就可以看到windows下的断元字符 ^M
要去除他，最简单用下面的命令：
dos2unix filename
 
第二种方法：
 
sed -i 's/^M//g' filename
#注意：^M的输入方式是 Ctrl + v ，然后Ctrl + M 
 
第三种方法：
 
#vi filename
 
:1,$ s/^M//g

^M 输入方法： ctrl+V ,ctrl+M
 
第四种方法：
#cat filename |tr -d '/r' > newfile
#^M 可用 /r 代替


这是因为 DOS下的编辑器和Linux编辑器对文件行末的回车符处理不一致，
		
		
		对于回车符的定义：
		windows：0D0A
		unixlinux: 0A
		MAC: 0D

将DOS文件的回车格式转换成类Unix格式的命令:dos2unix filename