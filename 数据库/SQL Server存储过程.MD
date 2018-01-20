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

15. IF NOT EXISTS (SELECT 1 FROM QPGameTestDB.dbo.mobile_zhenRen2Ma_getAvatarLog WHERE userid = @arg_userid AND useState = 1 AND avatarId = @arg_avatarid)
	BEGIN
		SET @arg_ret = 1
		RETURN
	END

16. 	--查找当前累计的局数
	SELECT @arg_GameCount = ISNULL(GameCount, 0)
	FROM QPGameUserDB.dbo.mobile_user_property
	WHERE userid = @arg_UserID

17. ISNULL 的使用,设置默认值

	Isnull (check_expression , replacement_value) 　　参数check_expression ，是待检查是否为空的表达式，参数replacement_value是带替换的指定值，如果参数check_expression为空则参数replacement_value进行填充，如果check_expression不为空，则返回表达式相应的返回值类型，需要注意到是参数check_expression和参数replacement_value的类型需要保持一致，否则要进行相应的转换，
	
		SELECT HeadImageID,CostScore,isnull (CanUseDay,36500),IsFree, isnull (SaleRate, 100) FROM QPGameTestDB.dbo.mobile_head_image_info where IsAvailable = 1

18. CONVERT(data_type(length),data_to_be_converted,style)
19. update test.dbo.testDate set date='2035-12-31 23:59:59.000' where datediff(second, date, '2035-12-31 23:59:59.000') < 0 

		比较两个时间的大小
		select count(*) from table where DATEDIFF ([second], '2004-09-18 00:00:18', '2004-09-18 00:00:19')  > 0		
		说明		
		　　select  DATEDIFF(day, time1 , time2)    对应示例语句如下
		　　select  DATEDIFF(day, '2010-07-23 0:41:18', '2010-07-23 23:41:18')		
		　　time1 > time2 为负数;		
		　　time1 < time2 为正数;		
		　　[day] :只会比较 2010-07-23 忽略 0:41:18' 其他同理		
		以下分别: 		
		　　年: SELECT DATEDIFF([year],time1 , time2)   返回值： -6 ，说明是后减前 与 mysql 相反的。		
		　　月: SELECT DATEDIFF([month], time1 , time2)		
		　　天: SELECT DATEDIFF([day], time1 , time2)		
		　　小时: SELECT DATEDIFF([hour], time1 , time2)		
		　　秒: SELECT DATEDIFF([second], time1 , time2)   
20. 判断账号是否是在字符串内

        if (CHARINDEX('昵称', @arg_NickName) <> 0)
				begin
					set @arg_IsSetNickname = 0
				end

21. 添加日期

		insert into QPGameUserDB.dbo.mobile_user_property (userid, vip_level, create_time, SpecialAvatar, SpecialAvatarOverData)
		values (@arg_UserID, 0, getdate (), @arg_SettingImageIndex, dateadd (dd, 30, getdate ()))

22. 导出存储过程或者数据库:Sql Server 图形界面

		选中一个数据库实例，右键“所有任务”－－“生成sql脚本”
		“常规”－－“全部显示”－－选中全部存储过程　复选框

23. 使用临时表

		CREATE TABLE #f 
		(id int IDENTITY(1,1),
			userid INT)

		INSERT INTO #f(userid)  SELECT userid_1 FROM QPGameTestDB.dbo.mobile_friendship_history_table WHERE userid_2 = @userid AND state = 0

		CREATE TABLE #t
		(
		 userid INT,
		 imageid INT NULL,
		 ilevel  INT NULL,
		 viplevel INT NULL,
		 sex      SMALLINT NULL,
		 reqtime	datetime NULL,
		 nickname VARCHAR(32) NULL,
	   locaddr  VARCHAR(50) NULL
		) 

24. `NEWID()`,[获取随机数,参考](http://www.cnblogs.com/wuming/archive/2010/02/24/1672906.html)

		select   top   10   *,newid()   as   Random   from   ywle where   ywlename='001'   ordey   by   Random 
		从A表随机取10条记录,用SELECT TOP 10 * FROM ywle order by newid()
		order by 一般是根据某一字段排序,newid()的返回值 是uniqueidentifier ,order by newid(),newid()在扫描每条记录的时候都生成一个值, 而生成的值是随机的, 没有大小写顺序. 所以最终结果再按这个排序, 排序的结果当然就是无序的了

25. `Case when `[用法](http://www.2cto.com/database/201203/124327.html).

		--简单Case函数     
    
			CASE sex  
			 WHEN '1' THEN '男'
	         WHEN '2' THEN '女'
			ELSE '其他' END      
	    
		--Case搜索函数     
    
			CASE WHEN sex = '1' THEN '男' 
	         WHEN sex = '2' THEN '女'  	
			ELSE '其他' END   

26. `<>不等于号`用来忽略where中的条件

		-- 当 @arg_Source 不为0(大厅的拜关公), 不为1(斗地主内的求财神)时, 忽略 @arg_Source,
			 服务器传过来的是3, 显示大厅和斗地主内的奖励
		select * from ...
		WHERE	qw.id=log.qianwenID AND log.awardID > 0 AND log.bHasNotice>0 
			AND (log.source = @arg_Source or (@arg_Source <> 0 and @arg_Source <> 1))
            
27. 使用cusor 来读取多列

    select @arg_ItemID_temp = ItemID from QPGameTestDB.dbo.mobile_item_use_info where ItemID = @arg_ItemID

	if( @@ROWCOUNT = 0 )
		return @ERROR_ITEM_NOT_EXIST
	
	declare cur cursor for
	select AwardType, AwardItemID, AwardCount, AwardReserve from QPGameTestDB.dbo.mobile_item_use_info where ItemID = @arg_ItemID
	open cur
	fetch next from cur into @arg_awardType, @arg_awardItemID, @arg_awardCount, @arg_AwardReserve
	while @@fetch_status = 0
	begin

		SET @arg_awardCount = @arg_awardCount * @arg_ItemCount

		EXECUTE QPGameTestDB.dbo.sp_mobile_add_player_award @arg_UserID, 0, 0, 1297, @arg_awardType, @arg_awardItemID, @arg_awardCount, @arg_AwardReserve, 0, ''
		PRINT 'send reward success type:' + cast( @arg_awardType as varchar ) + ' itemId = ' + cast( @arg_awardItemID as varchar ) + ' count = ' + cast( @arg_awardCount as varchar )
		fetch next from cur into @arg_awardType, @arg_awardItemID, @arg_awardCount, @arg_AwardReserve

	end

	--关闭游标
	close cur 
	deallocate cur

28. 存储过程中使用 select 后, 如果没将select 的结果保存下来, 就会将数据返回, 如果没将select

    --下面这条会将userid返回 
	select top 1 userid from QPUserLobbyDB.dbo.juezhan_Lobby_UserTaskInfo where userid = @arg_userid and take_type = 3 order by taskid asc
    
    --下面这条没有返回结果 
    declare @_userid INT
	select top 1 @_userid = userid from QPUserLobbyDB.dbo.juezhan_Lobby_UserTaskInfo where userid = @arg_userid and take_type = 3 order by taskid asc
    
29. DATEPART(dw, GetDate() - 1) 获取今天星期几, 1 表示星期一
30. 从数据库导出所有表和存储过程， 使用SQL Server Management 右键某数据库， 选择任务， 生成脚本， 保存到文件， 每个对象一个文件, 选择导出位置就行
31. [SQL 语句集锦](http://blog.csdn.net/cloudday/article/details/8048779)