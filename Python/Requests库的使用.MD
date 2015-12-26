1. 安装方法.如果电脑同时装了python2和python3,使用pip安装的就只能安装到pip对应的版本. 可以直接下载源码安装.

		git clone git://github.com/kennethreitz/requests.git
		$ python3 setup.py install     #Python3版本安装requests

2. 可以使用params作为关键字,给URL传递参数.如:

		data = {'ID' : 17, 'name' : 'mio'}
		r = requests.get('http://www.baidu.com/get', params=data) 
		#come/后面的get是必须的..返回一个Response对象