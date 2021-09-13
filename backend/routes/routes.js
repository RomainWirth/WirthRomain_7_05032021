// import express
import express from "express";
 
// import function from controller
import { showUserById, createUsers, updateUser, deleteUser } from "../controllers/users.js";
import { showTopicMessages, showTopicById, createMessage, updateMessage, deleteMessage } from "../controllers/topic_messages.js";

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