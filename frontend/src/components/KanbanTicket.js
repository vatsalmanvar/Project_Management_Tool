import React, {useContext} from 'react'
import projectContext from '../context/project/projectContext';
import { useDrag } from 'react-dnd';

function KanbanTicket(props) {
    const context = useContext(projectContext);
    const {userIdToName} = context;
    const {ticket} = props;

    const [{isDragging}, drag] = useDrag(()=>({
      type: "ticket",
      item: {id: ticket._id},
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
      })
    }))

  return (
    <>
    <div ref={drag} className={`container border rounded m-1 p-1 ${isDragging ? "opacity-25" : "opacity-100"}`}>
              <div className="d-flex justify-content-around">
                <div>
                    <span className="badge bg-light text-dark">{ticket.ticketNumber}</span>
                    <br/>
                    <div>{ticket.title}</div>
                    <br/>
                    <div>{ticket.description}</div>
                </div>
              </div>
    </div>
    </>
  )
}

export default KanbanTicket