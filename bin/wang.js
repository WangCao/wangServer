#! /usr/bin/env node

const program = require("commander");
const app = require("../lib/server");
const copy = require("../lib/copy");

const fs = require("fs");
const path = require("path");
const os = require("os");

const open = require("open");

const currentPath = process.cwd();

const package = require("../package.json");

const tools = require("../lib/common/tools");

// 版本命令
program.version(package.version);

program
  .command("help")
  .description("显示使用帮助")
  .action(function() {
    program.outputHelp();
  });

program
  .command("start [dir]")
  .description("启动静态服务器")
  .action(async function() {
    // 获取用户端口
    let filepath = path.resolve(process.cwd(), "config.json");
    let port = 3000;
    fs.access(filepath, fs.constants.F_OK, async err => {
      if (err) {
        // 文件不存在
        tools.console_warn(`不存在config.json文件，使用默认设置`);

        tools.console_warn(
          `关闭服务器，使用 "wang init" 可以生成默认配置文件 `
        );
      } else {
        // 文件存在
        let CONFIG =
          JSON.parse(
            fs.readFileSync(path.resolve(process.cwd(), "config.json"))
          ) || {};
        port = CONFIG.port || 3000;

        tools.console_info(
          `存在config.json文件，可以在文件中设置端口或者虚拟api接口`
        );
      }
      let server = app.listen(port);
      tools.console_info(`静态服务器启动`);
      tools.console_info(`路径：${process.cwd()}`);
      let ip = getipv4();
      tools.console_info(`IP：${ip}`);
      tools.console_info(`端口：${port}`);
      // 浏览器打开
      await handleOpen(`http:${ip}:${port}`);
      tools.console_info(`使用默认浏览器打开`);
      tools.console_log(`日志： `);
    });
  });

program
  .command("init")
  .description("生成config.json文件模板")
  .action(function() {
    copy(path.resolve(__dirname, "../lib/config.json"), currentPath);
  });

program
  .command("edit [dir]")
  .description("启动测试页面，编辑api接口")
  .action(function() {
    console.log(`此功能敬请期待`);
  });

program
  .command("stat")
  .description("统计代码行数")
  .action(function() {
    // 获取命令行参数
    let parm = process.argv.splice(3);
    // 第一个参数是路径
    let rootPath = parm[0];
    // 后面的所有参数都是文件后缀
    let types = parm.splice(1);
    // 需要过滤的文件夹
    let filter = ["./node_modules"];
    // 统计结果
    let num = 0;

    // 获取行数
    async function line(path) {
      let rep = await fs.readFileSync(path);
      rep = rep.toString();
      let lines = rep.split("\n");
      console.log(path + " " + lines.length);
      num += lines.length;
    }

    // 递归所有文件夹统计
    async function start(pt) {
      let files = fs.readdirSync(pt);
      files
        .map(file => {
          return `${pt}/${file}`;
        })
        .forEach(file => {
          let stat = fs.statSync(file);
          if (stat.isDirectory()) {
            if (filter.indexOf(pt) != -1) {
              return;
            }
            start(file);
            return;
          }
          let ext = path.extname(file);
          if (types.indexOf(ext) != -1) {
            line(file);
          }
        });
    }

    const stat = async () => {
      await start(rootPath);
      console.log(`总代码行数：${num}`);
    };

    stat();
  });

program.parse(process.argv);

// 获取IPV4的地址
function getipv4() {
  let interfaces = os.networkInterfaces();
  for (let key in interfaces) {
    for (let item2 of interfaces[key]) {
      if (!item2.internal && item2.family === "IPv4") {
        return item2.address;
      }
    }
  }
  tools.console_warn("未能识别本机IP地址，使用默认IP: 127.0.0.1");
  return "127.0.0.1";
}

async function handleOpen(path) {
  await open(path);
}
