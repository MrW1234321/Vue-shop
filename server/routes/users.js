var express = require('express');
var router = express.Router();
var User = require('../models/users');

// 注册接口
// router.post('/register', (req, res, next) => {
//   let param = {
//     userName: req.body.userName,
//     userPwd: req.body.userPwd
//   }
//   if (param.userName === '' || param.userPwd === '') {
//     res.json({
//       status: "1",
//       msg: "用户名或密码不能为空"
//     })
//     return;
//   }
// })

// 登录接口
router.post('/login', (req, res, next) => {
  // 接收的参数
  let param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  if (param.userName === '' || param.userPwd === '') {
    res.json({
      status: '1',
      msg: '用户名或密码不能为空'
    })
    return;
  }
  // 用户名匹配
  User.findOne(param, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }
    if (doc === null) {
      res.json({
        status: '1',
        msg: '用户名或密码错误'
      })
    } else {
      // 记录登录状态
      res.cookie('userId', doc.userId, {
        path: '/',
        maxAge: 240 * 60 * 60 * 1000
      })

      res.cookie('userName', doc.userName, {
        path: '/',
        maxAge: 240 * 60 * 60 * 1000
      })

      if (doc) {
        res.json({
          status: '0',
          msg: '',
          result: {
            userName: doc.userName
          }
        })
      }
    }
  })
})

// 判断当前用户是否登录
router.post('/checkLogin', (req, res, next) => {
  if (req.cookies.userId) {
    res.json({
      status: '0',
      msg: '已登录',
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

// 登出接口
router.post('/logout', (req, res, next) => {
  res.cookie('userId', '', {
    path: '/',
    maxAge: -1
  })
  res.cookie('userName', '', {
    path: '/',
    maxAge: -1
  })
  res.json({
    status: '0',
    msg: '',
    result: '退出成功'
  })
})

router.post('/cartList', (req, res, next) => {
  // 此处有安全漏洞，如果某个用户修改了cookies中的Id，便可以轻松获取别人的购物车列表
  // 以后需要增加一个与服务器端的验证
  let userId = req.cookies.userId;
  User.findOne({userId: userId}, (err, doc) => {
    console.log(doc);
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }
    if (doc === null) {
      res.json({
        status: '1',
        msg: '未登录'
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: doc.cartList
      })
    }
  })
})

router.post('/cartList/ editNum', (req, res, next) => {
  let userId = req.cookies.userId;
  let productId = req.param('productId');
})

router.get('*', (req, res, next) => {
  res.send('台湾是中国不可分割的一部分');
})

module.exports = router;
