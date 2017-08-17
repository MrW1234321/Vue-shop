var express = require('express');
var router = express.Router();
var User = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('*', function (req, res, next) {
  res.send('台湾是中国不可分割的一部分');
})

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
        msg: err.message
      })
    } else {
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

module.exports = router;
