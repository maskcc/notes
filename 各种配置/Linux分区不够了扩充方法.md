[参考](http://blog.51cto.com/huangfu3342/1748256)
1. 扩展虚拟机硬盘
2. 过程

		1.  fdisk -l : 打印当前的磁盘分区表，
		2. fdisk /dev/sda   “sda 就是经过扩容的硬盘，为 SCSI 硬盘， IDE 类型硬盘对应为 hda 
		3. 输入m "显示帮助
		4. n    ” 命令 n 用于添加新分区 " , 选择主分区吧，则键入 p ；选择逻辑分区键入 l 。 
		5.   p               " 选择创建主分区 "
		6. 要创建的该分区为 sda3.  键入 3
		7. 回车， 回车
		8.  fdisk /dev/sda, m, t, 3, 8e, w
		9. reboot
		10. fdisk -l
		11. partprobe
		12. mkfs -t xfs /dev/sda3  如果主分区是 xfs 的就这么填， centos7后一般是xfs, 不然 mkfs.ext3 /dev/sda3
		13. lvs
		14. pvcreate /dev/sda3, 删除 pvremove
		15. vgextend centos_centos7 /dev/sda3 （其中是当前需要扩充的lvm组名，可以通过df -h查看，例如我的是： /dev/mapper/centos_centos7-root） 
		16. vgdisplay
		17. lvextend /dev/centos_centos7/root /dev/sda3
		18. xfs_growfs /dev/centos_centos7/root   （注意：CentOS和其他操作系统不一样，其他操作系统是resize2fs
		
		
具体操作:
VMWare虚拟机安装的应用多了，导致根目录空间不足，有没有办法可以将根目录空间进行扩充呢？
经过搜集各各资料，顺利解决问题，把服务器的空间由6G扩成8G。现将执行全过程总结如下，以供分享。
首先，介绍下大体的解决思路，要想扩充，必须要有一块新的空间来供使用。而对于VMWare虚拟机，我们只需要使用vmware自带的软件扩充下磁盘大小。
扩充磁盘，只意味着硬件条件得到满足。接下来就需要对新的磁盘空格进行合理的操作，来扩充我们需要的分区。
值得注意的是，这里我们基于LVM来操作的。如果您的环境不是LVM的，可以考虑改成LVM的，否则后文无需再读。具体执行过程将细细道来。

第一步、使用VMware工具扩容分配的硬盘空间



1、vmware 提供一个功能,在虚拟机配置里面硬盘中可以扩展，点击【扩展】按键，按照提示操作。

还可以用命令行的方式：在 windows 下运行 CMD , 转到 vmware 的安装目录,可执行vmware-vdiskmanager.exe；在Linux下，直接敲入vmware-vdiskmanager ,可执行该指令扩充使用的指令: vmware-vdiskmanager -x 8Gb CentOS7.vmdk

说明：要扩容的系统这时不能在运行 ，参数 "-x" 表示要扩展虚拟机硬盘空间，紧随其后的数字是要扩展到的大小 ，而非增加量 (本例为扩展到 16GB ，这是一个磁盘总量，包含了原先的磁盘容量 ) 。 最后是指定要操作的虚拟机磁盘的具体文件，要是路径名中有空格，必须以双引号括起来。按回车键开始执行，执行完毕，退出命令提示符窗口，重启 VMware ，会发现虚拟机硬盘空间已变成 8GB 了。

2、我们重启虚拟机后，发现虚拟机的硬盘是变成 16GB 了，但进入 linux 系统后，用 "df -h"查看发现硬盘空间还是原先那么大。 虽然已经扩大了磁盘，但是由于还没有经过分区，指定文件系统，所以 linux 操作系统无法识别。其实就相当于你的硬盘虽然大了，但是你并没有对其进行分区是一个道理。

第二步、使用Linux下的fdisk工具进行分区

首先，需要以root身份登录系统。

fdisk 命令： fdisk -l : 打印当前的磁盘分区表，这时我们可以看到磁盘的总量的确增加到8GB 了，但是分区只有以前的那几个原有的分区。

键入命令： fdisk /dev/sda   “sda 就是经过扩容的硬盘，为 SCSI 硬盘， IDE 类型硬盘对应为 hda ，是对该硬盘进行操作 ” 
键入 ：    m    “ 列出 fdisk 的帮助 ” 
我们在这里是要添加一个新分区，即将扩容出来的那部分做成一个新分区，这样才能被操作系统挂载识别。 
键入：     n    ” 命令 n 用于添加新分区 " 
此时， fdisk 会让你选择添加为逻辑分区呢（编号从 5 开始）还是主分区（编号 1 到 4 ）。

选择主分区吧，则键入 p ；选择逻辑分区键入 l 。 
我们选择主分区于是： 
键入：    p               " 选择创建主分区 "

此时， fdisk 会让你选择主分区的编号，如果已经有了主分区 sda1 ， sda2 ，那么编号就选3 ，即要创建的该分区为 sda3. 
键入：     3 
此时， fdisk 又会让你选择该分区的开始值这个就是分区的 Start 值（ start cylinder ）；这里最好直接按回车， 如果您输入了一个非默认的数字，可能会造成空间浪费；

对于分区的 End 值（end cylinder），同样直接按回车。这时候会显示出你新建分区的柱面范围和空间大小。

此时键入： w    表示" 保存所有并退出，分区划分完毕 "

我们的新建分区/dev/sda3，却不是LVM的。所以，接下来使用fdisk将其改成LVM的。

[root@CNGI-SIP6-BUPT ~]# fdisk /dev/sda
Command (m for help): m 
Command (m for help): t //改变分区系统id      
Partition number (1-4): 3 //指定分区号
Hex code (type L to list codes): 8e //指定要改成的id号，8e代表LVM。
Command (m for help): w

我们现在还不能用这个分区 , 因为我们没格式化。这时要重启系统就能够在 dev 下面看到 sda3 ，如果不重启不能进行下面操作。

重启后，在此查看fdisk -l
  Device Boot      Start         End      Blocks   Id  System
/dev/sda1   *        2048     1026047      512000   83  Linux
/dev/sda2         1026048    12582911     5778432   8e  Linux LVM
/dev/sda3        12582912    16777215     2097152   8e  Linux LVM

可以看到/dev/sda3已支持LVM。

第三步，使用工具partprobe让kernel读取分区信息 
[root@CentOS7 ~]#  partprobe
使用fdisk工具只是将分区信息写到磁盘，如果需要mkfs磁盘分区则需要重启系统，
而使用partprobe则可以使kernel重新读取分区 信息，从而避免重启系统

第四步、格式化该新添加的分区

[root@CentOS7 ~]#键入：  
mkfs -t xfs /dev/sda3    :注意我的系统是CENTOS，使用的是XFS格式（也可以是ext3)，最好与原有的保持格式一样。
或者 
mkfs.xfs /dev/sda3

