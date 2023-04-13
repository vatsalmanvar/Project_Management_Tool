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
      <h2>All projects you are involved in</h2>
      <div className="row">
        
        {
          projects.length===0
          ?
          <div><p>You are involved with none of the projects</p></div>
          :
          projects.map((proj, index)=>{
            return (<div className="col-md-4" key={index}>
              <ProjectItem project={proj} />
            </div>)
          })
            
        }
    </div>
    </div>
  )
}

export default Projects