import { useLocation, useNavigate } from "react-router-dom";
import { MapPin, Calendar } from "lucide-react";
import VehicleCard from "../components/VehicleCard/VehicleCard";
import type { Vehicle } from "../types/vehicle";
import "./CabResultsPage.css";

const CabResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { pickup, drop, dateTime, tripType } = location.state || {
    pickup: "Delhi",
    drop: "Nainital",
    dateTime: "15 Oct 2024",
    tripType: "One Way",
  };

  const vehicles: Vehicle[] = [
    {
      id: "1",
      name: "Swift Dzire",
      category: "Sedan",
      type: "AC",
      features: ["AC", "4 Seater"],
      seats: 4,
      bags: 2,
      image: "/images/vehicles/Swift%20Dzire.avif",
      price: 3500,
    },
    {
      id: "2",
      name: "Maruti Ertiga",
      category: "SUV",
      type: "AC",
      features: ["AC", "6 Seater"],
      seats: 6,
      bags: 4,
      image: "/images/vehicles/Innova%20crysta.avif",
      price: 4800,
      recommended: true,
    },
    {
      id: "3",
      name: "Innova Crysta",
      category: "Premium SUV",
      type: "AC",
      features: ["AC", "7 Seater"],
      seats: 7,
      bags: 5,
      image: "/images/vehicles/Innova%20crysta.avif",
      price: 6500,
    },
    {
      id: "4",
      name: "Toyota Fortuner",
      category: "Luxury SUV",
      type: "AC",
      features: ["AC", "Premium"],
      seats: 7,
      bags: 5,
      image: "/images/vehicles/Fortuner.png",
      price: 8500,
    },
    {
      id: "5",
      name: "Tempo Traveller",
      category: "Mini Bus",
      type: "AC",
      features: ["AC", "12-17 Seater"],
      seats: 17,
      bags: 10,
      image: "/images/vehicles/Tempo%20traveller.png",
      price: 9500,
    },
  ];

  const handleVehicleSelect = (vehicleId: string) => {
    console.log("Vehicle selected:", vehicleId);
    // Navigation is now handled in VehicleCard component
  };

  const handleModifySearch = () => {
    navigate("/");
  };

  return (
    <div className="cab-results-page">
      <div className="search-summary">
        <div className="search-summary-card">
          <div className="summary-icon">
            <MapPin size={24} />
          </div>
          <div className="summary-content">
            <h2 className="summary-title">
              {pickup} to {drop}
            </h2>
            <p className="summary-details">
              <Calendar size={16} />
              <span>
                {dateTime} • {tripType}
              </span>
            </p>
          </div>
          <button className="modify-search-btn" onClick={handleModifySearch}>
            Modify Search
          </button>
        </div>
      </div>

      <div className="results-container">
        <div className="vehicles-section">
          <h2 className="section-title">Select your Vehicle</h2>
          <div className="vehicles-list">
            {vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onSelect={handleVehicleSelect}
              />
            ))}
          </div>
        </div>

        <div className="fare-details">
          <h3 className="fare-title">Fare Details</h3>

          <div className="fare-section">
            <h4 className="fare-section-title">What's Included</h4>
            <ul className="fare-list included">
              <li>
                <span className="check-icon">✓</span> Fuel Charges
              </li>
              <li>
                <span className="check-icon">✓</span> Experienced Driver
                Allowance
              </li>
              <li>
                <span className="check-icon">✓</span> State Taxes & Permits
              </li>
            </ul>
          </div>

          <div className="fare-section">
            <h4 className="fare-section-title extra">
              Extra Charges (Pay as you go)
            </h4>
            <ul className="fare-list extra">
              <li>
                <span className="info-icon">i</span> Toll Taxes
              </li>
              <li>
                <span className="info-icon">i</span> Parking Fees
              </li>
              <li>
                <span className="info-icon">i</span> Night Halts (if applicable)
              </li>
            </ul>
          </div>

          <div className="fare-note">
            <span className="info-icon">i</span>
            <p>
              The final price may vary slightly based on actual kilometers
              driven and specific route taken during the journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabResultsPage;
