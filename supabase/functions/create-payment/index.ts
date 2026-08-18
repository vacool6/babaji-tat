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

    // Initialize Razorpay Order (you'll need to add your Razorpay credentials)
    const razorpayKeyId = Deno.env.get("RAZORPAY_KEY_ID");
    const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");

    if (!razorpayKeyId || !razorpayKeySecret) {
      throw new Error("Razorpay credentials not configured");
    }

    // Create Razorpay order FIRST (before creating booking)
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
          booking_reference: bookingReference,
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

    // Store booking data temporarily in order notes for later creation
    // Booking will be created ONLY after successful payment in verify-payment handler

    // Return response
    return new Response(
      JSON.stringify({
        success: true,
        bookingReference: bookingReference,
        orderId: razorpayOrderData.id,
        amount: bookingData.totalPrice,
        currency: "INR",
        razorpayKeyId: razorpayKeyId,
        bookingData: bookingData, // Send booking data to frontend for verification handler
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
