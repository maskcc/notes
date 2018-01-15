
##[下使用yum完美搭建LNMP环境](http://www.jianshu.com/p/447e02d7951d)
[CentOS 安装 MySQL 全指南](https://yq.aliyun.com/articles/47237)
1. 安装第三方yum源

		#安装下载工具
		yum install wget
		#下载
		wget http://www.atomicorp.com/installers/atomic
		#安装
		sh ./atomic
		#更新yum源
		yum check-update

2. 安装nginx

		#删除系统自带的软件包
		yum remove httpd* php*
		#安装nginx
		yum install -y nginx
		#设置nginx开机启动
		chkconfig nginx on
		#启动nginx
		service nginx start

3. 安装PHP

		1. 检查当前安装的PHP包
			yum list installed | grep php
			如果有安装的PHP包，先删除他们, 如:
			yum remove php.x86_64 php-cli.x86_64 php-common.x86_64
		2. 配置安装包源:
			# Centos 5.X
			rpm -Uvh http://mirror.webtatic.com/yum/el5/latest.rpm
			# CentOs 6.x
			rpm -Uvh http://mirror.webtatic.com/yum/el6/latest.rpm
			# CentOs 7.X
			rpm -Uvh https://mirror.webtatic.com/yum/el7/epel-release.rpm
			rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm
			如果想删除上面安装的包，重新安装
			rpm -qa | grep webstatic
			rpm -e  [上面搜索到的包即可]
		3. 执行安装
			yum -y install php56w.x86_64
			yum -y --enablerepo=webtatic install php56w-devel
			yum -y install php56w-xml.x86_64 php56w-gd.x86_64 php56w-ldap.x86_64 php56w-mbstring.x86_64 php56w-mcrypt.x86_64 php56w-mysql.x86_64 php56w-pdo.x86_64 php56w-opcache.x86_64
		4. 安装PHP FPM
			yum -y install php56w-fpm
			#设置php-fpm开机启动
			chkconfig php-fpm on
			#启动php-fpm
			/etc/init.d/php-fpm start
		注：如果想更换到php5.5或5.4版本, 直接把上面的56w换成55w或者54w就可以了

4. 安装 MySQL

		安装
		yum install -y mysql mysql-server
		#启动MySQL
		/etc/init.d/mysqld start
		#设为开机启动
		chkconfig mysqld on
		#拷贝配置文件（注意：如果/etc目录下面默认有一个my.cnf，直接覆盖即可）
		cp /usr/share/mysql/my-medium.cnf /etc/my.cnf

		设置密码
		mysql_secure_installation
		# 回车，根据提示输入Y，输入2次密码，回车，根据提示一路输入Y，最后出现：Thanks for using MySQL!
		#  MySql密码设置完成，重新启动 MySQL：
		#重启
		/etc/init.d/mysqld restart
		#停止
		/etc/init.d/mysqld stop
		#启动
		/etc/init.d/mysqld start

5. 配置nginx


		rm -rf /etc/nginx/conf.d/*
		vi /etc/nginx/conf.d/default.conf

		添加如下内容 :
		
		server{
		    listen      80;
		    server_name _;
		    index index.php index.html index.htm;
		    root  /var/www;
		
		    location ~ .*\.(php|php5)?$
		    {
		            #fastcgi_pass  unix:/tmp/php-cgi.sock;
		            fastcgi_pass  127.0.0.1:9000;
		            fastcgi_index index.php;
		            include fastcgi.conf;
		    }
		
		    location / {
		        try_files $uri $uri/ /index.php?$query_string;
		    }
		}

		说明: /var/www 为web根目录, location / ... 为url的rewrite,隐藏 index.php

6.  配置php-fpm

		vi /etc/php-fpm.d/www.conf
		将用户和用户组设置为nginx, 默认为 Apache, 如:
		#修改用户为nginx
		user = nginx
		 #修改组为nginx
		group = nginx

7. 说明

		启动命令:
		# nginx 重启 | 启动 | 停止
		service nginx restart | start | stop 
		# php-fpm 重启 | 启动 | 停止
		service php-fpm restart | start | stop 
		# mysql 重启 | 启动 | 停止
		service mysqld restart | start | stop

		一些文件的目录:
		# nginx.conf
		/etc/nginx/nginx.conf
		# php.ini
		/etc/php.ini
		# my.cnf
		/etc/my.cnf
		# 项目根目录
		/var/www

		#设置权限
		chown nginx.nginx /var/www -R
		#重启nginx
		service nginx restart
		#重启php-fpm
		service php-fpm restart