来格式化指定的分区,依次类推,现在的系统大部分都是 xfs格式,如果你需要其它的,可以查看mkfs 的帮助。

到此为止，我们就新建了一个分区/dev/sda3，此时我们已经可以通过挂载，来使用这个新的空间。但是对于我，这并不能满足我的需求，因为服务器的服务程序是在根目录上的，目前根目录空间已经使用完毕，所以能把新建的分区使用在更目录上，分担根目录的空间，才能解决问题。

下面用到的理论是基于LVM的，如果不知道的话，建议稍微查些资料有助于理解。当然，一步步的跟我做，应该也没有问题。

第五步、扩充根分区

接着，使用vgextend 命令加到lvm组里面去，做如下操作：

[root@CentOS7 ~]# lvs
  LV   VG             Attr       LSize   Pool Origin Data%  Move Log Cpy%Sync Convert
  root centos_centos7 -wi-ao----   6.90g       （我已经扩容后的显示的，原显示在4.9）                                     
  swap centos_centos7 -wi-ao---- 616.00m                                          
[root@CentOS7 ~]#  pvcreate /dev/sda3      （删除使用：pvremove）
Physical volume "/dev/sda3" successfully created
[root@CentOS7 ~]#  vgextend centos_centos7 /dev/sda3 （其中是当前需要扩充的lvm组名，可以通过df -h查看，例如我的是： /dev/mapper/centos_centos7-root） 

