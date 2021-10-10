const connection = require("../config/database.js");
const fs = require('fs');

exports.get_picture_url_by_id=(id,cb) => {
    connection.query('select tm_picture_url from topic_messages where tm_id=?',[id],(err,results)=>{
        if(err){
            cb(err,null);
        }else{
            cb(null,results);
        }
    });
}

exports.get_message_by_id=(id,cb) => {
    connection.query('select * from topic_messages where tm_id=?',[id],(err,results)=>{
        if(err){
            cb(err,null);
        }else{
            cb(null,results);
        }
    });
}

exports.delete_child_images_by_parent_id = (parent_id, cb) => {
    connection.query('SELECT tm_picture_url FROM topic_messages WHERE tm_parent = ?', [parent_id], (err, results) => {
        if(err){
            cb(err,null);
        } else {
            for (let index = 0; index < results.length; index++) {
                const element = results[index];
                if (element.tm_picture_url) {
                    try {
                        fs.unlinkSync(element.tm_picture_url)
                    } catch (err) {
                        console.log(err);
                    }
                }
            }
            cb(null, results);
        }
    });
}