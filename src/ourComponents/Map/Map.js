import { useJsApiLoader } from '@react-google-maps/api'

export default function Map() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  })

  return (
    <div>
      <h1>GOOGLE MAPS API HERE</h1>
    </div>
  )
}
