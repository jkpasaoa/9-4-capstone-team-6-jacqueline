import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../EndTour/EndTour.css';
import AnimatedLogo from '../../../assets/City_Whisperer_Animation_LargeDashes.mp4';
import StarEmpty from '../../../assets/endTourPhotos/empty-star-icon.png';
import StarFilled from '../../../assets/endTourPhotos/full-star-icon.png';

const EndTour = () => {
  const [userMessage, setUserMessage] = useState({
    message: '',
  });

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleTextChange = (event) => {
    setUserMessage({ ...userMessage, message: event.target.value });
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleHoverRating = (hoveredRating) => {
    setHoverRating(hoveredRating);
  };

  const renderStarImages = () => {
    const starImages = [];
    // const starSize = '24px';
    const maxRating = Math.max(rating, hoverRating);

    for (let i = 1; i <= 5; i++) {
      starImages.push(
        <img
          key={i}
          src={i <= maxRating ? StarFilled : StarEmpty}
          alt={`Star ${i}`}
          className="w-6 h-6 cursor-pointer"
          onClick={() => handleRatingChange(i)}
          onMouseEnter={() => handleHoverRating(i)}
          onMouseLeave={() => handleHoverRating(0)}
        />
      );
    }
    return starImages;
  };

  return (
    <div className="no-content-container">
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-amber-300 w-3/4 md:w-1/2 lg:w-1/3 p-4 rounded-lg shadow-lg">
          <div className="mb-4">
            <video className="w-full" controls autoPlay muted>
              <source src={AnimatedLogo} type="video/mp4" />
            </video>
          </div>

          <div className="mb-4">
            <p className="text-lg font-semibold mb-2">
              Safe travels! Thank you for exploring with us!
            </p>
            {/* <div className="text-gray-600 text-sm font-semibold">
              Please rate us
            </div> */}
            <div className="star-container flex items-center justify-center mt-1 mb-2">
              {renderStarImages()}
            </div>
            <div className="text-gray-600 text-xs mb-2">
              <span>1 - Poor</span> | <span>2 - Fair</span> | <span>3 - Average</span> | <span>4 - Very Good</span> | <span>5 - Excellent</span>
            </div>
            {/* <p className="text-gray-600 text-sm mb-2 mt-2 font-semibold text-center">
              Tell us what you liked and how we can improve:
            </p> */}
            <textarea
              className="w-full p-2 border rounded-md"
              rows={5}
              onChange={handleTextChange}
              value={userMessage.message}
              placeholder="Write here to tell us what you liked and how we can improve."
              required
            />
          </div>

          <div className="text-right">
            {/* Use Link to navigate to /tours -could decide to change route to /home once decided with team*/}
            <Link to="/tours">
              <button
                className="inline-block rounded bg-[#E36E43] px-6 py-2 text-xs font-bold text-[#dbd4db] uppercase leading-normal transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] hover:scale-110"
                onClick={() => {
                  // Handle sending the user message and rating, might change if decide to keep rating stored
                }}
              >
                Submit
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div >
  );
};

export default EndTour;