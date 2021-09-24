const bcrypt = require('bcrypt'); // Algorythme de hachage = package de chiffrement
const jwt = require('jsonwebtoken'); // standard qui permet l'échange de jetons

const insertUser = require('../models/usersModel'); // récupéré du modèle User.js avec uniqueValidator : on ne peut pas utiliser deux fois la même adresse email

// signup
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // hash : salt = 10 tours d'algorythme de hashage suffisent pour la sécurité et éviter que ce soit trop long
    .then(hash => { // hash = méthode pour crypter le mot de passe
        const user = new insertUser({
            u_pseudo: req.body.pseudo, // requiert le pseudo du corps de la requête
            u_email: req.body.email, // adresse email du corps de la requête
            u_password: hash // le mot de passe est stocké crypté
        });
        user.save() // enregistrement du user dans la BDD
        .then(() => res.status(201).json({ message: 'utilisateur créé'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// login
exports.login = (req, res, next) => {
    insertUser.findOne({ u_email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(403).json({ error: 'unothorized request'});
        }
        bcrypt.compare(req.body.password, user.u_password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: 'mot de passe incorrect'})
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
                    'RANDOM_TOKEN_SECRET', // clé secrète de l'encodage - en production : 'string' longue et aléatoire
                    { expiresIn: '24h' } // limite de durée du token : 24h
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};