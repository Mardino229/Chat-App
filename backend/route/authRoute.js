const express = require('express');

const router = express.Router();

const actorCtrl = require('../controlleur/actorControlleur');

router.post('/signup', actorCtrl.signup);

router.post('/login', actorCtrl.login);

module.exports = router;