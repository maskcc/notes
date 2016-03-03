#Django的安装
1. 安装方式参考[官网](https://www.djangoproject.com/download/)来安装最新版本
2. 一般使用pip来安装,此时(2016.1.5)的Django版本为 `1.9.1`

		pip install Django==1.9.1
3. 发行版的Ubuntu可能会在安装`pip`时报错:

		Reading package lists... Done
		Building dependency tree       
		Reading state information... Done
		E: Unable to locate package python-pip

	是由于当前系统的源默认选择连接不上.可以将源换成国内的.163或者搜狐的,在`/etc/apt/sources.list`文件后面添加如下源,再执行`sudo apt-get update`即可.

		deb http://mirrors.163.com/ubuntu/ lucid main restricted universe multiverse
		deb http://mirrors.163.com/ubuntu/ lucid-security main restricted universe multiverse
		deb http://mirrors.163.com/ubuntu/ lucid-updates main restricted universe multiverse
		deb http://mirrors.163.com/ubuntu/ lucid-proposed main restricted universe multiverse
		deb http://mirrors.163.com/ubuntu/ lucid-backports main restricted universe multiverse
		deb-src http://mirrors.163.com/ubuntu/ lucid main restricted universe multiverse
		deb-src http://mirrors.163.com/ubuntu/ lucid-security main restricted universe multiverse
		deb-src http://mirrors.163.com/ubuntu/ lucid-updates main restricted universe multiverse
		deb-src http://mirrors.163.com/ubuntu/ lucid-proposed main restricted universe multiverse
		deb-src http://mirrors.163.com/ubuntu/ lucid-backports main restricted universe multiverse 

		#或者搜狐的源, 二者选一即可
		deb http://mirrors.sohu.com/ubuntu/ lucid main restricted universe multiverse
		deb http://mirrors.sohu.com/ubuntu/ lucid-security main restricted universe multiverse
		deb http://mirrors.sohu.com/ubuntu/ lucid-updates main restricted universe multiverse
		deb http://mirrors.sohu.com/ubuntu/ lucid-proposed main restricted universe multiverse
		deb http://mirrors.sohu.com/ubuntu/ lucid-backports main restricted universe multiverse
		deb-src http://mirrors.sohu.com/ubuntu/ lucid main restricted universe multiverse
		deb-src http://mirrors.sohu.com/ubuntu/ lucid-security main restricted universe multiverse
		deb-src http://mirrors.sohu.com/ubuntu/ lucid-updates main restricted universe multiverse
		deb-src http://mirrors.sohu.com/ubuntu/ lucid-proposed main restricted universe multiverse
		deb-src http://mirrors.sohu.com/ubuntu/ lucid-backports main restricted universe multiverse 

4. Python3安装pip时,可以去[官网](https://pip.pypa.io/en/stable/installing/),下载页面上 `get-pip.py`来安装最新版本.要使`Python3`能够使用pip,应该使用如下命令:

		python3 get-pip.py

5. 要使用django的templates,必须先要设定`/appname/settings.py`的`TEMPLATES`属性下的`DIRS`数组中添加`templates`目录:`'DIRS': ['/home/cmio/web/page/templates']`

#Django基本命令
1. 新建一个工程

		django-admin.py startproject name
		
2. 新建app

		python3 manage.py startapp name
		django-damin startapp name

3. 同步数据库

		python3 manage.py syncdb

4. 使用开发服务器

		python3 manage.py runserver 0.0.0.0:8000
		
5. 清空数据库

		python3 manage.py flush
		
6. 创建超级管理员

		python3 manage.py createsuperuser
		python3 manage.py changepassword username
		
7. 导入导出数据库

		python3 manage.py dumpdata appname > appname.json
		python3 manage.py loaddata appname.json
		
8. 查询更多命令

		python3 manage.py
		
#视图与网址
1. 新建项目和应用如learn.将新定义的app添加到`settings.py`中的`INSTALL_APPS`
2. 定义视图函数,打开`views.py`

		#coding:utf-8
		from django.http import HttpResponse
		def index(request):
			return HttpResponse(u"Welcome to China")
			
	定义视图函数相关的url.
			
		from django.conf.urls import url
		from django.conrib import admin
		from lean import views as learn_views
		
		urlpatterns = [
			url(r'^$', learn_views.index),
			url(r'^admin/', admin.site.urls),
		]