##1. 连接MongoClient
1. 创建一个`MongoClient`作为运行`mongod`的实例:

		>>>from pymongo import MongoClient  
		>>>client = MongoClient()

2. 获取一个数据库,使用`MongoClient`实例:

		>>>db = client.test_database
		>>>db = client['test-database']	#方法2

3. 获取一个集合(`Collection`).相当于关系数据库中的某张表.如,游戏中有个Wow_db数据库,里面有个角色登录相关的表`Wow_db.users`存储用户名和密码.获取操作和获取一个数据库类似

		>>> collection = db.test_collection
		>>> collection = db['test-collection']   #方法2 上面方法不能读出的可以使用这种方式
		#注: MongoDB中的集合和数据库时在插入数据后才创建的,只创建数据库或集合会暂时不创建数据.

4. Python中可以使用`dictionary`代表文档(`documents`).Mongo中存储的文档使用`JSON-style`.如下:

		>>> import datetime
		>>> post = {'author': 'Mike',
					'text': 'My first blog post!',
					'tags': ['mongodb', 'python', pymongo],
					'data': datetime.datetime.utcnow()}
5. 插入文档,使用`insert_one()`:

		>>> posts = db.posts
		>>> post_id = posts.insert_one(post).inserted_id
		>>> post_id
		>>> insert_one()返回一个 InsertOneResult实例,每个文档会创建一个"_id", 这个键必须是唯一的.

6. 查询单个文档 `find_one`,只会返回第一个找到的符合条件的document,如果有多个不该使用这个函数.find_one是在一个集合上面查询的

		>>> from pymongo import MongoClient
		>>> client = MongoClient()  #创建mongo实例
		>>> db = client.school      #获取school数据库
		>>> col = db.teachers       #获取数据库中的teacher集合
		>>> col.insert({'name': 'mio', 'age': '17'})
		>>> col.find_one({'name', 'mio'})

7. `ObjectId`是`insert_one`返回的一种类型, 和str(ObjectId)不同.可以使用类型转换:

		from bson.objectid import ObjectID
		document = client.db.collection.find_one({'_id': ObjectId(post_id)})

8. MongoDB存储的数据都是`BSON formate`的.BSON字符使用的`UTF-8`.Python的`unicode`字符需要转换成`utf-8`.PyMongo会将结果的字符解析成`unicode`.
9. `insert_many(posts)`可以一次插入多个文档到数据库.
10. `find`用来返回多个文档.会返回一个`Cursor`实例,可以遍历的.posts.count()显示集合里面的数量.
11. 添加索引,可以根据特定关键字来查询.下面创建一个唯一索引
		
		>>> rst = db.profiles.create_index([('user_id', pymongo.ASCENDING)], unique=True)
		>>> list(db.profiles.index_information())
		[u'user_id_1', u'_id_']
