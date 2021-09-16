import mysql from "mysql2";
  
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'p7_main_user', // à modifier par process.env.USER
  password: 'p7_main_mdp', // à modifier par process.env.PASSWORD
  database: 'p7_bdd'
});
 
export default connection;