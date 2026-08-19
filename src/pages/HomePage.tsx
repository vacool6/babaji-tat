import { useEffect } from "react";
import { useBooking } from "../context/BookingContext";
import Hero from "../components/Hero/Hero";
import StatsSection from "../components/StatsSection/StatsSection";
import WhyChooseUsSection from "../components/WhyChooseUsSection/WhyChooseUsSection";
import FleetSection from "../components/FleetSection/FleetSection";
import DestinationsSection from "../components/DestinationsSection/DestinationsSection";
import TestimonialsSection from "../components/TestimonialsSection/TestimonialsSection";
import {
  getLocalBusinessSchema,
  getCabServiceSchema,
  getFAQSchema,
  getBreadcrumbSchema,
  injectStructuredData,
} from "../utils/seo";

const HomePage = () => {
  const { clearBooking } = useBooking();

  useEffect(() => {
    // Clear booking form on homepage load
    clearBooking();

    // Inject all structured data for comprehensive SEO
    const businessSchema = getLocalBusinessSchema();
    const serviceSchema = getCabServiceSchema();
    const faqSchema = getFAQSchema();
    const breadcrumbSchema = getBreadcrumbSchema([
      { name: "Home", url: "https://www.babajitravels.com/" }
    ]);

    // Inject all schemas at once
    injectStructuredData([
      businessSchema,
      serviceSchema,
      faqSchema,
      breadcrumbSchema
    ]);

    return () => {
      // Cleanup structured data on unmount
      const scripts = document.querySelectorAll(
        'script[type="application/ld+json"]',
      );
      scripts.forEach((script) => script.remove());
    };
  }, [clearBooking]);

  return (
    <div className="home-page">
      <Hero />
      <StatsSection />
      <WhyChooseUsSection />
      <FleetSection />
      <DestinationsSection />
      <TestimonialsSection />
    </div>
  );
};

export default HomePage;
