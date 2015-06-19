function Conn() {
}
module.exports = Conn;

var db_name = "blog";

var user = process.env.OPENSHIFT_MONGODB_DB_USERNAME;
var password = process.env.OPENSHIFT_MONGODB_DB_PASSWORD;
var host = process.env.OPENSHIFT_MONGODB_DB_HOST;

Conn.connection_string = 'mongodb://' + user + ':' + password + '@' + host + ':27017/' + db_name;

if (typeof host === "undefined" || typeof password === "undefined" || typeof user === "undefined") {
    Conn.connection_string = "mongodb://127.0.0.1:27017/" + db_name;
}

Conn.get = function () {
    console.log("mongodb URL:" + this.connection_string);
    return this.connection_string;
}
