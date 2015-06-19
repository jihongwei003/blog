var express = require('express'),
    router = express.Router(),
    TITLE_DRAFT = "Draft",
    Article = require('../models/Article.js'),
    moment = require("moment");

router.get('/', function (req, res) {
    if (req.session.admin_key) {
        res.locals.admin_key = req.session.admin_key;
    }

    if (req.session.username) {
        res.locals.username = req.session.username;
    }
    if (req.session.success) {
        res.locals.success = req.session.success;
        delete req.session.success;
    }
    if (req.session.error) {
        res.locals.error = req.session.error;
        delete req.session.error;
    }

    Article.getAllDraft(function (err, result) {
        res.locals.articles = result;

        res.render('draft', {title: TITLE_DRAFT});
    })
});

router.get('/publish', function (req, res) {
    var create_date = req.query.create_date;
    var publish_date = moment().format("YYYY-MM-DD HH:mm:ss");

    Article.publish(create_date, publish_date, function (err, result) {
        if (err) {
            req.session.error = err;
            return;
        }
        req.session.success = "Publish article success!";
        return res.redirect("/article");
    });
});

router.get('/delete', function (req, res) {
    var create_date = req.query.create_date;

    Article.delete(create_date, function (err, result) {
        if (err) {
            req.session.error = err;
            return;
        }
        req.session.success = "Delete draft success!";
        return res.redirect("/draft");
    });
});


module.exports = router;


