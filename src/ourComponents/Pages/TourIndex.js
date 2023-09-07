import React, { useState, useEffect } from 'react';
import TourCard from './TourCard';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export default function TourIndex() {
    const [tours, setTours] = useState([])

    useEffect(() => {
        axios.get(`${API}/tours`)
            .then((res) => setTours(res.data))
            .catch((e) => console.warn(e))
    }, [])

    useEffect(() => {
        console.log(tours)
    }, [tours])

    return (
        <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            {
                tours.map((tour) => {
                    return <TourCard key={tour.id} tour={tour} />
                })
            }
        </div>
    )
}
