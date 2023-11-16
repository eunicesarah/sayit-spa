import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Menu, MenuItem } from '@mui/material';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const closeDropdown = () => {
    setDropdownVisible(false);
  };
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const user = localStorage.getItem('user') || 'null';

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('jwt');
    console.log('Logging out...');
    console.log('User:', localStorage.getItem('user'));
    console.log('Token:', localStorage.getItem('jwt'));
    navigate('/');
  };

  

  return (
    <nav className="navbar">
      <div className='navbarContainer'>
      <div className="logo">
        <img src="SayIt.svg" alt="logo" />
      </div>
      <div className="nav-links">
        <ul>
          {/* <li><Link to="/">Home</Link></li> */}
          <li><Link to="/consultation">Consultation</Link></li>
          <li><Link to="/report">History</Link></li>
          {localStorage.getItem('user') !== null ? (
            <>
              
              <div className="avatarContainer" >
                <button className='avatarButton' onClick={() => toggleDropdown()}>
                <Avatar
                  className="avatar"
                  alt="Avatar"
                  sx={{ bgcolor: "#F3AA98" }}
                  
                 
                >
                  {/* {user.charAt(0).toUpperCase()} */}
                </Avatar>
                </button>
                {dropdownVisible && (
                  <div className="dropdownWrap">
                  <div className="dropdown" onClick={() => closeDropdown()}>
                    <button onClick={() => navigate('/profile')}>Profile</button>
                    <button onClick={handleLogout}>Sign Out</button>
                  </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <li>
              <button className='signinButton'>
                <Link to="/">Sign In</Link>
              </button>
            </li>
          )}
        </ul>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
