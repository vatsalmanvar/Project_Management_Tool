import React, { useState, useEffect } from 'react'
import ProjectItem from './ProjectItem';

function Projects() {
    
    const [projects, setProjects] = useState([]);

    const fetchAllProject = async()=>{
      const responce = await fetch(`http://localhost:5000/api/project/get-all-projects`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token' : localStorage.getItem('token')
        }
    });
    const json = await responce.json();
    setProjects(json)
    console.log(json)
    }

    useEffect(() => {
      fetchAllProject();
      // eslint-disable-next-line
    },[])
  
  return (
    <div className="container">
      <div className="row my-3">
        <h2>All projects you are involved in</h2>
        <div className="container mx-3">
          {projects.length===0 && "No PROJECTS to display"}
        </div>
        {projects.map((note)=>{
          return <ProjectItem />
         })}
    </div>
    </div>
  )
}

export default Projects