const topicMessages = require("../models/topic_messageModel.js");

// Créer un message (parent 0) : INSERT Topic_message to Database
exports.createMessage = (req, res) => {
    // console.log(req);
    const data = JSON.parse(req.body.topic); // JSON.parse(req.body.message)
    data['picture_url'] = req.hasOwnProperty('file') ? req.file.path : null;
    topicMessages.insertTopicMessages(data, (err, results) => {
        if (err){res.send(err);} 
        else {res.json(results);}
    });
};

exports.showChildTopicMessages = (req, res) => {
    const parent_id = req.params.parent_id;
    // console.log('hello world');
    topicMessages.getChildMessages(parent_id, (err, results) => {
        if (err){res.send(err);}
        else{res.json(results);}
    });
};

exports.showParentTopicMessages = (req, res) => {
    topicMessages.getParentMessages((err, results) => {
        if (err){res.send(err);}
        else{res.json(results);}
    });
};

// Modifier un message : UPDATE Topic_message to Database
exports.updateMessage = (req, res) => {
    const data = JSON.parse(req.body.topic); // JSON.parse(req.body.message)
    data['tm_picture_url']= req.hasOwnProperty('file') ? req.file.path : null;
    // console.log(data)
    topicMessages.updateMessage(data, (err, results) => {
        if (err){res.send(err);}
        else{res.json(results);}
    });
};

// Modérer un message : UPDATE moderation FROM 
exports.updateModeration = (req, res) => {
    const data = req.body;
    topicMessages.moderateMessage(data, (err, results) => {
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