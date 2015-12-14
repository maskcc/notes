1. 顶点照明渲染(Vertex Lit Rendering Path):最快的渲染路径并有最广泛的硬件支持,但是不支持大部分的逐像素渲染效果:阴影,法线贴图,灯光这招,高精度高光.
2. 正向渲染路径(Forward Rendering Path):正向着色,不支持Point light, Spot light类型光源的阴影.
3. 延时光照(Deferred Lighting):有着最高保真度的光照和阴影的渲染路径.  
具体参看[圣典](http://game.ceeger.com/Manual/RenderingPaths.html).