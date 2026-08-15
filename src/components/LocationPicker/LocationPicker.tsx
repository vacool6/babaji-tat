import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Search, X, MapPin } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./LocationPicker.css";

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface LocationPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (location: LocationData) => void;
  title: string;
  initialLocation?: LocationData;
}

export interface LocationData {
  address: string;
  latitude: number;
  longitude: number;
  displayName?: string;
}

interface SearchResult {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
  address: {
    suburb?: string;
    neighbourhood?: string;
    locality?: string;
    village?: string;
    town?: string;
    city?: string;
    state_district?: string;
    state?: string;
    country?: string;
  };
}

const LocationPicker = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  initialLocation,
}: LocationPickerProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationData>(
    initialLocation || {
      address: "",
      latitude: 20.5937,
      longitude: 78.9629,
    },
  );
  const [nearbyAddress, setNearbyAddress] = useState("");
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (selectedLocation.latitude && selectedLocation.longitude) {
      reverseGeocode(selectedLocation.latitude, selectedLocation.longitude);
    }
  }, [selectedLocation.latitude, selectedLocation.longitude]);

  const searchLocation = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
          `q=${encodeURIComponent(query)},India&` +
          `format=json&` +
          `addressdetails=1&` +
          `limit=5&` +
          `countrycodes=in`,
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const shortenAddress = (address: any, displayName: string) => {
    let shortAddress = "";

    if (address.suburb || address.neighbourhood) {
      shortAddress = address.suburb || address.neighbourhood;
    } else if (address.locality || displayName.split(",")[0]) {
      shortAddress = address.locality || displayName.split(",")[0];
    }

    if (address.city || address.state_district) {
      shortAddress += shortAddress ? ", " : "";
      shortAddress += address.city || address.state_district;
    } else if (address.state) {
      shortAddress += shortAddress ? ", " : "";
      shortAddress += address.state;
    }

    return shortAddress || displayName;
  };

  const reverseGeocode = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?` +
          `lat=${lat}&` +
          `lon=${lon}&` +
          `format=json&` +
          `addressdetails=1`,
      );
      const data = await response.json();
      const shortAddr = shortenAddress(data.address, data.display_name);
      setNearbyAddress(shortAddr);
    } catch (error) {
      console.error("Reverse geocode error:", error);
      setNearbyAddress("Unable to fetch address");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      searchLocation(value);
    }, 500);
  };

  const handleResultClick = (result: SearchResult) => {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    const shortName = shortenAddress(result.address, result.display_name);

    setSelectedLocation({
      address: shortName,
      latitude: lat,
      longitude: lon,
      displayName: shortName,
    });
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleConfirm = () => {
    onConfirm({
      ...selectedLocation,
      address: nearbyAddress,
      displayName: nearbyAddress,
    });
    onClose();
  };

  const handleClose = () => {
    onClose();
    setSearchQuery("");
    setSearchResults([]);
  };

  if (!isOpen) return null;

  return (
    <div className="location-picker-overlay" onClick={handleClose}>
      <div
        className="location-picker-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="location-picker-header">
          <h3>{title}</h3>
          <button className="close-btn" onClick={handleClose}>
            <X size={24} />
          </button>
        </div>

        <div className="location-picker-body">
          <div className="search-section">
            <div className="search-input-container">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search for area, city, or landmark..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="location-search-input"
              />
            </div>

            {isSearching && <div className="search-loading">Searching...</div>}

            {searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map((result) => (
                  <div
                    key={result.place_id}
                    className="search-result-item"
                    onClick={() => handleResultClick(result)}
                  >
                    <MapPin size={18} />
                    <span>
                      {shortenAddress(result.address, result.display_name)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="map-container">
            <MapContainer
              center={[selectedLocation.latitude, selectedLocation.longitude]}
              zoom={13}
              style={{
                height: "100%",
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
              }}
              scrollWheelZoom={true}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap"
              />
              <LocationMarker
                position={[
                  selectedLocation.latitude,
                  selectedLocation.longitude,
                ]}
                setPosition={(lat, lon) =>
                  setSelectedLocation({
                    ...selectedLocation,
                    latitude: lat,
                    longitude: lon,
                  })
                }
              />
            </MapContainer>
          </div>

          <div className="location-info">
            <div className="nearby-label">
              <MapPin size={16} />
              <span>Near:</span>
            </div>
            <p className="nearby-address">
              {nearbyAddress || "Select a location"}
            </p>
          </div>

          <button className="confirm-btn" onClick={handleConfirm}>
            Confirm {title}
          </button>
        </div>
      </div>
    </div>
  );
};

// Component to handle map clicks and marker dragging
const LocationMarker = ({
  position,
  setPosition,
}: {
  position: [number, number];
  setPosition: (lat: number, lon: number) => void;
}) => {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng.lat, e.latlng.lng);
    },
  });

  useEffect(() => {
    map.flyTo(position, map.getZoom());
  }, [position, map]);

  return (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{
        dragend(e) {
          const marker = e.target;
          const pos = marker.getLatLng();
          setPosition(pos.lat, pos.lng);
        },
      }}
    />
  );
};

export default LocationPicker;
