const express = require('express');
const router = express.Router();
const loanController = require('../controllers/emprestimosController');
const auth = require('../middleware/auth');

router.get('/', auth, loanController.getAllLoans);
router.post('/', auth, loanController.createLoan);
router.post('/:id/return', auth, loanController.returnBook);

module.exports = router;
