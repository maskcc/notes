1. 该如何读源码

        谢邀。看到邀请已经很久了，一直没敢回答，主要是我自己没有读过多少模块的源码，因为我一直认为读源码是一种比较“低效”的学方法。
		我用 yolk -al 看了一下安装的模块，发现居然也没有几个算是“读过”的。web.py 的读过一点，它的接口很 pythonic，
		但这货的实现应该算不上是非常pythonic 的代码。
		如果一定要推荐一些 python 的源码去读，我的建议是标准库里关于网络的代码。
		从 SocketServer 开始，补上 socket 模块的知识，熟悉 TCP/UDP 编程，然后了解 Mixin 机制的最佳示例 SocketServer.

		{ForkingMixIn|ThreadingMixIn}，借这个机会了解 thread/threading 模块，这时会对并发量提出新的要求，就可以读 select 模块，
		开始对 select/{epoll|kqueue} 有深刻理解，搞懂以后就可以接触一下异步框架 asyncore 和 asynchat。
		这时开始出现分岔。如果是做 game 等以 TCP/UDP 协议为基础的应用，可以去读 greenlet 和 gevent，
		如果是做 web，则走下一条路。

		做 web，读 BaseHTTPServer、SimpleHTTPServer 和 CGIHTTPServer，读 cgi/cgitb，自己随意写框架，读cookielib，读 wsgiref，
		这时候自己写一个简便的 web framework 就 so easy 了，老板再也不担心你写 web 了，
		选择 flask/web.py/django/pyramid 都心中有数了。因为走的是 web 的路，所以难免要调用一下别人的 api，
		搞懂一下 httplib/urllib/urllib/urlparse。最后，上述提到的标准库，我大多读过。
			著作权归作者所有。
			商业转载请联系作者获得授权，非商业转载请注明出处。
			作者：赖勇浩
			链接：https://www.zhihu.com/question/20336475/answer/16093609
			来源：知乎

2. `.Learning Python, Python Cookbook, PEP-8`
3. [the-best-way-to-learn-python](http://code.tutsplus.com/tutorials/the-best-way-to-learn-python--net-26288)
4. 爬虫可以更新使用的技术

		urllib  -> requests
		re      -> BeautifulSoup
		框架    -> scrapy
		验证	    -> PIL, opencv, pybrain
		threading, celery 