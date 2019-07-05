## 安装方式[参考](https://dev.mysql.com/doc/refman/5.5/en/binary-installation.html)
### 0x00 binary 安装
- 安装依赖
		
			yum search libaio
			yum install -y libaio
- 安装步骤

			shell> groupadd mysql
			shell> useradd -r -g mysql -s /bin/false mysql
			shell> cd /usr/local
			shell> tar zxvf /path/to/mysql-VERSION-OS.tar.gz
			shell> ln -s full-path-to-mysql-VERSION-OS mysql
			shell> cd mysql
			shell> chown -R mysql .
			shell> chgrp -R mysql .
			shell> scripts/mysql_install_db --user=mysql
			shell> chown -R root .
			shell> chown -R mysql data
			# In order to change ownership of these files one needs to use following command.
			shell> chown -h mysql:mysql libmysqlclient.so.16 libmysqlclient.so libmysqlclient_r.so.16 libmysqlclient_r.so
			# Next command is optional
			shell> cp support-files/my-medium.cnf /etc/my.cnf
			shell> bin/mysqld_safe --user=mysql &
			# Next command is optional
			shell> cp support-files/mysql.server /etc/init.d/mysql.server
- 创建用户和用户组

			groupadd mysql
			useradd -r -g mysql -s /bin/false mysql
