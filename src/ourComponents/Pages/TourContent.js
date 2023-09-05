
import React from 'react';

export default function TourContent({ tourContent, loading }) {
  return (
    <div>
      {loading && <p>Loading...</p>}
      <div className="row">
        <div className="col">
          <textarea className="form-control" style={{ width: '30%' }} rows="10" value={tourContent} readOnly />
        </div>
      </div>
    </div>
  );
}

