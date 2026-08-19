import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MapPin,
  Clock,
  Users,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Calendar,
} from "lucide-react";
import DateTimePicker from "../components/DateTimePicker/DateTimePicker";
import { getTourPackageById } from "../data/tourPackages";
import "./TourDetailPage.css";

const TourDetailPage = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [enquiryForm, setEnquiryForm] = useState({
    fullName: "",
    phoneNumber: "",
    travelDate: "",
    travelers: 2,
  });

  // Get tour data from shared data file
  const tourData = getTourPackageById(packageId || "");

  // Redirect if tour not found
  if (!tourData) {
    navigate("/tour-packages");
    return null;
  }

  const handleItineraryToggle = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setEnquiryForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitEnquiry = () => {
    if (!enquiryForm.fullName || !enquiryForm.phoneNumber) {
      alert("Please fill in all required fields");
      return;
    }

    console.log("Enquiry submitted:", enquiryForm);
    alert("Thank you for your enquiry! We will contact you shortly.");
  };

  return (
    <div className="tour-detail-page">
      {/* Breadcrumb */}
      <div className="tour-breadcrumb">
        <span onClick={() => navigate("/")}>Home</span>
        <span className="separator">›</span>
        <span onClick={() => navigate("/tour-packages")}>Tour Packages</span>
        <span className="separator">›</span>
        <span>{tourData.name}</span>
      </div>

      {/* Hero Section */}
      <div className="tour-hero">
        <img
          src={tourData.image}
          alt={tourData.name}
          className="tour-hero-image"
        />
        <div className="tour-hero-badge">
          <Clock size={16} />
          <span>{tourData.duration}</span>
        </div>
        <div className="tour-hero-content">
          <h1 className="tour-hero-title">{tourData.name}</h1>
          <div className="tour-hero-meta">
            <div className="tour-meta-item">
              <MapPin size={18} />
              <span>{tourData.location}</span>
            </div>
            {tourData.distance && (
              <div className="tour-meta-item">
                <Users size={18} />
                <span>{tourData.distance}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="tour-detail-container">
        {/* Left Section - Tour Info */}
        <div className="tour-info-section">
          {/* Tour Overview */}
          <section className="tour-section">
            <h2 className="section-heading">Tour Overview</h2>
            <p className="tour-overview-text">{tourData.overview}</p>
          </section>

          {/* Itinerary */}
          <section className="tour-section">
            <h2 className="section-heading">Itinerary</h2>
            <div className="itinerary-list">
              {tourData.itinerary.map((item) => (
                <div key={item.day} className="itinerary-item">
                  <button
                    className="itinerary-header"
                    onClick={() => handleItineraryToggle(item.day)}
                  >
                    <div className="itinerary-day-badge">
                      <span className="day-number">{item.day}</span>
                      <span className="day-label">Day {item.day}</span>
                    </div>
                    <h3 className="itinerary-title">{item.title}</h3>
                    {expandedDay === item.day ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>
                  {expandedDay === item.day && (
                    <div className="itinerary-content">
                      <p>{item.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* What's Included & Excluded */}
          <div className="inclusions-grid">
            <section className="tour-section">
              <h3 className="subsection-heading">
                <Check size={20} className="included-icon" />
                What's Included
              </h3>
              <ul className="inclusions-list">
                {tourData.included.map((item, index) => (
                  <li key={index} className="inclusion-item">
                    <Check size={18} className="check-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="tour-section">
              <h3 className="subsection-heading">
                <X size={20} className="excluded-icon" />
                What's Excluded
              </h3>
              <ul className="inclusions-list">
                {tourData.excluded.map((item, index) => (
                  <li key={index} className="exclusion-item">
                    <X size={18} className="x-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        {/* Right Section - Enquiry Form */}
        <aside className="tour-enquiry-sidebar">
          <div className="enquiry-card">
            <div className="enquiry-price">
              <span className="price-label">Starting from</span>
              <div className="price-display">
                <span className="price-amount">
                  ₹{tourData.price.toLocaleString()}
                </span>
                <span className="price-unit">/person</span>
              </div>
            </div>

            <div className="enquiry-form">
              <h3 className="enquiry-title">Quick Enquiry</h3>

              <div className="form-field">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter here"
                  className="form-input"
                  value={enquiryForm.fullName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-field">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="+91 94100 53567"
                  className="form-input"
                  value={enquiryForm.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-field">
                <label className="form-label">Travel Date</label>
                <DateTimePicker
                  placeholder="mm/dd/yyyy"
                  icon={<Calendar size={20} />}
                  onChange={(date) =>
                    setEnquiryForm((prev) => ({ ...prev, travelDate: date }))
                  }
                />
              </div>

              <div className="form-field">
                <label className="form-label">Travelers</label>
                <select
                  name="travelers"
                  className="form-input"
                  value={enquiryForm.travelers}
                  onChange={handleInputChange}
                >
                  <option value={1}>1 Adult</option>
                  <option value={2}>2 Adults</option>
                  <option value={3}>3 Adults</option>
                  <option value={4}>4 Adults</option>
                  <option value={5}>5+ Adults</option>
                </select>
              </div>

              <button
                className="enquiry-submit-btn"
                onClick={handleSubmitEnquiry}
              >
                Send Enquiry
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TourDetailPage;
