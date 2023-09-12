import axios from 'axios'
import Map from '../Map/Map.js'
import { useParams } from 'react-router-dom';
import './Pages.css';
import { useEffect, useState } from 'react';
import PointOfInterestCard from './PointOfInterestCard.js';

const API = process.env.REACT_APP_API_URL;

export default function Tour() {
    const [tour, setTour] = useState({})
    const [pointsOfInterest, setPointsOfInterest] = useState([])

    const { id } = useParams()

    useEffect(() => {
        axios.get(`${API}/tours/${id}`)
            .then((res) => {
                setTour(res.data)
                setPointsOfInterest(res.data.ordered_points_of_interest)
            })
            .catch((e) => console.warn(e))
    }, [id])

    // const stringToDate = (string) => {
    //     setDate(new Date(string)) 
    //     console.log(date)
    // }

    // useEffect(()=>{
    //     stringToDate("2023-08-21T15:30:00.000Z")
    //     console.log(date)
    // },[z])

    console.log(tour, pointsOfInterest)

    return (
        <div className="TourLive-content">
            <h1 className='text-3xl font-extrabold'>Welcome to your {tour.region ? tour.region : tour.city} {tour.duration} {tour.theme} Tour</h1>
            {/* <p>Created on { }</p> */}
            <div>
                <Map />
                <ul>
                    {
                        pointsOfInterest.map((poi, index) => {
                            return <PointOfInterestCard poi={poi} key={index} />
                        })
                    }
                </ul>
            </div>
        </div>
    )
}
