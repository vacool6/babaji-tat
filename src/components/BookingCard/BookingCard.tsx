import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Navigation, Calendar, ArrowRight } from "lucide-react";
import SearchableDropdown from "../SearchableDropdown/SearchableDropdown";
import DateTimePicker from "../DateTimePicker/DateTimePicker";
import "./BookingCard.css";

const BookingCard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"book" | "tours">("book");
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [dateTime, setDateTime] = useState("");

  const locations = [
    { value: "delhi", label: "Delhi" },
    { value: "nainital", label: "Nainital" },
    { value: "mussoorie", label: "Mussoorie" },
    { value: "rishikesh", label: "Rishikesh" },
    { value: "haridwar", label: "Haridwar" },
    { value: "dehradun", label: "Dehradun" },
    { value: "auli", label: "Auli" },
    { value: "jim-corbett", label: "Jim Corbett" },
    { value: "badrinath", label: "Badrinath" },
    { value: "kedarnath", label: "Kedarnath" },
  ];

  const handleSearch = () => {
    if (!pickup || !drop || !dateTime) {
      alert("Please fill all fields");
      return;
    }

    // Navigate to results page with search params
    navigate("/search-results", {
      state: { pickup, drop, dateTime, tripType },
    });
  };

  const handleTabChange = (tab: "book" | "tours") => {
    if (tab === "tours") {
      navigate("/tour-packages");
    } else {
      setActiveTab(tab);
    }
  };

  return (
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
          <div className="form-field">
            <SearchableDropdown
              placeholder="Pickup Location"
              options={locations}
              icon={<MapPin size={20} />}
              onSelect={(value, label) => setPickup(label)}
            />
          </div>

          <div className="form-field">
            <SearchableDropdown
              placeholder="Drop Destination"
              options={locations}
              icon={<Navigation size={20} />}
              onSelect={(value, label) => setDrop(label)}
            />
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
  );
};

export default BookingCard;
