###基础知识
1. 给MySQL添加用户

		1. 创建数据库 svr, create database svr
		2. 设置用户权限
			mysql> GRANT SELECT, INSERT, UPDATE, DELETE, DROP, CREATE
	       	-> ON svr.*  //for all tables in DATABASE database
	       	-> TO 'user'@'localhost'
	       	-> IDENTIFIED BY 'password';
		3. 设置密码
			set password for dbo=password('password') old_password('oldpassword')
           
2. 数据库设计范式
    - 第一范式, 列仅包含原子值(不能再细分的单一值, 如 authors下某个人有 A1, A2, A3 三个作者), 没有重复的组(两个或多个逻辑相关联的列的集合, 如将 A1, A2, A3 设计成三个列作者1, 作者2, 作者3).
    - 第二范式,  主键是一个列(关键字不是组合的), 表中所有的列是主键的一部分(单一的或组合的 ), 非部分函数依赖(对于每一个非键列, 如果仅知道部分主键的值, 能否确定非键列的值, 如有三个主键, 其中两个主键就能确定某列的值)
    - 第三范式, 如果一个非键列的值确定了另一个非键列的值, 则表包含传递依赖, 第三范式中, 非键列相互独立且只依赖于主键列.
3. SQL 语句中注释是用 `--` 并延续到行尾. 一条SQL 语句以 `;` 结束. 应该使用单引号环绕**字符串**或日期.带引号的**标识符**是用双`""`引号括起来的(一般不建议使用).也可以使用方括号来使用标识符`[user]`
4. 日期值:
    - DATE  yyyy-mm-dd
    - TIME hh:mm:ss.xxxx
    - TIMESTAMP yyyy-mm-dd hh:mm:ss.ssss
    - SECOND 秒
    - datetime 日期和时间 
    - timestamp
###查询
1. SELECT, 语法:
    
        SELECT (columns, *)
            FROM tables
            [JOIN joins]
            [WHERE search_condition]
            [GROUP BY grouping_columns]
            [HAVING search_condition]
            [ORDER BY sort_columns];
   
   - 可以在 SELECT 语句后跟别名, `SELECT column1 [AS] alias1 FROM table;`, 可以对别名加双引号  
   - 使用 `DISTINCT` 消除重复的行.`SELECT DISTINCT columns FROM table;`
   - 使用`ORDER BY` 排序行, `SELECT columns FROM table ORDER BY sort_columns [ASC | DESC];`, 默认ASC, 多行时, 按照`ORDER BY `后面的顺序进行排序, 也可以按照字符串中子串排序.`ORDER BY substr(phone, length(phone) - 3);` 按尾号3位排序
   - 可以基于逻辑条件排序 , 对 ORDER BY 增加 CASE 表达式.如
        
        SELECT title_id, type, price, sales
            FROM titles
            ORDER BY CASE WHEN type = 'histoyr'
             THEN price ELSE sales END;
   - WHERE 中的逻辑运算 比较:`=, <>, <, <=,  >, >=`, 列表筛选`in`, 模式匹配`LIKE`, 范围筛选`BETWEEN`, 空值测试`IS NULL`, 不能再WHERE 子句中使用 SUM() 或 COUNT() 这样的聚合函数. 可以使用 AND, OR, NOT 来连接各个条件. 当三个混合使用时, 优先计算NOT, 再计算 AND , 最后 OR .使用 LIKE 时, '____' 表示4个字符的串,'_re_'匹配中间两个是re的四个字符, 其中的转义字符是 `!`如: select name frome titles where tile LIKE '%!%%' ESCAPE '!';
   
2. 函数
    - 连接字符串函数在MySQL中是 `CONCAT()`, 使用`SUBSTRING(str FROM 3(start) for 7(length))` 提取子字符串, 从3到3+7
    - 使用 `UPPER()` 和 `LOWER()` 更改字符串大小写
    - TRIM(LEADING 'A'|TRAILING|BOTH FROM str) 删除串两端不需要的字符.默认是BOTH, LEADING删除前面的A
    - CHARACTER_LENGTH() 返回串长度
    - POSITION(substring IN string) 查找串的位置, 没找到返回0  
    - CURRENT_DATE() CURRENT_TIME() CURRENT_TIMESTAMP()
    - CURRENT_USER()获取当前用户, SESSION_USER, SYSTEM_USER
    - CAST(sth AS TYPE) 转换数据类型.
    - CASE 表达式
    
            CASE comparison_value
                WHEN value1 THEN result1
                WHEN value2 THEN result2
                ELSE default_result
            END
    - COALESCE(expr1, expr2) 联合,合并,返回它的参数中第一个非空表达式 
    - NULLIF(expr1, expr2) 值相等则返回空值, 不相等返回第一个表达式
    
            select males, males/femals AS ratio from tbl; femals 可能为0, pity...
            select males, males/NULLIF(females, 0) AS ratio from tbl; 任何数用NULL除都得NULL
            
