import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  //let loc = useLocation();

  return (
    <nav
      className="navbar"
    // style={loc.pathname === '/' ? { display: 'none' } : { display: 'flex' }}
    >
      <div className="logo">
        <Link to="/">
          {/* <img src={logo} alt="logo" /> */}
        </Link>
        <h1>
          <Link to="/home">City Whisperer</Link>
        </h1>
      </div>
      <div className="nav-links">
        <div>
          <h3>
            {/* <Link to="/about">About</Link> */}
          </h3>
          <h3>
            <Link to="/createnewtour">Create New Tour</Link>
          </h3>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
