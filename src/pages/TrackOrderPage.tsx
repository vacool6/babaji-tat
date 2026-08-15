import { useState } from "react";
import {
  Search,
  Package,
  Phone,
  Mail,
  Calendar,
  Car,
  User,
  CreditCard,
} from "lucide-react";
import { supabase } from "../supabase/client";
import type { Booking } from "../types/booking";
import "./TrackOrderPage.css";

const TrackOrderPage = () => {
  const [searchType, setSearchType] = useState<"reference" | "email" | "phone">(
    "reference",
  );
  const [searchValue, setSearchValue] = useState("");
  const [booking, setBooking] = useState<Booking | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchValue.trim()) {
      setError("Please enter a value to search");
      return;
    }

    setIsLoading(true);
    setError("");
    setBooking(null);
    setBookings([]);

    try {
      let query = supabase.from("bookings").select("*");

      if (searchType === "reference") {
        query = query
          .eq("booking_reference", searchValue.trim().toUpperCase())
          .limit(1);
      } else if (searchType === "email") {
        query = query.eq("customer_email", searchValue.trim().toLowerCase());
      } else if (searchType === "phone") {
        query = query.eq("customer_phone", searchValue.trim());
      }

      const { data, error: fetchError } = await query.order("created_at", {
        ascending: false,
      });

      if (fetchError) throw fetchError;

      if (!data || data.length === 0) {
        setError("No bookings found with the provided details");
      } else {
        const mappedBookings: Booking[] = data.map((item: any) => ({
          id: item.id,
          bookingReference: item.booking_reference,
          pickupLocation: item.pickup_location,
          dropLocation: item.drop_location,
          tripType: item.trip_type,
          pickupDatetime: item.pickup_datetime,
          returnDatetime: item.return_datetime,
          vehicleId: item.vehicle_id,
          vehicleName: item.vehicle_name,
          vehicleCategory: item.vehicle_category,
          vehicleSeats: item.vehicle_seats,
          customerName: item.customer_name,
          customerEmail: item.customer_email,
          customerPhone: item.customer_phone,
          customerAlternatePhone: item.customer_alternate_phone,
          pickupAddress: item.pickup_address,
          specialInstructions: item.special_instructions,
          basePrice: item.base_price,
          totalPrice: item.total_price,
          currency: item.currency,
          paymentStatus: item.payment_status,
          paymentId: item.payment_id,
          paymentMethod: item.payment_method,
          paymentGateway: item.payment_gateway,
          paidAmount: item.paid_amount,
          paymentDate: item.payment_date,
          bookingStatus: item.booking_status,
          driverAssigned: item.driver_assigned,
          driverName: item.driver_name,
          driverPhone: item.driver_phone,
          vehicleRegistration: item.vehicle_registration,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
        }));

        if (searchType === "reference") {
          setBooking(mappedBookings[0]);
        } else {
          setBookings(mappedBookings);
        }
      }
    } catch (err) {
      console.error("Error fetching booking:", err);
      setError("An error occurred while searching. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getPaymentStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "#f39c12",
      paid: "#27ae60",
      failed: "#e74c3c",
      refunded: "#95a5a6",
    };
    return colors[status] || "#95a5a6";
  };

  const getTripTimingBadge = (pickupDatetime: string) => {
    const pickupDate = new Date(pickupDatetime);
    const now = new Date();

    if (pickupDate < now) {
      return { label: "Past", color: "#95a5a6" };
    } else {
      return { label: "Upcoming", color: "#3498db" };
    }
  };

  return (
    <div className="track-order-page">
      <div className="track-container">
        <div className="track-header">
          <Package size={48} />
          <h1>Track Your Booking</h1>
          <p>Enter your booking details to track your cab booking status</p>
        </div>

        <div className="search-section">
          <div className="search-type-selector">
            <button
              className={searchType === "reference" ? "active" : ""}
              onClick={() => setSearchType("reference")}
            >
              Booking Reference
            </button>
            <button
              className={searchType === "email" ? "active" : ""}
              onClick={() => setSearchType("email")}
            >
              Email
            </button>
            <button
              className={searchType === "phone" ? "active" : ""}
              onClick={() => setSearchType("phone")}
            >
              Phone
            </button>
          </div>

          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-input-wrapper">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={
                  searchType === "reference"
                    ? "Enter booking reference (e.g., BKG20240115001)"
                    : searchType === "email"
                      ? "Enter your email address"
                      : "Enter your phone number"
                }
                className="search-input"
              />
            </div>
            <button type="submit" className="search-btn" disabled={isLoading}>
              {isLoading ? "Searching..." : "Track Booking"}
            </button>
          </form>

          {error && <div className="error-alert">{error}</div>}
        </div>

        {booking && (
          <div className="booking-card">
            <div className="booking-card-header">
              <div>
                <h3 className="booking-ref-title">
                  #{booking.bookingReference}
                </h3>
                <p className="booking-route">
                  {booking.pickupLocation} → {booking.dropLocation}
                </p>
              </div>
              <div className="badges">
                <span
                  className="badge"
                  style={{
                    background: getTripTimingBadge(booking.pickupDatetime)
                      .color,
                  }}
                >
                  {getTripTimingBadge(booking.pickupDatetime).label}
                </span>
                <span
                  className="badge"
                  style={{
                    background: getPaymentStatusColor(booking.paymentStatus),
                  }}
                >
                  {booking.paymentStatus.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="booking-card-body">
              <div className="info-grid">
                <div className="info-item">
                  <Calendar size={18} />
                  <div>
                    <span className="info-label">Pickup</span>
                    <span className="info-value">
                      {new Date(booking.pickupDatetime).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="info-item">
                  <Car size={18} />
                  <div>
                    <span className="info-label">Vehicle</span>
                    <span className="info-value">
                      {booking.vehicleName} ({booking.vehicleCategory})
                    </span>
                  </div>
                </div>

                <div className="info-item">
                  <User size={18} />
                  <div>
                    <span className="info-label">Customer</span>
                    <span className="info-value">{booking.customerName}</span>
                  </div>
                </div>

                <div className="info-item">
                  <Phone size={18} />
                  <div>
                    <span className="info-label">Contact</span>
                    <span className="info-value">{booking.customerPhone}</span>
                  </div>
                </div>

                <div className="info-item">
                  <Mail size={18} />
                  <div>
                    <span className="info-label">Email</span>
                    <span className="info-value">{booking.customerEmail}</span>
                  </div>
                </div>

                <div className="info-item">
                  <CreditCard size={18} />
                  <div>
                    <span className="info-label">Amount</span>
                    <span className="info-value">₹{booking.totalPrice}</span>
                  </div>
                </div>
              </div>

              {booking.driverAssigned && (
                <div className="driver-info">
                  <h4>Driver Assigned</h4>
                  <p>
                    <strong>{booking.driverName}</strong> •{" "}
                    {booking.driverPhone}
                  </p>
                  {booking.vehicleRegistration && (
                    <p>Vehicle: {booking.vehicleRegistration}</p>
                  )}
                </div>
              )}

              {booking.specialInstructions && (
                <div className="special-note">
                  <strong>Special Instructions:</strong>{" "}
                  {booking.specialInstructions}
                </div>
              )}
            </div>
          </div>
        )}

        {bookings.length > 0 && (
          <div className="bookings-list">
            <h2 className="list-title">Your Bookings ({bookings.length})</h2>
            {bookings.map((bkg) => (
              <div key={bkg.id} className="booking-card">
                <div className="booking-card-header">
                  <div>
                    <h3 className="booking-ref-title">
                      #{bkg.bookingReference}
                    </h3>
                    <p className="booking-route">
                      {bkg.pickupLocation} → {bkg.dropLocation}
                    </p>
                  </div>
                  <div className="badges">
                    <span
                      className="badge"
                      style={{
                        background: getTripTimingBadge(bkg.pickupDatetime)
                          .color,
                      }}
                    >
                      {getTripTimingBadge(bkg.pickupDatetime).label}
                    </span>
                    <span
                      className="badge"
                      style={{
                        background: getPaymentStatusColor(bkg.paymentStatus),
                      }}
                    >
                      {bkg.paymentStatus.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="booking-card-body">
                  <div className="info-grid">
                    <div className="info-item">
                      <Calendar size={18} />
                      <div>
                        <span className="info-label">Pickup</span>
                        <span className="info-value">
                          {new Date(bkg.pickupDatetime).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    <div className="info-item">
                      <Car size={18} />
                      <div>
                        <span className="info-label">Vehicle</span>
                        <span className="info-value">
                          {bkg.vehicleName} ({bkg.vehicleCategory})
                        </span>
                      </div>
                    </div>

                    <div className="info-item">
                      <CreditCard size={18} />
                      <div>
                        <span className="info-label">Amount</span>
                        <span className="info-value">₹{bkg.totalPrice}</span>
                      </div>
                    </div>
                  </div>

                  {bkg.driverAssigned && (
                    <div className="driver-info">
                      <h4>Driver Assigned</h4>
                      <p>
                        <strong>{bkg.driverName}</strong> • {bkg.driverPhone}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrderPage;
