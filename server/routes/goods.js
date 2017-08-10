var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');

// 链接数据库
mongoose.connect('mongodb://127.0.0.1:27019/goods')
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
router.get('/list', function (req,res,next) {
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
  let goodModel = Goods.find(param);
  goodModel.sort({'salePrice':sort})
  goodModel.exec({}, function (err, docs) {
    console.log(docs)
    res.json({
      status: '0',
      result: docs
    })
  })
})

module.exports = router;
