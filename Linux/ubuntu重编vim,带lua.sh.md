#vim 重新编译带lua
#为了安装插件 https://github.com/Shougo/neocomplete.vim#requirements
sudo apt-get remove vim vim-runtime vim-gnome vim-tiny vim-common vim-gui-common
sudo apt-get purge vim vim-runtime vim-gnome vim-tiny vim-common vim-gui-common
sudo apt-get build-dep vim-gnome
sudo apt-get install luajit libluajit-5.1 libncurses5-dev libgnome2-dev libgnomeui-dev libgtk2.0-dev libatk1.0-dev libbonoboui2-dev libcairo2-dev libx11-dev libxpm-dev libxt-dev python-dev ruby-dev mercurial
sudo apt-get install libperl-dev
cd /usr/bin
sudo ln -s luajit-2.0.0-beta9 luajit
cd ~
git clone git@github.com:vim/vim.git
cd vim


./configure --with-features=huge \
--enable-cscope \
--enable-rubyinterp \   #ruby没装上会报错
--enable-largefile \
--disable-netbeans \
--enable-pythoninterp \
--with-python-config-dir=/usr/lib/python2.7/config \
--enable-perlinterp \
--enable-luainterp \
--with-luajit –enable-fail-if-missing \
--with-lua-prefix=/usr/local/ \   #加不加local看报错和locate文件的位置
--enable-gui=gnome2 --enable-cscope --prefix=/usr

make VIMRUNTIMEDIR=/usr/share/vim/vim74
sudo make install

#需要安装 libluajit,libperl-dev
#缺少.so文件要将so文件 ln 到usr/lib