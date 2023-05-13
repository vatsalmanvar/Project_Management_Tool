import React from 'react'

function SprintItem(props) {
  const {sprint} = props;
  const date = new Date(sprint.date)
  const startDate = new Date(sprint.startDate)
  const endDate = new Date(sprint.endDate)
  return (
    <>
    <div className="container">
          <div className="card my-3" >
              <div className="card-body">
                  <h5><div className="card-text">{sprint.sprintName}</div></h5>
                  <div>
                    <span className='badge bg-dark'>FROM</span>
                    <span className="badge bg-light text-dark"> {startDate.getDate()}/{startDate.getMonth()}/{startDate.getFullYear()} </span>
                  
                    <span className='badge bg-dark ms-5'>TO</span>
                    <span className="badge bg-light text-dark"> {endDate.getDate()}/{endDate.getMonth()}/{endDate.getFullYear()} </span>
                  </div>
                  <small className="text-muted" style={{ float:"right"}}>Created on: {date.getDate()}/{date.getMonth()}/{date.getFullYear()}</small>
              </div>
          </div>
    </div>
    </>
  )
}

export default SprintItem