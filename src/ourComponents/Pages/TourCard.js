

export default function TourCard({ tour }) {
    return (
        <div>
            <h3>{tour.region ? tour.region : tour.city} {tour.duration} {tour.theme} Tour</h3>
            <h4>{tour.city}, {tour.state ? `${tour.state},` : null} {tour.country}</h4>
            <span>Difficulty: {tour.difficulty}</span>
            <hr></hr>
            <br>
            </br>
            <p></p>
        </div>
    )
}
