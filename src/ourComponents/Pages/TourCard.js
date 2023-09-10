import { Link } from "react-router-dom"

export default function TourCard({ tour }) {
    return (
        <div>
            <h3>{tour.region ? tour.region : tour.city} {tour.duration} {tour.theme} Tour</h3>
            <span>Difficulty: {tour.difficulty}</span>
            <p><span><Link to={`tours/${tour.id}`}>Take Me There➡</Link></span></p>
        </div>
    )
}
