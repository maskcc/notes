1. 数组下标是从0开始的
2. sheet下标是从1开始的
3. 获取`dict`的方法  
```vb
	Dim dic  
	setdic = CreateObject("Scripting.Dictionary")
```
4. `dict`添加数值方法  
```vb
	dic.Add key, value
```
5. 遍历`dict` 方法  
```vb
	For Each Data In dict
		MsgBox (dict.Item(Data) & ":" & Data)
	Next
```
6. vba用 `'&'`来连接字符串
7. 正则表达式使用方法  
```vb
	Dim regEx
	Set regEx = CreateObject("vbscript.regexp")
	regEx.Global = True
	regEx.Pattern = ".?[0-9A-F]+$"
	result = regEx.test(content) '验证content
```
8. 获取某张数据表(sheet)已经使用的行列数方法
```
	Dim rows, columns  
	rows = sheet.UsedRange.rows.Count  
	colums = sheet.UsedRange.Columns.Count
```
9. 获取某张数据表  
```
	Sheets(i)'根据id获取表  
	Sheets("map")'根据名称获取表  
    Sheets(i).name'获取表的名称
```
10. 获得数据表的某行内容  
```
	Sheets(i).Cells(c, 1)
	Sheets(i).Range("A17")
```
11. UBound获取数组长度(数组最后一位的下标,数组从0开始).1表示有两个数
12. 当函数从中间处理错误要退出可以使用 ` Exit Function `不要用Return，不然返回值会没有
13. 使用 Function关键字能有返回值，返回值应该赋给函数名。
