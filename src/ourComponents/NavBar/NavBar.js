import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from '../../assets/CityWhispererLogo.png';

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <nav className={`bg-white-200 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 ${menuOpen ? 'h-screen' : ''}`}>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span className="logo">
            <Link to="/home" className="flex items-center">
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
              onClick={toggleMenu}
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg dark:text-gray-400 dark:bg-gray-200"
              aria-controls="navbar-sticky"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger Icon */}
              <div className="w-6 h-6 relative">
                <span className={`block h-1 w-6 bg-gray-600 absolute left-0 transition-transform transform ${menuOpen ? 'rotate-45' : ''}`}></span>
                <span className={`block h-1 w-6 bg-gray-600 absolute left-0 mt-2 transition-opacity opacity-100 ${menuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block h-1 w-6 bg-gray-600 absolute left-0 mt-4 transition-transform transform ${menuOpen ? '-rotate-45' : ''}`}></span>
              </div>
              {/* End Hamburger Icon */}
            </button>
          </div>
          {/* Mobile Menu */}
          <div
            className={`items-center justify-between w-full md:w-auto md:order-1 ${menuOpen ? 'block' : 'hidden'
              } md:hidden`} // Show on mobile screens
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/home"
                  onClick={toggleMenu}
                  className="nav-link home block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={toggleMenu}
                  className="nav-link about block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover-bg-gray-700 dark:hover:text-white md:dark:hover-bg-transparent dark:border-gray-700"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/browsetours"
                  onClick={toggleMenu}
                  className="nav-link browsetours block py-2 pl-3 pr-4 text-gray-900 rounded hover-bg-gray-100 md:hover:bg-transparent md:hover-text-blue-700 md:p-0 md:dark:hover-text-blue-500 dark:text-white dark:hover-bg-gray-700 dark:hover-text-white md:dark:hover-bg-transparent dark:border-gray-700"
                >
                  Browse Tours
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './NavBar.css';
// import logo from '../../assets/CityWhispererLogo.png';

// function NavBar() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   return (
//     <div>
//       <nav className="bg-white-200 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
//         <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//           <span className="logo">
//             <Link to="/home" className="flex items-center">
//               <img src={logo} className="h-24 mr-3" alt="CityWhisperer Logo" />
//             </Link>
//           </span>
//           <div className="flex md:order-2">
//             <Link
//               to="/createnewtour"
//               className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//             >
//               <strong>Create New Tour</strong>
//             </Link>
//             <button
//               onClick={toggleMenu}
//               data-collapse-toggle="navbar-sticky"
//               type="button"
//               className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg dark:text-gray-400 dark:hover:bg-gray-700"
//               aria-controls="navbar-sticky"
//               aria-expanded={menuOpen}
//             >
//               <span className="sr-only">Open main menu</span>
//               <svg
//                 className="h-8 w-8 text-gray-600"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <line x1="18" y1="6" x2="6" y2="18" />
//                 <line x1="6" y1="6" x2="18" y2="18" />
//               </svg>
//             </button>
//           </div>
//           {/* Mobile Menu */}
//           <div
//             className={`items-center justify-between w-full md:w-auto md:order-1 ${menuOpen ? 'block' : 'hidden'
//               } md:hidden`} // Show on mobile screens
//             id="navbar-sticky"
//           >
//             <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//               <li>
//                 <Link
//                   to="/home"
//                   onClick={toggleMenu}
//                   className="nav-link home block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
//                   aria-current="page"
//                 >
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/about"
//                   onClick={toggleMenu}
//                   className="nav-link about block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
//                 >
//                   About
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/browsetours"
//                   onClick={toggleMenu}
//                   className="nav-link browsetours block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
//                 >
//                   Browse Tours
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }

// export default NavBar;
