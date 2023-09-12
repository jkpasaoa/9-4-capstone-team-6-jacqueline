import axios from 'axios'
import { useParams } from 'react-router-dom';
import './Pages.css';
import { useEffect, useState } from 'react';

const API = process.env.REACT_APP_API_URL;

export default function Tour() {
    const [tour, setTour] = useState({})

    const { id } = useParams()

    useEffect(() => {
        axios.get(`${API}/tours/${id}`)
            .then((res) => setTour(res.data))
            .catch((e) => console.warn(e))
    }, [id])

    return (
        <div>
            <p className="TourLive-content">Welcome to your tour</p>
        </div>
    )
}
