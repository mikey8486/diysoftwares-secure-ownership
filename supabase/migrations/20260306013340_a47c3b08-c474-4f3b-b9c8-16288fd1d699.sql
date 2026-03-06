
-- Add RLS policies for purchase_tokens
-- Allow anonymous SELECT for token verification
CREATE POLICY "Anyone can verify tokens" ON public.purchase_tokens
  FOR SELECT TO anon, authenticated
  USING (true);

-- Allow service role to insert/update (edge function uses service role)
-- No explicit policy needed for service_role as it bypasses RLS

-- Allow anonymous UPDATE so the client can mark tokens as used
CREATE POLICY "Anyone can mark tokens used" ON public.purchase_tokens
  FOR UPDATE TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Ensure site_stats rows exist for our pages
INSERT INTO public.site_stats (page_name, visit_count, purchase_count)
VALUES 
  ('homepage', 0, 0),
  ('password-manager', 0, 0),
  ('cybersecurity-toolkit', 0, 0)
ON CONFLICT DO NOTHING;
