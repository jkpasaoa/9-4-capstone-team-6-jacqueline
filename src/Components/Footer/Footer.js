import './Footer.css'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
//import logo from '../Assets

function Footer() {
  let loc = useLocation();
  return (
    <div className="Footer" style={loc.pathname === "/" ? { display: "none" } : { display: "block" }}>
      <div className='footerText'>
      </div>
    </div>
  )
}

export default Footer;
