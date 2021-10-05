const express = require('express');
const router = express.Router();
const instituteController = require('../controllers/ensenanzaController');

router.post('/',instituteController.createEnsenanza);
router.get('/',instituteController.findAllEnsenanza);
router.put('/:id',instituteController.updateEnsenanza);
router.get('/:id',instituteController.findOneEnsenanza);
router.delete('/:id',instituteController.deleteEnsenanza);

module.exports = router;