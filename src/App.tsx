import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton";
import FloatingCallButton from "./components/FloatingCallButton/FloatingCallButton";
import HomePage from "./pages/HomePage";
import CabResultsPage from "./pages/CabResultsPage";
import BookingFormPage from "./pages/BookingFormPage";
import BookingConfirmationPage from "./pages/BookingConfirmationPage";
import TourPackagesPage from "./pages/TourPackagesPage";
import TourDetailPage from "./pages/TourDetailPage";
import ContactPage from "./pages/ContactPage";
import TrackOrderPage from "./pages/TrackOrderPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import SEOHead from "./components/SEOHead/SEOHead";
import { useScrollToTop } from "./hooks/useScrollToTop";
import { BookingProvider } from "./context/BookingContext";

// Layout wrapper for public pages
const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    <main style={{ minHeight: "calc(100vh - 400px)", display: "flex", flexDirection: "column" }}>
      {children}
    </main>
    <Footer />
    <WhatsAppButton />
    <FloatingCallButton />
  </>
);

function App() {
  // Scroll to top on route change
  useScrollToTop();

  return (
    <BookingProvider>
      <div className="app" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Routes>
          {/* Admin Routes - No Navbar/Footer */}
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />

          {/* Public Routes - With Navbar/Footer */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <SEOHead
                  title="Babaji Travels - Premium Cab Services Across India"
                  description="Book premium cab services and curated journeys across the majestic landscapes of India. Reliable travel services for destinations across the country."
                  keywords="india cab booking, taxi service, inter-city travel, tour packages india"
                  canonicalUrl="https://babajitravel.com/"
                />
                <HomePage />
              </PublicLayout>
            }
          />
          <Route
            path="/search-results"
            element={
              <PublicLayout>
                <SEOHead
                  title="Search Results - Available Cabs | Babaji Travels"
                  description="View available cab options for your journey across Uttarakhand. Choose from sedan, SUV, and premium vehicles."
                  keywords="cab booking results, available taxis, car rental uttarakhand"
                  canonicalUrl="https://babajitravel.com/search-results"
                />
                <CabResultsPage />
              </PublicLayout>
            }
          />
          <Route
            path="/booking-form"
            element={
              <PublicLayout>
                <SEOHead
                  title="Booking Form - Enter Your Details | Babaji Travels"
                  description="Enter your details to complete your cab booking. Secure payment with Razorpay."
                  keywords="cab booking form, taxi booking details, online payment"
                  canonicalUrl="https://babajitravel.com/booking-form"
                />
                <BookingFormPage />
              </PublicLayout>
            }
          />
          <Route
            path="/booking-confirmation"
            element={
              <PublicLayout>
                <SEOHead
                  title="Booking Confirmed | Babaji Travels"
                  description="Your cab booking has been confirmed. Check your booking details and reference number."
                  keywords="booking confirmed, booking details, cab confirmation"
                  canonicalUrl="https://babajitravel.com/booking-confirmation"
                />
                <BookingConfirmationPage />
              </PublicLayout>
            }
          />
          <Route
            path="/track-order"
            element={
              <PublicLayout>
                <SEOHead
                  title="Track Your Booking | Babaji Travels"
                  description="Track your cab booking status using booking reference, email, or phone number."
                  keywords="track booking, booking status, order tracking"
                  canonicalUrl="https://babajitravel.com/track-order"
                />
                <TrackOrderPage />
              </PublicLayout>
            }
          />
          <Route
            path="/tour-packages"
            element={
              <PublicLayout>
                <SEOHead
                  title="India Tour Packages | Babaji Travels"
                  description="Explore our curated tour packages for spiritual journeys, pilgrimage tours, and adventure destinations across India."
                  keywords="uttarakhand tour packages, nainital packages, auli tour, himalayan tours"
                  canonicalUrl="https://babajitravel.com/tour-packages"
                />
                <TourPackagesPage />
              </PublicLayout>
            }
          />
          <Route
            path="/tour-packages/:packageId"
            element={
              <PublicLayout>
                <SEOHead
                  title="Tour Package Details | Babaji Travels"
                  description="View detailed itinerary, inclusions, and pricing for our India tour packages."
                  keywords="tour details, package itinerary, tour booking"
                  canonicalUrl="https://babajitravel.com/tour-packages"
                />
                <TourDetailPage />
              </PublicLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <PublicLayout>
                <SEOHead
                  title="Contact Us | Babaji Travels"
                  description="Get in touch with us for cab bookings, tour packages, or any inquiries. We're here to help plan your perfect journey across India."
                  keywords="contact, customer support, inquiry, reach us"
                  canonicalUrl="https://babajitravel.com/contact"
                />
                <ContactPage />
              </PublicLayout>
            }
          />
        </Routes>
      </div>
    </BookingProvider>
  );
}

export default App;
