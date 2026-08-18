import { useLocation, useNavigate } from "react-router-dom";
import { MapPin, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import VehicleCard from "../components/VehicleCard/VehicleCard";
import type { Vehicle } from "../types/vehicle";
import { useBooking } from "../context/BookingContext";
import {
  getAllPricing,
  calculatePrice,
  type VehiclePricing,
} from "../services/pricingService";
import { calculateDistance } from "../utils/distance";
import "./CabResultsPage.css";

const CabResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    pickup,
    drop,
    dateTime,
    tripType,
    setTripDetails,
    pickupLocation,
    dropLocation,
    tripDistance,
    setTripDistance,
  } = useBooking();

  const [pricingData, setPricingData] = useState<VehiclePricing[]>([]);
  const [distance, setDistance] = useState<number>(tripDistance?.distance || 0);
  const [distanceText, setDistanceText] = useState<string>(
    tripDistance?.distanceText || "--",
  );
  const [durationText, setDurationText] = useState<string>(
    tripDistance?.durationText || "--",
  );
  const [loading, setLoading] = useState(!tripDistance);

  useEffect(() => {
    // If trip details come from navigation state, save to context
    if (location.state) {
      setTripDetails({
        pickup: location.state.pickup || "Delhi",
        drop: location.state.drop || "Nainital",
        pickupLocation: location.state.pickupLocation || null,
        dropLocation: location.state.dropLocation || null,
        dateTime: location.state.dateTime || new Date().toISOString(),
        tripType: location.state.tripType || "one-way",
        returnDateTime: location.state.returnDateTime,
      });
    }
  }, [location.state, setTripDetails]);

  // Fetch pricing data from Supabase
  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const pricing = await getAllPricing();
        setPricingData(pricing);
      } catch (error) {
        console.error("Error fetching pricing:", error);
      }
    };

    fetchPricing();
  }, []);

  // Calculate distance using Google Maps Distance Matrix API
  useEffect(() => {
    const fetchDistance = async () => {
      // If we already have distance, use it and skip calculation
      if (tripDistance?.distance && tripDistance.distance > 0) {
        setDistance(tripDistance.distance);
        setDistanceText(tripDistance.distanceText);
        setDurationText(tripDistance.durationText);
        setLoading(false);
        return;
      }

      // Calculate distance if we have both locations
      if (pickupLocation && dropLocation) {
        setLoading(true);
        try {
          const result = await calculateDistance(pickupLocation, dropLocation);
          setDistance(result.distance);
          setDistanceText(result.distanceText);
          setDurationText(result.durationText);

          // Persist distance to context
          setTripDistance({
            distance: result.distance,
            distanceText: result.distanceText,
            durationText: result.durationText,
          });
        } catch (error) {
          console.error("Error calculating distance:", error);
          setDistance(0);
          setDistanceText("--");
          setDurationText("--");
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    fetchDistance();
  }, [pickupLocation, dropLocation]);

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
      category: "SUV",
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
      category: "SUV",
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
      category: "Tempo Traveller",
      type: "AC",
      features: ["AC", "12-17 Seater"],
      seats: 17,
      bags: 10,
      image: "/images/vehicles/Tempo%20traveller.png",
      price: 9500,
    },
  ];

  // Calculate price for each vehicle
  const vehiclesWithPricing: (Vehicle & {
    calculatedPrice: number;
    perKmRate: number;
  })[] = vehicles.map((vehicle) => {
    const pricing = pricingData.find(
      (p) => p.vehicle_category === vehicle.category,
    );

    if (!pricing || distance === 0) {
      return {
        ...vehicle,
        calculatedPrice: vehicle.price,
        perKmRate: 0,
      };
    }

    const priceCalculation = calculatePrice(pricing, distance);

    return {
      ...vehicle,
      calculatedPrice: priceCalculation.totalPrice,
      perKmRate: pricing.per_km_rate,
      price: priceCalculation.totalPrice, // Update the price field
    };
  });

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
            {distance > 0 && (
              <p className="distance-info">
                <strong>Distance:</strong> {distanceText} •{" "}
                <strong>Duration:</strong> {durationText}
              </p>
            )}
          </div>
          <button className="modify-search-btn" onClick={handleModifySearch}>
            Modify Search
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <p>Calculating distance and prices...</p>
        </div>
      ) : (
        <div className="results-container">
          <div className="vehicles-section">
            <h2 className="section-title">Select your Vehicle</h2>
            <div className="vehicles-list">
              {vehiclesWithPricing.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onSelect={handleVehicleSelect}
                  perKmRate={vehicle.perKmRate}
                  distance={distance}
                />
              ))}
            </div>
          </div>

          <div className="fare-details">
            <h3 className="fare-title">Fare Details</h3>

            <div className="fare-section">
              <h4 className="fare-section-title">Distance Information</h4>
              <div className="fare-info-row">
                <span>Total Distance:</span>
                <strong>{distance > 0 ? distanceText : "--"}</strong>
              </div>
              <div className="fare-info-row">
                <span>Estimated Duration:</span>
                <strong>{distance > 0 ? durationText : "--"}</strong>
              </div>
            </div>

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
                  <span className="info-icon">i</span> Night Halts (if
                  applicable)
                </li>
              </ul>
            </div>

            <div className="fare-note">
              <span className="info-icon">i</span>
              <p>
                {distance > 0
                  ? `Prices calculated based on ₹${vehiclesWithPricing[0]?.perKmRate || 0}/km rate. Final price may vary based on actual route and conditions.`
                  : "Prices will be calculated once distance is determined."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CabResultsPage;
