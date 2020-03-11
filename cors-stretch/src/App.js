import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';


function App() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    axios
    .get('http://localhost:8000/api/users')
    .then(res=> {
      console.log(res.data)
      setUsers(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  },[])

  return (
    <div className="App">
      <h1>Hello World</h1>
      {users.map(user => (
        <h2 key={user.id}>{user.name}</h2>
      ))}
    </div>
  );
}

export default App;