3. 汇总和分组数据:
    - MIN(expr)  expr 中的最小值
    - MAX(expr)  expr 中的最大值
    - SUM(expr)  epxr 中的值的和
    - AVG(expr)  epxr 中的平均值
    - COUNT(expr) expr中非空值的个数
    - COUNT(*) 表或集合的行数
    - DISTINCT 聚合不重复的行 如:AVG(DISTINCT expr)
    不可以嵌套聚合函数.不能再SELECT 语句中混合使用费聚合表达式和聚合表达式, 除非有GROUP BY 语句
    - GROUP BY 分组行,位于 WHERE 子句之后, ORDER BY 子句之前
    - HAVING 筛选分组, 限制了Group By 显示的分组数.它是在分组后才被应用
    - WHERE 子句从 FROM 和 JOIN 子句指定的运算结果中筛选, GROUP BY 子句对 WHERE  子句的输出进行分组, HAVING子句对分组后的结果进行筛选.
4. 使用联结
    - 使用 AS 创建表的别名, 在 FROM 或 JOIN 子句中使用 table [AS] alias
    - 连接类型:
        - 交叉联结(CROSS), 第一个表的每一行和第二个表的所有行的组合
        - 自然联结(NATURAL), 对第一个表的所有列和第二个表具有相同名字的列进行等同比较的连接
        -  内联结(INNER), 使用比较操作符基于每一个表中共同的值, 匹配源自两个表的行
        - 左外联结
        - 右外联结
        - 全外联结
        - 自联结
    - IN, ALL, ANY, EXISTS
    - 使用JOIN 创建连接的方法
    
            SELECT columns 
                FROM TABLE1 join_type table2
                ON join_conditions(tb1.column op tb2.column)
                WHERE  ...
                GROUP BY ...
                HAVING ...
                ORDER BY ...
           例子
           SELECT
                CODE,
                NAME,
                `language`,
                Percentage
            FROM
                world.country AS c
            INNER JOIN world.countrylanguage AS l
            WHERE
                c. CODE = l.CountryCode
            GROUP BY
                CODE
            HAVING
                CODE = 'chn';
                
5. 集合操作:
    - UNION 返回两个查询返回的所有行, 但会删掉重复的行, UNION ALL不去掉重复
    - INTERSECT 返回两个查询返回的所有共同行(MySQL 中并不支持该操作符)
    - EXCEPT 返回第一个查询中存在, 但第二个查询中不存在的所有行, 删除重复行(MySQL 中并不支持该操作符) 
6. 插入更新和删除操作:
    - 查看表信息, describe table1; MySQL 中是 SHOW TABLES tbl;
    - 插入一行: INSERT INTO table VALUES(value1, value2, ... valueN);
    - 按列名插入: INSERT INTO table (column1, column2, column3, ...) VALUES(value1, value2, value3, ...);
    - 将一个表的一行插入到另一个表: INSERT INTO table (column1, column2, ...) subquery;
    - 更新行: UPDATE table SET column = expr [WHERE search_condition];, 如果没有WHERE, 所有的行都被更新.
    - 插入更新操作: upserts(MERGE, REPLACE INTO)
    - 删除行: DELETE FROM table [WHERE search_condition];
    - 直接删除整张表, 比DELETE 不带 WHERE快, TRUNCAT TABLE table;
    
7. 创建零时表:
 
        CREATE {LOCAL | GLOBAL} TEMPORARY TABLE table(
            column1 date_type1 [constraints1],
            [, table_constraints]
        );
        
8. 索引是排序的列表, 在这个列表中索引列的每个不同值和包含该值的行的硬盘地址存储在一起, DBMS无需检索真个表来定位行, 而仅需要扫描索引中的地址就能直接访问相应的行. DBMS在表插入, 更新或删除行之后必须更新索引.索引必须保证唯一性, 表索引中的列的值唯一.
