// Supabase Edge Function for Payment Verification
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";
import { createHmac } from "https://deno.land/std@0.168.0/node/crypto.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface VerifyPaymentRequest {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  bookingReference: string;
  bookingData: any; // Booking details from create-payment
  // For price verification
  vehicleCategory: string;
  distance: number;
  frontendCalculatedPrice: number;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      bookingReference,
      bookingData,
      vehicleCategory,
      distance,
      frontendCalculatedPrice,
    }: VerifyPaymentRequest = await req.json();

    // Step 1: Verify price on backend (prevent manipulation)
    const { data: pricingData, error: pricingError } = await supabaseClient
      .from("vehicle_pricing")
      .select("*")
      .eq("vehicle_category", vehicleCategory)
      .single();

    if (pricingError || !pricingData) {
      throw new Error("Invalid vehicle category or pricing not found");
    }

    // Calculate expected price on backend
    const { base_fare, per_km_rate, minimum_km } = pricingData;
    let expectedPrice = base_fare;

    if (distance > minimum_km) {
      const billableDistance = distance - minimum_km;
      expectedPrice = base_fare + billableDistance * per_km_rate;
    }

    expectedPrice = Math.round(expectedPrice);

    // Allow 1% tolerance for rounding differences
    const priceTolerance = expectedPrice * 0.01;
    if (Math.abs(frontendCalculatedPrice - expectedPrice) > priceTolerance) {
      console.error(
        `Price mismatch: Frontend ${frontendCalculatedPrice}, Backend ${expectedPrice}`,
      );
      throw new Error(
        `Price verification failed. Expected: ₹${expectedPrice}, Received: ₹${frontendCalculatedPrice}`,
      );
    }

    const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");

    if (!razorpayKeySecret) {
      throw new Error("Razorpay secret not configured");
    }

    // Verify signature
    const generatedSignature = createHmac("sha256", razorpayKeySecret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (generatedSignature !== razorpaySignature) {
      throw new Error("Invalid payment signature");
    }

    // Fetch payment details from Razorpay
    const razorpayKeyId = Deno.env.get("RAZORPAY_KEY_ID");
    const paymentDetailsResponse = await fetch(
      `https://api.razorpay.com/v1/payments/${razorpayPaymentId}`,
      {
        headers: {
          Authorization:
            "Basic " + btoa(`${razorpayKeyId}:${razorpayKeySecret}`),
        },
      },
    );

    const paymentDetails = await paymentDetailsResponse.json();

    // NOW create the booking - only after successful payment
    const { data: booking, error: bookingError } = await supabaseClient
      .from("bookings")
      .insert({
        booking_reference: bookingReference,
        pickup_location: bookingData.pickupLocation,
        drop_location: bookingData.dropLocation,
        trip_type: bookingData.tripType,
        pickup_datetime: bookingData.pickupDateTime,
        return_datetime: bookingData.returnDateTime,
        vehicle_id: bookingData.vehicleId,
        vehicle_name: bookingData.vehicleName,
        vehicle_category: bookingData.vehicleCategory,
        vehicle_seats: bookingData.vehicleSeats,
        customer_name: bookingData.customerName,
        customer_email: bookingData.customerEmail,
        customer_phone: bookingData.customerPhone,
        customer_alternate_phone: bookingData.customerAlternatePhone,
        pickup_address: bookingData.pickupAddress,
        special_instructions: bookingData.specialInstructions,
        base_price: bookingData.basePrice,
        total_price: bookingData.totalPrice,
        payment_status: "paid",
        payment_id: razorpayPaymentId,
        payment_method: paymentDetails.method,
        payment_gateway: "razorpay",
        paid_amount: paymentDetails.amount / 100,
        payment_date: new Date().toISOString(),
        booking_status: "confirmed",
      })
      .select()
      .single();

    if (bookingError) throw bookingError;

    // Store payment transaction
    await supabaseClient.from("payment_transactions").insert({
      booking_id: booking.id,
      transaction_id: razorpayOrderId,
      payment_gateway: "razorpay",
      amount: paymentDetails.amount / 100,
      status: "success",
      payment_method: paymentDetails.method,
      gateway_response: paymentDetails,
    });

    // TODO: Send confirmation email/SMS to customer

    return new Response(
      JSON.stringify({
        success: true,
        message: "Payment verified successfully",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    console.error("Payment verification error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Payment verification failed",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      },
    );
  }
});
