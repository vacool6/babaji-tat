import { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useDebounce } from "../../hooks/useDebounce";
import { useGoogleMapsLoader } from "../../hooks/useGoogleMapsLoader";
import "./LocationPicker.css";

interface LocationPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (location: {
    address: string;
    lat: number;
    lng: number;
  }) => void;
  title: string;
  initialLocation?: { lat: number; lng: number };
}

interface Prediction {
  description: string;
  place_id: string;
}

const containerStyle = {
  width: "100%",
  height: "400px",
};

// Default center: India (New Delhi)
const defaultCenter = {
  lat: 28.6139,
  lng: 77.209,
};

const LocationPicker = ({
  isOpen,
  onClose,
  onSelectLocation,
  title,
  initialLocation,
}: LocationPickerProps) => {
  const { isLoaded } = useGoogleMapsLoader();

  const [markerPosition, setMarkerPosition] = useState(
    initialLocation || defaultCenter,
  );
  const [address, setAddress] = useState("");
  const [mapCenter, setMapCenter] = useState(initialLocation || defaultCenter);
  const [searchValue, setSearchValue] = useState("");
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [showPredictions, setShowPredictions] = useState(false);

  const debouncedSearchValue = useDebounce(searchValue, 500);
  const autocompleteServiceRef =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(
    null,
  );
  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    // Initialize Places Service
    placesServiceRef.current = new google.maps.places.PlacesService(map);
  }, []);

  // Initialize Autocomplete Service
  useEffect(() => {
    if (isLoaded && !autocompleteServiceRef.current) {
      autocompleteServiceRef.current =
        new google.maps.places.AutocompleteService();
    }
  }, [isLoaded]);

  // Fetch predictions when debounced search value changes
  useEffect(() => {
    if (
      !debouncedSearchValue ||
      !autocompleteServiceRef.current ||
      !showPredictions
    ) {
      setPredictions([]);
      return;
    }

    console.log("🔍 Fetching predictions for:", debouncedSearchValue);

    autocompleteServiceRef.current.getPlacePredictions(
      {
        input: debouncedSearchValue,
        componentRestrictions: { country: "in" },
        types: ["geocode", "establishment"],
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          console.log("✅ Predictions received:", results.length);
          setPredictions(
            results.map((r) => ({
              description: r.description,
              place_id: r.place_id,
            })),
          );
        } else {
          console.log("❌ Prediction status:", status);
          setPredictions([]);
        }
      },
    );
  }, [debouncedSearchValue, showPredictions]);

  const handleSearch = () => {
    console.log("🔘 Search button clicked, value:", searchValue);
    setShowPredictions(true);
  };

  const handlePredictionSelect = (placeId: string) => {
    console.log("📍 Place selected:", placeId);
    if (!placesServiceRef.current) return;

    placesServiceRef.current.getDetails(
      {
        placeId,
        fields: ["geometry", "formatted_address"],
      },
      (place, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          place?.geometry?.location
        ) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          const newPosition = { lat, lng };

          setMarkerPosition(newPosition);
          setMapCenter(newPosition);
          setAddress(place.formatted_address || "");
          setShowPredictions(false);
          setPredictions([]);
          console.log("✅ Location updated:", place.formatted_address);
        }
      },
    );
  };

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      const newPosition = { lat, lng };

      setMarkerPosition(newPosition);

      // Reverse geocode to get address
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: newPosition }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          setAddress(results[0].formatted_address);
        }
      });
    }
  }, []);

  const onMarkerDragEnd = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      const newPosition = { lat, lng };

      setMarkerPosition(newPosition);

      // Reverse geocode to get address
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: newPosition }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          setAddress(results[0].formatted_address);
        }
      });
    }
  }, []);

  const handleConfirm = () => {
    if (address && markerPosition) {
      onSelectLocation({
        address,
        lat: markerPosition.lat,
        lng: markerPosition.lng,
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="location-picker-overlay" onClick={onClose}>
      <div
        className="location-picker-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="location-picker-header">
          <h3>{title}</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="location-picker-content">
          {isLoaded ? (
            <>
              <div className="search-container">
                <div className="search-input-wrapper">
                  <input
                    type="text"
                    placeholder="Type location and click Search..."
                    className="location-search-input"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                  />
                  <button
                    className="search-btn"
                    onClick={handleSearch}
                    type="button"
                  >
                    Search
                  </button>
                </div>

                {showPredictions && predictions.length > 0 && (
                  <div className="predictions-dropdown">
                    {predictions.map((prediction) => (
                      <div
                        key={prediction.place_id}
                        className="prediction-item"
                        onClick={() =>
                          handlePredictionSelect(prediction.place_id)
                        }
                      >
                        <span className="prediction-icon">📍</span>
                        <div className="prediction-text">
                          <div className="prediction-main">
                            {prediction.description.split(",")[0]}
                          </div>
                          <div className="prediction-secondary">
                            {prediction.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="map-container">
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={mapCenter}
                  zoom={13}
                  onLoad={onLoad}
                  onClick={onMapClick}
                  options={{
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                  }}
                >
                  <Marker
                    position={markerPosition}
                    draggable={true}
                    onDragEnd={onMarkerDragEnd}
                  />
                </GoogleMap>
              </div>

              {address && (
                <div className="selected-address">
                  <strong>Selected Location:</strong>
                  <p>{address}</p>
                </div>
              )}

              <button
                className="confirm-location-btn"
                onClick={handleConfirm}
                disabled={!address}
              >
                Confirm Location
              </button>
            </>
          ) : (
            <div className="loading-map">Loading map...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;
