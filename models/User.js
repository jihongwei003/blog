var mongodb = require('mongodb');
var Con = require('../models/Persist.js');

function User(user) {
    this.username = user.username;
    this.userpass = user.userpass;
}
module.exports = User;

User.prototype.save = function (callback) {
    var data = {
        'username': this.username,
        'userpass': this.userpass
    };

    mongodb.connect(Con.get(), function (err, conn) {
        console.log('calling User.save()');
        var collection = conn.collection('user');

        //console.log(this.username);//callback function can not see the variables in this class!

        collection.insert(data, function (err, result) {
            callback(err, result);
            conn.close();
        });
    });
}

User.getUserByName = function (username, callback) {
    mongodb.connect(Con.get(), function (err, conn) {
        console.log('calling User.getUserCountByName()');
        var collection = conn.collection('user');

        var findStr = {
            'username': username
        };

        //collection.find(findStr).toString(function (err, result) {//return array

        collection.findOne(findStr,function (err, result) {//return object
            callback(err, result);
            conn.close();
        });
    });
};


/*************************/
//var user = new User({
//    username: "132",
//    userpass: "123"
//});
//user.save(function (err, result) {
//    if (err) {
//        console.log('Error:' + err);
//        return;
//    }
//    console.log(result['result']['ok']);
//    console.log(result['ops'][0].username);
//});

//User.getUserByName("1232", function (err, result) {
//    if (err) {
//        console.log('Error:' + err);
//        return;
//    }
//    console.log(result);
////    console.log(result.username);
//});


