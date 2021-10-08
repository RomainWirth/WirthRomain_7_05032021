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
    connection.query("INSERT INTO users (u_pseudo, u_email, u_password) VALUES (?, ?, ?)", [data.u_pseudo, data.u_email, data.u_password], (err, results) => {             
        if(err) {
            result(err,null);
        } 
        else {
            result(null,results);
            return results;
        }
    });
}

// fonction find user by email
exports.getUserByEmail = async (user_id, result) => {
    connection.query("SELECT * FROM users WHERE u_email = ?", [user_id], (err, results) => {
        if(err) {
            result(err,null);
        } 
        else {
            result(null,results);
            return results;
        }
    })
}

// Get Single User from Database table users
exports.getUserById = (user_id, result) => {
    connection.query("SELECT * FROM users WHERE u_id = ?", [user_id], (err, results) => {
        console.log(results);         
        if(err) {
            console.log("error: ", err); 
            result(err, null);} 
        else {
            result(null, results[0]);
        }
    });
}

// Update one User into Database table users
exports.updateUserById = (data, id, result) => {
    connection.query("UPDATE users (u_pseudo, u_email) VALUES (?, ?) WHERE u_id = ?", 
    [data.u_pseudo, data.u_email, data.u_level, data.u_registration_date, id], (err, results) => {             
        if(err) {
            console.log("error: ", err); 
            result(err, null);} 
        else {
            result(null, results);
        }
    });   
}

// Delete one User from Database table users
exports.deleteUserById = (id, result) => {
    connection.query("DELETE FROM users WHERE u_id = ?", [id], (err, results) => {             
        if(err) {
            console.log("error: ", err); 
            result(err, null);
        } 
        else {
            result(null, results);
        }
    });   
}

// Query pour accès moderation
exports.getUserLevel = (user_id, result) => {
    connection.query("GET u_level FROM users WHERE u_id = ?", [user_id], (err, results) => {
        if(err) {
            console.log("error: ", err); 
            result(err, null);}
        else {
            result(null, results); 
            return results
        }
    });
}