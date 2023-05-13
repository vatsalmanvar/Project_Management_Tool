import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import projectContext from '../context/project/projectContext';
import SprintItem from './SprintItem';

const AllSprints = (props) => {
    
    const params = useParams();
    let navigate = useNavigate(); 
    const context = useContext(projectContext);
    const {fetchUsers} = context;
    const [projectId] = useState(params.projectId)
    const [sprints, setSprints] = useState([]);

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

    const routeChange = () =>{ 
      let path = `/project/${projectId}/create-sprint`; 
      navigate(path);
    }

    useEffect(() => {
      fetchAllSprints();
      // eslint-disable-next-line
    },[])

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
              return (<div className="" key={index}>
                <Link key={spr._id} to={`/project/${projectId}/sprint/${spr._id}`}> <SprintItem sprint={spr} /> </Link>
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