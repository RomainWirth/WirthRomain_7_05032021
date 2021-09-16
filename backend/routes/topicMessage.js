// import express
import express from "express";
 
// import function from controller
import { showTopicMessages, showTopicById, createMessage, updateMessage, deleteMessage } from "../controllers/topic_messages.js";

// init express router
const router = express.Router();

// Get all topics
router.get('/topic_messages', showTopicMessages);
// Get one topic
router.get('/topic_messages', showTopicById);
// Insert Topic_message to Database
router.post('topic_messages', createMessage)
// Update Topic_message to Database
router.put('topic_messages', updateMessage);
// Delete Message to Database
router.delete('topic_messages', deleteMessage);

// Get All messages from One User


// export default router
export default router;