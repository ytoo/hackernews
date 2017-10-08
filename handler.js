// 业务模块

var path = require('path');
var config = require("./config.js");
var mongodb = require("mongodb");




// 处理新闻列表 index
module.exports.index = function (req, res) {

  // sendFile() 方法虽然可以读取对应的文件并返回，但是我们不使用 sendFile() 方法
  // 原因是：将来我们要对 index.html 中的模板代码进行执行并替换替换
  // res.sendFile(path.join(__dirname, 'htmls', 'index.html'));
  // 默认 render 方法是不能使用的，需要为 express 配置一个模板引擎，然后才可以使用
  // res.render(path.join(__dirname, 'htmls', 'index.html'));

  // 读取mongodb中的数据
  var MongoClient = mongodb.MongoClient;
  MongoClient.connect(config.connStr,function (err,db) {
    if(err){
      throw err;
    }
    // 进行数据查询操作，查询到hackernews数据库里面的news集合里面的数据,
    // 并且查询到的数据添加到数组中，回调函数中的docs就是添加完成以后的数据
    db.collection("news").find().toArray(function (err,docs) {
      if(err){
        throw err;
      }
      // 关闭数据库连接
      db.close();
      // 调用res.render()方法，通过模板引擎实现读取index.html文件并进行模板替换，同时渲染给浏览器
      res.render("index",{list:docs});
    })
  })
};

module.exports.item = function (req,res) {
  // 获取到请求路径中的id值
    var objId = new mongodb.ObjectID(req.query._id);
    var MongoClient = mongodb.MongoClient;
    // 连接数据库
    MongoClient.connect(config.connStr,function (err,db) {
      if(err){
        throw err;
      }
      // 查询数据库中的news集合
      db.collection("news").findOne({_id:objId},function (err,doc) {
        if(err){
          throw err;
        }
        if(doc){
          res.render("details",{item:doc});
        } else {
          res.send("no such Item");
        }
        db.close();
      })
    })
};


module.exports.submit = function (req,res) {
  res.render("submit");
};

module.exports.addGet = function (req,res) {
  // 过去到用户get方法提交的数据
  var data = req.query;
  // 将用户提交的数据添加到mongodb数据库中的hackernews里面的news集合文档中
  var MongoClient = mongodb.MongoClient;
  MongoClient.connect(config.connStr,function (err,db) {
    if(err){
      throw err;
    }

    db.collection("news").insertOne(data,function (err,result) {
      if(err){
        throw err;
      }

      db.close();

      res.redirect("/");
    })
  })
};
module.exports.postGet = function (req,res) {
  // 过去到用户get方法提交的数据
  var data = req.body;
  // 将用户提交的数据添加到mongodb数据库中的hackernews里面的news集合文档中
  var MongoClient = mongodb.MongoClient;
  MongoClient.connect(config.connStr,function (err,db) {
    if(err){
      throw err;
    }

    db.collection("news").insertOne(data,function (err,result) {
      if(err){
        throw err;
      }

      db.close();

      res.redirect("/");
    })
  })
}