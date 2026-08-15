import { Users, Briefcase, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Vehicle } from "../../types/vehicle";
import { useBooking } from "../../context/BookingContext";
import "./VehicleCard.css";

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect?: (vehicleId: string) => void;
}

const VehicleCard = ({ vehicle, onSelect }: VehicleCardProps) => {
  const navigate = useNavigate();
  const { setSelectedVehicle } = useBooking();

  const handleSelect = () => {
    if (onSelect) {
      onSelect(vehicle.id);
    }

    // Save vehicle to context
    setSelectedVehicle(vehicle);

    // Navigate to booking form
    navigate("/booking-form");
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
        <div>
          <div className="vehicle-header">
            <div>
              <h3 className="vehicle-name">
                {vehicle.name}{" "}
                <span className="vehicle-similar">or similar</span>
              </h3>
              <p className="vehicle-category">
                {vehicle.category} • {vehicle.features.join(" • ")}
              </p>
            </div>
            <div className="vehicle-price">
              ₹{vehicle.price.toLocaleString()}
            </div>
          </div>

          <div className="vehicle-specs">
            <div className="vehicle-spec">
              <Users size={20} />
              <span>{vehicle.seats} Seats</span>
            </div>
            <div className="vehicle-spec">
              <Briefcase size={20} />
              <span>{vehicle.bags} Bags</span>
            </div>
          </div>
        </div>

        <button className="select-vehicle-btn" onClick={handleSelect}>
          Proceed to Book
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;
