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
  bookingId: string;
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
      bookingId,
    }: VerifyPaymentRequest = await req.json();

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

    // Update booking with payment details
    const { error: updateError } = await supabaseClient
      .from("bookings")
      .update({
        payment_status: "paid",
        payment_id: razorpayPaymentId,
        payment_method: paymentDetails.method,
        payment_gateway: "razorpay",
        paid_amount: paymentDetails.amount / 100, // Convert from paise to rupees
        payment_date: new Date().toISOString(),
        booking_status: "confirmed",
      })
      .eq("id", bookingId);

    if (updateError) throw updateError;

    // Update payment transaction
    await supabaseClient
      .from("payment_transactions")
      .update({
        status: "success",
        gateway_response: paymentDetails,
      })
      .eq("transaction_id", razorpayOrderId);

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
