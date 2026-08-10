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
      name: "Nainital",
      location: "Lake District",
      category: "Lake Destination",
      image:
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80",
      description:
        "Nestled in the Kumaon foothills, Nainital is a picturesque hill station centered around the emerald Naini Lake. Known as the 'Lake District of India', it offers stunning views of snow-capped peaks, colonial-era architecture, and serene boat rides. Perfect for nature lovers and families seeking a peaceful mountain retreat.",
      tourId: "1",
    },
    {
      id: "2",
      name: "Auli",
      location: "Ski Destination",
      category: "Mountain Sports",
      image:
        "https://images.unsplash.com/photo-1551582045-6ec9c11d8697?w=800&q=80",
      description:
        "Auli is a premier skiing destination offering panoramic views of the Himalayan peaks including Nanda Devi. With Asia's longest cable car, pristine ski slopes, and breathtaking alpine meadows, it's an adventure paradise. Experience winter sports, trekking, and witness some of the most spectacular sunrises in the mountains.",
      tourId: "3",
    },
    {
      id: "3",
      name: "Jim Corbett",
      location: "Wildlife Safari",
      category: "National Park",
      image:
        "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=800&q=80",
      description:
        "India's oldest national park, Jim Corbett is a haven for wildlife enthusiasts. Home to the majestic Bengal tiger, diverse flora and fauna, and stunning landscapes, it offers thrilling jungle safaris. Explore dense forests, grasslands, and riverine habitats while experiencing the raw beauty of nature.",
      tourId: "4",
    },
  ];

  const handleViewDetails = (tourId: string) => {
    navigate(`/tour-packages/${tourId}`);
  };

  return (
    <section className="destinations-section">
      <div className="section-header">
        <h2 className="section-title">Popular Uttarakhand Destinations</h2>
        <p className="section-description">
          Explore handpicked locations that offer the perfect blend of serenity,
          adventure, and spiritual awakening.
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
