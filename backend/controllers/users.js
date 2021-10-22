// Import function from User Model
const user = require("../models/usersModel.js");
const message = require("../models/topic_messageModel");

// Get Single User for profil
exports.showUserById = (req, res) => {
    const user_id = req.params.user_id;
    user.getUserById(user_id, (err, results) => {
        if (err){ res.send(err); }
        else { res.json(results); }
    });
}

// Update User
exports.updateUser = (req, res) => {
    const data = req.body;
    user.updateUserById(data, (err, results) => {
        if (err){ res.send(err); }
        else{ res.json(results); }
    });
}
 
// Delete User
exports.deleteUser = (req, res) => {
    const id = req.params.u_id;
    message.deleteTopicByUserId(id, (err, results) => {
        // console.log(results);
        if (err){ res.send(err); }
        else {
            user.deleteUserById(id, (err, results) => {
                if (err){ res.send(err); }
                else{
                    // console.log(results); 
                    res.json(results); 
                }
            });
        }
    })
}