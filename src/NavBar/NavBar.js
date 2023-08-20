import "./NavBar.css";
import { Link } from "react-router-dom";
import logo from "../assets/CityWhispererLogo.png"

function NavBar() {
  return (
    <nav className="navbar">
      <div className="logo">
        {/* <img src="">

        </img> */}
        <Link to='/'>
          <img src={logo} alt="logo" />
        </Link>
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