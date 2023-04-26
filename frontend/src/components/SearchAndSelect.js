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

    const hadleRemoveFromAdmin = (e) => {
      setBuildArray(buildArray.filter(it => it!==e.target.value))
    }

    useEffect(() => {
        if(users.length === 0) fetchUsers();
        // eslint-disable-next-line
    }, [])
    
  return (
    <div>
        <div className="container border border-dark m-3 p-3">
        
        <div className="mb-3">
          <label className="form-label">Search Email</label>
          <input type="text" placeholder="Enter Email here..." className="form-control" value={searchInput} onChange={handleSearchChange}/>
        
          {
            searchResults.map((it, index)=>{
              return(
                <button key={index} className="list-group-item list-group-item-action" value={it.email} onClick={handleOnClickOnSearch}>{it.email}</button>
              )
            })
          }
        </div>

        <h3>{nameOfArray}</h3>
        {
          buildArray.length===0
          ?
          <h5>No {nameOfArray} added</h5>
          :
          Object.values(buildArray).map((it, index)=>{
            return(
              <>
                <br/>
                <button key={it} value={it} className="fa-sharp fa-solid fa-user-minus" onClick={hadleRemoveFromAdmin}></button>
                <span key={index} className="badge text-bg-dark mx-1">{it}</span>
              </>
            )
          })
        }
    </div>
    </div>
  )
}

export default SearchAndSelect