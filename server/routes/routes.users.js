const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.post('/',usersController.createUsers);
router.get('/',usersController.findAllUsers);
router.put('/:id',usersController.updateUsers);
router.get('/:id',usersController.findOneUsers);
router.delete('/:id',usersController.deleteUsers);

module.exports = router;