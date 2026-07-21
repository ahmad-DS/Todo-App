import './App.css';
//
import {Routes,Route} from "react-router-dom"
import Signup from './routes/Signup';
import Home from './routes/Home';
import Login from './routes/Login';
import Todos from './routes/Todos'
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
