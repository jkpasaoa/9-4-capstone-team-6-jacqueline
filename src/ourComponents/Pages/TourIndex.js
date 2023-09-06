import React, { useState } from 'react';
import Map from "../Map/Map"
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export default function TourIndex() {
    const [tours, setTours] = useState([])

    axios.get(`${API}/tours`)
        .then((res) => setTours(res))
        .catch((e) => console.warn(e))

    return (
        <div>
            <Map />

        </div>
    )
}
