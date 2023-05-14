import React, {useContext} from 'react'
import projectContext from '../context/project/projectContext';

function TicketItem(props) {
    const context = useContext(projectContext);
    const {userIdToName} = context;
    const {ticket} = props;
    const date = new Date(ticket.date)

  return (
    <>
    <div className="container my-1">
              <div className="d-flex justify-content-around border border-3 rounded p-2">
                <div className='mx-2'>
                    <i className="fa-sharp fa-solid fa-ticket mx-2"></i>
                    <span className="badge bg-light text-dark">{ticket.ticketNumber}</span>
                </div>
                <div className='mx-2'>
                    <span className="badge bg-info text-dark">{ticket.ticketType}</span>
                </div>
                <div className='mx-2'>
                    <span className="badge bg-info text-dark">{ticket.ticketStatus}</span>
                </div>
                <div className='mx-2'>
                    <span className="badge bg-light text-dark">{userIdToName(ticket.createdBy)}</span>
                    <i className="fa-solid fa-right-long mx-2"></i>
                    <span className="badge bg-light text-dark">{userIdToName(ticket.assignedTo)}</span>
                </div>
                <div className='mx-2'>
                    <i className="fa-solid fa-calendar-days mx-2"></i>
                    <span className="badge bg-warning text-dark">{date.getDate()}/{date.getMonth()}/{date.getFullYear()}</span>
                </div>
              </div>
    </div>
    </>
  )
}

export default TicketItem