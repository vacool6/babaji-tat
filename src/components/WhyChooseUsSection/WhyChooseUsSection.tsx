import { Shield, Clock, Headphones, Award, MapPin, Banknote } from "lucide-react";
import "./WhyChooseUsSection.css";

interface Feature {
  id: string;
  icon: React.ReactNode;
  emoji: string;
  title: string;
  description: string;
}

const WhyChooseUsSection = () => {
  const features: Feature[] = [
    {
      id: "1",
      icon: <Shield size={28} strokeWidth={2.5} />,
      emoji: "🛡️",
      title: "Safe & Secure",
      description: "Verified drivers, well-maintained vehicles, and 24/7 GPS tracking for your complete safety and peace of mind.",
    },
    {
      id: "2",
      icon: <Clock size={28} strokeWidth={2.5} />,
      emoji: "⏰",
      title: "Always On Time",
      description: "Punctual pickups and drop-offs. We value your time and ensure you reach your destination as scheduled.",
    },
    {
      id: "3",
      icon: <Headphones size={28} strokeWidth={2.5} />,
      emoji: "🎧",
      title: "24/7 Support",
      description: "Round-the-clock customer service to assist you at every step of your journey. We're always here to help.",
    },
    {
      id: "4",
      icon: <Award size={28} strokeWidth={2.5} />,
      emoji: "🏆",
      title: "Experienced Drivers",
      description: "Professional, courteous drivers with extensive knowledge of routes and local destinations across India.",
    },
    {
      id: "5",
      icon: <MapPin size={28} strokeWidth={2.5} />,
      emoji: "📍",
      title: "Pan-India Service",
      description: "From bustling cities to remote hill stations, we cover destinations across the length and breadth of India.",
    },
    {
      id: "6",
      icon: <Banknote size={28} strokeWidth={2.5} />,
      emoji: "💰",
      title: "Best Prices",
      description: "Transparent pricing with no hidden charges. Affordable rates without compromising on quality and comfort.",
    },
  ];

  return (
    <section className="why-choose-us-section">
      <div className="why-choose-us-container">
        <div className="why-choose-us-header">
          <span className="eyebrow">Why Choose Us</span>
          <h2 className="section-title">Your Trusted Travel Partner</h2>
          <p className="section-description">
            Experience the difference with our premium services, dedicated support, and commitment to excellence.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <div key={feature.id} className="feature-card">
              <div className="feature-icon-wrapper">
                <span className="feature-emoji">{feature.emoji}</span>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
