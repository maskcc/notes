The Boost C++ Libraries https://theboostcpplibraries.com/
Reference http://www.boost.org/doc/libs/1_55_0/doc/html/boost_asio/reference.html
streambuf http://www.boost.org/doc/libs/1_55_0/doc/html/boost_asio/reference/streambuf.html
strand http://www.boost.org/doc/libs/1_55_0/doc/html/boost_asio/reference/io_service__strand.html
examples http://www.boost.org/doc/libs/1_63_0/doc/html/boost_asio/examples.html


ioservice https://stackoverflow.com/questions/16397540/when-do-i-have-to-use-boostasiostrand, https://blog.csdn.net/huang_xw/article/details/8469851,http://www.cnblogs.com/TianFang/archive/2013/02/02/2890366.html
asio http://senlinzhan.github.io/2017/09/17/boost-asio/
google 开源风格 http://zh-google-styleguide.readthedocs.io/en/latest/google-cpp-styleguide/headers/
gflags https://github.com/gflags/gflags
单元测试  https://www.ibm.com/developerworks/cn/java/j-lo-testpartten/

https://blog.csdn.net/orzlzro/article/details/6460058
boost 如何关闭一个连接 

	io_service.stop();
	acceptor.close();
	if(localSocket.is_open())
	{
		localSocket.shutdown(
	boost::asio::ip::tcp::socket::shutdown_both, ignored_ec);
		localSocket.close(ignored_ec);
	}
	if(remoteSocket.is_open())
	{
		remoteSocket.shutdown(
	boost::asio::ip::tcp::socket::shutdown_both, ignored_ec);
		remoteSocket.close(ignored_ec);
	}

作者：知乎用户
链接：https://www.zhihu.com/question/57337281/answer/153009313
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

rapidjson http://rapidjson.org/zh-cn/

https://blog.csdn.net/tgxallen/article/details/73522233  C++11 std::unique_lock与std::lock_guard区别及多线程应用实例
https://stackoverflow.com/questions/10858719/cancel-async-read-due-to-timeout
https://blog.csdn.net/yamingwu/article/details/48006423
http://www.cnblogs.com/haippy/p/3236136.html

boost::asio::streambuf转std::string
#include <iostream>
#include <boost/asio.hpp>
int main()
{
    std::string url = "http://hq.sinajs.cn/list=sh204001";
    //
    boost::asio::streambuf request;
    std::ostream request_stream(&request);
    request_stream << "GET " << "/list=sh204001" << " HTTP/1.0\r\n";
    request_stream << "Host: " << "hq.sinajs.cn" << "\r\n";
    request_stream << "Accept: */*\r\n";
    request_stream << "Connection: close\r\n\r\n";
    //
    int request_size = request.size();
    //将boost::asio::streambuf转为std::string
    boost::asio::streambuf::const_buffers_type cbt = request.data();
    std::string request_data(boost::asio::buffers_begin(cbt), boost::asio::buffers_end(cbt));
    //
    std::cout << request_data << std::endl;
    return 0;
}
boos asio 系列
http://www.cnblogs.com/TianFang/archive/2013/02/03/2890983.html

folly
https://github.com/facebook/folly
shell
https://www.v2ex.com/t/443458#reply9
accept4
https://stackoverflow.com/questions/23952794/what-the-difference-between-accept4-and-accept
https://stackoverflow.com/questions/480764/linux-error-while-loading-shared-libraries-cannot-open-shared-object-file-no-s

git submodule
https://git-scm.com/docs/git-submodule

Where Does GCC Look to Find its Header Files?
http://commandlinefanatic.com/cgi-bin/showarticle.cgi?article=art026
理清gcc、libc、libstdc++的关系
https://blog.csdn.net/haibosdu/article/details/77094833
gcc faq
https://gcc.gnu.org/faq.html#multiple

gun complie warnings
https://gcc.gnu.org/onlinedocs/gcc/Warning-Options.html

gcc flag
http://blog.httrack.com/blog/2014/03/09/what-are-your-gcc-flags/

ld research
https://www.ibm.com/support/knowledgecenter/search/%22the%20ld%20command%2C%20also%20called%20the%20linkage%20editor%20or%20binder%22

install gcc
https://gcc.gnu.org/install/prerequisites.html


gcc search path
https://gcc.gnu.org/onlinedocs/cpp/Search-Path.html


ld 讲解
https://linux.die.net/man/8/ld.so

dlopen
https://linux.die.net/man/3/dlopen