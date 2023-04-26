import React, {useEffect, useState, useContext} from 'react'
import projectContext from '../context/project/projectContext';


const CreateProject = () => {

    const context = useContext(projectContext);
    const {users, fetchUsers} = context;
    const initialAdmin = [];
    const [admin, setAdmin] = useState(initialAdmin)
    const initialSearchInput = "";
    const [searchInput, setSearchInput] = useState(initialSearchInput)
    const [searchResults, setSearchResults] = useState([])

    const handleSearchChange = (e)=>{
      //console.log("HandleOnChange ran")
      setSearchInput(e.target.value)
      if(!e.target.value) return setSearchResults([]);
      const resultsArray = users.filter(users => users.email.includes(e.target.value))
      //console.log(e.target.value, resultsArray)
      setSearchResults(resultsArray);
    }

    const handleOnClickOnSearch = (e) => {
      console.log("Button pressed", e.target.value);
      if(!admin.includes(e.target.value)) setAdmin(admin.concat(e.target.value));
      setSearchInput(initialSearchInput);
      setSearchResults([]);
    }

    useEffect(() => {
      if(users.length === 0) fetchUsers();
      //console.log(admin, users)
    }, [users, searchResults, admin, fetchUsers])
    
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
                  <button key={index} className="list-group-item list-group-item-action" value={it.email} onClick={handleOnClickOnSearch}>{it.email}</button>
                )
              })
            }

            <h3>ADMINS</h3>
            {
              admin.length===0
              ?
              <h5>No admin added</h5>
              :
              Object.values(admin).map((it, index)=>{
                return(<span key={index} className="badge text-bg-dark mx-1">{it}</span>)
              })
            }
        </div>

    </div>
  )
}

export default CreateProject