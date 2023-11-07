import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
        <div className="logo">
          <img src="SayIt.svg" alt="logo" />
        </div>
        <div className="nav-links">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/consultation">Consultation</Link></li>
            <li><Link to="/history">History</Link></li>
            <button className='signinButton'><Link to="/login">Signin</Link></button>
            
          </ul>
        </div>
      </nav>
  )
}

export default Navbar