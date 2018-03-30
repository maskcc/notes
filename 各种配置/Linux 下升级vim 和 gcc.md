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
		sudo cp /gcc-5.4.0/build/prev-x86_64-redhat-linux/libstdc++-v3/src/.libs/libstdc++.so.6 /usr/lib64/ 
		更新libstdc++.so.6到/usr/lib64/ 和 /usr/lib

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
		
3. linux　下gcc 默认查找目录: `cpp -v`, 是在编译时确定的

		#include "..." search starts here:
		#include <...> search starts here:
		 /usr/lib/gcc/x86_64-redhat-linux/4.8.5/include
		 /usr/local/include
		 /usr/include
		 
		config 选项 
		Configured with: ../configure --prefix=/usr --mandir=/usr/share/man --infodir=/usr/share/info --with-bugurl=http://bugzilla.redhat.com/bugzilla 			
			--enable-bootstrap --enable-shared --enable-threads=posix --enable-checking=release --with-system-zlib --enable-__cxa_atexit 
			--disable-libunwind-exceptions --enable-gnu-unique-object --enable-linker-build-id --with-linker-hash-style=gnu 
			--enable-languages=c,c++,objc,obj-c++,java,fortran,ada,go,lto --enable-plugin 
			--enable-initfini-array --disable-libgcj 
			--with-isl=/builddir/build/BUILD/gcc-4.8.5-20150702/obj-x86_64-redhat-linux/isl-install 
			--with-cloog=/builddir/build/BUILD/gcc-4.8.5-20150702/obj-x86_64-redhat-linux/cloog-install 
			--enable-gnu-indirect-function --with-tune=generic 
			--with-arch_32=x86-64 --build=x86_64-redhat-linux
		Thread model: posix
		
４ 编译HSAIL-Tools时, 提示 `error: unused variable ‘ctxMarker’ [-Werror=unused-variable]`, 表示有未使用的变量， 因为  CMakeList.txt 设置了 `-Werror` 选项， 将warn 提示成error， 将其删除或者将代码里的不使用的变量定义去掉就行.
   还会提示找不到 `usr/bin/ld: cannot find -ltinfo`, 查找`locate tinfo` 发现其存在于 `/usr/lib64/libtinfo.so.5`, lib64 编译时 g++ 不回自动去寻找， 可以修改CMakeList.txt 或者 将`libtinfo.so.5` 连接到 `/usr/lib` 目录, 再去编译
   发现还是不行， 执行 `ld -ltinfo --verbose`,  ld -l 是查找某个库文件，  `--verbose` 是打印查找过程. 发现编译时在查找 `libtinfo.so`, 将 /usr/lib64/libtinfo.so.5 连接至 `/usr/lib/libtinfo.so` 此时就会找到， 编译成功.

5. gcc 一些不知道的疑问可以使用 gcc --help 来显示帮助, 有助于查找问题
6. 编译到一半时可能会提示`CXXABI_1.3.8' not found`,  表示刚编译的 libstdc++.so 没找到，这是因为升级gcc时，生成的动态库没有替换老版本gcc的动态库导致的，将gcc最新版本的动态库替换系统中老版本的动态库即可解决。
需要将其放入到 /usr/lib 目录下， ln -s 过去就行, 通过`strings /usr/lib64/libstdc++.so.6 | grep CXXABI_1` 查看当前库信息


##configure 选项详解[参考](https://gcc.gnu.org/install/configure.html)
1. `--prefix=dirname` install 的目录, 一般在 `/usr/local`
2. `--program-prefix=prefix` 给bin 文件添加前缀, `--program-suffix=suffix` 给 bin 文件添加后缀
3.  `--with-local-prefix=dirname`, gcc 查找 local 头文件的目录， 一般在 `/usr/local/include` 目录, `--prefix has no effect on which directory GCC searches for local header files. ` 但是修改这个不会有什么效果, 它和gcc 的安装目录是 gcc 的`system include`
	, local 目录先于 安装的 include 目录查找.
4. gcc 自动查找通用库文件使用 `GCC_EXEC_PREFIX`, LIBRARY_PATH
5. Do not specify /usr as the --with-local-prefix! The directory you use for --with-local-prefix must not contain any of the system’s standard header files. 
6. `--with-native-system-header-dir=dirname` 本地系统头文件
7. `--with-gnu-ld` `--with-ld=pathname` 使用ld 的目录
8. `--enable-threads` `--enable-threads=lib` lib 是 posix， 确定线程模型是 posix
9. `--enable-tls` (Thread Local Storage)
10.  `--with-aix-soname=‘aix’`
11. 查看gcc 支持哪些语言 `grep ^language= */config-lang.in`, `--enable-languages=lang1,lang2,…` 设置支持哪些语言(包括 all, default, ada, c, c++, fortran, go, jit, lto, objc, obj-c++.)
12. `--enable-targets=all` 支持编译出来的可执行程序的版本，  32位或 64 位.
13. 默认开启 `Werror`,  被 makefile 控制

		--enable-werror
		--disable-werror
		--enable-werror=yes
		--enable-werror=no
14. `--enable-coverage=level`, level 可选 ‘opt’ and ‘noopt’， `opt`， 当覆盖率分析时， 希望关掉优化(optimized, noopt), 当性能分析时希望开启优化(optimized, opt).
15. `--enable-gather-detailed-mem-stats` 显示更多内存 allocation is gatherd, 这些信息会打印当添加 `-fmem-report` 编译选项时
16. `--enable-nls` 开启多国语言， 默认开启
17. `--with-libiconv-prefix=dir` 开启 `libiconv` 头文件的目录， 头文件在 `dir/include`, 库文件在 `dir/lib`
18. `--enable-lto` 开启编译时优化， 默认开启
19. `--with-sysroot=dir` 跨平台编译, `--with-build-sysroot=dir`, `--with-headers=dir`, --with-libs="dir1 dir2 … dirN"
20. 我的 config 配置 ../../gcc-7.3.0/configure  --prefix=/opt/gpro/gcc/7 --enable-bootstrap --enable-shared --enable-threads=posix --enable-checking=release --with-system-zlib --enable-__cxa_atexit --disable-libunwind-exceptions --enable-gnu-unique-object --enable-linker-build-id --with-linker-hash-style=gnu --enable-languages=all --enable-plugin --enable-initfini-array --enable-gnu-indirect-function --with-tune=generic --enable-tls --enable-targets=all --enable-coverage=noopt --enable-gather-detailed-mem-stats --enable-nls --with-libiconv-prefix=/usr --enable-lto --disable-multilib

## 如何支持多款 gcc `编译器`
1. 在configure 时使用 `--prefix=dirname` 来设置可执行程序路径， 编译成功后添加一个脚本

		export PATH=dir/bin:$PATH # 将gcc的可执行目录添加到系统环境中， 并且优先寻找
		export PATH=dir/man:$MANPATH
		export INFOPATH=dir/info:$INFOPATH
		exprot LD_LIBRARY_PATH=dir/lib:$LD_LIBRARY_PATH  # 添加库的目录
		需要时， sourece shellname 就可以了
		
2. 应该使用`source` 命令来执行脚本， 比如您在一个脚本里export $KKK=111 ,假如您用./a.sh执行该脚本，执行完毕后，您运行 echo $KKK ,发现没有值，假如您用source来执行 ，然后再echo ,就会发现KKK=111。
	因为调用./a.sh来执行shell是在一个子shell里运行的，所以执行后，结构并没有反应到父shell里，但是 source不同他就是在本shell中执行的，所以能够看到结果