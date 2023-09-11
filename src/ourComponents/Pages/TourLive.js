import { useParams } from 'react-router-dom';
import './Pages.css';

export default function Tour() {

    const { id } = useParams()

    return (
        <div>
            <p className="TourLive-content">Welcome to your tour</p>
        </div>
    )
}
