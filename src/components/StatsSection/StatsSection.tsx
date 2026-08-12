import { Users, MapPin, Star, Calendar } from "lucide-react";
import "./StatsSection.css";

interface Stat {
  id: string;
  icon: React.ReactNode;
  value: string;
  label: string;
}

const StatsSection = () => {
  const stats: Stat[] = [
    {
      id: "1",
      icon: <Users size={32} strokeWidth={2.5} />,
      value: "10,000+",
      label: "Happy Customers",
    },
    {
      id: "2",
      icon: <MapPin size={32} strokeWidth={2.5} />,
      value: "500+",
      label: "Destinations Covered",
    },
    {
      id: "3",
      icon: <Star size={32} strokeWidth={2.5} />,
      value: "4.9/5",
      label: "Customer Rating",
    },
    {
      id: "4",
      icon: <Calendar size={32} strokeWidth={2.5} />,
      value: "15+",
      label: "Years Experience",
    },
  ];

  return (
    <section className="stats-section">
      <div className="stats-overlay"></div>
      <div className="stats-container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div 
              key={stat.id} 
              className="stat-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
