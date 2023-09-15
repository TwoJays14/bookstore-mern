const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const {Book} = require('./models/model')

const app = express()
const port = process.env.PORT

// middleware for parsing request body
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send('Welcome To MERN stack Bookstore')
})

// get all books 
app.get('/books', async (req, res) => {
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
app.get('/books/:id', async (req, res) => {
  try {

    const {id} = req.params

    const singleBook = await Book.findById(id)

    res.status(200).json({singleBook})
  } catch (error) {
    console.log(error)
  }
})

// update a book
app.put('/books/:id', async (req, res) => {
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
app.post('/books', async (req, res) => {
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
app.delete('/books/:id', async (req, res) => {
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

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => { // connection to mongodb 
  console.log(`Server connected successfully to database`) // returns a promise which is handled with .then chaining. Server is only created upon successful connection to database
  app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
    })
  })
  .catch(err => {
    console.error(err) // if there is an error it will be logged to the console
  }) 
