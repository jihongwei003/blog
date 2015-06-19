function Conn(){
}
module.exports = Conn;

Conn.db_name = "blog";
Conn.mongodb_connection_string = 'mongodb://127.4.95.2/' + Conn.db_name;
if (process.env.OPENSHIFT_MONGODB_DB_URL) {
    this.mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + Conn.db_name;
}

Conn.get = function(){
    return this.mongodb_connection_string;
}
