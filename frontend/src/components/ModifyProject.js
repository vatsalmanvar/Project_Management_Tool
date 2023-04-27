import React, {useEffect, useState, useContext} from 'react'
import projectContext from '../context/project/projectContext';
import SearchAndSelect from './SearchAndSelect';
import { useNavigate, useLocation } from 'react-router-dom'

const ModifyProject = (props) => {
    const location = useLocation();
    let navigate = useNavigate();
    const context = useContext(projectContext);
    const {users, fetchUsers} = context;
    
    const [projectId, setProjectId] = useState(location.state.project._id)
    const [admin, setAdmin] = useState(location.state.project.admin)
    const [developers, setDevelopers] = useState(location.state.project.developers)
    const [projectName, setProjectName] = useState(location.state.project.projectName)
    const [description, setDescription] = useState(location.state.project.description)

    const handleOnChange = (e)=>{
      if(e.target.name === "projectName") setProjectName(e.target.value);
      if(e.target.name === "description") setDescription(e.target.value);
      
    }

    const handleFormSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/project/modify-project", {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({projectId , projectName, description, admin, developers})
      });
      const json = await response.json()
      console.log(json);
      navigate("/home");
      props.showAlert("Project Created Successfully", "success")
      // if (json.success){
      //     navigate("/home");
      //     props.showAlert("Project Created Successfully", "success")
      // }
      // else{
      //     props.showAlert("Invalid Credentials", "danger")
      // }
  }

    useEffect(() => {
      if(users.length === 0) fetchUsers();
      // eslint-disable-next-line
    }, [])
    
  return (
    <div>
        <div className="container">

          <form onSubmit={handleFormSubmit}>
            <div className="container border border-dark m-3 p-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Name of Project</label>
              <input type="text" className="form-control" name="projectName" value={projectName} onChange={handleOnChange}/>
            </div>
            
            <div className="container border border-dark m-3 p-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Description of Project</label>
              <input type="text" className="form-control" name="description" value={description} onChange={handleOnChange}/>
            </div>

            <SearchAndSelect nameOfArray={"ADMIN"} buildArray={admin} setBuildArray={setAdmin} />
            <SearchAndSelect nameOfArray={"DEVELOPER"} buildArray={developers} setBuildArray={setDevelopers} />
        
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>


            
        
        </div>
    </div>
  )
}

export default ModifyProject