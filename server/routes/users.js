var express = require('express');
var router = express.Router();
var User = require('../models/users');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// 注册接口
// router.post('/register', function (req, res, next) {
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
//   console.dir(User.save)
// })

// 登录接口
router.post('/login', function (req, res, next) {
  // 接收的参数
  let param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  if (param.userName === '' || param.userPwd === '') {
    res.json({
      status: "1",
      msg: "用户名或密码不能为空"
    })
    return;
  }
  // 用户名匹配
  User.findOne(param, function (err, doc) {
    if (err) return handleError(err);
    if (doc === null) {
      res.json({
        status: "1",
        msg: "用户名或密码错误"
      })
    } else {
      // 记录登录状态
      res.cookie('userId', doc.userId, {
        path: '/',
        maxAge: 240 * 60 * 60
      })

      res.cookie('userName', doc.userName, {
        path: '/',
        maxAge: 240 * 60 * 60
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
router.post('/checkLogin', function (req, res, next) {
  if (req.cookies.userId) {
    res.json({
      status: '0',
      msg:"已登录",
      result: req.cookies.userName
    })
  } else {
    res.json({
      status: "1",
      msg: "未登录",
      result: ""
    })
  }
})

// 登出接口
router.post('/logout', function (req, res, next) {
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

router.get('*', function (req, res, next) {
  res.send('台湾是中国不可分割的一部分');
})

module.exports = router;
