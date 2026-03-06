import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    // Gumroad sends: email, product_id, product_name, sale_id, etc.
    const product = body.product_name?.toLowerCase().includes("password")
      ? "password-manager"
      : "cybersecurity-toolkit";

    // Generate unique token
    const token = crypto.randomUUID();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Insert token
    const { error: insertError } = await supabase
      .from("purchase_tokens")
      .insert({ token, product, used: false });

    if (insertError) {
      console.error("Insert error:", insertError);
      return new Response(JSON.stringify({ error: "Failed to create token" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Increment purchase counter
    await supabase.rpc("increment_purchase", { p_page_name: product });

    // Return the download URL with token
    const siteUrl = Deno.env.get("SITE_URL") || "https://diysoftwares.lovable.app";
    const downloadUrl = `${siteUrl}/download/${product}?token=${token}`;

    return new Response(JSON.stringify({ success: true, download_url: downloadUrl }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
