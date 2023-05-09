import React, { useState, useEffect, useContext } from 'react'
import ProjectItem from './ProjectItem';
import { Link, useNavigate } from "react-router-dom";
import projectContext from '../context/project/projectContext';

const Projects = (props) => {
    
    let navigate = useNavigate(); 
    const context = useContext(projectContext);
    const {fetchUsers} = context;
    const [projects, setProjects] = useState([]);
    const fetchAllProject = async()=>{
      const response = await fetch(`http://localhost:5000/api/project/get-all-projects`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token' : localStorage.getItem('token')
        }
    });
    const json = await response.json();
    setProjects(json)
    //console.log(json)
    }

    useEffect(() => {
      fetchUsers();
      fetchAllProject();
      // eslint-disable-next-line
    },[])
    
    const routeChange = () =>{ 
      let path = `/create-project`; 
      navigate(path);
    }

  return (
    <>
      <div className="container">
        <h2>All projects you are involved in</h2>
        <div className="row">
          {
            projects.length===0
            ?
            <div><p>You are involved with none of the projects</p></div>
            :
            projects.map((proj, index)=>{
              return (<div className="col-md-4" key={index}>
                <Link key={proj._id} to={`/project/${proj._id}`}> <ProjectItem project={proj} /> </Link>
              </div>)
            })
          }
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <button type="button" className="btn btn-outline-dark btn-lg" onClick={routeChange}>Create Project</button>
      </div>
    </>
  )
}

export default Projects

// 