// import connection
import db from "../config/database.js";

// // Get All Users
// export const getUsers = (result) => {
//     db.query("SELECT * FROM users", (err, results) => {             
//         if(err) {
//             console.log(err);
//             result(err, null);
//         } else {
//             result(null, results);
//         }
//     });   
// }

// Get Single User
export const getUserById = (id, result) => {
    db.query("SELECT * FROM users WHERE u_id = ?", [id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });   
}

// Insert Users to Database
export const insertUsers = (data, result) => {
    db.query("INSERT INTO users SET ?", [data], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

// Update User to Database
export const updateUserById = (data, id, result) => {
    db.query("UPDATE users SET u_pseudo = ?, u_email = ?, u_password = ?, u_level = ?, u_registration_date = ?, WHERE u_id = ?", 
    [data.u_pseudo, data.u_email, data.u_password, data.u_level, data.u_registration_date, id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

// Delete User to Database
export const deleteUserById = (id, result) => {
    db.query("DELETE FROM users WHERE u_id = ?", [id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}