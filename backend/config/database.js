const mysql = require("mysql2");
  
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'p7_main_user',
  password: 'p7_main_mdp',
  database: 'p7_bdd'
});
 
module.exports = connection;