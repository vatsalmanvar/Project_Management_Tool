import React, {useState} from "react";
import ProjectContext from "./projectContext";
    
const ProjectState = (props)=>{
    const host = "http://localhost:5000"
    const initialUsers = []
    const [users, setUsers] = useState(initialUsers)

    // Get all users
    const fetchUsers = async()=>{
        const response1 = await fetch(`${host}/api/auth/get-all-user`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'auth-token' : localStorage.getItem('token')
          }
        });
        setUsers(await response1.json())
    }

    const userIdToName = (userId)=>{
      for (let index = 0; index < users.length; index++) {
        if(users[index]._id === userId){
          return users[index].name;
        }
      }
    }

    const userIdToEmail = (userId)=>{
      for (let index = 0; index < users.length; index++) {
        if(users[index]._id === userId){
          return users[index].email;
        }
      }
    }
  
    return(
        <ProjectContext.Provider value={{users, fetchUsers, userIdToName, userIdToEmail}}>
            {props.children}
        </ProjectContext.Provider>
    )
}

export default ProjectState;