var express = require('express'),
    router = express.Router(),
    TITLE_MESSAGE = 'Message',
    pageSize = 10,
    current = 1,
    Message = require('../models/Message.js'),
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

    if (req.query.page) {
        current = req.query.page;
    }
    res.locals.pagesize = pageSize;
    res.locals.currentpage = current;

    Message.getCount(function (err, result) {
        if (err) {
            res.locals.error = err;
            res.render('message', {title: TITLE_MESSAGE});
            return;
        }
        res.locals.dataCount = result;

        Message.getMessagesPerPage(pageSize, current, function (err, result) {
            if (err) {
                res.locals.error = err;
                res.render('message', {title: TITLE_MESSAGE});
                return;
            }
            res.locals.allMessages = result;

            res.render('message', {title: TITLE_MESSAGE});
        });
    });


});

router.post('/', function (req, res) {
    var nickname = req.body['nickname'],
        email = req.body['email'],
        website = req.body['website'],
        content = req.body['content'];

    var reply = req.body['reply'];

    var date = moment().format("YYYY-MM-DD HH:mm:ss");
    var message = new Message({
        'date': date,
        'nickname': nickname,
        'email': email,
        'website': website,
        'content': content,
        'replyTo': reply
    });

    message.save(function (err, result) {
        if (err) {
            req.session.error = err;
            return;
        }
//        console.log(result['result']);
        req.session.success = "Declare message success!";
        return res.redirect('/message');
    });

});

router.get('/delete', function (req, res) {
    var date = req.query.date;

    Message.deleteByDate(date, function (err, result) {
        if (err) {
            req.session.error = err;
            return;
        }
        req.session.success = "Delete message success!";
        return res.redirect('/message');
    });

});


module.exports = router;

