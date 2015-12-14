1. Unity支持两种类型的摄像机.  
	- Perspective(透视)
	- Orthographic(正交)  
	正交摄像机无论远近它的视口范围永远是固定的，投射的是一个类似长方体.但是透视摄像机是由原点向外扩散性发射，  
	也就是距离越远它的视口区域也就越大,投射的类似圆锥体。  
	更形象的可参考[雨松的图解](http://www.xuanyusong.com/archives/3036)。
2. ClearFlag:清除标记.有Skybox,solidColor,DepthOnly,Don't clear.每帧渲染结果叠加在下一帧之上.
3. Background:背景,将设置的颜色填充到屏幕的空白处.
4. CullingMusk:剔除遮罩,它会渲染所勾选层上面的对象.如有个Sprite是在UI层,并且CullingMusk选择的也是UI层就能显示该Sprite
5. Projection:投射方式,有Perspective(透视)和Orthographic(正交)两种,如1所示.
6. Field of View:视野范围(透视模式有效).
7. Size:大小(正交模式有效),设置相机区域的边框长度.类似正方形的边长.
8. Clipping Planes:裁剪平面,摄像机能够渲染的最近点与最远点.Near,近点,物体和摄像机距离比这个小就不会渲染,Far类似
9. View Rect:视图矩阵,设置图像在屏幕的显示位置,x,y设置相对屏幕位置,在[0,1]区间变动,w,h设置长宽,同理.可以设置画中画
10. Depth:深度,用于控制摄像机的渲染顺序,有多个摄像机时,较小深度的摄像机将被较大深度的摄像机所遮挡.
11. Rendering Path:渲染路径,指定摄像机的渲染方法. 主要影响光照和阴影. 
    - Use PlayerSettings
    - Vertex Lit:顶点光照.最低保真度的光照,不支持实时阴影的渲染路径.
    - Forward:快速渲染
    - DefferredLighting:延迟光照,仅在unity pro中可用,移动设备不支持
12. TargetTexture:目标纹理,将摄像机视图输出并渲染到屏幕.
13. HDR:高动态光照渲染
14. Occlusion Culling:遮挡剔除.当一个物体被其他物体遮挡住而不再摄像机的可视范围内不对其进行渲染.