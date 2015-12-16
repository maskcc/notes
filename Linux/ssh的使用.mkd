SSH的一些基本常识
--
1. `ssh`(Source Sheel)是一种加密的网络协议.SSH是基于客户-服务模式，需要安全的远程链接到主机时，可以使用SSH.
2. 第一次连接目标主机，SSH会让你确认目标主机的真实性，回答Yes继续。
3. 指定用户登录:

            $ ssh  -l root 192.168.1.177               //-l表示登录的用户名
            $ssh root@192.168.1.177   -p 1234 //也可以使用这种形式登录,-p表示端口号，默认22端口
  
4. 配置端口修改 `/etc/ssh/ssh_config`文件，找到行Port 22,换成需要的端口.
5. `-C`选项对所有通过SSH发送或接受的数据进行压缩不能关切仍然是加密的
6. 生成SSH密钥:

        $ ssh-keygen -t rsa -C "mio@163.com"   //后面都按回车，密码为空.

7. 生成的`id_rsa`(私钥),和`id_rsa.pub`公钥.一般存放在 `/home/mio(用户名)/.ssh`文件中，可以通过`ls -an` 看到.
8. 将公钥添加到GitHub中.网址:[https://github.com/settings/ssh](https://github.com/settings/ssh).点击 `Add SSH key`将 `cat /home/mio/.ssh/id_rsa.pub`的内容粘贴到提示框中.git中就能使用ssh了.
