function Conn() {
}
module.exports = Conn;

Conn.db_name = "blog";

//Conn.mongodb_connection_string = 'mongodb://127.4.95.2:27017/' + Conn.db_name;
//if (process.env.OPENSHIFT_MONGODB_DB_URL) {
//    this.mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + Conn.db_name;
//}

Conn.connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME +
    ":" + process.env.OPENSHIFT_MONGODB_DB_PASSWORD +
    "@" + process.env.OPENSHIFT_MONGODB_DB_HOST + ":27107" + Conn.db_name
    || 'mongodb://127.0.0.1:27017/' + Conn.db_name;

Conn.get = function () {
    return this.connection_string;
}
