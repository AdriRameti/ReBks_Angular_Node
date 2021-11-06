const express = require('express');
const router = express.Router();
const userControler = require('../controllers/userController')
var auth = require('../controllers/auth');
router.put('/update',auth.required,userControler.updateUser);
router.get('/',userControler.readUser);
router.post('/register',userControler.createUser);
router.post('/login',userControler.readLogin);
router.get('/showFav/:slug',auth.required,userControler.showFav);
router.get('/showFoll/:userName',auth.required,userControler.showFoll);
router.post('/favorite',auth.required,userControler.favorite);
router.post('/follow',auth.required,userControler.follow);
router.post('/comments',auth.required,userControler.createComment);
module.exports = router;