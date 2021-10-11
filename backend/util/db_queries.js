const connection = require("../config/database.js");
const fs = require('fs');

// récupération des infos  de la ligne selon l'id du message
exports.get_message_by_id = (id, callback) => {
    connection.query('SELECT * FROM topic_messages WHERE tm_id = ?', [id], (err,results) => {
        if (err) {
            callback(err,null);
        } else {
            callback(null,results);
        }
    });
}

// récupération de l'image selon l'id du message
exports.get_picture_url_by_id = (id, callback) => {
    connection.query('SELECT tm_picture_url FROM topic_messages WHERE tm_id = ?', [id], (err,results) => {
        if (err) {
            callback(err,null);
        } else {
            callback(null,results);
        }
    });
}

// suppression des images des messages enfants d'un parent commun en vue de suppression du message parent
exports.delete_child_images_by_parent_id = (parent_id, callback) => {
    connection.query('SELECT tm_picture_url FROM topic_messages WHERE tm_parent = ?', [parent_id], (err, results) => {
        console.log(results);
        if (err) { // gestion de l'erreur
            callback(err,null);
        } else { 
            for (let index = 0; index < results.length; index++) { // boucle for pour récupérer la totalité des images dont le parent = 0
                const element = results[index];
                if (element.tm_picture_url) { // si on obtient un résultat dans la boucle : il existe au moins une image
                    try {
                        //FileSystem : suppression des images/liens du "filesystem"
                        fs.unlinkSync(element.tm_picture_url) 
                    } catch (err) { // gestion de l'erreur
                        console.log(err);
                    }
                }
            }
            callback(null, results);
        }
    });
}