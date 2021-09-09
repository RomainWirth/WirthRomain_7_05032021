// import connection
import db from "../config/database.js";

// Get All Topics
export const getMessages = (result) => {
    db.query("SELECT * FROM topic_messages", (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

// Get one topic
export const getMessageById = (id, result) => {
    db.query("SELECT * FROM topic_messages WHERE tm_id = ?", [id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });   
}

// Insert Topic_message to Database
export const insertTopicMessage = (data, result) => {
    db.query("INSERT INTO topic_messages SET ?", [data], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

// Update Topic_message to Database
export const updateMessageById = (data, id, result) => {
    db.query("UPDATE topic_messages SET tm_parent = ?, tm_titre = ?, tm_content = ?, tm_posting_date = ?, tm_user_id = ?, tm_picture_url = ?, tm_moderation = ?, WHERE u_id = ?", 
    [data.tm_parent, data.tm_titre, data.tm_content, data.tm_posting_date, data.tm_user_id, data.tm_picture_url, data.tm_moderation, id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

// Delete Message to Database
export const deleteMessageById = (id, result) => {
    db.query("DELETE FROM topic_messages WHERE tm_id = ?", [id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}