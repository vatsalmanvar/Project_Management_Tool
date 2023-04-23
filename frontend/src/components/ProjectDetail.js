import React,{useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import projectContext from '../context/project/projectContext';


const ProjectDetail  = (props) => {

    const context = useContext(projectContext);
    const {userIdToName} = context;
    const params = useParams();
    const [projectId] = useState(params.projectId)
    //console.log(projectId);
    const [project, setProject] = useState(null);

    const fetchProject = async()=>{
      const responce = await fetch(`http://localhost:5000/api/project/get-project/${projectId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token' : localStorage.getItem('token')
        }
      });
      const proj = await responce.json();

      // changing "user-id" to "user-name"
      proj.createdBy = userIdToName(proj.createdBy);
      for (let index = 0; index < proj.admin.length; index++) {
        proj.admin[index] = userIdToName(proj.admin[index]);
      }
      for (let index = 0; index < proj.developers.length; index++) {
        proj.developers[index] = userIdToName(proj.developers[index]);
      }
      
      setProject(proj);
    }

    useEffect(() => {
      fetchProject();
      // eslint-disable-next-line
    },[])


  return (
    <div className="container">
      { project==null ?
      <div className="container">NOT ALLOWED</div>
      :
      <div className="card text-center">
      <div className="card-header">
        {project.projectName}
      </div>
      <div className="card-body">
       
        <h5 className="card-title">Description</h5>
        <p className="card-text">
          {project.description}
        </p>

        <h5 className="card-title">Created By</h5>
        <p className="card-text">
        <span className="badge text-bg-light">{project.createdBy}</span>
        </p>

        <h5 className="card-title">Admin</h5>
        <p className="card-text">
          {project.admin.map((proj, index)=>{
            return (
              <span className="badge text-bg-light" key={index}>{proj}</span>)
          })}
        </p>
        
        <h5 className="card-title">Developers</h5>
        <p className="card-text">
          {project.developers.map((proj, index)=>{
            return (
              <span className="badge text-bg-light" key={index}>{proj}</span>)
          })}
        </p>

        <a href="/" className="btn btn-primary">Go somewhere</a>
      </div>
      <div className="card-footer text-body-secondary">
        {project.date}
      </div>
    </div>}
    </div>
  )
}

export default ProjectDetail