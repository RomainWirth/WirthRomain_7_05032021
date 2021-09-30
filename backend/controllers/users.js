// Import function from User Model
// import { getUserById, insertUsers, updateUserById, deleteUserById } from "../models/usersModel.js";
// const insertUsers = require("../models/usersModel.js");
// const getUserById = require("../models/usersModel.js");
// const updateUserById = require("../models/usersModel.js");
// const deleteUserById = require("../models/usersModel.js");
const user = require("../models/usersModel.js");
 
// // Get All Users
// export const showUsers = (req, res) => {
//     getUsers((err, results) => {
//         if (err){res.send(err);}
//         else{res.json(results);}
//     });
// }

// Create New User
// exports.createUsers = (req, res) => {
//     const data = req.body;
//     insertUsers(data, (err, results) => {
//         if (err){res.send(err);}
//         else{res.json(results);}
//     });
// }

// Get Single User 
exports.showUserById = (req, res) => {
    user.getUserById(req.params.u_id, (err, results) => { // u_id ou id ?
        if (err){
            console.log("getUserById ne fonctionne pas");
            res.send(err);
        }
        else {
            console.log("getUserById OK");
            res.json(results);
        }
    });
}

// Update User
exports.updateUser = (req, res) => {
    const data = req.body;
    const id = req.params.u_id;
    user.updateUserById(data, id, (err, results) => {
        if (err){
            console.log("updateUserById ne fonctionne pas");
            res.send(err);
        }
        else{
            console.log("updateUserById OK");
            res.json(results);
        }
    });
}
 
// Delete User
exports.deleteUser = (req, res) => {
    const id = req.params.u_id;
    user.deleteUserById(id, (err, results) => {
        if (err){
            console.log("deleteUserById ne fonctionne pas");
            res.send(err);
        }
        else{
            console.log("deleteUserById OK");
            res.json(results);
        }
    });
}