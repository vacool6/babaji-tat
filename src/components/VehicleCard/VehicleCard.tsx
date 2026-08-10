import { Users, Briefcase } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import type { Vehicle } from "../../types/vehicle";
import "./VehicleCard.css";

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect?: (vehicleId: string) => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onSelect }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = location.state;

  const handleSelect = () => {
    if (onSelect) {
      onSelect(vehicle.id);
    }

    // Navigate to booking confirmation with vehicle and search details
    navigate("/booking-confirmation", {
      state: {
        vehicleName: vehicle.name,
        vehicleType: `${vehicle.category} • ${vehicle.seats} Seats • ${vehicle.bags} Bags`,
        vehicleImage: vehicle.image,
        pickup: searchParams?.pickup || "Pickup Location",
        drop: searchParams?.drop || "Drop Location",
        date: searchParams?.dateTime
          ? new Date(searchParams.dateTime).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "Oct 24, 2023",
        time: searchParams?.dateTime
          ? new Date(searchParams.dateTime).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })
          : "10:00 AM",
        distance: "~45 km",
        tripType:
          searchParams?.tripType === "one-way"
            ? "One Way"
            : searchParams?.tripType === "round-trip"
              ? "Round Trip"
              : "Local",
        baseFare: vehicle.price,
        taxesFees: Math.round(vehicle.price * 0.06), // 6% taxes
      },
    });
  };

  return (
    <div className="vehicle-card">
      <div className="vehicle-image">
        <img src={vehicle.image} alt={vehicle.name} />
        {vehicle.recommended && (
          <span className="recommended-badge">Recommended</span>
        )}
      </div>

      <div className="vehicle-info">
        <div className="vehicle-header">
          <div>
            <h3 className="vehicle-name">
              {vehicle.name} <span className="vehicle-similar">or similar</span>
            </h3>
            <p className="vehicle-category">
              {vehicle.category} • {vehicle.features.join(" • ")}
            </p>
          </div>
          <div className="vehicle-price">₹{vehicle.price.toLocaleString()}</div>
        </div>

        <div className="vehicle-specs">
          <div className="vehicle-spec">
            <Users size={18} />
            <span>{vehicle.seats} Seats</span>
          </div>
          <div className="vehicle-spec">
            <Briefcase size={18} />
            <span>{vehicle.bags} Bags</span>
          </div>
        </div>

        <button className="select-vehicle-btn" onClick={handleSelect}>
          Select Vehicle
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;
