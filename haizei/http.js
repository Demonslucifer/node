var http = require('http');
var server = http.createServer();
server.listen(7500, function () {
    console.log('服务已启动')
});
server.on('request', function (req, res) {
    //     if(req.method=='GET'){
         var fs = require('fs');
    //     fs.readFile('./img/laopo.jpg',function(err,data){
    //         res.end(data);
    //     })
    // }else{
    //     res.end('0');
    // }
    console.log(req.url)
    if (req.url == '/') {
        fs.readFile('./cjk.html',function(err,data){
            res.end(data);
        })
    }else{
        fs.readFile('.'+req.url,function(err,data){
            res.end(data);
        })
    }
})