Volume group "centos_centos7" successfully extended

[root@CentOS7 ~]# vgdisplay



 --- Volume group ---
  VG Name               centos_centos7
  System ID            
  Format                lvm2
  Metadata Areas        2
  Metadata Sequence No  7
  VG Access             read/write
  VG Status             resizable
  MAX LV                0
  Cur LV                2
  Open LV               2
  Max PV                0
  Cur PV                2
  Act PV                2
  VG Size               7.50 GiB
  PE Size               4.00 MiB
  Total PE              1921
  Alloc PE / Size       1921 / 7.50 GiB
  Free  PE / Size       0 / 0  
  VG UUID               zGtlQ0-Fh5X-Sblw-GSdw-qbmg-pc8X-SeJde4

   

第六步、扩充逻辑分区

下一步是扩展逻辑卷(Logic Volume)到新的卷上，先用“lvdisplay”指令看看目前已有的逻辑卷(Logic Volume)的情况

--- Logical Volume ---
  LV Path                /dev/centos_centos7/swap
  LV Name                swap
  VG Name                centos_centos7
  LV UUID                bHrQHE-Vm07-o0NZ-VUbv-c0nN-QM0L-R4IAF3

......
......

--- Logical Volume ---
  LV Path                /dev/centos_centos7/root
  LV Name                root
  VG Name                centos_centos7
  LV UUID                TS0f36-DuAH-y3XE-RLPW-7N39-EDAu-yzmpYK
......

可以看到我的硬盘目前只有2个逻辑卷，swap分区当然不用扩展



[root@CentOS7 ~]# lvextend /dev/centos_centos7/root /dev/sda3



第七步、扩充逻辑分区



最后将文件系统resize到新的逻辑卷上来，执行

 xfs_growfs /dev/centos_centos7/root   （注意：CentOS和其他操作系统不一样，其他操作系统是resize2fs





然后reboot系统，用fdisk -l /dev/sda就能看到扩展的分区。

附录：xfs文件系统特性及Ext2/3/4和xfs的文件系统操作命令列表

由于Redhat7中默认的文件系统开始使用xfs,总结下xfs的一些内容：

一、特性:

1、数据完全性

采用XFS文件系统，当意想不到的宕机发生后，首先，由于文件系统开启了日志功能，所以你磁盘上的文件不再会意外宕机而遭到破坏了。不论目前文件系统上存储的文件与数据有多少，文件系统都可以根据所记录的日志在很短的时间内迅速恢复磁盘文件内容。

2、传输特性

XFS文件系统采用优化算法，日志记录对整体文件操作影响非常小。XFS查询与分配存储空间非常快。xfs文件系统能连续提供快速的反应时间。笔者曾经对XFS、JFS、Ext3、ReiserFS文件系统进行过测试，XFS文件文件系统的性能表现相当出众。

3、可扩展性

XFS 是一个全64-bit的文件系统，它可以支持上百万T字节的存储空间。对特大文件及小尺寸文件的支持都表现出众，支持特大数量的目录。最大可支持的文件大 小为263 = 9 x 1018 = 9 exabytes，最大文件系统尺寸为18 exabytes。

XFS使用高的表结构(B+树)，保证了文件系统可以快速搜索与快速空间分配。XFS能够持续提供高速操作，文件系统的性能不受目录中目录及文件数量的限制。

4、传输带宽

XFS 能以接近裸设备I/O的性能存储数据。在单个文件系统的测试中，其吞吐量最高可达7GB每秒，对单个文件的读写操作，其吞吐量可达4GB每秒。