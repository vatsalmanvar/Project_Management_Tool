import React, {useEffect, useState, useContext} from 'react'
import projectContext from '../context/project/projectContext';
import { useNavigate, useParams } from 'react-router-dom'
import TicketItem from './TicketItem';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const ModifySprint = (props) => {
    
    const params = useParams();
    let navigate = useNavigate();
    const context = useContext(projectContext);
    const {users, fetchUsers} = context;
    const [tickets, setTickets] = useState([])
    const [checkedTickets, setCheckedTickets] = useState([])
    const [sprint, setSprint] = useState([])

    const handleFormSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch(`http://localhost:5000/api/sprint/modify-sprint/${params.sprintId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({ tickets:checkedTickets})
      });
      const json = await response.json()
      console.log(json);
      if (json.success){
        props.showAlert("Project Modified Successfully", "success")
        navigate(`/project/${params.projectId}`);
      }
      else{
          props.showAlert("Invalid Credentials", "danger")
      }
    }

    const fetchSprint = async()=>{
        const response = await fetch(`http://localhost:5000/api/sprint/${params.sprintId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token' : localStorage.getItem('token')
        }
        });
        const spr = await response.json();
        setSprint(spr)
      }

    const fetchTickets = async()=>{
      const response = await fetch(`http://localhost:5000/api/project/get-all-tickets/${params.projectId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token' : localStorage.getItem('token')
        }
      });
      let tick = await response.json();
      tick = tick.filter( it => it.currentSprint === null )
      setTickets(tick);
      console.log("Ticket Fetched", tick)
    }

    // Add/Remove checked item from list
    const handleCheck = (e) => {
      var updatedList = [...checkedTickets];
      if (e.target.checked) {
        updatedList = [...checkedTickets, e.target.value];
      } else {
        updatedList.splice(checkedTickets.indexOf(e.target.value), 1);
      }
      setCheckedTickets(updatedList);
    };

    useEffect(() => {
      if(users.length === 0) fetchUsers();
      fetchTickets();
      fetchSprint();
      // eslint-disable-next-line
    }, [])
    
  return (
        <div className="card">
        <div className="card-header inline">
          <h5 className='float-start'>MODIFY SPRINT</h5>
        </div>

        <div className="card-body">
            <form onSubmit={handleFormSubmit}>

              <div className="container border border-1 rounded m-3 p-3">
                <label className="form-label">Name of Sprint</label>
                <input disabled type="text" className="form-control" name="SprintName" value={sprint.sprintName}/>
              </div>

              <div className="container border border-1 rounded m-3 p-3">
                <label className="form-label">Tickets</label>
                <br></br>
                {
                  tickets.length===0
                  ?
                  <div>None of tickets are created</div>
                  :
                  tickets.map((it)=>{
                    return(
                      <label key={it._id} className="d-inline-flex align-items-center" >
                          <input key={it._id} value={it._id} type="checkbox" onChange={handleCheck} />
                          <TicketItem  ticket={it} />
                      </label>
                    )
                  })
                }
              </div>

              <button type="submit" className="btn btn-primary">MODIFY</button>
            </form>
        </div>
    </div>
    )
}

export default ModifySprint