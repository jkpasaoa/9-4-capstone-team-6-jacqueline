// import axios from 'axios';

// const GetPlaceId = async (locationName, apiKey) => {
//     const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(locationName)}&key=${apiKey}`;

//     try {
//         const response = await axios.get(apiUrl);
//         const firstResult = response.data.results[0];
//         return firstResult ? firstResult.place_id : null;
//     } catch (error) {
//         console.error('Error fetching Place ID:', error);
//         return null;
//     }
// };

// export default GetPlaceId;
