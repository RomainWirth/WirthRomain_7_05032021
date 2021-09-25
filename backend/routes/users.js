// import express
const express = require("express");
const router = express.Router();

// Routes login + signup
const loginCtrl = require('../controllers/login.js');
// routes signup et login voir controller login
router.post('/signup', loginCtrl.signup); // requête post pour s'enregistrer
router.post('/login', loginCtrl.login); // requête post pour se 'log'

// Routes get, update et delete
const users = require("../controllers/users.js");
const auth = require('../middleware/auth.js');
// routes get, update et delete one user voir controller users, requiert user authentifié
// Get All Users
// router.get('/users', showUsers);
// Get Single User
router.get('/users/:id', auth, users.showUserById);
// Create New User
// router.post('/users', users.createUsers); // doublon avec login et signup
// Update User
router.put('/users/:id', auth, users.updateUser);
// Delete User
router.delete('/users/:id', auth, users.deleteUser);

module.exports = router;