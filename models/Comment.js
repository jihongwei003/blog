var mongodb = require('mongodb');
var Con = require('../models/Persist.js');

function Comment(comment) {
    this.article = comment.article;
    this.date = comment.date;//primary key
    this.nickname = comment.nickname;
    this.email = comment.email;
    this.website = comment.website;
    this.content = comment.content;
    this.replyTo = comment.replyTo;
}
module.exports = Comment;

Comment.prototype.save = function (callback) {
    var data = {
        'article': this.article,
        'date': this.date,
        'nickname': this.nickname,
        'email': this.email,
        'website': this.website,
        'content': this.content,
        'replyTo': this.replyTo
    };

    mongodb.connect(Con.get(), function (err, conn) {
        console.log('calling Comment.save()');
        var collection = conn.collection('comment');

        collection.insert(data, function (err, result) {
            callback(err, result);
            conn.close();
        });
    });
}

Comment.getCommentsByArticle = function (article, callback) {
    var findStr = {
        'article': article
    };

    mongodb.connect(Con.get(), function (err, conn) {
        console.log('calling Comment.getCommentsByArticle()');
        var collection = conn.collection('comment');

        collection.find().toArray(function (err, result) {
            callback(err, result);
            conn.close();
        });
    });
};

Comment.deleteByDate = function (date, callback) {
    var findStr = {
        'date': date
    };

    mongodb.connect(Con.get(), function (err, conn) {
        console.log('calling Comment.deleteByDate()');
        var collection = conn.collection('comment');

        collection.remove(findStr, function (err, result) {
            callback(err, result);
            conn.close();
        });
    });
}
