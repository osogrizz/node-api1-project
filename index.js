// implement your API here
const express = require('express');
const Users = require('./data/db')

const server = express(); 

server.use(express.json())

server.get('/', (req, res) => {
  res.send('Hello World')
});

// Gets all users from database.
server.get('/api/users', (req,res) => {
  Users.find()
  .then( users => {
    res.status(200).json(users)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
       errorMessage: "Sorry there was an problem finding the users." 
    })
  })
});

// Adds a user to the datatbase.
server.post('/api/users/', (req,res) => {
  const userData = req.body
  Users.insert(userData)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      errorMessage: 'Please provide the name and bio for the user.'
    })
  })
})

server.delete('/api/users/:id', (req,res) => {
  const id = req.params.id;
  Users.remove(id)
  .then( deleted => {
    res.status(200).json(deleted)
  })
  .catch(err=> {
    console.log(err)
    res.status(500).json('Sorry there was an error removing the user.')
  })
})

server.get('/api/users/:id', (req,res) => {
  const id = req.params.id
  Users.findById(id)
  .then( user => {
    res.status(200).json(user)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      errorMessage: 'Sorry I cannot find that user.'
    })
  })
})

server.listen(8000, () => console.log('API running on port 8000'))
