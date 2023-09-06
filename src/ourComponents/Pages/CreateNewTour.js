
import React, { useState } from 'react';
import axios from 'axios';
// import MapContainer from './MapContainer';

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

  // Function to parse points of interest
  const parsePointsOfInterest = (generatedTour) => {
    const bulletPattern = /^\s*\d+\.\s(.+)$/gm;
    const matches = [];
    let match;
    while ((match = bulletPattern.exec(generatedTour)) !== null) {
      matches.push(match[1]);
    }
    return matches;
  };

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

            content: 'Create a self-guided walking tour, where the start point and end point are the same place, and where a person can start somewhere and follow a route from start point to each point of interest and returning to the start point when the tour is over.  I only want the tour route and what points of interest are on that route. Do not give commentary, or directions for any point of interest.',
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


  // Function to handle dropdown changes
  const handleDropdownChange = (event) => {
    const { id, value } = event.target;
    setTour({ ...tour, [id]: value });
  };


  // Function to handle changes in text inputs
  const handleTextChange = (event) => {
    const { name, value } = event.target;
    setTour({ ...tour, [name]: value });
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
        // Redirect or perform any other actions needed
        // For example, you can use react-router-dom's history to navigate to another page
        // history.push('/tours');
      })
      .catch((error) => {
        console.error('Error adding tour:', error);
        // Handle the error, e.g., show a message to the user
      });

    // Generate the walking tour (if needed)
    generateWalkingTour();
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
            id="duration" // Add id attribute
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
            id="difficulty" // Add id attribute
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div className="col-md-4">
          <select
            className="form-control"
            value={tour.tourType}
            onChange={handleDropdownChange}
            id="tourType" // Add id attribute
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
        <div className="col">
          <button className="btn btn-primary" onClick={handleSubmit} disabled={!tour.city || loading}>
            Generate Walking Tour
          </button>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      <div className="row">
        <div className="col">
          <textarea className="form-control" style={{ width: '20%' }} rows="10" value={tourContent} readOnly />
        </div>
      </div>
    </div>
  );
}




// import React, { useState } from 'react';
// import axios from 'axios';
// import TourDetailsForm from './TourDetailsForm';
// import TourContent from './TourContent';

// const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
// const API = process.env.REACT_APP_API_URL;

// export default function CreateNewTour() {
//   // State variables for tour data
//   const [tour, setTour] = useState({
//     country: '',
//     region: '',
//     state: '',
//     city: '',
//     duration: 'Full-day',
//     difficulty: 'Medium',
//     tourType: 'Historic',
//   });

//   // State variables for loading and tour content
//   const [loading, setLoading] = useState(false);
//   const [tourContent, setTourContent] = useState('');

//   // Function to generate the walking tour
//   const generateWalkingTour = async () => {
//     try {
//       setLoading(true);

//       const prompt = `Walking Tour in ${tour.city}, ${tour.region}, ${tour.state}, ${tour.country}\nTour Duration: ${tour.duration}\nDifficulty Level: ${tour.difficulty}\nTour Type: ${tour.tourType},`;

//       const requestBody = {
//         model: 'gpt-3.5-turbo',
//         messages: [
//           {
//             role: 'system',
//             content: 'Create a self-guided walking tour, where the start point and end point are the same place, and where a person can start somewhere and follow a route from start point to each point of interest and returning to the start point when the tour is over.  I only want the tour route and what points of interest are on that route. Do not give commentary, or directions for any point of interest.',
//           },
//           {
//             role: 'user',
//             content: prompt,
//           },
//         ],
//       };

//       const response = await axios.post('https://api.openai.com/v1/chat/completions', requestBody, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${apiKey}`,
//         },
//       });

//       const generatedTour = response.data.choices[0]?.message.content;
//       setTourContent(generatedTour);

//       setLoading(false);
//     } catch (error) {
//       console.error('Error:', error);
//       setTourContent('Error generating the walking tour. Please try again.');
//       setLoading(false);
//     }
//   };

//   // Function to handle changes in text inputs
//   const handleTextChange = (event) => {
//     const { name, value } = event.target;
//     setTour({ ...tour, [name]: value });
//   };

//   // Function to handle dropdown changes
//   const handleDropdownChange = (event) => {
//     const { id, value } = event.target;
//     setTour({ ...tour, [id]: value });
//   };

//   // Function to handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Create an object with the tour data
//     const newTour = {
//       country: tour.country,
//       region: tour.region,
//       state: tour.state,
//       city: tour.city,
//       duration: tour.duration,
//       difficulty: tour.difficulty,
//       tourType: tour.tourType,
//     };

//     // Send a POST request to your backend API to save the tour
//     axios
//       .post(`${API}/tours`, newTour, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//       .then((response) => {
//         console.log('Tour added successfully:', response.data);
//       })
//       .catch((error) => {
//         console.error('Error adding tour:', error);
//         // Handle the error, e.g., show a message to the user
//       });

//     // Generate the walking tour
//     generateWalkingTour();
//   };

//   return (
//     <div className="container mt-5" style={{ paddingTop: '160px' }}>
//       <h1 className="text-center mb-4">Walking Tour Generator</h1>
//       <TourDetailsForm
//         tour={tour}
//         handleTextChange={handleTextChange}
//         handleDropdownChange={handleDropdownChange}
//         handleSubmit={handleSubmit}
//         loading={loading}
//       />
//       <TourContent tourContent={tourContent} loading={loading} />
//     </div>
//   );
// }
