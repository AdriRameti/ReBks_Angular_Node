const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');
var auth = require('../controllers/auth');

router.post('/', booksController.createBook);
router.post('/comments',auth.required,booksController.createComment);
router.post('/comments/delete',auth.required,booksController.deleteComment)
router.get('/pag', booksController.findallBooks);
router.get('/:asignatura/:curso/:ensenanza', booksController.findThisBook)
router.get('/:slug',booksController.findDetailsBook);
router.get('/:search/:tipo',booksController.findSearchBook);
router.get('/:id',booksController.findOneBook);
router.get('/user/:limit/:skip/:id', booksController.booksUser)
router.put('/:id',booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;