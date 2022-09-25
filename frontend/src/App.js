import logo from './logo.svg';
import './App.css';

import {Routes,Route} from "react-router-dom"
import Signup from './Routes/Signup';
import Home from './Routes/Home';
import Login from './Routes/Login';
import Todos from './Routes/Todos'
import Navbar from './Components/Navbar';
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
