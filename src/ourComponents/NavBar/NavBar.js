import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/OfficialCityWhispererLogo.png';
import './NavBar.css';

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(menuOpen => !menuOpen);
  };

  return (
    <div>
      <nav className="bg-white-200 fixed w-full z-20 top-0 left-0 border-b-0 border-gray-200 custom-border">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span className="logo">
            <a href="/home" className="flex flex-col items-center"> {/* Use flex-col to stack items vertically */}
              <img
                src={logo}
                className="h-24 mr-3 drop-shadow-[2px_0px_5px_rgba(255,255,255,0.5)]"
                alt="CityWhisperer Logo"
              />
              <span className="text-center">Powered by chatGPT</span> {/* Add the text here */}
            </a>
          </span>

          <div className="flex md:order-2 ml-auto">
            {/* Desktop Menu & Tablet Menu */}
            <ul className="DESKTOP-MENU hidden space-x-8 md:flex lg:flex">
              <li>
                <a href="/home" className="nav-link home text-black text-shadow-white">
                  Home
                </a>
              </li>
              <li>
                <Link to="/about" className="nav-link about text-black text-shadow-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/tours" className="nav-link browsetours text-black text-shadow-white">
                  Browse Tours
                </Link>
              </li>
              <li>
                <Link
                  to="/createnewtour"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0"
                >
                  <strong>Create New Tour</strong>
                </Link>
              </li>
            </ul>
            <button
              onClick={toggleMenu}
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-sticky"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <div className="bg-red-500 rounded-md p-2">
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
              </div>
            </button>
          </div>
          {/* Mobile Menu */}
          <div
            className={`items-center justify-between w-full md:w-auto md:order-1 ${menuOpen ? 'block' : 'hidden'
              } md:hidden`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
              <li>
                <Link
                  to="/home"
                  onClick={toggleMenu}
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={toggleMenu}
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/tours"
                  onClick={toggleMenu}
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                >
                  Browse Tours
                </Link>
              </li>
              <li className="md:hidden">
                <Link
                  to="/createnewtour"
                  onClick={toggleMenu}
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                >
                  Create New Tour
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
