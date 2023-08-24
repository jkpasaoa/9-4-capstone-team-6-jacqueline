import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';
import logo from "../../Assets/CityWhispererLogo.png"

function NavBar() {
  //let loc = useLocation();

  return (
    <nav
      className="navbar"
    // style={loc.pathname === '/' ? { display: 'none' } : { display: 'flex' }}
    >
      {/* <h1>
        <Link to="/home">City Whisperer</Link>
      </h1> */}
      <span className="logo">
        <Link to="/home">
          <img
            src={logo}
            alt="logo"
            style={{ width: "100px", height: "100px" }}
          />
        </Link>
      </span>
      <Link to="/createnewtour">
        <button className='create-new-tour'><strong>Create New Tour</strong>
        </button>
      </Link>
      <label htmlFor="burger">&#9776;</label>
      <input type="checkbox" id="burger" />
      <ul id="nav-links">
        {/* <Link to="/home">
          <li><strong>Home</strong></li>
        </Link> */}
        <Link to="/about">
          <li><strong>About</strong></li>
        </Link>
        <Link to="/browsetours">
          <li><strong>Browse Tours</strong></li>
        </Link>
      </ul>
    </nav>
  );
}

export default NavBar;
