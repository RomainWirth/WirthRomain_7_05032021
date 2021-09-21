// import connection
const connection = require("../config/database.js");

// // Get All Users
// exports.getUsers = (result) => {
//     connection.query("SELECT * FROM users", (err, results) => {             
//         if(err) {console.log(err); result(err, null);} 
//         else {result(null, results);}
//     });   
// }

// Get Single User
exports.getUserById = (id, result) => {
    connection.query("SELECT * FROM users WHERE u_id = ?", [id], (err, results) => {             
        if(err) {console.log(err); result(err, null);} 
        else {result(null, results[0]);}
    });   
}

// Insert Users to Database
exports.insertUsers = (data, result) => {
    connection.query("INSERT INTO users SET ?", [data], (err, results) => {             
        if(err) {console.log(err); result(err, null);} 
        else {result(null, results);}
    });   
}

// Update User to Database
exports.updateUserById = (data, id, result) => {
    connection.query("UPDATE users SET u_pseudo = ?, u_email = ?, u_password = ? WHERE u_id = ?", 
    [data.u_pseudo, data.u_email, data.u_password, data.u_level, data.u_registration_date, id], (err, results) => {             
        if(err) {console.log(err); result(err, null);} 
        else {result(null, results);}
    });   
}

// Delete User to Database
exports.deleteUserById = (id, result) => {
    connection.query("DELETE FROM users WHERE u_id = ?", [id], (err, results) => {             
        if(err) {console.log(err); result(err, null);} 
        else {result(null, results);}
    });   
}