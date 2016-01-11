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