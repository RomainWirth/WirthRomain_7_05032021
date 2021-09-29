// import connection
const connection = require("../config/database.js");

// // Get All Users
// exports.getUsers = (result) => {
//     connection.query("SELECT * FROM users", (err, results) => {             
//         if(err) {console.log(err); result(err, null);} 
//         else {result(null, results);}
//     });   
// }

// Insert into Users in Database table users
exports.insertUsers = (data, result) => {
    connection.query("INSERT INTO users SET ?", [data], (err, results) => {             
        if(err) {console.log(err); result(err, null);} 
        else {result(null, results);}
    });   
}

// fonction findOne
exports.getUserByEmail = (email, result) => {
    connection.query("SELECT * FROM users WHERE u_email = ?", [email], (err, results) => {
        if(err) {console.log(err); result(err, null);} 
        else {result(null, results);}
    })
}

// Get Single User from Database table users
exports.getUserById = (id, result) => {
    connection.query("SELECT * FROM users WHERE u_id = ?", [id], (err, results) => {             
        if(err) {console.log(err); result(err, null);} 
        else {result(null, results[0]);}
    });   
}

// Update one User into Database table users
exports.updateUserById = (data, id, result) => {
    connection.query("UPDATE users SET u_pseudo = ?, u_email = ?, u_password = ? WHERE u_id = ?", 
    [data.u_pseudo, data.u_email, data.u_password, data.u_level, data.u_registration_date, id], (err, results) => {             
        if(err) {console.log(err); result(err, null);} 
        else {result(null, results);}
    });   
}

// Delete one User from Database table users
exports.deleteUserById = (id, result) => {
    connection.query("DELETE FROM users WHERE u_id = ?", [id], (err, results) => {             
        if(err) {console.log(err); result(err, null);} 
        else {result(null, results);}
    });   
}
