var express = require('express'),
    router = express.Router(),
    TITLE_COMMENT = 'Comment',
    Comment = require('../models/Comment.js'),
    moment = require("moment");

router.post('/', function (req, res) {
    var article = req.body['article'],
        nickname = req.body['nickname'],
        email = req.body['email'],
        website = req.body['website'],
        content = req.body['content'];

    var reply = req.body['reply'];

    var date = moment().format("YYYY-MM-DD HH:mm:ss");
    var comment = new Comment({
        'article': article,
        'date': date,
        'nickname': nickname,
        'email': email,
        'website': website,
        'content': content,
        'replyTo': reply
    });

    comment.save(function (err, result) {
        if (err) {
            req.session.error = err;
            return;
        }
        req.session.success = "Declare comment success!";
        return res.redirect('/article_detail?create_date=' + article);
    });

});

router.get('/delete', function (req, res) {
    var date = req.query.date,
        article = req.query.article;

    Comment.deleteByDate(date, function (err, result) {
        if (err) {
            req.session.error = err;
            return;
        }
        req.session.success = "Delete comment success!";
        return res.redirect('/article_detail?create_date=' + article);
    });
});


module.exports = router;

