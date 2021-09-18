import express from 'express';
const router = express.Router();

import auth from '../middleware/auth';
import multer from '../middleware/multer-config';
 
// import function from controller
import { showTopicMessages, showTopicById, createMessage, updateMessage, deleteMessage } from "../controllers/topic_messages.js";


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


// export default router
export default router;