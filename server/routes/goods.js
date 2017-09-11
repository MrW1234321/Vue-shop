var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');

// 链接数据库
mongoose.connect('mongodb://127.0.0.1:27019/shop', {useMongoClient: true});
// 当数据库连接成功的时候触发
mongoose.connection.on('connected', function () {
  console.log('Mongodb connect success');
})
// 当数据库连接失败的时候触发
mongoose.connection.on('error', function () {
  console.log('Mongodb connect failed');
})
// 当数据库失去连接的时候
mongoose.connection.on('disconnected', function () {
  console.log('Mongodb disconnect');
})
// 商品显示
router.get('/list', function (req,res,next) {
  let page = req.param('page');
  let pagesize = parseInt(req.param('pagesize'));
  let size = page * pagesize;
  let sort = req.param('sort');
  let priceLevel = req.param('priceLevel');
  let priceGt = '', priceLte = '';
  let param = {};
  if (priceLevel != 'all') {
    switch (priceLevel) {
      case '0': priceGt = 0; priceLte = 100;break;
      case '1': priceGt = 100; priceLte = 500;break;
      case '2': priceGt = 500; priceLte = 1000;break;
      case '3': priceGt = 1000; priceLte = 5000;break;    
    }

    param = {
      salePrice: {
        $gt: priceGt,
        $lte: priceLte
      }
    }
  }
  let goodModel = Goods.find(param).limit(pagesize).skip(size);
  goodModel.sort({'salePrice':sort})
  goodModel.exec({}, function (err, docs) {
    res.json({
      status: '0',
      result: docs
    })
  })
})
// 添加到购物车
router.post('/addCart', function (req, res, next) {
  if (req.cookies.userId) {
    var userId = req.cookies.userId;
    console.log('测试');
  } else {
    console.log('测试2');
    res.json({
      status: "1",
      msg: '用户未登录'
    });
  }

  let productId = req.body.productId;
  var User = require('../models/users');

  User.findOne({userId: userId}, function (err, userDoc) {
    let goodItem = '';
    userDoc.cartList.forEach(function (item) {
      if (item.productId == productId) {
        goodItem = item;
        item.productNum++;
      }
    })

    if (goodItem) {
      userDoc.save(function (err3, doc3) {
        if (err3) {
          res.json({
            status: "1",
            msg: err.message
          })
        } else {
          res.json({
            status: "0",
            result: "商品数量添加成功！"
          })
        }
      })
    } else {
      Goods.findOne({productId: productId}, function(err1, goodsDoc) {
        goodsDoc.productNum = 1;
        userDoc.cartList.push(goodsDoc);
        userDoc.save(function (err2, doc2) {
          if (err2) {
            res.json({
              status: "1",
              msg: err.message
            })
          } else {
            res.json({
              status: "0",
              msg: "",
              result: "此商品第一次加入购物车!"
            })  
          }
        })
      })
    }
  })
})


module.exports = router;
