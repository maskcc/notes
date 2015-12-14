1. Directional light:方向光源.可被放置在无穷远处,可以影响场景的一切游戏对象.最不耗费图形处理器的光源类型.
2. Point light:点光源.
3. Spotlight:聚光灯.在一个方向按照圆锥形的范围照射.
4. Area Light:区域广.面光源.无法应用于实时光照,适用于光照贴图烘焙.
5. Reflection Probe
6. Light Probe Group
7. 属性:
	- Type 1-4的光源类型选择
	- Baking 烘培,分为Realtime,Baked,Mixed
	- Range 光照范围
	- Color 光照颜色
	- Intensity 光照强度
	- Bounce Intensity
	- Shadow Type 阴影类型.No Shadows(关闭阴影),Hard Shadows(硬阴影),Soft Shadows(软阴影).
	- Resolution 分辨率控制阴影质量.
	- Bias 偏移.取值是0-0.5
	- Softness 柔化.控制阴影模糊采样区的偏移量.
	- Softness Fade 柔化淡出
	- DrawHalo 绘制光晕
	- Flare 耀斑/眩光
	- Render Mode:渲染模式,Auto, Important, Not Important
	- Culling Mask: 剔除遮蔽图层