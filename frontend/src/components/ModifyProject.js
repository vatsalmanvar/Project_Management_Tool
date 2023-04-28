import React, {useEffect, useState, useContext} from 'react'
import projectContext from '../context/project/projectContext';
import SearchAndSelect from './SearchAndSelect';
import { useNavigate, useParams } from 'react-router-dom'

const ModifyProject = (props) => {
    let navigate = useNavigate();

    const context = useContext(projectContext);
    const {userIdToEmail} = context;

    const params = useParams();
    const [projectId] = useState(params.projectId)
    const [admin, setAdmin] = useState([])
    const [developers, setDevelopers] = useState([])
    const [projectName, setProjectName] = useState("")
    const [description, setDescription] = useState("")

    const fetchProject = async()=>{
      const responce = await fetch(`http://localhost:5000/api/project/get-project/${projectId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token' : localStorage.getItem('token')
        }
      });
      const proj = await responce.json();

      // changing "user-id" to "user-name"
      proj.createdBy = userIdToEmail(proj.createdBy);
      for (let index = 0; index < proj.admin.length; index++) {
        proj.admin[index] = userIdToEmail(proj.admin[index]);
      }
      for (let index = 0; index < proj.developers.length; index++) {
        proj.developers[index] = userIdToEmail(proj.developers[index]);
      }
      setAdmin(proj.admin)
      setDevelopers(proj.developers)
      setProjectName(proj.projectName)
      setDescription(proj.description)
    }

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
      navigate(`/project/${projectId}`);
      props.showAlert("Project Modified Successfully", "success")
      // if (json.success){
      //     navigate("/home");
      //     props.showAlert("Project Created Successfully", "success")
      // }
      // else{
      //     props.showAlert("Invalid Credentials", "danger")
      // }
  }

    useEffect(() => {
      fetchProject();
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