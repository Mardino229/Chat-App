const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

const actorCtrl = require('../controller/actorController');


router.get('/getActors', auth, actorCtrl.getActor)

module.exports = router;