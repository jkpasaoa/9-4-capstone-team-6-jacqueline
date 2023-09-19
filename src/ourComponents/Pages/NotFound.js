import { Link } from "react-router-dom"
import ErrorImage from "../../assets/400errorClearBackground.png"

export default function NotFound() {
    return (
        <div>
            <p className="NotFound-content flex flex-col items-center justify-center min-h-screen">
                <img src={ErrorImage} alt="ErrorImaged" className="error-photo" />
            </p>
            {/* Link to Home Page */}
            <Link to="/home" className="mt-4 text-blue-700 hover:underline text-2xl">
                Return to Home
            </Link>
        </div>
    )
}
