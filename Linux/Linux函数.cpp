/* sys/socket.h */
struct sockaddr_in servaddr;
int socket (int family, int type, int protocol);
int connect(int sockfd, const struct sockaddr *servaddr, socklen_t addrlen);
int bind   (int sockfd, const struct sockaddr *myaddr, socklen_t addrlen); //INADDR_ANY
int listen (int sockfd, int backlog);
int accept (int sockfd, struct sockaddr *cliaddr, socklen_t *addrlen);//出错返回-1
int close(int sockfd);//#include <unistd.h>
int getsockname(int sockfd, struct sockaddr *localaddr, socklen_t *addrlen);
int getpeername(int sockfd, struct sockaddr *peeraddr, socklen_t *addrlen);

family  :AF_INET AF_INET6 AF_LOCAL AF_ROUTE AF_KEY
type    :SOCK_STREAM SOCK_DGRAM SOCK_SEQPACKET SOCK_RAW
protocol:IPPROTO_TCP IPPROTO_UDP IPPROTO_SCTP

pid_t fork(void);    /* #include <unistd.h>*/



/*网际协议使用大端来传递数据*/
/*常用工具函数*/
/*使用errno 需要 include<errno.h>*/
/*p = presentation n = numeric 头文件<arpa/inet.h>*/
/*返回值:成功为1,输入不是有效表达式返回0,出错返回-1*/
int inet_pton(int family, const char * strptr, void *addrptr);
/*成功为结果的指针，出错为NULL*/
const char *inet_ntop(int family, const void *addrptr, char *strptr, size_t len);

/**/
int inet_aton(const char *string, struct in_addr*addr);

/*<netinet/in.h>*/
#define INET_ADDRSTRLEN 16
#define INET6_ADDRSTRLEN 46





/*常用数据结构定义*/
/*
   1.sockaddr_in    <netinet/in.h>  忘记套接字地址结构
*/
   struct sockaddr_in
   {
   	uint8_t        sin_len;
   	sa_family_t    sin_family;
    in_port_t      sin_port;     //network byte ordered
    struct in_addr sin_addr;      //network byte ordered 32-bits ipv4 address
    char           sin_zero[8];
};

struct in_addr
{
    in_addr_t     s_addr;       //network byte ordered 32-bits ipv4 address
};

/* <sys/socket.h>*/
struct sockaddr
{
	uint8_t       sa_len;
	sa_family_t   sa_family;
	char          sa_data[14];
};


#ifndef __UNP_H__
#define __UNP_H__

#include <sys/socket.h>
/*socket,listen,bind,accept,connect,shutdown*/
/*sockaddr*/

#include <errno.h>
/*errno, EINTR*/

#include <arpa/inet.h>
/*inet_pton,inet_ntop, inet_aton, inet_addr, inet_ntoa*/

#include <netinet/in.h>
/*htons, htonl, ntohs, ntohl*/
/*sockaddr_in, in_addr, */

#include <sys/types.h>

#include <unistd.h>
/*read, write, close, getpid, lseek*/

#include <string.h>
/*bzero, bcopy, bcmp, memset, memcpy, memcmp*/

#include <stdlib.h>
/*exit */

#include <fcntl.h>
/*open */


;
/***
	File Operations
	文件操作常用函数
	头文件: fcntl.h
***/
int open(const char *pathname, int oflag, .../*mode_t mode*/);
//出错返回-1,成功返回文件描述符+,oflag:O_RDONLY 只读打开, O_WRONLY 只写打开, O_RDWR 读.写打开
//可选flag:O_APPEND, O_CREAT, O_EXCL, O_TRUNC, O_NOCTTY, O_NONBLOCK

	int creat(const char *pathname, mode_t mode);
//出错返回-1, 成功返回只写方式打开的文件描述符.等价于 open(pathname, O_WRONLY | O_CREAT | O_TRUNC, mode);

	int close(int filedes);
//成功返回0, 失败返回-1.当一个进程终止时内核自动关闭它所有打开的文件

	off_t lseek(int filedes, off_t offset, int whence);

	sszie_t read(int filedes, void *buf, size_t nbytes);
