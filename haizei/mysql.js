    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '333666',
        database: 'node'
    });
    con.connect();
    var sql = "select * from users";
    con.query(sql, function (err, data) {
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].name);
        }
    })

    con.end();