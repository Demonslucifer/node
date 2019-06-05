var url = require('url');
//引入controller模块
var controller = require('./controller');

var querystring = require("querystring");

var formidable = require('formidable');

var fs = require('fs');
module.exports = {
    //定义一个函数,接受https.js调用时传来的服务对象
    start: function (server) {
        //使用服务对象,绑定请求事件
        server.on('request', function (req, res) {
            //获取请求路径
            var urls = req.url;
            var url_obj = url.parse(urls, true);
            var id = url_obj.query.id;
            //判断请求方式
            if (req.method == 'GET') {

                if (urls == '/') {
                    //调用controller模块中的index方法,并将请求对象与响应对象作为实参传入
                    controller.index(req, res);
                } else if (url_obj.pathname == '/view/show') {
                    //获取get提交过来的参数
                    // var id = url_obj.query.id;
                    //调用controller模块中one方法,并将id与响应对象传递过去
                    controller.one(id, res);
                } else if (url_obj.pathname == '/del') {
                    // var id = url_obj.query.id;
                    controller.del(id, res, req);
                } else if (url_obj.pathname == '/view/edit') {
                    // var id = url_obj.query.id;
                    controller.edit(id, req, res);
                } else if (url_obj.pathname == '/view/add') {
                    controller.add(req, res);
                } else {

                    fs.readFile('.' + urls, function (err, data) {
                        res.end(data);
                    })
                }
            } else if (req.method == 'POST') {
                if (urls == '/edit') {
                    // var alldata = "";
                    // req.on("data", function (chunk) {
                    //     //每次传入一段chunk(数据,一次无法传输完毕,就服务另外的请求进行调度)
                    //     alldata += chunk;
                    // });
                    // req.on("end", function () {
                    //     //全服接收完毕,输出完整的数据
                    //     var alldatas = querystring.parse(alldata);
                    //     controller.edit(id, req, res, alldatas);
                    // });
                    var form = new formidable.IncomingForm();
                    form.uploadDir = "/node/haizei/img";
                    form.parse(req, function (err, formd, files) {
                        var imgpath = './public/img/' + files.img.name;
                        fs.rename(files.img.path, imgpath, function (err) {
                            if (!err) {
                                formd.img = imgpath;
                                controller.edit(id, req, res, formd);
                            }
                        })
                    })

                } else if (urls == '/add') {
                    // var alldata = "";
                    // req.on("data", function (chunk) {
                    //     //每次传入一段chunk(数据,一次无法传输完毕,就服务另外的请求进行调度)
                    //     alldata += chunk;  
                    // });
                    // req.on("end", function () {
                    //     //全服接收完毕,输出完整的数据
                    //     var alldatas = querystring.parse(alldata);
                    //     // console.log(alldatas);
                    //     controller.add(req, res, alldatas);
                    // });

                    var form = new formidable.IncomingForm();
                    form.uploadDir = "/node/haizei/img";
                    form.parse(req, function (err, formd, files) {
                        var imgpath = './public/img/' + files.img.name;
                        fs.rename(files.img.path, imgpath, function (err) {
                            if (!err) {
                                formd.img = imgpath;
                                controller.add(req, res, formd);
                            }
                        })
                    })
                }
            } else {
            }
        })
    }
}

