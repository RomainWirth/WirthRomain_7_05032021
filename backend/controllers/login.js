const bcrypt = require('bcrypt'); // Algorythme de hachage = package de chiffrement
const jwt = require('jsonwebtoken'); // standard qui permet l'échange de jetons

const userData = require('../models/usersModel.js');
const getUserByEmail = userData.getUserByEmail;

// signup
exports.signup = (req, res) => { // async = (req, res) => {
    try {
        const pseudo = req.body.front_pseudo;
        const email = req.body.front_email;
        const pwd = req.body.front_password;
        if (!pseudo || !email || !pwd) { res.status(400).json(`${!pseudo ? "pseudo" : !email ? "email" : "pwd"} manquant`); }
        else {
            bcrypt.hash(req.body.front_password, 10)
            .then(hash => {
                userData.insertUsers({
                    u_pseudo: req.body.front_pseudo, // requiert le pseudo du corps de la requête
                    u_email: req.body.front_email, // adresse email du corps de la requête
                    u_password: hash // le mot de passe est stocké crypté
                    // date et id générés automatiquement et level default = 1
                });
                res.status(201).json('Utilisateur créé');
            })
            .catch(error => res.status(500).json({ error }));
        }
    } catch (error) {
        res.status(400).json('utilisateur déjà existant');
    }
};

// login
exports.login = (req, res) => {
    try {
        const email = req.body.front_email;
        const pwd = req.body.front_password;
        if (!email || !pwd) { res.status(400).json(`${!email ? "email" : "pwd"} manquant`); }

        getUserByEmail(email, (err, result) => {
            if (err) {res.send(err);}
            else {
                console.log('result fct login: ', result);
                let textRow = [result.TextRow];
                console.log('textRow: ', textRow);
                bcrypt.compare(pwd, textRow.u_password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({error: "Mot de passe incorrect"});
                    }
                    res.status(200).json({ 
                        userId: textRow.u_id,
                        token: jwt.sign (
                            { userId: textRow.u_id },
                            'RANDOM_TOKEN_SECRET', // clé secrète de l'encodage - en production : 'string' longue et aléatoire
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
            }
        });
    } catch (error) {
        res.status(403).json({ error: 'requête non autorisée'});
    }
};