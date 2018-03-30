# 对所有用户有效在/etc/profile增加以下内容。
如果只对当前用户有效在Home目录下的.bashrc或.bash_profile里增加下面的内容：
(注意：等号前面不要加空格,否则可能出现 command not found)

#在PATH中找到可执行文件程序的路径。
export PATH =$PATH:$HOME/bin

#gcc找到头文件的路径
C_INCLUDE_PATH=/usr/include/libxml2:/MyLib
export C_INCLUDE_PATH

#g++找到头文件的路径
CPLUS_INCLUDE_PATH=$CPLUS_INCLUDE_PATH:/usr/include/libxml2:/MyLib
export CPLUS_INCLUDE_PATH

#找到动态链接库的路径
LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/MyLib
export LD_LIBRARY_PATH

#找到静态库的路径
LIBRARY_PATH=$LIBRARY_PATH:/MyLib
export LIBRARY_PATH

ldd 文件， 查看文件使用了哪些动态库


CPLUS_INCLUDE_PATH=$CPLUS_INCLUDE_PATH:/usr/local/include:/opt/gpro/gcc/7/lib/gcc/x86_64-pc-linux-gnu/7.3.0/include
export CPLUS_INCLUDE_PATH
LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/lib64:/home/cmio/projects/asio_test/bin:/opt/gpro/gcc/7
export LD_LIBRARY_PATH
PATH=/opt/gpro/gcc/7/bin/:$PATH
export PATH