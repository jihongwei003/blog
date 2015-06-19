var express = require('express');
var router = express.Router();
var Picture = require('../models/Picture.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.session.admin_key) {
        res.locals.admin_key = req.session.admin_key;
    }

    if (req.cookies.isLogin) {
        req.session.username = req.cookies.isLogin;
    }
    if (req.session.username) {
        res.locals.username = req.session.username;
    }

    res.render('index', {title: "Home"});
});

module.exports = router;
