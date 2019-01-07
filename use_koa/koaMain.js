// add koa
const Koa = require('koa');
const app = new Koa();

// add bodyParser middleware:
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

// add controller middleware:
const controller = require('./controller');
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');

