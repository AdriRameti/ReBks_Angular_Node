const express = require('express');
const router = express.Router();
const userControler = require('../controllers/userController')
var auth = require('../controllers/auth');
router.put('/',auth.required,userControler.updateUser);
router.get('/',auth.required,userControler.readUser);
router.post('/register',userControler.createUser);
router.post('/login',userControler.readLogin);
module.exports = router;