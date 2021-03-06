var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');///////////////////

var routes = require('./routes/index');

var reg = require('./routes/reg');//////////////////
var login = require('./routes/login');////////////
var logout = require('./routes/logout');///////////
var photo = require('./routes/photo');///////////
var message = require('./routes/message');///////////
var about = require('./routes/about');///////////
var article = require('./routes/article');///////////
var draft = require('./routes/draft');///////////
var edit_article = require('./routes/edit_article');///////////
var article_detail = require('./routes/article_detail');///////////
var comment = require('./routes/comment');///////////
var admin_key = require('./routes/admin_key');///////////

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: "jhw",
    key: 'blog',
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}//30 days
}));//////////////////////session必须位于routes前

app.use('/', routes);

app.use('/reg', reg);////////////////////////
app.use('/login', login);///////////////////
app.use('/logout', logout);///////////////
app.use('/photo', photo);///////////////
app.use('/message', message);///////////////
app.use('/about', about);///////////////
app.use('/article', article);///////////////
app.use('/draft', draft);///////////////
app.use('/edit_article', edit_article);///////////////
app.use('/article_detail', article_detail);///////////////
app.use('/comment', comment);///////////////
app.use('/admin_key', admin_key);///////////////

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
