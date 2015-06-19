var express = require('express'),
    router = express.Router(),
    crypto = require('crypto'),
    TITLE_REG = 'Register',
    User = require('../models/User.js');

router.get('/', function (req, res) {
    if (req.session.admin_key) {
        res.locals.admin_key = req.session.admin_key;

        return res.render('reg', {title: TITLE_REG});
    } else {
        return res.redirect('/');
    }
});

router.post('/', function (req, res) {
    var userName = req.body['txtUserName'],
        userPwd = req.body['txtUserPwd'],
        md5 = crypto.createHash('md5');

    userPwd = md5.update(userPwd).digest('hex');//format pwd to md5 type

    var newUser = new User({
        username: userName,
        userpass: userPwd
    });

    User.getUserByName(newUser.username, function (err, results) {
        if (err) {
            res.locals.error = err;
            res.render('reg', { title: TITLE_REG });
            return;
        }

        if (results != null && results['username'] == newUser.username) {
            res.locals.error = 'User has been registered!';
            res.render('reg', { title: TITLE_REG });
            return;
        }

        newUser.save(function (err, result) {
            if (err) {
                res.locals.error = err;
                res.render('reg', { title: TITLE_REG });
                return;
            }

            if (result['result']['ok'] == 1) {
                res.locals.success = 'Register success!';
            }
            else {
                res.locals.error = err;
            }
            res.render('reg', { title: TITLE_REG });
        });
    });
});

module.exports = router;
