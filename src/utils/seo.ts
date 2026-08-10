/**
 * SEO Utilities for structured data and meta management
 */

export interface StructuredData {
  "@context": string;
  "@type": string;
  [key: string]: any;
}

/**
 * Generate LocalBusiness structured data for SEO
 */
export const getLocalBusinessSchema = (): StructuredData => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Babaji Tour & Travel",
    description:
      "Premium cab services and curated spiritual journeys across Uttarakhand",
    url: "https://babajitravel.com",
    telephone: "+91-98765-43210",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dehradun",
      addressRegion: "Uttarakhand",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "30.3165",
      longitude: "78.0322",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "₹₹",
    sameAs: [
      "https://www.facebook.com/babajitravel",
      "https://www.instagram.com/babajitravel",
    ],
  };
};

/**
 * Generate Product/Service structured data
 */
export const getCabServiceSchema = (): StructuredData => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Cab Booking Service",
    provider: {
      "@type": "LocalBusiness",
      name: "Babaji Tour & Travel",
    },
    areaServed: {
      "@type": "State",
      name: "Uttarakhand",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cab Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "One Way Cab Service",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Round Trip Cab Service",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Local Cab Service",
          },
        },
      ],
    },
  };
};

/**
 * Inject structured data into page
 */
export const injectStructuredData = (data: StructuredData) => {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.text = JSON.stringify(data);

  // Remove existing structured data script if any
  const existing = document.querySelector('script[type="application/ld+json"]');
  if (existing) {
    existing.remove();
  }

  document.head.appendChild(script);
};
