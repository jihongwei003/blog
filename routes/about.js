var express = require('express'),
    router = express.Router(),
    TITLE_ABOUT = 'About';

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

    res.render('about', {title: TITLE_ABOUT});
});

module.exports = router;

