1. //EINTR 在写的时候出现中断 (例如 Ctrl + C 捕获到)
           // If a signal handler is invoked while a system call or library  function call is blocked, then either:
           // 重新开始就行
            if(EINTR == errno)
            {
                __log(_WARN, __FILE__, __LINE__, __FUNCTION__, "EINTR");
                continue;
            }
            
2.  //EPOOL_EV *ev = (EPOOL_EV*)malloc(sizeof(EPOOL_EV)) ;
                        //貌似这里不需要malloc
                        ///EPOLL_EV tev = {0};
                        ///EPOLL_EV *ev = &tev;
    if(0 != sp_add(m_epollFD, client->getFD(), (void*)client))
    {}
    
3. epoll 的最后一个timeout的使用(用来作为定时器, 跑在主线程里???)
4. int epoll_create(int size)  //返回一个指向实例的文件描述符
5. epoll_ctl(int efd, int op, int fd, struct epoll_event *event) 添加特殊的文件描述符, efd 是
epoll_create生成的文件描述符
    EPOLL_CTL_ADD // 添加
    EPOLL_CTL_MOD //修改
    EPOLL_CTL_DEL //删除
    
    typedef union epoll_data {
        void     *ptr;
        int      fd;
        uint32_t u32;
        uint64_t u64;
    } epoll_data_t;
    struct epoll_event{
        uint32_t     events; //Epoll events
        epoll_data_t data;   // User data variable
    }
    
    epoll_event 的 events 是一个字节掩码, 使用:
    EPOLLIN     //有文件可以 read
    EPOLLOUT    //有文件可以 write
    EPOLLRDHUP  //对面关闭连接或者shut down 写半段连接(ET m)
    EPOLLPRI    //有紧急的数据要read
    EPOLLERR    //有错误发生, epol_wait总会返回, 不需要设置
    EPOLLHUP
    EPOLLET
    EPOLLONESHOT
    EPOLLWAKEUP
    EPOLLEXCLUSIVE
6. epoll_wait(int epfd, struct epoll_event *events, int maxevents, int timeout) 等待I/O 事件.
 当没有事件时会阻塞调用线程
 epoll_wait 等待epoll_create 产生的文件描述符 epfd,  events 参数会被填充包含事件.最多
 返回max_events(必须大于0)个事件. 
 timeout 参数的单位是微妙, 1000分之1 秒. 传入-1 会一直阻塞直到有读或写或中断产生.
 传入0, 将不会阻塞, 马上返回.
    返回值:
        成功时返回 等待I/O事件的文件描述符数量, 0 表示timeout发生后没有事件, -1表示错误.
        
        当一个线程阻塞在调用 epoll_wait()时, 可以使用另外一个线程将文件描述符
        使用添加到当前epoll实例, 当刚添加的文件描述符可读, epoll_wait 会返回.
        当另一个线程将文件描述符close时, 会发生什么, 参考select.
        不同系统实现不一样, 可能会出现问题, 一般把这种情况当做bug处理.
         While one thread is blocked in a call to epoll_pwait(), it is
       possible for another thread to add a file descriptor to the waited-
       upon epoll instance.  If the new file descriptor becomes ready, it
       will cause the epoll_wait() call to unblock.

       For a discussion of what may happen if a file descriptor in an epoll
       instance being monitored by epoll_wait() is closed in another thread,
       see select(2).
    