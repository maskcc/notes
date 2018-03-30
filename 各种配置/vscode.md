1. vscode c++ 头文件配置， 在 `.vscode\c_cpp_properties.json` 文件的 `includePath`  中配置. 或者使用`ctrl + shift + p` 呼出命令面板， 查找 `C/Cpp: Edit Configureations` 按钮中打开页面
2. 在windows 中， 应该配置 ` "name": "Win32",`  项下的 `includePath`(查找头文件目录) 和 `browse`(使用tag打开文件的目录， 就是跳转需要查找的目录), 其中 `windows` 目录配置需要转换反斜杠， 写法如下:

		C:\\downloads\\program\\migw\\lib\\gcc\\mingw32\\6.3.0\\include\\c++
		我的配置如下:
		 {
            "name": "Win32",
            "includePath": [
                "C:\\downloads\\program\\migw\\lib\\gcc\\mingw32\\6.3.0\\include\\c++",
                "${workspaceRoot}"
            ],
            "defines": [
                "_DEBUG",
                "UNICODE",
                "_UNICODE"
            ],
            "intelliSenseMode": "msvc-x64",
            "browse": {
                "path": [
                    "C:\\downloads\\program\\migw\\lib\\gcc\\mingw32\\6.3.0\\include\\c++",
                    "${workspaceRoot}"
                ],
                "limitSymbolsToIncludedHeaders": true,
                "databaseFilename": ""
            }
        }

		
		