var mysql = require('mysql');
var pool = mysql.createPool({

    host: 'localhost',
    user: 'root',
    password: 'javi123',
    database: 'lab2_servicios'
});

var getConnection = function(callback){
    pool.getConnection(function(err, connection){

        if(err){
            return callback(err);
        }
        callback(null, connection);

    });
};

module.exports = getConnection;