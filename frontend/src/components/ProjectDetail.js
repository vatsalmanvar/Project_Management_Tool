import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'


function ProjectDetail() {
    const params = useParams();
    const projectId = params.projectId;
    console.log(projectId);

    const [project, setProject] = useState(null);
    const [users, setUsers] = useState([])

    const userIdToName = (userId)=>{
      for (let index = 0; index < users.length; index++) {
        if(users[index]._id === userId){
          return users[index].name;
        }
      }
    }

    const fetchUsers = async()=>{
      const responce1 = await fetch(`http://localhost:5000/api/auth/get-all-user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token' : localStorage.getItem('token')
        }
      });
      setUsers(await responce1.json())
    }

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
      fetchUsers();
      fetchProject();
      //console.log("UseEffect executed")
      // eslint-disable-next-line
    },[project, users])


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