//成功返回读到的字节数, 到文件结尾返回0, 出错返回 -1				
//1. 如果对端TCP发送数据,read会返回一个大于0的值
//2. 如果对端TCP发送一个FIN(对端进程终止),那么read返回0(EOF).
//3. 如果对端TCP发送一个RST(对端主机崩溃并重新启动), 那么read返回-1, 且errno中含有确切的错误代码

	ssize_t write(int filedes, const void *buf, size_t nbytes);
//返回值通常与参数nbytes的相同
//

	int shutdown(int sockfd, int howto);
//返回值 :成功返回0, 出错返回-1
//howto: SHUT_RD,关闭连接的读一半.套接字不再接收数据,现有缓冲区数据都丢弃掉.该套接字接收任何数据确认后丢掉
//       SHUT_WR,关闭连接的写一半.当前留在套接字缓冲区的数据将被发送掉.后接正常TCP终止序列.进程不能对这样的套接字调用任何写函数.
//       SHUT_RDWR,连接的读写都关闭,相当于调用了两次shutdown,第一次参数为 SHUT_RD,  第二次参数为 SHUT_WR



/****
*	进程控制函数
*	头文件: unistd.h
**/
pid_t getpid(void);
//返回值:调用进程的进程ID

pid_t getppid(void);
//返回值: 调用进程的父进程ID

uid_t getuid(void);
//返回值: 调用进程的实际用户ID

uid_t geteuid(void);
//返回值: 调用进程的有效用户ID

gid_t getgid(void);
//返回值: 调用进程的实际组ID

gid_t getegid(void);
//返回值: 调用进程的有效组ID

pid_t fork(void);
//返回值: 子进程中返回0, 父进程中返回子进程ID, 出错返回 -1.


/****
*   进程控制函数
*   头文件: sys/wait.h
**/
pid_t wait(int *statloc);
pid_t waitpid(pid_t pid, int *staloc, int options);
//两个函数返回值,弱成功返回进程ID, 0, 出错返回 -1.
//

//打印错误信息
printf("errno %d : %s\n",errno,strerror(errno));  


ERRORS
SIGPIPE //对已经关闭写半部的连接进行写操作,或产生SIGPIPE信号



/***
*  Socket pair , 产生一对 socket
*  头文件 #include <sys/socket.h>
*  成功返回值等于 0, 其他 -1
***/
int socketpair(int *domain, int type, int protocol, int socket_vector[2]);
#define _XOPEN_SOURCE_EXTENDED 1
int32_t fd[2];
int32_t ret = socketpair(AF_UNIX, SOCK_STREAM, 0, fd);

/***
*   select 
*   头文件  #include <sys/select.h>
*   #include <sys/time.h>
*   #include <sys/types.h>
*   #include <unistd.h>
*   成功返回表示已经准备好的 fd 数量, 其他 -1
* 注意
*   1. 每次 select 返回后都会修改其参数内容， 需要重新对参数赋值
*   2. nfds 为观察的最大 fd + 1	, 应该找到最大的  fd 并将其 +1 赋值给 nfds
*   3. fd 为 0 的参数是命令行输入fd
*   4. select 一般不要去用 timeout, 当没数据来时服务器阻塞在那就行.
*   5. 当 select 返回后， 要检查所有关注的 fd 是否 FD_ISSET
*   6. 经典例子 http://man7.org/linux/man-pages/man2/select_tut.2.html
***/
 struct timeval {
                      time_t tv_sec;    /* seconds */
                      long tv_usec;     /* microseconds */
                  };
int select(int nfds, fd_set *readfds, fd_set *writefds,
                  fd_set *exceptfds, struct timeval *utimeout);

void FD_CLR(int fd, fd_set *set);
int  FD_ISSET(int fd, fd_set *set);
void FD_SET(int fd, fd_set *set);
void FD_ZERO(fd_set *set);

// 例子
int32_t fd[128];
fd_set readset;
FD_ZERO(&readset);
FD_SET(fd[0], &readset);
FD_SET(fd[1], &readset);// 每个都要加入
select(fd[1]+1,&readset,nullptr, nullptr, 0);
FD_ISSET(fd_[1], &readset); // 判断是否是这个消息



