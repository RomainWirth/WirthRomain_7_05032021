// les queries viennent ici
// import connection
const fs = require('fs');
const connection = require("../config/database.js");
const db_queries = require("../util/db_queries.js");
// const { get_message_by_id, get_picture_url_by_id, delete_child_images_by_parent_id } = require('../util/db_queries.js');

// Insert Topic_message to Database = création d'un message
exports.insertTopicMessages = (data, result) => {
    connection.query("INSERT INTO topic_messages (tm_parent, tm_user_id, tm_title, tm_content, tm_picture_url, tm_moderation) VALUES (?, ?, ?, ?, ?, ?)", [data.tm_parent, data.user_id, data.title, data.content, data.picture_url, data.moderation], (err, results) => {
        if (err) { console.log("error: ", err); result(err, null); }
        else {
            db_queries.get_message_by_id(results.insertId, (err, res) => {
                if (err) { result(err, null); }
                else { result(null, res); }
            })
        }
    });
}

// Get Parent Topics = trouver tous les messages parents = 0 (titre principal)
exports.getParentMessages = (result) => {
    connection.query("SELECT tm.*, u.u_pseudo FROM topic_messages tm INNER JOIN users u ON tm.tm_user_id = u.u_id WHERE tm.tm_parent= 0 ORDER BY tm_posting_date DESC", (err, results) => {
        if (err) { console.log("error: ", err); result(err, null); }
        else { result(null, results); }
    });
}

// Get Child Topics = trouver tous les messages dont le parent = 0
exports.getChildMessages = (parent_id, result) => {
    connection.query("SELECT tm.*, u.u_pseudo FROM topic_messages tm INNER JOIN users u ON tm.tm_user_id = u.u_id WHERE tm.tm_parent = ? ORDER BY tm_posting_date DESC", [parent_id], (err, results) => {
        if (err) { console.log("error: ", err); result(err, null); }
        else { result(null, results); }
    });
}

// Update Topic_message to Database = modifier un message
exports.updateMessage = (data, result) => {
    if (data.tm_picture_url) { // si on update l'image depuis le DOM
        db_queries.get_picture_url_by_tm_id(data.tm_id, (err, results) => { // appel de la querie de ../utils/db_queries
            console.log(results) // vérif des résultats
            if (err) { result(err, null); }
            else {
                if (results.length > 0 && results[0].tm_picture_url) { // si on a un résultat
                    const pic_url = results[0].tm_picture_url; //on récupère l'url de l'image
                    try {
                        fs.unlinkSync(pic_url); // on supprime l'image de la bdd et du dossier images
                        console.log("image deleted");
                    } catch (err) {
                        result(err, null);
                        console.error(err);
                    }
                } // puis on met à jour la base de données en insérant une nouvelle image
                connection.query("UPDATE topic_messages SET tm_title = ?, tm_content = ?, tm_picture_url = ? WHERE tm_id = ?",
                    [data.title, data.content, data.tm_picture_url, data.tm_id], (err, results) => {
                    if (err) { console.log("error: ", err); result(err, null); }
                    else {
                        connection.query("UPDATE topic_messages SET tm_title = ? WHERE tm_parent = ?",
                            [data.title, data.tm_id], (err, results) => {
                            if (err) { console.log("error: ", err); result(err, null); }
                            else {
                                result(null, results);
                            }
                        });
                    }
                });
            }
        })
    } else { // gestion si on update pas l'image
        connection.query("UPDATE topic_messages SET tm_title = ?, tm_content = ? WHERE tm_id = ?", // MAJ de la BDD (titre et contenu du message) selon l'ID du message
            [data.title, data.content, data.tm_id], (err, results) => {
            if (err) { console.log("error: ", err); result(err, null); }
            else {
                connection.query("UPDATE topic_messages SET tm_title = ? WHERE tm_parent = ?",
                    [data.title, data.tm_id], (err, results) => {
                    if (err) { console.log("error: ", err); result(err, null); }
                    else {
                        result(null, results);
                    }
                });
            }
        });
    }
}

// Delete Message via id utilisateur
exports.deleteTopicByUserId = (data, result) => {
    connection.query("DELETE FROM topic_messages WHERE tm_user_id = ? ", [data], (err, results) => {
        if (err) { console.log("error: ", err); result(err, null); }
        else { result(null, results); }
    });
}

// Delete Message from Database + gestion des fichiers images de la bdd
exports.deleteMessageById = (id, result) => {
    db_queries.get_picture_url_by_tm_id(id, (err, results) => { // récupération de l'image selon l'id du message
        // console.log(results); // URL de l'image parent si tm_parent = tm_id
        if (err) { result(err, null); } // gestion de l'erreur
        else { // gestion de la suppresion du message
            if (results.length > 0) { // si on a une image : on obtient un tableau results contenant un objet dont on extrait l'url
                const picture_url = results[0].tm_picture_url;
                try {
                    if (fs.existsSync(picture_url)) { // vérification de l'existence du fichier
                        fs.unlinkSync(picture_url) //FileSystem : suppression des images/liens du "filesystem"
                    }
                } catch (err) { // gestion de l'erreur
                    result(err, null);
                    console.error(err);
                }
            }
            // et suppression de l'image de(s) l'élément(s) enfant(s) puis du(des) message(s) enfant(s)
            db_queries.delete_child_images_by_parent_id(id, (err, results) => { // gestion de la suppression des images de l'enfant
                if (err) {
                    result(err, null);
                } else {
                    // une fois l'image supprimée, suppresion de la table topic_message des lignes dont l'id = tm_parent ou tm_id
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