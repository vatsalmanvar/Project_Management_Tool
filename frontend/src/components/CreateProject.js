import React, {useEffect, useState, useContext} from 'react'
import projectContext from '../context/project/projectContext';
import SearchAndSelect from './SearchAndSelect';

const CreateProject = () => {

    const context = useContext(projectContext);
    const {users, fetchUsers} = context;
    const initialAdmin = [];
    const [admin, setAdmin] = useState(initialAdmin)
    const [developer, setDeveloper] = useState(initialAdmin)

    useEffect(() => {
      if(users.length === 0) fetchUsers();
      // eslint-disable-next-line
    }, [])
    
  return (
    <div>
        <div className="container">
            <SearchAndSelect nameOfArray={"ADMIN"} buildArray={admin} setBuildArray={setAdmin} />
            <SearchAndSelect nameOfArray={"DEVELOPER"} buildArray={developer} setBuildArray={setDeveloper} />
        </div>
    </div>
  )
}

export default CreateProject