const express = require('express');
const router = express.Router();
const userControler = require('../controllers/userController')

// router.get('/',userControler.readUser);
router.post('/register',userControler.createUser);
router.post('/login',userControler.readLogin);
module.exports = router;