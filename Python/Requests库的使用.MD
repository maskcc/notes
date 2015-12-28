1. 安装方法.如果电脑同时装了python2和python3,使用pip安装的就只能安装到pip对应的版本. 可以直接下载源码安装.

		git clone git://github.com/kennethreitz/requests.git
		$ python3 setup.py install     #Python3版本安装requests

2. 可以使用params作为关键字,给URL传递参数.如:

		data = {'ID' : 17, 'name' : 'mio'}
		r = requests.get('http://www.baidu.com/get', params=data) 
		#come/后面的get是必须的..返回一个Response对象

3. 对返回的数据Response对象做处理

	* `r.text`	 #会自动解码来自服务器的内容(unicode)
	* `r.encoding = 'utf-8'`  #设置解码格式然后用r.text获取
		r.content #以字节的方式访问Response对象.
		
			from PIL import Image
			from StringIO import StringIO
			i = Image.open(StringIO(r.content))

	* `r.json()` #内置的JSON解码器, 几码失败会抛出`ValueError`
	* `r.raw.read()` #获取来自服务器的原始套接字响应.此设置需在初始请求中设置了`stream=True`

			r = requests.get('https://www.baidu.com', stream=True)
			r.raw.read()

			一般应将文本流保留到文件
			whith open(filename, 'wb') as fd:
				for chunk in r.iter_content(chunk_size):
					fd.write(chunk)

4. 订制请求头.需传递一个dict给`headers`参数

		import json
		url = 'https://www.baidu.com'
		payload = {'some': 'data'}
		headers = {'content-type' : 'application/json'}
		r = requests.post(url, data=json.dumps(payload), headers=headers)

		#Post请求
		payload = {'key1': 'value1', 'key2', 'value2'}
		r = requests.post("https://www.baidu.com", data=payload)
		print(r.text)

5. `r.status_code` 响应的状态码.`r.status_code == requests.code.ok`.当返回一个非200响应.可以通过`Response.raise_for_status()`抛出异常(`requests.exceptions.HTTPERROR`)
6. `r.headers` 以Python字典形式展示的服务器响应头. 访问响应头字段不区分大小写.[RFC2616](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html)
7. 获取响应中传递Cookie

		url = 'http://www.baidu.com'
		r = request.get(rul)
		r.cookies['cookie_name']
		
		#发送cookie
		cookies = dict(cookies_are='working')
		r = requests.get(url, cookies=cookies)
		r.text

8. 重定向,默认下,出了HEAD, Requests会自动处理所有重定向.可以使用histroy方法追踪重定向.`Response.history`是`class:Response<requests.Response>`对象的列表.按照从最老到最新的请求进行排序.使用HEAD可以使用`allow_redirects=True`启用重定向.其他设置为False禁用重定向.
9. 设定timeout参数秒数来设置超时

		requests.get('https://baidu.com', timeout=0.001)
		#抛出异常: requests.exceptions.Timeout
10. 常见错误异常:

		ConnectionError: 网络问题,DNS查询失败,拒绝连接等
		HTTPError: 无效HTTP响应
		Timeout: 请求超时
		TooManyRedirects: 超过设定醉倒重定向次数
		所有显式抛出的异常都继承自 `requests.exceptions.RequestsException`