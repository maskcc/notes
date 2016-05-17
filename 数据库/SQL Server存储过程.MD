[MSDN SQLServer 官方文档](https://technet.microsoft.com/zh-cn/library/ms187875(v=sql.110).aspx)
##用户自定义存储过程
1. 创建语法

		create proc | procedure pro_name
		[{@参数数据类型} [=默认值] [output],
		 {@参数数据类型} [=默认值] [output],
		 ...
		]
		as
			SQL_statements

		创建存储过程:
		create procedure sp_name()
		begin
		........
		end

2. 创建不带参数存储过程

		--创建存储过程
		if(exists (select * from sys.objects where name = 'proc_get_student')
		drop proc proc_get_student
		go
		create procd proc_get_student
		as 
			select * from student;
		
		调用,执行存储过程 
		exec proc_get_student;

3. 修改存储过程
	
		--修改存储过程
		alter proc proc_get_student
		as 
		select * from student;

4. 带参存储过程

		--带参存储过程
		if(object_id('proc_find_stu', 'P') is not null)
			drop proc proc_find_stu
		go
		create proc proc_find_stu(@startId int, @endId int) 
		as
			select * from student where id between @startId and @endId
		go
		
		exec proc_find_stu 2,4;

5. 带通配符参数存储过程

		--带通配符参数存储过程
		if(object_id('proc_findStudentByName', P) is not null)
			drop proc proc_findStudentByName
		go
		create proc roc_findStudentByName(@name varchar(20) = '%j%', @nextName varchar(20) = '%')
		as
			select * from student where name like @name and name like @nextName;
		go
		
		exec proc_findStudentByName;
		exec proc_findStudentByName '%o%', 't%';

6. 带输出参数存储过程

		--带输出参数存储过程
		if(object_id('proc_getStudentRecord', 'P') is not null)
			drop proc proc_getStudentRecord
		go
		create proc proc_getStudentRecord(
			@id int,
			@name varchar(20) out,
			@age varchar(20) output
		)
		as
			select @name = name, @age = age from student where id = @id and sex = @sex;
		go

		--
		declare @id int,
				@name varchar(20),
				@temp varchar(20);
		set @id = 7;
		set @temp = 1;
		exec proc_getStudentRecord @id, @name out, @temp output;
		select @name, @temp;
		print(@name + '#' + @temp);
	
7. 调用存储过程
	
		call sp_name()//存储过程名称后面必须加括号.
		drop procedure sp_name //删除存储过程 

8. 变量.

		自定义变量: DECLARE a INT; SET a=100;
		等价于:     DECLARE a INT DEFAULT 100;
		用户变量,一般以@开头.

		在MySQL客户端使用用户变量:
		SELECT 'HELLO WORLD' into @x;
		SELECT @x;
		SET @y='goodbye world';
		select @y;
		set @z=1+2+3;
		select @z;

		在存储过程中使用用户变量
		create procedure greetworld() select concat(@greeting, 'world');
		set @greeting='hello';
		call greateworld();

		在存储郭成建传递全局范围的用户变量
		create procedure p1() set @last_procedure='p1';
		create procedure p2() select concat('last procedure wa', @last_procedure);
		call p1();
		call p2();

9. 运算符
	- DIV 整除 `set var5= 10 DIV 3; 3`
	- % 取模 `set var6 = 10%3; 1`
	- >,< >=, <=, =
	- Between  在两值之间 5 between 1 and 10; true
	- not between 不在之间
	- in 在集合中 5 in(1,2,3,4,5)
	- not in
	- <>, != 不等于 2<>3, 2!=3
	- <=>严格比较两个NULL是否相等 NULL <=> NULL true
	- Regexp 正则匹配 "guy Harrison" Regexp "[Gg]reg" false
	- is null 为空
	- is not null  不为空
	- `|` 或, `&`与, `<<` 左位移, `>>`右位移, `~` 非(单目运算,按位取反)
	- `--` 单行注释,`/*多行注释*/`

10. 分支结构
	- if case
	- for
	- while
	- loop
	- repeat until
	- begin end;定义区块
	- lable:begin .... end lable;
	- 使用 leave lable 跳出区块.

11. 输入和输出.

		create procedure|function([[IN | OUT | INOUT] 参数名 数据类型 ...])

		In 输入参数,必须在调用存储过程时指定,在存储过程中修改该参数的值不能被返回,为默认值
		Out 输出参数,该值可在存储过程内部被改变,并可返回.
		InOut 输入输出参数,调用时指定,并且可以被改变和返回

		例子:
		create procedure sp_demo_in_parameter(IN p_in INT)
		BEGIN
		SELECT p_in;
		SET p_in=2;
		SELECT p_in;
		END;
		调用:
			set @p_in=1
			call sp_demo_in_parameter(@p_in)
			select @p_in

12. `Set NOCount On` 停止返回只是一个T-SQL语句影响的行数信息作为返回结果的一部分.对于包含了很多不反悔实际数据的语句的存储过程,使用Set NoCount on可以很大的提高性能,大幅减少减少网络流量.**当没有必要返回客户端"n行收到影响"消息时,应该在存储过程的开始设置`SET NoCount ON`, 在存储过程结束时设置`SET NoCount OFF`.**
13. `SET ANSI_NULLS { ON | OFF}`**在SQL Server的未来版本中,ANSI_NULLS 将始终为ON,将该选项显示设置为OFF的任何应用程序都将产生错误.**请避免在新的开发工作中使用该功能,并着手修改当前还在使用该功能的应用程序. 当 `SET ANSI_NULLS` 为ON 时,即使 column_name中包含空值,使用 Where column_name=NULL的select语句仍会返回零行,即使 `column_name`中包含非空值,使用 where column_name<>NULL的 select语句仍会返回零号.[参考](https://technet.microsoft.com/zh-cn/library/ms188048%28v=sql.110%29.aspx)

		   ANSI_NULLS 是在处理计算列或索引视图的索引时必须设置为所需值的七个 SET 选项之一。   
		还必须将选项 ANSI_PADDING、ANSI_WARNINGS、ARITHABORT、QUOTED_IDENTIFIER 和
		CONCAT_NULL_YIELDS_NULL 设置为 ON，而必须将 NUMERIC_ROUNDABORT 设置为 OFF。 

14. 获取EXECUTE 的返回值,官方文档最好参考[msdn](https://technet.microsoft.com/zh-cn/library/ms188332(v=sql.110).aspx)

		EXECUTE  @arg_GlamourValue = QPGameTestDB.dbo.sp_mobile_updateOrget_glamourValue @arg_UserID, 0