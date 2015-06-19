var mongodb = require('mongodb');
var Con = require('../models/Persist.js');

function Article(article) {
    this.title = article.title;
    this.content = article.content;
    this.create_date = article.create_date;//primary key
    this.like = article.like;
    this.view = article.view;
}
module.exports = Article;

Article.prototype.save = function (callback) {
    var data = {
        'title': this.title,
        'content': this.content,
        'create_date': this.create_date,
        'publish_date': this.publish_date,
        'like': this.like,
        'view': this.view
    };

    mongodb.connect(Con.get(), function (err, conn) {
        console.log('calling Article.save()');
        var collection = conn.collection('article');

        collection.insert(data, function (err, result) {
            callback(err, result);
            conn.close();
        });
    });
}


//FIXME add pagination
Article.getAllDraft = function (callback) {
    mongodb.connect(Con.get(), function (err, conn) {
        console.log('calling Article.getAllDraft()');
        var collection = conn.collection('article');

        var findStr = {
            publish_date: {$in: [null], $exists: true}
        }

        collection.find(findStr).toArray(function (err, result) {//return array
            callback(err, result);
            conn.close();
        });
    });
};

//FIXME add pagination
Article.getAll = function (callback) {
    mongodb.connect(Con.get(), function (err, conn) {
        console.log('calling Article.getAll()');
        var collection = conn.collection('article');

        var findStr = {//not is ""
            publish_date: {$ne: null}
        }

        collection.find(findStr).toArray(function (err, result) {//return array
            callback(err, result);
            conn.close();
        });
    });
};

Article.getByCreateDate = function (date, callback) {
    mongodb.connect(Con.get(), function (err, conn) {
        console.log('calling Article.getByCreateDate()');
        var collection = conn.collection('article');

        var findStr = {
            'create_date': date
        };

        collection.findOne(findStr, function (err, result) {//return object
            callback(err, result);
            conn.close();
        });
    });
};


Article.publish = function (create_date, publish_date, callback) {
    Article.getByCreateDate(create_date, function (err, result) {
        mongodb.connect(Con.get(), function (err, conn) {
            console.log('calling Article.publish()');
            var collection = conn.collection('article');

            var findStr = {
                'create_date': create_date
            };
            var updateStr = {
                $set: {
                    "publish_date": publish_date
                }
            }

            collection.update(findStr, updateStr, function (err, result) {//return object
                callback(err, result);
                conn.close();
            });
        });
    });
};

Article.edit = function (create_date, title, content, callback) {
    Article.getByCreateDate(create_date, function (err, result) {
        mongodb.connect(Con.get(), function (err, conn) {
            console.log('calling Article.edit()');
            var collection = conn.collection('article');

            var findStr = {
                'create_date': create_date
            };
            var updateStr = {
                $set: {
                    "title": title,
                    "content": content
                }
            }

            collection.update(findStr, updateStr, function (err, result) {//return object
                callback(err, result);
                conn.close();
            });
        });
    });
};

Article.delete = function (create_date, callback) {
    Article.getByCreateDate(create_date, function (err, result) {
        mongodb.connect(Con.get(), function (err, conn) {
            console.log('calling Article.delete()');
            var collection = conn.collection('article');

            var findStr = {
                'create_date': create_date
            };

            collection.remove(findStr, function (err, result) {//return object
                callback(err, result);
                conn.close();
            });
        });
    });
};

Article.updateLikeByCreateDate = function (date, callback) {
    Article.getByCreateDate(date, function (err, result) {
        mongodb.connect(Con.get(), function (err, conn) {
            console.log('calling Article.updateLikeByCreateDate()');
            var collection = conn.collection('article');

            var findStr = {
                'create_date': date
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

Article.updateViewByCreateDate = function (date, callback) {
    Article.getByCreateDate(date, function (err, result) {
        mongodb.connect(Con.get(), function (err, conn) {
            console.log('calling Article.updateViewByCreateDate()');
            var collection = conn.collection('article');

            var findStr = {
                'create_date': date
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


//var ar = new Article({
//
//});
//Article.getByPublishDate('12',function(err,result){
//    console.log(result[0]);
//})
//Article.getAll(function (err, result) {
//    console.log(result);
//});
//Article.getAllDraft(function (err, result) {
//    console.log(result);
//});