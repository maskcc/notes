1. `ulimit -c` 为 0 时,当程序崩溃时不生成`core dump` 文件.
2. 使用`ulimit -c unlimited` 开启`core dump`功能,不限制大小.需要限制可设置为`ulimit -c 1024` 
3. 默认情况下，`core dump`生成的文件名为`core`，而且就在程序当前目录下。新的`core`会覆盖已存在的`core`。通过修改`/proc/sys/kernel/core_uses_pid`文件，可以将进程的`pid`作为作为扩展名，生成的`core`文件格式为`core.xxx`，其中xxx即为pid.
4. 通过修改`/proc/sys/kernel/core_pattern`可以控制core文件保存位置和文件格式。例如：将所有的`core`文件生成到`/corefile`目录下，文件名的格式为`core-命令名-pid-时间戳`. 

		echo "/corefile/core-%e-%p-%t" > /proc/sys/kernel/core_pattern