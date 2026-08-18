/**
 * Calculate distance between two points using Google Maps Distance Matrix API
 * This provides road distance, not straight-line distance
 */
export const calculateDistance = async (
  origin: { lat: number; lng: number },
  destination: { lat: number; lng: number },
): Promise<{
  distance: number; // in kilometers
  duration: number; // in minutes
  distanceText: string;
  durationText: string;
}> => {
  const service = new google.maps.DistanceMatrixService();

  return new Promise((resolve, reject) => {
    service.getDistanceMatrix(
      {
        origins: [new google.maps.LatLng(origin.lat, origin.lng)],
        destinations: [
          new google.maps.LatLng(destination.lat, destination.lng),
        ],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
      },
      (response, status) => {
        if (status === "OK" && response) {
          const result = response.rows[0].elements[0];
          if (result.status === "OK") {
            resolve({
              distance: result.distance.value / 1000, // Convert meters to km
              duration: result.duration.value / 60, // Convert seconds to minutes
              distanceText: result.distance.text,
              durationText: result.duration.text,
            });
          } else {
            reject(new Error("Unable to calculate distance"));
          }
        } else {
          reject(new Error(`Distance Matrix failed: ${status}`));
        }
      },
    );
  });
};

/**
 * Fallback: Calculate straight-line distance using Haversine formula
 * Use this if Google Maps Distance Matrix API is unavailable
 */
export const calculateStraightLineDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};
