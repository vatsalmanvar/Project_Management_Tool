import React from 'react'
import { useParams } from 'react-router-dom'



function ProjectDetail() {
    const params = useParams();
    const projectId = params.projectId;
    console.log(projectId);
  return (
    <div>ProjectDetail</div>
  )
}

export default ProjectDetail