/* --------------EPOLL
EPOLL事件有两种模型 Level Triggered (LT) 和 Edge Triggered (ET)：

LT(level triggered，水平触发模式)是缺省的工作方式，并且同时支持 block 和 non-block socket。
在这种做法中，内核告诉你一个文件描述符是否就绪了，然后你可以对这个就绪的fd进行IO操作。
如果你不作任何操作，内核还是会继续通知你的，所以，这种模式编程出错误可能性要小一点。

ET(edge-triggered，边缘触发模式)是高速工作方式，只支持no-block socket。
在这种模式下，当描述符从未就绪变为就绪时，内核通过epoll告诉你。
然后它会假设你知道文件描述符已经就绪，并且不会再为那个文件描述符发送更多的就绪通知，
等到下次有新的数据进来的时候才会再次出发就绪事件。

 */
//size 需要监听的数目, 可以查看/proc/进程id/fd, 使用完epoll后必须close()关闭防止fd被耗尽
int epoll_create(int size);

//epoll事件注册函数,第一个参数是epoll_create()的返回值,
//第二个参数是动作
//      EPOLL_CTL_ADD 注册新的fd到epfd中
//      EPOLL_CTL_MOD 修改已经注册的fd监听事件
//      EPOLL_CTL_DEL 从epfd中删除一个fd
//
typedef unio epoll_data
{
	void *ptr;
	int fd;
	__uint32_t u32;
	__uint64_t u64;
} epoll_data_t;

struct epoll_event{
  __uint32_t events; //Epoll事件
  epoll_data_t data; //用户数据
}
//
//events 为:
//EPOLLIN, EPOLLOUT, EPOLLPRI, EPOLLERR, EPOLLHUP, EPOLLET, EPOLLONESHOT(只监听一次)
int epoll_ctl(int epfd, int op, int fd, struct epoll_event *event);


//当对方关闭连接(FIN), EPOLLERR, 都可以认为是EPOLLIN事件,在read时返回0 和-1.

// events 用来从内核得到事件的集合 
// maxevents 告之内核这个events有多大，其值不能大于创建 epoll_create() 时的size
// timeout 是超时时间（毫秒，0会立即返回，-1将不确定，也有说法说是永久阻塞）
// 返回需要处理的事件数目，如返回0表示已超时
int epoll_wait(int epfd, struct epoll_event *events, int maxevents, int timeout);


/* 多线程接口 
* 头文件
* #include <pthread.h>
*/
//线程
pthread_mutex_t mymutex=PTHREAD_MUTEX_INITIALIZER;
//创建线程时, 第4个参数最好是在heap上的, 栈上的在程序进入后可能会被修改.要写个博客关于这个问题
int pthread_create(pthread_t *restrict tidp,
	const pthread_attr_t *restrict attr,
	void *(*start_rtn)(void*), void *restrict arg);
int pthread_exit(void *rval_ptr);
int pthread_join(pthread_t thread, void** rval_ptr);
int pthread_equal(pthread_t tidl1, pthread_t tid2);
pthread_t pthread_self(void);
int pthread_cancel(pthread_t tid); //等价于pthread_exit(PTHREAD_CANCELED); 不等待线程终止,仅提出请求
int pthread_detach(pthread_t tid);

//线程清理处理函数
void pthread_cleanup_push(void (*rtn)(void *), void *arg);
void pthread_cleanup_pop(int excute);

//互斥锁
int pthread_mutex_init(pthread_mutex_t *restrict mutex,
	const pthread_mutexattr_t *restrict attr);
int pthread_mutex_destroy(pthread_mutex_t *mutex);
int pthread_mutex_lock(pthread_mutex_t *mutex);
int pthread_mutex_trylock(pthread_mutex_t *mutex);
int pthread_mutex_unlock(pthread_mutex_t *mutex);
int pthread_mutex_timedlock(pthread_mutex_t *restrict mutex,
	const struct timespec *restrict tsptr);


/*设置recursive属性的互斥锁.这样既可以解决同一线程递归加锁的问题，又可以避免很多情况下死锁的发生。*/
pthread_mutexattr_init(&attr); 
    // 设置 recursive 属性
pthread_mutexattr_settype(&attr,PTHREAD_MUTEX_RECURSIVE_NP); 
pthread_mutex_init(theMutex,&attr);

//条件 
//pthread_cond_wait所做的第一件事就是同时对互斥对象解锁,并等待cond发生(即收到另一个线程的信号,它将苏醒),此时
//是一个阻塞操作,线程睡眠不会消耗CPU周期.当收到了broadcast信号后,会重新锁定mutex, 它会返回并且线程会继续执行.
int pthread_cond_init(pthread_cond_t *restrict cond,
	pthread_mutex_t *restrict mutex);
