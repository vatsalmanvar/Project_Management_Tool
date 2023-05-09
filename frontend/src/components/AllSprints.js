import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import projectContext from '../context/project/projectContext';

const AllSprints = (props) => {
    
    const params = useParams();
    let navigate = useNavigate(); 
    const context = useContext(projectContext);
    const {fetchUsers} = context;
    const [projectId, setProjectId] = useState(params.projectId)
    const [projects, setProjects] = useState([]);
    const [sprints, setSprints] = useState([]);

    const fetchAllSprints = async()=>{
    //   const response = await fetch(`http://localhost:5000/api/project/get-all-projects`, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'auth-token' : localStorage.getItem('token')
    //     }
    //});
    //const json = await response.json();
    //setProjects(json)
    //console.log(json)
    }

    useEffect(() => {
      fetchAllSprints();
      // eslint-disable-next-line
    },[])

    const routeChange = () =>{ 
        let path = `/project/${projectId}/create-sprint`; 
        navigate(path);
    }

  return (
    <>
      <div className="container">
        <h2>All Sprints</h2>
        <div className="row">
          {
            sprints.length===0
            ?
            <div><p>NO SPRINTS CREATED</p></div>
            :
            Object.values(sprints).map((spr, index)=>{
              return (<div className="col-md-4" key={index}>
                <Link key={spr._id} to={`/project/${projectId}/sprint/${spr._id}`}> Component for SprintItem </Link>
              </div>)
            })
          }
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <button type="button" className="btn btn-outline-dark btn-lg" onClick={routeChange}>CREATE SPRINT</button>
      </div>
    </>
  )
}

export default AllSprints