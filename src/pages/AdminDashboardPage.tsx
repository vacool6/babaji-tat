import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Search,
  Filter,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Phone,
  Mail,
  MapPin,
  Car,
  User,
} from "lucide-react";
import { supabase } from "../supabase/client";
import "./AdminDashboardPage.css";

interface Booking {
  id: string;
  booking_reference: string;
  pickup_location: string;
  drop_location: string;
  trip_type: string;
  pickup_datetime: string;
  return_datetime: string | null;
  vehicle_name: string;
  vehicle_category: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  total_price: number;
  payment_status: string;
  booking_status: string;
  created_at: string;
  driver_name: string | null;
  driver_phone: string | null;
}

interface Stats {
  totalBookings: number;
  pendingBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
}

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
    totalRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateSort, setDateSort] = useState<"asc" | "desc">("desc");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("adminAuthenticated");
    if (!isAuthenticated) {
      navigate("/admin");
      return;
    }

    fetchBookings();
  }, [navigate]);

  useEffect(() => {
    filterBookings();
  }, [searchTerm, statusFilter, dateSort, bookings]);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setBookings(data || []);
      calculateStats(data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (bookingsData: Booking[]) => {
    const totalBookings = bookingsData.length;
    const pendingBookings = bookingsData.filter(
      (b) => b.booking_status === "pending" || b.booking_status === "confirmed"
    ).length;
    const completedBookings = bookingsData.filter(
      (b) => b.booking_status === "completed"
    ).length;
    const cancelledBookings = bookingsData.filter(
      (b) => b.booking_status === "cancelled"
    ).length;
    const totalRevenue = bookingsData
      .filter((b) => b.payment_status === "paid")
      .reduce((sum, b) => sum + Number(b.total_price), 0);

    setStats({
      totalBookings,
      pendingBookings,
      completedBookings,
      cancelledBookings,
      totalRevenue,
    });
  };

  const filterBookings = () => {
    let filtered = bookings;

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((b) => b.booking_status === statusFilter);
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.booking_reference.toLowerCase().includes(term) ||
          b.customer_name.toLowerCase().includes(term) ||
          b.customer_email.toLowerCase().includes(term) ||
          b.customer_phone.includes(term)
      );
    }

    // Apply date sorting
    filtered = [...filtered].sort((a, b) => {
      const dateA = new Date(a.pickup_datetime).getTime();
      const dateB = new Date(b.pickup_datetime).getTime();
      return dateSort === "desc" ? dateB - dateA : dateA - dateB;
    });

    setFilteredBookings(filtered);
  };

  const updateBookingStatus = async (
    bookingId: string,
    newStatus: string
  ) => {
    try {
      // Use edge function for secure updates
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/quick-endpoint`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            bookingId,
            newStatus,
            adminPassword: import.meta.env.VITE_ADMIN_PASSWORD,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update booking");
      }

      // Refresh bookings
      await fetchBookings();
      setShowModal(false);
      setSelectedBooking(null);
    } catch (error) {
      console.error("Error updating booking:", error);
      alert(`Failed to update booking status: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    localStorage.removeItem("adminLoginTime");
    navigate("/admin");
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<
      string,
      { color: string; icon: React.ReactNode; label: string }
    > = {
      pending: {
        color: "#f59e0b",
        icon: <Clock size={14} />,
        label: "Pending",
      },
      confirmed: {
        color: "#3b82f6",
        icon: <CheckCircle size={14} />,
        label: "Confirmed",
      },
      in_progress: {
        color: "#8b5cf6",
        icon: <RefreshCw size={14} />,
        label: "In Progress",
      },
      completed: {
        color: "#10b981",
        icon: <CheckCircle size={14} />,
        label: "Completed",
      },
      cancelled: {
        color: "#ef4444",
        icon: <XCircle size={14} />,
        label: "Cancelled",
      },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span
        className="status-badge"
        style={{ backgroundColor: `${config.color}20`, color: config.color }}
      >
        {config.icon}
        {config.label}
      </span>
    );
  };

  const getPaymentBadge = (status: string) => {
    const isPaid = status === "paid";
    return (
      <span
        className="payment-badge"
        style={{
          backgroundColor: isPaid ? "#10b98120" : "#f59e0b20",
          color: isPaid ? "#10b981" : "#f59e0b",
        }}
      >
        {isPaid ? "✓ Paid" : "⏳ Pending"}
      </span>
    );
  };

  const extractCityName = (location: string): string => {
    // Try to extract meaningful city/area name from address
    // Common patterns: "City Name, State" or "Area, City, State"
    const parts = location.split(",").map((p) => p.trim());
    
    // If address has multiple parts, try to get the most relevant one
    if (parts.length >= 2) {
      // Check if first part looks like a street address (contains numbers)
      const firstPart = parts[0];
      const hasNumbers = /\d/.test(firstPart);
      
      if (hasNumbers && parts.length > 1) {
        // Return the second part (likely city/area name)
        return parts[1];
      }
      // Return first part if it doesn't look like a street address
      return firstPart;
    }
    
    // Return as-is if only one part or can't parse
    return parts[0] || location;
  };

  const openBookingDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-content">
          <div className="admin-header-left">
            <h1 className="admin-header-title">
              <span className="admin-icon">🎯</span>
              Admin Dashboard
              <span className="title-shimmer" />
            </h1>
            <p className="admin-header-subtitle">
              Manage your bookings and operations
            </p>
          </div>
          <button onClick={handleLogout} className="logout-button">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card stat-card-1">
          <div className="stat-icon">
            <Calendar size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Bookings</p>
            <p className="stat-value">{stats.totalBookings}</p>
          </div>
          <div className="stat-glow" />
        </div>

        <div className="stat-card stat-card-2">
          <div className="stat-icon">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Pending</p>
            <p className="stat-value">{stats.pendingBookings}</p>
          </div>
          <div className="stat-glow" />
        </div>

        <div className="stat-card stat-card-3">
          <div className="stat-icon">
            <CheckCircle size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Completed</p>
            <p className="stat-value">{stats.completedBookings}</p>
          </div>
          <div className="stat-glow" />
        </div>

        <div className="stat-card stat-card-4">
          <div className="stat-icon">
            <XCircle size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Cancelled</p>
            <p className="stat-value">{stats.cancelledBookings}</p>
          </div>
          <div className="stat-glow" />
        </div>

        <div className="stat-card stat-card-5">
          <div className="stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Revenue</p>
            <p className="stat-value">
              ₹{stats.totalRevenue.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="stat-glow" />
        </div>
      </div>

      {/* Filters and Search */}
      <div className="admin-controls">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by reference, name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <Filter size={18} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="filter-group">
          <Calendar size={18} />
          <select
            value={dateSort}
            onChange={(e) => setDateSort(e.target.value as "asc" | "desc")}
            className="filter-select"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>

        <button onClick={fetchBookings} className="refresh-button">
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>

      {/* Bookings Table */}
      <div className="bookings-section">
        <h2 className="section-title">
          <Users size={24} />
          Bookings ({filteredBookings.length})
        </h2>

        {isLoading ? (
          <div className="loading-state">
            <div className="loader" />
            <p>Loading bookings...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <p>No bookings found</p>
          </div>
        ) : (
          <div className="bookings-table-wrapper">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Reference</th>
                  <th>Customer</th>
                  <th>Route</th>
                  <th>Vehicle</th>
                  <th>Pickup Date</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking, index) => (
                  <tr key={booking.id} className="booking-row">
                    <td>
                      <span className="booking-id">#{index + 1}</span>
                    </td>
                    <td>
                      <div className="booking-ref">
                        {booking.booking_reference}
                      </div>
                    </td>
                    <td>
                      <div className="customer-cell">
                        <p className="customer-name">{booking.customer_name}</p>
                        <p className="customer-contact">
                          {booking.customer_phone}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="trip-cell-compact">
                        <p className="trip-route-compact" title={`${booking.pickup_location} → ${booking.drop_location}`}>
                          {extractCityName(booking.pickup_location)} →{" "}
                          {extractCityName(booking.drop_location)}
                        </p>
                        <span className="trip-type-compact">
                          {booking.trip_type}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="vehicle-cell-compact">
                        <p className="vehicle-name-compact">
                          {booking.vehicle_name}
                        </p>
                      </div>
                    </td>
                    <td>
                      <span className="booking-date">
                        {new Date(booking.pickup_datetime).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "2-digit",
                          }
                        )}
                      </span>
                    </td>
                    <td>
                      <span className="booking-amount">
                        ₹{Number(booking.total_price).toLocaleString("en-IN")}
                      </span>
                    </td>
                    <td>{getPaymentBadge(booking.payment_status)}</td>
                    <td>{getStatusBadge(booking.booking_status)}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          onClick={() => openBookingDetails(booking)}
                          className="action-btn view-btn"
                          title="View Details"
                        >
                          <User size={16} />
                        </button>
                        {booking.booking_status !== "completed" &&
                          booking.booking_status !== "cancelled" && (
                            <>
                              <button
                                onClick={() =>
                                  updateBookingStatus(booking.id, "completed")
                                }
                                className="action-btn complete-btn"
                                title="Mark as Completed"
                              >
                                <CheckCircle size={16} />
                              </button>
                              <button
                                onClick={() =>
                                  updateBookingStatus(booking.id, "cancelled")
                                }
                                className="action-btn cancel-btn"
                                title="Cancel Booking"
                              >
                                <XCircle size={16} />
                              </button>
                            </>
                          )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {showModal && selectedBooking && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Booking Details</h3>
              <button
                onClick={() => setShowModal(false)}
                className="modal-close"
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="detail-section">
                <h4>
                  <User size={18} />
                  Customer Information
                </h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Name</span>
                    <span className="detail-value">
                      {selectedBooking.customer_name}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">
                      <Phone size={14} /> Phone
                    </span>
                    <span className="detail-value">
                      {selectedBooking.customer_phone}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">
                      <Mail size={14} /> Email
                    </span>
                    <span className="detail-value">
                      {selectedBooking.customer_email}
                    </span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>
                  <MapPin size={18} />
                  Trip Information
                </h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Pickup</span>
                    <span className="detail-value">
                      {selectedBooking.pickup_location}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Drop</span>
                    <span className="detail-value">
                      {selectedBooking.drop_location}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Trip Type</span>
                    <span className="detail-value">
                      {selectedBooking.trip_type}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Pickup Date</span>
                    <span className="detail-value">
                      {new Date(
                        selectedBooking.pickup_datetime
                      ).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>
                  <Car size={18} />
                  Vehicle Information
                </h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Vehicle</span>
                    <span className="detail-value">
                      {selectedBooking.vehicle_name}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Category</span>
                    <span className="detail-value">
                      {selectedBooking.vehicle_category}
                    </span>
                  </div>
                  {selectedBooking.driver_name && (
                    <>
                      <div className="detail-item">
                        <span className="detail-label">Driver</span>
                        <span className="detail-value">
                          {selectedBooking.driver_name}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Driver Phone</span>
                        <span className="detail-value">
                          {selectedBooking.driver_phone}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="detail-section">
                <h4>
                  <DollarSign size={18} />
                  Payment Information
                </h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Amount</span>
                    <span className="detail-value booking-amount">
                      ₹
                      {Number(selectedBooking.total_price).toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Payment Status</span>
                    {getPaymentBadge(selectedBooking.payment_status)}
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Booking Status</span>
                    {getStatusBadge(selectedBooking.booking_status)}
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Booking Ref</span>
                    <span className="detail-value booking-ref">
                      {selectedBooking.booking_reference}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              {selectedBooking.booking_status !== "completed" &&
                selectedBooking.booking_status !== "cancelled" && (
                  <>
                    <button
                      onClick={() =>
                        updateBookingStatus(selectedBooking.id, "completed")
                      }
                      className="modal-action-btn complete-action"
                    >
                      <CheckCircle size={18} />
                      Mark as Completed
                    </button>
                    <button
                      onClick={() =>
                        updateBookingStatus(selectedBooking.id, "cancelled")
                      }
                      className="modal-action-btn cancel-action"
                    >
                      <XCircle size={18} />
                      Cancel Booking
                    </button>
                  </>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
