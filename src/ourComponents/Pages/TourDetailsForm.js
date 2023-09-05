
import React from 'react';

export default function TourDetailsForm({ tour, handleTextChange, handleDropdownChange, handleSubmit, loading }) {
  return (
    <div>
      <div className="row mb-3">
        {/* City input */}
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="City"
            name="city"
            value={tour.city}
            onChange={handleTextChange}
          />
        </div>

        {/* Borough/Region input */}
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Borough/Region"
            name="region"
            value={tour.region}
            onChange={handleTextChange}
          />
        </div>

        {/* State/County/Province input */}
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="State/County/Province"
            name="state"
            value={tour.state}
            onChange={handleTextChange}
          />
        </div>

        {/* Country input */}
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Country"
            name="country"
            value={tour.country}
            onChange={handleTextChange}
          />
        </div>
      </div>
      <div className="row mb-3">
        {/* Duration dropdown */}
        <div className="col-md-4">
          <select
            className="form-control"
            value={tour.duration}
            onChange={handleDropdownChange}
            id="duration"
          >
            <option value="Full-day">Full-day</option>
            <option value="Half-day">Half-day</option>
            <option value="2 hours">2 hours</option>
          </select>
        </div>
        {/* Difficulty dropdown */}
        <div className="col-md-4">
          <select
            className="form-control"
            value={tour.difficulty}
            onChange={handleDropdownChange}
            id="difficulty"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        {/* Tour Type dropdown */}
        <div className="col-md-4">
          <select
            className="form-control"
            value={tour.tourType}
            onChange={handleDropdownChange}
            id="tourType"
          >
            <option value="Historic">Historic</option>
            <option value="Scenic">Scenic</option>
            <option value="Fun">Fun</option>
            <option value="Museums">Museums</option>
            <option value="Pubs">Pubs</option>
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <button className="btn btn-primary" onClick={handleSubmit} disabled={!tour.city || loading}>
            Generate Walking Tour
          </button>
        </div>
      </div>
    </div>
  );
}

