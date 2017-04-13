## Socket 接口
1. Socket 类的构造函数, 可能应发 SocketException, 使用 SocketException.ErrorCode 属性来获取特定的错误代码

        public Socket( AddressFamily family,
                        SocketType   stype, 
                        ProtocolType ptype)
                        
        family 为 System.Net.Sockets.AddressFamily的:
            InterNetwork IP 版本 4 地址。
            InterNetworkV6 IPv6 版本  
        stype 为 System.Net.Sockets.SocketType 的:
            Dgram         ---- UDP
            Raw           ---- ICMP, IGMP
            Rdm           ---- 无连接, 面向消息的, 可靠地发送消息, 并保留在数据中的消息边界.
            Seqpacket     ---- 排序的需要连接的全双工通信, 保留数据流中的边界
            Stream       ----- TCP 不保留边界, 基于连接的字节流.
            Unknown
            
        ptype 为 Ggp网关到网关协议, Icmp, IcmpV6, Idp, Igmp, IP, IPv4, Tcp, Udp;
            
        Socket s = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
        
2. IPAddress 类. 指定一个地址和端口.

        //构造函数
        IPAdress(Byte[])
        IPAddress(Int64);
        
        //字段
        Any 提供一个服务器必须真挺所有网络接口上的客户端活动的IP地址.
        IPANY
        Loopback 会还地址
        
        //方法
        public override String ToString(); 将 Internet地址转换为其标准表示法, 包含一个字符串, 以点分十进制表示IP地址
        public static bool TryParse(String, out IPAddress);//将字符串转换成 IPAddress
        
        
        

     
3. EndPoint 类, 标志网络地址类, 是一个抽象类.IPEndPoint 继承自 EndPoint, 构造函数如下:
        
        //指定地址和端口号, 表示一条连接
        IPEndPoint(IPAddress addr, Int32 port); //port 关联的端口后, 0指定任何可用端口号, port 时主机字节序就行        
        //属性
        Address 获取或设置终点的IP地址
        Port 端口号
        //字段
        MaxPoint //最大端口号, 0x0000FFFF
        MinPort  //最小Port属性
        范例:
        Socket socket = null;
        try{
            socket = new Socket( System.Net.Sockets.AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
            socket.Connect();
        }
        void test_socket_address(string server, int port){
            Socket tmp_socket = null;
            IPHostEntry host = null;
            SocketAddress serialized_socket_addr = null;
            try{
                host = Dns.Resolve(server);
                foreach( IPAddress addr in host.AddressList ){
                    IPEndPoint endpoint = new IPEndPoint(address, port);
                    tmp_socket = new Socket(endpoint.AddressFamily, SocketType.Stream, ProtocolType.Tcp);
                    tmp_socket.Connect(endpoint);
                    
                    serialized_socket_addr = endpoint.Serialize();
                    IPEndPoint tmp_endpoint = new IPEndPoint(0,0);
                    //复制连接信息, 用来创建新连接
                    IPEndPoint clonedIPEndPoint = (IPEndPoint) tmp_endpoint.Create(serialized_socket_addr);
                    
                    Socket socket = new Socket(endpoint.AddressFamily, SocketType.Stream, ProtocolType.Tcp);
                    socket.Connect(clonedIPEndPoint);
                    return;
                }
            }
        }
        
        
4. Socket.Bind

        public void Bind( EndPoint localEP);
        localEP 可以为IPAddress.Any
     
5. 使用Listen 监听

        public void Socket.Listen(Int32 backlog);//backlog 等待连接队列的最大长度
        范例:
        Socket listen_socket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
        IPAddress hostIP = (Dns.Resolve(IPAddress.Any.ToString())).AddresList[0];
        IPEndPoint ep = new IPEndPoint( hostIP, port);
        listen_socket.Listen(256);
        
6. 异步从Socket 接收消息

        //buffer 缓冲区, offset 接收数据的起始偏移量, size 要接收的字节数, callback 一个 AsyncCallback 委托, 操作完成时回调的方法
        public IAsyncResult BeginReceive( byte[] buffer, int offset, int size, SocketFlags socketFlags, AsyncCallback callback, object state);
        
7. 异步发送
    
        public IAsyncResult BeginReceive( byte[] buffer, int offset, int size, SocketFlags socketFlags, AsyncCallback callback, object state );
        
8. 接收一个新连接, Socket.Accept()
    
        //返回一个新创建的Socket 连接
        public Socket Accept();
      
9. 关闭一个连接

        //一般先调用shutdown再关闭连接
        M:System.Net.Sockets.Socket.Shutdown(System.Net.Sockets.SocketShutdown (Both, Receive, Send));
        Socket.Close();
        Socket.Close(int timeout); // 等待timeout秒来发送剩下的数据, 然后关闭套接字.