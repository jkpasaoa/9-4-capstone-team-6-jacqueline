import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Company</h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <Link to="#" className="hover:underline">About</Link>
              </li>
              {/* <li className="mb-4">
                <Link to="#" className="hover:underline">Careers</Link>
              </li> */}
              {/* <li className="mb-4">
                <Link to="#" className="hover:underline">Brand Center</Link>
              </li> */}
              <li className="mb-4">
                <Link to="#" className="hover:underline">Blog</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Help center</h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              {/* <li className="mb-4">
                <Link to="#" className="hover:underline">Discord Server</Link>
              </li> */}
              <li className="mb-4">
                <Link to="#" className="hover:underline">FAQs</Link>
              </li>
              {/* <li className="mb-4">
                <Link to="#" className="hover:underline">Twitter</Link>
              </li>
              <li className="mb-4">
                <Link to="#" className="hover:underline">Facebook</Link>
              </li> */}
              <li className="mb-4">
                <Link to="#" className="hover:underline">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <Link to="#" className="hover:underline">Privacy Policy</Link>
              </li>
              <li className="mb-4">
                <Link to="#" className="hover:underline">Licensing</Link>
              </li>
              <li className="mb-4">
                <Link to="#" className="hover:underline">Terms &amp; Conditions</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Download</h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <Link to="#" className="hover:underline">iOS</Link>
              </li>
              <li className="mb-4">
                <Link to="#" className="hover:underline">Android</Link>
              </li>
              <li className="mb-4">
                <Link to="#" className="hover:underline">Windows</Link>
              </li>
              <li className="mb-4">
                <Link to="#" className="hover:underline">MacOS</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">© 2023 <Link to="https://citywhisperer.netlify.app">City Whisperer™</Link>. All Rights Reserved.</span>
        <div className="flex mt-4 space-x-5 sm:justify-center md:mt-0">
          <Link to="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
            {/* <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
              <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
            </svg> */}
            {/* <span className="sr-only">Facebook page</span> */}
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;


// import './Footer.css'
// import { Link } from 'react-router-dom'
// import { useLocation } from 'react-router-dom'
// //import logo from '../Assets

// function Footer() {
//   let loc = useLocation();

//   return (
//     <div className="Footer" style={loc.pathname === "/" ? { display: "none" } : { display: "block" }}>
//       <div className='footerText'>
//         <p className='footerContact'><Link to='/contact'>Contact Us</Link></p>&nbsp;
//         {/* <img className='footerImg'
//           // src={logo}
//           alt="Logo" /> */}
//           &nbsp;
//         <p className='footerAbout'><Link to='/about'>About Us</Link></p>
//       </div>
//     </div>
//   )
// }

// export default Footer;
