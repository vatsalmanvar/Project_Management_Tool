import React, { useEffect, useState } from 'react'
import Draggable from 'react-draggable';


const KanbanView = (props) => {
    const {tick} = props;
    const [tickets, setTickets] = useState([])

    useEffect(() => {
        console.log('Kanban View', tick);
      setTickets(tick);
    }, [])
    
    
    return (
    <div>
    
    {
        Object.values(tickets).map((it)=>{
            return(
                <Draggable><div className="container border m-1 p-1">{it.title}</div></Draggable>
            )
        })
    }
    </div>
  )
}

export default KanbanView