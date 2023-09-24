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
      <div className="centered-video">
        <video autoPlay loop>
          <source src={AnimatedLogo} type="video/mp4" />
        </video>
      </div>

      <div className="message-container">
        <label className="form-label" htmlFor="message">
          <div className="improve-container" style={{ fontSize: '24px' }}>
            Help us Improve!
          </div>
          <br />
          Customer Feedback:
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

