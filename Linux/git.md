1. Git安装完成后需要设置,设置后机器上的所有仓库都使用该配置.

		$ git config --global user.name "your name"
		$ git config --global user.email "email@example.com"
2. 创建版本库
	- 新建一个空目录
	- 通过`git init` 将目录变成Git可以管理的仓库
	- 在创建的目录下创建一个文件,如`readme.md`,将其添加进仓库,然后将其提交到仓库,`git commit -m` 中`-m`是提交说明
			
			$ git add readme.md
			$ git commit -m "this is a readme file"

3. 添加到远程仓库:
		
		$ git remote add origin git@github.com:PickMio/PSpider.git //将本地和远程关联 
		$ git push -u origin master                                //将本地仓库推送到远程`-u`将本地的master和远程的master关联起来
	但是当你`GitHub`上的仓库里面创建的类似'readme.md'等文件,会有报错类似
		
		$ git push -u origin master
		To git@github.com:PickMio/Pspider.git
		 ! [rejected]        master -> master (fetch first)
		error: failed to push some refs to 'git@github.com:PickMio/Pspider.git'
		hint: Updates were rejected because the remote contains work that you do
		hint: not have locally. This is usually caused by another repository pushing
		hint: to the same ref. You may want to first integrate the remote changes
		hint: (e.g., 'git pull ...') before pushing again.
		hint: See the 'Note about fast-forwards' in 'git push --help' for details.
	因为版本管理中一般先要更新后上传.就如提示里描述的`hint: (e.g., 'git pull ...') before pushing again.`.所以先将GitHub上的版本pull下来,再执行上面的上传:
		
		$ git pull git@github.com:PickMio/PSpider.git
	从现在其,只要本地做了提交,就可以通过命令把本地master分支的最新修改推送至GitHub:

		$ git push origin master

4. 从远程仓库克隆,可以使用`ssh`的方式.项目地址在GitHub上的SSH下载地址找到.

		$ git clone git@github.com:PickMio/PSpider.git

5. `git status` 可以查看仓库当前的状态.能够看到哪些修改过但是还没提交.
6. `git diff filename` 比较修改的文件.
7. `git log`查看日志.
8. 版本退回:

		$ git reset --hard HEAD filename //放弃add到暂存区的修改 
		$ git reset --hard HEAD^ //HEAD表示当前版本上个版本是 HEAD^,往上100个版本是 HEAD~100
		$ git reset --hard 36888  //退回对应的commit版本.版本号不需要写全,git会自动查找.
		$ git reflog              //查看命令历史会看到HEAD前面的版本id
		$ git reflog

		ea34578 HEAD@{0}: reset: moving to HEAD^
		3628164 HEAD@{1}: commit: append GPL
		ea34578 HEAD@{2}: commit: add distributed
		cb926e7 HEAD@{3}: commit (initial): wrote a readme file

9. [git的暂存区和工作区的理解](http://dwz.cn/2iD47N)
10. `git checkout -- readme.md`相当于让文件回到最近一次`git commit`或`git add`时的状态.
	- readme.md修改后还没被放到暂存区,现在撤销修改回到和版本库一样的状态
	- readme.txt已经添加到暂存区,但是又修改了.现在撤销修改就回到添加到暂存区后的状态.
11. 删除文件: `git rm readme.md`
12. 待学习