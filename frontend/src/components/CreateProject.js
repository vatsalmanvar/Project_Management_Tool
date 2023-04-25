import React, {useEffect, useState, useContext} from 'react'
import projectContext from '../context/project/projectContext';


const CreateProject = () => {

    const context = useContext(projectContext);
    const {users, fetchUsers} = context;
    const [admin, setAdmin] = useState(users)
    const [searchInput, setSearchInput] = useState("")
    const [searchResults, setSearchResults] = useState(users)

    const handleSearchChange = (e)=>{
      console.log("HandleOnChange ran")
      setSearchInput(e.target.value)
      if(!searchInput) return setSearchResults(users);
      const resultsArray = admin.filter(admin => admin.email.includes(e.target.value))
      console.log(e.target.value, resultsArray)
      setSearchResults(resultsArray);
    }

    // const handleSearchChange = (e)=>{
    //   if(!searchInput) return setSearchResults(users);
    //   console.log("admin",admin);
    //   const resultsArray = admin.filter(it => it.includes(searchInput))
    //   setSearchResults(resultsArray);
    // }

    useEffect(() => {
      if(users.length === 0) fetchUsers();
      setAdmin(users);
      //console.log(admin, users)
    }, [searchResults, admin])
    
  // onKeyUp={handleSearchChange()}
  //onChange={handleOnChange}

  return (
    <div>
        <div className="container">
        
            <div className="mb-3">
              <label htmlFor="searchInput" className="form-label">Search Email</label>
              <input type="text" placeholder="" className="form-control" value={searchInput}  id="searchInput" name="searchInput" onChange={handleSearchChange} />
            </div>
            {
              searchResults.map((it, index)=>{
                return(
                  <a key={index} href={`/`} className="list-group-item list-group-item-action">{it.email}</a>
                )
              })
            }

        </div>

    </div>
  )
}

export default CreateProject