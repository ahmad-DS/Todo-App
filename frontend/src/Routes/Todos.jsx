import React, { useEffect, useState } from 'react'
let token = localStorage.getItem("token") || "";
const Todos = () => {
  const [newTodo,setNewTodo]=useState("")
  const [todos, setTodos] = useState([]);



  const getTodos = () => {

    fetch("https://stark-brook-21533.herokuapp.com/todos", {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setTodos(res.data)

      })
      .catch(err => console.log(err))
  }

  //delete request

  useEffect(() => {
    getTodos()
  }, []);


  //add new todo
  const addTodo = () => {
    // console.log("added")
    fetch(`https://stark-brook-21533.herokuapp.com/todos/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({title:newTodo})
    })
      .then(res => res.json())
      .then(res => { getTodos() })
      .catch(err => { console.log("there", err) })

  }


  const handleToggle = (id, status) => {
    status = status ? false : true;
    fetch(`https://stark-brook-21533.herokuapp.com/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ status })
    })
      .then(res => res.json())
      .then(res => { getTodos() })
      .catch(err => { console.log("there", err) })

  }
  const handleDelete = (id) => {
    fetch(`https://stark-brook-21533.herokuapp.com/todos/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      // body:JSON.stringify({status})
    })
      .then(res => res.json())
      .then(res => { 
        console.log(res)
        getTodos()
       })
      .catch(err => { console.log("there", err) })

  }

  return (
    <div>
      <input type="text" placeholder='write something' onChange={(e)=>{setNewTodo(e.target.value)}} />
      <button onClick={addTodo}>add Todo</button>
      <h1>Your Todos</h1>
      <div>
        {todos?.map((el, idx) => {
          return (
            <div key={idx} style={{ border: "1px blue solid", display: "flex", justifyContent: "center", gap: "3rem", alignItems: 'center' }}>
              <h3>{el._id}</h3>
              <h3>{el.title}</h3>
              <h3>{el.status ? "Done" : "Not Done"}</h3>
              <div style={{ display: "flex", gap: "20px" }}>
                <button onClick={() => { handleToggle(el._id, el.status) }}>toggle</button>
                <button onClick={() => { handleDelete(el._id) }}>delete</button>
              </div>
            </div>
          )
        })
        }
      </div>
    </div>
  )
}

export default Todos