var fs = require('fs');
var moment = require('moment');
fs.readdir('./',function(err,files){
    fs.stat('./'+files[0],function(err,stats){
        console.log(stats.size);
        console.log(moment(stats.mtimeMs).format("YYYY-MM-DD"))
    })
})