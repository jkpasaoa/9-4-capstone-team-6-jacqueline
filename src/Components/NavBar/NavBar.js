import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';
//import logo from "../Assets/CityWhispererLogo.png"

function NavBar() {
  //let loc = useLocation();

  return (
    <nav
      className="navbar"
    // style={loc.pathname === '/' ? { display: 'none' } : { display: 'flex' }}
    >
      <span className="logo">
        <Link to="/">
          {/* <img src={logo} alt="logo" /> */}
        </Link>
        <h1>
          <Link to="/home">City Whisperer</Link>
        </h1>
      </span>
      <label htmlFor="burger">&#9776;</label>
      <input type="checkbox" id="burger" />
      <ul id="nav-links">
        <Link to="/">
          <li><strong>Home</strong></li>
        </Link>
        <Link to="/about">
          <li><strong>About</strong></li>
        </Link>
        <Link to="/createnewtour">
          <li><strong>Create New Tour</strong></li>
        </Link>
      </ul>
    </nav>
  );
}

export default NavBar;

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './NavBar.css';
// //import logo from "../Assets/CityWhispererLogo.png"

// function NavBar() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   return (
//     <nav className="navbar">
//       <div className="hamburger-icon" onClick={toggleMenu}>
//         <div className="line"></div>
//         <div className="line"></div>
//         <div className="line"></div>
//       </div>
//       <div className="logo">
//         <Link to="/">
//           <img src={logo} alt="logo" />
//         </Link>
//         <h1>
//           <Link to="/home">City Whisperer</Link>
//         </h1>
//       </div>
//       <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
//         <div>
//           <h3>
//             {/* <Link to="/about">About</Link> */}
//           </h3>
//           <h3>
//             <Link to="/createnewtour">Create New Tour</Link>
//           </h3>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default NavBar;
