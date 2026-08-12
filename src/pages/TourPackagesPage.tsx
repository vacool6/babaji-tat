import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, MapPin, Users, SlidersHorizontal, X, Star, Sparkles, TrendingUp } from "lucide-react";
import { tourPackages } from "../data/tourPackages";
import type { TourPackage } from "../data/tourPackages";
import "./TourPackagesPage.css";

const TourPackagesPage = () => {
  const navigate = useNavigate();
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(
    [],
  );
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleDestinationFilter = (destination: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(destination)
        ? prev.filter((d) => d !== destination)
        : [...prev, destination],
    );
  };

  const handleDurationFilter = (duration: string) => {
    setSelectedDurations((prev) =>
      prev.includes(duration)
        ? prev.filter((d) => d !== duration)
        : [...prev, duration],
    );
  };

  const handleThemeFilter = (theme: string) => {
    setSelectedThemes((prev) =>
      prev.includes(theme) ? prev.filter((t) => t !== theme) : [...prev, theme],
    );
  };

  const resetFilters = () => {
    setSelectedDestinations([]);
    setSelectedDurations([]);
    setSelectedThemes([]);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Extract unique destinations and themes from packages
  const allDestinations = Array.from(new Set(tourPackages.map(pkg => pkg.destination))).sort();
  const allThemes = Array.from(new Set(tourPackages.flatMap(pkg => pkg.theme))).sort();

  const filteredPackages = tourPackages.filter((pkg) => {
    if (
      selectedDestinations.length > 0 &&
      !selectedDestinations.includes(pkg.destination)
    ) {
      return false;
    }
    if (selectedDurations.length > 0) {
      const durationMatch = selectedDurations.some((dur) => {
        const nights = parseInt(pkg.duration);
        if (dur === "2-3 Days")
          return nights >= 2 && nights <= 3;
        if (dur === "4-5 Days")
          return nights >= 4 && nights <= 5;
        if (dur === "6-7 Days")
          return nights >= 6 && nights <= 7;
        if (dur === "8+ Days")
          return nights >= 8;
        return false;
      });
      if (!durationMatch) return false;
    }
    if (selectedThemes.length > 0) {
      const themeMatch = selectedThemes.some((theme) =>
        pkg.theme.includes(theme),
      );
      if (!themeMatch) return false;
    }
    return true;
  });

  const handleViewDetails = (packageId: string) => {
    navigate(`/tour-packages/${packageId}`);
  };

  const handleEnquire = (pkg: TourPackage) => {
    // Handle enquiry logic here
    alert(`Enquiry for ${pkg.name}. Contact: +91 98765 43210`);
  };

  const getPopularityBadge = (index: number) => {
    if (index === 0) return { text: "🔥 Trending", class: "trending" };
    if (index === 1) return { text: "⭐ Popular", class: "popular" };
    if (index === 2) return { text: "💎 Premium", class: "premium" };
    return null;
  };

  return (
    <div className="tour-packages-page">
      <div className="tour-packages-header">
        <div className="header-background"></div>
        <div className="header-content">
          <div className="breadcrumb">
            <span onClick={() => navigate("/")}>Home</span>
            <span className="separator">›</span>
            <span>Tour Packages</span>
          </div>
          <h1 className="page-title">
            <Sparkles className="title-icon" size={36} />
            Explore India Tour Packages
          </h1>
          <p className="page-subtitle">
            Discover the incredible diversity and rich heritage of India
            with our meticulously curated tour packages. From serene beaches to
            mighty mountains, spiritual journeys to royal palaces - find your perfect escape.
          </p>
          <div className="packages-count">
            <TrendingUp size={20} />
            <span>{filteredPackages.length} amazing packages available</span>
          </div>
        </div>
      </div>

      <div className="tour-packages-container">
        {/* Mobile Filter Toggle Button */}
        <button className="mobile-filter-toggle" onClick={toggleFilters}>
          {showFilters ? <X size={20} /> : <SlidersHorizontal size={20} />}
          <span>{showFilters ? "Close Filters" : "Show Filters"}</span>
        </button>

        {/* Filters Sidebar */}
        <aside className={`filters-sidebar ${showFilters ? "show" : ""}`}>
          <div className="filters-header">
            <h3>🎯 Filters</h3>
            <button className="reset-button" onClick={resetFilters}>
              Reset All
            </button>
          </div>

          {/* Destination Filter */}
          <div className="filter-section">
            <h4 className="filter-title">Destination</h4>
            <div className="filter-options">
              {allDestinations.map((dest) => (
                <label key={dest} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedDestinations.includes(dest)}
                    onChange={() => handleDestinationFilter(dest)}
                  />
                  <span>{dest}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Duration Filter */}
          <div className="filter-section">
            <h4 className="filter-title">Duration</h4>
            <div className="filter-options">
              {["2-3 Days", "4-5 Days", "6-7 Days", "8+ Days"].map((dur) => (
                <label key={dur} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedDurations.includes(dur)}
                    onChange={() => handleDurationFilter(dur)}
                  />
                  <span>{dur}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Theme Filter */}
          <div className="filter-section">
            <h4 className="filter-title">Theme</h4>
            <div className="filter-options theme-options">
              {allThemes.map((theme) => (
                <button
                  key={theme}
                  className={`theme-tag ${selectedThemes.includes(theme) ? "active" : ""}`}
                  onClick={() => handleThemeFilter(theme)}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Tour Packages Grid */}
        <div className="packages-grid">
          {filteredPackages.map((pkg, index) => {
            const badge = getPopularityBadge(index);
            return (
              <div 
                key={pkg.id} 
                className="tour-package-card"
                onMouseEnter={() => setHoveredCard(pkg.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {badge && (
                  <div className={`popularity-badge ${badge.class}`}>
                    {badge.text}
                  </div>
                )}
                
                <div className="package-image-container">
                  <img src={pkg.image} alt={pkg.name} className="package-image" />
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <Star size={24} fill="white" />
                      <span>Bestseller</span>
                    </div>
                  </div>
                  <div className="package-duration-badge">
                    <Clock size={14} />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="package-destination-badge">
                    <MapPin size={14} />
                    <span>{pkg.destination}</span>
                  </div>
                </div>

                <div className="package-content">
                  <div className="package-themes">
                    {pkg.theme.map((theme, idx) => (
                      <span key={idx} className="theme-chip">{theme}</span>
                    ))}
                  </div>
                  
                  <h3 className="package-title">{pkg.name}</h3>

                  <div className="package-features">
                    <div className="package-feature">
                      <MapPin size={16} />
                      <span>{pkg.tourType}</span>
                    </div>
                    {pkg.features.slice(0, 2).map((feature, index) => (
                      <div key={index} className="package-feature">
                        <Users size={16} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="package-footer">
                    <div className="package-price">
                      <span className="price-label">✨ Starting from</span>
                      <span className="price-amount">
                        ₹{pkg.price.toLocaleString()}
                      </span>
                      <span className="price-unit">/person</span>
                    </div>

                    <div className="package-actions">
                      <button
                        className="view-details-btn"
                        onClick={() => handleViewDetails(pkg.id)}
                      >
                        View Details
                      </button>
                      <button
                        className="enquire-btn"
                        onClick={() => handleEnquire(pkg)}
                      >
                        Enquire Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TourPackagesPage;
