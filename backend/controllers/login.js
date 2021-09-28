const bcrypt = require('bcrypt'); // Algorythme de hachage = package de chiffrement
const jwt = require('jsonwebtoken'); // standard qui permet l'échange de jetons

const userData = require('../models/usersModel');
const user = userData.getUserByEmail;

// signup
exports.signup = async (req, res) => {
    try {
        const pseudo = req.body.pseudo;
        const email = req.body.email;
        const pwd = req.body.password;
        if (!pseudo || !email || !pwd) { res.status(400).json(`${!pseudo ? "pseudo" : !email ? "email" : "pwd"} manquant`); }            
        
        const hash = await bcrypt.hash(req.body.password, 10);
        userData.insertUsers({
            u_pseudo: req.body.pseudo, // requiert le pseudo du corps de la requête
            u_email: req.body.email, // adresse email du corps de la requête
            u_password: hash // le mot de passe est stocké crypté
            // date et id générés automatiquement et level default = 1
        });
        res.status(200).json('Utilisateur créé');
    } catch (error) {
        if (error.errno === 19) {
            res.status(400).json('utilisateur déjà existant');
        } else {
            console.log(error);
            res.status(500).json({ error });
        }
    }
};

// exports.signup = (req, res, next) => {
//     bcrypt.hash(req.body.password, 10)
//     .then(hash => {
//         userData.insertUsers({
//             u_pseudo: req.body.pseudo, // requiert le pseudo du corps de la requête
//             u_email: req.body.email, // adresse email du corps de la requête
//             u_password: hash // le mot de passe est stocké crypté
//             // date et id générés automatiquement et level default = 1
//         });
//         res.status(200).json('Utilisateur créé');
//     })
//     .catch(error => res.status(500).json({ error }));
// };

// login
exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        const pwd = req.body.password;
        if (!email || !pwd) { res.status(400).json(`${!email ? "email" : "pwd"} manquant`); }

        if (user) {
            const validPwd = await bcrypt.compare(req.body.password, user.u_password);
            if (validPwd) {
                const token = jwt.sign(
                    { userId: user.u_id }, 
                    'RANDOM_TOKEN_SECRET', 
                    {expiresIn: "24h"}
                );
                res.status(200).json({ userId: user.u_id, token: token });
            } else {
                return res.status(401).json("Mot de passe incorrect");
            }
        } else {
            res.status(401).json("Utilisateur inconnu");
        }
    } catch (error) {
        res.status(400).json({ error: 'requête non autorisée'});
    }
};

// exports.login = (req, res, next) => {
//     userData.getUserByEmail({ u_email: req.body.email })
//     .then()
// }