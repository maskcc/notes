1. MongoDB是面向文档的数据库.而且没有模式.
2. MongoDB不但区分类型,也区分大小写.
3. MongoDB不能有重复的键.
4. 集合名的命名规则:
	- 不能使空字符串 ""
	- 不能含有 \0字符,这个字符表示集合名的结尾
	- 不能以 "system." 开头,此为系统集合保留的前缀.
	- 用户创建的集合名字不能含有保留字符 '$'
5. 数据库文档的创建:`db.filename.insert(dictStruct)`
6. 数据库文档的查看:`db.filename.find()`,find 会返回集合里所有的文档
7. 单个文档的查看:`db.filename.findOne()`
8. 更新一个文档:`db.filename.update({title : "My Bolg"}, dictStruct)` 
9. 删除一个文档: `db.filename.remove({title : "My Blog"})`
10. $set修改键值属性: `db.users.update({"name" : "joe"}, 
			{"$set" : {"favorite book" : "green eggs and ham"}})`
11. $unset删除键属性`db.users.update({"name" : "joe"}, 
			{"$unset" : {"favorite book" : 1}})`
12. 增加和减少. "$inc"增加已有键的值类似于`db.filename.update({"title" : "value", "user" : joe}, {"$inc" : {"score" : 50}})`
13. $push 添加
14. $pop 删除. `{$pop : {key : 1}} //数组末尾删除一个元素`
15. upsert. 要是没有文档符合更新条件,就会以这个天剑和更新文档为基础创建一个新的文档. `db.analytics.update({"url" : "/blog"}, {"$inc" : {"visits" : 1}, true})\\最后一个参数表示upsert`
16. save 是一个shell函数.可以在文档不存在时插入,存在时更新.  

		var x = db.foo.findOne()  
		x.num = 32  
		db.foo.save(x) = db.foo.update({"_id" : x._id}, x)  


17. find的第二个参数指定想要的键. `db.users.find({}, {"username" : 1, "eamil" : 1})  //_id这个键总是返回`  
`db.users.find({}, {"fatal_weakness" :" 0})可以不让结果中含有某个键`

18. 条件查询.

    	$lt  对应 <   //less then
		$lte 对应 <=  //less then equal
		$gt  对应 >   //greater than
		$gte 对应 >=  //greater than equal 
		例句: db.user.find({"age" : {"$gte" : 18, "$lte" : 30}})
	  	$ne 不相等
		  例句: db.users.find({"username" : {"$ne" : "joe"}}) //排除用户名为joe的用户 
		$in 查询一个键的多个值
		  例句: db.raffle.find("ticket_no" : {"$in" : [723,333,1334,"joe"]})
		$nin 不包含
		$or 查询,第一个条件应竟可能地匹配更多文档.
		  例句: db.raffle.find({"$or" : [{"ticket_no" : {"$in" : [423,123,435]}}, {"winner" : true}]})
		$mod 查询的值除以第一个给定的值,余数等于第二个给定的值会返回
		  例句: db.users.find({"id_num" : {"$mod" : [7,1]}})
		$not 表示与使用的相反
		  例句: db.user.find({"id_num" : {"$not" : {"$mod" : [7,1]}}})
		$exists 判断是否存在 null 不仅仅匹配自身,还匹配"不存在的"
		  例句: db.c.find("z" : {"$in" : [null], "$exists" : true}) //去找包含"z"属性但是属性为空的文档
19. MongoDB会为前缀型正则表达式(/^joey/)查询创建索引.所以查询会高效.采用Perl兼容的正则表达式.而且能够匹配自身.
20. $all 通过多个元素来匹配数组

		db.food.find)("fruit" : {"$all" : [apple, "banana"})