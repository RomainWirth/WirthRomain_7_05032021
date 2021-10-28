// import connection
const connection = require("../config/database.js");
const bcrypt = require('bcrypt'); // Algorythme de hachage = package de chiffrement
const { execute } = require("../config/database.js");

// Insert into Users in Database table users
exports.insertUsers = (data, result) => {
    // var user_pseudo = {toSqlString: function() {return data.u_pseudo}};
    // var user_email = {toSqlString: function() {return data.u_email}};
    // var user_password = {toSqlString: function() {return data.u_password}};
    // var user_data = [user_pseudo, user_email, user_password];
    // var query = connection.query("INSERT INTO users (u_pseudo, u_email, u_password) VALUES (?, ?, ?)", user_data, (err, results, fields) => {
    //     if (err) {
    //         result(err, null);
    //     }
    //     else {
    //         result(null, results);
    //         return results;
    //     }
    // });
    // console.log(query.sql);
    
    connection.query("INSERT INTO users (u_pseudo, u_email, u_password) VALUES (?, ?, ?)", [data.u_pseudo, data.u_email, data.u_password], (err, results) => {
        if (err) {
            result(err, null);
        }
        else {
            result(null, results);
            return results;
        }
    });
}

// fonction find user by email
exports.getUserByEmail = async (email, result) => {
    connection.query("SELECT * FROM users WHERE u_email = ?", [email], (err, results) => {
        if (err) {
            // console.log(err);
            result(err, null);
            return err;
        }
        else {
            result(null, results);
            return results;
        }
    });
}

// Get Single User from Database table users
exports.getUserById = (user_id, result) => {
    connection.query("SELECT u_pseudo, u_email, u_registration_date FROM users WHERE u_id = ?", [user_id], (err, results) => {
        // console.log(results);
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, results[0]);
        }
    });
}

// Update one User into Database table users
exports.updateUserById = (data, result) => {
    // gestion de la modification du mot de passe
    if (data.u_password) {
        bcrypt.hash(data.u_password, 10)
        .then(hash => {
            connection.query("UPDATE users SET u_pseudo = ?, u_email = ?, u_password = ? WHERE u_id = ?",
            [data.u_pseudo, data.u_email, hash, data.u_id], (err, results) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                } else {
                    result(null, results);
                }
            });
        })
        .catch(error => result(error, null));
    } else { 
        // gestion de la modification si mot de passe inchangé
        connection.query("UPDATE users set u_pseudo = ?, u_email = ? WHERE u_id = ?",
        [data.u_pseudo, data.u_email, data.u_id], (err, results) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, results);
            }
        });
    }
}

// Delete one User from Database table users
exports.deleteUserById = (id, result) => {
    connection.query("DELETE FROM users WHERE u_id = ?", [id], (err, results) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(results);
            result(null, results);
        }
    });
}