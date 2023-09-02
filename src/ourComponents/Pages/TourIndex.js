import React, { useState } from 'react';
import Map from "../Map/Map"
import axios from 'axios';

export default function TourIndex() {
    const [tours, setTours] = useState([])

    return (
      <div>
        <Map />
  
      </div>
    )
}
