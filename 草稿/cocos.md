1. 常用节点类如: CCScene, CCLayer, CCSprite, CCMenu.
2. 获取窗口大小
        
        auto winSize = Director::getInstance()->getWinSize();
        
3. 添加Label

        auto label = Label::createWithSystemFont("Loading...", "Arial", 36);
        m_scorelabel = Label::createWithTTF("0", "fonts/Marker Felt.ttf", 24);
        m_scorelabel->setAnchorPoint(Vec2(1, 0));
        m_scorelabel->setPosition(visibleSize.width - 10, 35);
        m_scorelabel->setTag(10);
        m_scorelabel->enableOutline(Color4B::BLACK, 1);
        addChild(m_scorelabel);

        
4. 异步加载图片:

        auto addTextureCallback = [ptexture_num](Texture2D* texture)
        {
            (*ptexture_num)++;
            log("load a texture async");
        };
        
        TextureCache::getInstance()->addImageAsync("jewel1.png", addTextureCallback);
        //addTextureCallback 是回调函数
        //加载成功后载入图片 
        //加载背景图
        m_bg = Sprite::createWithTexture(texturecache->getTextureForKey("bground1.png"));
        m_bg->setAnchorPoint(Vec2(0, 0));
        m_bg->setTag(100); //1-4个bg的tag默认设置为100，101，102，103
        m_bg->setOpacity(80); //设置透明度
        addChild(m_bg);
        
        
5. 音效管理

        SimpleAudioEngine::getInstance()->preloadEffect("crush.ogg");
        
6. 场景切换

        auto call = CallFunc::create([](){
			auto scene = GameScene::createScene();
			Director::getInstance()->replaceScene(TransitionFade::create(0.5, scene));
		});

		//等待一会儿，进入
		this->runAction(Sequence::create(DelayTime::create(0.51), call, nullptr));
        
6. 创建layer对象的方法

        class GameScene : public Layer
        {
        public:
            static Scene* createScene();
            CREATE_FUNC(GameScene);
        }
        
7. 创建按钮并设置按钮可见

        //测试用，刷新宝石阵列按钮
        auto updateMenu = MenuItemFont::create("Update Map", CC_CALLBACK_1(GameScene::onUpdateMenuCallback, this));
        updateMenu->setAnchorPoint(Vec2(1, 0));
        updateMenu->setPosition(visibleSize.width / 2, -visibleSize.height / 2);
        auto menu = Menu::create(updateMenu, nullptr);
        addChild(menu);
        menu->setEnabled(true);
        menu->setVisible(true);
        
8. 用户数据
        
        auto userdefault = UserDefault::getInstance();
        
        //查看路径，测试用
        log(userdefault->getXMLFilePath().c_str()); 
        
        //存储本次游戏分数
        char score_str[100] = {0};
        sprintf(score_str, "%d", m_score);
        userdefault->setStringForKey("LastScore", score_str);

        //存储最佳游戏分数
        auto bestscore = userdefault->getStringForKey("BestScore");
        if (m_score > atoi(bestscore.c_str()))
            userdefault->setStringForKey("BestScore", score_str);
            
9. 创建移动动画
    
        //移动开始设置宝石交换状态为真，移动结束再设置为假
        jewel->setSwapingState(true);
        auto move = MoveTo::create(MOVE_SPEED, Vec2(jewel->getX() * GRID_WIDTH, jewel->getY() * GRID_WIDTH));
        auto call = CallFunc::create([jewel](){
            jewel->setSwapingState(false);
        });
        jewel->runAction(Sequence::create(move, call, nullptr));