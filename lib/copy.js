const fs = require("fs");
stat = fs.stat;
const chalk = require("chalk");
let options = {
  encoding: "utf8",
};
const tools = require("../lib/common/tools");

/**
 *
 * @param {String} src 需要复制文件的地址
 * @param {String} dist 复制到
 */
module.exports = function (src, dist) {
  // 判断文件是否存在
  if (!fs.existsSync(src)) {
    tools.console_err("需要复制的文件不存在");
    return;
  }

  // 判断当前目录是否有config.json 文件
  if (fs.existsSync(`${dist}/config.json`)) {
    tools.console_err("当前文件夹已有config.json文件");
    return;
  }

  let readable, writable;
  stat(src, (err, st) => {
    if (err) {
      throw err;
    }

    if (st.isFile()) {
      readable = fs.createReadStream(src);
      writable = fs.createWriteStream(dist + "/config.json");
      readable.pipe(writable);
      writable.on("finish", () => {
        tools.console_warn("文件已生成！");
      });
    }
  });
};
