1. TCP 有接收缓冲区和发送缓冲区的, 观测方法， 当一个服务器监听一个端口后， 客户端连接服务器经三次握手建立连接， 此时服务器不将此连接 accept， 客户端仍然可以向服务器发送消息， 因为此时连接已经建立， 进入 establish 状态，客户端发送数据给服务器， 此时用 ss -anopt | grep port 观察  状态，客户端发送数据给服务器，

    
		State       Recv-Q Send-Q    Local Address:Port          Address:Port
	    LISTEN     1      0              *:10011                    *:*         
	    ESTAB      666736 0      127.0.0.1:10011              127.0.0.1:44562              
	    ESTAB      0      189520 127.0.0.1:44562              127.0.0.1:10011 
	    
    可以看到 Recv-Q 有没有接收的数据， 当缓冲区满了时， 发送端的 Send-Q 会记录待发送的数据.相关函数与配置 SO_RCVBUF, SO_SNDBUF
    
	    #include <sys/types.h>          /* See NOTES */
	    #include <sys/socket.h>
	
	    int getsockopt(int sockfd, int level, int optname,
	                   void *optval, socklen_t *optlen);
	    int setsockopt(int sockfd, int level, int optname,
	                      const void *optval, socklen_t optlen);

2. 异常种终止一个连接. `SO_LINGER`
3. 当TCP的等待连接队列(backlog)已经满了, 当收到新的SYN 时， TCP将不做处理， 也不会发回 RST， 客户端的主动连接会超时.
4. 通常TCP 在接收到数据时并不立即发送ACK， 它会推迟发送， 以便将ACK 与需要沿该方向发送的数据一起发送， 大多数实现将延迟设置为200ms, 这个现象是 经受延时的确认， 或者是 数据捎带ACK. [选项理解](http://blog.163.com/xychenbaihu@yeah/blog/static/132229655201231214038740/)

		相关选项 TCP_QUICKACK, TCP_QUICKACK不是永久的，所以在每次recv数据后，应该重新设置。

5. Nagle 算法要求一个TCP 连接上最多只能有一个未被确认的未完成的小分组.在该分组的确认到达之前不能发送其他的小分组.TCP 收集这些少量的分组， 并在确认到来时以一个分组的方式发送出去.它是自适应的， 当确认到达的越快， 数据发送得越快. 使用TCP_NODELAY 选项来关闭 Nagle 算法.
6. 拥塞控制与慢启动.[参考](http://www.cnblogs.com/NerdWill/p/5020885.html)
    - 慢启动， TCP为发送方增加了一个拥塞窗口(cwnd)，初始化时 只运输传输一个报文， 当收倒确认后才可以再发2个报文段.
    - 拥塞避免算法是一种处理丢失分组的方法.拥塞表示发生超时和收到重复的确认.需要一个慢启动门限(ssthresh)， 初始化为 65535 个字节
    - 当拥塞发生时，  ssthresh 被设置为当前窗口(cwnd)的一半和接收方通告窗口大小的最小值(最少2个报文段).但是当超时引起拥塞， 
    cwnd 被设置为 1个报文段(慢启动)
   - 当新的数据被对方确认时， 就增加 cwnd, 但增加的方法有两种
	   1. cwnd 小于或等于 ssthresh, 则正在进行慢启动(指数式增加发送报文段)
	   2. cwnd 大于或等于 ssthresh, 则正在进行拥塞避免, (每收到一个确认时将 cwnd 增加  1/cwnd)
	  
7. 快速重传算法与快速恢复算法.