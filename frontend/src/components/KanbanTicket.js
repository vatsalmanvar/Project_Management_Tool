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
    <div ref={drag} className={`container border border-5 rounded m-1 p-1 bg-light ${isDragging ? "opacity-25" : "opacity-100"}`}>
              <div className="d-flex flex-column bd-highlight">
                <div className='m-1 d-flex justify-content-around'>
                    <i className="fa-sharp fa-solid fa-ticket mx-2"></i>
                    <span className="badge bg-light text-dark">{ticket.ticketNumber}</span>
                </div>
                <br/>
                <div className=' d-flex justify-content-around'>
                    <span className="badge bg-light text-dark mx-1">{ticket.title}</span>
                </div>
                <br/>
                <div className='m-1 d-flex justify-content-around'>
                    <span className="badge bg-warning text-dark mx-1">{ticket.ticketType}</span>
                    <span className="badge bg-info text-dark mx-1">{ticket.ticketStatus}</span>
                </div>
                <div className='m-1 d-flex justify-content-around'>
                    <span className="badge bg-light text-dark">{userIdToName(ticket.createdBy)}</span>
                    <i className="fa-solid fa-right-long mx-2"></i>
                    <span className="badge bg-light text-dark">{userIdToName(ticket.assignedTo)}</span>
                </div>
              </div>
    </div>
    </>
  )
}

export default KanbanTicket