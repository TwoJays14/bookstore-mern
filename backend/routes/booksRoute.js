const express = require('express');
const router = express.Router();

const {
  getAllBooks,
  getOneBook,
  updateBook,
  createBook,
  deleteBook
} = require('../controllers/books')



router.route('/').get(getAllBooks).post(createBook);
router.route('/:id').get(getOneBook).put(updateBook).delete(deleteBook);


module.exports = router
