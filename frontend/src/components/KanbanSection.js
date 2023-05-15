import React from 'react'
import KanbanTicket from './KanbanTicket';
import { useDrop } from 'react-dnd';

const KanbanSection = (props) => {
    const{specifictickets, sectionName, setTickets} = props;

    const [{isOver}, drop] = useDrop(()=>({
        accept: "ticket",
        drop: (item) => addItemToSection(item),
        collect: (monitor) => ({
          isOver: !!monitor.isOver()
        })
    }))

    const addItemToSection = async(item)=>{
        const newStatus = sectionName;
        const response = await fetch(`http://localhost:5000/api/project/update-ticket-status/${item.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token' : localStorage.getItem('token')
            },
            body: JSON.stringify({newStatus})
        });
        const res = await response.json();
        console.log(res);

        //console.log("dropped", item.id, sectionName, tickets);
        // const mTickets = tickets.map( it => {
        //     if(it._id === item.id){
        //         console.log("found", it.ticketNumber, it.ticketType, sectionName);
        //         return {...it, ticketType: sectionName};
        //     }
        //     return it;
        // })
        // setTickets(mTickets);

        setTickets(prevState => {
            const newState = prevState.map(it=>{
                if(it._id === item.id){
                    return {...it, ticketStatus: sectionName}
                }
                return it;
            })
            return newState;
        })
    }

    
  return (
    <div ref={drop} className={`col-md-3 float-left border rounded ${isOver ? "bg-light" : ""} `}>
        <div>{sectionName}</div>
        {
        Object.values(specifictickets).map((it) => {
        return (
            <div key={it._id}>
                <KanbanTicket ticket={it} />
            </div>
        );
        })}
    </div>
  )
}

export default KanbanSection