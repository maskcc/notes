[learn](https://git-scm.com/book/en/v2/Git-Tools-Submodules)
1. 使用`submodule add`命令添加 submodule, 如

		git submodule add https://github.com/chaconinc/DbConnector
		
2. 更新好后目录下会增加两个一个文件 `.gitmodules`, 内容如下		

		[submodule "DbConnector"]
		path = DbConnector
		url = https://github.com/chaconinc/DbConnector
		
3. 更新他人的`submodules` 时， 可以使用如下指令递归的更新所有需要的目录.

		git submodule update --init --recursive

4. 同步他人的`submodules`时， 可以使用如下指令更新, 会更新主分支内容

		git submodule update --remote
		
5. 取消某个 `submodule` 可以使用以下指令, 如下取消了 opt/glog 目录的更新

		git submodule deinit -f -- opt/glog