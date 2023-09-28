import React, { useState } from 'react';
import '../EndTour/EndTour.css';
import AnimatedLogo from '../../../assets/City_Whisperer_Animation_LargeDashes.mp4';

function EndTour() {
  const [userMessage, setUserMessage] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    issue: 'General Inquiry',
  });

  const handleTextChange = (event) => {
    setUserMessage({ ...userMessage, [event.target.id]: event.target.value });
  };

  return (
    <div className="end-tour-container">
      {/* Centered Video */}
      <div className="centered-video bottom-5 left-0 right-0 z-[2] mx-[25%] mb-4 flex list-none justify-center p-0">
      <video className="w-full" controls autoPlay muted>
          <source src={AnimatedLogo} type="video/mp4" />
        </video>
      </div>

      <div className="message-container">
        <label className="form-label" htmlFor="message">
          <div className="improve-container" style={{ fontSize: '24px' }}>
            We appreciate your feedback
          </div>
          <br />
          How could we improve? And what did you like?
        </label>
        <br />
        <textarea
          className="form-control"
          id="message"
          rows={5}
          style={{ width: '50%', height: '200px' }}
          onChange={handleTextChange}
          value={userMessage.message}
          placeholder="Write your message here"
          required
        />

      </div>
    </div>
  );
}

export default EndTour;

