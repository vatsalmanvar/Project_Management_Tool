import React, {useEffect, useState, useContext} from 'react'
import projectContext from '../context/project/projectContext';
import SearchAndSelect from './SearchAndSelect';
import { useNavigate } from 'react-router-dom'

const CreateSprint = (props) => {
    let navigate = useNavigate();
    const context = useContext(projectContext);
    const {users, fetchUsers} = context;
    const {sprintName, setSprintName} = useState("");

    const handleFormSubmit = async (e) => {
    //   e.preventDefault();
    //   const response = await fetch("http://localhost:5000/api/project/create-project", {
    //       method: 'POST',
    //       headers: {
    //           'Content-Type': 'application/json',
    //           'auth-token': localStorage.getItem('token')
    //       },
    //       body: JSON.stringify({projectName, description, admin, developers})
    //   });
    //   const json = await response.json()
    //   console.log(json);
    //   props.showAlert("Project Created Successfully", "success")
    //   navigate('/projects');
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
        <div className="card">
        <div className="card-header inline">
          <h5 className='float-start'>CREATE NEW SPRINT</h5>
        </div>

        <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <div className="container border border-1 rounded m-3 p-3">
                <label className="form-label">Name of Sprint</label>
                <input type="text" className="form-control" name="SprintName" value={sprintName} onChange={e => setSprintName(e.target.value)}/>
              </div>


              <button type="submit" className="btn btn-primary">CREATE</button>
            </form>
        </div>
    </div>
    )
}

export default CreateSprint