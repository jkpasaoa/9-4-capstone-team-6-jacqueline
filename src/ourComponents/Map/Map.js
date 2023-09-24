// /*global google*/
import { GoogleMap, MarkerF, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api'
import { useState, useEffect } from 'react'; //useRef, useEffect, useMemo
import loadingLogo from '../../assets/S-Loop_transnparent.gif'
import { FaLocationArrow } from 'react-icons/fa'
import { IconButton } from '@chakra-ui/react';
// import axios from 'axios';

// const center = { lat: 40.8448, lng: 40.8448 }

// const API = process.env.REACT_APP_API_URL;

export default function Map({ pointsOfInterest, allPointsOfInterest }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ['places']
  })

  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [map, setMap] = useState(/** @type google.maps.Map */(null))
  const [lat, setLat] = useState(0)
  const [long, setLong] = useState(0)
  const [steps, setSteps] = useState([])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude)
      setLong(position.coords.longitude)
    })
  }, [isLoaded, lat, long])

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

  const calculateRoute = async () => {
    // if (!startPoint || !endPoint) {
    //   return
    // }

    // const google = window.google;

    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const waypoints = pointsOfInterest.slice(1, -1).map((poi) => {
      const newPointsOfInterest = allPointsOfInterest.find((el) => el.poi_name === poi)
      // console.log(newPointsOfInterest)
      // console.log(poi)
      const locationObj = { location: { lat: Number(newPointsOfInterest.latitude), lng: Number(newPointsOfInterest.longitude) } }
      return locationObj
    })
    const firstPoi = allPointsOfInterest.find((el) => el.poi_name === pointsOfInterest[0])
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
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  console.log(steps)


  if (!isLoaded) {
    return (
      <div>
        <img src={loadingLogo} alt='loading...' />
      </div>
    )
  }

  // const beautifyText = (htmlString) => {
  //   const parser = new DOMParser()

  //   const doc = parser.parseFromString(htmlString, 'text/html')
  //   const convertToText = (node) => {
  //     if (node.nodeType === Node.TEXT_NODE) {
  //       return node.textContent;
  //     } else if (node.nodeType === Node.ELEMENT_NODE) {
  //       const tagName = node.tagName.toLowerCase();
  //       let content = '';

  //       if (tagName === 'b') {
  //         content = node.innerText
  //       } else if (tagName === 'div' && node.style.fontSize === '0.9em') {
  //         content += node.innerText
  //       } else if (tagName === 'wbr') {
  //         content += '-'
  //       }

  //       for (const childNode of node.childNodes) {
  //         content += convertToText(childNode)
  //       }
  //       return content;
  //     }
  //     return ''
  //   }
  //   const directionsText = convertToText(doc.body);

  //   return directionsText
  // }

  const parseDirections = (html) => {
    let cleanedHtml = html.replace(/<\/?b>/g, '');

    cleanedHtml = cleanedHtml.replace(/<div.*?>(.*?)<\/div>/g, '$1\n');

    cleanedHtml = cleanedHtml.replace(/<wbr\/?>/g, ' ');
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
        {
          pointsOfInterest.length && allPointsOfInterest.length &&
          pointsOfInterest.map((poi) => {
            const newPointsOfInterest = allPointsOfInterest.find((el) => el.poi_name === poi)
            return newPointsOfInterest
          }).map(({ latitude, longitude }) => <MarkerF position={{ lat: Number(latitude), lng: Number(longitude) }} />)
        }
        {/* <MarkerF position={{ lat: lat, lng: long }} /> */}
        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
      </GoogleMap>
      <p><IconButton
        aria-label='center back'
        icon={<FaLocationArrow />}
        isRound
        onClick={() => {
          map.panTo({ lat: lat, lng: long })
          map.setZoom(10)
        }}
      /> <button onClick={calculateRoute}> <span>  </span>SHOW ROUTE</button></p>
      <p><strong>Distance:</strong> {distance} <br /> <strong>Duration:</strong> {duration}</p>
      <br />
      <div>
        <ul>
          {
            steps.map((step, index) => {
              return <li key={index}>{step.instructions}</li>
            })
          }
        </ul>
      </div>
    </div>
  )
}
