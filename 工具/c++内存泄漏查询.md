1. [AddressSanitizer](https://github.com/google/sanitizers/wiki/AddressSanitizer) 分析内存错误, 性能大概下降到 1/2, gcc 4.8  以上版本
2. Valgrind, 性能大概下降到 1/20

 思路:
作者：杨志丰
链接：https://www.zhihu.com/question/51735480/answer/291378665
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

小结一下，遇到棘手的内存越界问题，可以使用下面顺序逐个尝试（越往后成本越高):

-  code review分析代码。  
- valgrind 用起来最简单，几乎是傻瓜式的。能用尽量用。（但是慢，不一定能复现并发环境下的问题）  
- glibc 的MALLOC_CHECK_使用起来很简单，不需要重新编译代码。可以用来发现问题，但是其本身无法定位问题。和magic number 结合起来，可以用来定位一类内存越界的问题。（ 类似@省身 回答中的方法，省身的方法记录了分配历史，更普适。但这类方法不一定适合极端的几个字节被篡改的“野指针”类问题）  
- 和electric-fence 齐名的还有一个内存调试库叫做dmalloc 。虽然在本次解决问题的过程中没有用到，这个库对于检测内存泄露等其他问题很有用。推荐大家学习一下，放到自己的工具库中。  
- electric-fence 是定位一类“野指针”访问问题的利器，强烈推荐使用。  
- 如果上述所有工具都帮不了你，那么只好在熟悉代码逻辑的基础上，使用终极武器了。（文中指修改代码使用mprotect, backtrace和libsigsegv）  
- code review。通过尝试代码库中不同版本编译出来的程序复现bug ，用二分法定位引入bug 的最早的一次代码提交。（如今git用户可以直接用git bisect，轻松简单）  