
-- Drop the overly permissive update policy
DROP POLICY "Anyone can mark tokens used" ON public.purchase_tokens;

-- Create a more restrictive update policy: only allow setting used = true
CREATE POLICY "Anyone can mark tokens as used only" ON public.purchase_tokens
  FOR UPDATE TO anon, authenticated
  USING (used = false)
  WITH CHECK (used = true);
