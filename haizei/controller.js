//引入fs模块
var fs = require('fs');
//引入模板引擎
var art = require('art-template');
//定义默认路径
art.defaults.root = './';
//引入model模块
var model = require('./model');

var querystring = require("querystring");

module.exports = {
    index: function (req, res) {


        //调用model模块中的cha方法,并将一个函数作为实参传过去,该函数又用一个形参来接受调用者传入的数据
        // model.cha(function(data){
        //     // console.log(data);
        //     //将数据与HTML页面混编
        //     var htData = art('./view/index.html',{info:data})
        //     //将混编文件发送到浏览器
        //     res.end(htData);

        // });
        model.table('users').select(function (data) {
            var htData = art('./view/index.html', { info: data })
            //将混编文件发送到浏览器
            res.end(htData);
        });

        //调用fs模块中的readfile方法,读取view下的index.html文件并将文件内容响应给浏览器并断开连接
        // fs.readFile('./view/index.html',function(err,data){
        //     res.end(data);
        // })
    },
    one: function (id, res) {
        // model.find(id,function(info){
        //     var oneinfo = art('./view/show.html',{info:info});
        //     res.end(oneinfo);
        // })
        model.where('id=' + id).table('users').select(function (info) {
            var oneinfo = art('./view/show.html', { info: info[0] });
            // console.log(info);
            res.end(oneinfo);
        })
    },
    del: function (id, res, req) {
        // console.log(id);
        model.where('id=' + id).table('users').del(function (backdata) {
            if (backdata.affectedRows >= 1) {
                var s = '<script>alert("删除成功");location.href="/"</script>'
                res.setHeader('Content-type', 'text/html;charset=utf-8');
                res.end(s);
            }
        });
    },
    edit: function (id, req, res, alldata) {
        if (!alldata) {
            model.where('id=' + id).table('users').select(function (backdata) {
                //将数据与页面整合
                var html = art('./view/edit.html', { info: backdata });
                res.end(html);
            });
        } else {
            // console.log(alldata);
            var str = '';

            for (var key in alldata) {
                // console.log(key);
                if (key == 'id') { continue }

                str += key + '=' + "\'" + alldata[key] + "\'" + ',';
                // console.log(str);
            }
            str = str.substr(0, str.length - 1);

            model.where('id=' + alldata.id).table('users').edit(str, function (data) {
                if (data.changedRows >= 1) {
                    var s = '<script>alert("修改成功");location.href="/";</script>';
                    res.setHeader('Content-type', 'text/html;charset=utf-8');
                    res.end(s);
                }
            });
        }
    },
    add: function (req, res, alldata) {
        if (!alldata) {
            fs.readFile('./view/add.html', function (err, data) {
                res.end(data);
            })
        } else {
            var str = '';
            str += "null,"
            for (var key in alldata) {
                // console.log(key);
                if (key == 'id') { continue }
                str += "\'" + alldata[key] + "\'" + ',';
                // console.log(str);
            }
            str = str.substr(0, str.length - 1);
            model.table('users').add(str, function (data) {
                if (data.affectedRows >= 1) {
                    var s = '<script>alert("添加成功");location.href="/";</script>';
                    res.setHeader('Content-type', 'text/html;charset=utf-8');
                    res.end(s);
                }
            })
        }

    }
}
