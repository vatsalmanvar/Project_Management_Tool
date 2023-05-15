import React, {useEffect, useState, useContext} from 'react'
import projectContext from '../context/project/projectContext';
import { useParams, useNavigate } from 'react-router-dom';

const ModifyTicket = (props) => {
    let navigate = useNavigate();
    const context = useContext(projectContext);
    const {users, fetchUsers, userIdToName} = context;
    const params = useParams();
    const [ticketId] = useState(params.ticketId)
    const [projectId] = useState(params.projectId)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [ticketType, setTicketType] = useState("")
    const [ticketStatus, setTicketStatus] = useState("")
    const [userOfThisProject, setUserOfThisProject] = useState([])
    const [createdBy, setCreatedBy] = useState("")
    const [assignedTo, setAssignedTo] = useState("")

    const handleFormSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch(`http://localhost:5000/api/project/modify-ticket/${ticketId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({projectName:projectId ,title, description, assignedTo, ticketType, ticketStatus})
      });
      const json = await response.json()
      console.log(json);
      navigate(`/ticket/${ticketId}`);
      props.showAlert("Ticket Created Successfully", "success")
    //   if (json.success){
    //       navigate("/home");
    //       props.showAlert("Project Created Successfully", "success")
    //   }
    //   else{
    //       props.showAlert("Invalid Credentials", "danger")
    //   }
    }

    const fetchTicket = async()=>{
        const response = await fetch(`http://localhost:5000/api/project/get-ticket/${ticketId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token' : localStorage.getItem('token')
        }
        });
        const tick = await response.json();
        setTitle(tick.title);
        setDescription(tick.description);
        setAssignedTo(tick.assignedTo);
        setCreatedBy(tick.createdBy);
        setTicketType(tick.ticketType);
        setTicketStatus(tick.ticketStatus);
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

        let userAssociatedWithProject = [];
        userAssociatedWithProject.push(proj.createdBy);
        for (let index = 0; index < proj.admin.length; index++) {
            if(!userAssociatedWithProject.includes(proj.admin[index])) userAssociatedWithProject.push(proj.admin[index])
        }
        for (let index = 0; index < proj.developers.length; index++) {
            if(!userAssociatedWithProject.includes(proj.developers[index])) userAssociatedWithProject.push(proj.developers[index])
        }
        setUserOfThisProject(userAssociatedWithProject);
        console.log(userAssociatedWithProject);
        setCreatedBy(userAssociatedWithProject[0])        
        setAssignedTo(userAssociatedWithProject[0])
    }

    useEffect(() => {
        fetchProject();
        fetchTicket();
        if(users.length === 0) fetchUsers();
      // eslint-disable-next-line
    }, [])
    
  return (
    <div className="card">
        <div className="card-header inline">
          <h5 className='float-start'>MODIFY TICKET</h5>
        </div>

        <div className="card-body">  
            <form onSubmit={handleFormSubmit}>
                <div className="border border-1 rounded m-3 p-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input type="text" className="form-control" name="title" value={title} onChange={e => setTitle(e.target.value)}/>
                </div>
                
                <div className="border border-1 rounded m-3 p-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Description of Ticket</label>
                    <input type="text" className="form-control" name="description" value={description} onChange={e => setDescription(e.target.value)}/>
                </div>

                <div className="border border-1 rounded m-3 p-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Ticket Type</label>
                    <select defaultValue={"Task"} className="form-select" value={ticketType} onChange={e => setTicketType(e.target.value)} name="ticketType">
                        <option value="Task">TASK</option>
                        <option value="Story">STORY</option>
                        <option value="Bug">BUG</option>
                        <option value="New Feature">NEW FEATURE</option>
                        <option value="Improvement">IMPROVEMENT</option>
                        <option value="Spike">SPIKE</option>
                    </select>
                </div>

                <div className="border border-1 rounded m-3 p-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Ticket Status</label>
                    <select defaultValue={"To Do"} className="form-select" value={ticketStatus} onChange={e => setTicketStatus(e.target.value)} name="ticketStatus">
                        <option value="To Do">TO DO</option>
                        <option value="In Progress">IN PROGRESS</option>
                        <option value="QA">QA</option>
                        <option value="Completed">COMPLETED</option>
                    </select>
                </div>
                
                <div className="row">
                <div className="col border border-1 rounded m-3 p-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Created By</label>
                    <input className="form-control" type="text" placeholder={userIdToName(createdBy)} disabled/>
                </div>

                <div className="col border border-1 rounded m-3 p-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Assigned To</label>
                    <select name="assignedTo" value={assignedTo} className="form-select" onChange={e => setAssignedTo(e.target.value)}>
                        {   
                            Object.values(userOfThisProject).map((data, index)=>{
                                return (
                                    <option key={index} value={data}>{userIdToName(data)}</option>
                                )
                            })
                        }
                    </select>
                </div>
                </div>

              <button type="submit" className="btn btn-primary">UPDATE</button>
            </form>
        </div>
    </div>
  )
}

export default ModifyTicket