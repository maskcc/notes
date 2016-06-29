[批处理使用方法](http://www.jb51.net/article/41322.htm)
##MD
创建子目录 md doc

##RD
删除子目录, rd f:\game, 子目录必须是空的  

##DEL
del，使用 "del 文件路径" 。比如，想删除D盘根目录下的test.txt，使用del d:\test.txt即可。  
del /a:s 系统属性  /a:h 隐藏  /a:r 只读 /a 所有属性  
	/f 强制删除  
	/q quiet, 静默删除  
	/s 搜索当前目录下的所有文件夹
	/p 弹出确认消息

##DELTREE
删除整个目录和文件命令

##TREE
显示磁盘目录结构

##CHKDSK
检查磁盘当前状态, /f 纠正磁盘上发现的逻辑错误, /v 显示所有文件和路径

##SCANDISK
检测修复磁盘 scandisk c: /all

##LABEL
简历磁盘卷标 label c: game

##COPY
copy 原路径\文件名 目标路径\目标文件名, 会替换掉同名文件  
/y 不显示提示就覆盖重名文件

##XCOPY
复制指定的目录和目录下的所有文件连同目录结构。  

		xcopy 原路径 目标路径 /s(所有文件,没/e参数不拷贝空目录) /v(对拷贝扇区校验) /e

##TYPE
显示文件ASCII码内容

##REN
修改文件名,新文件名前不可以加上盘符和路径,只能对同一盘上的文件更换文件名.

##FC 
文件比较, /a ascii码比较, /b 二进制比较 , /c 忽略大小写 /n ascii码下显示相异处的行号

##ATTRIB
1. 显示文件属性.  
2. 修改文件属性. attrib filename +-a(档案) +-h(hide) +-s(sys) 

##VER
查看系统版本号

##DATE
设置日期 [mm-dd-yy]

##TIME
设置时间 [hh: mm: ss: xx]

##FINGER
显示用户相关信息.



##其他
	 winver---------检查Windows版本 wmimgmt.msc----打开windows管理体系结构(WMI)  
	 wscript--------windows脚本宿主设置  
	 write----------写字板 		 
	 mspaint--------画图板 
	 mstsc----------远程桌面连接  
	 magnify--------放大镜实用程序  
	 mmc------------打开控制台
	 mobsync--------同步命令  
	 dxdiag---------检查DirectX信息 
	
	 devmgmt.msc--- 设备管理器 
	 dfrg.msc-------磁盘碎片整理程序  
	 diskmgmt.msc---磁盘管理实用程序 
	 dcomcnfg-------打开系统组件服务 	  
	 net stop messenger-----停止信使服务 net start messenger----开始信使服务   
	 notepad--------打开记事本 nslookup-------网络管理的工具向导  
	 ntbackup-------系统备份和还原 narrator-------屏幕“讲述人”  
	 ntmsmgr.msc----移动存储管理器 ntmsoprq.msc---移动存储管理员操作请求  
	 netstat -an----(TC)命令检查接口 syncapp--------创建一个公文包  
	 sysedit--------系统配置编辑器 sigverif-------文件签名验证程序  
	 sndrec32-------录音机 shrpubw--------创建共享文件夹  
	 secpol.msc-----本地安全策略 syskey---------系统加密，一旦加密就不能解开，保护windows xp系统的双重密码  
	 services.msc---本地服务设置 Sndvol32-------音量控制程序  
	 sfc.exe--------系统文件检查器 sfc /scannow---windows文件保护  
	 tsshutdn-------60秒倒计时关机命令 tourstart------xp简介（安装完成后出现的漫游xp程序）  
	 taskmgr--------任务管理器 tasklist /SVC--查看进程详细信息  
	 eventvwr-------事件查看器 eudcedit-------造字程序   
	 explorer-------打开资源管理器 packager-------对象包装程序  
	 perfmon.msc----计算机性能监测程序 progman--------程序管理器  
	 regedit.exe----注册表 rsop.msc-------组策略结果集  
	 regedt32-------注册表编辑器 rononce -p ----15秒关机  
	 regsvr32 /u *.dll----停止dll文件运行  
	 regsvr32 /u zipfldr.dll------取消ZIP支持  
	 rundll32.exe shell32.dll,Control_RunDLL ----------显示控制面板  
	 rundll32.exe shell32.dll,Control_RunDLL   
	 access.cpl,,1--------显示辅助功能选项  
	 rundll32.exe shell32.dll,Control_RunDLL sysdm.cpl @1－－打开系统属性  
	 rundll32.exe shell32.dll,Control_RunDLL appwiz.cpl,,1－－－删除或添加程序  
	 rundll32.exe syncui.dll,Briefcase_Create－－－－桌面上建立公文包  
	 rundll32.exe diskcopy.dll,DiskCopyRunDll－－－－复制软盘驱动器  
	 rundll32.exe shell32.dll,Control_RunDLL timedate.cpl,,0－－显示时间属性  
	 rundll32.exe shell32.dll,Control_RunDLL desk.cpl,,0－－－－显示桌面墙纸属性  
	 rundll32.exe shell32.dll,Control_RunDLL joy.cpl,,0－－－－－游戏控制器  
	 rundll32.exe shell32.dll,Control_RunDLL mmsys.cpl,,0－－－音频属性  
	 cmd.exe--------CMD命令提示符 chkdsk.exe-----Chkdsk磁盘检查  
	 certmgr.msc----证书管理实用程序 calc-----------启动计算器  
	 charmap--------启动字符映射表 cliconfg-------SQL SERVER 客户端网络实用程序  
	 Clipbrd--------剪贴板查看器 conf-----------启动netmeeting  
	 compmgmt.msc---计算机管理 cleanmgr-------垃圾整理  
	 ciadv.msc------索引服务程序 osk------------打开屏幕键盘  
	 odbcad32-------ODBC数据源管理器 oobe/msoobe /a----检查XP是否激活  
	 lusrmgr.msc----本机用户和组 logoff---------注销命令  
	 iexpress-------木马捆绑工具，系统自带 Nslookup-------IP地址侦测器  
	 fsmgmt.msc-----共享文件夹管理器 utilman--------辅助工具管理器  
	 gpedit.msc-----组策略  




 