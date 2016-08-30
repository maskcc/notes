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
7. service_snlua.c 中的 init_cb 函数中会注册 skynet_context 的值到注册表LUA_REGISTRYINDEX.
	在 lua-skynet.c luaopen_skynet_core 中会获取该值  lua_getfield

	lua_pushlightuserdata(L, ctx);
	lua_setfield(L, LUA_REGISTRYINDEX, "skynet_context");  //ctx为常驻内存的一个变量, 将其设置为轻量用户数据

	luaL_newlibtable(L, l);
	lua_getfield(L, LUA_REGISTRYINDEX, "skynet_context");
	struct skynet_context *ctx = lua_touserdata(L,-1);
	if (ctx == NULL) {
		return luaL_error(L, "Init skynet context first");
	}
	luaL_setfuncs(L,l,1);  //最后一个参数为一, 表示将栈上的一个参数(ctx)设置为所有函数公用的upvalue

	struct skynet_context * context = lua_touserdata(L, lua_upvalueindex(1));  //获取upvalue

8. skynet_command 会执行 REG等函数
9. init_cb snlua调用脚本的函数
	skynet_send(ctx, 0, handle_id, PTYPE_TAG_DONTCOPY,0, tmp, sz);