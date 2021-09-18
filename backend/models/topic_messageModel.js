// les queries viennent ici

// import connection
import connection from "../config/database.js";

// Get All Topics
export const getMessages = (result) => {
    connection.query("SELECT tm_id, tm_titre, tm_posting_date FROM topic_messages WHERE tm_parent = 0", (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

// // Get one topic
// export const getMessageById = (id, result) => {
//     connection.query("SELECT * FROM topic_messages WHERE tm_id = ?", [id], (err, results) => {             
//         if(err) {
//             console.log(err);
//             result(err, null);
//         } else {
//             result(null, results[0]);
//         }
//     });   
// }

// Insert Topic_message to Database
export const insertTopicMessages = (data, result) => {
    connection.query("INSERT INTO topic_messages SET ?", [data], (err, results) => {             
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
    connection.query("UPDATE topic_messages SET tm_titre = ?, tm_content = ?, tm_picture_url = ?, tm_moderation = ? WHERE tm_id = ?", 
    [data.tm_titre, data.tm_content, data.tm_picture_url, data.tm_moderation, data.tm_id], (err, results) => {             
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
    connection.query("DELETE FROM topic_messages WHERE tm_id = ?", [data.tm_id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

// Moderation Message avec UPDATE
