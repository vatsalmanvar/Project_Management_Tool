import './App.css';
import {useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import About from "./components/About";
import ProjectDetail from './components/ProjectDetail';
import ProjectState from './context/project/ProjectState';
import TicketDetail from './components/TicketDetail';


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
    <ProjectState>
      <BrowserRouter>
        <Navbar/>
        <Alert alert={alert} />
        
        <div className="container my-6">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert}/>}></Route>
            <Route exact path="/about" element={<About/>}></Route>
            <Route exact path="/login" element={<Login showAlert={showAlert}/>}></Route>
            <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}></Route>
            <Route exact path="/project/:projectId" element={<ProjectDetail showAlert={showAlert}/>}></Route>
            <Route exact path="/ticket/:ticketId" element={<TicketDetail showAlert={showAlert}/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ProjectState>
    </>
  );
}

export default App;