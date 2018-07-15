const Koa = require('koa')
const app = new Koa()

const fs = require('fs');
const path = require('path');
const serve = require('koa-static');
const chalk = require('chalk');

const Router = require('koa-router');
const router = new Router();



// 获取配置文件及端口信息
if (fs.existsSync(path.resolve(process.cwd(), 'config.json'))) {
  let CONFIG = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'config.json'))) || {};
  if (CONFIG.apilist && CONFIG.apilist.length !== 0) {
    let apis = CONFIG.apilist;
    apis.forEach((item, index) => {
      router.get(item.url, (ctx, next) => {
        ctx.body = item.res
        next()
      })
    });
    // 启用配置路由
    app
      .use(router.routes())
      .use(router.allowedMethods());
  }
}

// 启动静态路由
app.use(serve(process.cwd()));
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(chalk.dim(`${ctx.method} ${ctx.url} - ${ms}ms`))
})

// console.log(`服务器已启动，监听端口${port}`);

module.exports = app;