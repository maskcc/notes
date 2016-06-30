/* sys/socket.h */
struct sockaddr_in servaddr;
int socket (int family, int type, int protocol);
int connect(int sockfd, const struct sockaddr *servaddr, socklen_t addrlen);
int bind   (int sockfd, const struct sockaddr *myaddr, socklen_t addrlen);
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
/*socket,listen,bind,accept,connect*/
/*sockaddr*/

#include <errno.h>
/*errno*/

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

ssize_t write(int filedes, const void *buf, size_t nbytes);
//返回值通常与参数nbytes的相同



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