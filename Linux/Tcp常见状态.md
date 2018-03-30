FIN-WAIT-2 等待对面发送close
CLOSE-WAIT 等待自己发送close
这是一种常出现的状态， 当服务器主动关闭后， 客户端没有关闭， 就会进入这种状态

linger //设置了， linger 超时后, 当发送去还有数据待发送时， 会直接发送 RST 来关闭连接， 清空缓冲区. linux 上没有这么做 

抓包
sudo tcpdump -i lo tcp port 11011 > log

用智能指针要注意内存泄漏!!
在构造函数中 调用 shared_from_this 会有问题, 会报bad_weak_ptr 错误
使用 std::move 时在作用域内变量会失效
一些不是强依赖指针的东西可以用弱指针 weak_ptr 来解决问题
