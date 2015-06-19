var mongodb = require('mongodb');
var Con = require('../models/Persist.js');

function Message(message) {
    this.date = message.date;//primary key
    this.nickname = message.nickname;
    this.email = message.email;
    this.website = message.website;
    this.content = message.content;
    this.replyTo = message.replyTo;
}
module.exports = Message;

Message.prototype.save = function (callback) {
    var data = {
        'date': this.date,
        'nickname': this.nickname,
        'email': this.email,
        'website': this.website,
        'content': this.content,
        'replyTo': this.replyTo
    };

    mongodb.connect(Con.get(), function (err, conn) {
        console.log('calling Message.save()');
        var collection = conn.collection('message');

        collection.insert(data, function (err, result) {
            callback(err, result);
            conn.close();
        });
    });
}

Message.getAll = function (callback) {
    mongodb.connect(Con.get(), function (err, conn) {
        console.log('calling Message.getAll()');
        var collection = conn.collection('message');

        collection.find().toArray(function (err, result) {
            callback(err, result);
            conn.close();
        });
    });
};

Message.deleteByDate = function (date, callback) {
    var findStr = {
        'date': date
    };

    mongodb.connect(Con.get(), function (err, conn) {
        console.log('calling Message.deleteByDate()');
        var collection = conn.collection('message');

        collection.remove(findStr, function (err, result) {
            callback(err, result);
            conn.close();
        });
    });
}

Message.getCount = function (callback) {
    mongodb.connect(Con.get(), function (err, conn) {
        console.log('calling Message.getCount()');
        var collection = conn.collection('message');

        collection.count(function (err, result) {
            callback(err, result);
            conn.close();
        });
    });
};

Message.getMessagesPerPage = function (pageNum, current, callback) {
    mongodb.connect(Con.get(), function (err, conn) {
        console.log('calling Message.getMessagesPerPage()');
        var collection = conn.collection('message');

        collection.find().limit(pageNum).skip(pageNum * (current - 1)).toArray(function (err, result) {
            callback(err, result);
            conn.close();
        });
    });
};

/*************************/
//var message = new Message({
//    'date': 123,
//    'nickname': 123,
//    'email': 123,
//    'content': 123,
//    'replyTo': 123
//});
//message.save(function (err, result) {
//    console.log(result['ops']);
//})
//
//Message.getAll(function (err, result) {
//    console.log(result);
//})

//Message.deleteByDate(123, function (err, result) {
//    console.log(result);
//})