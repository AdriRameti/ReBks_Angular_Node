const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');
var auth = require('../controllers/auth');

router.post('/', booksController.createBook);
router.post('/comments',auth.required,booksController.createComment)
router.get('/pag', booksController.findallBooks);
router.get('/:asignatura/:curso/:ensenanza', booksController.findThisBook)
router.get('/:slug',booksController.findDetailsBook);
router.get('/:search/:tipo',booksController.findSearchBook);
router.put('/:id',booksController.updateBook);
router.get('/:id',booksController.findOneBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;