import { useJsApiLoader } from "@react-google-maps/api";

// Shared libraries configuration - must be consistent across all components
const libraries: ("places" | "geometry")[] = ["places", "geometry"];

/**
 * Shared Google Maps loader hook
 * Use this in all components that need Google Maps to ensure consistent configuration
 */
export const useGoogleMapsLoader = () => {
  return useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries,
    region: "IN",
  });
};
