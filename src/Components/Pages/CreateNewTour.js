
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import MapContainer from './MapContainer';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

const API = process.env.REACT_APP_API_URL;

export default function CreateNewTour() {
  const [tour, setTour] = useState({
    country: '',
    region: '',
    state: '',
    city: '',
    duration: 'Full-day',
    difficulty: 'Medium',
    tourType: 'Historic',
  });

  const navigate = useNavigate()

  const [pointsOfInterest, setPointsOfInterest] = useState({
    latitude: 0.0,
    longitude: 0.0,
    name: '',
    image_url: '',
  });

  const [commentary, setCommentary] = useState({
    name: '',
    description: '',
    audio_url: '',
  });

  // const [city, setCity] = useState('');
  // const [region, setRegion] = useState('');
  // const [country, setCountry] = useState('');
  // const [state, setState] = useState('');
  // const [duration, setDuration] = useState('Full-day');
  // const [difficulty, setDifficulty] = useState('Medium');
  // const [tourType, setTourType] = useState('Historic');

  const [loading, setLoading] = useState(false);
  const [tourContent, setTourContent] = useState('');

  const parsePointsOfInterest = (generatedTour) => {
    const bulletPattern = /^\s*\d+\.\s(.+)$/gm;
    const matches = [];
    let match;
    while ((match = bulletPattern.exec(generatedTour)) !== null) {
      matches.push(match[1]);
    }
    return matches;
  };

  const generateWalkingTour = async () => {
    try {
      setLoading(true);

      const prompt = `Walking Tour in ${tour.city}, ${tour.region}, ${tour.state}, ${tour.country}\nTour Duration: ${tour.duration}\nDifficulty Level: ${tour.difficulty}\nTour Type: ${tour.tourType},`;

      const requestBody = {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Create a self guided walking tour, where start point and end point are the same place, and where a person can start somewhere and follow a route from start point to each point of interest and returning to the start point when the tour is over.  I only want the tour route and what points of interest are on that route. Do not give commentary, or directions for or any point of interest.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
      };

      const response = await axios.post('https://api.openai.com/v1/chat/completions', requestBody, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      });

      const generatedTour = response.data.choices[0]?.message.content;
      setTourContent(generatedTour);

      // Parse points of interest
      const pointsOfInterest = parsePointsOfInterest(generatedTour);
      console.log('Points of Interest:', pointsOfInterest);

      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setTourContent('Error generating the walking tour. Please try again.');
      setLoading(false);
    }
  };

  const handleTextChange = (event) => {
    setTour({ ...tour, [event.target.id]: event.target.value });
  }

  const addTour = (newTour) => {
    axios.post(`${API}/tours`, newTour)
      .then(() => navigate('/tours'))
      .catch((e) => console.warn(e))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addTour(tour)
    generateWalkingTour()
  }

  return (
    <div className="container mt-5" style={{ paddingTop: "160px" }}>
      <h1 className="text-center mb-4">Walking Tour Generator</h1>
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="City"
            value={tour.city}
            onChange={handleTextChange}
          />
        </div>

        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Borough/Region"
            value={tour.region}
            onChange={handleTextChange}
          />
        </div>

        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="State/County/Province"
            value={tour.state}
            onChange={handleTextChange}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Country"
            value={tour.country}
            onChange={handleTextChange}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-4">
          <select className="form-control" value={tour.duration} onChange={handleTextChange}>
            <option value="Full-day">Full-day</option>
            <option value="Half-day">Half-day</option>
            <option value="2 hours">2 hours</option>
          </select>
        </div>
        <div className="col-md-4">
          <select className="form-control" value={tour.difficulty} onChange={handleTextChange}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div className="col-md-4">
          <select className="form-control" value={tour.tourType} onChange={handleTextChange}>
            <option value="Historic">Historic</option>
            <option value="Scenic">Scenic</option>
            <option value="Fun">Fun</option>
            <option value="Museums">Museums</option>
            <option value="Pubs">Pubs</option>
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <button className="btn btn-primary" onClick={handleSubmit} disabled={!tour.city || loading}>
            Generate Walking Tour
          </button>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      <div className="row">
        <div className="col">
          <textarea className="form-control" rows="10" value={tourContent} readOnly />
        </div>
      </div>
      <div className="row">
        {/* <div className="col">
          <MapContainer generatedTour={tourContent} />
        </div> */}
      </div>
    </div>
  );
};

