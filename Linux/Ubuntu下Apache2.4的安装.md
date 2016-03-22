1. 去[apache镜像网站](http://mirrors.cnnic.cn/apache/httpd/)下载文件安装源代码`httpd-2.4.18.tar.bz2`,和`httpd-2.4.18-deps.tar.bz2`,会用到的库文件
2. 分别解压两个文件,,将`httpd-2.4.18-deps.tar.bz2`解压出来的两个文件夹`apr`和`apr-util`copy到文件夹`httpd-2.4.18/srclib`目录下
3. 在[pcre镜像文网站](http://ftp.exim.llorien.org/pcre/)搜索`pcre-8.36.tar.gz`下载,按照里面的`instal`文件安装
4. 按照`httpd-2.2.4.18`目录下的install文件说明安装就ok了.如果提示出现了某文件找不到,先locate该文件,然后将其ln到`/lib`或者`/lib64`目录下.如果还是报错，使用ln -s  将libpcre.so.1文件连接到之前的apache安装文件夹的lib目录下。使用bin目录下的 sudo ./apachectl start启动apache服务！
5. 具体可参考[官方文档](https://httpd.apache.org/docs/2.4/zh-cn/install.html),比较详细