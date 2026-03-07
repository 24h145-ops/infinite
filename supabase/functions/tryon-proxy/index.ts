import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

console.log("tryon-proxy function started");

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    // Validate JWT 
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) throw new Error("Unauthorized");

    // Rate Limit Implementation
    // TODO: Verify user hasn't exceeded 5 try-ons per day in search_history

    const body = await req.json();
    
    // Call Nana Banana API (Mocked for now)
    const apiKey = Deno.env.get("NANA_BANANA_API_KEY");
    
    // In production:
    // const response = await fetch("https://api.nanab.ai/v1/tryon", {
    //   method: "POST",
    //   headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    //   body: JSON.stringify(body)
    // });
    // const result = await response.json();

    return new Response(JSON.stringify({ output_image: "mock_base64_string", message: "Success" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
