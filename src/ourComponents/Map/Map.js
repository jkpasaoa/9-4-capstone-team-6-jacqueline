// /*global google*/
import { GoogleMap, MarkerF, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api'
import { useState, useEffect } from 'react'; //useRef, useEffect, useMemo
import loadingLogo from '../../assets/S-Loop_transnparent.gif'
// import axios from 'axios';

// const center = { lat: 40.8448, lng: 40.8448 }

// const API = process.env.REACT_APP_API_URL;

export default function Map() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ['places']
  })

  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [map, setMap] = useState(/** @type google.maps.Map */(null))
  const [lat, setLat] = useState('')
  const [long, setLong] = useState('')

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords)
      setLat(position.coords.latitude)
      setLong(position.coords.longitude)
      console.log(lat, long)
    })
  }, [isLoaded, lat, long])

  // const center = useMemo(() => ({ lat: 40.8448, lng: -73.8648 }), []);


  // // start and end point to be replaced with poi cordinates
  // const originRef = useRef()
  // const destinationRef = useRef()

  // useEffect(() => {
  //   axios.get(`${API}/pointofinterest`)
  //     .then((res) => setPointsOfInterest(res.data))
  // }, [])

  // useEffect(() => {
  //   console.log(pointsOfInterest)
  // }, [])

  const startPoint = { lat: lat, lng: long }
  const endPoint = { lat: 40.6782, lng: -73.9442 }

  const calculateRoute = async () => {
    if (!startPoint || !endPoint) {
      return
    }

    // const google = window.google;

    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: startPoint,
      destination: endPoint,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.WALKING
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

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
        center={{ lat: lat, lng: long }}
        zoom={10}
        mapContainerStyle={{ width: '105%', height: '150%' }}
        options={{
          // zoomControl: false,
          // streetViewControl: false,
          mapTypeControl: false,
          // fullscreenControl: false
        }}
        onLoad={(map) => setMap(map)}
      >
        <MarkerF position={{ lat: lat, lng: long }} />
        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
      </GoogleMap>
      <p><button onClick={() => map.panTo({ lat: lat, lng: long })}>📍</button><button onClick={calculateRoute}>START TOUR</button></p>
      <p><strong>Distance:</strong> {distance} <br /> <strong>Duration:</strong> {duration}</p>
      <br />
    </div>
  )
}
