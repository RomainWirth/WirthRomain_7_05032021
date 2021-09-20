// les queries viennent ici

// import connection
import connection from "../config/database.js";

// Modèle topic_messages :
const Message = function (message) {
    this.id = topic_messages.tm_id;
    this.parent = topic_messages.tm_parent;
    this.title = topic_messages.tm_title;
    this.content = topic_messages.tm_content;
    this.posting_date = topic_messages.tm_posting_date;
    this.user_id = topic_messages.tm_user_id;
    this.picture_url = topic_messages.tm_picture_url;
    this.moderation = topic_messages.tm_moderation;
}

// Insert Topic_message to Database = création d'un message
// export const insertTopicMessages = (data, result) => {
//     connection.query("INSERT INTO topic_messages SET ?", [data], (err, results) => {             
//         if(err) {console.log(err); result(err, null);} 
//         else {result(null, results);}
//     });   
// }
Message.create = (newMessage, result) => {
    connection.query("INSERT INTO topic_messages SET ?, posting_date = NOW()", newMessage, (err, results) => {             
        if(err) {console.log("error: ", err); result(err, null); return;} 
        else {console.log("Message créé: ", { id: result.insertId, ...newMessage }); result(null, results);}
    });   
}

// Get All Topics = trouver tous les messages parents
// export const getMessages = (result) => {
//     connection.query(
//         "SELECT tm_id, tm_titre, tm_posting_date FROM topic_messages WHERE tm_parent = 0", 
//         (err, results) => {             
//         if(err) {console.log(err); result(err, null);} 
//         else {result(null, results);}
//     });   
// }
Message.getAll = (result) => {
    connection.query("SELECT tm_id, tm_title, tm_posting_date FROM topic_messages WHERE tm_parent = 0", (err, results) => {             
        if(err) {console.log("error: ", err); result(err, null); return;} 
        else {console.log("messages: ", res); result(null, results);}
    });   
}

// Update Topic_message to Database = modifier un message
// export const updateMessageById = (data, id, result) => {
//     connection.query("UPDATE topic_messages SET tm_title = ?, tm_content = ?, tm_picture_url = ?, tm_moderation = ? WHERE tm_id = ?", 
//     [data.tm_titre, data.tm_content, data.tm_picture_url, data.tm_moderation, data.tm_id], (err, results) => {             
//         if(err) {console.log(err); result(err, null);} 
//         else {result(null, results);}
//     });   
// }
Message.updateById = (message, id, result) => {
    connection.query("UPDATE topic_messages SET tm_title = ?, tm_content = ?, tm_picture_url = ?, tm_moderation = ? WHERE tm_id = ?", 
    [message.tm_title, message.tm_content, message.tm_picture_url, message.tm_moderation, message.tm_id], (err, results) => {             
        if(err) {console.log("error :", err); result(err, null); return;} 
        else {console.log("message modifié: ", { id: id, ...message }); result(null, results);}
    });   
}

// Delete Message to Database
// export const deleteMessageById = (id, result) => {
//     connection.query("DELETE FROM topic_messages WHERE tm_id = ?", [data.tm_id], (err, results) => {             
//         if(err) {console.log(err); result(err, null);} 
//         else {result(null, results);}
//     });   
// }
Message.remove = (id, result) => {
    connection.query("DELETE FROM topic_messages WHERE tm_id = ?", id, (err, results) => {             
        if(err) {console.log("error :", err); result(err, null);  return;} 
        else {console.log("message supprimé avec id :", id); result(null, results);}
    });   
}

// Moderation Message avec UPDATE


// Récupérer les Messages d'un seul utilisateur


// // Get one topic
// export const getMessageById = (id, result) => {
//     connection.query("SELECT * FROM topic_messages WHERE tm_id = ?", [id], (err, results) => {             
//         if(err) {console.log(err); result(err, null);} 
//         else {result(null, results[0]);}
//     });   
// }

module.exports = Message;

// export const Message;