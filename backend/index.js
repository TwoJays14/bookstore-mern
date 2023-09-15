const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const booksRoute = require('./routes/booksRoute');

const app = express()
const port = process.env.PORT

// middleware to handle CORS errors
// Option 1: Allow all origins with default cors settings
// app.use(cors())

//Option 2: Allow custom origins
app.use(
  cors({
  origin: 'http://localhost:3000', // only clients with this origin can access this server
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
  })
)

// middleware for parsing request body
app.use(express.json())

app.get('/', (req, res) => {
  res.status(234).send('Welcome To MERN stack Bookstore')
})

// middleware to handle all routes with base path of /books. booksRoute file passed as second argument will contains logic for all routes
app.use('/books', booksRoute)
 

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
