import { useJsApiLoader } from '@react-google-maps/api'
import loadingLogo from '../../assets/S-Loop_transnparent.gif'

export default function Map() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  })

  if (!isLoaded) {
    return (
      <div>
        <img src={loadingLogo} alt='loading...' />
      </div>
    )
  }

  return (
    <div>
      <h1>GOOGLE MAPS API HERE</h1>
    </div>
  )
}
