const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/coursesController');

router.post('/',coursesController.createCourses);
router.get('/',coursesController.findAllCourses);
router.get('/:ensenanza',coursesController.findAsigCourses);
router.get('/:ensenanza/:curso',coursesController.findSubjects);
router.put('/:id',coursesController.updateCourses);
router.get('/:id',coursesController.findOneCourses);
router.delete('/:id',coursesController.deleteCourses);


module.exports = router;