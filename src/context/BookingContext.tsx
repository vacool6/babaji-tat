import { createContext, useContext, useState, ReactNode } from "react";
import type { Vehicle } from "../types/vehicle";

export interface LocationData {
  address: string;
  lat: number;
  lng: number;
}

interface TripDistance {
  distance: number;
  distanceText: string;
  durationText: string;
}

interface BookingContextType {
  // Trip Details
  pickup: string;
  drop: string;
  pickupLocation: LocationData | null;
  dropLocation: LocationData | null;
  dateTime: string;
  tripType: string;
  returnDateTime?: string;

  // Distance Info
  tripDistance: TripDistance | null;
  setTripDistance: (distance: TripDistance | null) => void;

  // Selected Vehicle
  selectedVehicle: Vehicle | null;

  // Methods to update booking details
  setTripDetails: (details: {
    pickup: string;
    drop: string;
    pickupLocation: LocationData | null;
    dropLocation: LocationData | null;
    dateTime: string;
    tripType: string;
    returnDateTime?: string;
  }) => void;

  setSelectedVehicle: (vehicle: Vehicle) => void;

  clearBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state from localStorage or defaults
  const [pickup, setPickup] = useState(() => {
    const saved = localStorage.getItem("booking_pickup");
    return saved || "";
  });
  const [drop, setDrop] = useState(() => {
    const saved = localStorage.getItem("booking_drop");
    return saved || "";
  });
  const [pickupLocation, setPickupLocation] = useState<LocationData | null>(
    () => {
      const saved = localStorage.getItem("booking_pickupLocation");
      return saved ? JSON.parse(saved) : null;
    },
  );
  const [dropLocation, setDropLocation] = useState<LocationData | null>(() => {
    const saved = localStorage.getItem("booking_dropLocation");
    return saved ? JSON.parse(saved) : null;
  });
  const [dateTime, setDateTime] = useState(() => {
    const saved = localStorage.getItem("booking_dateTime");
    return saved || "";
  });
  const [tripType, setTripType] = useState(() => {
    const saved = localStorage.getItem("booking_tripType");
    return saved || "";
  });
  const [returnDateTime, setReturnDateTime] = useState<string | undefined>(
    () => {
      const saved = localStorage.getItem("booking_returnDateTime");
      return saved || undefined;
    },
  );
  const [tripDistance, setTripDistanceState] = useState<TripDistance | null>(
    () => {
      const saved = localStorage.getItem("booking_tripDistance");
      return saved ? JSON.parse(saved) : null;
    },
  );
  const [selectedVehicle, setSelectedVehicleState] = useState<Vehicle | null>(
    () => {
      const saved = localStorage.getItem("booking_selectedVehicle");
      return saved ? JSON.parse(saved) : null;
    },
  );

  const setTripDetails = (details: {
    pickup: string;
    drop: string;
    pickupLocation: LocationData | null;
    dropLocation: LocationData | null;
    dateTime: string;
    tripType: string;
    returnDateTime?: string;
  }) => {
    setPickup(details.pickup);
    setDrop(details.drop);
    setPickupLocation(details.pickupLocation);
    setDropLocation(details.dropLocation);
    setDateTime(details.dateTime);
    setTripType(details.tripType);
    setReturnDateTime(details.returnDateTime);

    // Persist to localStorage
    localStorage.setItem("booking_pickup", details.pickup);
    localStorage.setItem("booking_drop", details.drop);
    localStorage.setItem(
      "booking_pickupLocation",
      JSON.stringify(details.pickupLocation),
    );
    localStorage.setItem(
      "booking_dropLocation",
      JSON.stringify(details.dropLocation),
    );
    localStorage.setItem("booking_dateTime", details.dateTime);
    localStorage.setItem("booking_tripType", details.tripType);
    if (details.returnDateTime) {
      localStorage.setItem("booking_returnDateTime", details.returnDateTime);
    }
  };

  const setTripDistance = (distance: TripDistance | null) => {
    setTripDistanceState(distance);
    if (distance) {
      localStorage.setItem("booking_tripDistance", JSON.stringify(distance));
    } else {
      localStorage.removeItem("booking_tripDistance");
    }
  };

  const setSelectedVehicle = (vehicle: Vehicle) => {
    setSelectedVehicleState(vehicle);
    localStorage.setItem("booking_selectedVehicle", JSON.stringify(vehicle));
  };

  const clearBooking = () => {
    setPickup("");
    setDrop("");
    setPickupLocation(null);
    setDropLocation(null);
    setDateTime("");
    setTripType("");
    setReturnDateTime(undefined);
    setTripDistanceState(null);
    setSelectedVehicleState(null);

    // Clear localStorage
    localStorage.removeItem("booking_pickup");
    localStorage.removeItem("booking_drop");
    localStorage.removeItem("booking_pickupLocation");
    localStorage.removeItem("booking_dropLocation");
    localStorage.removeItem("booking_dateTime");
    localStorage.removeItem("booking_tripType");
    localStorage.removeItem("booking_returnDateTime");
    localStorage.removeItem("booking_tripDistance");
    localStorage.removeItem("booking_selectedVehicle");
  };

  return (
    <BookingContext.Provider
      value={{
        pickup,
        drop,
        pickupLocation,
        dropLocation,
        dateTime,
        tripType,
        returnDateTime,
        tripDistance,
        setTripDistance,
        selectedVehicle,
        setTripDetails,
        setSelectedVehicle,
        clearBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
