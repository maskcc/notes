## CentOS 升级GCC 版本到5.4
[参考网站](http://blog.sina.com.cn/s/blog_dc905c560102w0i1.html)  
CentOS 7 默认gcc版本是4.8, 要使用更多`c++ 11` 的特性, 需要升级版本

1. 首先把旧的gcc相关的编译工具安装好

		 yum install gcc gcc-c++ glibc-static -y  
		
2. 下载gcc 4.8.2源代码

		 可以搜索gcc官网, 找到需要的代码版本, 把源码下载下来.
		wget ftp://gcc.gnu.org/pub/gcc/releases/gcc-4.8.2/gcc-4.8.2.tar.bz2  
		
	解压缩源代码包，进入gcc-4.8.2目录，执行./contrib/download_prerequisities脚本会自动下载三个依赖库别为gmp-4.3.2、mpfr-2.4.2、mpc-0.8.1，也可以通过如下地址离线下载安装：
	
		ftp://ftp.gnu.org/gnu/gmp/gmp-4.3.2.tar.bz2
		http://www.mpfr.org/mpfr-2.4.2/mpfr-2.4.2.tar.bz2
		http://www.multiprecision.org/mpc/download/mpc-0.8.1.tar.gz
		如果是通过脚本自动下载的依赖库，则会在gcc-4.8.2目录下生成 gmp、mpfr和mpc三个目录，分别安装即可
		
3. 安装gmp

		cd gmp  
		mkdir build  
	    cd build  
	    ../configure --prefix=/usr/local/gcc/gmp-4.3.2  
	    su获取root权限，执行安装
		make && make install  
		
4. 安装mpfr

		回到gcc-4.8.2目录进入mpfr目录
		cd ../../mpfr  
		mkdir build  
		cd build  
		../configure --prefix=/usr/local/gcc/mpfr-2.4.2 --with-gmp=/usr/local/gcc/gmp-4.3.2  
		su获取root权限，执行安装
		make && make install 
		
5. 安装mpc
	回到gcc-4.8.2目录进入mpc目录
		
		cd ../../mpc  
		mkdir build  
		cd build  
		../configure --prefix=/usr/local/gcc/mpc-0.8.1 --with-mpfr=/usr/local/gcc/mpfr-2.4.2 --with-gmp=/usr/local/gcc/gmp-4.3.2  
	
		su获取root权限，执行安装
		make && make install  
	
6.	编译GCC4.8.2

	cd ../..  
	mkdir build  
	cd build  
	../configure --prefix=/usr/local/gcc --enable-threads=posix --disable-checking --enable-languages=c,c++ --disable-multilib  
7. 添加共享库路径，su到root编辑ld.so.conf文件，添加如下内容到文件中：

		/usr/local/gcc/gmp-4.3.2/lib
		/usr/local/gcc/mpfr-2.4.2/lib
		/usr/local/gcc/mpc-0.8.1/lib
	保存退出，执行ldconfig命令
	
		换root，执行make && make install，开始漫长的等待......
		make && make install  
		
8. 卸载旧版本

		yum remove gcc  
		yum remove gcc-c++  
		updatedb  
9. 链接到新版本	
	
		cd /usr/bin  
		ln -s /usr/local/gcc/bin/gcc gcc  
		ln -s /usr/local/gcc/bin/g++ g++

10. 添加man帮助
	
		//文件名可能是man_db.conf 或manpath.config (ubuntu)
		1. vim /etc/man.config
		
		2. 添加gcc的man路径到配置文件 man.config 中
		//配置参考前面注释, 一般可以写成MANDATORY_MANPATH /usr/local/gcc/share/man		
		MANPATH /usr/local/gcc/share/man			
		
		保存退出即可生效，可使用man gcc查看帮助
		
## 编译GCC 时可能出现的问题
1. 注意内存使用, 如果运行到一半时报错,编译gcc 最好有2G空闲内存可用.可以使用如下命令添加 swap分区(如果物理内存不足)

		一、修改swappiness

			1.查看你的系统里面的swappiness
			$ cat /proc/sys/vm/swappiness
			不出意外的话，你应该看到是 60，在阿里云看到的可能是0，那么就需要修改
			2.修改swappiness值
			$ sudo sysctl vm.swappiness=70
			但是这只是临时性的修改，在你重启系统后会恢复默认的，所以，还要做一步
			$ sudo vi /etc/sysctl.conf
			在这个文档的最后加上这样一行:
			vm.swappiness=60
			然后保存，重启。ok，你的设置就生效了。
		
		二、增加swap分区大小
			1. 查看当前分区情况
			free -m
			
			2. 增加 swap 大小, 2G 左右
			dd if=/dev/zero of=/var/swap bs=1024 count=2048000
			
			3. 设置交换文件
			mkswap /var/swap
			
			4. 立即激活启用交换分区
			swapon /var/swap
			
			5. 添加系统引导时自启动运行
			vi /etc/fstab
			
			添加一行
			/var/swap swap swap defaults 0 0
			
			// 取消swap空间步骤
			1. 收回 swap 空间
			swapoff /var/swap
			
			2. 从文件系统中回收
			rm /var/swap
		
2. fatal error sys/cdefs.h no such file or directory或 
致命错误： sys/cdefs.h：没有那个文件或目录 
出现此错误是因为在64位Linux操作系统中打算编译出32位的程序，解决方案如下： [stackoverflow](http://askubuntu.com/questions/470796/fatal-error-sys-cdefs-h-no-such-file-or-directory)
	
		sudo apt-get install  build-essential libc6-dev libc6-dev-i386 
