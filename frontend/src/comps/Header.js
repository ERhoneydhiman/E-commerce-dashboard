import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Nav() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/signup')
  }
  const auth = localStorage.getItem('user');


  return (
    <div className='header'>
      <h1>E-Deshboard</h1>
      <div className="nav">
        <ul>
          <li><Link to="/">Products</Link></li>
          <li><Link to="/addproduct">Add Products</Link></li>
          <li><Link to="/updateproduct">Update Products</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link onClick={logout} to="/signup">LogOut ({JSON.parse(auth).name})</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Nav