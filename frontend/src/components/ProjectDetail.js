import React,{useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import projectContext from '../context/project/projectContext';
import { useNavigate } from 'react-router-dom'

const ProjectDetail  = (props) => {

    let navigate = useNavigate();
    const context = useContext(projectContext);
    const {users, fetchUsers, userIdToName} = context;
    const params = useParams();
    const [projectId] = useState(params.projectId)
    const [project, setProject] = useState(null);
    const [tickets, setTickets] = useState([]);

    const fetchTickets = async()=>{
      const responce = await fetch(`http://localhost:5000/api/project/get-all-tickets/${projectId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token' : localStorage.getItem('token')
        }
      });
      const tick = await responce.json();
      setTickets(tick);
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
      
      // changing the date format
      const date = new Date(proj.date);
      proj.date = `Created on: ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

      setProject(proj);
    }
    
    const handleOnClickModifyProject = ()=>{
      navigate(`/modify-project/${project._id}`,{state: {project} });
    }

    useEffect(() => {
      //console.log(users.length);
      if(users.length === 0) fetchUsers();
      fetchProject();
      fetchTickets();
      // eslint-disable-next-line
    },[users])


  return (
    <div className="container">
      { project==null ?
      <div className="container">NOT ALLOWED</div>
      :
      <div className="card text-center">
      <div className="card-header inline">
        <h5 className='float-start'>{project.projectName}</h5>
        <button className="btn btn-primary float-end m-1" onClick={handleOnClickModifyProject}>Modify</button>
      </div>

      <div className="card-body">     
        <p className="card-text">
        <h5 className="card-title">Description</h5>
          {project.description}
        </p>

        <h5 className="card-title">Created By</h5>
        <p className="card-text">
        <span className="badge text-bg-dark mx-1">{project.createdBy}</span>
        </p>

        <h5 className="card-title">Admin</h5>
        <p className="card-text">
          {project.admin.map((proj, index)=>{
            return (
              <span className="badge text-bg-dark mx-1" key={index}>{proj}</span>)
          })}
        </p>
        
        <h5 className="card-title">Developers</h5>
        <p className="card-text">
          {project.developers.map((proj, index)=>{
            return (
              <span className="badge text-bg-dark mx-1" key={index}>{proj}</span>)
          })}
        </p>

        <h5 className="card-title">Tickets</h5>
        <div className="list-group">
          {
            tickets.length===0
            ?
            <div><p>None of tickets are created</p></div>
            :
            tickets.map((tick, index)=>{
              return (
              <a key={index} href={`/ticket/${tick._id}`} className="list-group-item list-group-item-action p-1">{tick.ticketNumber}</a>
              )
            })
          }
        </div>
        

        <a href="/" className="btn btn-primary m-2">Go somewhere</a>
      </div>
      <div className="card-footer text-body-secondary">
        {project.date}
      </div>
    </div>}
    </div>
  )
}

export default ProjectDetail