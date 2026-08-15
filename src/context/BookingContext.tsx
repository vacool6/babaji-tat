import { createContext, useContext, useState, ReactNode } from "react";
import type { Vehicle } from "../types/vehicle";

export interface LocationData {
  address: string;
  latitude: number;
  longitude: number;
  displayName?: string;
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
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [pickupLocation, setPickupLocation] = useState<LocationData | null>(
    null,
  );
  const [dropLocation, setDropLocation] = useState<LocationData | null>(null);
  const [dateTime, setDateTime] = useState("");
  const [tripType, setTripType] = useState("");
  const [returnDateTime, setReturnDateTime] = useState<string | undefined>();
  const [selectedVehicle, setSelectedVehicleState] = useState<Vehicle | null>(
    null,
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
  };

  const setSelectedVehicle = (vehicle: Vehicle) => {
    setSelectedVehicleState(vehicle);
  };

  const clearBooking = () => {
    setPickup("");
    setDrop("");
    setPickupLocation(null);
    setDropLocation(null);
    setDateTime("");
    setTripType("");
    setReturnDateTime(undefined);
    setSelectedVehicleState(null);
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
