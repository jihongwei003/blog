var express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
    if (req.session.admin_key) {
        res.locals.admin_key = req.session.admin_key;

        req.session.destroy();
//    delete req.session.username;
        res.redirect('/login');
    } else {
        return res.redirect('/');
    }
});

module.exports = router;
