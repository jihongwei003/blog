var express = require('express'),
    router = express.Router(),
    crypto = require('crypto'),
    TITLE_LOGIN = 'Login',
    User = require('../models/User.js');

router.get('/', function (req, res) {
    if (req.session.admin_key) {
        res.locals.admin_key = req.session.admin_key;

        return res.render('login', {title: TITLE_LOGIN});
    } else {
        return res.redirect('/');
    }
});

router.post('/', function (req, res) {
    var userName = req.body['txtUserName'],
        userPwd = req.body['txtUserPwd'],
        isRem = req.body['chbRem'],
        md5 = crypto.createHash('md5');

    User.getUserByName(userName, function (err, results) {
        if (results == null) {
            res.locals.error = 'User is not found!';
            res.render('login', {title: TITLE_LOGIN});
            return;
        }

        userPwd = md5.update(userPwd).digest('hex');
        if (results.username != userName || results.userpass != userPwd) {
            res.locals.error = 'User name or password error!';
            res.render('login', {title: TITLE_LOGIN});
            return;
        }
        else {
            if (isRem) {
                res.cookie('isLogin', userName, { maxAge: 10000 });//记住密码后写入cookie，存在10秒
            }

            res.locals.username = userName;
            req.session.username = userName;

            res.redirect('/');
            return;
        }
    });
});

module.exports = router;
