##用户自定义存储过程
1. 创建语法

		create proc | procedure pro_name
		[{@参数数据类型} [=默认值] [output],
		 {@参数数据类型} [=默认值] [output],
		 ...
		]
		as
			SQL_statements

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
		