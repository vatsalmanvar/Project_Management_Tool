import React, {useContext, useEffect} from 'react'
import Projects from './Projects';
import projectContext from '../context/project/projectContext';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const context = useContext(projectContext);
  const {users, fetchUsers} = context;

  useEffect(() => {
    if(!localStorage.getItem('token')) navigate('/login');
    if(users.length === 0) fetchUsers();
    // eslint-disable-next-line
  }, [])

  return (
    <div className="container my-5">
      <Projects/>
    </div>
  )
}

export default Home