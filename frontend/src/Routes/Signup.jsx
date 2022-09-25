import React from 'react'
import { useState } from 'react';
const initState = {
  name: "",
  email: "",
  password: "",
  age: ""
}

const Signup = () => {
  const [user, setUser] = useState(initState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name,value)
    setUser({ ...user, [name]: name=="age"?+value:value })

  }
  console.log(user)

  const handleSubmit=(e)=>{
    e.preventDefault();
    fetch("https://stark-brook-21533.herokuapp.com/signup",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(user)
    })
    .then(res=>res.json())
    .then(res=>{console.log(res)})
    .catch(err=>{console.log(err)})
  }
  return (
    <div>
      <h1>Signup </h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder='Enter Name' onChange={handleChange} required/>
        <br />
        <input type="text" name="email" placeholder='Enter Email' onChange={handleChange} required/>
        <br />
        <input type="text" name="password" placeholder="Enter password" onChange={handleChange} required/>
        <br />
        <input type="text" name="age" placeholder='Enter age' onChange={handleChange} required/>
        <br />
        <input type="submit" />
      </form>
    </div>
  )
}

export default Signup;