// import express
// import express from "express";
const express = require("express");

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
router.get('/users/:id', showUserById);
// Create New User
router.post('/users', createUsers);
// Update User
router.put('/users/:id', updateUser);
// Delete User
router.delete('/users/:id', deleteUser);

// export default router
// export default router;
module.exports = router;