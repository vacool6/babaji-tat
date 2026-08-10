import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Destination } from "../../types/destination";
import "./DestinationCard.css";

interface DestinationCardProps {
  destination: Destination;
}

// Map destination names to tour package IDs
const destinationToTourMap: Record<string, string> = {
  Nainital: "1",
  Auli: "3",
  "Jim Corbett": "4",
  Mukteshwar: "5",
  Rishikesh: "2",
  Badrinath: "1",
  Kedarnath: "2",
};

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Get the tour package ID for this destination
    const tourId = destinationToTourMap[destination.name];

    if (tourId) {
      // Navigate to specific tour detail page
      navigate(`/tour-packages/${tourId}`);
    } else {
      // Fallback to tour packages listing
      navigate("/tour-packages");
    }
  };

  return (
    <div className="destination-card" onClick={handleClick}>
      <div
        className="destination-image"
        style={{ backgroundImage: `url('${destination.image}')` }}
      >
        <div className="destination-overlay"></div>
        <div className="destination-info">
          <h3 className="destination-name">{destination.name}</h3>
          <p className="destination-location">
            <MapPin size={14} />
            {destination.location}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
