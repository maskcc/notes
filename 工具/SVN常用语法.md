1. [svn官方网站](http://subversion.apache.org/)
2. [svn配置](http://wenku.baidu.com/view/b0d5421ba76e58fafab00337.html?st=1),[参考网站](http://blog.csdn.net/Sunboy_2050/article/details/6187464)
3. 将文件checkout到本地目录

		svn checkout path
		简写: svn co

4. 往版本库中添加新的文件

		svn add file

5. 强改动的文件提交到版本库

		svn commit -m"LogMessage" [-N][--no-unlock]PATH
		简写: svn ci

6. 加锁,解锁

		svn lock -m "LockMessage" [--force] PATH
		svn unlock PATH

7. 更新到某个版本

		svn update -r m path
		简写: svn up
8. 查看文件或目录的状态

		svn status path
		svn status -v path(显示文件和子目录状态)
		简写: svn st

9. 删除文件
	
		svn delete path -m "message"
		简写: svn (del,remove,rm)

10. 查看日志 

		svn log path

11. 查看文件详细信息

		svn info path

12. 比较差异

		svn diff path
		svn diff -r m:n path(对版本m和版本n比较差异)
		简写: svn di

13. 将两个版本之间的差异合并到当前文件

		svn merge -r m:n path

14. 恢复本地修改

		svn revert:恢复原始未改变的工作副本文件
		revert PATH 本子命令不会存取网络,并且会解决冲突的状况,但是它不会恢复被删除的目录

15. 解决冲突

		svn resolved: 移除工作副本的目录或文件的冲突状态
		resolved PATH: 此命令不会依语法来解决冲突或是移除冲突标记,它只是移除冲突的相关文件,让PATH可以再次提交.

16. 清理:

		svn cleanup