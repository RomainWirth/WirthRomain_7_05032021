import express from 'express'; // modifier par import
const router = express.Router();
import loginCtrl from '../controllers/login';

router.post('/signup', loginCtrl.signup); // requête post pour s'enregistrer
router.post('/login', loginCtrl.login); // requête post pour se 'log'

module.exports = router;