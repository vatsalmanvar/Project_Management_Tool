import React, {useContext, useEffect} from 'react'
import Projects from './Projects';
import projectContext from '../context/project/projectContext';

function Home() {
  const context = useContext(projectContext);
  const {users, fetchUsers} = context;

  useEffect(() => {
    if(users.length === 0) fetchUsers();
    // eslint-disable-next-line
  }, [])

  return (
    <div className="container">
      <Projects/>
    </div>
  )
}

export default Home