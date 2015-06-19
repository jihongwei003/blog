function Conn() {
}
module.exports = Conn;

Conn.db_name = "blog";

Conn.connection_string = 'mongodb://127.0.0.1:27017/' + Conn.db_name;
if (process.env.OPENSHIFT_MONGODB_DB_URL) {
    this.connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME +
        ":" + process.env.OPENSHIFT_MONGODB_DB_PASSWORD +
        "@" + process.env.OPENSHIFT_MONGODB_DB_HOST + ":27107" + Conn.db_name;
}

Conn.get = function () {
    console.log("Mongodb URL:" + this.connection_string);
    return this.connection_string;
}
