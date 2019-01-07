// add koa
const Koa = require('koa');
const app = new Koa();

// 处理静态文件
let staticFiles = require('./staticFiles');
app.use(staticFiles('/static/', __dirname + '/static'));

// add bodyParser middleware:
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

//
let templating = require('./templating');
const isProduction = process.env.NODE_ENV === 'production';
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

// add controller middleware:
const controller = require('./controller');
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');

