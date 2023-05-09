import React, {useEffect, useState, useContext} from 'react'
import projectContext from '../context/project/projectContext';

const SearchAndSelect = (props) => {
    const context = useContext(projectContext);
    const {users, fetchUsers} = context;

    const { nameOfArray, buildArray, setBuildArray} = props

    const initialSearchInput = "";
    const [searchInput, setSearchInput] = useState(initialSearchInput)
    const [searchResults, setSearchResults] = useState([])


    const handleSearchChange = (e)=>{
      //console.log("HandleOnChange ran")
      setSearchInput(e.target.value)
      if(!e.target.value) return setSearchResults([]);
      const resultsArray = users.filter(users => ( !buildArray.includes(users.email) && users.email.includes(e.target.value)))
      //console.log(e.target.value, resultsArray)
      setSearchResults(resultsArray);
    }

    const handleOnClickOnSearch = (e) => {
      console.log("Button pressed");
      if(!buildArray.includes(e.target.value)) setBuildArray(buildArray.concat(e.target.value));
      setSearchInput(initialSearchInput);
      setSearchResults([]);
    }

    const handleRemoveFromAdmin = (e) => {
      setBuildArray(buildArray.filter(it => it!==e.target.value))
    }

    useEffect(() => {
        if(users.length === 0) fetchUsers();
        // eslint-disable-next-line
    }, [])
    
  return (
    <div>
        <div className="container border border-1 rounded m-3 p-3">
        
        <h6>
        <div className="mb-3 border rounded-1 p-2">
          <label className="form-label">Search Email</label>
          <input type="text" placeholder="Enter Email here..." className="form-control" value={searchInput} onChange={handleSearchChange}/>
          <div className='userList shadow'>
            {
              searchResults.map((it, index)=>{
                return(
                  <option key={it.email} style={{cursor:'pointer'}} className="list-group-item list-group-item-action border border-1 rounded p-1 m-1" value={it.email} onClick={handleOnClickOnSearch}>{it.email}</option>
                )
              })
            }
          </div>
        </div>
        </h6>

        <div className="container border rounded-1 p-2">
          <h5>{nameOfArray}</h5>
          {
            buildArray.length===0
            ?
            <h6>No {nameOfArray} added</h6>
            :
            Object.values(buildArray).map((it, index)=>{
              return(
                <>
                  <br/>
                  <button key={it} value={it} className="fa-sharp fa-solid fa-user-minus" onClick={handleRemoveFromAdmin}></button>
                  <span key={it} className="badge text-bg-dark mx-1">{it}</span>
                </>
              )
            })
          }
        </div>
    </div>
    </div>
  )
}

export default SearchAndSelect