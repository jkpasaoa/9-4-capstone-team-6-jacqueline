
import React, { useState } from 'react';
import axios from 'axios';
import TourDetailsForm from './TourDetailsForm';
import TourContent from './TourContent';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
const API = process.env.REACT_APP_API_URL;

export default function CreateNewTour() {
  // State variables for tour data
  const [tour, setTour] = useState({
    country: '',
    region: '',
    state: '',
    city: '',
    duration: 'Full-day',
    difficulty: 'Medium',
    tourType: 'Historic',
  });

  // State variables for loading and tour content
  const [loading, setLoading] = useState(false);
  const [tourContent, setTourContent] = useState('');

  // Function to generate the walking tour
  const generateWalkingTour = async () => {
    try {
      setLoading(true);

      const prompt = `Walking Tour in ${tour.city}, ${tour.region}, ${tour.state}, ${tour.country}\nTour Duration: ${tour.duration}\nDifficulty Level: ${tour.difficulty}\nTour Type: ${tour.tourType},`;

      const requestBody = {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',

            content: 'Create a self-guided walking tour, where the start point and end point are the same place, and where a person can start somewhere and follow a route from start point to each point of interest and returning to the start point when the tour is over.  I only want the tour route and what points of interest are on that route. Do not give commentary, or directions for any point of interest.',>>>>>>> dev
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

      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setTourContent('Error generating the walking tour. Please try again.');
      setLoading(false);
    }
  };


  // Function to handle changes in text inputs
  const handleTextChange = (event) => {
    const { name, value } = event.target;
    setTour({ ...tour, [name]: value });
  };

  // Function to handle dropdown changes
  const handleDropdownChange = (event) => {
    const { id, value } = event.target;
    setTour({ ...tour, [id]: value });
  };


  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object with the tour data
    const newTour = {
      country: tour.country,
      region: tour.region,
      state: tour.state,
      city: tour.city,
      duration: tour.duration,
      difficulty: tour.difficulty,
      tourType: tour.tourType,
    };

    // Send a POST request to your backend API to save the tour
    axios
      .post(`${API}/tours`, newTour, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Tour added successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error adding tour:', error);
        // Handle the error, e.g., show a message to the user
      });

    // Generate the walking tour
    generateWalkingTour();
  };

  return (

    <div className="container mt-5" style={{ paddingTop: '160px' }}>
      <h1 className="text-center mb-4">Walking Tour Generator</h1>
      <TourDetailsForm
        tour={tour}
        handleTextChange={handleTextChange}
        handleDropdownChange={handleDropdownChange}
        handleSubmit={handleSubmit}
        loading={loading}
      />
      <TourContent tourContent={tourContent} loading={loading} />
    </div>
  );
}
