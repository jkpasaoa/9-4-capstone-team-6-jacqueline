/*global google*/
import { GoogleMap, MarkerF, DirectionsRenderer } from '@react-google-maps/api' //useJsApiLoader,
import { useState, useEffect } from 'react'; //useRef, useEffect, useMemo
// import loadingLogo from '../../assets/S-Loop_transnparent.gif'
import { Link } from 'react-router-dom';
// import { FaLocationArrow } from 'react-icons/fa'
// import { IconButton } from '@chakra-ui/react';
// import axios from 'axios';

// const center = { lat: 40.8448, lng: 40.8448 }

// const API = process.env.REACT_APP_API_URL;

// const libraries = ['places']
export default function Map({ pointsOfInterest, allPointsOfInterest, activeMarker }) {
  // const { isLoaded } = useJsApiLoader({
  //   id: "__googleMapsScriptId",
  //   libraries
  // })

  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [tourButton, setTourButton] = useState('START')
  // const [currentPoi, setCurrentPoi] = useState({})
  // const [nextPoi, setNextPoi] = useState({})
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

  // useEffect(() => {
  //   // setCenterLat(Number(firstPoi.latitude))
  //   // setCenterLong(Number(firstPoi.longitude))
  //   // console.log(firstPoi)
  // }, [isLoaded, firstPoi])

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
    // setSteps(results.routes[0].legs[0].steps)
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
    setSteps(results.routes[0].legs[0].steps)
    setDirectionsResponse(results)
  }

  let currentElement, nextElement
  let currentLoc = {}
  let nextLoc = {}

  const startTour = () => {
    // console.log(pointsOfInterest, "the points of interest")
    const length = pointsOfInterest.length
    for (let i = 0; i < pointsOfInterest.length; i++) {
      currentElement = pointsOfInterest[i];
      nextElement = pointsOfInterest[(i + 1) % length];
      pointsOfInterest[i] = nextElement
      nextElement = pointsOfInterest[(i + 1)]
      setTourButton('NEXT')
      // console.log("current", currentElement, "next:", nextElement)
      // eslint-disable-next-line no-loop-func
      const current = allPointsOfInterest.find((el) => el.poi_name === currentElement)
      // eslint-disable-next-line no-loop-func
      const next = allPointsOfInterest.find((el) => el.poi_name === nextElement)
      // console.log(current, next, "this da routeeee")
      currentLoc = { lat: Number(current.latitude), lng: Number(current.longitude) }
      nextLoc = { lat: Number(next.latitude), lng: Number(next.longitude) }

      calculateNewRoute(currentLoc, nextLoc)
      console.log(currentLoc, nextLoc, "the states inside")
      if (currentElement === pointsOfInterest[pointsOfInterest.length - 1]) {
        break
      }
    }
    console.log(currentLoc, nextLoc, "the states outside")
  }

  useEffect(() => {
    calculateRoute()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // console.log(steps)


  // if (!isLoaded) {
  //   return (
  //     <div>
  //       <img src={loadingLogo} alt='loading...' />
  //     </div>
  //   )
  // }

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

  // console.log(activeMarker)

  const parseDirections = (html) => {
    let cleanedHtml = html.replace(/<div.*?>(.*?)<\/div>/g, '$1\n');

    cleanedHtml = cleanedHtml.replace(/style=".*?"/g, '');

    cleanedHtml = cleanedHtml.replace(/<wbr\/?>/g, ' ');

    cleanedHtml = cleanedHtml.replace(/<b>(.*?)<\/b>/g, '$1');

    cleanedHtml = cleanedHtml.replace(/<\/?.*?>/g, '');

    cleanedHtml = cleanedHtml.replace(/&nbsp;/g, ' ');

    cleanedHtml = cleanedHtml.trim();

    return cleanedHtml;
  }

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
        <button className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800' onClick={startTour}><span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>{tourButton}</span></button>
        <button className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800'><Link className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0' to={'/endtour'}>END TOUR</Link></button>
        {/* <button onClick={calculateRoute}> <span>  </span>SHOW ROUTE</button> */}
      </p>
      {/* <p><strong>Distance:</strong> {distance} <br /> <strong>Duration:</strong> {duration}</p> */}
      <br />
      <div>
        <ul>
          {
            steps.map((step, index) => {
              return <li key={index}>{parseDirections(step.instructions)}</li>
            })
          }
        </ul>
      </div>
    </div>
  )
}
