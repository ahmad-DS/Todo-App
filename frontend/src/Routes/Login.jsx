import React, { useState } from 'react'

let token=localStorage.getItem("token") || ""

const Login = () => {
  const [user, setUser] = useState({email:"",password:""});

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name,value)
    setUser({ ...user, [name]: value })

  }
  console.log(user);

  const handleSubmit=(e)=>{
    e.preventDefault();
    fetch("https://stark-brook-21533.herokuapp.com/login",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(user)
    })
    .then(res=>res.json())
    .then(res=>{
      console.log(res);
      alert("successfully logged in")
      localStorage.setItem("token",res.token)
    })
    .catch(err=>{console.log(err)})
  }
  return (
    <div>
      <h1>Login </h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" placeholder='Enter Email' onChange={handleChange} required/>
        <br />
        <input type="text" name="password" placeholder="Enter password" onChange={handleChange} required/>
        <br />
        <input type="submit" />
      </form>
    </div>
  )
}

export default Login