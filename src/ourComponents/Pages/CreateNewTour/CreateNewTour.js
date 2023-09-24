
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import loadingAnimation from '../../../assets/S-Loop_transnparent.gif'; // Import the loading animation
// import Map from '../../Map/Map';
import '../CreateNewTour/CreateNewTour.css'

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
  unsplashApiSecretKey: process.env.REACT_APP_UNSPLASH_API_SECRET_KEY,
};

// Define the insertPointOfInterest function
const insertPointOfInterest = async (poi, newTourId, coordinates, image_url) => {

  console.log('Inserting Point of Interest:', poi);
  console.log('New Tour ID:', newTourId);
  console.log('Coordinates:', coordinates);
  console.log('Image URL:', image_url);

  try {
    // Insert the POI data into the database
    const response = await axios.post(`${config.apiUrl}/pointofinterest`, {
      poi_name: poi,
      tour_id: newTourId,
      latitude: coordinates.latitude || null,
      longitude: coordinates.longitude || null,
      image_url: image_url,
      created_at: new Date().toISOString(), // Set the created_at timestamp
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(`Point of Interest "${poi}" added successfully:`, response.data);

  } catch (error) {
    console.error(`Error adding Point of Interest "${poi}":`, error);
  }
};

// Define the getImageFromUnsplash function
const getImageFromUnsplash = async (poi) => {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(poi)}&client_id=${config.unsplashApiKey}&count=1&order_by=relevant&per_page=1`,
      {
        headers: {
          Authorization: `Client-ID ${config.unsplashApiSecretKey}`,
        },
      }
    );

    // Extract the photo URL from the response
    const photoUrl = response.data.results[0]?.urls?.regular || '';

    return photoUrl;
  } catch (error) {
    console.error(`Error fetching image for ${poi} from Unsplash:`, error);
    return ''; // Return an empty string in case of an error
  }
};


// Define the fetchCityPhoto function
const fetchCityPhoto = async (cityName, setCityPhoto) => {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(cityName)}&client_id=${config.unsplashApiKey}&count=1&order_by=relevant&per_page=1`,
      {
        headers: {
          Authorization: `Client-ID ${config.unsplashApiSecretKey}`,
        },
      }
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
    duration: '',
    difficulty: '',
    theme: '', // Updated: theme instead of tourType
  });

  const [tourContent, setTourContent] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Added isLoading state
  const [cityPhoto, setCityPhoto] = useState('');

  //for dropdown select
  // const [selectedOption, setSelectedOption] = useState('');


  // const parsePointsOfInterest = (generatedTour) => {
  //   const bulletPattern = /^\s*\d+\.\s(.+)$/gm;
  //   const matches = [];
  //   let match;
  //   while ((match = bulletPattern.exec(generatedTour)) !== null) {
  //     matches.push(match[1]);
  //   }
  //   return matches;
  // };
  
