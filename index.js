// implement your API here
const express = require('express');
const Users = require('./data/db')

const server = express(); 

server.get('/', (req, res) => {
  res.send('Hello World')
});

server.get('/api/users', (req,res) => {
  // res.send(Users)
  Users.find()
  .then( users => {
    res.status(200).json(users)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ errorMessage: "Sorry there was an problem finding the users." })
  })
});



server.listen(8000, () => console.log('API running on port 8000'))
