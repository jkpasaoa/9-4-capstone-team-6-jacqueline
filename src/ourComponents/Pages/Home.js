import React, { useState } from 'react';
import videoUrl from '../../assets/LandingPageVid.mp4';

export default function Home() {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="fullscreen-video">
      <video autoPlay loop muted={isMuted}
        controls
        // comment out controls once finished mvp, it is used for testing
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button onClick={toggleMute}>
        {isMuted ? 'Unmute' : 'Mute'}
      </button>
    </div>
  );
}




// import './Pages.css'; 

// export default function Home() {
//   return (
//     <div>
//       <p className="home-content">Home</p>
//     </div>
//   );
// }
