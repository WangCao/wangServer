const Koa = require('koa')
const app = new Koa()

const fs = require('fs');
const path = require('path');
const serve = require('koa-static');


// 获取配置文件及端口信息
let CONFIG = JSON.parse(fs.readFileSync(path.resolve(__dirname,'config.json'))) || {};
let port = CONFIG.port || 3000;

console.log(process.cwd())
// 启动静态路由
app.use(serve(process.cwd()));
// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })

app.listen(port);

console.log(`服务器已启动，监听端口${port}`);