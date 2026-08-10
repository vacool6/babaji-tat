import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, MapPin, Users } from "lucide-react";
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

  const filteredPackages = tourPackages.filter((pkg) => {
    if (
      selectedDestinations.length > 0 &&
      !selectedDestinations.includes(pkg.destination)
    ) {
      return false;
    }
    if (selectedDurations.length > 0) {
      const durationMatch = selectedDurations.some((dur) => {
        if (dur === "2-3 Days")
          return pkg.duration.includes("2N") || pkg.duration.includes("3N");
        if (dur === "4-5 Days") return pkg.duration.includes("4");
        if (dur === "6+ Days") return parseInt(pkg.duration) >= 6;
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

  return (
    <div className="tour-packages-page">
      <div className="tour-packages-header">
        <div className="breadcrumb">
          <span onClick={() => navigate("/")}>Home</span>
          <span className="separator">›</span>
          <span>Tour Packages</span>
        </div>
        <h1 className="page-title">Explore Uttarakhand Tour Packages</h1>
        <p className="page-subtitle">
          Discover the majestic beauty and spiritual serenity of the Himalayas
          with our meticulously curated tour packages. From weekend getaways to
          profound spiritual journeys, find your perfect escape.
        </p>
      </div>

      <div className="tour-packages-container">
        {/* Filters Sidebar */}
        <aside className="filters-sidebar">
          <div className="filters-header">
            <h3>Filters</h3>
            <button className="reset-button" onClick={resetFilters}>
              Reset
            </button>
          </div>

          {/* Destination Filter */}
          <div className="filter-section">
            <h4 className="filter-title">Destination</h4>
            <div className="filter-options">
              {["Nainital", "Mukteshwar", "Jim Corbett", "Auli"].map((dest) => (
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
              {["2-3 Days", "4-5 Days", "6+ Days"].map((dur) => (
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
              {["Pilgrimage", "Adventure", "Family", "Weekend"].map((theme) => (
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
          {filteredPackages.map((pkg) => (
            <div key={pkg.id} className="tour-package-card">
              <div className="package-image-container">
                <img src={pkg.image} alt={pkg.name} className="package-image" />
                <div className="package-duration-badge">
                  <Clock size={14} />
                  <span>{pkg.duration}</span>
                </div>
              </div>

              <div className="package-content">
                <h3 className="package-title">{pkg.name}</h3>

                <div className="package-features">
                  <div className="package-feature">
                    <MapPin size={16} />
                    <span>{pkg.tourType}</span>
                  </div>
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="package-feature">
                      <Users size={16} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="package-footer">
                  <div className="package-price">
                    <span className="price-label">Starting from</span>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourPackagesPage;
