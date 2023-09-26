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
  pixabayApiKey: process.env.REACT_APP_PIXABAY_API_KEY,
};


// GeneratePOICommentary function to accept poiName, cityName and countryName
const generatePOICommentary = async (poiName, cityName, countryName) => {
  try {
    // Create a prompt that includes the POI name, city name, and country name
    const prompt = `Provide a 500-word commentary for ${poiName} in ${cityName}, ${countryName}.`;

    console.log(`Generating commentary for "${poiName}" in ${cityName}, ${countryName}...`);


    const requestBody = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
        {
          role: 'user',
          content: 'Provide 500-word descriptions for each point of interest, as if you are a tour guide addressing your tour group. Use this as an example of the tone of voice for the response I want to get.',
        },
        {
          role: 'assistant',
          content: `As we stand here, gazing up at the towering steel arches of the Sydney Harbour Bridge, let's journey back in time to the early 20th century. Construction of this engineering marvel began in 1924 during the Great Depression, providing much-needed jobs to thousands of workers. It was a time when the idea of spanning the magnificent Sydney Harbour with a bridge seemed audacious, but determination prevailed.
    
    The Sydney Harbour Bridge, often affectionately known as the "Coathanger" due to its distinctive shape, officially opened in 1932. It was an event of immense pride and celebration for the people of Sydney, marking the culmination of years of hard work and ingenuity. Today, it stands as a symbol of resilience and achievement.
    
    This bridge is more than just a feat of engineering; it's a vital artery of Sydney, connecting the city's central business district with the northern suburbs. As we traverse the bridge's pedestrian walkway, you'll be treated to panoramic views of Sydney Harbour, the Sydney Opera House, and the city skyline. It's a vista that takes your breath away and offers countless photo opportunities.
    
    If you're feeling adventurous, you can even climb the Sydney Harbour Bridge with a guided tour. Scaling this iconic structure provides a thrilling and unique perspective of the city and its surroundings. Whether you're a daredevil or simply seeking an unforgettable experience, the bridge climb is an option you won't want to miss.
    
    The Sydney Harbour Bridge is more than just a physical connector; it's a symbol of unity and celebration. Every year, on New Year's Eve, the bridge becomes the centerpiece of one of the world's most spectacular fireworks displays, lighting up the night sky and drawing crowds from near and far.
    
    As we stand here, taking in the breathtaking views and the history that surrounds us, remember that the Sydney Harbour Bridge is more than just steel and concrete. It's a testament to human vision, determination, and the enduring spirit of Sydney.
    
    I want to thank each of you for joining me on this journey across the Sydney Harbour Bridge today. Whether you're a first-time visitor or a seasoned traveler, this bridge offers an experience that leaves an indelible mark on your memories.
    
    So, as we continue to explore the vibrant city of Sydney, carry with you the awe-inspiring views and the sense of connection to this remarkable bridge. May your time in Sydney be filled with wonder and discovery.
    `
        }
      ],
      max_tokens: 500,
    };

    const response = await axios.post('https://api.openai.com/v1/chat/completions', requestBody, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.openaiApiKey}`,
      },
    });

    const commentary = response.data.choices[0]?.message.content;

    console.log('Generated Commentary:', commentary); // Add this line

    return commentary;
  } catch (error) {
    console.error(`Error generating commentary for ${poiName}:`, error);
    return ''; // Return an empty string in case of an error
  }
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

    // Return the poiId obtained from the response
    return response.data.poiId;

  } catch (error) {
    console.error(`Error adding Point of Interest "${poi}":`, error);
  }
};


// Define the getImageFromUnsplash function
const getImageFromUnsplash = async (poi, cityName, latitude, longitude) => {
  try {
    // Create a query string that includes POI, cityName, and country
    const query = `${encodeURIComponent(poi)} ${encodeURIComponent(cityName)} ${latitude},${longitude}`;

    console.log('POI:', poi);
    console.log('Coordinates:', latitude, longitude);

    const response = await axios.get(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${config.unsplashApiKey}&count=1&order_by=relevant&per_page=1`,
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


