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
      features: ["AC"],
      seats: 4,
      bags: 2,
      image:
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&q=80",
      price: 3500,
    },
    {
      id: "2",
      name: "Maruti Ertiga",
      category: "SUV",
      type: "AC",
      features: ["AC"],
      seats: 6,
      bags: 4,
      image:
        "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&q=80",
      price: 4800,
      recommended: true,
    },
    {
      id: "3",
      name: "Innova Crysta",
      category: "Premium SUV",
      type: "AC",
      features: ["AC"],
      seats: 7,
      bags: 5,
      image:
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&q=80",
      price: 6500,
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
