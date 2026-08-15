export interface BookingFormData {
  // Trip Details
  pickupLocation: string;
  dropLocation: string;
  tripType: string;
  pickupDateTime: string;
  returnDateTime?: string;

  // Vehicle Details
  vehicleId: string;
  vehicleName: string;
  vehicleCategory: string;
  vehicleSeats: number;

  // Customer Details
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAlternatePhone?: string;
  pickupAddress?: string;
  specialInstructions?: string;

  // Pricing
  basePrice: number;
  totalPrice: number;
}

export interface Booking {
  id: string;
  bookingReference: string;
  pickupLocation: string;
  dropLocation: string;
  tripType: string;
  pickupDatetime: string;
  returnDatetime?: string;
  vehicleId: string;
  vehicleName: string;
  vehicleCategory: string;
  vehicleSeats: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAlternatePhone?: string;
  pickupAddress?: string;
  specialInstructions?: string;
  basePrice: number;
  totalPrice: number;
  currency: string;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  paymentId?: string;
  paymentMethod?: string;
  paymentGateway?: string;
  paidAmount?: number;
  paymentDate?: string;
  bookingStatus:
    | "pending"
    | "confirmed"
    | "in_progress"
    | "completed"
    | "cancelled";
  driverAssigned: boolean;
  driverName?: string;
  driverPhone?: string;
  vehicleRegistration?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TrackBookingRequest {
  bookingReference?: string;
  email?: string;
  phone?: string;
}

export interface PaymentInitiateResponse {
  success: boolean;
  orderId: string;
  amount: number;
  currency: string;
  bookingId: string;
  razorpayKeyId: string;
  error?: string;
}

export interface PaymentVerifyRequest {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  bookingId: string;
}
