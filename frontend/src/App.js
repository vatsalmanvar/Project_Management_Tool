import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import About from "./components/About";
import {useState} from 'react';

function App() {

  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    }, 1500)
  }

  return (
    <>
    {/* Context Api */}
      <BrowserRouter>
        <Navbar/>
        <Alert alert={alert} />
        
        <div className="container my-6">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert}/>}></Route>
            <Route exact path="/about" element={<About/>}></Route>
            <Route exact path="/login" element={<Login showAlert={showAlert}/>}></Route>
            <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
      {/* Context api ends */}
    </>
  );
}

export default App;