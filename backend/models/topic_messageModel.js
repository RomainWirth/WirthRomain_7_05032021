// les queries viennent ici
// import connection
const fs = require('fs');
const connection = require("../config/database.js");
const { get_message_by_id, get_picture_url_by_id, delete_child_images_by_parent_id } = require('../util/db_querys.js');

// Insert Topic_message to Database = création d'un message
exports.insertTopicMessages = (data, result) => {
    connection.query("INSERT INTO topic_messages (tm_parent, tm_user_id, tm_title, tm_content, tm_picture_url, tm_moderation) VALUES (?, ?, ?, ?, ?, ?)", [data.tm_parent, data.user_id, data.title, data.content, data.picture_url, data.moderation], (err, results) => {
        if (err) { console.log("error: ", err); result(err, null); }
        else {
            get_message_by_id(results.insertId, (err, res) => {
                if (err) result(err, null);
                else result(null, res);
            })
        }
    });
}

// Get Parent Topics = trouver tous les messages parents = 0 (titre principal)
exports.getParentMessages = (result) => {
    connection.query("SELECT tm.*, u.u_pseudo FROM topic_messages tm INNER JOIN users u ON tm.tm_user_id = u.u_id WHERE tm.tm_parent= 0 ", (err, results) => {
        if (err) { console.log("error: ", err); result(err, null); }
        else { result(null, results); }
    });
}

// Get Child Topics = trouver tous les messages dont le parent = 0
exports.getChildMessages = (parent_id, result) => {
    connection.query("SELECT tm.*, u.u_pseudo FROM topic_messages tm INNER JOIN users u ON tm.tm_user_id = u.u_id WHERE tm.tm_parent = ?", [parent_id], (err, results) => {
        if (err) { console.log("error: ", err); result(err, null); }
        else { result(null, results); }
    });
}

// Update Topic_message to Database = modifier un message
exports.updateMessage = (data, result) => {
    if (data.tm_picture_url) {
        get_picture_url_by_id(data.tm_id, (err, results) => {
            console.log(results)
            if (err) {result(err, null);}
            else {
                if (results.length > 0 && results[0].tm_picture_url) {
                    const pic_url = results[0].tm_picture_url;
                    try {
                        fs.unlinkSync(pic_url);
                        console.log("image deleted");
                    } catch (err) {
                        result(err, null);
                        console.error(err);
                    }
                }
                connection.query("UPDATE topic_messages SET tm_title = ?, tm_content = ?, tm_picture_url = ? WHERE tm_id = ?",
                    [data.title, data.content, data.tm_picture_url, data.tm_id], (err, results) => {
                        if (err) { console.log("error: ", err); result(err, null); }
                        else {
                            result(null, results);
                        }
                    }
                );
            }
        })
    } else {
        connection.query("UPDATE topic_messages SET tm_title = ?, tm_content = ? WHERE tm_id = ?",
            [data.title, data.content, data.tm_id], (err, results) => {
                if (err) { console.log("error: ", err); result(err, null); }
                else { result(null, results); }
            }
        );
    }
}

// Delete Message via id utilisateur
exports.deleteTopicByUserId = (data, result) => {
    connection.query("DELETE FROM topic_messages WHERE tm_user_id = ?", [data], (err, results) => {
        if (err) { result(err, null); }
        else { result(null, results); }
    })
}

// Delete Message to Database
exports.deleteMessageById = (id, result) => {
    get_picture_url_by_id(id, (err, results) => {
        if (err) result(err, null);
        else {
            if (results.length > 0) {
                const pic_url = results[0].tm_picture_url;
                try {
                    fs.unlinkSync(pic_url);
                } catch (err) {
                    result(err, null);
                    console.error(err);
                }
            }
            //TODO:
            // delete child images before deleting from table
            // test if id is a parent_id
            delete_child_images_by_parent_id(id, (err, results) => {
                if (err) {
                    result(err, null);

                } else {
                    connection.query("DELETE FROM topic_messages WHERE tm_parent = ? or tm_id = ? ", [id, id], (err, results) => {
                        if (err) { console.log("error: ", err); result(err, null); }
                        else { result(null, results); }
                    });
                }
            })
        }
    })
}

// Moderation Message avec UPDATE
exports.moderateMessage = (data, result) => {
    connection.query("UPDATE topic_messages SET tm_moderation = ? WHERE tm_id = ?", [data.tm_moderation, data.tm_id], (err, results) => {
        if (err) { console.log("error: ", err); result(err, null); }
        else { result(null, results); }
    });
}

// Get one topic
// exports.getMessageByTitle = (title, result) => {
//     connection.query("SELECT * FROM topic_messages WHERE tm_title = ?", [title], (err, results) => {
//         if (err) { console.log("error: ", err); result(err, null); }
//         else { result(null, results[0]); }
//     });
// }
// Delete conversation
// exports.deleteConversationByTitle = (title, result) => {
//     connection.query("DELETE FROM topic_messages WHERE tm_title = ?", [title], (err, results) => {
//         if (err) { console.log("error: ", err); result(err, null); }
//         else { result(null, results[0]); }
//     });
// }

// Récupérer les Messages d'un seul utilisateur
// exports.userMessages = (id, result) => {
//     connection.query("SELECT tm.*, u.u_pseudo FROM topic_messages tm INNER JOIN users u ON tm.tm_user_id = u.u_id WHERE u.u_id = ? ORDER BY tm.tm_id ASC", 
//     [id.u_id], (err, results) => {
//         if(err) {console.log("error: ", err); result(err, null);} 
//         else {result(null, results);}
//     });
// }