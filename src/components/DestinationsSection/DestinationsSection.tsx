import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Destination } from "../../types/destination";
import "./DestinationsSection.css";

interface DestinationWithDescription extends Destination {
  description: string;
  tourId: string;
}

const DestinationsSection = () => {
  const navigate = useNavigate();

  const destinations: DestinationWithDescription[] = [
    {
      id: "1",
      name: "Goa",
      location: "Beach Paradise",
      category: "Beach & Nightlife",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
      description:
        "India's premier beach destination, Goa offers pristine shores, vibrant nightlife, and Portuguese heritage. Experience water sports, beach shacks, historic churches, and a laid-back coastal vibe.",
      tourId: "3",
    },
    {
      id: "2",
      name: "Leh-Ladakh",
      location: "Himalayan Adventure",
      category: "Mountain & Lakes",
      image:
        "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=800&q=80",
      description:
        "The land of high passes featuring stunning monasteries, crystal-clear lakes, and dramatic mountain landscapes. Experience the thrill of riding through the world's highest motorable roads.",
      tourId: "10",
    },
    {
      id: "3",
      name: "Rajasthan",
      location: "Royal Heritage",
      category: "Culture & History",
      image:
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80",
      description:
        "Explore magnificent forts, opulent palaces, and golden deserts. Discover the rich cultural tapestry through colorful markets, traditional cuisine, and royal heritage sites.",
      tourId: "5",
    },
    {
      id: "4",
      name: "Kerala",
      location: "God's Own Country",
      category: "Backwaters & Hills",
      image:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
      description:
        "Serene backwaters, lush tea gardens, and pristine beaches. Experience traditional houseboats, ayurvedic treatments, and the tranquil beauty of South India's green paradise.",
      tourId: "4",
    },
  ];

  const handleViewDetails = (tourId: string) => {
    navigate(`/tour-packages/${tourId}`);
  };

  return (
    <section className="destinations-section">
      <div className="section-header">
        <span className="eyebrow">Explore India</span>
        <h2 className="section-title">Popular Destinations</h2>
        <p className="section-description">
          Discover handpicked destinations across India that offer the perfect blend of culture,
          adventure, heritage, and natural beauty.
        </p>
      </div>

      <div className="destinations-list">
        {destinations.map((destination, index) => (
          <div
            key={destination.id}
            className={`destination-item ${index % 2 === 0 ? "image-left" : "image-right"}`}
          >
            <div className="destination-image-container">
              <img
                src={destination.image}
                alt={destination.name}
                className="destination-image-large"
              />
              <div className="destination-category-badge">
                {destination.category}
              </div>
            </div>

            <div className="destination-content">
              <h3 className="destination-name-large">{destination.name}</h3>
              <p className="destination-location-large">
                {destination.location}
              </p>
              <p className="destination-description">
                {destination.description}
              </p>
              <button
                className="view-details-button"
                onClick={() => handleViewDetails(destination.tourId)}
              >
                <span>View Details</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DestinationsSection;
