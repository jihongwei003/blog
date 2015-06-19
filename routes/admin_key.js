var express = require('express'),
    router = express.Router(),
    TITLE_ADMIN = 'Admin';

router.get('/', function (req, res) {
    res.render('admin_key', {title: TITLE_ADMIN});
});

router.post('/', function (req, res) {
    var admin = req.body['admin_key'];

    if (admin == "Ai.yiwannian") {
        req.session.admin_key = admin;
        return res.redirect('/login');
    }
    res.redirect('/admin_key');
});

module.exports = router;
