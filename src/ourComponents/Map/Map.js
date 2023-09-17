
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import { useMemo } from 'react';
import loadingLogo from '../../assets/S-Loop_transnparent.gif'

// const center = { lat: 40.8448, lng: 40.8448 }

export default function Map() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  })
  const center = useMemo(() => ({ lat: 40.8448, lng: -73.8648 }), []);

  if (!isLoaded) {
    return (
      <div>
        <img src={loadingLogo} alt='loading...' />
      </div>
    )
  }

  return (
    <div position='center' className='h-[300px] w-[600px]'>
      <GoogleMap
        center={center}
        zoom={5}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        options={{
          // zoomControl: false,
          // streetViewControl: false,
          mapTypeControl: false,
          // fullscreenControl: false
        }}
      >
        <MarkerF position={center} />
      </GoogleMap>
    </div>
  )
}
