1. 有个非常奇怪的问题, 发现map为空时, map.begin() 会 != map.end(); 此函数在一个类中调用. 如下:

		class TaskConfiger{
			public:
				map<int, int> tmap;
		};
		class Loader{
			public:
				Loader(){ conf = new TaskConfiger;}
				Loader(int c): count(c){}
			private:
				TaskConfiger *conf;
				int count;
		}

		函数调用时:
		Loader load = new Loader(5);
		auto it = load.begin();
		for(; it != load.end(); ++it){} //运行到这会没有没有操作
		