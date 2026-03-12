/*
  # Create stocks transactions table

  1. New Tables
    - `stocks`
      - `id` (uuid, primary key)
      - `name` (text) - stock name (e.g., Apple, Microsoft)
      - `value` (numeric) - number of shares or dollar amount
      - `created_at` (timestamp) - when the transaction was created

  2. Security
    - Enable RLS on `stocks` table
    - Add policy for anonymous users to read all stocks
    - Add policy for anonymous users to insert new stocks
*/

CREATE TABLE IF NOT EXISTS stocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  value numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE stocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read stocks"
  ON stocks
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow insert stocks"
  ON stocks
  FOR INSERT
  TO anon
  WITH CHECK (true);