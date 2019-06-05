//引入http模块
var http = require('http');
//创建服务对象
var server = http.createServer();
//监听端口
server.listen(7501,function(){
    console.log('阿帕克斯服务器启动成功,请访问 http://127.0.0.1:7501');

})
//引入路由模块
var router = require('./router');
//调用路由模块中的start方法,并将服务对象作为实参传入
router.start(server);