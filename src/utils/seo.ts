/**
 * SEO Utilities for structured data and meta management
 * Optimized for Local SEO within 800km radius of Haldwani
 */

export interface StructuredData {
  "@context": string;
  "@type": string | string[];
  [key: string]: any;
}

/**
 * Major cities within 800km of Haldwani for geo-targeting
 */
export const targetCities = [
  "Haldwani",
  "Nainital",
  "Delhi",
  "Noida",
  "Gurgaon",
  "Lucknow",
  "Kanpur",
  "Dehradun",
  "Haridwar",
  "Rishikesh",
  "Chandigarh",
  "Shimla",
  "Agra",
  "Bareilly",
  "Moradabad",
  "Meerut",
  "Ghaziabad",
  "Faridabad",
  "Panipat",
  "Rudrapur",
  "Kashipur",
  "Ramnagar",
  "Kathgodam",
  "Bhimtal",
  "Ranikhet",
  "Almora",
  "Pithoragarh",
  "Mukteshwar",
  "Corbett",
  "Mussoorie",
];

/**
 * Generate comprehensive LocalBusiness structured data for SEO
 */
export const getLocalBusinessSchema = (): StructuredData => {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TravelAgency", "TouristInformationCenter"],
    name: "Babaji Travels",
    alternateName: "Babaji Travels Haldwani",
    description:
      "Premium cab booking, taxi services, and spiritual tour packages from Haldwani. Serving Delhi, Nainital, Uttarakhand, and nearby regions with reliable travel solutions.",
    url: "https://www.babajitravels.com",
    telephone: ["+91-94100-53567", "+91-70551-93596"],
    email: "babajitravels42@gmail.com",
    image: "https://www.babajitravels.com/favicon.svg",
    logo: "https://www.babajitravels.com/favicon.svg",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Trade Center, 4, Bareilly - Nainital Rd, Tikonia Chauraha",
      addressLocality: "Haldwani",
      addressRegion: "Uttarakhand",
      postalCode: "263139",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "29.223506",
      longitude: "79.530468",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Haldwani",
        "@id": "https://en.wikipedia.org/wiki/Haldwani",
      },
      {
        "@type": "City",
        name: "Nainital",
      },
      {
        "@type": "City",
        name: "Delhi",
      },
      {
        "@type": "State",
        name: "Uttarakhand",
        "@id": "https://en.wikipedia.org/wiki/Uttarakhand",
      },
      {
        "@type": "State",
        name: "Uttar Pradesh",
      },
      {
        "@type": "State",
        name: "Delhi NCR",
      },
    ],
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
      description: "24/7 Service Available",
    },
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Credit Card, Debit Card, UPI, Online Payment",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [
      "https://www.facebook.com/babajitravels",
      "https://www.instagram.com/babajitravels",
      "https://twitter.com/babajitravels",
    ],
    hasMap: "https://goo.gl/maps/your-google-maps-link",
    founder: {
      "@type": "Person",
      name: "Vikram Khari",
    },
    foundingDate: "2020",
    slogan: "Your Trusted Travel Partner in North India",
    keywords:
      "cab booking haldwani, taxi service nainital, delhi to nainital cab, uttarakhand tour packages, spiritual tours india",
  };
};

/**
 * Generate Product/Service structured data with enhanced local targeting
 */
export const getCabServiceSchema = (): StructuredData => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Taxi & Cab Booking Service",
    provider: {
      "@type": "LocalBusiness",
      name: "Babaji Travels",
      telephone: "+91-94100-53567",
      address: {
        addressLocality: "Haldwani",
        addressRegion: "Uttarakhand",
      },
    },
    areaServed: targetCities.map((city) => ({
      "@type": "City",
      name: city,
    })),
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: "https://www.babajitravels.com",
      servicePhone: "+91-94100-53567",
      availableLanguage: ["Hindi", "English"],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cab & Tour Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "One Way Cab Service",
            description:
              "Affordable one-way taxi service from Haldwani to Delhi, Nainital, and other cities",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Round Trip Cab Service",
            description:
              "Round trip taxi booking for Uttarakhand, Delhi NCR, and nearby states",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Local Cab Service",
            description:
              "Local taxi service in Haldwani, Nainital, and surrounding areas",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Pilgrimage Tour Packages",
            description:
              "Char Dham Yatra, Vaishno Devi, and other spiritual tour packages",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Airport Transfer Service",
            description:
              "Airport pickup and drop service from Delhi, Dehradun, and Pantnagar airports",
          },
        },
      ],
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: "2000",
      highPrice: "50000",
      offerCount: "50+",
    },
  };
};

/**
 * Generate BreadcrumbList for better navigation SEO
 */
export const getBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>,
): StructuredData => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

/**
 * Generate FAQ Schema
 */
export const getFAQSchema = (): StructuredData => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What areas does Babaji Travels serve?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Babaji Travels serves Haldwani, Nainital, Delhi, Uttarakhand, and all major cities within 800km radius including Lucknow, Chandigarh, Dehradun, Haridwar, and Rishikesh.",
        },
      },
      {
        "@type": "Question",
        name: "How can I book a cab with Babaji Travels?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can book a cab through our website at www.babajitravels.com or call us at +91-94100-53567. We offer instant booking confirmation and 24/7 customer support.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide tour packages from Haldwani?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we offer various tour packages including Char Dham Yatra, Nainital tours, Jim Corbett packages, and custom spiritual journeys across India.",
        },
      },
      {
        "@type": "Question",
        name: "What types of vehicles are available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer Sedan (Swift Dzire), SUV (Innova Crysta, Fortuner), and Tempo Traveller for group bookings. All vehicles are well-maintained and sanitized.",
        },
      },
    ],
  };
};

/**
 * Inject structured data into page
 */
export const injectStructuredData = (
  data: StructuredData | StructuredData[],
) => {
  // Handle both single schema and array of schemas
  const schemas = Array.isArray(data) ? data : [data];

  // Remove existing structured data scripts
  const existing = document.querySelectorAll(
    'script[type="application/ld+json"]',
  );
  existing.forEach((script) => script.remove());

  // Inject all schemas
  schemas.forEach((schema) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  });
};

/**
 * Generate location-specific keywords for pages
 */
export const getLocationKeywords = (baseKeywords: string): string => {
  const locationTerms = [
    "haldwani",
    "nainital",
    "delhi",
    "uttarakhand",
    "kumaon",
    "delhi ncr",
    "north india",
    "haridwar",
    "dehradun",
  ];

  return `${baseKeywords}, ${locationTerms
    .map((loc) => baseKeywords.split(",")[0] + " " + loc)
    .join(", ")}`;
};
