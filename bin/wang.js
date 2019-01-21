#! /usr/bin/env node

const program = require('commander');
const app = require('../lib/server');
const copy = require('../lib/copy');
const fs = require('fs');
const path = require('path');
const os = require('os');
const currentPath = process.cwd();
const {
  console_normal,
  console_warn,
  console_ok
} = require('../lib/common/tools')
const package = require('../package.json')
const version = package.version

// 版本命令
program.version(version);

program
  .command('help')
  .description('显示使用帮助')
  .action(function () {
    program.outputHelp();
  })

program
  .command('start [dir]')
  .description('启动静态服务器')
  .action(function () {
    // 获取用户端口
    let filepath = path.resolve(process.cwd(), 'config.json');
    let defaultPort = 3000;
   
    if (fs.existsSync(filepath)) {
      let CONFIG = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'config.json'))) || {};
      defaultPort = CONFIG.port || defaultPort;
      console_ok(`存在config.json文件，可以在文件中设置端口或者虚拟api接口`)
    } else {
      console_warn(`不存在config.json文件，使用默认设置`)
      console_warn(`关闭服务器，使用 "wang init" 可以生成默认配置文件 `)
    }

    let server = app.listen(defaultPort)
    console_normal(`静态服务器启动`)
    console_normal(`路径：${process.cwd()}`)
    console_normal(`端口：${defaultPort}`)
    let ipinfo = getipv4();
    if (ipinfo['本地连接']) {
      console_normal(`本地IP：${ipinfo['本地连接'][1].address}`)
    } else if (ipinfo['以太网']) {
      console_normal(`本地IP：${getipv4()['以太网'][1].address}`)
    }
    console_normal(`日志： `)
  })

program
  .command('init')
  .description('生成config.json文件模板')
  .action(function () {
    copy(path.resolve(__dirname, '../lib/config.json'), currentPath);
  })

program
  .command('edit [dir]')
  .description('启动测试页面，编辑api接口')
  .action(function () {
    console.log(`此功能敬请期待`)
  })

program.parse(process.argv);

// 获取IPV4的地址
function getipv4() {
  return os.networkInterfaces()
}