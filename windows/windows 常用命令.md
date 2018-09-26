1. dumpbin 查看  DLL 文件的信息
	
		#　查看dll 中的方法
		dumpbin /exports event.dll

		#dumpbin 查看PE 信息，　包含版本信息
		dumpbin /headers <assembly path>