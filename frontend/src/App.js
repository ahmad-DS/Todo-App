import './App.css';
//
import {Routes,Route} from "react-router-dom"
import Signup from './routes/Signup.js';
import Home from './routes/Home.js';
import Login from './routes/Login.js';
import Todos from './routes/Todos.js'
import Navbar from './components/Navbar.js';
function App() {
  return (
    <div className="App">
   <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/todos" element={<Todos/>}/>
      </Routes>
    </div>
  );
}

export default App;
