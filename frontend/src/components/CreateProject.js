import React, {useEffect, useState, useContext} from 'react'
import projectContext from '../context/project/projectContext';
import SearchAndSelect from './SearchAndSelect';
import { useNavigate } from 'react-router-dom'

const CreateProject = (props) => {
    let navigate = useNavigate();
    const context = useContext(projectContext);
    const {users, fetchUsers} = context;
    const initialAdmin = [];
    const [admin, setAdmin] = useState(initialAdmin)
    const [developers, setDevelopers] = useState(initialAdmin)
    const [projectName, setProjectName] = useState("")
    const [description, setDescription] = useState("")

    const handleOnChange = (e)=>{
      if(e.target.name === "projectName") setProjectName(e.target.value);
      if(e.target.name === "description") setDescription(e.target.value);
      
    }

    const handleFormSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/project/create-project", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({projectName, description, admin, developers})
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

export default CreateProject