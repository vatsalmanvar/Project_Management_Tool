import React, { useEffect, useState } from 'react'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import KanbanView from './KanbanView';
import { useParams } from 'react-router-dom';


const KanbanFilter = () => {

    const params = useParams();
    const [tickets, setTickets] = useState([]);
    const [projectId] = useState(params.projectId)
    const [sprints, setSprints] = useState([])
    const [filterBySprintId, setFilterBySprintId] = useState("null");

    const fetchTickets = async()=>{
        const response = await fetch(`http://localhost:5000/api/project/get-all-tickets/${projectId}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'auth-token' : localStorage.getItem('token')
          }
        });
        let tick = await response.json();
        if(filterBySprintId !== "null") tick = tick.filter(it => it.currentSprint===filterBySprintId)
        setTickets(tick);
        console.log("Ticket Fetched")
    }

    const fetchAllSprints = async()=>{
        const response = await fetch(`http://localhost:5000/api/sprint/all-sprint/${projectId}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'auth-token' : localStorage.getItem('token')
          }
        });
        const json = await response.json();
        setSprints(json)
        console.log(json)
    }
    
    useEffect(() => {
      fetchTickets();
    }, [filterBySprintId])
    

    useEffect(() => {
        fetchAllSprints();
        fetchTickets();
    }, [])
    
    
  return (
    <>
        <div className="card">
          <div className="card-header inline">
            <h5 className='float-start'>KanbanView</h5>
          </div>

          <div className="card-body"> 

            <div className="container border border-1 rounded p-3">
            <label htmlFor="exampleInputEmail1" className="form-label">SPRINTS</label>
            <select defaultValue={"null"} className="form-select" value={filterBySprintId} onChange={e => setFilterBySprintId(e.target.value)} name="filter">
                <option value="null">ALL</option>
                {
                    sprints.map((it) => {
                        return(
                            <option value={it._id}>{it.sprintName}</option>
                        )
                    })
                }
            </select>
            </div>

            <div className="container border border-1 rounded p-3">
            <h5 className="card-title"> KANBAN VIEW</h5>
            <div className="card-text">
            { 
                tickets.length===0
                ?
                <div>No Tickets</div>
                :
                <div className="container my-3">
                <DndProvider backend={HTML5Backend}>
                    <KanbanView tickets={tickets} setTickets={setTickets} projectId={projectId} />
                </DndProvider>
                </div>
            }
            </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default KanbanFilter