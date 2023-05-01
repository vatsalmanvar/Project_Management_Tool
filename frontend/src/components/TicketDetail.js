import React,{useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import projectContext from '../context/project/projectContext';


const TicketDetail  = (props) => {

    const context = useContext(projectContext);
    const {users, fetchUsers, userIdToName} = context;
    const params = useParams();
    const [ticketId] = useState(params.ticketId)
    const [ticket, setTicket] = useState(null);

    const fetchTicket = async()=>{
      const responce = await fetch(`http://localhost:5000/api/project/get-ticket/${ticketId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token' : localStorage.getItem('token')
        }
      });
      const tick = await responce.json();
      tick.createdBy = userIdToName(tick.createdBy);
      tick.assignedTo = userIdToName(tick.assignedTo);
      const date = new Date(tick.date);
      tick.date = `Created on: ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
      setTicket(tick);
    }
    
    useEffect(() => {
      fetchTicket();
      if(users.length === 0) fetchUsers();
      // eslint-disable-next-line
    },[users])

  return (
    <div className="container">
      { ticket==null ?
      <div className="container">NOT ALLOWED</div>
      :
      <div className="card">
      <div className="card-header">
        {ticket.ticketNumber}
      </div>
      <div className="card-body">
        
        <div className="border border-1 rounded m-3 p-3">
        <h5 className="card-title">Title</h5>
        <p className="card-text">
          {ticket.title}
        </p>
        </div>

        <div className="border border-1 rounded m-3 p-3">
        <h5 className="card-title">Description</h5>
        <p className="card-text">
          {ticket.description}
        </p>
        </div>

        <div className="border border-1 rounded m-3 p-3">
        <h5 className="card-title">Ticket Type</h5>
        <p className="card-text">
        <span className="badge text-bg-light mx-1">{ticket.ticketType}</span>
        </p>
        </div>

        <div className="border border-1 rounded m-3 p-3">
        <h5 className="card-title">Created By</h5>
        <p className="card-text">
        <span className="badge text-bg-dark mx-1">{ticket.createdBy}</span>
        </p>
        </div>

        <div className="border border-1 rounded m-3 p-3">
        <h5 className="card-title">Assigned to </h5>
        <p className="card-text">
        <span className="badge text-bg-dark mx-1">{ticket.assignedTo}</span>
        </p>
        </div>

        <a href={`/project/${ticket.projectName}/modify-ticket/${ticket._id}`} className="btn btn-primary">Modify Ticket</a>
      </div>
      <div className="card-footer text-body-secondary">
        {ticket.date}
      </div>
    </div>}
    </div>
  )
}


export default TicketDetail;