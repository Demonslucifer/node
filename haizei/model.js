//引入mysql模块
var mysql = require('mysql');
//创建连接对象
var connection = mysql.createConnection({
    //主机IP地址
    host: '127.0.0.1',
    //用户名
    user: 'root',
    //用户密码
    password: '333666',
    //本次连接的数据库名
    database: 'node'
})
//连接数据库
connection.connect();
module.exports = {
    //定义一个cha方法并使用c来接收调用者传来的函数实参
    // cha:function(c){
    //     //使用连接对象的query方法查询数据库
    //     connection.query('select * from users',function(err,backdata){
    //         //调用c函数并将查询到的数据作为实参传回去
    //         c(backdata);
    //     })
    // },
    // find:function(id,a){
    //     connection.query('select * from users where id='+id,function(err,data){
    //         a(data);
    //     })
    // },
    wh: '',
    where: function (wheres) {
        this.wh = wheres;
        return this;
    },
    tb: '',
    table: function (tables) {
        this.tb = '`' + tables + '`';
        return this;
    },
    select: function (callbackFun) {
        if (this.tb != '') {
            if (this.wh != '') {
                var sql = 'select * from ' + this.tb + ' where ' + this.wh;
                this.wh = '';
                // this.tb='';
            } else {
                var sql = 'select * from ' + this.tb;
                // this.tb='';
            }
            this.tb = '';
        }

        connection.query(sql, function (err, data) {
            // console.log(data);
            callbackFun(data);
        })
    },
    del: function (d) {
        // console.log(id);
        if (this.tb != '') {
            if (this.wh != '') {
                var sql = 'delete from ' + this.tb + ' where ' + this.wh;
                this.wh = '';

            }
            this.tb = '';
        }

        connection.query(sql, function (err, data) {
            d(data);
        })
    },
    edit: function (str, d) {
        if (this.tb != '') {
            if (this.wh != '') {
                var sql = "update " + this.tb + " set " + str + " where " + this.wh;
                this.wh = '';

                // console.log(sql);

            }
            this.tb = '';
        }

        connection.query(sql, function (err, data) {
            d(data);
            // console.log(data);
        })
    },
    add: function (str, d) {
        if (this.tb != '') {
            var sql = "insert into " + this.tb + " values(" + str + ")";
            this.tb = '';
        }
        // console.log(sql);
        connection.query(sql, function (err, data) {
            d(data);
            // console.log(data);
        })
    }


}