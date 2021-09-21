// import express
const express = require("express");
const auth = require('../middleware/auth');

// import function from controller
// import { showUserById, createUsers, updateUser, deleteUser } from "../controllers/profile.js";
const showUserById = require("../controllers/profile.js");
const createUsers = require("../controllers/profile.js");
const updateUser = require("../controllers/profile.js");
const deleteUser = require("../controllers/profile.js");

// init express router
const router = express.Router();

// Get All Users
// router.get('/users', showUsers);
// Get Single User
router.get('/users/:id', auth, showUserById);
// Create New User
router.post('/users', auth, createUsers);
// Update User
router.put('/users/:id', auth, updateUser);
// Delete User
router.delete('/users/:id', auth, deleteUser);

module.exports = router;