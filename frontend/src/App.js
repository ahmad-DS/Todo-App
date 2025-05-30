import logo from './logo.svg';
import './App.css';

import {Routes,Route} from "react-router-dom"
import Signup from './pages/Signup';
import Home from './pages/Home';
import Login from './pages/Login';
import Todos from './pages/Todos';
import Navbar from './components/Navbar';
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
