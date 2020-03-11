// implement your API here
const express = require('express');
const Users = require('./data/db')

const server = express(); 

server.use(express.json())
server.use(cors())

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
       errorMessage: "The users information could not be retrieved." 
    })
  })
});

// Adds a user to the datatbase.
server.post('/api/users/', (req,res) => {
  const userData = req.body
  Users.insert(userData)
  .then(user => {
    if (!userData.name || !userData.bio) {
      res.status(400).json({ errorMessage: 'Please provide the name and bio for the user.' })
    }
    res.status(201).json(user)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      errorMessage: 'There was an error while saving the user to the database'
    })
  })
})

// Deletes a user 
server.delete('/api/users/:id', (req,res) => {
  const id = req.params.id;
  Users.remove(id)
  .then( deleted => {
    if (deleted) {
      res.status(204).json(deleted)

    } else {
      res.status(404).json({success: false}, 'The user with the specified ID does not exist.')
    }
  })
  .catch(err=> {
    console.log(err)
    res.status(500).json({success: false}, 'The user could not be removed')
  })
})

// Get by user ID
server.get('/api/users/:id', (req,res) => {
  const id = req.params.id
  Users.findById(id)
  .then(user => {
    if (!id) {
      res.status(404).json({srrorMessage: 'The user with the specified ID does not exist.'})
    }
    res.status(200).json(user)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      errorMessage: 'The user information could not be retrieved.'
    })
  })
})

// Edits a user
server.put('/api/users/:id', (req,res) => {
  const id = req.params.id
  const userData = req.body

  
  Users.update(id, userData)
  
  
  .then(updated => {
    if (!id) {
      res.status(404).json({
        errorMessage: 'The user with the specidfied ID does not exist.'
      })
    } 
    if (!userData.name || !userData.bio) {
      res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' })
    }
    res.status(200).json(updated)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      errorMessage: 'The user information could not be modified.'
    })
  })
}) 


server.listen(8000, () => console.log('API running on port 8000'))
