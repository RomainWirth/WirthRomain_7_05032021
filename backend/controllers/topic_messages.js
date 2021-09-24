// modèles : 
// Insert Topic_message to Database = création d'un message : insertTopicMessages
// Get All Topics = trouver tous les messages parents = 0 (titre principal) : getMessages
// Update Topic_message to Database = modifier un message : updateMessageById
// Moderation Message avec UPDATE : moderateMessage
// Delete Message to Database : deleteMessageById
// Get one topic : getMessageByTitle
// Delete conversation : deleteConversationByTitle

const topic_message_path = "..models/topic_messageModel.js";
const topicMessages = require(topic_message_path);

// Créer un message (parent 0) : INSERT Topic_message to Database
exports.createMessage = (req, res) => {
    console.log(req);
    const data = req.body; // JSON.parse(req.body.message)
    topicMessages.insertTopicMessages(data, (err, results) => {
        if (err){res.send(err);} 
        else {res.json(results);}
    });
};

// Voir tous les topics (message titre) : SELECT tm_id, tm_title, tm_posting_date (parents 0) from Database
exports.showTopicMessages = (req, res) => {
    const id = req.params.tm_id;
    const title = req.params.tm_title;
    const posting_date = req.params.tm_posting_date;
    topicMessages.getMessages(id, title, posting_date, (err, results) => {
        if (err){res.send(err);}
        else{res.json(results);}
    });
};

// Modifier un message : UPDATE Topic_message to Database
exports.updateMessage = (req, res) => {
    const data = req.body;
    const id = req.params.tm_id;
    topicMessages.updateMessageById(data, id, (err, results) => {
        if (err){res.send(err);}
        else{res.json(results);}
    });
};

// Modérer un message : UPDATE moderation FROM 
exports.updateModeration = (req, res) => {
    const data = req.body;
    const id = req.params.tm_id;
    topicMessages.moderateMessage(data, id, (err, results) => {
        if (err){res.send(err);}
        else{res.json(results);}
    });
};

// Supprimer un message : DELETE Message from Database
exports.deleteMessage = (req, res) => {
    const id = req.params.tm_id;
    topicMessages.deleteMessageById(id, (err, results) => {
        if (err){res.send(err);}
        else{res.json(results);}
    });
};

// Voir un seul message (parent 0) + affichage de ses enfants (réponses)
exports.showMessageByTitle = (req, res) => {
    topicMessages.getMessageByTitle(req.params.id, (err, results) => {
        if (err){res.send(err);}
        else {res.json(results);}
    });
};

// Supprimer une conversation (message parent 0 + enfants) : DELETE Message to Database
exports.deleteConversation = (req, res) => {
    const title = req.params.tm_title;
    topicMessages.deleteConversationByTitle(title, (err, results) => {
        if (err){res.send(err);}
        else{res.json(results);}
    });
};