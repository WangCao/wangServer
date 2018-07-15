const fs = require('fs');
const chalk = require('chalk');
let options = {
  encoding: 'utf8',
}

/**
 * 
 * @param {String} src 需要复制文件的地址 
 * @param {String} dist 复制到 
 */
module.exports = function (src, dist) {
  // 判断文件是否存在
  if (!fs.existsSync(src)) {
    console.log(src)
    console.log(dist)
    console.log(chalk.bgRed("需要复制的文件不存在"));
    return
  }

  let readable = fs.createReadStream(src, options);
  let writable = fs.createWriteStream(dist, options);

  readable.pipe(writable);

  writable.on('finish', () => {
    console.log(chalk.yellow('文件已生成！'))
  })
}