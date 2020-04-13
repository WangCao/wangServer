const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const ora = require("ora");

const console_info = (msg) => {
  console.log(chalk.green(`[INFO] ${msg}`));
};

const console_warn = (msg) => {
  console.log(chalk.yellow(`[WARN] ${msg}`));
};

const console_log = (msg) => {
  console.log(chalk.green(`[LOG] ${msg}`));
};

const console_err = (msg) => {
  console.log(chalk.red(`[ERROR] ${msg}`));
};

const console_ora = (msg, cb) => {
  const spinner = ora(chalk.green(`[LOADING] ${msg}`)).start();
  cb(spinner);
};
/**
 * 判断文件是否存在
 * @param {*} src
 * @param {*} errMsg 报错信息
 */
const exist = function (src, errMsg = "文件不存在") {
  let filepath = path.resolve(process.cwd(), src);
  if (!fs.existsSync(filepath)) {
    console_err(errMsg);
    return false;
  }
  return true;
};

module.exports = {
  console_info,
  console_warn,
  console_log,
  console_err,
  console_ora,
  exist,
};
