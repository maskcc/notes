##0x00

	error: no matching function for call to ‘next(int&)’
         message_map_.erase(mm, std::next(mm));



	error: base operand of ‘->’ is not a pointer
         return pl->second;

	是由于引用了一个错误的头文件 #include <bits/stl_map.h>


##0x01 git 使用权限问题 [solve](https://stackoverflow.com/questions/6448242/git-push-error-insufficient-permission-for-adding-an-object-to-repository-datab)


	insufficient permission for adding an object to repository database .git/objects
    
##0x02 map 的 erase 的范围删除[solve](https://stackoverflow.com/questions/42139928/if-first-and-last-in-a-map-erase-range-are-equal-will-the-element-be-removed-or)
    
    map_.erase(begin(), end());
    是从 begin 到 end 的前一个位置进行删除, 如果begin 等于end , 则没有操作