// Define the insertCommentary function
const insertCommentary = async (poiId, commName, description) => {

  console.log(`Adding commentary for "${commName}"...`);

  try {
    // Insert the commentary data into the database
    const response = await axios.post(`${config.apiUrl}/commentary`, {
      poi_id: poiId,
      comm_name: commName,
      description: description, // Use the provided description
      created_at: new Date().toISOString(),
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(`Commentary "${commName}" added successfully:`, response.data);

  } catch (error) {
    console.error(`Error adding Commentary "${commName}":`, error);
  }
};




export default function CreateNewTour() {
  // Initialize state variables using the useState hook
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

// Function to extract POI (name) and coordinates (latitude, longitude)
const parsePointsOfInterestAndCoordinates = (generatedTour) => {
  const coordinatePattern = /(\d+)\.\s([^()]+) \(([-\d.]+)° ([NS]), ([-\d.]+)° ([EW])\)/g;
  const matches = [];
  let match;

  while ((match = coordinatePattern.exec(generatedTour)) !== null) {
    console.log(match)
    const [poiName, latitude, latitudeDirection, longitude, longitudeDirection] = match;

    const latitudeSign = latitudeDirection === 'N' ? 1 : -1;
    const longitudeSign = longitudeDirection === 'E' ? 1 : -1;

    const adjustedLatitude = parseFloat(latitude) * latitudeSign;
    const adjustedLongitude = parseFloat(longitude) * longitudeSign;

    const coordinates = { latitude: adjustedLatitude, longitude: adjustedLongitude };

    matches.push({ poi: poiName, coordinates });

    // Log the extracted POI and coordinates
    console.log(`Extracted POI: ${poiName}`);
    console.log(`Coordinates: Latitude ${adjustedLatitude}, Longitude ${adjustedLongitude}`);
  }
  console.log(matches, generatedTour)
  return matches;
};



  // Function to generate a walking tour
  const generateWalkingTour = async () => {
    try {
      setIsLoading(true); // Set loading to true

      // Log that the function is being called
      console.log('generateWalkingTour function called');


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
            content: 'Include coordinates for each point of interest, if there are none use (0.4144° N, 0.7019° W) as a placeholder.',
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
          },
        ],

        // Add a max_tokens parameter to limit the response length
        max_tokens: 500, // to limit photos temp.

      };

      const response = await axios.post('https://api.openai.com/v1/chat/completions', requestBody, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.openaiApiKey}`,
        },
      });

      const generatedTour = response.data.choices[0]?.message.content;
      setTourContent(generatedTour);

      console.log('Generated Tour: ', generatedTour)
      console.log('Response.data: ', response.data)
      console.log('response.data.choices[0]?.message.content:', response.data.choices[0]?.message.content)

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

  // Event handler for dropdown select
  const handleDropdownChange = (event) => {
    const { id, value } = event.target;
    setTour({ ...tour, [id]: value });
  };

  // Event handler for text input
  const handleTextChange = (event) => {
    const { name, value } = event.target;
    setTour({ ...tour, [name]: value });
  };

  //for drop down select
  // const handleOptionChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };

  // Function to generate a tour name
  const generateTourName = () => {
    const { city, country, theme, duration, difficulty } = tour;
    const name = `${city}, ${country} ${theme} tour - lasting ${duration} with ${difficulty} difficulty.`;
    console.log('Generated Tour Name:', name);
    return name;
  };


  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let generatedWalkingTour = await generateWalkingTour();

    if (!generatedWalkingTour) {
      console.error('Walking tour generation failed.');
      return;
    }

    // Parse and sanitize points of interest with coordinates
    const { sanitizedPointsOfInterest, coordinates } = generatedWalkingTour;

    // Fetch the city photo
    const cityPhoto = await fetchCityPhoto(tour.city, setCityPhoto);

    // ... (creating a new tour object)
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

        let poiImageUrl = ''; // Initialize with an empty string

        try {
          // Attempt to fetch the image URL for the current POI from Unsplash
          const poiCoordinates = coordinates[i]; // Get the corresponding coordinates
          poiImageUrl = await getImageFromUnsplash(poi, tour.city, poiCoordinates.latitude, poiCoordinates.longitude);
        } catch (imageError) {
          console.error(`Error fetching image for ${poi} from Unsplash:`, imageError);
          // You can choose to log the error and continue without setting the image URL
        }

        // Insert the POI data into the database
        const poiId = await insertPointOfInterest(poi, newTourId, poiCoordinates, poiImageUrl);

        // Generate commentary for the POI
        const commentary = await generatePOICommentary(poi, tour.city, tour.country);


        // Now, insert commentary associated with this POI using the POI name as commentary name
        const commName = poi; // Use the POI name as the commentary name
        const description = commentary; // Use the generated commentary as the description
        await insertCommentary(poiId, commName, description);

      }
      console.log('POI added successfully:', coordinates);
    } catch (error) {
      console.error('Error adding tour:', error);
    }
  };



  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{ paddingTop: '200px' }}>
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

