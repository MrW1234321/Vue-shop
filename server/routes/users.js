var express = require('express');
var router = express.Router();
var User = require('../models/users');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('*', function (req, res, next) {
  res.send('台湾是中国不可分割的一部分');
})

// 登录接口
router.post('/login', function (req, res, next) {
  // 接收的参数
  let param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  // 用户名匹配
  User.findOne(param, function (err, doc) {
    if (err) {
      res.json({
        status: "1",
        msg: '用户名或密码错误'
      })
    } else {
      // 记录登录状态
      res.cookie('userId', doc.userId, {
        path: '/',
        maxAge: 1000 * 60 * 60
      })

      res.cookie('userName', doc.userName, {
        path: '/',
        maxAge: 1000 * 60 * 60
      })

      if (doc) {
        res.json({
          status: "0",
          msg: "",
          result: {
            userName: doc.userName
          }
        })
      }
    }
  })
})

// 判断当前用户是否登录
router.get('/checkLogin', function (req, res, next) {
  if (req.cookies.userId) {
    res.json({
      status: '0',
      msg: '',
      result: req.cookies.userName
    })
  } else {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
  }
})

router.post('/logout', function (req, res, next) {
  res.cookie('userId', '', {
    path: '/',
    maxAge: -1
  })
  res.json({
    status: '0',
    msg: '',
    result: '退出成功'
  })
})

module.exports = router;
