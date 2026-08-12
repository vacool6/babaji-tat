import { Users, MapPin, Phone } from "lucide-react";
import "./FleetSection.css";

interface Vehicle {
  id: string;
  name: string;
  type: string;
  capacity: string;
  image: string;
  features: string[];
  idealFor: string;
  priceRange: string;
}

const FleetSection = () => {
  const vehicles: Vehicle[] = [
    {
      id: "1",
      name: "Sedan",
      type: "Swift Dzire / Etios",
      capacity: "4 Passengers",
      image: "/images/vehicles/Swift%20Dzire.avif",
      features: ["AC", "Comfortable", "Luggage Space"],
      idealFor: "City Tours & Short Trips",
      priceRange: "₹10-12/km",
    },
    {
      id: "2",
      name: "SUV",
      type: "Innova Crysta / Ertiga",
      capacity: "6-7 Passengers",
      image: "/images/vehicles/Innova%20crysta.avif",
      features: ["Spacious", "AC", "Luxury Comfort"],
      idealFor: "Family Trips & Group Travel",
      priceRange: "₹14-16/km",
    },
    {
      id: "3",
      name: "Luxury SUV",
      type: "Fortuner / Endeavour",
      capacity: "6-7 Passengers",
      image: "/images/vehicles/Fortuner.png",
      features: ["Premium", "All Terrain", "Leather Seats"],
      idealFor: "Hill Stations & Long Journeys",
      priceRange: "₹18-22/km",
    },
    {
      id: "4",
      name: "Tempo Traveller",
      type: "12-17 Seater",
      capacity: "12-17 Passengers",
      image: "/images/vehicles/Tempo%20traveller.png",
      features: ["Group Travel", "Push Back Seats", "AC"],
      idealFor: "Large Groups & Corporate",
      priceRange: "₹22-28/km",
    },
  ];

  const handleEnquire = () => {
    window.location.href = "tel:+919876543210";
  };

  const handleBookNow = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="fleet-section">
      <div className="fleet-container">
        <div className="fleet-header">
          <span className="eyebrow">Our Fleet</span>
          <h2 className="section-title">Travel in Comfort & Style</h2>
          <p className="section-description">
            Choose from our diverse range of well-maintained vehicles. Affordable rates,
            experienced drivers, and premium comfort for every journey across India.
          </p>
        </div>

        <div className="vehicles-grid">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="vehicle-card">
              <div className="vehicle-image-wrapper">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="vehicle-image"
                  onError={(e) => {
                    console.error('Failed to load image:', vehicle.image);
                    e.currentTarget.style.backgroundColor = '#f0f0f0';
                  }}
                />
                <div className="vehicle-type-badge">{vehicle.type}</div>
              </div>

              <div className="vehicle-info">
                <h3 className="vehicle-name">{vehicle.name}</h3>
                
                <div className="vehicle-capacity">
                  <Users size={18} />
                  <span>{vehicle.capacity}</span>
                </div>

                <div className="vehicle-features">
                  {vehicle.features.map((feature, idx) => (
                    <span key={idx} className="feature-tag">
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="vehicle-ideal">
                  <MapPin size={16} />
                  <span>{vehicle.idealFor}</span>
                </div>

                <div className="vehicle-footer">
                  <div className="price-info">
                    <span className="price-label">Starting from</span>
                    <span className="price-value">{vehicle.priceRange}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="fleet-cta">
          <div className="cta-content">
            <h3 className="cta-title">Ready to Book Your Ride?</h3>
            <p className="cta-text">
              Call us now for instant booking and best rates. Available 24/7 for your convenience.
            </p>
          </div>
          <div className="cta-buttons">
            <button className="cta-button cta-button-primary" onClick={handleBookNow}>
              <span>Book Now</span>
            </button>
            <button className="cta-button cta-button-secondary" onClick={handleEnquire}>
              <Phone size={20} />
              <span>Call Now: +91 98765 43210</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FleetSection;
