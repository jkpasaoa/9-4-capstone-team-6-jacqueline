
import React from 'react';
import PointsOfInterestList from './PointsOfInterestList';

export default function TourContent({ tourContent, loading }) {
  return (
    <div>
      {loading && <p>Loading...</p>}
      <div className="row">
        <div className="col">
          <textarea className="form-control" style={{ width: '20%' }} rows="10" value={tourContent} readOnly />
        </div>
      </div>
      <PointsOfInterestList tourContent={tourContent} />
    </div>
  );
}
