import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MapPin,
  Clock,
  Route as RouteIcon,
  Car,
  ArrowRight,
  Shield,
  Calendar,
} from "lucide-react";
import "./BookingConfirmationPage.css";

interface BookingData {
  vehicleName: string;
  vehicleType: string;
  vehicleImage: string;
  pickup: string;
  drop: string;
  date: string;
  time: string;
  distance: string;
  tripType: string;
  baseFare: number;
  taxesFees: number;
}

const BookingConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state as BookingData;

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
  });

  useEffect(() => {
    // Redirect if no booking data
    if (!bookingData) {
      navigate("/");
    }
  }, [bookingData, navigate]);

  if (!bookingData) {
    return null;
  }

  const totalAmount = bookingData.baseFare + bookingData.taxesFees;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Validate form
    if (!formData.fullName || !formData.phoneNumber) {
      alert("Please fill in all required fields");
      return;
    }

    // Here you would typically send the booking to your backend
    console.log("Booking confirmed:", { ...formData, ...bookingData });

    // Navigate to success page or show confirmation
    alert("Booking confirmed! You will receive a confirmation shortly.");
    navigate("/");
  };

  return (
    <div className="booking-confirmation-page">
      <div className="booking-confirmation-container">
        {/* Left Section - Form */}
        <div className="booking-form-section">
          <div className="booking-header">
            <h1 className="booking-title">Complete Your Booking</h1>
            <p className="booking-subtitle">
              Please provide your details to confirm the ride.
            </p>
          </div>

          {/* Passenger Information */}
          <div className="form-section">
            <h2 className="section-title">Passenger Information</h2>

            <div className="form-row">
              <div className="form-field">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter full name"
                  className="form-input"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-field">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="+91 98765 43210"
                  className="form-input"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">Email Address (Optional)</label>
              <input
                type="email"
                name="email"
                placeholder="For booking receipt"
                className="form-input"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Journey Details */}
          <div className="form-section">
            <h2 className="section-title">Journey Details</h2>

            <div className="form-field">
              <label className="form-label">Pickup Address</label>
              <div className="input-with-icon readonly-field">
                <MapPin size={18} className="input-icon pickup-icon" />
                <input
                  type="text"
                  name="pickupAddress"
                  className="form-input with-icon readonly-input"
                  value={bookingData.pickup}
                  readOnly
                />
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">Drop Address</label>
              <div className="input-with-icon readonly-field">
                <MapPin size={18} className="input-icon drop-icon" />
                <input
                  type="text"
                  name="dropAddress"
                  className="form-input with-icon readonly-input"
                  value={bookingData.drop}
                  readOnly
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label className="form-label">Pickup Date</label>
                <div className="input-with-icon readonly-field">
                  <Calendar size={18} className="input-icon" />
                  <input
                    type="text"
                    name="pickupDate"
                    className="form-input with-icon readonly-input"
                    value={bookingData.date}
                    readOnly
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">Pickup Time</label>
                <div className="input-with-icon readonly-field">
                  <Clock size={18} className="input-icon" />
                  <input
                    type="text"
                    name="pickupTime"
                    className="form-input with-icon readonly-input"
                    value={bookingData.time}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button className="verify-button" onClick={handleSubmit}>
            <span>Verify & Book</span>
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Right Section - Summary */}
        <div className="booking-summary-section">
          {/* Vehicle Card */}
          <div className="vehicle-summary-card">
            <img
              src={
                bookingData.vehicleImage ||
                "https://via.placeholder.com/400x200?text=Vehicle"
              }
              alt={bookingData.vehicleName}
              className="vehicle-summary-image"
            />
            <div className="vehicle-summary-info">
              <h3 className="vehicle-summary-name">
                {bookingData.vehicleName}
              </h3>
              <p className="vehicle-summary-type">{bookingData.vehicleType}</p>
            </div>
          </div>

          {/* Trip Summary */}
          <div className="trip-summary-card">
            <h3 className="trip-summary-title">Trip Summary</h3>

            <div className="trip-summary-details">
              <div className="trip-detail-item">
                <Clock size={16} className="trip-detail-icon" />
                <span className="trip-detail-label">Date</span>
                <span className="trip-detail-value">{bookingData.date}</span>
              </div>

              <div className="trip-detail-item">
                <Clock size={16} className="trip-detail-icon" />
                <span className="trip-detail-label">Time</span>
                <span className="trip-detail-value">{bookingData.time}</span>
              </div>

              <div className="trip-detail-item">
                <RouteIcon size={16} className="trip-detail-icon" />
                <span className="trip-detail-label">Distance</span>
                <span className="trip-detail-value">
                  {bookingData.distance}
                </span>
              </div>

              <div className="trip-detail-item">
                <Car size={16} className="trip-detail-icon" />
                <span className="trip-detail-label">Trip Type</span>
                <span className="trip-detail-value">
                  {bookingData.tripType}
                </span>
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div className="pricing-breakdown">
              <div className="pricing-item">
                <span className="pricing-label">Base Fare</span>
                <span className="pricing-value">
                  ₹ {bookingData.baseFare.toLocaleString()}
                </span>
              </div>
              <div className="pricing-item">
                <span className="pricing-label">Taxes & Fees</span>
                <span className="pricing-value">
                  ₹ {bookingData.taxesFees.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Total Amount */}
            <div className="total-amount">
              <span className="total-label">Total Amount</span>
              <span className="total-value">
                ₹ {totalAmount.toLocaleString()}
              </span>
            </div>
            <p className="payment-note">*Pay to driver</p>

            {/* Cancellation Policy */}
            <div className="cancellation-info">
              <Shield size={16} className="shield-icon" />
              <p className="cancellation-text">
                Free cancellation up to 2 hours before pickup. Professional
                verified drivers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;
