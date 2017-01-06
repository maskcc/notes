1. 给MySQL添加用户

		1. 创建数据库 svr, create database svr
		2. 设置用户权限
			mysql> GRANT SELECT, INSERT, UPDATE, DELETE, DROP, CREATE
	       	-> ON svr.*  //for all tables in DATABASE database
	       	-> TO 'user'@'localhost'
	       	-> IDENTIFIED BY 'password';
		3. 设置密码
			set password for dbo=password('password') old_password('oldpassword')
		