// Supabase Edge Function for Payment Processing
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingRequest {
  pickupLocation: string;
  dropLocation: string;
  tripType: string;
  pickupDateTime: string;
  returnDateTime?: string;
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
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const bookingData: BookingRequest = await req.json();

    // Generate booking reference
    const { data: refData, error: refError } = await supabaseClient.rpc(
      "generate_booking_reference",
    );

    if (refError) throw refError;

    const bookingReference = refData;

    // Create booking in database
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
        payment_status: "pending",
        booking_status: "pending",
      })
      .select()
      .single();

    if (bookingError) throw bookingError;

    // Initialize Razorpay Order (you'll need to add your Razorpay credentials)
    const razorpayKeyId = Deno.env.get("RAZORPAY_KEY_ID");
    const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");

    if (!razorpayKeyId || !razorpayKeySecret) {
      throw new Error("Razorpay credentials not configured");
    }

    // Create Razorpay order
    const razorpayOrder = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(`${razorpayKeyId}:${razorpayKeySecret}`),
      },
      body: JSON.stringify({
        amount: Math.round(bookingData.totalPrice * 100), // Razorpay expects amount in paise
        currency: "INR",
        receipt: bookingReference,
        notes: {
          booking_id: booking.id,
          customer_email: bookingData.customerEmail,
          customer_phone: bookingData.customerPhone,
        },
      }),
    });

    const razorpayOrderData = await razorpayOrder.json();

    if (!razorpayOrder.ok) {
      throw new Error(
        `Razorpay error: ${razorpayOrderData.error?.description || "Unknown error"}`,
      );
    }

    // Store payment transaction
    await supabaseClient.from("payment_transactions").insert({
      booking_id: booking.id,
      transaction_id: razorpayOrderData.id,
      payment_gateway: "razorpay",
      amount: bookingData.totalPrice,
      status: "initiated",
      gateway_response: razorpayOrderData,
    });

    // Return response
    return new Response(
      JSON.stringify({
        success: true,
        bookingId: booking.id,
        bookingReference: bookingReference,
        orderId: razorpayOrderData.id,
        amount: bookingData.totalPrice,
        currency: "INR",
        razorpayKeyId: razorpayKeyId,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "An error occurred",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      },
    );
  }
});