int pthread_cond_destroy(pthread_cond_t *cond);
int pthread_cond_signal(pthread_cond_t *cond);
int pthread_cond_broadcast(pthread_cond_t *cond);
int pthread_cond_wait(pthread_cond_t *restrict cond,
	pthread_mutex_t *restrict mutex);
int pthread_cond_timewait(pthread_cond_t *restrict cond,
	pthread_mutex_t *restrict mutex,
	const struct timespec *restrict tsptr);
//读写锁
//非常适合于对数据读的次数远大于写的情况.也叫共享互斥锁
//与互斥锁相比,读写锁在使用前必须初始化, 释放他们的底层内存前必须销毁
PTHREAD_RWLOCK_INITIALIZER
int pthread_rwlock_init(pthread_rwlock_t *restrict rwlock,
	const pthread_rwlockattr_t *restrict attr);
int pthread_rwlock_destroy(pthread_rwlock_t *rwlock);
int pthread_rwlock_rdlock(pthread_rwlock_t *rwlock);
int pthread_rwlock_wrlock(pthread_rwlock_t *rwlock);
int pthread_rwlock_unlock(pthread_rwlock_t *rwlock);
int pthread_rwlock_tryrdlock(pthread_rwlock_t *rwlock);
int pthread_rwlock_trywrlock(pthread_rwlock_t *rwlock);
int pthread_rwlock_timerdlock(pthread_rwlock_t *restrict rwlock,
	const struct timespec *restrict tsptr);
int pthread_rwlock_timewrlock(pthread_rwlock_t *restrict rwlock,
	const struct timespec *restrict tsptr);
//线程属性
int pthread_attr_init(pthread_attr_t *attr);
int pthread_attr_destrouy(pthread_attr_t *attr);
int pthread_attr_getdetachstate(const pthread_attr_t *restrict attr,
	int *detachstate);
int pthread_attr_setdetachstate(pthread_attr_t *attr, int *detachstate);
int pthread_attr_getstack(const pthread_attr_t *restrict attr,
	void **restrict stackaddr,
	size_t *restrict stacksize);
int pthread_attr_setstack(pthread_attr_t *attr,
	void *stackaddr, size_t stacksize);
int pthread_attr_getstacksize(const pthread_attr_t *restrict attr,
	size_t *restrict stacksize);
int pthread_attr_setstacksize(pthread_attr_t *attr, size_t stacksize/);




##示例函数
1.  服务器

		int svr()
		{    
			struct sockaddr_in server_addr;
			bzero(&server_addr,sizeof(server_addr)); 
			server_addr.sin_family = AF_INET;
			server_addr.sin_addr.s_addr = htons(INADDR_ANY);
			server_addr.sin_port = htons(10011);

			int server_socket = socket(AF_INET,SOCK_STREAM,0);
			int opt =1;
			setsockopt(server_socket,SOL_SOCKET,SO_REUSEADDR,&opt,sizeof(opt));

			bind(server_socket,(struct sockaddr*)&server_addr,sizeof(server_addr))
			listen(server_socket, 200) 
			    while (1) //服务器端要一直运行
			    {
			    	struct sockaddr_in client_addr;
			    	socklen_t length = sizeof(client_addr);

			    	int new_server_socket = accept(server_socket,(struct sockaddr*)&client_addr,&length);
			    	char buffer[BUFFER_SIZE] = {0};
			    	length = read(new_server_socket,buffer,BUFFER_SIZE);
			    	close(new_server_socket);
			    }
		    close(server_socket);
		    return 0;
		}

	2. 客户端

	void client(){
		int client_socket = socket(AF_INET,SOCK_STREAM,0);
		struct sockaddr_in server_addr;
		bzero(&server_addr,sizeof(server_addr));
		server_addr.sin_family = AF_INET;
		inet_aton("127.0.0.1",&server_addr.sin_addr) 
		server_addr.sin_port = htons(10011);
		socklen_t server_addr_length = sizeof(server_addr);
		connect(client_socket,(struct sockaddr*)&server_addr, server_addr_length) 
		close(client_socket);
	}


