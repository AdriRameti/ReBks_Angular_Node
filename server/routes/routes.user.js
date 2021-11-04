const express = require('express');
const router = express.Router();
const userControler = require('../controllers/userController')
var auth = require('../controllers/auth');
router.put('/update',auth.required,userControler.updateUser);
router.get('/',auth.required,userControler.readUser);
router.post('/register',userControler.createUser);
router.post('/login',userControler.readLogin);
router.get('/showFav/:slug',auth.required,userControler.showFav);
router.post('/favorite',auth.required,userControler.favorite);
module.exports = router;