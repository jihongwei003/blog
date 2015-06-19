var mongodb = require('mongodb');
var Con = require('../models/Persist.js');

function Picture(pic) {
    this.path = pic.path;//used as id
    this.date = pic.date;
    this.like = pic.like;
    this.view = pic.view;
}
module.exports = Picture;

Picture.prototype.save = function (callback) {
    var data = {
        'path': this.path,
        'date': this.date,
        'like': this.like,
        'view': this.view
    };

    mongodb.connect(Con.get(), function (err, conn) {
        console.log('calling Picture.save()');
        var collection = conn.collection('picture');

        collection.insert(data, function (err, result) {
            callback(err, result);
            conn.close();
        });
    });
}

Picture.deleteByPath = function (path, callback) {
    var findStr = {
        'path': path
    };

    mongodb.connect(Con.get(), function (err, conn) {
        console.log('calling Picture.deleteByPath()');
        var collection = conn.collection('picture');

        collection.remove(findStr, function (err, result) {
            callback(err, result);
            conn.close();
        });
    });
}

Picture.getCount = function (callback) {
    mongodb.connect(Con.get(), function (err, conn) {
        console.log('calling Picture.getCount()');
        var collection = conn.collection('picture');

        collection.count(function (err, result) {
            callback(err, result);
            conn.close();
        });
    });
};

Picture.getPicturesPerPage = function (pageNum, current, callback) {
    mongodb.connect(Con.get(), function (err, conn) {
        console.log('calling Picture.getPicturesPurePage()');
        var collection = conn.collection('picture');

        collection.find().limit(pageNum).skip(pageNum * (current - 1)).toArray(function (err, result) {
            callback(err, result);
            conn.close();
        });
    });
};

Picture.getPicByPath = function (path, callback) {
    mongodb.connect(Con.get(), function (err, conn) {
        console.log('calling Picture.getPicByPath()');
        var collection = conn.collection('picture');

        var findStr = {
            'path': path
        };

        collection.findOne(findStr, function (err, result) {
            callback(err, result);
            conn.close();
        });
    });
};

Picture.updateLikeByPath = function (path, callback) {
    Picture.getPicByPath(path, function (err, result) {
        mongodb.connect(Con.get(), function (err, conn) {
            console.log('calling Picture.updateLikeByPath()');
            var collection = conn.collection('picture');

            var findStr = {
                'path': path
            };
            var updateStr = {
                $set: {
                    "like": result['like'] + 1
                }
            }

            collection.update(findStr, updateStr, function (err, result) {
                callback(err, result);
                conn.close();
            });
        });
    });
};

Picture.updateViewByPath = function (path, callback) {
    Picture.getPicByPath(path, function (err, result) {
        mongodb.connect(Con.get(), function (err, conn) {
            console.log('calling Picture.updateViewByPath()');
            var collection = conn.collection('picture');

            var findStr = {
                'path': path
            };
            var updateStr = {
                $set: {
                    "view": result['view'] + 1
                }
            }

            collection.update(findStr, updateStr, function (err, result) {
                callback(err, result);
                conn.close();
            });
        });
    });
};

//var pic = new Picture({
//    path: "123",
//    date: "123",
//    id: "123"
//});
//
//pic.save(function (err, result) {
//    if (err) {
//        console.log('Error:' + err);
//        return;
//    }
//    console.log(result['result']['ok']);
//});

//Picture.getCount(function (err, result) {
//    if (err) {
//        console.log('Error:' + err);
//        return;
//    }
//    console.log(result);
//});
//
//Picture.getPicById("123", function (err, result) {
//    if (err) {
//        console.log('Error:' + err);
//        return;
//    }
//    console.log(result);
//});

//Picture.getPicturesPerPage(3, 1, function (err, result) {
//    if (err) {
//        console.log('Error:' + err);
//        return;
//    }
//    console.log(result);
//});

//pic.deleteById("123", function (err, result) {
//    if (err) {
//        console.log('Error:' + err);
//        return;
//    }
//    console.log(result['result']['ok']);
//});

