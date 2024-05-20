import React from 'react'
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div className='header'>
      <h1>E-Deshboard</h1>
      <div className="nav">
        <ul>
            <li><Link to="/">Products</Link></li>
            <li><Link to="/addproduct">Add Products</Link></li>
            <li><Link to="/updateproduct">Update Products</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/logout">LogOut</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
        </ul>
        </div>
    </div>
  )
}

export default Nav