var express = require('express'),
    router = express.Router(),
    TITLE_EDIT = "Edit",
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

    if (!req.query.create_date) {
        return res.render('edit_article', {title: TITLE_EDIT});
    } else {
        Article.getByCreateDate(req.query.create_date, function (err, result) {
            if (err) {
                res.locals.error = err;
                return  res.render('edit_article', {title: TITLE_EDIT});
            }
            res.locals.article = result;
            return res.render('edit_article', {title: TITLE_EDIT});
        });
    }
});

router.post('/', function (req, res) {
    var title = req.body['article_title'];
    var content = req.body['rich_text'];
    var date = moment().format("YYYY-MM-DD HH:mm:ss");

    if (req.body['create_date']) {
        Article.edit(req.body['create_date'], title, content,function(err,result){
            if (err) {
                return;
            }
            return res.redirect('/draft');
        });
    }else {
        var article = new Article({
            title: title,
            content: content,
            create_date: date,
            like: 0,
            view: 1
        });
        article.save(function (err, result) {
            if (err) {
                return;
            }
            return res.redirect('/draft');
        });
    }
});

module.exports = router;

