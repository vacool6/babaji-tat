import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Navigation, Calendar, ArrowRight } from "lucide-react";
import DateTimePicker from "../DateTimePicker/DateTimePicker";
import LocationPicker from "../LocationPicker/LocationPicker";
import { useBooking } from "../../context/BookingContext";
import "./BookingCard.css";

const BookingCard = () => {
  const navigate = useNavigate();
  const { setTripDetails } = useBooking();
  const [activeTab, setActiveTab] = useState<"book" | "tours">("book");
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [pickupLocation, setPickupLocation] = useState<{
    address: string;
    lat: number;
    lng: number;
  } | null>(null);
  const [dropLocation, setDropLocation] = useState<{
    address: string;
    lat: number;
    lng: number;
  } | null>(null);
  const [dateTime, setDateTime] = useState("");
  const [isPickupPickerOpen, setIsPickupPickerOpen] = useState(false);
  const [isDropPickerOpen, setIsDropPickerOpen] = useState(false);

  const handleSearch = () => {
    if (!pickup || !drop || !dateTime) {
      alert("Please fill all fields");
      return;
    }

    if (!pickupLocation || !dropLocation) {
      alert("Please select valid pickup and drop locations with coordinates");
      return;
    }

    // Save to context
    setTripDetails({
      pickup,
      drop,
      pickupLocation,
      dropLocation,
      dateTime,
      tripType,
    });

    // Navigate to results page with location data
    navigate("/search-results", {
      state: {
        pickup,
        drop,
        pickupLocation,
        dropLocation,
        dateTime,
        tripType,
      },
    });
  };

  const handleTabChange = (tab: "book" | "tours") => {
    if (tab === "tours") {
      navigate("/tour-packages");
    } else {
      setActiveTab(tab);
    }
  };

  const handlePickupSelect = (location: {
    address: string;
    lat: number;
    lng: number;
  }) => {
    setPickupLocation(location);
    setPickup(location.address);
  };

  const handleDropSelect = (location: {
    address: string;
    lat: number;
    lng: number;
  }) => {
    setDropLocation(location);
    setDrop(location.address);
  };

  return (
    <>
      <div className="booking-card">
        <div className="booking-tabs">
          <button
            className={`tab-button ${activeTab === "book" ? "active" : ""}`}
            onClick={() => handleTabChange("book")}
          >
            <MapPin size={16} />
            <span>Book a Cab</span>
          </button>
          <button
            className={`tab-button ${activeTab === "tours" ? "active" : ""}`}
            onClick={() => handleTabChange("tours")}
          >
            <Navigation size={16} />
            <span>Explore Tours</span>
          </button>
        </div>

        <div className="booking-content">
          <div className="trip-type-selector">
            <label className="radio-option">
              <input
                type="radio"
                name="trip-type"
                value="one-way"
                checked={tripType === "one-way"}
                onChange={(e) => setTripType(e.target.value as any)}
              />
              <span className="radio-custom"></span>
              <span className="radio-label">One Way</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="trip-type"
                value="round-trip"
                checked={tripType === "round-trip"}
                onChange={(e) => setTripType(e.target.value as any)}
              />
              <span className="radio-custom"></span>
              <span className="radio-label">Round Trip</span>
            </label>
          </div>

          <div className="booking-form">
            <div
              className="form-field"
              onClick={() => setIsPickupPickerOpen(true)}
            >
              <div className="location-input">
                <MapPin size={20} className="field-icon" />
                <input
                  type="text"
                  placeholder="Pickup Location"
                  value={pickup}
                  readOnly
                  className="location-input-field"
                />
              </div>
            </div>

            <div
              className="form-field"
              onClick={() => setIsDropPickerOpen(true)}
            >
              <div className="location-input">
                <Navigation size={20} className="field-icon" />
                <input
                  type="text"
                  placeholder="Drop Destination"
                  value={drop}
                  readOnly
                  className="location-input-field"
                />
              </div>
            </div>

            <div className="form-field">
              <DateTimePicker
                placeholder="Date & Time"
                icon={<Calendar size={20} />}
                onChange={setDateTime}
              />
            </div>

            <button className="search-button" onClick={handleSearch}>
              <span>Search Cabs</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <LocationPicker
        isOpen={isPickupPickerOpen}
        onClose={() => setIsPickupPickerOpen(false)}
        onSelectLocation={handlePickupSelect}
        title="Select Pickup Location"
        initialLocation={pickupLocation || undefined}
      />

      <LocationPicker
        isOpen={isDropPickerOpen}
        onClose={() => setIsDropPickerOpen(false)}
        onSelectLocation={handleDropSelect}
        title="Select Drop Location"
        initialLocation={dropLocation || undefined}
      />
    </>
  );
};

export default BookingCard;
