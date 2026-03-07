import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

console.log("razorpay-webhook function started");

serve(async (req) => {
  try {
    const signature = req.headers.get("x-razorpay-signature");
    // TODO: Verify razorpay webhook signature using RAZORPAY_WEBHOOK_SECRET

    const body = await req.json();
    const eventType = body.event;

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // TODO: Update transactions table based on eventType (payment.captured, refund.processed)

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
});
