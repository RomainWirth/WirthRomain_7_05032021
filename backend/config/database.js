import mysql from "mysql2";
  
// create the connection to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'p7_main_user',
  password: 'p7_main_mdp',
  database: 'p7_bdd'
});
 
export default db;