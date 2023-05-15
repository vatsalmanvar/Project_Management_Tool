import React,{useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import projectContext from '../context/project/projectContext';


const TicketDetail  = (props) => {

    const context = useContext(projectContext);
    const {users, fetchUsers, userIdToName} = context;
    const params = useParams();
    const [ticketId] = useState(params.ticketId)
    const [ticket, setTicket] = useState(null);
    const [sprintId, setSprintId] = useState(null)
    const [sprint, setSprint] = useState(null)
    const [sprintName, setSprintName] = useState(null)

    const fetchTicket = async()=>{
      const response = await fetch(`http://localhost:5000/api/project/get-ticket/${ticketId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token' : localStorage.getItem('token')
        }
      });
      const tick = await response.json();
      tick.createdBy = userIdToName(tick.createdBy);
      tick.assignedTo = userIdToName(tick.assignedTo);
      const date = new Date(tick.date);
      tick.date = `Created on: ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
      setTicket(tick);
      setSprintId(tick.currentSprint);
    }
    
    const fetchSprint = async()=>{
      if(sprintId){
        const response = await fetch(`http://localhost:5000/api/sprint/${sprintId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token' : localStorage.getItem('token')
          }
        });
        const spr = await response.json();
        setSprint(spr)
        setSprintName(spr.sprintName)
        console.log(spr.sprintName);
      }
    }
    
    useEffect(() => {
      fetchSprint();
    }, [sprintId])
    
    useEffect(() => {
      if(users.length === 0) fetchUsers();
      fetchTicket();
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
        <a href={`/project/${ticket.projectName}/modify-ticket/${ticket._id}`} className="btn btn-primary float-end">Modify Ticket</a>

      </div>
      <div className="card-body">
        
        <div className="border border-1 rounded m-3 p-3">
        <h5 className="card-title">Title</h5>
        <div className="card-text">
          {ticket.title}
        </div>
        </div>

        <div className="border border-1 rounded m-3 p-3">
        <h5 className="card-title">Description</h5>
        <div className="card-text">
          {ticket.description}
        </div>
        </div>

        <div className="border border-1 rounded m-3 p-3">
        <h5 className="card-title">Ticket Type</h5>
        <div className="card-text">
        <span className="badge text-bg-light mx-1">{ticket.ticketType}</span>
        </div>
        </div>

        <div className="border border-1 rounded m-3 p-3">
        <h5 className="card-title">Ticket Status</h5>
        <div className="card-text">
        <span className="badge text-bg-light mx-1">{ticket.ticketStatus}</span>
        </div>
        </div>

        <div className="border border-1 rounded m-3 p-3">
        <h5 className="card-title">Current Sprint</h5>
        <div className="card-text">
        <span className="badge text-bg-light mx-1">{ticket.currentSprint ? sprintName : "None"}</span>
        </div>
        </div>

        <div className="border border-1 rounded m-3 p-3">
        <h5 className="card-title">Created By</h5>
        <div className="card-text">
        <span className="badge text-bg-dark mx-1">{ticket.createdBy}</span>
        </div>
        </div>

        <div className="border border-1 rounded m-3 p-3">
        <h5 className="card-title">Assigned to </h5>
        <div className="card-text">
        <span className="badge text-bg-dark mx-1">{ticket.assignedTo}</span>
        </div>
        </div>

        <div className="border border-1 rounded m-3 p-3">
        <h5 className="card-title">History of Modification</h5>
        <div className="card-text">
          {
            ticket.history.length===0
            ?
            <div>No History</div>
            :
            ticket.history.map((it)=>{
              const date = new Date(it.date)
              var days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

              return (
                <div key={it._id} className="border border-3 rounded p-2 m-1">
                  <span className="badge bg-info text-dark mx-1">{userIdToName(it.user)}</span>
                  <span className="badge text-bg-warning mx-1"> {date.getDate()}/{date.getMonth()}/{date.getFullYear()} {days[date.getDay()]} {date.getHours()}:{date.getMinutes()}:{date.getSeconds()} </span> 
                    <br/>
                    {
                    it.description.map((it1)=>{
                      return (
                        <div key={it1._id}>
                        <span class="badge bg-light text-dark">{it1}</span>
                        </div>
                      )
                    })
                    }
                </div>
              )
            })
          }
        </div>
        </div>

      </div>
      <div className="card-footer text-body-secondary">
        {ticket.date}
      </div>
    </div>}
    </div>
  )
}


export default TicketDetail;