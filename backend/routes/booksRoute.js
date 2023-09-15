const express = require('express');
const {Book} = require('../models/model');
const router = express.Router();


// get all books 
router.get('/', async (req, res) => {
  try { 

    const books = await Book.find({})

    res.status(200).json({
      count: books.length,
      data: books
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({message: err.message})
  }
})

// get one book
router.get('/:id', async (req, res) => {
  try {

    const {id} = req.params

    const singleBook = await Book.findById(id)

    res.status(200).json({singleBook})
  } catch (error) {
    console.log(error)
  }
})

// update a book
router.put('/:id', async (req, res) => {
  try {

    if (      // error handling conditional statement for if any of the parameters in the schema are not present/false
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ) {
      return res.status(400).send({ message: 'Invalid input. Please send all required fields: title, author, publishYear'})
    }

    const {id} = req.params // destructuring placeholder parameter 'id' from req.params object

    const result = await Book.findByIdAndUpdate(id, req.body);  // variable stores the value of the updated book 

    if (!result) {
      return res.status(404).json({messsage: 'Book not found'})
    }

    res.status(200).json({message: "Book updated successfully"})


  } catch (err) {
    console.log(err);
    res.status(500).json({message: err.message})
  }
})

// Route to save a new book
router.post('/', async (req, res) => {
  try {     // error handling conditional state for if any of the parameters defined in the         schema are not present
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ) {
      return res.status(400).send({ message: 'Invalid input. Please send all required fields: title, author, publishYear'})
    }

    const newBook = {     // variable to store inputs from user
      title: req.body.title,      
      author: req.body.author,
      publishYear: req.body.publishYear
    }

    const book = await Book.create(newBook)  // new document in the database is created 

    return res.status(201).send(book) // sends 201 status code and new book object back to the client

  } catch (err) {
    console.log(err)
    res.status(500).json({message: err.message})
  }
})

// delete a book
router.delete('/:id', async (req, res) => {
  try {
    const {id} = req.params

    const result = await Book.findByIdAndDelete(id)

    if(!result) {
      return res.status(404).json({message: 'Book not found'});
    }

    res.status(200).json({message: 'Book deleted successfully'});

  } catch (err) {
    console.log(err)
    res.status(500).json({message: err.message});
  }
})

module.exports = router
