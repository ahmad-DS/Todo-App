import './App.css';
//
import {Routes,Route} from "react-router-dom"
import Signup from './routes/Signup.jsx';
import Home from './routes/Home.jsx';
import Login from './routes/Login.jsx';
import Todos from './routes/Todos.jsx'
import Navbar from './components/Navbar.jsx';
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
