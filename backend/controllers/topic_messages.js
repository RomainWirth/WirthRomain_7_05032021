// Import function from Topic_message Model
import { getMessages, insertTopicMessages, updateMessageById, deleteMessageById } from "../models/topic_messageModel.js";

// Voir tous les messages (parents 0)
export const showTopicMessages = (req, res) => {
    getMessages((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Voir un seul message (parent 0) + affichage de ses enfants (réponses)
export const showTopicById = (req, res) => {
    getMessageById(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Créer un message (parent 0) : insert Topic_message to Database
export const createMessage = (req, res) => {
    const data = req.body;
    insertTopicMessages(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Modifier un message : Update Topic_message to Database
export const updateMessage = (req, res) => {
    const data  = req.body;
    const id    = req.params.id;
    updateMessageById(data, id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Supprimer un message : Delete Message to Database
export const deleteMessage = (req, res) => {
    const id = req.params.id;
    deleteMessageById(id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}