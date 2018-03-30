参考
[cookbook](https://theboostcpplibraries.com/)
[API](http://www.boost.org/doc/libs/1_55_0/doc/html/boost_asio/reference.html)
[Examples](http://www.boost.org/doc/libs/1_63_0/doc/html/boost_asio/examples.html)
1. io_service

		io_service ioservice1; 
		steady_timer timer1{ ioservice1, std::chrono::seconds{3}};
		timer1.async_wait([](const boost::system::error_code &ec){}
		std::thread th1{ [&ioservice1](){  ioservice1.run(); std::cout << "th1 end " << std::endl;}};
		th1.join();
		
2. boost::asio::ip::tcp::socket
	async_connect(endpoint, handler);
	void handler(const boost::system::error_code& error); // Result of operation
	
	async_read_some(buffer(data, size), handler);// 异步读取数据到 buffer, 是非阻塞的,可能读不到那么长的数据
	async_read(); //是同步读取数据， 不到长度会一直阻塞
	boost::asio::mutable_buffer b1 = ...;
	std::size_t s1 = boost::asio::buffer_size(b1);//获取buffer size_t
	unsigned char *p1 = boost::asio::buffer_cast<unsigned char*>(b1);
	remote_endpoint(); //获取远端的socket 接口
	shutdown();
	set_option 设置配置

3. boost::asio::ip::tcp::acceptor
	属性有 keep_alive, linger, receive_buffer_size, receive_low_watermark,reuse_address,
			send_buffer_size, send_low_watermark
	//接受网络连接
	属性设置方法
	boost::asio::ip::tcp::socket sock(io_service);
	//设置值
	boost::asio::socket_base::keep_alive option(true);	
	sock.set_option(option);
	//读取值
	sock.get_option(option);	
	bool is_set = option.value();
	
	shutdown_type 关闭socket 类型, 有shutdown_receive, shutdown_send, shutdown_both
	void bind(const endpoint_type & endpoint);
	void listen(int backlog = socket_base::max_connections);//开始监听
	void non_blocking(); //设置为非阻塞


4. boost::asio::ip::tcp::endpoint
		//代表一条TCP 连接
		boost::asio::ip::address address() tcp的ip
		port()端口号
		protocol 类型
		<< 输出一个endpoint 为一个字符串
		构造一个 endpoint
		boost::asio::ip::tcp::endpoint endpoint(boost::asio::ip::address::from_string("1.2.3.4"), 12345);
5. boost::asio::ip::tcp::resolver
		async_resolve, cancel, get_io_service
	
6. boost::asio::ip::tcp::resolver::query, 域名服务


7. boost::asio::ip::tcp::acceptor

8. boost::asio::spawn()
9. boost::asio::buffer(data, size);
	buffer_size(buffer);//获取buffer 的size
	mutable_buffer(char *, size_t sz);
	
10. boost::asio::streambuf
	boost::asio::streambuf b;
	std::ostream os(&b);
	os << "Hello jobs\n";
	size_t n = sock.send(b.data());
	b.consume(n);//发送的数据从序列中删除
	
	boost::asio::streambuf b;
	boost::asio:streambuf::mutable_buffers_type bufs = b.prepare(512);
	size_t n = sock.receive(bufs);
	
	b.commit(n);
	std::istream is(&b);
	std::string s;
	is >> s;

11. struct C : std::enable_shared_from_this<C> { };foo->shared_from_this();
12. boost::asio::io_service::work  //守护异步操作不退出
13. io_service::strand  //保证handler 按照顺序执行在多线程中
	