
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import loadingAnimation from '../../assets/S-Loop_transnparent.gif'; // Import the loading animation

// Sanitizer function to prevent SQL injection
function sanitizeInput(input) {
  // Escape single quotes by replacing them with double single quotes
  return input.replace(/'/g, "''");
}

const config = {
  openaiApiKey: process.env.REACT_APP_OPENAI_API_KEY,
  apiUrl: process.env.REACT_APP_API_URL,
  googleApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  unsplashApiKey: process.env.REACT_APP_UNSPLASH_API_ACCESS_KEY,
  // unsplashApiSecretKey: process.env.REACT_APP_UNSPLASH_API_SECRET_KEY,
};

// Define the fetchCityPhoto function
const fetchCityPhoto = async (cityName, setCityPhoto) => {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(cityName)}&client_id=${config.unsplashApiKey}&count=1&order_by=relevant&per_page=1`
    );

    // Extract the photo URL from the response
    const photoUrl = response.data.results[0]?.urls?.regular || '';

    setCityPhoto(photoUrl); // Set the city photo URL in state

    return photoUrl;
  } catch (error) {
    console.error('Error fetching city photo:', error);
    return ''; // Return an empty string in case of an error
  }
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
  const [cityPhoto, setCityPhoto] = useState('');


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

      // const prompt = `Walking Tour in ${tour.city}, ${tour.region}, ${tour.state}, ${tour.country}\nTour Duration: ${tour.duration}\nDifficulty Level: ${tour.difficulty}\nTour Theme: ${tour.theme},`; // Updated: theme instead of tourType

            // Sanitize the input values
            const sanitizedCity = sanitizeInput(tour.city);
            const sanitizedRegion = sanitizeInput(tour.region);
            const sanitizedState = sanitizeInput(tour.state);
            const sanitizedCountry = sanitizeInput(tour.country);
            const sanitizedDuration = sanitizeInput(tour.duration);
            const sanitizedDifficulty = sanitizeInput(tour.difficulty);
            const sanitizedTheme = sanitizeInput(tour.theme);
      
            const prompt = `Walking Tour in ${sanitizedCity}, ${sanitizedRegion}, ${sanitizedState}, ${sanitizedCountry}\nTour Duration: ${sanitizedDuration}\nDifficulty Level: ${sanitizedDifficulty}\nTour Theme: ${sanitizedTheme},`;
      

      const requestBody = {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Create a self-guided walking tour.   It is imperative  that the start point and end point are the same place.  A person can start somewhere and follow a route from the start point to each point of interest and the last point of interest must be the same as the first point of interest. I only what a list of the points of interest that are on the tour route. Do not give commentary, or directions for any point of interest.',
          },
          {
            role: 'user',
            content: `Start and finish the tour at ${prompt}`,
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

      // Sanitize each point of interest
      const sanitizedPointsOfInterest = pointsOfInterest.map(sanitizeInput);


      console.log('Points of Interest: ', sanitizedPointsOfInterest);

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

    // Parse and sanitize points of interest
    const pointsOfInterest = parsePointsOfInterest(generatedWalkingTour); 
    const sanitizedPointsOfInterest = pointsOfInterest.map(sanitizeInput);


    // Fetch the city photo
    const cityPhoto = await fetchCityPhoto(tour.city, setCityPhoto);

    const newTour = {
      // country: tour.country,
      // region: tour.region,
      // state: tour.state,
      // city: tour.city,
      // duration: tour.duration,
      // difficulty: tour.difficulty,
      // theme: tour.theme,
      country: sanitizeInput(tour.country),
      region: sanitizeInput(tour.region),
      state: sanitizeInput(tour.state),
      city: sanitizeInput(tour.city),
      duration: sanitizeInput(tour.duration),
      difficulty: sanitizeInput(tour.difficulty),
      theme: sanitizeInput(tour.theme),
      tour_name: generateTourName(), // Generate the tour name
      image_url: cityPhoto, // Include the city photo URL
      ordered_points_of_interest: sanitizedPointsOfInterest, // Use pointsOfInterest from tourContent
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
            {/* Display the city photo */}
            {cityPhoto && (
              <img src={cityPhoto} alt={`Photo of ${tour.city}`} style={{ width: '30%', display: 'block', margin: '0 auto' }} />
            )}
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
