function Conn() {
}
module.exports = Conn;

var db_name = "blog";

var user = process.env.OPENSHIFT_MONGODB_DB_USERNAME;
var password = process.env.OPENSHIFT_MONGODB_DB_PASSWORD;
var host = process.env.OPENSHIFT_MONGODB_DB_HOST;

if (typeof user === "undefined") {
    console.warn('No OPENSHIFT_MONGODB_DB_USERNAME var, using ""');
    user = "";
}
if (typeof password === "undefined") {
    console.warn('No OPENSHIFT_MONGODB_DB_PASSWORD var, using ""');
    password = "";
}
if (typeof host === "undefined") {
    console.warn('No OPENSHIFT_MONGODB_DB_HOST var, using "127.0.0.1"');
    host = "127.0.0.1";
}

Conn.connection_string = 'mongodb://' + user + ':' + password + '@' + host + ':27017/' + db_name;

//Conn.connection_string =
//    'mongodb://' + process.env.OPENSHIFT_MONGODB_DB_USERNAME +
//    ":" + process.env.OPENSHIFT_MONGODB_DB_PASSWORD +
//    "@" + process.env.OPENSHIFT_MONGODB_DB_HOST +
//    ":27107" + Conn.db_name;

Conn.get = function () {
    return this.connection_string;
}
