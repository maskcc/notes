### 判断今天数据库是否插入过数据
    方案1:
    
        SELECT _result = COUNT(1) FROM plat_activity_data_db.activity_share_record WHERE TO_DAYS(NOW()) - TO_DAYS(createTime) = 0 AND userid = ?;
        IF _result = 0 THEN
            ...
        END IF;
        
    方案2:
        取当天0点0分，下一天0点0分
        UNIX_TIMESTAMP获取时间戳
        timestamp获取时间
        select UNIX_TIMESTAMP(date(sysdate())),timestamp(adddate(date(sysdate()),1)); 