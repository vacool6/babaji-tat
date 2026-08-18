import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
  XCircle,
  Copy,
  Check,
} from "lucide-react";
import type { BookingFormData } from "../types/booking";
import { useBooking } from "../context/BookingContext";
import "./BookingFormPage.css";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentResult {
  success: boolean;
  bookingReference?: string;
  bookingId?: string;
  paymentId?: string;
  message?: string;
}

const BookingFormPage = () => {
  const navigate = useNavigate();
  const {
    pickup,
    drop,
    dateTime,
    tripType,
    returnDateTime,
    selectedVehicle,
    tripDistance,
  } = useBooking();
  const vehicle = selectedVehicle;

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerAlternatePhone: "",
    pickupAddress: "",
    specialInstructions: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(
    null,
  );
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    if (!vehicle) {
      navigate("/");
    }
  }, [vehicle, navigate]);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = "Name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = "Email is required";
    } else if (!emailRegex.test(formData.customerEmail)) {
      newErrors.customerEmail = "Invalid email format";
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = "Phone number is required";
    } else if (!phoneRegex.test(formData.customerPhone)) {
      newErrors.customerPhone = "Invalid phone number (10 digits)";
    }

    if (
      formData.customerAlternatePhone &&
      !phoneRegex.test(formData.customerAlternatePhone)
    ) {
      newErrors.customerAlternatePhone = "Invalid alternate phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const closeModal = () => {
    setPaymentResult(null);
    if (paymentResult?.success) {
      navigate("/");
    }
  };

  const handlePayment = async () => {
    if (!validateForm()) {
      return;
    }

    if (!vehicle) {
      alert("Vehicle information is missing. Please start over.");
      navigate("/");
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingData: BookingFormData = {
        pickupLocation: pickup,
        dropLocation: drop,
        tripType: tripType,
        pickupDateTime: dateTime,
        returnDateTime: returnDateTime,
        vehicleId: vehicle.id,
        vehicleName: vehicle.name,
        vehicleCategory: vehicle.category,
        vehicleSeats: vehicle.seats,
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        customerAlternatePhone: formData.customerAlternatePhone,
        pickupAddress: formData.pickupAddress,
        specialInstructions: formData.specialInstructions,
        basePrice: vehicle.price,
        totalPrice: vehicle.price,
      };

      // Call edge function to create booking and payment order
      const edgeFunctionUrl =
        import.meta.env.VITE_SUPABASE_URL + "/functions/v1/create-payment";
      const response = await fetch(edgeFunctionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to create booking");
      }

      // Initialize Razorpay payment
      const options = {
        key: data.razorpayKeyId,
        amount: data.amount * 100,
        currency: data.currency,
        order_id: data.orderId,
        name: "Babaji Tours & Travels",
        description: `${vehicle.name} - ${pickup} to ${drop}`,
        image: "/favicon.svg",
        prefill: {
          name: formData.customerName,
          email: formData.customerEmail,
          contact: formData.customerPhone,
        },
        theme: {
          color: "#FF6B35",
        },
        handler: async function (response: any) {
          // Verify payment
          try {
            const verifyUrl =
              import.meta.env.VITE_SUPABASE_URL +
              "/functions/v1/verify-payment";
            const verifyResponse = await fetch(verifyUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
              },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                bookingReference: data.bookingReference,
                bookingData: data.bookingData,
                // Add price verification params
                vehicleCategory: vehicle.category,
                distance: tripDistance?.distance || 0,
                frontendCalculatedPrice: vehicle.price,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              setPaymentResult({
                success: true,
                bookingReference: data.bookingReference,
                bookingId: verifyData.bookingId,
                paymentId: response.razorpay_payment_id,
                message: "Your booking has been confirmed successfully!",
              });
              setIsSubmitting(false);
            } else {
              setPaymentResult({
                success: false,
                message:
                  verifyData.error ||
                  "Payment verification failed. Please contact support.",
              });
              setIsSubmitting(false);
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            setPaymentResult({
              success: false,
              message:
                "Payment verification failed. Please contact support with your payment ID.",
            });
            setIsSubmitting(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment initiation error:", error);
      setPaymentResult({
        success: false,
        message: "Failed to initiate payment. Please try again.",
      });
      setIsSubmitting(false);
    }
  };

  if (!vehicle) {
    return null;
  }

  return (
    <div className="booking-form-page">
      <div className="booking-container">
        <div className="booking-content">
          <div className="booking-form-section">
            <h1 className="page-title">Complete Your Booking</h1>

            <div className="trip-info-inline">
              <div className="trip-route">
                <span className="location">{pickup}</span>
                <span className="arrow">→</span>
                <span className="location">{drop}</span>
              </div>
              <div className="trip-datetime">
                {new Date(dateTime).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}{" "}
                at{" "}
                {new Date(dateTime).toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                | {tripType}
              </div>
            </div>

            <form className="booking-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="customerName">
                    <User size={18} />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className={errors.customerName ? "error" : ""}
                    placeholder="Enter your full name"
                  />
                  {errors.customerName && (
                    <span className="error-message">{errors.customerName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="customerEmail">
                    <Mail size={18} />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="customerEmail"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    className={errors.customerEmail ? "error" : ""}
                    placeholder="your.email@example.com"
                  />
                  {errors.customerEmail && (
                    <span className="error-message">
                      {errors.customerEmail}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="customerPhone">
                    <Phone size={18} />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="customerPhone"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                    className={errors.customerPhone ? "error" : ""}
                    placeholder="9876543210"
                    maxLength={10}
                  />
                  {errors.customerPhone && (
                    <span className="error-message">
                      {errors.customerPhone}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="customerAlternatePhone">
                    <Phone size={18} />
                    Alternate Phone
                  </label>
                  <input
                    type="tel"
                    id="customerAlternatePhone"
                    name="customerAlternatePhone"
                    value={formData.customerAlternatePhone}
                    onChange={handleInputChange}
                    className={errors.customerAlternatePhone ? "error" : ""}
                    placeholder="9876543210"
                    maxLength={10}
                  />
                  {errors.customerAlternatePhone && (
                    <span className="error-message">
                      {errors.customerAlternatePhone}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="specialInstructions">
                  <MessageSquare size={18} />
                  Special Instructions
                </label>
                <textarea
                  id="specialInstructions"
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Any special requirements or instructions..."
                />
              </div>
            </form>
          </div>

          <div className="booking-summary-section">
            <div className="vehicle-summary">
              <img src={vehicle.image} alt={vehicle.name} />
              <h3>{vehicle.name}</h3>
              <p className="vehicle-category">{vehicle.category}</p>
              <div className="vehicle-features">
                {vehicle.features.map((feature: any, index: any) => (
                  <span key={index} className="feature-badge">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="price-breakdown">
              <h3>Price Breakdown</h3>
              <div className="price-row">
                <span>Base Fare</span>
                <span>₹{vehicle.price}</span>
              </div>
              <div className="price-row">
                <span>Taxes & Fees</span>
                <span>Included</span>
              </div>
              <div className="price-row total">
                <span>Total Amount</span>
                <span>₹{vehicle.price}</span>
              </div>
            </div>

            <button
              className="proceed-payment-btn"
              onClick={handlePayment}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Proceed to Payment"}
            </button>

            <div className="payment-info">
              <p>🔒 Secure payment powered by Razorpay</p>
              <p className="payment-note">
                You'll be redirected to a secure payment gateway
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success/Failure Modal */}
      {paymentResult && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div
              className={`modal-icon ${paymentResult.success ? "success" : "failure"}`}
            >
              {paymentResult.success ? (
                <CheckCircle size={48} />
              ) : (
                <XCircle size={48} />
              )}
            </div>

            <h2 className="modal-title">
              {paymentResult.success ? "Booking Confirmed!" : "Payment Failed"}
            </h2>

            <p className="modal-message">{paymentResult.message}</p>

            {paymentResult.success && (
              <div className="booking-details-box">
                <div className="detail-row">
                  <span className="detail-label">Booking Reference</span>
                  <div className="detail-value">
                    <strong>{paymentResult.bookingReference}</strong>
                    <button
                      className={`copy-btn ${copiedField === "reference" ? "copied" : ""}`}
                      onClick={() =>
                        copyToClipboard(
                          paymentResult.bookingReference!,
                          "reference",
                        )
                      }
                    >
                      {copiedField === "reference" ? (
                        <Check size={14} />
                      ) : (
                        <Copy size={14} />
                      )}
                      {copiedField === "reference" ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Payment ID</span>
                  <div className="detail-value">
                    <span style={{ fontSize: "0.85rem" }}>
                      {paymentResult.paymentId}
                    </span>
                    <button
                      className={`copy-btn ${copiedField === "payment" ? "copied" : ""}`}
                      onClick={() =>
                        copyToClipboard(paymentResult.paymentId!, "payment")
                      }
                    >
                      {copiedField === "payment" ? (
                        <Check size={14} />
                      ) : (
                        <Copy size={14} />
                      )}
                      {copiedField === "payment" ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Email</span>
                  <div className="detail-value">
                    <span>{formData.customerEmail}</span>
                  </div>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Phone</span>
                  <div className="detail-value">
                    <span>{formData.customerPhone}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="modal-actions">
              {paymentResult.success && (
                <button
                  className="modal-btn modal-btn-secondary"
                  onClick={() => navigate("/track-order")}
                >
                  Track Booking
                </button>
              )}
              <button
                className="modal-btn modal-btn-primary"
                onClick={closeModal}
              >
                {paymentResult.success ? "Done" : "Try Again"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingFormPage;