// Function to extract POI and coordinates
const parsePointsOfInterestAndCoordinates = (generatedTour) => {
  const bulletPattern = /^\s*\d+\.\s(.+)$/gm;
  const coordinatePattern = /\((-?\d+\.\d+)° ([NS]), (-?\d+\.\d+)° ([EW])\)/g;
  const matches = [];
  let match;

  while ((match = bulletPattern.exec(generatedTour)) !== null) {
    const poi = match[1];
    const coordinateMatches = coordinatePattern.exec(generatedTour);
    if (coordinateMatches) {
      const latitude = parseFloat(coordinateMatches[1]);
      const latitudeDirection = coordinateMatches[2];
      const longitude = parseFloat(coordinateMatches[3]);
      const longitudeDirection = coordinateMatches[4];

      const latitudeSign = latitudeDirection === 'N' ? 1 : -1;
      const longitudeSign = longitudeDirection === 'E' ? 1 : -1;

      const adjustedLatitude = latitude * latitudeSign;
      const adjustedLongitude = longitude * longitudeSign;

      const coordinates = { latitude: adjustedLatitude, longitude: adjustedLongitude };

      matches.push({ poi, coordinates });
    }
  }

  return matches;
};


  const generateWalkingTour = async () => {
    try {
      setIsLoading(true); // Set loading to true


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
            content: 'Create a self guided walking tour where a person can start somewhere and follow a route from start point to each point of interest and returning to the start point when the tour is over.  I only want the tour route and what points of interest are on that route with the coordinates for each point of interest. I will ask later for an in depth tour or each point of interest.',
          },
          {
            role: 'user',
            content: prompt,
          },
          {
            role: 'user',
            content: 'Include coordinates for each point of interest.',
          },
          {
            role: 'user',
            content: `Use this as a format example for the response I want to get. I do not want any additional information other than what is in this example, also notice how the start point and end point are the same: 
          
          Start Point: Plaça de Catalunya
          
          Route:
          1. Plaça de Catalunya
          2. La Rambla
          3. Palau Güell
          4. Plaça Reial
          5. Barcelona Cathedral
          6. Santa Maria del Mar
          7. Picasso Museum
          8. Parc de la Ciutadella
          9. Arc de Triomf
          10. Sagrada Família
          11. Casa Batlló
          12. Casa Milà (La Pedrera)
          13. Passeig de Gràcia
          14. Plaça de Catalunya (return to start point)
          `
          }

        ],

        // Add a max_tokens parameter to limit the response length
      max_tokens: 150, // to limit photos temp.

      };

      const response = await axios.post('https://api.openai.com/v1/chat/completions', requestBody, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.openaiApiKey}`,
        },
      });

      const generatedTour = response.data.choices[0]?.message.content;
    setTourContent(generatedTour);

    // Parse points of interest and extract coordinates from the generated tour content
    const pointsOfInterestWithCoordinates = parsePointsOfInterestAndCoordinates(generatedTour);

    // Separate the points of interest and coordinates into two arrays
    const pointsOfInterest = pointsOfInterestWithCoordinates.map((poi) => poi.poi);
    const coordinates = pointsOfInterestWithCoordinates.map((poi) => poi.coordinates);

    // Sanitize each point of interest
    const sanitizedPointsOfInterest = pointsOfInterest.map(sanitizeInput);

    console.log('Points of Interest: ', sanitizedPointsOfInterest);
    console.log('Coordinates: ', coordinates);

    setIsLoading(false);

    return { generatedTour, sanitizedPointsOfInterest, coordinates };
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

  //for drop down select
  // const handleOptionChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };

  const generateTourName = () => {
    const { city, country, theme, duration, difficulty } = tour;
    const name = `${city}, ${country} ${theme} tour - lasting ${duration} with ${difficulty} difficulty.`;
    console.log('Generated Tour Name:', name);
    return name;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let generatedWalkingTour = await generateWalkingTour();

    // // Parse and sanitize points of interest
    // const pointsOfInterest = parsePointsOfInterest(generatedWalkingTour);
    // const sanitizedPointsOfInterest = pointsOfInterest.map(sanitizeInput);

    // Parse and sanitize points of interest with coordinates
  const { sanitizedPointsOfInterest, coordinates } = generatedWalkingTour;

    // Fetch the city photo
    const cityPhoto = await fetchCityPhoto(tour.city, setCityPhoto);

    const newTour = {
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

      // Get the ID of the newly inserted tour
      const newTourId = response.data.id;

     // Iterate through the points of interest and insert them
    for (let i = 0; i < sanitizedPointsOfInterest.length; i++) {
      const poi = sanitizedPointsOfInterest[i];
      const poiCoordinates = coordinates[i]; // Get the corresponding coordinates
        
        // // Fetch coordinates for the current POI
        // const coordinates = await getCoordinatesFromNominatim(poi);

        // Fetch the image URL for the current POI from Unsplash
        const poiImageUrl = await getImageFromUnsplash(poi);

        // Insert the POI data into the database
        await insertPointOfInterest(poi, newTourId, poiCoordinates, poiImageUrl);
      }
      console.log('POI added successfully:', coordinates);
    } catch (error) {
      console.error('Error adding tour:', error);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{ paddingTop: '160px' }}>
      <div className="container flex flex-col items-center justify-center ">
        <h1 className="text-3xl text-center mb-4 underline">Walking Tour Generator</h1>

        {/* City Input */}
        <div className="field mb-3">
          <input
            type="text"
            className="rounded-lg border w-full p-2"
            placeholder="Enter a City to Explore"
            name="city"
            value={tour.city}
            onChange={handleTextChange}
          />
        </div>

        {/* Region Input */}
        <div className="field mb-3">
          <input
            type="text"
            className="rounded-lg border w-full p-2"
            placeholder="Borough/Region if applicable"
            name="region"
            value={tour.region}
            onChange={handleTextChange}
          />
        </div>

        {/* State Input */}
        <div className="field mb-3">
          <input
            type="text"
            className="rounded-lg border w-full p-2"
            placeholder="State/County/Province if applicable"
            name="state"
            value={tour.state}
            onChange={handleTextChange}
          />
        </div>

        {/* Country Input */}
        <div className="field mb-3">
          <input
            type="text"
            className="rounded-lg border w-full p-2"
            placeholder="Enter the Country"
            name="country"
            value={tour.country}
            onChange={handleTextChange}
          />
        </div>

        {/* Duration Dropdown */}
        <div className="field mb-3">
          <select
            className="rounded-lg border w-full p-2"
            value={tour.duration}
            onChange={handleDropdownChange}
            id="duration"
          >

            <option value="" disabled>Select Day Duration</option>
            <option value="Full-day">Full-day</option>
            <option value="Half-day">Half-day</option>
            <option value="2 hours">2 hours</option>
          </select>
        </div>

        {/* Difficulty Dropdown */}
        <div className="field mb-3">
          <select
            className="rounded-lg border w-full p-2"
            value={tour.difficulty}
            onChange={handleDropdownChange}
            id="difficulty"
          >
            {/* <select value={selectedOption} onChange={handleOptionChange}></select> */}
            <option value="" disabled>Select Walking Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Theme Dropdown */}
        <div className="field mb-3">
          <select
            className="rounded-lg border w-full p-2"
            value={tour.theme}
            onChange={handleDropdownChange}
            id="theme"
          >
            <option value="" disabled>Select Tour Theme</option>
            <option value="Historic">Historic</option>
            <option value="Scenic">Scenic</option>
            <option value="Fun">Fun</option>
            <option value="Museums">Museums</option>
            <option value="Pubs">Pubs</option>
          </select>
        </div>

        {/* Generate Button */}
        <div className="mb-3 text-center">
          <button
            onClick={handleSubmit}
            disabled={!tour.city || isLoading}
            type="button"
            className="mt-6 inline-block rounded bg-[#183759] px-6 py-2 text-xs font-bold text-[#dbd4db] uppercase leading-normal transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] hover:scale-110"
          >
            Generate Walking Tour
          </button>
        </div>

        {isLoading ? (
          // Conditional rendering for loading animation
          <div className="text-center">
            <p>Loading...</p>

            <div style={{ margin: '16px 0' }}>
              <img src={loadingAnimation} alt="Loading..." className="w-32 mx-auto" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row">
            {/* Display the city photo */}
            {cityPhoto && (
              <img src={cityPhoto} alt={`${tour.city}`} className="city-photo w-3/4 mx-auto sm:w-1/2" />
            )}

            <br />

            <textarea className="route-container border rounded-lg w-full p-2" rows="10" value={tourContent} readOnly />
          </div>
        )}

        {/* "Start Tour" button */}
        <div className="mb-3 text-center">
          <Link to="/tourlive">
            <button className="mt-6 inline-block rounded bg-[#E36E43] px-6 py-2 text-xs font-bold text-[#dbd4db] uppercase leading-normal transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] hover:scale-110">Start Tour</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

//Commented out in case anyone needs to revisit previous code for HTML
//   return (
//     <div className="mx-auto p-4" style={{ paddingTop: '160px' }}>
//       <h1 className="text-3xl text-center mb-4 underline">Walking Tour Generator</h1>
//       {/* City Input */}
//       <div className="mb-3">
//           <input
//             type="text"
//             className="text-center rounded-lg border w-full p-2"
//             style={{ width: '25%', height: '45px' }}
//             placeholder="Enter a City to Explore"
//             name="city"
//             value={tour.city}
//             onChange={handleTextChange}
//           />
//         <br />
//         {/* Region Input */}
//         <div className="mb-3">
//           <input
//             type="text"
//             className="text-center rounded-lg border w-full p-2"
//             style={{ width: '25%', height: '45px' }}
//             placeholder="Borough/Region if applicable"
//             name="region"
//             value={tour.region}
//             onChange={handleTextChange}
//           />
//         </div>
//         {/* State Input */}
//         <div className="mb-3">
//           <input
//             type="text"
//             className="rounded-lg border text-center w-full p-2"
//             style={{ width: '35%', height: '45px' }}
//             placeholder="State/County/Province if applicable"
//             name="state"
//             value={tour.state}
//             onChange={handleTextChange}
//           />
//         </div>
//         <br />
//         {/* Country Input */}
//         <div className="mb-3">
//           <input
//             type="text"
//             className="text-center rounded-lg"
//             style={{ width: '25%', height: '45px' }}
//             placeholder="Enter the Country"
//             name="country"
//             value={tour.country}
//             onChange={handleTextChange}
//           />
//         </div>
//       </div>
//       <br />
//       <div className="row mb-3">
//         <div className="col-md-4">
//           <select
//             className="form-control text-center rounded-lg"
//             style={{ width: '15%', height: '40px' }}
//             value={tour.duration}
//             onChange={handleDropdownChange}
//             id="duration"
//           >
//             <option value="Full-day">Full-day</option>
//             <option value="Half-day">Half-day</option>
//             <option value="2 hours">2 hours</option>
//           </select>
//         </div>
//         <br />
//         <div className="col-md-4">
//           <select
//             className="form-control text-center rounded-lg"
//             style={{ width: '15%', height: '40px' }}
//             value={tour.difficulty}
//             onChange={handleDropdownChange}
//             id="difficulty"
//           >
//             <option value="Easy">Easy</option>
//             <option value="Medium">Medium</option>
//             <option value="Hard">Hard</option>
//           </select>
//         </div>
//         <br />
//         <div className="col-md-4">
//           <select
//             className="form-control text-center rounded-lg"
//             style={{ width: '15%', height: '40px' }}
//             value={tour.theme} // Updated: theme instead of tourType
//             onChange={handleDropdownChange}
//             id="theme" // Updated: theme instead of tourType
//           >
//             <option value="Historic">Historic</option>
//             <option value="Scenic">Scenic</option>
//             <option value="Fun">Fun</option>
//             <option value="Museums">Museums</option>
//             <option value="Pubs">Pubs</option>
//           </select>
//         </div>
//       </div>
//       <div className="row mb-3">
//         <div className="col text-center">
//           <button
//             onClick={handleSubmit}
//             disabled={!tour.city || isLoading}
//             type="button"
//             data-te-ripple-init
//             data-te-ripple-color="light"
//             class="mt-6 inline-block rounded bg-[#183759] px-6 pb-2 pt-2.5 text-xs font-bold text-[#dbd4db] uppercase leading-normal transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] hover:scale-110"
//           >
//             Generate Walking Tour
//           </button>
//         </div>
//       </div>
//       {isLoading ? (
//         // Conditional rendering for loading animation
//         <div className="row text-center">
//           <div className="col">
//             <p>Loading...</p>

//             <div style={{ margin: '16px 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//               <img src={loadingAnimation} alt="Loading..." width="250" height="250" />
//             </div>
//           </div>
//         </div>
//       ) : (

//         <div className="row">
//           <div className="col">
//             {/* Display the city photo */}
//             {cityPhoto && (
//               <img src={cityPhoto} alt={`${tour.city}`} style={{ width: '30%', display: 'block', margin: '0 auto' }} />
//             )}
//             <br />
//             <textarea className="form-control" style={{ width: '20%' }} rows="10" value={tourContent} readOnly />
//           </div>

//           {/* Include the Map component here */}
//           <Map />
//         </div>
//       )}

//       {/* "Start Tour" button */}
//       <div className="row">
//         <div className="col text-center">
//           <Link to="/tourlive">
//             <button className="btn btn-success">Start Tour</button>
//           </Link>
//         </div>
//       </div>

//     </div>
//   );
// }

