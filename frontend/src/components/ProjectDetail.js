import React, {useState, useEffect, useContext} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import projectContext from '../context/project/projectContext';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TicketItem from './TicketItem';
import KanbanView from './KanbanView';

const ProjectDetail  = (props) => {

    let navigate = useNavigate();
    const context = useContext(projectContext);
    const {users, fetchUsers, userIdToName} = context;
    const params = useParams();
    const [projectId] = useState(params.projectId)
    const [project, setProject] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);

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
      console.log("Ticket Fetched")
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

      // changing the date format
      const date = new Date(proj.date);
      proj.date = `Created on: ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

      setProject(proj);
    }

    const fetchCurrentUser = async()=>{
      const responce = await fetch(`http://localhost:5000/api/auth/getuser`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token' : localStorage.getItem('token')
        }
      });
      const json = await responce.json();
      setCurrentUser(json._id);
    }
    
    const handleOnClickDeleteProject = async()=>{
      const responce = await fetch(`http://localhost:5000/api/project/delete-project`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'auth-token' : localStorage.getItem('token')
        },
        body: JSON.stringify({projectId})
      });
      await responce.json();
      props.showAlert("Project and relevant Tickets Deleted Successfully", "success")
      navigate(`/projects`);

    }

    const handleOnClickModifyProject = ()=>{
      navigate(`/modify-project/${project._id}`);
    }

    const handleOnClickNewTicket = ()=>{
      navigate(`/project/${project._id}/create-ticket`)
    }

    useEffect(() => {
      //console.log(users.length);
      fetchCurrentUser();
      if(users.length === 0) fetchUsers();
      fetchProject();
      fetchTickets();
    },[])


  return (
    <div className="container">
      { project.length===0 ?
        <div className="container">NOT ALLOWED</div>
        :
        <>
        
        {/* { tickets.length===0
        ?
        <div>No Tickets</div>
        :
        <div className="conatainer border p-3 m-2">
          <DndProvider backend={HTML5Backend}>
            <KanbanView tickets={tickets} setTickets={setTickets} />
          </DndProvider>
        </div>
        } */}



        <div className="card">
          <div className="card-header inline">
            <h5 className='float-start'>{project.projectName}</h5>
            <button disabled={project.developers.includes(currentUser)} className="btn btn-primary float-end m-1" onClick={handleOnClickModifyProject}>MODIFY PROJECT</button>
          </div>

          <div className="card-body">    
            <div className="container border border-1 rounded p-3"> 
            <div className="card-text">
            <h5 className="card-title">Description</h5>
              {project.description}
            </div>
            </div>

            <div className="container border border-1 rounded p-3">
            <h5 className="card-title">Created By</h5>
            <p className="card-text">
            <span className="badge text-bg-dark mx-1">{userIdToName(project.createdBy)}</span>
            </p>
            </div>

            <div className="container border border-1 rounded p-3">
            <h5 className="card-title">Admin</h5>
            <p className="card-text">
              {project.admin.map((proj, index)=>{
                return (
                  <span className="badge text-bg-dark mx-1" key={index}>{userIdToName(proj)}</span>)
              })}
            </p>
            </div>
            
            <div className="container border border-1 rounded p-3">
            <h5 className="card-title">Developers</h5>
            <p className="card-text">
              {project.developers.map((proj, index)=>{
                return (
                  <span className="badge text-bg-dark mx-1" key={index}>{userIdToName(proj)}</span>)
              })}
            </p>
            </div>


            <div className="container border border-1 rounded p-3">
            <h5 className="card-title">KanBan View</h5>
            <p className="card-text">
              { tickets.length===0
              ?
              <div>No Tickets</div>
              :
              <div className="conatainer border p-3 m-2">
                <DndProvider backend={HTML5Backend}>
                  <KanbanView tickets={tickets} setTickets={setTickets} projectId={projectId} />
                </DndProvider>
              </div>
              }
            </p>
            </div>
            
            <div className="container border border-1 rounded p-3">
              <h5 className="card-title">Tickets</h5>
                {
                tickets.length===0
                ?
                <div><p>None of tickets are created</p></div>
                :
                tickets.map((tick, index)=>{
                  return (
                    <div>
                      <Link  to={`/ticket/${tick._id}`}> <TicketItem ticket={tick} /> </Link>
                    </div>
                    )
                  })
                }
                <button className="btn btn-primary mx-3 my-1" onClick={handleOnClickNewTicket}>New Ticket</button>
            </div>
          </div>
          <div className="card-footer text-body-secondary">
            {project.date}
            <button disabled={project.createdBy!==currentUser} className="btn btn-danger float-end m-1" onClick={handleOnClickDeleteProject}>DELETE PROJECT</button>
          </div>
        </div>
      </>
      }
    </div>

  
  )
}

export default ProjectDetail

