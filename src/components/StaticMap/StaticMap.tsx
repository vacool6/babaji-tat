import { GoogleMap, Marker } from "@react-google-maps/api";
import { useGoogleMapsLoader } from "../../hooks/useGoogleMapsLoader";
import "./StaticMap.css";

interface StaticMapProps {
  lat: number;
  lng: number;
  address: string;
}

const containerStyle = {
  width: "100%",
  height: "100%",
};

const StaticMap = ({ lat, lng, address }: StaticMapProps) => {
  const { isLoaded } = useGoogleMapsLoader();

  const center = {
    lat,
    lng,
  };

  if (!isLoaded) {
    return (
      <div className="static-map-loading">
        <div className="loading-spinner"></div>
        <p>Loading map...</p>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: true,
        zoomControl: true,
        gestureHandling: "cooperative",
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      }}
    >
      <Marker
        position={center}
        title={address}
        animation={google.maps.Animation.DROP}
      />
    </GoogleMap>
  );
};

export default StaticMap;
