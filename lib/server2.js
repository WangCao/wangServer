const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const path = require("path");

const tools = require("./common/tools");
const serve = require("koa-static");
const Router = require("koa-router");
const router = new Router();
const fs = require("fs");
const yaml = require("js-yaml");

let dir = path.join(__dirname, "./view");
let pageData = null;

app.use(
  views(dir, {
    extension: "ejs",
  })
);

function getData(filename) {
  let url = path.resolve(process.cwd(), filename);
  let content = fs.readFileSync(url, { encoding: "utf8" });
  let result = yaml.load(content);

  return result;
}

router.get("/htmlppt", async (ctx) => {
  let data = pageData || {};
  console.log(data);
  await ctx.render("htmlppt", {
    data,
  });
});

app.use(router.routes()).use(router.allowedMethods());

app.use(serve(dir));

function startServer(filename) {
  // filename = filename;
  pageData = getData(filename);
  app.listen(2020);
}

module.exports = startServer;
