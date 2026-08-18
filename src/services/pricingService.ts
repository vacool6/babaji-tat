import { supabase } from "../supabase/client";

export interface VehiclePricing {
  id: number;
  vehicle_category: string;
  base_fare: number;
  per_km_rate: number;
  per_minute_rate: number;
  night_surcharge_percent: number;
  minimum_km: number;
}

export interface PriceCalculation {
  baseFare: number;
  perKmRate: number;
  distance: number;
  distanceCost: number;
  totalPrice: number;
  breakdown: {
    baseFare: number;
    distanceCost: number;
    minimumKm: number;
  };
}

/**
 * Fetch all vehicle pricing from Supabase
 */
export const getAllPricing = async (): Promise<VehiclePricing[]> => {
  const { data, error } = await supabase
    .from("vehicle_pricing")
    .select("*")
    .order("per_km_rate", { ascending: true });

  if (error) {
    console.error("Error fetching pricing:", error);
    throw error;
  }

  return data || [];
};

/**
 * Fetch pricing for a specific vehicle category
 */
export const getPricingByCategory = async (
  category: string,
): Promise<VehiclePricing | null> => {
  const { data, error } = await supabase
    .from("vehicle_pricing")
    .select("*")
    .eq("vehicle_category", category)
    .single();

  if (error) {
    console.error("Error fetching pricing for category:", error);
    return null;
  }

  return data;
};

/**
 * Calculate price based on distance and vehicle category
 */
export const calculatePrice = (
  pricing: VehiclePricing,
  distanceKm: number,
): PriceCalculation => {
  const { base_fare, per_km_rate, minimum_km } = pricing;

  // If distance is less than minimum, charge base fare only
  if (distanceKm <= minimum_km) {
    return {
      baseFare: base_fare,
      perKmRate: per_km_rate,
      distance: distanceKm,
      distanceCost: 0,
      totalPrice: base_fare,
      breakdown: {
        baseFare: base_fare,
        distanceCost: 0,
        minimumKm: minimum_km,
      },
    };
  }

  // Calculate distance cost for km beyond minimum
  const billableDistance = distanceKm - minimum_km;
  const distanceCost = billableDistance * per_km_rate;
  const totalPrice = base_fare + distanceCost;

  return {
    baseFare: base_fare,
    perKmRate: per_km_rate,
    distance: distanceKm,
    distanceCost: distanceCost,
    totalPrice: Math.round(totalPrice), // Round to nearest rupee
    breakdown: {
      baseFare: base_fare,
      distanceCost: distanceCost,
      minimumKm: minimum_km,
    },
  };
};

/**
 * Get pricing map for all vehicle categories (useful for frontend caching)
 */
export const getPricingMap = async (): Promise<Map<string, VehiclePricing>> => {
  const allPricing = await getAllPricing();
  const pricingMap = new Map<string, VehiclePricing>();

  allPricing.forEach((pricing) => {
    pricingMap.set(pricing.vehicle_category, pricing);
  });

  return pricingMap;
};
