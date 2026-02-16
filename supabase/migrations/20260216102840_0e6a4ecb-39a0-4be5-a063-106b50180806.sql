
-- Table for trial key requests
CREATE TABLE public.trial_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  comment TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.trial_requests ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public form)
CREATE POLICY "Anyone can submit a trial request"
ON public.trial_requests
FOR INSERT
WITH CHECK (true);

-- No select/update/delete for anon users
-- Admin access would be handled via service role key
