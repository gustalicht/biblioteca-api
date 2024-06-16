const express = require('express');
const router = express.Router();
const bookController = require('../controllers/livroController');
const auth = require('../middleware/auth');

router.get('/', auth, bookController.getAllBooks);
router.get('/:id', auth, bookController.getBookById);
router.post('/', auth, bookController.createBook);
router.put('/:id', auth, bookController.updateBook);
router.delete('/:id', auth, bookController.deleteBook);

module.exports = router;
