// add koa
const Koa = require('koa');
const app = new Koa();

// 处理静态文件
let staticFiles = require('./staticFiles');
app.use(staticFiles('/static/', __dirname + '/static'));

// add bodyParser middleware:
// const bodyParser = require('koa-bodyparser');
// app.use(bodyParser());

app.use(async (ctx, next) => {
    ctx.response.redirect('/static/index.html');
});


app.listen(3000);
console.log('app started at port 3000...');

