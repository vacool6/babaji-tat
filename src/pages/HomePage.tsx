import { useEffect } from "react";
import Hero from "../components/Hero/Hero";
import DestinationsSection from "../components/DestinationsSection/DestinationsSection";
import {
  getLocalBusinessSchema,
  getCabServiceSchema,
  injectStructuredData,
} from "../utils/seo";

const HomePage = () => {
  useEffect(() => {
    // Inject structured data for SEO
    const businessSchema = getLocalBusinessSchema();
    const serviceSchema = getCabServiceSchema();

    injectStructuredData(businessSchema);

    // Add service schema as well
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(serviceSchema);
    document.head.appendChild(script);

    return () => {
      // Cleanup structured data on unmount
      const scripts = document.querySelectorAll(
        'script[type="application/ld+json"]',
      );
      scripts.forEach((script) => script.remove());
    };
  }, []);

  return (
    <div className="home-page">
      <Hero />
      <DestinationsSection />
    </div>
  );
};

export default HomePage;
