var fs = require('fs');
fs.readdir('./',function(err,files){
    console.log(files);
    fs.stat('./'+files[0],function(err,stats){
        console.log(stats.size);
        var d = new Date(stats.mtimeMs);
        console.log(d.getFullYear(),d.getMonth(),d.getDate());
    })
})