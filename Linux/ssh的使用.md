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

8. ssh到`localhost`免密码:
	> ssh-keygen -t rsa -C "yourmail@163com"
	> 当前用户的 ~/.ssh/ 目录下回产生两个文件 `id_rsa`(你的__私钥__,存放在本机)  
	> `id_rsa.pub`(你的__公钥__,存放在远程计算机).当你想要连接到远程计算机时,__远程计算机持有你的公钥__.  
	> 设置你的私钥文件权限: `chmod 600 id_rsa`, `.ssh`目录权限应该应该为: `drwx------`  
	> 本机使用`ssh-add id_rsa`, __添加私钥__  
	> 将公钥`id_rsa.pub`拷贝到需要远程登录的计算机的`~/.ssh/` 目录下,将内容写入`authorized_keys`,使用如下命令:  
	> `cat id_rsa.pub >> authorized_keys`, 将公钥追加到授权KEY里面  
	> `authorized_keys`的属性应该是'-rw------',如果不是,设置方法:`chmod 600 authorized_keys`
	> 使用 `ssh localhost`登录本机,不需要使用密码

9. ssh配置文件在 `/etc/ssh/sshd_config`PasswordAuthentication no
10. 通过`scp`将文件copy到远程时,应该注意文件权限.自己的私钥一般会没有权限操作,会有如此错误 `No such file or directory`.
11. 当出现`ssh too many authentication failures`时, 应该用ssh-add 对私钥进行操作,是由于对于登录有超过两个ssh私钥登录

		-l 参数显示内存中的密钥
		-d 参数从代理中删除密钥 $ ssh-add -d ~/.ssh/id_xxx.pub
		-D 是删除所有密钥
		-t 对加载的密钥设置超时时间，超时代理将自动卸载密钥。
		-L -U 对代理进行加锁和解锁，当你离开计算机而不想退出登录时有用。

12. Linux 的hosts文件放在`/etc/hosts`中, 可以将ssh的目标ip映射成简短的名称如, ssh到`192.168.1.133`时,可以使用类似`ssh mio@mysite`.

		192.168.1.133 mysite
        
13. scp的使用.`scp 本地用户名 @IP 地址 : 文件名 1 远程用户名 @IP 地址 : 文件名 2 `

        -v 和大多数 linux 命令中的 -v 意思一样 , 用来显示进度 
        -P 选择端口 . 注意 -p 已经被 rcp 使用 . 
        -r 复制目录
        -4 强行使用 IPV4 地址 . 
        -6 强行使用 IPV6 地址 .
        例子:#scp -p 4588 remote@www.abc.com:/usr/local/sin.sh /home/administrator
14. `ssh-keygen -l -f /etc/ssh/ssh_host_rsa_key` 查看 秘钥的指纹