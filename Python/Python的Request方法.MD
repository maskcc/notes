Python的urllib函数
---
1. `urllib.request.urlopen(url, data=None,[timeout,]*,    cafile=None, capath=None, cadefault=False, contest=None)`  
	- url可以是一个字符串或者是`Request`类型的对象.
	- data 是 application/x-www-form-urlencoded 格式的缓冲区.使用urllib.parse.urlencode()函数处理
	- urllib.request 使用HTTP/1.1协议并且报头包含`Conneciton: close`. 
	- timeout 超时选项.没填使用默认.
	- context 服务于ssl.SSLContext.具体参考HTTPSConnection.
	- cafile, capath 指定CA certificates.
	- cadefault 可忽略.
	- __函数的返回值__: 返回context manager(http.client.HTTPResponse类型).有3个方法可以调用,`geturl(url of resource)`, `info(meta-information)`, `getcode(http status code)`.
2. `urllib.request.install_opener(opener)` 生成一个默认的全局url_opner,参数 opener 是类型 OpenerDirector类型. 可以使用OpenerDirector.open()或者urlopen()
3. urllib.request.build_opener([handler, ...]) ?
4. urllib.request.pathname2url(path)
5. urllib.request.url2pathname(path)
6. `class urllib.request.Request(url, data=None, headers={}, origin_req_host=None, unverifiable=False, method=None)`
7. Request.add_header(key, val).添加报头.
8. class urllib.request.OpenerDirector
9. 一些基础的报头(Content-Length, Content-Type and Host)被传递给urlopen()函数.
10. 当发生错误时,`urlopen` 会抛出`URLError`异常
  

   		req = urllib.request.Request('http://www.pretend_server.org')  
		try: urllib.request.urlopen(req)  
		except urllib.error.URLError as e:  
		print(e.reason)    

11. urllib.response类
	- read()     读取所有内容
	- readline() 读取一行
	- info()     返回 `Response Headers`
	- geturl()   返回当前url
     
      