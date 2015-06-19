var express = require('express'),
    router = express.Router(),
    TITLE_DETAIL = "Detail",
    Article = require('../models/Article.js'),
    Comment = require('../models/Comment.js');

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
        res.locals.error = "Error: no such article"
        return res.render('article_detail', {title: TITLE_DETAIL});
    } else {
        Article.getByCreateDate(req.query.create_date, function (err, result) {
            res.locals.article = result;

            Comment.getCommentsByArticle(req.query.create_date, function (err, result) {
                if (err) {
                    res.locals.error = err;
                    return res.render('article_detail', {title: TITLE_DETAIL});//FIXME dead cycle?
                }
                res.locals.comments = result;
                return res.render('article_detail', {title: TITLE_DETAIL});
            });
        });
    }
});

//FIXME is this function used?
//router.post('/', function (req, res) {
//    var title = req.body['article_title'];
//    var content = req.body['rich_text'];
//    var date = moment().format("YYYY-MM-DD HH:mm:ss");
//
//    if (req.body['create_date']) {
//        Article.edit(req.body['create_date'], title, content, function (err, result) {
//            if (err) {
//                return;//FIXME add error session
//            }
//            return res.redirect('/draft');
//        });
//    } else {
//        var article = new Article({
//            title: title,
//            content: content,
//            create_date: date
//        });
//        article.save(function (err, result) {
//            if (err) {
//                return;
//            }
//            return res.redirect('/draft');
//        });
//    }
//});

router.get('/like', function (req, res) {
    var create_date = req.query.create_date;

    Article.updateLikeByCreateDate(create_date, function (err, result) {
        if (err) {
            req.session.error = err;
            return res.redirect('/article_detail');
        }
        req.session.success = "Like article success!";
        return res.redirect('/article');
    });
});

router.get('/view', function (req, res) {
    var create_date = req.query.create_date;

    Article.updateViewByCreateDate(create_date, function (err, result) {
        if (err) {
            req.session.error = err;
        }
        return;
    });
});

module.exports = router;

