// /*global google*/
import { GoogleMap, MarkerF, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api'
import { useState, useEffect } from 'react'; //useRef, useEffect, useMemo
import loadingLogo from '../../assets/S-Loop_transnparent.gif'
// import { FaLocationArrow } from 'react-icons/fa'
// import { IconButton } from '@chakra-ui/react';
// import axios from 'axios';

// const center = { lat: 40.8448, lng: 40.8448 }

// const API = process.env.REACT_APP_API_URL;

const libraries = ['places']
export default function Map({ pointsOfInterest, allPointsOfInterest, activeMarker }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries
  })

  const [directionsResponse, setDirectionsResponse] = useState(null)
  // const [currentPoi, setCurrentPoi] = useState('')
  // const [distance, setDistance] = useState('')
  // const [duration, setDuration] = useState('')
  // const [map, setMap] = useState(/** @type google.maps.Map */(null))
  // const [lat, setLat] = useState(0)
  // const [long, setLong] = useState(0)
  const [steps, setSteps] = useState([])
  // const [centerLat, setCenterLat] = useState(0)
  // const [centerLong, setCenterLong] = useState(0)

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     setLat(position.coords.latitude)
  //     setLong(position.coords.longitude)
  //   })
  // }, [isLoaded, lat, long])

  // const matchingPointsOfInterest = () => {
  //   for (let i = 0; i < pointsOfInterest.length; i++) {

  //   }
  // }

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

  // const startPoint = { lat: lat, lng: long }
  // const endPoint = { lat: 40.6782, lng: -73.9442 }

  // const extractSteps = (directions) => {
  //   const steps1 = directions.routes[0].legs[0].steps;
  //   setSteps(steps1);
  // };

  const firstPoi = allPointsOfInterest.find((el) => el.poi_name === pointsOfInterest[0])

  useEffect(() => {
    // setCenterLat(Number(firstPoi.latitude))
    // setCenterLong(Number(firstPoi.longitude))
    console.log(firstPoi)
  }, [isLoaded, firstPoi])

  // eslint-disable-next-line no-undef
  const directionsService = new google.maps.DirectionsService()
  const calculateRoute = async () => {
    // if (!startPoint || !endPoint) {
    //   return
    // }

    // const google = window.google;

    const waypoints = pointsOfInterest.slice(1, -1).map((poi) => {
      const newPointsOfInterest = allPointsOfInterest.find((el) => el.poi_name === poi)
      // console.log(newPointsOfInterest)
      // console.log(poi)
      const locationObj = { location: { lat: Number(newPointsOfInterest.latitude), lng: Number(newPointsOfInterest.longitude) } }
      return locationObj
    })
    const lastPoi = allPointsOfInterest.find((el) => el.poi_name === pointsOfInterest[pointsOfInterest.length - 1])
    const results = await directionsService.route({
      origin: { lat: Number(firstPoi.latitude), lng: Number(firstPoi.longitude) },
      waypoints,
      destination: { lat: Number(lastPoi.latitude), lng: Number(lastPoi.longitude) },
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.WALKING
    })
    setDirectionsResponse(results)
    setSteps(results.routes[0].legs[0].steps)
    // setDistance(results.routes[0].legs[0].distance.text)
    // setDuration(results.routes[0].legs[0].duration.text)
  }

  const calculateNewRoute = async (start, next) => {
    const results = await directionsService.route({
      origin: start,
      destination: next,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.WALKING
    })
    setDirectionsResponse(results)
  }

  const startTour = () => {
    let result = []
    for (let i = 0; i < pointsOfInterest.length; i++) {
      const currentElement = pointsOfInterest[i];
      const nextElement = pointsOfInterest[i + 1];

    }
  }

  useEffect(() => {
    calculateRoute()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded])

  console.log(steps)


  if (!isLoaded) {
    return (
      <div>
        <img src={loadingLogo} alt='loading...' />
      </div>
    )
  }

  const settingCustomMarker = (img) => {
    // let url = ''
    // if (name === activeMarker) {
    //   url = img
    // }

    const customMarkerIcon = {
      url: img,
      // eslint-disable-next-line no-undef
      scaledSize: new google.maps.Size(40, 40)
    }
    return customMarkerIcon
  }

  console.log(activeMarker)

  // const parseDirections = (html) => {
  //   let cleanedHtml = html.replace(/<div.*?>(.*?)<\/div>/g, '$1\n');

  //   cleanedHtml = cleanedHtml.replace(/style=".*?"/g, '');

  //   cleanedHtml = cleanedHtml.replace(/<wbr\/?>/g, ' ');

  //   cleanedHtml = cleanedHtml.replace(/<b>(.*?)<\/b>/g, '$1');

  //   cleanedHtml = cleanedHtml.replace(/<\/?.*?>/g, '');

  //   cleanedHtml = cleanedHtml.replace(/&nbsp;/g, ' ');

  //   cleanedHtml = cleanedHtml.trim();

  //   return cleanedHtml;
  // }

  return (
    <div position='center' className='h-[300px] w-[600px]'>
      <GoogleMap
        center={{ lat: Number(firstPoi.latitude), lng: Number(firstPoi.longitude) }}
        zoom={15}
        mapContainerStyle={{ width: '105%', height: '150%' }}
        options={{
          // zoomControl: false,
          // streetViewControl: false,
          mapTypeControl: false,
          // fullscreenControl: false
        }}
      // onLoad={(map) => setMap(map)}
      >
        {
          pointsOfInterest.length && allPointsOfInterest.length &&
          pointsOfInterest.map((poi) => {
            const newPointsOfInterest = allPointsOfInterest.find((el) => el.poi_name === poi)
            return newPointsOfInterest
          }).map(({ latitude, longitude, image_url, poi_name }, index) => <MarkerF key={index} position={{ lat: Number(latitude), lng: Number(longitude) }} icon={settingCustomMarker(image_url)} animation={null} />)
        }
        {/* <MarkerF position={{ lat: lat, lng: long }} /> */}
        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
      </GoogleMap>
      <p>
        {/* <IconButton
        aria-label='center back'
        icon={<FaLocationArrow />}
        isRound
        onClick={() => {
          map.panTo({ lat: lat, lng: long })
          map.setZoom(10)
        }}
      /> */}
        {/* <button onClick={calculateRoute}> <span>  </span>SHOW ROUTE</button> */}
      </p>
      {/* <p><strong>Distance:</strong> {distance} <br /> <strong>Duration:</strong> {duration}</p> */}
      <br />
      <div>
        <ul>
          {/* {
            steps.map((step, index) => {
              return <li key={index}>{parseDirections(step.instructions)}</li>
            })
          } */}
        </ul>
      </div>
    </div>
  )
}
