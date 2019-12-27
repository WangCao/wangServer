const chalk = require("chalk");

const console_info = msg => {
  console.log(chalk.green(`[INFO] ${msg}`));
};

const console_warn = msg => {
  console.log(chalk.yellow(`[WARN] ${msg}`));
};

const console_log = msg => {
  console.log(chalk.green(`[LOG] ${msg}`));
};

const console_err = msg => {
  console.log(chalk.red(`[ERROR] ${msg}`));
};

module.exports = {
  console_info,
  console_warn,
  console_log,
  console_err
};
