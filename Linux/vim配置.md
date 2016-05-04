##基本配置
终端使用vim进行编辑时,可以设置一些默认的配置,修改`~/.vimrc`修改配置.如果当前的用户目录下没有.vimrc文件,可以`vim ~/.vimrc`然后修改里面的内容.[参考](http://blog.itpub.net/8111049/viewspace-628456).

1. 显示行号: `set nu`
2. 设置撇皮模式,类似输入左括号会匹配相应右括号

##插件
###使用[Vundle.vim](https://github.com/VundleVim/Vundle.vim#about)管理vim插件.
###使用[YouCompleteMe](https://github.com/Valloric/YouCompleteMe)自动完成.安装时如果出现错误,什么L9重复

	" Git plugin not hosted on GitHub
  	Plugin 'git://git.wincent.com/command-t.git'
  	" git repos on your local machine (i.e. when working on your own plugin)
  	Plugin 'file:///home/cmio/.vim/bundle/YouCompleteMe'

	上面这些只是范例插件,把错误的注释掉即可,自己安装的插件可以写在这 file:///home/cmio/.vim/bundle/YouCompleteMe

###[常用插件](http://harttle.com/2015/07/18/vim-cpp.html)
###使用[delimitMate](https://github.com/Raimondi/delimitMate), 在~/.vimrc添加 `Plugin 'Raimondi/delimitMate'`并`PluginInstall`重新打开vim就能自动补全