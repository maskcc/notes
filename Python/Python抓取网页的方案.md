1、最简单

	import urllib.request
	response = urllib.request.urlopen('http://python.org/')
	html = response.read()

2、使用 Request

	import urllib.request
	req = urllib.request.Request('http://python.org/')
	response = urllib.request.urlopen(req)
	the_page = response.read()
 
3、发送数据

	#! /usr/bin/env python3

	import urllib.parse
	import urllib.request
	
	url = 'http://localhost/login.php'
	user_agent = 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)'
	values = {
		'act' : 'login',
		'login[email]' : 'yzhang@i9i8.com',
		'login[password]' : '123456'
	}

	data = urllib.parse.urlencode(values)
	req = urllib.request.Request(url, data)
	req.add_header('Referer', 'http://www.python.org/')
	response = urllib.request.urlopen(req)
	the_page = response.read()

	print(the_page.decode("utf8"))


 
4、发送数据和header

	#! /usr/bin/env python3

	import urllib.parse
	import urllib.request

	url = 'http://localhost/login.php'
	user_agent = 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)'
	values = {
		'act' : 'login',
		'login[email]' : 'yzhang@i9i8.com',
		'login[password]' : '123456'
	}
	headers = { 'User-Agent' : user_agent }

	data = urllib.parse.urlencode(values)
	req = urllib.request.Request(url, data, headers)
	response = urllib.request.urlopen(req)
	the_page = response.read()

	print(the_page.decode("utf8"))


 
5、http 错误

	#! /usr/bin/env python3

	import urllib.request

	req = urllib.request.Request('http://www.python.org/fish.html')
	try:
		urllib.request.urlopen(req)
	except urllib.error.HTTPError as e:
		print(e.code)
	print(e.read().decode("utf8"))

 
6、异常处理1

	#! /usr/bin/env python3
	
	from urllib.request import Request, urlopen
	from urllib.error import URLError, HTTPError
	req = Request("http://twitter.com/")
	try:
		response = urlopen(req)
	except HTTPError as e:
		print('The server couldn\'t fulfill the request.')
		print('Error code: ', e.code)
	except URLError as e:
		print('We failed to reach a server.')
		print('Reason: ', e.reason)
	else:
		print("good!")
		print(response.read().decode("utf8"))


 
7、异常处理2

		#! /usr/bin/env python3
	
		from urllib.request import Request, urlopen
	from urllib.error import URLError
	req = Request("http://twitter.com/")
	try:
		response = urlopen(req)
	except URLError as e:
		if hasattr(e, 'reason'):
			print('We failed to reach a server.')
			print('Reason: ', e.reason)
		elif hasattr(e, 'code'):
			print('The server couldn\'t fulfill the request.')
			print('Error code: ', e.code)
		else:
			print("good!")
			print(response.read().decode("utf8"))


 
8、HTTP 认证
	
	#! /usr/bin/env python3
	
	import urllib.request
	
	# create a password manager
	password_mgr = urllib.request.HTTPPasswordMgrWithDefaultRealm()
	
	# Add the username and password.
	# If we knew the realm, we could use it instead of None.
	top_level_url = "https://cms.tetx.com/"
	password_mgr.add_password(None, top_level_url, 'yzhang', 'cccddd')
	
	handler = urllib.request.HTTPBasicAuthHandler(password_mgr)
	
	# create "opener" (OpenerDirector instance)
	opener = urllib.request.build_opener(handler)
	
	# use the opener to fetch a URL
	a_url = "https://cms.tetx.com/"
	x = opener.open(a_url)
	print(x.read())
	
	# Install the opener.
	# Now all calls to urllib.request.urlopen use our opener.
	urllib.request.install_opener(opener)
	
	a = urllib.request.urlopen(a_url).read().decode('utf8')
	print(a)


 
9、使用代理
	
	#! /usr/bin/env python3
	
	import urllib.request
	
	proxy_support = urllib.request.ProxyHandler({'sock5': 'localhost:1080'})
	opener = urllib.request.build_opener(proxy_support)
	urllib.request.install_opener(opener)
	
	
	a = urllib.request.urlopen("http://g.cn").read().decode("utf8")
	print(a)


 
10、超时
	
	#! /usr/bin/env python3
	
	import socket
	import urllib.request
	
	# timeout in seconds
	timeout = 2
	socket.setdefaulttimeout(timeout)
	
	# this call to urllib.request.urlopen now uses the default timeout
	# we have set in the socket module
	req = urllib.request.Request('http://twitter.com/')
	a = urllib.request.urlopen(req).read()
	print(a)


 
 
__@see [PythonDocs](http://docs.python.org/release/3.2/howto/urllib2.html)__