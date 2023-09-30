import { Link } from "react-router-dom";


export default function PointOfInterestCard({ poi }) {
    return (
        <div>
            <li className="relative inline-flex float-left p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-sky-950 to-cyan-600 group-hover:from-cyan-500 group-hover:to-sky-950 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 w-[400px]"><span className="float-left px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-[400px]"><h3>{poi}</h3>
                <Link>PLAY AUDIO</Link>
                <p>In this paragraph there will be a short description leading to full details...</p>
                {/* <Link>Show More</Link> */}
            </span>
            </li>
        </div>
    )
}
