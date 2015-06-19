var express = require('express'),
    router = express.Router(),
    TITLE_ARTICLE = "Article",
    Article = require('../models/Article.js');

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

    Article.getAll(function (err, result) {
        res.locals.articles = result;

        res.render('article', {title: TITLE_ARTICLE});
    })

});

router.get('/delete', function (req, res) {
    var create_date = req.query.create_date;

    Article.delete(create_date, function (err, result) {
        if (err) {
            req.session.error = err;
            return;
        }
        req.session.success = "Delete article success!";
        return res.redirect("/article");
    });
});

module.exports = router;

