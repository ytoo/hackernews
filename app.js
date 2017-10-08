// app.js 模块职责： 负责启动服务

// 1. 加载 express 模块
var express = require('express');
// 加载 config.js 模块
var config = require('./config.js');
// 加载路由模块
var router = require('./router.js');
var path = require("path");

// 加载body-parser模块
var bodyParser = require("body-parser");

// 2. 创建 app 对象
var app = express();

// 配置使用ejs模板引擎,修改默认查找的模板文件的额后缀名为.html
// 设置模板文件的存放路径
app.set("views",path.join(__dirname,"htmls"));
// 创建一个自己的模板引擎，用来识别后缀名为.html的模板文件
app.engine("html",require("ejs").renderFile);
// 使用刚才自己创建的模板引擎
app.set("view engine","html");


app.use(bodyParser.urlencoded({extended:false}));


// 3. 注册路由
// 设置app 与 router 相关联
// app.use('/', router);
app.use(router);

// 4. 启动服务
app.listen(config.port, function () {
  console.log('http://localhost:' + config.port);
});