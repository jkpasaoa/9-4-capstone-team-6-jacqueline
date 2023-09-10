
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import loadingAnimation from '../../assets/S-Loop_transnparent.gif'; // Import the loading animation

const config = {
  openaiApiKey: process.env.REACT_APP_OPENAI_API_KEY,
  apiUrl: process.env.REACT_APP_API_URL,
  googleApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  unsplashApiKey: process.env.REACT_APP_UNSPLASH_API_ACCESS_KEY,
  unsplashApiSecretKey: process.env.REACT_APP_UNSPLASH_API_SECRET_KEY,
};

export default function CreateNewTour() {
  const [tour, setTour] = useState({
    country: '',
    region: '',
    state: '',
    city: '',
    duration: 'Full-day',
    difficulty: 'Medium',
    theme: 'Historic', // Updated: theme instead of tourType
  });

  const [tourContent, setTourContent] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Added isLoading state

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
      setIsLoading(true); // Set loading to true

      const prompt = `Walking Tour in ${tour.city}, ${tour.region}, ${tour.state}, ${tour.country}\nTour Duration: ${tour.duration}\nDifficulty Level: ${tour.difficulty}\nTour Theme: ${tour.theme},`; // Updated: theme instead of tourType

      const requestBody = {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Create a self-guided walking tour, where the start point and end point are the same place, and where a person can start somewhere and follow a route from start point to each point of interest and returning to the start point when the tour is over.  I only what a list of the points of interest that are on the tour route. Do not give commentary, or directions for any point of interest.',
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
          Authorization: `Bearer ${config.openaiApiKey}`,
        },
      });

      const generatedTour = response.data.choices[0]?.message.content;
      setTourContent(generatedTour);

      const pointsOfInterest = parsePointsOfInterest(generatedTour);
      console.log('Points of Interest: ', pointsOfInterest);

      setIsLoading(false); // Set loading to false when loading is complete

      return generatedTour

    } catch (error) {
      console.error('Error:', error);
      setTourContent('Error generating the walking tour. Please try again.');
      setIsLoading(false); // Set loading to false in case of an error
    }
  };

  const handleDropdownChange = (event) => {
    const { id, value } = event.target;
    setTour({ ...tour, [id]: value });
  };

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    setTour({ ...tour, [name]: value });
  };

  const generateTourName = () => {
    const { city, country, theme, duration, difficulty } = tour;
    const name = `${city}, ${country} ${theme} tour - lasting ${duration} with ${difficulty} difficulty.`;
    console.log('Generated Tour Name:', name);
    return name;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let generatedWalkingTour = await generateWalkingTour();

    const pointsOfInterest = parsePointsOfInterest(generatedWalkingTour); // Parse points of interest from tourContent

    const newTour = {
      country: tour.country,
      region: tour.region,
      state: tour.state,
      city: tour.city,
      duration: tour.duration,
      difficulty: tour.difficulty,
      theme: tour.theme,
      tour_name: generateTourName(), // Generate the tour name
      ordered_points_of_interest: pointsOfInterest, // Use pointsOfInterest from tourContent
    };

    try {
      const response = await axios.post(`${config.apiUrl}/tours`, newTour, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Tour added successfully:', response.data);
    } catch (error) {
      console.error('Error adding tour:', error);
    }
  };

  return (
    <div className="container mt-5" style={{ paddingTop: '160px' }}>
      <h1 className="text-center mb-4">Walking Tour Generator</h1>
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="City"
            name="city"
            value={tour.city}
            onChange={handleTextChange}
          />
        </div>

        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Borough/Region"
            name="region"
            value={tour.region}
            onChange={handleTextChange}
          />
        </div>

        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="State/County/Province"
            name="state"
            value={tour.state}
            onChange={handleTextChange}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Country"
            name="country"
            value={tour.country}
            onChange={handleTextChange}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-4">
          <select
            className="form-control"
            value={tour.duration}
            onChange={handleDropdownChange}
            id="duration"
          >
            <option value="Full-day">Full-day</option>
            <option value="Half-day">Half-day</option>
            <option value="2 hours">2 hours</option>
          </select>
        </div>
        <div className="col-md-4">
          <select
            className="form-control"
            value={tour.difficulty}
            onChange={handleDropdownChange}
            id="difficulty"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div className="col-md-4">
          <select
            className="form-control"
            value={tour.theme} // Updated: theme instead of tourType
            onChange={handleDropdownChange}
            id="theme" // Updated: theme instead of tourType
          >
            <option value="Historic">Historic</option>
            <option value="Scenic">Scenic</option>
            <option value="Fun">Fun</option>
            <option value="Museums">Museums</option>
            <option value="Pubs">Pubs</option>
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col text-center">
          <button className="btn btn-primary" onClick={handleSubmit} disabled={!tour.city || isLoading}>
            Generate Walking Tour
          </button>
        </div>
      </div>
      {isLoading ? (
        // Conditional rendering for loading animation
        <div className="row text-center">
          <div className="col">
            <p>Loading...</p>

            <div style={{ margin: '16px 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={loadingAnimation} alt="Loading..." width="250" height="250" />
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col">
            <textarea className="form-control" style={{ width: '20%' }} rows="10" value={tourContent} readOnly />
          </div>
        </div>
      )}

      {/* "Start Tour" button */}
      <div className="row">
        <div className="col text-center">
          <Link to="/tourlive">
            <button className="btn btn-success">Start Tour</button>
          </Link>
        </div>
      </div>

    </div>
  );
}
