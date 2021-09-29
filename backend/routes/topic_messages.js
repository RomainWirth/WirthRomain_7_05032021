// import express from 'express';
const express = require ('express');
const router = express.Router();

// import auth from '../middleware/auth';
// import multer from '../middleware/multer-config';
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config'); 

// import function from controller
const topic_messagesCtrl = require("../controllers/topic_messages.js");

// Create new Topic_message (insert to Database)
router.post('/topic_messages', auth, multer, topic_messagesCtrl.createMessage)

// Get all topics (parent 0)
router.get('/topic_messages', auth, topic_messagesCtrl.showTopicMessages);

// Update Topic_message to Database
router.put('/topic_messages', auth, topic_messagesCtrl.updateMessage);

// Update Moderation
router.get('/topic_messages', auth, topic_messagesCtrl.updateModeration);

// Delete Message from Database
router.delete('/topic_messages', auth, topic_messagesCtrl.deleteMessage);

// Get message by title
router.get('/topic_messages', auth, topic_messagesCtrl.showMessageByTitle);
// Delete Message by title (all conversation : parent 0 +  children)
router.delete('/topic_messages', auth, topic_messagesCtrl.deleteConversation);

// export router
module.exports = router;