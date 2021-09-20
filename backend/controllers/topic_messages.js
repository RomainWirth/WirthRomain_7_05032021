// Import function from Topic_message Model
// import { getMessages, insertTopicMessages, updateMessageById, deleteMessageById } from "../models/topic_messageModel.js";
import Message from "../models/topic_messageModel.js";

// Créer un message (parent 0) : insert Topic_message to Database
// export const createMessage = (req, res) => {
//     const data = req.body;
//     insertTopicMessages(data, (err, results) => {
//         if (err){res.send(err);} 
//         else {res.json(results);}
//     });
// };
exports.createMessage = (req, res, next) => {
    const messageObject = JSON.parse(req.body.message);
    delete messageObject._id;
    const message = new Message({
        ...messageObject,
        tm_picture_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    message.save()
    .then(() => { res.status(201).json({ message: 'message posté' }); })
    .catch(error => { res.status(400).json({ error }); });
};

// Voir tous les messages (parents 0)
export const showTopicMessages = (req, res) => {
    getMessages((err, results) => {
        if (err){res.send(err);}
        else{res.json(results);}
    });
};
exports.showTopicMessages = (req, res, next) => {
    Message.find()
    .then(message => { res.status(200).json(message); })
    .catch(error => { res.status(404).json({ error }); });
};

// Voir un seul message (parent 0) + affichage de ses enfants (réponses)
// export const showTopicById = (req, res) => {
//     getMessageById(req.params.id, (err, results) => {
//         if (err){res.send(err);}
//         else {res.json(results);}
//     });
// };



// Modifier un message : Update Topic_message to Database
// export const updateMessage = (req, res) => {
//     const data  = req.body;
//     const id    = req.params.id;
//     updateMessageById(data, id, (err, results) => {
//         if (err){res.send(err);}
//         else{res.json(results);}
//     });
// };
exports.updateMessage = (req, res, next) => {
    const messageObject = req.file ?
    { 
        ...JSON.parse(req.body.message),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    updateMessageById.updateOne({ _id: req.params.id }, { ...messageObject, _id: req.params.id })
    .then(() => { res.status(200).json({ message: 'message modifié' }); })
    .catch(error => { res.status(400).json({ error }); });
};

// Supprimer un message : Delete Message to Database
export const deleteMessage = (req, res, next) => {
    const id = req.params.id;
    deleteMessageById(id, (err, results) => {
        if (err){res.send(err);}
        else{res.json(results);}
    });
};
exports.deleteMessage = (req, res, next) => {
    deleteMessageById.findOne({ _id: req.params.id}) // on trouve la sauce dans la BDD
    .then(message => { // une fois trouvée
        const filename = message.imageUrl.split('/images/')[1]; // on extrait le nom du fichier à supprimer
        fs.unlink(`images/${filename}`, () => { // on supprime avec fs.unlink
            Sauce.deleteOne({ _id: req.params.id }) // ici on supprime le fichier de la BDD
            .then(() => { res.status(200).json({ message: 'sauce supprimée' }); })
            .catch(error => { res.status(400).json({ error }); });
        });
    })
    .catch(error => res.status(500).json({ error }));
};