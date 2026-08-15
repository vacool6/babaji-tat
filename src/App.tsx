import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton";
import HomePage from "./pages/HomePage";
import CabResultsPage from "./pages/CabResultsPage";
import BookingFormPage from "./pages/BookingFormPage";
import BookingConfirmationPage from "./pages/BookingConfirmationPage";
import TourPackagesPage from "./pages/TourPackagesPage";
import TourDetailPage from "./pages/TourDetailPage";
import ContactPage from "./pages/ContactPage";
import TrackOrderPage from "./pages/TrackOrderPage";
import SEOHead from "./components/SEOHead/SEOHead";
import { useScrollToTop } from "./hooks/useScrollToTop";
import { BookingProvider } from "./context/BookingContext";

function App() {
  // Scroll to top on route change
  useScrollToTop();

  return (
    <BookingProvider>
      <div className="app">
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SEOHead
                    title="Babaji Tour & Travel - Premium Cab Services Across India"
                    description="Book premium cab services and curated journeys across the majestic landscapes of India. Reliable travel services for destinations across the country."
                    keywords="india cab booking, taxi service, inter-city travel, tour packages india"
                    canonicalUrl="https://babajitravel.com/"
                  />
                  <HomePage />
                </>
              }
            />
            <Route
              path="/search-results"
              element={
                <>
                  <SEOHead
                    title="Search Results - Available Cabs | Babaji Tour & Travel"
                    description="View available cab options for your journey across Uttarakhand. Choose from sedan, SUV, and premium vehicles."
                    keywords="cab booking results, available taxis, car rental uttarakhand"
                    canonicalUrl="https://babajitravel.com/search-results"
                  />
                  <CabResultsPage />
                </>
              }
            />
            <Route
              path="/booking-form"
              element={
                <>
                  <SEOHead
                    title="Booking Form - Enter Your Details | Babaji Tour & Travel"
                    description="Enter your details to complete your cab booking. Secure payment with Razorpay."
                    keywords="cab booking form, taxi booking details, online payment"
                    canonicalUrl="https://babajitravel.com/booking-form"
                  />
                  <BookingFormPage />
                </>
              }
            />
            <Route
              path="/booking-confirmation"
              element={
                <>
                  <SEOHead
                    title="Booking Confirmed | Babaji Tour & Travel"
                    description="Your cab booking has been confirmed. Check your booking details and reference number."
                    keywords="booking confirmed, booking details, cab confirmation"
                    canonicalUrl="https://babajitravel.com/booking-confirmation"
                  />
                  <BookingConfirmationPage />
                </>
              }
            />
            <Route
              path="/track-order"
              element={
                <>
                  <SEOHead
                    title="Track Your Booking | Babaji Tour & Travel"
                    description="Track your cab booking status using booking reference, email, or phone number."
                    keywords="track booking, booking status, order tracking"
                    canonicalUrl="https://babajitravel.com/track-order"
                  />
                  <TrackOrderPage />
                </>
              }
            />
            <Route
              path="/tour-packages"
              element={
                <>
                  <SEOHead
                    title="Uttarakhand Tour Packages | Babaji Tour & Travel"
                    description="Explore our curated tour packages for Nainital, Auli, Jim Corbett, and more destinations across Uttarakhand."
                    keywords="uttarakhand tour packages, nainital packages, auli tour, himalayan tours"
                    canonicalUrl="https://babajitravel.com/tour-packages"
                  />
                  <TourPackagesPage />
                </>
              }
            />
            <Route
              path="/tour-packages/:packageId"
              element={
                <>
                  <SEOHead
                    title="Tour Package Details | Babaji Tour & Travel"
                    description="View detailed itinerary, inclusions, and pricing for our Uttarakhand tour packages."
                    keywords="tour details, package itinerary, tour booking"
                    canonicalUrl="https://babajitravel.com/tour-packages"
                  />
                  <TourDetailPage />
                </>
              }
            />
            <Route
              path="/contact"
              element={
                <>
                  <SEOHead
                    title="Contact Us | Babaji Tour & Travel"
                    description="Get in touch with us for cab bookings, tour packages, or any inquiries. We're here to help plan your perfect Uttarakhand journey."
                    keywords="contact, customer support, inquiry, reach us"
                    canonicalUrl="https://babajitravel.com/contact"
                  />
                  <ContactPage />
                </>
              }
            />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </BookingProvider>
  );
}

export default App;
