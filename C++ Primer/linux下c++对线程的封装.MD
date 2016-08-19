1. 代码如下.[参考文章.该博客很值得学习](http://www.cnblogs.com/zxtp/p/4989613.html)

		namespace ThreadClass
		{
		/**
		 *类中对线程的封装
		 *http://www.cnblogs.com/zxtp/p/4989613.html
		 *
		 */
	    class ThreadBase
	    {
	        public:
	            void start()
	            {
	                pthread_create(&ThreadID, NULL, proc, (void *)this);
	                pthread_join(ThreadID, NULL);
	
	            }   
	
	            static void* proc(void *argc)
	            {   
	                ThreadBase *obj;
	                obj = static_cast<ThreadBase*>(argc);
	                obj->run(argc);
	            }   
	            virtual void run(void *argc)
	            {   
	                cout << "ThreadBase thread[" << hex << ThreadID << "]" << dec << endl; 
	            }
	            pthread_t ThreadID;
	    };
	
	    class NetFunc : public ThreadBase
	    {
	        public:
	            virtual void run(void *argc)
	            {
	                cout << "Thread NetFunc thread[" << hex << ThreadID << "]" << dec << endl;
	            }
	
	    };
	
	    void test()
	    {
	        ThreadBase *pProc = new NetFunc();
		}
	          
2. [linx线程详解ＩＢＭ文档 1.](https://www.ibm.com/developerworks/cn/linux/thread/posix_thread1/)   
	[linx线程详解ＩＢＭ文档 2.](https://www.ibm.com/developerworks/cn/linux/thread/posix_thread2/)     
	[linx线程详解ＩＢＭ文档 3.](https://www.ibm.com/developerworks/cn/linux/thread/posix_thread3/)       