import mysql from 'mysql';

const pool = mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'knacker1991',
    database:'nodemysql',
    insecureAuth : true
});

export default pool;
