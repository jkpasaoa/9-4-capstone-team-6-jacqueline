import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom"
// import logo from "..//assets/CityWhispererLogo.png"

import "./NavBar.css"

function NavBar() {
  let loc = useLocation()

  return (
    <nav className="navbar" style={loc.pathname === "/" ? { display: "none" } : { display: "flex" }}>
      <div className="logo">
        <Link to='/'>
          {/* <img src={logo} alt="logo" /> */}
        </Link>
        <h1><Link to='/home'>City Whisperer</Link></h1>
      </div>
      <div className="nav-links">
        <div>
          <h3>
            <Link to='/about'>
            </Link>
          </h3>
          <h3>
            <Link to='/createnewtour'>
            </Link>
          </h3>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
