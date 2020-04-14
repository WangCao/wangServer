# wangserver
一个基于KOA，小巧快速，可以自定义接口的服务器命令行工具,主要功能：
 * 设置指定目录为静态服务器，避免一些简单页面需要打开Nginx等调试
 * 显示页面调用日志，便于调试
 * 显示本地服务器相关信息，便于调试
 * 方便自定义端口
 * 方便自定义接口及接口数据，用于调试
 * 基于webslider生成 html ppt
### 如何使用
```sh
$ npm install wangserver -g
```
请确保[Node.js](https://nodejs.org/en/)版本大于8.0


### 使当前目录为服务器，命令行进入目录，输入以下回车
```sh
$ wang start
```

### 初始化config.json 文件，命令行进入目录，输入以下回车
```sh
$ wang init
```
生成`config.json`文件，用于设置服务器端口
```json
{
  "port": "3000",      // 端口
  "apilist": [{        // 设置数据接口列表
    "url": "/api/1",   // 设置接口url
    "res": {           // 设置接口返回数据，支持跨域
      "name": "wangcao",
      "age": "18",
      "work": "code farmer"
    },
    "cookies": [{      // 设置cookie
      "name": "user",
      "value": "wangcao"
    }]
  }]
}
```
如果需要获取此数据，请ajax请求 `http://localhost:3000/api/1`接口获取，目前只支持GET请求。

### 生成 HTML PPT
```sh
wang ppt {配置文件名}
```
例子，在test文件夹中：
```sh
wang ppt a.yml
```


### 帮助 
获取帮助信息
```sh
$ wang -h
```
