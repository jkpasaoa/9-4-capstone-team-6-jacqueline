import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import your CSS file if needed
import logo from "../../assets/CityWhispererLogo.png";

function NavBar() {
  return (
    <div>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span className="logo">
            <Link to="/home">
              <img src={logo} className="h-24 mr-3" alt="CityWhisperer Logo" />
            </Link>
          </span>
          <div className="flex md:order-2">
            <Link
              to="/createnewtour"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <strong>Create New Tour</strong>
            </Link>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;


// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import './NavBar.css';
// import logo from "../../assets/CityWhispererLogo.png"

// function NavBar() {
//   //let loc = useLocation();

//   return (
//     <nav
//       className="navbar"
//     // style={loc.pathname === '/' ? { display: 'none' } : { display: 'flex' }}
//     >
//       {/* <h1>
//         <Link to="/home">City Whisperer</Link>
//       </h1> */}
//       <span className="logo">
//         <Link to="/home">
//           <img
//             src={logo}
//             alt="logo"
//             style={{ width: "100px", height: "100px" }}
//           />
//         </Link>
//       </span>
//       <Link to="/createnewtour">
//         <button className='create-new-tour'><strong>Create New Tour</strong>
//         </button>
//       </Link>
//       <label htmlFor="burger">&#9776;</label>
//       <input type="checkbox" id="burger" />
//       <ul id="nav-links">
//         {/* <Link to="/home">
//           <li><strong>Home</strong></li>
//         </Link> */}
//         <Link to="/about">
//           <li><strong>About</strong></li>
//         </Link>
//         <Link to="/browsetours">
//           <li><strong>Browse Tours</strong></li>
//         </Link>
//       </ul>
//     </nav>
//   );
// }

// export default NavBar;
