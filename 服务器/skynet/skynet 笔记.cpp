1. socket_server.c::forward_message_tcp
	防止内存碎片吗

	if (n == sz) {
		s->p.size *= 2;
	} else if (sz > MIN_READ_BUFFER && n*2 < sz) {
		s->p.size /= 2;
	}

2. socket.lua,socket.listen, socketdriver.listen, luaopen_socketdriver:llisten,skynet_socket_listen,socket_server_listen,send_request ::::pipe
request_package,open_socket,request_open, 		ctrl_cmd, socket_server_poll
opaque = ctx->handle; 

3.  调用函数
luaskynet.c:lsend();
luaopen_skynet_core  skynet.core
--skynet.call(".launcher", "lua" , "LAUNCH", "snlua", name, ...)
function skynet.call(addr, typename, ...)
	local p = proto[typename]
	local session = c.send(addr, p.id , nil , p.pack(...))
	if session == nil then
		error("call to invalid address " .. skynet.address(addr))
	end
	return p.unpack(yield_call(addr, session))
end

4. struct skynet_context * 
skynet_context_new(const char * name, const char *param);
生成程序上下文时执行
skynet_start, bootstrap, cmd_launch
skynet_main.c 中会调用 skynet_start.
_open_sym 会创建服务 如mod->create = dlsym(mod->module, tmp);  执行snlua_create函数
5. cmd_launch 启动新服务
6. https://mrvon.github.io/post/skynet_server_start/