### 0x01 rpm 安装
- 去[官方网站](https://dev.mysql.com/downloads/mysql/)选择对应系统版本的 rpm 的安装包
- tar -zxvf *.tar.gz 解压下载的文件
- `rpm -i MySQL-server-VERSION.glibc23.i386.rpm`, 对每个文件执行 rpm -i 操作
- 安装完成后会自动启动, 启动脚本也会安装， 也会创建夜歌用户 mysql 和 mysql 用户组
- 删除方法
	 
	 	yum remove MySQL-server-OLDVERSION.glibc23.i386.rpm # 用来删除mysql
		yum remove mysql mysql-server mysql-libs compat-mysql51
		rm -rf /var/lib/mysql
		rm /etc/my.cnf
		# 查看漏网之鱼
		rpm -qa|grep mysql
	
	
### 0x02 账号设置 
- 登陆账号
		
			mysql -uroot -p
- 查看当前用户, 有 root 账户和两个匿名账户, 给每个root 账户设置密码 

			use mysql;
			SELECT User, Host, Password FROM mysql.user;
			+------+--------------------+----------+
			| User | Host               | Password |
			+------+--------------------+----------+
			| root | localhost          |          |
			| root | myhost.example.com |          |
			| root | 127.0.0.1          |          |
			| root | ::1                |          |
			|      | localhost          |          |
			|      | myhost.example.com |          |
			+------+--------------------+----------+
- 给 root 设置密码， `localhost` 表示本机使用,`%` 表示可以远程使用

			SET PASSWORD FOR ''@'localhost' = PASSWORD('new_password');
- 删除匿名用户, 测试用户

			DROP USER ''@'localhost';
			DELETE FROM mysql.db WHERE Db LIKE 'test%';
			FLUSH PRIVILEGES;	
			DROP DATABASE test;
- 创建其他用户
			
			CREATE USER 'jeffrey'@'localhost' IDENTIFIED BY 'password';
			SET PASSWORD FOR 'jeffrey'@'localhost' = PASSWORD('password');
			# 使用命令行修改密码， 有些系统不安全
			mysqladmin -u user_name -h host_name password "password"

- 设置数据表的权限
			
			# 显示用户权限
			SHOW GRANTS FOR 'joe'@'office.example.com';
			GRANT ALL PRIVILEGES  ON *.* TO 'jeffrey'@'localhost';
			# ALL, ALL PRIVILEGES, 权限
			# 'jeffrey'@'localhost' 用户， localhost 表示本地访问, % 

### 0x03 可能碰到的问题
- 使用 mysql -u -p  可以直接进入mysql， 不需要输入密码， 是应为匿名账号没有删除， 可以先找出匿名用户再删除之, 如上图
		
		# 查看当前用户
		SELECT User, Host, Password FROM mysql.user;
		# 删除匿名用户
		DROP USER ''@'localhost';
		DROP USER ''@'myhost.example.com';
		flush privileges;­
		service mysqld restart

- 访问 mysql 时， 出现 `ERROR 1819 (HY000)， Your password does not satisfy the current policy requirements`, 是由于MySQL 为了安全性先生成一个随机密码
	
		# 查看产生的临时密码, log_error 查看错误日志路径
		select @@log_error; 
		grep "password" /var/log/mysqld.log

- 如果设置密码报错 `ERROR 1820 (HY000): You must reset your password using ALTER USER statement before executing t`, 是由于密码不适合当前安全规则.

		# 查看当前安全配置
		SHOW VARIABLES LIKE 'validate_password%';
		# 设置安全级别
		# 配置 0 or low, 低级 
		# 配置 1 or medium, 中级,  数字， 大小写， 和特殊字符
		# 配置 2 or strong, 高级,  数字，  大小写， 和特殊字符， 和字典文件 
		set global validate_password_policy=0;
		set global validate_password_length = 4; 
		set global validate_password_number_count = 0;
		set global validate_password_special_char_count = 0;
		set global validate_password_mixed_case_count = 0;

- 当使用不同 mysql 数据库导入表时， 可能会报错 `MySQL 5.7 Invalid default value for 'CREATE_TIME'`, 这是由于新老版本对 timestamp 设定默认规则改变. 不能为0. [参考](https://stackoverflow.com/questions/9192027/invalid-default-value-for-create-date-timestamp-field)

		# 查看sql_mode
		show variables like '%sql_mode%';
		# 修改sql_mode,去掉NO_ZERO_IN_DATE,NO_ZERO_DATE:
		set sql_mode='ALLOW_INVALID_DATES';

		You could just change this:
		`create_date` TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00',
		To something like this:		
		`create_date` TIMESTAMP NOT NULL DEFAULT '2018-04-01 12:00:00',
- 使用正确的密码连接数据库时报错 `MySQL: ERROR 2027 (HY000): Malformed packet`, 是由于使用了老式的密码方式(没有用 password 加密)， 为它设置一个新密码就行.[参考](https://stackoverflow.com/questions/45654055/mysql-error-2027-hy000-malformed-packet)
		
		SET PASSWORD FOR 'existinguser'@'localhost' = PASSWORD('existingpass');

- 给用户设置远程权限

		update user set host = '%' where user = 'root';
- 忘记mysql密码时， 可以使用如下 ：

		mysqld --skip-grant-tables # 不需要密码直接进入, mysql -uroot -p
		# 在lampp 时， 可以
		/opt/lampp/sbin/mysqld --skip-grant-tables
		#或者直接清空密码 
		mysqladmin -u root -pType_in_your_current_password_here password ''


### 0x04 导入大量数据, 参考[[1]](http://www.serhatdundar.com/blog/import-huge-databases-faster-in-mysql),[[2]](https://dba.stackexchange.com/questions/44297/speeding-up-mysqldump-reload/44309#44309),[[3]](https://dba.stackexchange.com/questions/150962/mysql-settings-useful-to-speed-up-a-mysqldump-import),[[4]](https://dba.stackexchange.com/questions/83125/mysql-any-way-to-import-a-huge-32-gb-sql-dump-faster)
- 经常使用如下命令导入数据表, 如果要一次性导入多张表， 可以在sh 文件中添加多行来导入多张数据表 

		mysql -u username -p 'pwd' some_db < database1.sql


- 在 my.cnf 中修改配置, 关系如下![](https://p5g5pw-sn3302.files.1drv.com/y4m9ZoxeL1h_aft60cuBkGm1j5OFjwmbj62KVca5HhJlUBUXsHtrZVDZCM7iS2KMvnkwtkcsgArXPXig-m-ZtN9BWzEgJLoLdZDlEg5hnOPwh60SM_X-ZRjvfd8CI-rwLIW6JbvI_oYdG-Z290IDtNDHqxD7an6doFy8ohFT4eX-GoeeSKl9g7M0X7KKU31Ne6v0zfJz9_UthXTzaJLWYwFdA?width=803&height=601&cropmode=none)

		innodb_buffer_pool_size = 12G
		# 60% - 70% of your RAM size, will cache frequently read data

		innodb_log_buffer_size = 16M
		# 16M or 32M is fine,  Larger buffer reduces write I/O to Transaction Logs

		innodb_log_file_size = 3G
		# 25% of buffer pool size, Larger log file reduces checkpointing and write I/O

		innodb_write_io_threads = 32
		# 32 is fine, 64 is maximum, Service Write Operations to .ibd files. According to MySQL Documentation on Configuring the Number of Background InnoDB I/O Threads, each thread can handle up to 256 pending I/O requests. Default for MySQL is 4, 8 for Percona Server. Max is 64.

		innodb_flush_log_at_trx_commit = 0
		# see image for details,In the event of a crash, both 0 and 2 can lose once second of data.
		The tradeoff is that both 0 and 2 increase write performance.
		I choose 0 over 2 because 0 flushes the InnoDB Log Buffer to the Transaction Logs (ib_logfile0, ib_logfile1) once per second, with or without a commit. Setting 2 flushes the InnoDB Log Buffer only on commit. There are other advantages to setting 0 mentioned by @jynus, a former Percona instructor.

- 执行前， 修改一些检查配置

		# 必改
		set global autocommit=0;
		set global unique_checks = 0;
		set global foreign_key_checks = 0;
		set global innodb_flush_log_at_trx_commit = 0;
		
		# 选改
		set global innodb_fast_shutdown = 0;		
		set global max_allowed_packet=1000000000;
		set global net_buffer_length=1000000;
- 执行后要将这些选项设置成默认的， 特别是`autocommit`, `unique_checks`, `unique_checks`
- 执行 `service mysql restart`

### 导出数据
mysqldump --opt -uroot -p123 test > test.dump # 加上 --opt 会添加如果表存在先 drop 的操作, --no-data 只备份表结构
### 导入数据
# mysql -uroot -p123456 < runoob.sql
