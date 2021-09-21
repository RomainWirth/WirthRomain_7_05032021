// import express from 'express';
const express = require ('express');
const router = express.Router();

// import auth from '../middleware/auth';
// import multer from '../middleware/multer-config';
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config'); 

// import function from controller
const showTopicMessages = require("../controllers/topic_messages.js");
const showTopicById = require("../controllers/topic_messages.js");
const createMessage = require("../controllers/topic_messages.js");
const updateMessage = require("../controllers/topic_messages.js");
const deleteMessage = require("../controllers/topic_messages.js");


// Create new Topic_message (insert to Database)
router.post('topic_messages', auth, multer, createMessage)

// Get all topics
router.get('/topic_messages', auth, showTopicMessages);

// Get one topic
router.get('/topic_messages', auth, showTopicById);

// Update Topic_message to Database
router.put('topic_messages', auth, updateMessage);

// Delete Message to Database
router.delete('topic_messages', auth, deleteMessage);

// Get All messages from One User


// export router
module.exports = router;