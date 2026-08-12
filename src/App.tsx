import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage";
import CabResultsPage from "./pages/CabResultsPage";
import BookingConfirmationPage from "./pages/BookingConfirmationPage";
import TourPackagesPage from "./pages/TourPackagesPage";
import TourDetailPage from "./pages/TourDetailPage";
import ContactPage from "./pages/ContactPage";
import SEOHead from "./components/SEOHead/SEOHead";
import { useScrollToTop } from "./hooks/useScrollToTop";

function App() {
  // Scroll to top on route change
  useScrollToTop();

  return (
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
            path="/booking-confirmation"
            element={
              <>
                <SEOHead
                  title="Complete Your Booking | Babaji Tour & Travel"
                  description="Complete your cab booking by providing passenger details and confirming your journey."
                  keywords="cab booking confirmation, taxi booking, confirm ride"
                  canonicalUrl="https://babajitravel.com/booking-confirmation"
                />
                <BookingConfirmationPage />
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
    </div>
  );
}

export default App;
