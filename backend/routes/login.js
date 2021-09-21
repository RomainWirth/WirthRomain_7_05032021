const express = require('express');
const router = express.Router();
const loginCtrl = require('../controllers/login');

router.post('/signup', loginCtrl.signup); // requête post pour s'enregistrer
router.post('/login', loginCtrl.login); // requête post pour se 'log'

module.exports = router;