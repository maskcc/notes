1. 选择虚拟机设置, 选择网络适配器, 选择自定义, 特定虚拟网络, 下拉框选择桥接模式.
2. 编辑, 虚拟网络编辑器, 选中刚才下拉框选择的网卡, 选择桥接模式, 桥接到当前的实体网卡如 Realtek PCIe GBE Family Controller, 不要选择自动设置, 确定.
3. vim /etc/network/interfaces, 配置如下

        auto ens33 # 开机自动开启网卡 ens33,  
        iface ens33 inet static
        address 10.0.0.7 #虚拟ubuntu的IP地址, 要和windows在同一个局域网下
        gateway 10.0.0.1 #填写的gateway 要和windows的gateway 一样
        netmask 255.255.255.0 #子网掩码
        
4.设置dns

        vim /etc/resolv.conf
        nameserver 114.114.114.114 #将域名服务器设置为 114
        
5. 重启网络服务

        /etc/init.d/networking restart