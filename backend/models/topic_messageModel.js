// les queries viennent ici
// import connection
const connection = require("../config/database.js");

// Insert Topic_message to Database = création d'un message
exports.insertTopicMessages = (data, result) => {
    connection.query("INSERT INTO topic_messages (tm_parent, tm_user_id, tm_title, tm_content, tm_picture_url, tm_moderation) VALUES (?, ?, ?, ?, ?, ?)", [data.tm_parent,data.user_id,data.title,data.content,data.picture_url,data.moderation], (err, results) => {             
        if(err) {console.log("error: ", err); result(err, null);} 
        else {result(null, results);}
    });   
}

// Get All Topics = trouver tous les messages parents = 0 (titre principal)
exports.getParentMessages = (result) => {
    connection.query("SELECT tm.*, u.u_pseudo FROM topic_messages tm INNER JOIN users u ON tm.tm_user_id = u.u_id WHERE tm.tm_parent= 0 ", (err, results) => {             
        if(err) {console.log("error: ", err); result(err, null);} 
        else {result(null, results);}
    });   
}

// exports.getParentMessages = (result) => {
//     connection.query("SELECT * FROM topic_messages t WHERE t.tm_id in (SELECT t2.tm_parent FROM topic_messages t2)", (err, results) => {             
//         if(err) {console.log("error: ", err); result(err, null);} 
//         else {result(null, results);}
//     });   
// }

exports.getChildMessages = (parent_id, result) => {
    connection.query("SELECT tm.*, u.u_pseudo FROM topic_messages tm INNER JOIN users u ON tm.tm_user_id = u.u_id WHERE tm.tm_parent = ?", [parent_id], (err, results) => {             
        if(err) {console.log("error: ", err); result(err, null);} 
        else {result(null, results);}
    });   
}
exports.getAllMessages = (result) => {
    connection.query("SELECT * FROM topic_messages", (err, results) => {             
        if(err) {console.log("error: ", err); result(err, null);} 
        else {result(null, results);}
    });   
}
// Update Topic_message to Database = modifier un message
exports.updateMessageById = (data, id, result) => {
    connection.query("UPDATE topic_messages SET tm_title = ?, tm_content = ?, tm_picture_url = ?, tm_moderation = ? WHERE tm_id = ?", 
    [data.tm_titre, data.tm_content, data.tm_picture_url, data.tm_moderation, data.tm_id], (err, results) => {             
        if(err) {console.log("error: ", err); result(err, null);} 
        else {result(null, results);}
    });
}

// Moderation Message avec UPDATE
exports.moderateMessage = (data, result) => {
    connection.query("UPDATE topic_messages SET tm_moderation = ?  WHERE tm_id = ?", [data.tm_moderation, data.tm_id], (err, results) => {
        if(err) {console.log("error: ", err); result(err, null);} 
        else {result(null, results);}
    });
}

// Delete Message to Database
exports.deleteMessageById = (id, result) => {
    connection.query("DELETE FROM topic_messages WHERE tm_parent = ? or tm_id = ? ", [id,id], (err, results) => {             
        if(err) {console.log("error: ", err); result(err, null);} 
        else {result(null, results);}
    });   
}

// Get one topic
exports.getMessageByTitle = (title, result) => {
    connection.query("SELECT * FROM topic_messages WHERE tm_title = ?", [title], (err, results) => {             
        if(err) {console.log("error: ", err); result(err, null);} 
        else {result(null, results[0]);}
    });   
}
// Delete conversation
exports.deleteConversationByTitle = (title, result) => {
    connection.query("DELETE FROM topic_messages WHERE tm_title = ?", [title], (err, results) => {             
        if(err) {console.log("error: ", err); result(err, null);} 
        else {result(null, results[0]);}
    });   
}

// Récupérer les Messages d'un seul utilisateur
// exports.userMessages = (id, result) => {
//     connection.query("SELECT tm.*, u.u_pseudo FROM topic_messages tm INNER JOIN users u ON tm.tm_user_id = u.u_id WHERE u.u_id = ? ORDER BY tm.tm_id ASC", 
//     [id.u_id], (err, results) => {
//         if(err) {console.log("error: ", err); result(err, null);} 
//         else {result(null, results);}
//     });
// }