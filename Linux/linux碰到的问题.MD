##0x01
对某个文件夹的权限如`drwxrwx--r`,而且该文件也属于该用户或者该用户所属的群组,但是删除该文件时,还是提示`Permission denied`.很有可能就是用户或者用户组对该文件的父目录没有__写权限__.因为删除目录下的文件时,也会修改父目录.所以,应该给父目录添加写权限.[参考](http://askubuntu.com/questions/455000/group-permissions-allow-but-still-get-permission-denied).

##0x02
创建用户组后,发现无法修改同组用户创建的文件,提示`Permission denied`.如jack和rose都属于用户组ship,某`sea`的属性是`drwxrwxr-x  13 root ship  4096`,`cd sea`时,提示`Permission denied`.是因为修改用户组后,当前会话还没有应用到,可以使用`su username`再试试.[参考](http://superuser.com/questions/373115/why-cant-i-delete-a-file-where-i-have-group-write-permissions-on).

##0x03
配置好Apache和Mysql和PHP后,运行测试PHP文件,提示`Call to undefined function: mysql_connect()`,应该安装`apt-get install php5-mysql`.[参考](http://go2linux.garron.me/Fatal-error-Call-to-undefined-function-mysql_connect/).  
php的配置文件在`/etc/php5/apache2/phpi.in`.Apache2的根目录配置文件在`/etc/apache2/sites-available`中的 000-default.conf,修改`DocumentRoot /var/www/`为你想要的目录.日志文件在`/var/log`目录中.

##0x04
添加私钥时`ssh-add *`,提示`Could not open a connection to your authentication agent`.应该先启动`ssh-agent`.[参考stackoverflow](http://stackoverflow.com/questions/17846529/could-not-open-a-connection-to-your-authentication-agent).

	eval `ssh-agent -s` //这里是1左边的符号 `
	ssh-add

##0x05
[中文乱码](http://blog.csdn.net/ariessurfer/article/details/8168012)
[Linux下 GBK-> UTF-8 文件编码的批量转换](http://blog.csdn.net/a280606790/article/details/8504133)

##0x06
不小心点击`Ctrl + s` 后, tty 感觉像卡死了一样.其实是把消息阻塞了.要按`Ctrl + q` 解锁
        
        To disable this altogether, stick stty -ixon in a startup script. To allow any key to get things flowing again, use stty ixany.

        ps: It's neither the terminal nor the shell that does this, but the OS's terminal driver.

##0x07
使用`sudo` 命令执行一些命令时, 显示 `command not found`, 应该是sudo的配置问题, 应该修改 `/etc/sudoers`的secure_path, 在后面加上 `:/usr/local/bin`

        root@host ~]# sudo -V | grep 'Value to override'
        Value to override user's $PATH with: /sbin:/bin:/usr/sbin:/usr/bin
        If $PATH is being overridden use visudo and edit /etc/sudoers

        Defaults    secure_path = /sbin:/bin:/usr/sbin:/usr/bin:/usr/local/bin
        
##0x08
当编译没问题, 运行时提示 `/lib64/libstdc++.so.6: version `GLIBCXX_3.4.21' not found (required by ./r)`, 需要添加连接选项 `-static-libstdc++ -static-libgcc` [问题](http://stackoverflow.com/questions/19386651/how-to-fix-usr-lib-libstdc-so-6-version-glibcxx-3-4-15-not-found)
[原因](http://stackoverflow.com/questions/13636513/linking-libstdc-statically-any-gotchas)
[是由于最新版本的 libstdc++.so.6 没有拷贝到相应的位置 ](http://itbilu.com/linux/management/NymXRUieg.html)