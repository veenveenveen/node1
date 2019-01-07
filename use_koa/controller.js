const fs = require('fs');

function addControllers(router, dir) {

    var files = fs.readdirSync(__dirname+`/${dir}`);
    var js_files = files.filter(function (file) {
        return file.endsWith('.js');
    });

    // 处理每个js文件
    for (const f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname+`/${dir}/`+f);
    
        for (const url in mapping) {
            if (url.startsWith('GET ')) {
                var path = url.substring(4);
                router.get(path, mapping[url]);
                console.log(`register URL mapping: GET ${path}`);
            } else if (url.startsWith('POST ')) {
                // 如果url类似"POST xxx":
                var path = url.substring(5);
                router.post(path, mapping[url]);
                console.log(`register URL mapping: POST ${path}`);
            } else {
                console.log(`无效的url`);
            }
        }
    }
}

module.exports = function (dir) {
    let controllers_dir = dir || 'controllers';// 如果不传参数，扫描目录默认为'controllers'
    let router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};