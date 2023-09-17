
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { useMemo } from 'react';
import loadingLogo from '../../assets/S-Loop_transnparent.gif'

const center = { lat: 40.7128, lng: 74.0060 }

export default function Map() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  })
  // const center = useMemo(() => ({ lat: 40.712776, lng: -74.005974 }), []);

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
        zoom={15}
        mapContainerStyle={{ width: '100%', height: '100%' }}
      >
      </GoogleMap>
    </div>
  )
}
