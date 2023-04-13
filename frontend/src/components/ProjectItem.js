import React from 'react'

function ProjectItem(props) {
  const {project} = props;
  const date = new Date(project.date)
  return (
    <>
    <div className="container">
          <div className="card my-3" >
              <div className="card-body">
                  <h5><p className="card-text">{project.projectName}</p></h5>
                  <p className="card-text">{project.description}</p>
                  <small className="text-muted" style={{ float:"right"}}>Created on: {date.getDate()}/{date.getMonth()}/{date.getFullYear()}</small>
              </div>
          </div>
    </div>
    </>
  )
}

export default ProjectItem