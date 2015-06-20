var express = require('express'),
    router = express.Router(),
    TITLE_PHOTO = 'Photo',
    pageSize = 9,
    current = 1,
    FilesOnServer = require('../models/FilesOnServer.js'),
    Picture = require('../models/Picture.js'),
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

    Picture.getCount(function (err, result) {
        if (err) {
            res.locals.error = err;
            res.render('photo', {title: TITLE_PHOTO});
            return;
        }
        res.locals.dataCount = result;

        Picture.getPicturesPerPage(pageSize, current, function (err, result) {
            if (err) {
                res.locals.error = err;
                res.render('photo', {title: TITLE_PHOTO});
                return;
            }
            res.locals.allPhotoes = result;

            res.render('photo', {title: TITLE_PHOTO});
        });
    });


});

router.post('/upload', function (req, res) {
    var file = new FilesOnServer();
    file.upload(req, function (fileName) {
        var date = moment().format("YYYY-MM-DD HH:mm:ss");
        var filePath = FilesOnServer.uploadFolder + fileName;
        var pic = new Picture({
            path: filePath,
            date: date,
            like: 0,
            view: 1
        });

        pic.save(function (err, result) {
            if (err) {
                req.session.error = err;
                return;
            }
            console.log(result['result']);
            req.session.success = "Upload photo success!";
            return res.redirect('/photo');
        });
    });
});

router.get('/delete', function (req, res) {
    var path = req.query.path;

    var file = new FilesOnServer();
    file.delete(path, function (err) {
        if (err) {
            req.session.error = err;
            return res.redirect('/photo');
        }
        Picture.deleteByPath(path, function (err, result) {
            if (err) {
                req.session.error = err;
                return res.redirect('/photo');
            }
            req.session.success = "Delete photo success!";
            return res.redirect('/photo');
        });
    });
});

router.get('/download', function (req, res) {
    var path = req.query.path;
    var type = path.substring(path.lastIndexOf('.') + 1, path.length).toLowerCase();
    var newName = "new." + type;

    var file = new FilesOnServer();
    file.download(path, newName, res, function (err) {
        if (err) {
            req.session.error = err;
            return res.redirect('/photo');
        }
        req.session.success = "Download photo success!";
        return res.redirect('/photo');
    });
});

router.get('/like', function (req, res) {
    var path = req.query.path;

    Picture.updateLikeByPath(path, function (err, result) {
        if (err) {
            req.session.error = err;
            return res.redirect('/photo');
        }
        req.session.success = "Like photo success!";
        return res.redirect('/photo');
    });
});

router.get('/view', function (req, res) {
    var path = req.query.path;

    Picture.updateViewByPath(path, function (err, result) {
        if (err) {
            req.session.error = err;
        }
        return;
    });
});

module.exports = router;

