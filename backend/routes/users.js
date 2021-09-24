// import express
const express = require("express");
const auth = require('../middleware/auth');

// import function from controller
// import { showUserById, createUsers, updateUser, deleteUser } from "../controllers/profile.js";
const loginCtrl = require('../controllers/login');
const showUserById = require("../controllers/users.js");
// const createUsers = require("../controllers/profile.js");
const updateUser = require("../controllers/users.js");
const deleteUser = require("../controllers/users.js");

// init express router
const router = express.Router();

// routes signup et login voir controller login
router.post('/signup', loginCtrl.signup); // requête post pour s'enregistrer
router.post('/login', loginCtrl.login); // requête post pour se 'log'

// routes get, update et delete one user voir controller users, requiert user authentifié
// Get All Users
// router.get('/users', showUsers);
// Get Single User
router.get('/users/:id', auth, showUserById);
// Create New User
// router.post('/users', createUsers); // doublon avec login et signup
// Update User
router.put('/users/:id', auth, updateUser);
// Delete User
router.delete('/users/:id', auth, deleteUser);

module.exports = router;