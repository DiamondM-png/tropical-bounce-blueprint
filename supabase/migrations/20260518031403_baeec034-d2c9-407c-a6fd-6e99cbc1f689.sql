-- Create private storage bucket for paid guides
INSERT INTO storage.buckets (id, name, public)
VALUES ('guides', 'guides', false)
ON CONFLICT (id) DO UPDATE SET public = false;

-- No public policies — only service role (backend) can read/write.
-- Signed URLs will be generated server-side after Stripe payment verification.