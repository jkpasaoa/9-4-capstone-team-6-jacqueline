
import React from 'react';

export default function PointsOfInterestList({ tourContent }) {
  // Function to parse points of interest
  const parsePointsOfInterest = (tourContent) => {
    const bulletPattern = /^\s*\d+\.\s(.+)$/gm;
    const matches = [];
    let match;
    while ((match = bulletPattern.exec(tourContent)) !== null) {
      matches.push(match[1]);
    }
    return matches;
  };

  const pointsOfInterest = parsePointsOfInterest(tourContent);

  return (
    <div className="flex justify-center">
      <div className="w-1/2"> 
        <ul className="text-center">
          {pointsOfInterest.map((poi, index) => (
            <li key={index}>{poi}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}


